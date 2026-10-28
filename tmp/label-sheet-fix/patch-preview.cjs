const fs=require('fs');const p='format-web/src/main/java/com/totaldocs/format/web/service/LayoutPreviewService.java';let s=fs.readFileSync(p,'utf8');
const start=s.indexOf('        int total = 0;',s.indexOf('private PreviewPageCount countPreviewPages(')),end=s.indexOf('        if (total == 0)',start);
s=s.slice(0,start)+`        int total = 0;
        List<PreviewCheckpoint> checkpoints = new ArrayList<>();
        SheetSelections generator = new SheetSelections(pages, request, dataFileName, masterRecords.iterator(), 0, 0);
        while (generator.hasNext()) {
            PreviewSelection selection = generator.next();
            if (selection.repetitionIndex == 0) {
                checkpoints.add(new PreviewCheckpoint(total, selection.masterIndex, selection.recordOffset));
            }
            total++;
        }
`+s.slice(end);
const from=s.indexOf('        int generatedIndex = 0;',s.indexOf('private PreviewSelectionResult collectPreviewSelections(')),to=s.indexOf('        if (generatedIndex == 0)',from);
s=s.slice(0,from)+`        int generatedIndex = 0;
        List<PreviewSelection> selections = new ArrayList<>();
        PreviewSelection lastSelection = null;
        int start = Math.max(0, startPageIndex);
        int count = pageCount == Integer.MAX_VALUE ? Integer.MAX_VALUE : Math.max(1, pageCount);
        int end = count == Integer.MAX_VALUE ? Integer.MAX_VALUE : start + count;
        SheetSelections generator = new SheetSelections(pages, request, dataFileName, recordsWithoutOffsets(masterRecords.iterator()), 0, 0);
        while (generator.hasNext()) {
            PreviewSelection current = generator.next();
            if (current.failureMessage != null) throw new IllegalArgumentException(current.failureMessage);
            if (current.pageIndex >= start && current.pageIndex < end) selections.add(current);
            lastSelection = current;
            generatedIndex++;
            if (stopAfterWindow && generatedIndex >= end && !selections.isEmpty()) {
                return previewSelectionResult(pages, selections, generatedIndex, generator.mastersRead());
            }
        }
        int masterIndex = generator.mastersRead();
`+s.slice(to);
// Render each populated cell using its own record/repetition context.
s=s.replace('for (int slot = 0; slot < indexes.size(); slot++) {\r\n            int documentIndex = indexes.get(slot);',`for (int slot = 0; slot < indexes.size(); slot++) {
            int documentIndex = indexes.get(slot);`);
s=s.replace('Map<String, String> fields = new LinkedHashMap<>(selection.fields);\r\n            fields.put("_OverflowDoc"',`Map<String, String> fields = new LinkedHashMap<>(selection.sheetSlots == null
                    ? selection.fields : selection.sheetSlots.get(slot).fields);
            fields.put("_OverflowDoc"`);
s=s.replace('fields.put("_NumDocHoriz", String.valueOf((slot % horizontal) + 1));',`fields.put("_NumDocHoriz", String.valueOf(documentSlotColumn(template, slot, horizontal) + 1));`);
// Count/checkpoint, ordinary preview, ranges and lazy cursor share one grouping implementation.
const marker='    private static class PreviewSelectionResult {';
s=s.replace(marker,`    private Iterator<RecordWithOffset> recordsWithoutOffsets(Iterator<String> source) {
        return new Iterator<>() {
            public boolean hasNext() { return source.hasNext(); }
            public RecordWithOffset next() { return new RecordWithOffset(source.next(), -1); }
        };
    }

    private int labelSheetCapacity(Page page) {
        int capacity = sheetCapacity(page);
        int group = positiveOrDefault(page.getDocumentGroupCount(), 1);
        return capacity > 1 && group > 1 ? Math.min(capacity, group) : 1;
    }

    private int documentSlotColumn(Page page, int slot, int horizontal) {
        String sequence = page.getDocumentSequence();
        if ("next-vertical".equals(sequence)) return slot / positiveOrDefault(page.getDocumentsVertical(), 1);
        return "next-left".equals(sequence) ? horizontal - 1 - slot % horizontal : slot % horizontal;
    }

    private class SheetSelections implements Iterator<PreviewSelection> {
        private final List<Page> pages;
        private final LayoutPreviewRequest request;
        private final String dataFileName;
        private final Iterator<RecordWithOffset> records;
        private RecordWithOffset current;
        private Map<String, String> masterFields;
        private int masterIndex;
        private int repetition;
        private int repetitions;
        private int pageIndex;
        private PreviewSelection pending;

        SheetSelections(List<Page> pages, LayoutPreviewRequest request, String name,
                Iterator<RecordWithOffset> records, int firstPage, int firstMaster) {
            this.pages = pages; this.request = request; this.dataFileName = name; this.records = records;
            this.pageIndex = firstPage; this.masterIndex = firstMaster - 1;
        }
        int mastersRead() { return masterIndex + 1; }
        public boolean hasNext() { return pending != null || repetition < repetitions || records.hasNext(); }

        private PreviewSelection takeSlot(Page template, int slot) {
            if (pending != null) { PreviewSelection value = pending; pending = null; return value; }
            if (repetition >= repetitions) {
                current = records.next(); masterIndex++;
                masterFields = extractFields(current.value(), request.getCamposEntrada(), request.getDataFileConfig());
                repetitions = resolveTotalRepetitions(pages, masterFields); repetition = 0;
            }
            repetition++;
            Map<String, String> fields = new LinkedHashMap<>(masterFields);
            addSystemVariables(fields, repetition, repetitions, dataFileName);
            fields.put("_PageNum", String.valueOf(pageIndex + 1));
            Page position = template == null ? pages.get(0) : template;
            if (labelSheetCapacity(position) > 1) {
                fields.put("_NumDocHoriz", String.valueOf(documentSlotColumn(position, slot, positiveOrDefault(position.getDocumentsHorizontal(), 1)) + 1));
                fields.put("_NumDocPag", String.valueOf(slot + 1));
                fields.put("_NumRegGr", String.valueOf(slot + 1));
            }
            applyUserVariables(fields, request.getUserVariables());
            List<Integer> visible = firstVisibleDocumentIndex(pages, fields);
            if (visible.isEmpty()) {
                PreviewSelection failure = failedPreviewSelection(pageIndex, masterIndex, repetition, repetitions, fields);
                failure.recordOffset = current.offset(); return failure;
            }
            fields.put("_NroDoc", String.valueOf(visible.get(0) + 1));
            String overlay = resolveOverlayNumber(pages, request, fields);
            if (overlay != null) fields.put("_OverlayNum", overlay);
            PreviewSelection value = new PreviewSelection();
            value.masterIndex = masterIndex; value.recordOffset = current.offset(); value.totalMasters = masterIndex + 1;
            value.repetitionIndex = repetition - 1; value.totalRepetitions = repetitions;
            value.documentIndex = visible.get(0); value.visibleDocumentIndexes = visible; value.fields = fields;
            return value;
        }

        public PreviewSelection next() {
            if (!hasNext()) throw new NoSuchElementException();
            PreviewSelection sheet = takeSlot(null, 0);
            sheet.pageIndex = pageIndex;
            sheet.fields.put("_PageNum", String.valueOf(pageIndex + 1));
            List<PreviewSelection> slots = new ArrayList<>(); slots.add(sheet);
            int capacity = sheet.failureMessage == null ? labelSheetCapacity(pages.get(sheet.documentIndex)) : 1;
            while (slots.size() < capacity && hasNext()) {
                PreviewSelection candidate = takeSlot(pages.get(sheet.documentIndex), slots.size());
                if (candidate.failureMessage != null || candidate.documentIndex != sheet.documentIndex) {
                    pending = candidate; break;
                }
                slots.add(candidate);
            }
            sheet.sheetDocumentIndexes = slots.stream().map(x -> x.documentIndex).toList();
            if (capacity > 1) sheet.sheetSlots = slots;
            pageIndex++; sheet.totalPreviewPages = pageIndex;
            return sheet;
        }
    }

`+marker);
// Lazy navigation now consumes complete physical sheets, including the final partial sheet.
s=s.replace('private final Iterator<String> masterRecords;', 'private final SheetSelections generator;');
s=s.replace('this.masterRecords = masterRecords;', 'this.generator = new SheetSelections(pages, request, dataFileName, recordsWithoutOffsets(masterRecords), startPageIndex, startMasterIndex);');
s=s.replace('if (!masterRecords.hasNext()) {','if (!generator.hasNext()) {');
s=s.replace('generateMaster(masterRecords.next());\r\n                masterIndex++;',`PreviewSelection generated = generator.next();
                selections.put(generated.pageIndex, generated);
                generatedIndex = generated.pageIndex + 1;
                masterIndex = generator.mastersRead();`);
const genStart=s.indexOf('        private void generateMaster(String masterRecord) {'),genEnd=s.indexOf('        private LayoutPreviewResponseDTO renderSelection',genStart);
if(genStart<0||genEnd<0)throw Error('Cursor boundaries not found');s=s.slice(0,genStart)+s.slice(genEnd);
s=s.replace('        List<Integer> sheetDocumentIndexes;', '        List<Integer> sheetDocumentIndexes;\n        List<PreviewSelection> sheetSlots;\n        long recordOffset;');
fs.writeFileSync(p,s);
