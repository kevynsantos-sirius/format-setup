package com.totaldocs.format.web.service;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.totaldocs.format.web.dto.CampoBarCode;
import com.totaldocs.format.web.dto.CampoBlocoEnderecamento;
import com.totaldocs.format.web.dto.CampoEnderecoDTO;
import com.totaldocs.format.web.dto.CampoEntrada;
import com.totaldocs.format.web.dto.CampoLogo;
import com.totaldocs.format.web.dto.CampoQRCode;
import com.totaldocs.format.web.dto.CampoSaida;
import com.totaldocs.format.web.dto.Component;
import com.totaldocs.format.web.dto.DataFileConfig;
import com.totaldocs.format.web.dto.LayoutPreviewRequest;
import com.totaldocs.format.web.dto.LayoutPreviewResponseDTO;
import com.totaldocs.format.web.dto.OverlayConfig;
import com.totaldocs.format.web.dto.Page;
import com.totaldocs.format.web.dto.UserVariable;
import com.totaldocs.format.web.storage.ProjectStorage;


@Service
public class LayoutPreviewService {

    private static final char LEGACY_ESCAPE = 27;
    private static final String LEGACY_SEPARATOR = String.valueOf((char) 1);
    private static final Pattern LEGACY_FONT_TOKEN_PATTERN = Pattern.compile("\\[F[^\\]]*\\]");
    private static final Pattern CONDITIONAL_FONT_TAG_PATTERN = Pattern.compile("<\\s*[fFhH]\\d+\\s*>");
    private static final Pattern IF_PATTERN = Pattern.compile("(?is)^IF\\s*\\((.*)\\)\\s*(.*?)\\s+ELSE\\s+(.*)$");
    private static final Pattern SIMPLE_IF_PATTERN = Pattern.compile("(?is)^IF\\s*\\((.*)\\)\\s*$");
    private static final Pattern FIELD_TOKEN_PATTERN = Pattern.compile("\\b[A-Za-z_][A-Za-z0-9_]*\\b");
    private static final Pattern FUNCTION_CALL_PATTERN = Pattern.compile("(?is)^([A-Za-z_][A-Za-z0-9_]*)\\s*\\((.*)\\)$");
    private static final Pattern INLINE_FUNCTION_PATTERN = Pattern.compile("(?is)([A-Za-z_][A-Za-z0-9_]*)\\s*\\(([^()]*)\\)");
    public static final String NO_DOCUMENT_MESSAGE = "Nenhum documento atende às condições especificadas.";
    private static final String LAYOUT_DRAFT_ASSET = "drafts/layout-draft.json";
    private static final double IMAGE_PREVIEW_DPI = 300.0;
    private static final double ZERO_SIZE_IMAGE_PREVIEW_MIN_WIDTH_MM = 12.0;
    private static final double ZERO_SIZE_IMAGE_PREVIEW_MIN_HEIGHT_MM = 4.0;

    private final ObjectMapper mapper;
    private final SiriusUserFunctionClient siriusUserFunctionClient;
    private final ProjectStorage projectStorage;

    public LayoutPreviewService(ObjectMapper mapper, SiriusUserFunctionClient siriusUserFunctionClient, ProjectStorage projectStorage) {
        this.mapper = mapper;
        this.siriusUserFunctionClient = siriusUserFunctionClient;
        this.projectStorage = projectStorage;
    }

    public LayoutPreviewResponseDTO preview(LayoutPreviewRequest request, InputStream dataInput, String dataFileName) throws IOException {
        return preview(request, dataInput, dataFileName, null);
    }

    public LayoutPreviewResponseDTO preview(LayoutPreviewRequest request, InputStream dataInput, String dataFileName, String projectId) throws IOException {
        int requestedPageIndex = request.getPageIndex() == null ? 0 : Math.max(0, request.getPageIndex());
        PreviewSelectionResult selectionResult = selectPreviewPages(request, dataInput, dataFileName, requestedPageIndex, 1);
        PreviewSelection selection = selectionResult.selections.get(0);
        PreviewRenderContext renderContext = previewRenderContext(projectId);
        return buildPreviewResponse(selectionResult.pages, request, dataFileName, renderContext, selection);
    }

    public LayoutPreviewResponseDTO previewAll(LayoutPreviewRequest request, InputStream dataInput, String dataFileName, String projectId) throws IOException {
        PreviewContext context = preparePreviewContext(request, dataInput);
        List<PreviewSelection> selections = selectPreviewPages(context.pages, context.masterRecords, request, dataFileName);
        int requestedPageIndex = request.getPageIndex() == null ? 0 : Math.max(0, request.getPageIndex());
        int selectedIndex = Math.min(requestedPageIndex, Math.max(0, selections.size() - 1));

        List<LayoutPreviewResponseDTO> previewPages = new ArrayList<>();
        PreviewRenderContext renderContext = previewRenderContext(projectId);
        for (PreviewSelection selection : selections) {
            previewPages.add(buildPreviewResponse(context.pages, context.masterRecords, request, dataFileName, renderContext, selection));
        }

        LayoutPreviewResponseDTO response = buildPreviewResponse(context.pages, context.masterRecords, request, dataFileName, renderContext,
                selections.get(selectedIndex));
        response.setPreviewPages(previewPages);
        return response;
    }

    public LayoutPreviewResponseDTO previewRange(LayoutPreviewRequest request, InputStream dataInput, String dataFileName, String projectId) throws IOException {
        int requestedPageIndex = request.getPageIndex() == null ? 0 : Math.max(0, request.getPageIndex());
        int start = request.getPreviewStartPageIndex() == null ? requestedPageIndex : Math.max(0, request.getPreviewStartPageIndex());
        int count = request.getPreviewPageCount() == null ? 1 : Math.max(1, request.getPreviewPageCount());
        PreviewSelectionResult selectionResult = selectPreviewPages(request, dataInput, dataFileName, start, count);
        List<PreviewSelection> selections = selectionResult.selections;

        List<LayoutPreviewResponseDTO> previewPages = new ArrayList<>();
        PreviewRenderContext renderContext = previewRenderContext(projectId);
        for (PreviewSelection selection : selections) {
            previewPages.add(buildPreviewResponse(selectionResult.pages, request, dataFileName, renderContext, selection));
        }

        int selectedOffset = 0;
        for (int index = 0; index < selections.size(); index++) {
            if (selections.get(index).pageIndex == Math.min(Math.max(requestedPageIndex, start), Math.max(start, selectionResult.totalPreviewPages - 1))) {
                selectedOffset = index;
                break;
            }
        }
        LayoutPreviewResponseDTO response = buildPreviewResponse(selectionResult.pages, request, dataFileName, renderContext,
                selections.get(selectedOffset));
        response.setPreviewPages(previewPages);
        return response;
    }

    public PreviewCursor openPreviewCursor(LayoutPreviewRequest request, InputStream dataInput, String dataFileName, String projectId) throws IOException {
        return openPreviewCursor(request, dataInput, dataFileName, projectId, 0, 0, true);
    }

    public PreviewCursor openPreviewCursor(LayoutPreviewRequest request, InputStream dataInput, String dataFileName,
            String projectId, int startPageIndex, int startMasterIndex, boolean skipHeader) throws IOException {
        List<Page> pages = request.getListaDocumentos() == null ? List.of() : request.getListaDocumentos();
        if (pages.isEmpty()) {
            throw new IllegalArgumentException("Layout sem documentos para pre-visualizar");
        }
        return new PreviewCursor(request, dataInput, dataFileName, previewRecords(dataInput, request.getDataFileConfig(), skipHeader).iterator(),
                pages, previewRenderContext(projectId), startPageIndex, startMasterIndex);
    }

    /**
     * Opens a cursor backed by byte ranges. The source is consumed in small sequential
     * blocks and never copied in full before the first preview page is rendered.
     */
    public PreviewCursor openPreviewCursor(LayoutPreviewRequest request, RangeInputProvider rangeProvider,
            long contentLength, String dataFileName, String projectId) throws IOException {
        return openPreviewCursor(request, rangeProvider, contentLength, dataFileName, projectId, 0, 0, 0);
    }

    public PreviewCursor openPreviewCursor(LayoutPreviewRequest request, RangeInputProvider rangeProvider,
            long contentLength, String dataFileName, String projectId, long startOffset, int startPageIndex,
            int startMasterIndex) throws IOException {
        if (contentLength <= 0) {
            throw new IllegalArgumentException("Arquivo de entrada vazio");
        }
        boolean skipHeader = startOffset <= 0;
        return openPreviewCursor(request, new RangeInputStream(rangeProvider, contentLength, startOffset), dataFileName,
                projectId, startPageIndex, startMasterIndex, skipHeader);
    }

    public LayoutPreviewResponseDTO previewCursorPage(PreviewCursor cursor, int requestedPageIndex) {
        return cursor.page(Math.max(0, requestedPageIndex));
    }

    public PreviewPageCount countPreviewPages(LayoutPreviewRequest request, InputStream dataInput, String dataFileName) throws IOException {
        try (InputStream input = dataInput) {
            return countPreviewPages(request, previewRecordsWithOffsets(input, request.getDataFileConfig()), dataFileName);
        }
    }

    public PreviewPageCount countPreviewPages(LayoutPreviewRequest request, RangeInputProvider rangeProvider,
            long contentLength, String dataFileName) throws IOException {
        return countPreviewPages(request, new RangeInputStream(rangeProvider, contentLength), dataFileName);
    }

    private PreviewPageCount countPreviewPages(LayoutPreviewRequest request, Iterable<RecordWithOffset> masterRecords, String dataFileName) {
        List<Page> pages = request.getListaDocumentos() == null ? List.of() : request.getListaDocumentos();
        int total = 0;
        int masterIndex = 0;
        List<PreviewCheckpoint> checkpoints = new ArrayList<>();
        for (RecordWithOffset masterRecord : masterRecords) {
            int recordFirstPage = total;
            Map<String, String> masterFields = extractFields(masterRecord.value(), request.getCamposEntrada(), request.getDataFileConfig());
            int repetitions = resolveTotalRepetitions(pages, masterFields);
            for (int contRep = 1; contRep <= repetitions; contRep++) {
                Map<String, String> fields = new LinkedHashMap<>(masterFields);
                addSystemVariables(fields, contRep, repetitions, dataFileName);
                applyUserVariables(fields, request.getUserVariables());
                total++;
            }
            if (total > recordFirstPage) {
                checkpoints.add(new PreviewCheckpoint(recordFirstPage, masterIndex, masterRecord.offset()));
            }
            masterIndex++;
        }
        if (total == 0) {
            throw new IllegalArgumentException("Nenhum documento foi selecionado para preview. Verifique as expressoes associadas aos documentos.");
        }
        return new PreviewPageCount(total, checkpoints);
    }

    public record PreviewPageCount(int totalPages, List<PreviewCheckpoint> checkpoints) {
    }

    public record PreviewCheckpoint(int pageIndex, int masterIndex, long offset) {
    }

    @FunctionalInterface
    public interface RangeInputProvider {
        InputStream open(long startInclusive, long endInclusive) throws Exception;
    }

    private PreviewContext preparePreviewContext(LayoutPreviewRequest request, InputStream dataInput) throws IOException {
        List<Page> pages = request.getListaDocumentos() == null ? List.of() : request.getListaDocumentos();
        if (pages.isEmpty()) {
            throw new IllegalArgumentException("Layout sem documentos para pre-visualizar");
        }

        String text = decode(dataInput);
        List<String> masterRecords = splitMasterRecords(text, request.getDataFileConfig());
        if (masterRecords.isEmpty()) {
            masterRecords = List.of("");
        }

        PreviewContext context = new PreviewContext();
        context.pages = pages;
        context.masterRecords = masterRecords;
        return context;
    }

    private LayoutPreviewResponseDTO buildPreviewResponse(List<Page> pages, List<String> masterRecords,
            LayoutPreviewRequest request, String dataFileName, String projectId, PreviewSelection selection) {
        return buildPreviewResponse(pages, request, dataFileName, previewRenderContext(projectId), selection);
    }

    private LayoutPreviewResponseDTO buildPreviewResponse(List<Page> pages, List<String> masterRecords,
            LayoutPreviewRequest request, String dataFileName, PreviewRenderContext renderContext, PreviewSelection selection) {
        return buildPreviewResponse(pages, request, dataFileName, renderContext, selection);
    }

    private LayoutPreviewResponseDTO buildPreviewResponse(List<Page> pages,
            LayoutPreviewRequest request, String dataFileName, PreviewRenderContext renderContext, PreviewSelection selection) {
        LayoutPreviewResponseDTO response = new LayoutPreviewResponseDTO();
        response.setPage(buildPreviewSheetPage(pages, selection, request, renderContext));
        response.setMasterIndex(selection.masterIndex);
        response.setDocumentIndex(selection.documentIndex);
        response.setPageIndex(selection.pageIndex);
        response.setTotalPreviewPages(selection.totalPreviewPages);
        response.setRepetitionIndex(selection.repetitionIndex);
        response.setTotalRepetitions(selection.totalRepetitions);
        response.setTotalMasters(selection.totalMasters);
        response.setTotalDocuments(pages.size());
        response.setVisibleDocumentIndexes(selection.visibleDocumentIndexes);
        response.setFields(selection.fields);
        response.setDataFileName(dataFileName);
        return response;
    }

    private PreviewSelection selectPreviewPage(List<Page> pages, List<String> masterRecords, LayoutPreviewRequest request,
            String dataFileName, int requestedPageIndex) {
        return selectPreviewPages(pages, masterRecords, request, dataFileName, Math.max(0, requestedPageIndex), 1).selections.get(0);
    }

    private PreviewSelectionResult selectPreviewPages(LayoutPreviewRequest request, InputStream dataInput,
            String dataFileName, int startPageIndex, int pageCount) throws IOException {
        List<Page> pages = request.getListaDocumentos() == null ? List.of() : request.getListaDocumentos();
        if (pages.isEmpty()) {
            throw new IllegalArgumentException("Layout sem documentos para pre-visualizar");
        }

        PreviewSelectionResult result = collectPreviewSelections(
                pages,
                request,
                dataFileName,
                previewRecords(dataInput, request.getDataFileConfig()),
                startPageIndex,
                pageCount,
                true);
        result.pages = pages;
        return result;
    }

    private List<PreviewSelection> selectPreviewPages(List<Page> pages, List<String> masterRecords, LayoutPreviewRequest request,
            String dataFileName) {
        return selectPreviewPages(pages, masterRecords, request, dataFileName, 0, Integer.MAX_VALUE).selections;
    }

    private PreviewSelectionResult selectPreviewPages(List<Page> pages, List<String> masterRecords, LayoutPreviewRequest request,
            String dataFileName, int startPageIndex, int pageCount) {
        PreviewSelectionResult result = collectPreviewSelections(
                pages,
                request,
                dataFileName,
                masterRecords,
                startPageIndex,
                pageCount,
                pageCount != Integer.MAX_VALUE);
        result.pages = pages;
        return result;
    }

    private PreviewSelectionResult collectPreviewSelections(List<Page> pages, LayoutPreviewRequest request,
            String dataFileName, Iterable<String> masterRecords, int startPageIndex, int pageCount, boolean stopAfterWindow) {
        int generatedIndex = 0;
        int masterIndex = 0;
        List<PreviewSelection> selections = new ArrayList<>();
        PreviewSelection lastSelection = null;
        int start = Math.max(0, startPageIndex);
        int count = pageCount == Integer.MAX_VALUE ? Integer.MAX_VALUE : Math.max(1, pageCount);
        int end = count == Integer.MAX_VALUE ? Integer.MAX_VALUE : start + count;

        for (String masterRecord : masterRecords) {
            Map<String, String> masterFields = extractFields(masterRecord, request.getCamposEntrada(), request.getDataFileConfig());
            int totalRepetitions = resolveTotalRepetitions(pages, masterFields);
            for (int contRep = 1; contRep <= totalRepetitions; contRep++) {
                Map<String, String> fields = new LinkedHashMap<>(masterFields);
                addSystemVariables(fields, contRep, totalRepetitions, dataFileName);
                applyUserVariables(fields, request.getUserVariables());
                List<Integer> visibleIndexes = firstVisibleDocumentIndex(pages, fields);
                if (visibleIndexes.isEmpty()) {
                    throw new IllegalArgumentException(NO_DOCUMENT_MESSAGE);
                }
                Map<String, String> pageFields = new LinkedHashMap<>(fields);
                pageFields.put("_PageNum", String.valueOf(generatedIndex + 1));
                pageFields.put("_NroDoc", String.valueOf(visibleIndexes.get(0) + 1));
                String overlayNumber = resolveOverlayNumber(pages, request, pageFields);
                if (overlayNumber != null) {
                    pageFields.put("_OverlayNum", overlayNumber);
                }
                PreviewSelection current = new PreviewSelection();
                current.pageIndex = generatedIndex;
                current.masterIndex = masterIndex;
                current.repetitionIndex = contRep - 1;
                current.totalRepetitions = totalRepetitions;
                current.documentIndex = visibleIndexes.get(0);
                current.totalMasters = masterIndex + 1;
                current.visibleDocumentIndexes = visibleIndexes;
                current.sheetDocumentIndexes = new ArrayList<>(visibleIndexes);
                current.fields = pageFields;
                if (generatedIndex >= start && generatedIndex < end) {
                    selections.add(current);
                }
                lastSelection = current;
                generatedIndex++;
                if (stopAfterWindow && generatedIndex >= end && !selections.isEmpty()) {
                    return previewSelectionResult(pages, selections, generatedIndex, masterIndex + 1);
                }
            }
            masterIndex++;
        }

        if (generatedIndex == 0) {
            throw new IllegalArgumentException("Nenhum documento foi selecionado para preview. Verifique as expressoes associadas aos documentos.");
        }
        if (selections.isEmpty() && lastSelection != null) {
            selections.add(lastSelection);
        }
        for (PreviewSelection selection : selections) {
            selection.totalPreviewPages = generatedIndex;
            selection.totalMasters = masterIndex;
        }
        return previewSelectionResult(pages, selections, generatedIndex, masterIndex);
    }

    private String resolveOverlayNumber(List<Page> pages, LayoutPreviewRequest request, Map<String, String> fields) {
        OverlayConfig config = request == null ? null : request.getOverlayConfig();
        if (config == null && pages != null) {
            for (Page page : pages) {
                if (page != null && page.getOverlayConfig() != null) {
                    config = page.getOverlayConfig();
                    break;
                }
            }
        }
        if (config == null) {
            return null;
        }
        String condition = config.getCondition();
        if ((condition == null || condition.isBlank()) && config.getOverlays() != null) {
            for (OverlayConfig overlay : config.getOverlays()) {
                if (overlay != null && overlay.getCondition() != null && !overlay.getCondition().isBlank()) {
                    condition = overlay.getCondition();
                    break;
                }
            }
        }
        if (condition == null || condition.isBlank()) {
            return null;
        }
        Double value = parseNumber(evaluateAsText(condition, fields));
        return value == null ? "0" : String.valueOf(Math.max(0, value.intValue()));
    }

    private PreviewSelectionResult previewSelectionResult(List<Page> pages, List<PreviewSelection> selections, int totalPreviewPages, int totalMasters) {
        for (PreviewSelection selection : selections) {
            selection.totalPreviewPages = totalPreviewPages;
            selection.totalMasters = totalMasters;
        }
        PreviewSelectionResult result = new PreviewSelectionResult();
        result.pages = pages;
        result.selections = selections;
        result.totalPreviewPages = totalPreviewPages;
        result.totalMasters = totalMasters;
        return result;
    }

    private Page buildPreviewSheetPage(List<Page> pages, PreviewSelection selection, LayoutPreviewRequest request, PreviewRenderContext renderContext) {
        Page template = previewPageForIndex(pages, selection.documentIndex, renderContext);
        template.setOverlayConfig(request.getOverlayConfig() != null ? request.getOverlayConfig() : template.getOverlayConfig());
        int horizontal = positiveOrDefault(template.getDocumentsHorizontal(), 1);
        int vertical = positiveOrDefault(template.getDocumentsVertical(), 1);
        int capacity = Math.max(1, horizontal * vertical);
        if (capacity <= 1) {
            selection.fields.put("_OverflowDoc", Boolean.TRUE.equals(template.getDocOverflow()) ? "1" : "0");
            resolvePage(template, selection.fields, renderContext);
            return template;
        }

        Page sheet = mapper.convertValue(template, Page.class);
        sheet.setLayout(new ArrayList<>());
        if (sheet.getSize() != null) {
            sheet.setDocumentSize(sheet.getSize());
        }
        List<Integer> indexes = selection.sheetDocumentIndexes == null || selection.sheetDocumentIndexes.isEmpty()
                ? List.of(selection.documentIndex)
                : selection.sheetDocumentIndexes;
        for (int slot = 0; slot < indexes.size(); slot++) {
            int documentIndex = indexes.get(slot);
            Page document = previewPageForIndex(pages, documentIndex, renderContext);
            document.setOverlayConfig(request.getOverlayConfig() != null ? request.getOverlayConfig() : document.getOverlayConfig());
            Map<String, String> fields = new LinkedHashMap<>(selection.fields);
            fields.put("_OverflowDoc", Boolean.TRUE.equals(document.getDocOverflow()) ? "1" : "0");
            fields.put("_NumDocHoriz", String.valueOf((slot % horizontal) + 1));
            fields.put("_NumDocPag", String.valueOf(slot + 1));
            resolvePage(document, fields, renderContext);
            double[] offset = documentSlotOffset(template, slot, horizontal);
            for (Component component : document.getLayout() == null ? List.<Component>of() : document.getLayout()) {
                component.setX(component.getX() + offset[0]);
                component.setY(component.getY() + offset[1]);
                sheet.getLayout().add(component);
            }
        }
        return sheet;
    }

    private Page previewPageForIndex(List<Page> pages, int index, PreviewRenderContext renderContext) {
        Page page = mapper.convertValue(pages.get(index), Page.class);
        if (!pageLayoutEmpty(page) || renderContext == null || renderContext.projectId == null || renderContext.projectId.isBlank()) {
            return page;
        }
        Page draftPage = loadDraftPage(renderContext, index);
        return draftPage == null ? page : draftPage;
    }

    private boolean pageLayoutEmpty(Page page) {
        return page == null || page.getLayout() == null || page.getLayout().isEmpty();
    }

    private Page loadDraftPage(PreviewRenderContext renderContext, int index) {
        JsonNode pages = renderContext == null ? null : renderContext.draftPages;
        if (pages == null || !pages.isArray() || index < 0 || index >= pages.size()) {
            return null;
        }
        JsonNode page = pages.get(index);
        if (page == null || page.isNull()) {
            return null;
        }
        return mapper.convertValue(page, Page.class);
    }

    private int documentsPerPhysicalPage(List<Page> pages) {
        Page page = pages == null || pages.isEmpty() ? null : pages.get(0);
        return Math.max(1, positiveOrDefault(page == null ? null : page.getDocumentsHorizontal(), 1)
                * positiveOrDefault(page == null ? null : page.getDocumentsVertical(), 1));
    }

    private double[] documentSlotOffset(Page page, int slot, int horizontal) {
        double documentWidth = page.getDocumentSize() == null ? 0 : Math.max(0, page.getDocumentSize().getWidth());
        double documentHeight = page.getDocumentSize() == null ? 0 : Math.max(0, page.getDocumentSize().getHeight());
        double marginLeft = numberOrZero(page.getMarginLeft());
        double marginTop = numberOrZero(page.getMarginTop());
        double spacingHorizontal = numberOrZero(page.getSpacingHorizontal());
        double spacingVertical = numberOrZero(page.getSpacingVertical());
        int column = slot % Math.max(1, horizontal);
        int row = slot / Math.max(1, horizontal);
        String sequence = page.getDocumentSequence() == null ? "next-right" : page.getDocumentSequence();
        if ("next-vertical".equals(sequence)) {
            int vertical = positiveOrDefault(page.getDocumentsVertical(), 1);
            column = slot / vertical;
            row = slot % vertical;
        } else if ("next-left".equals(sequence)) {
            column = Math.max(0, horizontal - 1 - column);
        }
        return new double[] {
                marginLeft + column * (documentWidth + spacingHorizontal),
                marginTop + row * (documentHeight + spacingVertical)
        };
    }

    private int positiveOrDefault(Integer value, int fallback) {
        return value != null && value > 0 ? value : fallback;
    }

    private double numberOrZero(Double value) {
        return value == null ? 0 : value;
    }
    private void applyUserVariables(Map<String, String> fields, List<UserVariable> userVariables) {
        if (userVariables == null) {
            return;
        }
        for (UserVariable variable : userVariables) {
            if (variable != null && variable.getNome() != null && !variable.getNome().isBlank()) {
                fields.put(variable.getNome(), evaluateAsText(variable.getExpressao(), fields));
            }
        }
    }
    private int resolveTotalRepetitions(List<Page> pages, Map<String, String> fields) {
        String expression = "1";
        for (Page page : pages == null ? List.<Page>of() : pages) {
            if (page != null && page.getNumberingExpression() != null && !page.getNumberingExpression().isBlank()) {
                expression = page.getNumberingExpression();
                break;
            }
        }
        Double value = parseNumber(evaluateAsText(expression, fields));
        return value == null ? 1 : Math.max(1, value.intValue());
    }

    private PreviewSelection failedPreviewSelection(int generatedIndex, int masterIndex, int contRep, int totalRepetitions,
            Map<String, String> fields) {
        PreviewSelection selection = new PreviewSelection();
        selection.pageIndex = generatedIndex;
        selection.masterIndex = masterIndex;
        selection.repetitionIndex = contRep - 1;
        selection.totalRepetitions = totalRepetitions;
        selection.totalMasters = masterIndex + 1;
        selection.fields = new LinkedHashMap<>(fields);
        selection.fields.put("_PageNum", String.valueOf(generatedIndex + 1));
        selection.failureMessage = NO_DOCUMENT_MESSAGE;
        return selection;
    }

    private void addSystemVariables(Map<String, String> fields, int repetitionIndex, int totalRepetitions, String dataFileName) {
        String contRep = String.valueOf(Math.max(1, repetitionIndex));
        String totalRep = String.valueOf(Math.max(1, totalRepetitions));
        fields.put("contRep", contRep);
        fields.put("totalRep", totalRep);
        fields.put("_ContRep", contRep);
        fields.put("_TotRep", totalRep);
        fields.put("_NumRegGr", "1");
        fields.put("_FileName", dataFileName == null ? "" : dataFileName);
        fields.put("_NroDoc", "");
        fields.put("_NumDocHoriz", "0");
        fields.put("_NumDocPag", "0");
        fields.put("_OverflowDoc", "0");
        fields.put("_PageNum", "1");
        fields.put("_SpoolName", "");
        fields.put("_SysMsg1", "");
        fields.put("_AvDetSpace", "0");
        java.time.LocalDate today = java.time.LocalDate.now();
        fields.put("_SysDate1", today.format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        fields.put("_SysDate2", today.format(java.time.format.DateTimeFormatter.ofPattern("ddMMyyyy")));
        fields.put("_SysDate3", today.format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd")));
        fields.put("_SysDate4", String.valueOf(today.getDayOfMonth()));
        fields.put("_SysDate5", String.valueOf(today.getMonthValue()));
        fields.put("_SysDate6", String.valueOf(today.getYear()));
        fields.put("_SysDate7", String.valueOf(today.getDayOfWeek().getValue()));
    }
    private List<Integer> visibleDocumentIndexes(List<Page> pages, Map<String, String> fields) {
        List<Integer> visible = new ArrayList<>();
        for (int i = 0; i < pages.size(); i++) {
            String expression = pages.get(i) == null ? "" : pages.get(i).getDocumentExpression();
            if (expression == null || expression.isBlank() || evaluateAsBoolean(expression, fields)) {
                visible.add(i);
            }
        }
        return visible;
    }

    private List<Integer> firstVisibleDocumentIndex(List<Page> pages, Map<String, String> fields) {
        List<Integer> visible = visibleDocumentIndexes(pages, fields);
        return visible.isEmpty() ? visible : List.of(visible.get(0));
    }

    private void resolvePage(Page page, Map<String, String> fields, PreviewRenderContext renderContext) {
        if (page == null || page.getLayout() == null) {
            return;
        }
        for (int index = 0; index < page.getLayout().size(); index++) {
            Component component = page.getLayout().get(index);
            try {
                resolveComponent(component, fields, renderContext);
            } catch (Exception error) {
                String documentName = firstNotBlank(page.getName(), "documento");
                String componentLabel = previewComponentLabel(component, index);
                throw new IllegalArgumentException("Erro no preview do documento \"" + documentName
                        + "\", componente " + componentLabel + ": " + error.getMessage(), error);
            }
        }
    }

    private String previewComponentLabel(Component component, int index) {
        String type = component == null ? "desconhecido" : firstNotBlank(component.getType(), component.getClass().getSimpleName());
        return "#" + (index + 1) + " (" + type + ")";
    }

    private void resolveComponent(Component component, Map<String, String> fields, PreviewRenderContext renderContext) {
        if (component == null) {
            return;
        }
        if (component.getConditional() != null && !component.getConditional().isBlank()
                && !evaluateAsBoolean(component.getConditional(), fields)) {
            component.setConditional("__preview_hidden__");
            return;
        }
        if (component instanceof CampoSaida campoSaida) {
            String expression = firstNotBlank(campoSaida.getExpressao(), textualContent(component.getContent()));
            String value = evaluateOutputFieldPreviewText(expression, firstNotBlank(campoSaida.getMask(), campoSaida.getMascara()), fields);
            String barcodeContent = resolveLegacyBarcodeOutputContent(campoSaida, expression, fields);
            campoSaida.setPreviewBarcodeContent(barcodeContent);
            campoSaida.setPreviewBarcodeType(barcodeContent.isBlank() ? null
                    : Pattern.compile("(?i)\\bBARC128TT\\s*\\(").matcher(expression).find() ? 3 : 1);
            campoSaida.setPreview(value);
            campoSaida.setContent(mapper.getNodeFactory().textNode(value));
            return;
        }
        if (component instanceof CampoBlocoEnderecamento bloco) {
            resolveAddressBlockPreview(bloco, fields);
            return;
        }
        if (component instanceof CampoLogo logo) {
            resolveImagePreview(logo, fields, renderContext);
            return;
        }
        if (component.getContent() != null) {
            component.setContent(resolveContentNode(component.getContent(), fields));
        }
        if ("barcode".equals(component.getType()) || "qrcode".equals(component.getType())) {
            String value = evaluateAsText(component.getContent() != null ? component.getContent().asText("") : "", fields);
            value = limitCodeContent(value, codeContentLength(component));
            component.setContent(mapper.getNodeFactory().textNode(value));
        }
    }

    private int codeContentLength(Component component) {
        if (component instanceof CampoBarCode barcode && barcode.getNumChar() != null) {
            return barcode.getNumChar();
        }
        if (component instanceof CampoQRCode qrcode && qrcode.getNumChar() != null) {
            return qrcode.getNumChar();
        }
        return 0;
    }

    private String limitCodeContent(String value, int maxLength) {
        String content = value == null ? "" : value;
        if (maxLength <= 0 || content.length() <= maxLength) {
            return content;
        }
        return content.substring(0, maxLength);
    }

    private void resolveAddressBlockPreview(CampoBlocoEnderecamento bloco, Map<String, String> fields) {
        List<String> lines = new ArrayList<>();
        if (bloco.getCampos() != null) {
            for (CampoEnderecoDTO campo : bloco.getCampos()) {
                if (campo == null || campo.isEmpty()) {
                    continue;
                }
                String value = evaluateOutputFieldPreviewText(campo.getExpressao(), campo.getMascara(), fields);
                campo.setPreview(value);
                if (value != null && (!value.isBlank() || bloco.isPermitirLinhasVazias())) {
                    lines.add(value == null ? "" : value);
                }
            }
        }
        bloco.setPreview(String.join("\n", lines));
        bloco.setContent(mapper.getNodeFactory().textNode(bloco.getPreview()));
    }

    private void resolveImagePreview(CampoLogo logo, Map<String, String> fields, PreviewRenderContext renderContext) {
        String expression = firstNotBlank(logo.getOccurrence(), textualContent(logo.getContent()));
        String imageName = evaluateAsText(expression, fields).replace("\"", "").replace("'", "").trim();
        if (imageName.isBlank()) {
            return;
        }

        logo.setOccurrence(imageName);
        logo.setLogoFileName(imageName);
        logo.setContent(mapper.getNodeFactory().textNode(imageName));
        String assetPath = resolveProjectImageAssetPath(renderContext, imageName);
        if (assetPath != null && !assetPath.isBlank()) {
            logo.setAssetPath(assetPath);
            logo.setLogoFileName(fileNameOnly(assetPath));
            logo.setContent(mapper.getNodeFactory().textNode(assetPath));
        }

        if (logo.getWidth() > 0 && logo.getHeight() > 0) {
            return;
        }

        ImageSize imageSize = readProjectImageSize(renderContext, assetPath != null && !assetPath.isBlank() ? assetPath : imageName);
        if (logo.getWidth() <= 0 && logo.getHeight() <= 0) {
            applyZeroSizeImagePreviewDimensions(logo, imageSize);
            return;
        }

        if (imageSize == null || imageSize.widthPx <= 0 || imageSize.heightPx <= 0) {
            return;
        }

        if (logo.getWidth() <= 0) {
            logo.setWidth(logo.getHeight() * imageSize.widthPx / imageSize.heightPx);
        }
        if (logo.getHeight() <= 0) {
            logo.setHeight(logo.getWidth() * imageSize.heightPx / imageSize.widthPx);
        }
    }

    private void applyZeroSizeImagePreviewDimensions(CampoLogo logo, ImageSize imageSize) {
        double width = ZERO_SIZE_IMAGE_PREVIEW_MIN_WIDTH_MM;
        double height = ZERO_SIZE_IMAGE_PREVIEW_MIN_HEIGHT_MM;
        if (imageSize != null && imageSize.widthPx > 0 && imageSize.heightPx > 0) {
            double dpi = logo.getDpiImg() > 0 ? logo.getDpiImg() : IMAGE_PREVIEW_DPI;
            width = imageSize.widthPx * 25.4 / dpi;
            height = width * imageSize.heightPx / imageSize.widthPx;
            if (width < ZERO_SIZE_IMAGE_PREVIEW_MIN_WIDTH_MM) {
                width = ZERO_SIZE_IMAGE_PREVIEW_MIN_WIDTH_MM;
                height = width * imageSize.heightPx / imageSize.widthPx;
            }
            if (height < ZERO_SIZE_IMAGE_PREVIEW_MIN_HEIGHT_MM) {
                height = ZERO_SIZE_IMAGE_PREVIEW_MIN_HEIGHT_MM;
                width = height * imageSize.widthPx / imageSize.heightPx;
            }
        }
        logo.setWidth(width);
        logo.setHeight(height);
    }

    private ImageSize readProjectImageSize(PreviewRenderContext renderContext, String imageName) {
        if (renderContext == null || renderContext.projectId == null || renderContext.projectId.isBlank() || imageName == null || imageName.isBlank()) {
            return null;
        }
        String key = imageName.replace('\\', '/').trim().toLowerCase(Locale.ROOT);
        if (renderContext.imageSizeCache.containsKey(key)) {
            return renderContext.imageSizeCache.get(key);
        }
        ImageSize imageSize = null;
        try (InputStream input = openProjectImage(renderContext, imageName)) {
            if (input == null) {
                renderContext.imageSizeCache.put(key, null);
                return null;
            }
            BufferedImage image = ImageIO.read(input);
            imageSize = image == null ? null : new ImageSize(image.getWidth(), image.getHeight());
        } catch (Exception ignored) {
        }
        renderContext.imageSizeCache.put(key, imageSize);
        return imageSize;
    }

    private InputStream openProjectImage(PreviewRenderContext renderContext, String imageName) throws Exception {
        String normalized = imageName.replace("\"", "").replace("'", "").trim();
        for (String candidate : imageNameCandidates(normalized)) {
            try {
                return projectStorage.loadAsset(renderContext.projectId, candidate);
            } catch (Exception ignored) {
            }
        }

        String fileName = fileNameOnly(normalized);
        String matchingAsset = resolveProjectImageAssetPath(renderContext, fileName);
        if (matchingAsset != null) {
            return projectStorage.loadAsset(renderContext.projectId, matchingAsset);
        }
        return null;
    }

    private String resolveProjectImageAssetPath(PreviewRenderContext renderContext, String imageName) {
        if (renderContext == null || renderContext.projectId == null || renderContext.projectId.isBlank() || imageName == null || imageName.isBlank()) {
            return null;
        }
        String requested = imageName.replace("\"", "").replace("'", "").replace('\\', '/').trim();
        String cacheKey = requested.toLowerCase(Locale.ROOT);
        if (renderContext.imageAssetPathCache.containsKey(cacheKey)) {
            return renderContext.imageAssetPathCache.get(cacheKey);
        }
        String requestedFileName = fileNameOnly(requested);
        String requestedStem = fileStem(requestedFileName);
        for (String asset : renderContext.projectAssets()) {
            if (asset == null || asset.isBlank()) {
                continue;
            }
            String normalizedAsset = asset.replace('\\', '/');
            String assetFileName = fileNameOnly(normalizedAsset);
            if (normalizedAsset.equalsIgnoreCase(requested)
                    || assetFileName.equalsIgnoreCase(requestedFileName)
                    || fileStem(assetFileName).equalsIgnoreCase(requestedStem)) {
                renderContext.imageAssetPathCache.put(cacheKey, normalizedAsset);
                return normalizedAsset;
            }
        }
        renderContext.imageAssetPathCache.put(cacheKey, null);
        return null;
    }

    private List<String> imageNameCandidates(String imageName) {
        if (imageName == null || imageName.isBlank()) {
            return List.of();
        }
        List<String> candidates = new ArrayList<>();
        candidates.add(imageName);
        String fileName = fileNameOnly(imageName);
        if (!fileName.equals(imageName)) {
            candidates.add(fileName);
        }
        if (!fileName.contains(".")) {
            candidates.add(imageName + ".bmp");
            candidates.add(imageName + ".BMP");
            if (!fileName.equals(imageName)) {
                candidates.add(fileName + ".bmp");
                candidates.add(fileName + ".BMP");
            }
        }
        return candidates.stream().distinct().toList();
    }

    private String fileNameOnly(String value) {
        if (value == null) {
            return "";
        }
        String normalized = value.replace('\\', '/');
        int slash = normalized.lastIndexOf('/');
        return slash >= 0 ? normalized.substring(slash + 1) : normalized;
    }

    private String fileStem(String value) {
        String fileName = fileNameOnly(value);
        int dot = fileName.lastIndexOf('.');
        return dot > 0 ? fileName.substring(0, dot) : fileName;
    }

    private record ImageSize(int widthPx, int heightPx) {}

    private String evaluateOutputFieldPreviewText(String expression, Map<String, String> fields) {
        return evaluateOutputFieldPreviewText(expression, "", fields);
    }

    private String evaluateOutputFieldPreviewText(String expression, String mask, Map<String, String> fields) {
        if (expression == null || expression.isBlank()) return "";
        String value = CONDITIONAL_FONT_TAG_PATTERN.matcher(expression).find()
                ? evaluateToken(expression, fields)
                : evaluateAsText(expression, fields);
        return applyOutputMask(value, mask);
    }

    private String resolveLegacyBarcodeOutputContent(CampoSaida campoSaida, String expression, Map<String, String> fields) {
        if (!isLegacyBarcodeOutputField(campoSaida, expression)) {
            return "";
        }
        String value = evaluateLegacyBarcodeSourceExpression(expression, fields);
        String digits = value == null ? "" : value.replaceAll("\\D", "");
        return digits;
    }

    private boolean isLegacyBarcodeOutputField(CampoSaida campoSaida, String expression) {
        String fontFamily = campoSaida != null && campoSaida.getFont() != null
                ? campoSaida.getFont().getFamily()
                : "";
        String normalizedFont = fontFamily == null ? "" : fontFamily.toLowerCase(Locale.ROOT);
        String normalizedExpression = expression == null ? "" : expression.toUpperCase(Locale.ROOT);
        return normalizedExpression.contains("I2OF5(")
                || Pattern.compile("\\bBARC128TT\\s*\\(").matcher(normalizedExpression).find()
                || normalizedFont.contains("0128")
                || normalizedFont.contains("barcode")
                || normalizedFont.contains("bar code")
                || normalizedFont.contains("interleaved");
    }

    private String evaluateLegacyBarcodeSourceExpression(String expression, Map<String, String> fields) {
        if (expression == null || expression.isBlank()) {
            return "";
        }
        String expr = expression.trim();
        IfExpression ifExpression = parseIfExpression(expr);
        if (ifExpression != null) {
            return evaluateAsBoolean(ifExpression.condition(), fields)
                    ? evaluateLegacyBarcodeSourceExpression(ifExpression.thenExpression(), fields)
                    : evaluateLegacyBarcodeSourceExpression(ifExpression.elseExpression(), fields);
        }
        Matcher function = FUNCTION_CALL_PATTERN.matcher(expr);
        if (function.matches() && ("I2OF5".equalsIgnoreCase(function.group(1))
                || "BARC128TT".equalsIgnoreCase(function.group(1)))) {
            List<String> args = splitArguments(function.group(2));
            return args.isEmpty() ? "" : evaluateAsText(args.get(0), fields);
        }
        List<String> pieces = splitTopLevel(expr, '+', '|');
        if (pieces.size() > 1) {
            for (String piece : pieces) {
                String value = evaluateLegacyBarcodeSourceExpression(piece, fields);
                if (!value.isBlank()) {
                    return value;
                }
            }
        }
        return "";
    }

    private String applyOutputMask(String value, String mask) {
        if (mask == null || mask.isBlank()) {
            return value == null ? "" : value;
        }
        String source = value == null ? "" : value;
        String expandedMask = expandAlphanumericRepetitions(mask);
        if (hasNumericMaskPlaceholders(expandedMask)) {
            return applyNumericMask(source, expandedMask);
        }
        return applyAlphanumericMask(source, expandedMask);
    }

    private String expandAlphanumericRepetitions(String mask) {
        StringBuilder expanded = new StringBuilder(mask.length());
        for (int i = 0; i < mask.length(); i++) {
            char current = mask.charAt(i);
            if ((current == 'X' || current == 'A') && i + 1 < mask.length() && mask.charAt(i + 1) == '(') {
                int closeIndex = mask.indexOf(')', i + 2);
                if (closeIndex > i + 2) {
                    try {
                        int amount = Integer.parseInt(mask.substring(i + 2, closeIndex));
                        if (amount > 0) {
                            expanded.append(String.valueOf(current).repeat(amount));
                            i = closeIndex;
                            continue;
                        }
                    } catch (NumberFormatException ignored) {
                        // Mantem a mascara original quando a repeticao estiver invalida.
                    }
                }
            }
            expanded.append(current);
        }
        return expanded.toString();
    }

    private boolean hasNumericMaskPlaceholders(String mask) {
        for (int i = 0; i < mask.length(); i++) {
            char current = mask.charAt(i);
            if (current == '9' || current == 'Z' || current == '*' || current == '$') {
                return true;
            }
        }
        return false;
    }

    private String applyNumericMask(String value, String mask) {
        String digits = value == null ? "" : value.replaceAll("\\D", "");
        StringBuilder result = new StringBuilder(mask);
        int sourceIndex = digits.length() - 1;
        boolean seenSignificantDigit = false;
        int pendingDollarIndex = -1;

        for (int i = mask.length() - 1; i >= 0; i--) {
            char maskChar = mask.charAt(i);
            if (!isNumericMaskPlaceholder(maskChar)) {
                continue;
            }
            char digit = sourceIndex >= 0 ? digits.charAt(sourceIndex--) : '0';
            boolean leadingZero = digit == '0' && !seenSignificantDigit;
            switch (maskChar) {
                case '9' -> result.setCharAt(i, digit);
                case 'Z' -> result.setCharAt(i, leadingZero ? ' ' : digit);
                case '*' -> result.setCharAt(i, leadingZero ? '*' : digit);
                case '$' -> {
                    if (leadingZero) {
                        result.setCharAt(i, ' ');
                        if (pendingDollarIndex < 0) {
                            pendingDollarIndex = i;
                        }
                    } else {
                        result.setCharAt(i, digit);
                        if (i > 0 && mask.charAt(i - 1) == '$') {
                            result.setCharAt(i - 1, '$');
                            pendingDollarIndex = -1;
                        } else {
                            result.insert(i, '$');
                            pendingDollarIndex = -1;
                        }
                    }
                }
                default -> result.setCharAt(i, digit);
            }
            if (digit != '0') {
                seenSignificantDigit = true;
            }
        }
        if (!seenSignificantDigit && pendingDollarIndex >= 0) {
            result.setCharAt(pendingDollarIndex, '$');
        }
        return result.toString();
    }

    private boolean isNumericMaskPlaceholder(char value) {
        return value == '9' || value == 'Z' || value == '*' || value == '$';
    }

    private String applyAlphanumericMask(String value, String mask) {
        String source = value == null ? "" : value;
        StringBuilder result = new StringBuilder(mask.length());
        int sourceIndex = 0;
        for (int i = 0; i < mask.length(); i++) {
            char maskChar = mask.charAt(i);
            if (maskChar == 'X') {
                if (sourceIndex < source.length()) {
                    result.append(source.charAt(sourceIndex++));
                }
            } else if (maskChar == 'A') {
                while (sourceIndex < source.length() && !Character.isLetter(source.charAt(sourceIndex))) {
                    sourceIndex++;
                }
                if (sourceIndex < source.length()) {
                    result.append(source.charAt(sourceIndex++));
                }
            } else {
                result.append(maskChar);
            }
        }
        return result.toString();
    }

    private JsonNode resolveContentNode(JsonNode content, Map<String, String> fields) {
        if (content == null) {
            return null;
        }
        if (content.isArray()) {
            ArrayNode resolved = mapper.createArrayNode();
            for (JsonNode node : content) {
                if (node != null && node.isObject() && isStructuredOutputFieldNode(node)) {
                    ObjectNode textNode = mapper.createObjectNode();
                    textNode.put("type", "text");
                    textNode.put("content", evaluateOutputFieldPreviewText(outputExpressionFrom(node), outputMaskFrom(node), fields));
                    resolved.add(textNode);
                } else if (node != null && node.isObject() && node.path("content").isTextual()) {
                    ObjectNode textNode = node.deepCopy();
                    textNode.put("content", resolveLegacyPreviewText(node.path("content").asText(""), fields));
                    resolved.add(textNode);
                } else {
                    resolved.add(node);
                }
            }
            return resolved;
        }
        if (content.isTextual()) {
            return mapper.getNodeFactory().textNode(resolveLegacyPreviewText(content.asText(""), fields));
        }
        return content;
    }

    private String resolveLegacyPreviewText(String content, Map<String, String> fields) {
        // Only explicit output-field tokens execute expressions; ordinary text is literal.
        return stripLegacyFontTokens(resolveLegacyInlineOutputFields(content, fields));
    }

    private boolean isStructuredOutputFieldNode(JsonNode node) {
        if (node == null || !node.isObject()) {
            return false;
        }
        String type = node.path("type").asText("");
        return "campoSaida".equalsIgnoreCase(type)
                || "outputField".equalsIgnoreCase(type)
                || "output-field".equalsIgnoreCase(type)
                || node.path("expressao").isTextual()
                || node.path("expression").isTextual();
    }

    private String stripLegacyFontTokens(String content) {
        if (content == null || content.isEmpty()) {
            return content;
        }
        return LEGACY_FONT_TOKEN_PATTERN.matcher(content).replaceAll("");
    }

    private String resolveLegacyInlineOutputFields(String content, Map<String, String> fields) {
        if (content == null || content.indexOf(LEGACY_ESCAPE) < 0) {
            return content;
        }
        StringBuilder resolved = new StringBuilder(content.length());
        int cursor = 0;
        while (cursor < content.length()) {
            int start = content.indexOf(LEGACY_ESCAPE, cursor);
            if (start < 0) {
                resolved.append(content.substring(cursor));
                break;
            }
            int end = content.indexOf(LEGACY_ESCAPE, start + 1);
            if (end < 0) {
                resolved.append(content.substring(cursor));
                break;
            }
            resolved.append(content, cursor, start);
            String token = content.substring(start + 1, end);
            if (token.startsWith("C" + LEGACY_SEPARATOR)) {
                String[] parts = token.split(Pattern.quote(LEGACY_SEPARATOR), -1);
                String expression = parts.length > 1 ? parts[1] : "";
                String mask = parts.length > 2 ? parts[2] : "";
                resolved.append(evaluateOutputFieldPreviewText(expression, mask, fields));
            } else if (token.startsWith("R" + LEGACY_SEPARATOR)) {
                String[] parts = token.split(Pattern.quote(LEGACY_SEPARATOR), -1);
                resolved.append(textFioTokenAsPlainText(parts));
            } else if (token.startsWith("L" + LEGACY_SEPARATOR)) {
                String[] parts = token.split(Pattern.quote(LEGACY_SEPARATOR), -1);
                if (parts.length > 1) {
                    parts[1] = evaluateAsText(parts[1], fields).replace("\"", "").replace("'", "").trim();
                }
                resolved.append(LEGACY_ESCAPE).append(String.join(LEGACY_SEPARATOR, parts)).append(LEGACY_ESCAPE);
            } else {
                resolved.append(LEGACY_ESCAPE).append(token).append(LEGACY_ESCAPE);
            }
            cursor = end + 1;
        }
        return resolved.toString();
    }

    private String textFioTokenAsPlainText(String[] parts) {
        String tipoFio = parts.length > 1 && "FIO_VERTICAL".equalsIgnoreCase(parts[1]) ? "FIO_VERTICAL" : "FIO_HORIZONTAL";
        int fallback = "FIO_VERTICAL".equals(tipoFio) ? 3 : 32;
        int length = fallback;
        if (parts.length > 2) {
            try {
                length = Math.max(1, Math.min(200, Integer.parseInt(parts[2])));
            } catch (NumberFormatException ignored) {
                length = fallback;
            }
        }
        if ("FIO_VERTICAL".equals(tipoFio)) {
            return String.join("\r\n", java.util.Collections.nCopies(length, "|"));
        }
        return "-".repeat(length);
    }
    private String outputExpressionFrom(JsonNode node) {
        return firstNotBlank(
                node.path("expression").asText(null),
                node.path("expressao").asText(null),
                node.path("content").asText(null),
                node.path("preview").asText(null));
    }

    private String outputMaskFrom(JsonNode node) {
        return firstNotBlank(
                node.path("mask").asText(null),
                node.path("mascara").asText(null));
    }

    private String textualContent(JsonNode node) {
        return node != null && node.isTextual() ? node.asText() : null;
    }

    private String firstNotBlank(String... values) {
        if (values == null) {
            return "";
        }
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return "";
    }

    private List<String> splitMasterRecords(String text, DataFileConfig config) {
        String raw = stripHeader(text == null ? "" : text, config);
        int recordSize = number(config == null ? null : config.getRecordSize());
        String recordFormat = config == null || config.getRecordFormat() == null ? "fixed" : config.getRecordFormat();
        if ("fixed".equals(recordFormat) && recordSize > 0) {
            List<String> records = new ArrayList<>();
            for (int offset = 0; offset < raw.length(); offset += recordSize) {
                records.add(raw.substring(offset, Math.min(offset + recordSize, raw.length())));
            }
            return records;
        }
        return raw.replace("\r\n", "\n").replace('\r', '\n').lines().toList();
    }

    private Iterable<String> previewRecords(InputStream input, DataFileConfig config) throws IOException {
        return previewRecords(input, config, true);
    }

    private Iterable<String> previewRecords(InputStream input, DataFileConfig config, boolean skipHeader) throws IOException {
        Iterable<RecordWithOffset> records = previewRecordsWithOffsets(input, config, skipHeader);
        return () -> new Iterator<>() {
            private final Iterator<RecordWithOffset> iterator = records.iterator();

            @Override
            public boolean hasNext() {
                return iterator.hasNext();
            }

            @Override
            public String next() {
                return iterator.next().value();
            }
        };
    }

    private Iterable<RecordWithOffset> previewRecordsWithOffsets(InputStream input, DataFileConfig config) throws IOException {
        return previewRecordsWithOffsets(input, config, true);
    }

    private Iterable<RecordWithOffset> previewRecordsWithOffsets(InputStream input, DataFileConfig config, boolean skipHeader) throws IOException {
        BufferedInputStream buffered = new BufferedInputStream(input);
        Charset charset = detectCharset(buffered);
        int recordSize = number(config == null ? null : config.getRecordSize());
        String recordFormat = config == null || config.getRecordFormat() == null ? "fixed" : config.getRecordFormat();
        int headerSize = config != null && Boolean.TRUE.equals(config.getUseHeader()) ? number(config.getHeaderSize()) : 0;
        long offset = 0;
        if (skipHeader) {
            skipBytes(buffered, headerSize);
            offset = headerSize;
        }
        if ("fixed".equals(recordFormat) && recordSize > 0) {
            long firstRecordOffset = offset;
            return () -> new FixedRecordIterator(buffered, charset, recordSize, firstRecordOffset);
        }

        String recordDelimiter = recordDelimiter(config);
        byte[] delimiter = recordDelimiter.getBytes(charset);
        long firstRecordOffset = offset;
        return () -> new DelimitedRecordIterator(buffered, charset, delimiter, firstRecordOffset);
    }

    private Charset detectCharset(BufferedInputStream input) throws IOException {
        input.mark(8192);
        byte[] sample = input.readNBytes(8192);
        input.reset();
        String utf8 = new String(sample, StandardCharsets.UTF_8);
        return utf8.indexOf('\uFFFD') < 0 ? StandardCharsets.UTF_8 : Charset.forName("windows-1252");
    }

    private PreviewRenderContext previewRenderContext(String projectId) {
        PreviewRenderContext context = new PreviewRenderContext();
        context.projectId = projectId;
        if (projectId == null || projectId.isBlank()) {
            return context;
        }
        try (InputStream input = projectStorage.loadAsset(projectId, LAYOUT_DRAFT_ASSET)) {
            JsonNode draft = mapper.readTree(input);
            JsonNode pages = draft == null ? null : draft.get("listaDocumentos");
            if (pages != null && pages.isArray()) {
                context.draftPages = pages;
            }
        } catch (Exception ignored) {
            context.draftPages = null;
        }
        return context;
    }

    private void skipBytes(InputStream input, int bytes) throws IOException {
        int remaining = Math.max(0, bytes);
        while (remaining > 0) {
            long skipped = input.skip(remaining);
            if (skipped <= 0) {
                if (input.read() < 0) {
                    return;
                }
                skipped = 1;
            }
            remaining -= skipped;
        }
    }

    private String stripHeader(String text, DataFileConfig config) {
        if (config != null && Boolean.TRUE.equals(config.getUseHeader())) {
            int headerSize = number(config.getHeaderSize());
            if (headerSize > 0 && text.length() > headerSize) {
                return text.substring(headerSize);
            }
        }
        return text;
    }

    private Map<String, String> extractFields(String record, List<CampoEntrada> campos, DataFileConfig config) {
        Map<String, String> fields = new LinkedHashMap<>();
        if (campos == null) {
            return fields;
        }
        List<String> delimited = splitDelimited(record, config);
        boolean fixed = config == null || config.getRecordFormat() == null || "fixed".equals(config.getRecordFormat());
        for (CampoEntrada campo : campos) {
            if (campo == null || campo.getNome() == null || campo.getNome().isBlank()) {
                continue;
            }
            String value;
            if (fixed) {
                int start = Math.max(0, campo.getPosicao() - 1);
                int end = Math.min(record.length(), start + Math.max(0, campo.getTamanho()));
                value = start < record.length() && end >= start ? record.substring(start, end) : "";
            } else {
                int index = Math.max(0, campo.getIndice());
                value = index < delimited.size() ? delimited.get(index) : "";
            }
            fields.put(campo.getNome(), value.trim());
        }
        return fields;
    }

    private List<String> splitDelimited(String record, DataFileConfig config) {
        String delimiter = delimiter(config == null ? null : config.getFieldDelimiter(), ";");
        return List.of(record.split(Pattern.quote(delimiter), -1));
    }

    private String delimiter(String configured, String fallback) {
        if (configured == null || configured.isBlank()) {
            return fallback;
        }
        return switch (configured.toLowerCase(Locale.ROOT)) {
            case "tab", "\\t" -> "\t";
            case "pipe", "|" -> "|";
            case "semicolon", ";" -> ";";
            case "comma", "," -> ",";
            default -> configured;
        };
    }

    private String recordDelimiter(DataFileConfig config) {
        String configured = config == null ? null : config.getRecordDelimiter();
        if (configured == null || configured.isBlank()) {
            return "\n";
        }
        return switch (configured.toLowerCase(Locale.ROOT)) {
            case "newline", "line", "line-break", "lf", "\\n", "\n" -> "\n";
            case "crlf", "\\r\\n", "\r\n" -> "\r\n";
            case "cr", "\\r", "\r" -> "\r";
            case "semicolon", ";" -> ";";
            case "pipe", "|" -> "|";
            default -> configured;
        };
    }

    private boolean evaluateAsBoolean(String expression, Map<String, String> fields) {
        String normalizedExpression = trimEnclosingParentheses(expression == null ? "" : expression.trim());
        List<String> orParts = splitTopLevelKeyword(normalizedExpression, "OR");
        if (orParts.size() > 1) {
            for (String part : orParts) {
                if (evaluateAsBoolean(part, fields)) {
                    return true;
                }
            }
            return false;
        }

        List<String> andParts = splitTopLevelKeyword(normalizedExpression, "AND");
        if (andParts.size() > 1) {
            for (String part : andParts) {
                if (!evaluateAsBoolean(part, fields)) {
                    return false;
                }
            }
            return true;
        }

        if (normalizedExpression.regionMatches(true, 0, "NOT ", 0, 4)) {
            return !evaluateAsBoolean(normalizedExpression.substring(4), fields);
        }

        String value = evaluateAsText(normalizedExpression, fields).trim();
        if (value.isBlank()) {
            return false;
        }
        if ("true".equalsIgnoreCase(value) || "sim".equalsIgnoreCase(value)) {
            return true;
        }
        if ("false".equalsIgnoreCase(value) || "nao".equalsIgnoreCase(value) || "nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£o".equalsIgnoreCase(value)) {
            return false;
        }
        try {
            return Double.parseDouble(value.replace(',', '.')) != 0;
        } catch (NumberFormatException ignored) {
            return true;
        }
    }

    private String trimEnclosingParentheses(String expression) {
        String value = expression == null ? "" : expression.trim();
        while (value.startsWith("(") && value.endsWith(")") && matchingClosingParenIndex(value, 0) == value.length() - 1) {
            value = value.substring(1, value.length() - 1).trim();
        }
        return value;
    }

    private IfExpression parseIfExpression(String expression) {
        String value = expression == null ? "" : expression.trim();
        if (!value.regionMatches(true, 0, "IF", 0, 2)) {
            return null;
        }
        int cursor = 2;
        while (cursor < value.length() && Character.isWhitespace(value.charAt(cursor))) {
            cursor++;
        }
        if (cursor >= value.length() || value.charAt(cursor) != '(') {
            return null;
        }
        int closeIndex = matchingClosingParenIndex(value, cursor);
        if (closeIndex < 0) {
            return null;
        }
        String condition = value.substring(cursor + 1, closeIndex).trim();
        String remainder = value.substring(closeIndex + 1).trim();
        if (remainder.isBlank()) {
            return new IfExpression(condition, "", "");
        }
        List<String> branches = splitTopLevelKeyword(remainder, "ELSE");
        if (branches.size() > 1) {
            return new IfExpression(condition, branches.get(0), branches.get(1));
        }
        return new IfExpression(condition, remainder, "");
    }

    private String evaluateAsText(String expression, Map<String, String> fields) {
        if (expression == null) {
            return "";
        }
        String expr = expression.trim();
        if (expr.isBlank()) {
            return "";
        }
        if (isQuoted(expr)) {
            return unquote(expr);
        }

        IfExpression ifExpression = parseIfExpression(expr);
        if (ifExpression != null) {
            boolean condition = evaluateAsBoolean(ifExpression.condition(), fields);
            if (ifExpression.thenExpression().isBlank() && ifExpression.elseExpression().isBlank()) {
                return String.valueOf(condition);
            }
            return condition
                    ? evaluateAsText(ifExpression.thenExpression(), fields)
                    : evaluateAsText(ifExpression.elseExpression(), fields);
        }

        ComparisonExpression comparison = parseComparisonExpression(expr);
        if (comparison != null) {
            return String.valueOf(compare(
                    evaluateAsText(comparison.left(), fields),
                    evaluateAsText(comparison.right(), fields),
                    comparison.operator()));
        }

        List<String> pieces = splitTopLevel(expr, '+', '|');
        if (pieces.size() > 1) {
            return evaluateJoinedExpression(expr, pieces, fields);
        }

        Matcher function = FUNCTION_CALL_PATTERN.matcher(expr);
        if (function.matches()) {
            return evaluateFunction(function.group(1), function.group(2), fields);
        }

        Double arithmetic = evaluateArithmeticExpression(expr, fields);
        if (arithmetic != null) {
            return formatNumber(arithmetic);
        }

        return evaluateToken(expr, fields);
    }

    private String evaluateJoinedExpression(String source, List<String> pieces, Map<String, String> fields) {
        boolean concat = source.indexOf('|') >= 0;
        List<String> values = new ArrayList<>();
        boolean allNumeric = !concat;
        double total = 0;
        for (String piece : pieces) {
            String value = evaluateAsText(piece, fields);
            values.add(value);
            Double number = parseNumber(value);
            if (number == null) {
                allNumeric = false;
            } else {
                total += number;
            }
        }
        if (allNumeric) {
            return formatNumber(total);
        }
        StringBuilder builder = new StringBuilder();
        values.forEach(builder::append);
        return builder.toString();
    }

    private String evaluateFunction(String name, String argsSource, Map<String, String> fields) {
        String normalized = name == null ? "" : name.trim().toUpperCase(Locale.ROOT);
        List<String> arguments = evaluatedArguments(splitArguments(argsSource), fields);
        return switch (normalized) {
            case "RTRIM" -> arguments.isEmpty() ? "" : arguments.get(0).replaceFirst("\\s+$", "");
            case "LTRIM" -> arguments.isEmpty() ? "" : arguments.get(0).replaceFirst("^\\s+", "");
            case "TRIM", "TRIMM" -> arguments.isEmpty() ? "" : arguments.get(0).trim();
            case "VALNUM" -> arguments.isEmpty() ? "" : arguments.get(0).replaceAll("\\D", "");
            case "I2OF5" -> arguments.isEmpty() ? "" : arguments.get(0);
            default -> siriusUserFunctionClient.execute(normalized, arguments);
        };
    }

    private List<String> evaluatedArguments(List<String> args, Map<String, String> fields) {
        if (args == null || args.isEmpty()) {
            return List.of();
        }
        List<String> values = new ArrayList<>();
        for (String arg : args) {
            values.add(evaluateAsText(arg, fields));
        }
        return values;
    }

    private int intArg(List<String> args, int index, int fallback, Map<String, String> fields) {
        if (index >= args.size()) {
            return fallback;
        }
        Double value = parseNumber(evaluateAsText(args.get(index), fields));
        return value == null ? fallback : Math.max(0, value.intValue());
    }

    private String substring(String value, int start, int length) {
        int begin = Math.max(0, start - 1);
        if (begin >= value.length()) {
            return "";
        }
        int end = Math.min(value.length(), begin + Math.max(0, length));
        return value.substring(begin, end);
    }

    private String rebuildUnknownFunction(String name, List<String> args, Map<String, String> fields) {
        List<String> values = new ArrayList<>();
        for (String arg : args) {
            values.add(evaluateAsText(arg, fields));
        }
        return name + "(" + String.join(", ", values) + ")";
    }

    private String evaluateToken(String token, Map<String, String> fields) {
        String value = token == null ? "" : token.trim();
        String field = fieldValue(value, fields);
        if (field != null) {
            return field;
        }
        String withFunctions = replaceInlineFunctions(value, fields);
        Matcher matcher = FIELD_TOKEN_PATTERN.matcher(withFunctions);
        StringBuffer buffer = new StringBuffer();
        boolean changed = false;
        while (matcher.find()) {
            String name = matcher.group();
            String replacement = fieldValue(name, fields);
            if (replacement != null) {
                matcher.appendReplacement(buffer, Matcher.quoteReplacement(replacement));
                changed = true;
            }
        }
        matcher.appendTail(buffer);
        return changed ? buffer.toString() : withFunctions;
    }

    private String replaceInlineFunctions(String value, Map<String, String> fields) {
        Matcher matcher = INLINE_FUNCTION_PATTERN.matcher(value);
        StringBuffer buffer = new StringBuffer();
        boolean changed = false;
        while (matcher.find()) {
            String functionName = matcher.group(1);
            if (fieldValue(functionName, fields) != null) {
                continue;
            }
            String evaluated = evaluateFunction(functionName, matcher.group(2), fields);
            matcher.appendReplacement(buffer, Matcher.quoteReplacement(evaluated));
            changed = true;
        }
        matcher.appendTail(buffer);
        return changed ? buffer.toString() : value;
    }

    private String fieldValue(String name, Map<String, String> fields) {
        if (name == null || fields == null) {
            return null;
        }
        if (fields.containsKey(name)) {
            return fields.get(name);
        }
        for (Map.Entry<String, String> entry : fields.entrySet()) {
            if (entry.getKey() != null && entry.getKey().equalsIgnoreCase(name.trim())) {
                return entry.getValue();
            }
        }
        return null;
    }

    private List<String> splitTopLevel(String expression, char... separators) {
        List<String> parts = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean quoted = false;
        int depth = 0;
        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c == '"') {
                quoted = !quoted;
                current.append(c);
                continue;
            }
            if (!quoted) {
                if (c == '(') depth++;
                if (c == ')' && depth > 0) depth--;
                if (depth == 0 && isSeparator(c, separators)) {
                    parts.add(current.toString());
                    current.setLength(0);
                    continue;
                }
            }
            current.append(c);
        }
        parts.add(current.toString());
        return parts;
    }

    private List<String> splitTopLevelKeyword(String expression, String keyword) {
        List<String> parts = new ArrayList<>();
        String value = expression == null ? "" : expression;
        int depth = 0;
        boolean quoted = false;
        int start = 0;
        for (int i = 0; i < value.length(); i++) {
            char c = value.charAt(i);
            if (c == '"') {
                quoted = !quoted;
                continue;
            }
            if (quoted) {
                continue;
            }
            if (c == '(') {
                depth++;
                continue;
            }
            if (c == ')' && depth > 0) {
                depth--;
                continue;
            }
            if (depth == 0 && regionMatchesKeyword(value, i, keyword)) {
                parts.add(value.substring(start, i).trim());
                i += keyword.length() - 1;
                start = i + 1;
            }
        }
        parts.add(value.substring(start).trim());
        return parts;
    }

    private boolean regionMatchesKeyword(String value, int offset, String keyword) {
        if (!value.regionMatches(true, offset, keyword, 0, keyword.length())) {
            return false;
        }
        int before = offset - 1;
        int after = offset + keyword.length();
        return (before < 0 || !isIdentifierChar(value.charAt(before)))
                && (after >= value.length() || !isIdentifierChar(value.charAt(after)));
    }

    private ComparisonExpression parseComparisonExpression(String expression) {
        String value = expression == null ? "" : expression;
        int depth = 0;
        boolean quoted = false;
        for (int i = 0; i < value.length(); i++) {
            char current = value.charAt(i);
            if (current == '"') {
                quoted = !quoted;
                continue;
            }
            if (quoted) {
                continue;
            }
            if (current == '(') {
                depth++;
                continue;
            }
            if (current == ')' && depth > 0) {
                depth--;
                continue;
            }
            if (depth != 0) {
                continue;
            }
            String operator = comparisonOperatorAt(value, i);
            if (operator == null) {
                continue;
            }
            String left = value.substring(0, i).trim();
            String right = value.substring(i + operator.length()).trim();
            if (left.isBlank() || right.isBlank()) {
                return null;
            }
            return new ComparisonExpression(left, operator, right);
        }
        return null;
    }

    private String comparisonOperatorAt(String value, int index) {
        if (index + 1 < value.length()) {
            String twoChars = value.substring(index, index + 2);
            if ("==".equals(twoChars) || "<>".equals(twoChars) || "!=".equals(twoChars)
                    || ">=".equals(twoChars) || "<=".equals(twoChars)) {
                return twoChars;
            }
        }
        char current = value.charAt(index);
        return current == '=' || current == '>' || current == '<' ? String.valueOf(current) : null;
    }

    private boolean isIdentifierChar(char value) {
        return Character.isLetterOrDigit(value) || value == '_';
    }

    private int matchingClosingParenIndex(String value, int openIndex) {
        boolean quoted = false;
        int depth = 0;
        for (int i = openIndex; i < value.length(); i++) {
            char c = value.charAt(i);
            if (c == '"') {
                quoted = !quoted;
                continue;
            }
            if (quoted) {
                continue;
            }
            if (c == '(') {
                depth++;
            } else if (c == ')') {
                depth--;
                if (depth == 0) {
                    return i;
                }
            }
        }
        return -1;
    }

    private List<String> splitArguments(String source) {
        if (source == null || source.isBlank()) {
            return List.of();
        }
        return splitTopLevel(source, ',');
    }

    private boolean isSeparator(char value, char... separators) {
        for (char separator : separators) {
            if (value == separator) {
                return true;
            }
        }
        return false;
    }

    private boolean isQuoted(String value) {
        if (value.length() < 2 || !value.startsWith("\"")) {
            return false;
        }
        for (int i = 1; i < value.length(); i++) {
            if (value.charAt(i) == '"') {
                return i == value.length() - 1;
            }
        }
        return false;
    }

    private String unquote(String value) {
        return value.substring(1, value.length() - 1);
    }

    private String stripTrailing(String value) {
        return value == null ? "" : value.replaceFirst("\\s+$", "");
    }

    private String stripLeading(String value) {
        return value == null ? "" : value.replaceFirst("^\\s+", "");
    }

    private boolean compare(String left, String right, String operator) {
        Double leftNumber = parseNumber(left);
        Double rightNumber = parseNumber(right);
        int result = leftNumber != null && rightNumber != null
                ? Double.compare(leftNumber, rightNumber)
                : String.valueOf(left).compareToIgnoreCase(String.valueOf(right));
        return switch (operator) {
            case "=", "==" -> result == 0;
            case "<>", "!=" -> result != 0;
            case ">" -> result > 0;
            case "<" -> result < 0;
            case ">=" -> result >= 0;
            case "<=" -> result <= 0;
            default -> false;
        };
    }

    private Double parseNumber(String value) {
        try {
            return Double.parseDouble(String.valueOf(value).trim().replace(',', '.'));
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private String formatNumber(double value) {
        if (Math.rint(value) == value) {
            return String.valueOf((long) value);
        }
        return String.valueOf(value);
    }

    private Double evaluateArithmeticExpression(String expression, Map<String, String> fields) {
        if (!containsArithmeticOperator(expression)) {
            return null;
        }
        ArithmeticExpressionParser parser = new ArithmeticExpressionParser(expression, fields);
        return parser.parse();
    }

    private boolean containsArithmeticOperator(String expression) {
        boolean quoted = false;
        for (int i = 0; i < expression.length(); i++) {
            char current = expression.charAt(i);
            if (current == '"') {
                quoted = !quoted;
                continue;
            }
            if (!quoted && (current == '+' || current == '-' || current == '*' || current == '/' || current == '%')) {
                return true;
            }
        }
        return false;
    }

    private final class ArithmeticExpressionParser {
        private final String expression;
        private final Map<String, String> fields;
        private int index;

        private ArithmeticExpressionParser(String expression, Map<String, String> fields) {
            this.expression = expression == null ? "" : expression;
            this.fields = fields;
        }

        private Double parse() {
            try {
                Double value = parseExpression();
                skipSpaces();
                return value != null && index >= expression.length() ? value : null;
            } catch (IllegalArgumentException | ArithmeticException ignored) {
                return null;
            }
        }

        private Double parseExpression() {
            Double value = parseTerm();
            if (value == null) {
                return null;
            }
            while (true) {
                skipSpaces();
                if (match('+')) {
                    Double right = parseTerm();
                    if (right == null) return null;
                    value += right;
                } else if (match('-')) {
                    Double right = parseTerm();
                    if (right == null) return null;
                    value -= right;
                } else {
                    return value;
                }
            }
        }

        private Double parseTerm() {
            Double value = parseFactor();
            if (value == null) {
                return null;
            }
            while (true) {
                skipSpaces();
                if (match('*')) {
                    Double right = parseFactor();
                    if (right == null) return null;
                    value *= right;
                } else if (match('/')) {
                    Double right = parseFactor();
                    if (right == null) return null;
                    value /= right;
                } else if (match('%')) {
                    Double right = parseFactor();
                    if (right == null) return null;
                    value %= right;
                } else {
                    return value;
                }
            }
        }

        private Double parseFactor() {
            skipSpaces();
            if (match('+')) {
                return parseFactor();
            }
            if (match('-')) {
                Double value = parseFactor();
                return value == null ? null : -value;
            }
            if (match('(')) {
                Double value = parseExpression();
                skipSpaces();
                if (!match(')')) {
                    return null;
                }
                return value;
            }
            if (index < expression.length() && expression.charAt(index) == '"') {
                int end = expression.indexOf('"', index + 1);
                if (end < 0) {
                    return null;
                }
                String value = expression.substring(index + 1, end);
                index = end + 1;
                return parseNumber(value);
            }
            if (index < expression.length() && (Character.isDigit(expression.charAt(index)) || expression.charAt(index) == '.' || expression.charAt(index) == ',')) {
                int start = index;
                while (index < expression.length()
                        && (Character.isDigit(expression.charAt(index)) || expression.charAt(index) == '.' || expression.charAt(index) == ',')) {
                    index++;
                }
                return parseNumber(expression.substring(start, index));
            }
            if (index < expression.length() && isIdentifierChar(expression.charAt(index))) {
                int start = index;
                while (index < expression.length() && isIdentifierChar(expression.charAt(index))) {
                    index++;
                }
                String identifier = expression.substring(start, index);
                skipSpaces();
                if (index < expression.length() && expression.charAt(index) == '(') {
                    int close = matchingClosingParenIndex(expression, index);
                    if (close < 0) {
                        return null;
                    }
                    String args = expression.substring(index + 1, close);
                    index = close + 1;
                    return parseNumber(evaluateFunction(identifier, args, fields));
                }
                return parseNumber(fieldValue(identifier, fields));
            }
            return null;
        }

        private boolean match(char expected) {
            if (index < expression.length() && expression.charAt(index) == expected) {
                index++;
                return true;
            }
            return false;
        }

        private void skipSpaces() {
            while (index < expression.length() && Character.isWhitespace(expression.charAt(index))) {
                index++;
            }
        }
    }

    private String decode(InputStream input) throws IOException {
        byte[] bytes = readAllBytes(input);
        String utf8 = new String(bytes, StandardCharsets.UTF_8);
        return utf8.indexOf('\uFFFD') < 0 ? utf8 : new String(bytes, Charset.forName("windows-1252"));
    }

    private byte[] readAllBytes(InputStream input) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        input.transferTo(output);
        return output.toByteArray();
    }

    private int number(Integer value) {
        return value == null ? 0 : Math.max(0, value);
    }


    private record FunctionContext(Set<String> userFunctions) {
        static FunctionContext empty() {
            return new FunctionContext(Set.of());
        }

        boolean isUserFunction(String name) {
            return name != null && userFunctions.contains(name.trim().toUpperCase(Locale.ROOT));
        }
    }

    private record IfExpression(String condition, String thenExpression, String elseExpression) {}

    private record ComparisonExpression(String left, String operator, String right) {}



    private static class PreviewContext {
        List<Page> pages;
        List<String> masterRecords;
    }

    private static class PreviewSelectionResult {
        List<Page> pages;
        List<PreviewSelection> selections;
        int totalPreviewPages;
        int totalMasters;
    }

    private class PreviewRenderContext {
        String projectId;
        JsonNode draftPages;
        List<String> projectAssets;
        Map<String, String> imageAssetPathCache = new LinkedHashMap<>();
        Map<String, ImageSize> imageSizeCache = new LinkedHashMap<>();

        List<String> projectAssets() {
            if (projectAssets != null) {
                return projectAssets;
            }
            if (projectId == null || projectId.isBlank()) {
                projectAssets = List.of();
                return projectAssets;
            }
            try {
                projectAssets = projectStorage.listAssets(projectId);
            } catch (Exception ignored) {
                projectAssets = List.of();
            }
            return projectAssets;
        }
    }

    public class PreviewCursor implements AutoCloseable {
        private final LayoutPreviewRequest request;
        private final InputStream dataInput;
        private final String dataFileName;
        private final Iterator<String> masterRecords;
        private final List<Page> pages;
        private final PreviewRenderContext renderContext;
        // Keep only the navigation index. Rendered preview pages are never retained.
        private final TreeMap<Integer, PreviewSelection> selections = new TreeMap<>();
        private int masterIndex;
        private int generatedIndex;
        private boolean finished;

        PreviewCursor(LayoutPreviewRequest request, InputStream dataInput, String dataFileName, Iterator<String> masterRecords,
                List<Page> pages, PreviewRenderContext renderContext, int startPageIndex, int startMasterIndex) {
            this.request = request;
            this.dataInput = dataInput;
            this.dataFileName = dataFileName;
            this.masterRecords = masterRecords;
            this.pages = pages;
            this.renderContext = renderContext;
            this.masterIndex = Math.max(0, startMasterIndex);
            this.generatedIndex = Math.max(0, startPageIndex);
        }

        synchronized LayoutPreviewResponseDTO page(int requestedPageIndex) {
            PreviewSelection selection = selections.get(requestedPageIndex);
            if (selection != null) {
                throwIfFailedSelection(selection);
                return renderSelection(selection);
            }
            while (!finished && generatedIndex <= requestedPageIndex) {
                if (!masterRecords.hasNext()) {
                    finished = true;
                    break;
                }
                generateMaster(masterRecords.next());
                masterIndex++;
            }
            selection = selections.get(requestedPageIndex);
            if (selection != null) {
                throwIfFailedSelection(selection);
                return renderSelection(selection);
            }
            if (!selections.isEmpty()) {
                return renderSelection(selections.lastEntry().getValue());
            }
            throw new IllegalArgumentException("Nenhum documento foi selecionado para preview. Verifique as expressoes associadas aos documentos.");
        }

        private void generateMaster(String masterRecord) {
            Map<String, String> masterFields = extractFields(masterRecord, request.getCamposEntrada(), request.getDataFileConfig());
            int totalRepetitions = resolveTotalRepetitions(pages, masterFields);
            for (int contRep = 1; contRep <= totalRepetitions; contRep++) {
                Map<String, String> fields = new LinkedHashMap<>(masterFields);
                addSystemVariables(fields, contRep, totalRepetitions, dataFileName);
                applyUserVariables(fields, request.getUserVariables());
                List<Integer> visibleIndexes = firstVisibleDocumentIndex(pages, fields);
                if (visibleIndexes.isEmpty()) {
                    PreviewSelection selection = failedPreviewSelection(generatedIndex, masterIndex, contRep, totalRepetitions, fields);
                    selection.totalPreviewPages = generatedIndex + 1;
                    selections.put(generatedIndex, selection);
                    generatedIndex++;
                    continue;
                }
                Map<String, String> pageFields = new LinkedHashMap<>(fields);
                pageFields.put("_PageNum", String.valueOf(generatedIndex + 1));
                pageFields.put("_NroDoc", String.valueOf(visibleIndexes.get(0) + 1));
                String overlayNumber = resolveOverlayNumber(pages, request, pageFields);
                if (overlayNumber != null) {
                    pageFields.put("_OverlayNum", overlayNumber);
                }
                PreviewSelection selection = new PreviewSelection();
                selection.pageIndex = generatedIndex;
                selection.masterIndex = masterIndex;
                selection.repetitionIndex = contRep - 1;
                selection.totalRepetitions = totalRepetitions;
                selection.documentIndex = visibleIndexes.get(0);
                selection.totalMasters = masterIndex + 1;
                selection.visibleDocumentIndexes = visibleIndexes;
                selection.sheetDocumentIndexes = new ArrayList<>(visibleIndexes);
                selection.fields = pageFields;
                selection.totalPreviewPages = generatedIndex + 1;
                selections.put(generatedIndex, selection);
                generatedIndex++;
            }
        }

        private LayoutPreviewResponseDTO renderSelection(PreviewSelection selection) {
            return withCursorTotals(buildPreviewResponse(pages, request, dataFileName, renderContext, selection));
        }

        private void throwIfFailedSelection(PreviewSelection selection) {
            if (selection != null && selection.failureMessage != null) {
                throw new IllegalArgumentException(selection.failureMessage);
            }
        }

        private LayoutPreviewResponseDTO withCursorTotals(LayoutPreviewResponseDTO response) {
            int responsePageIndex = response.getPageIndex() == null ? 0 : response.getPageIndex();
            int rangeEnd = request.getPreviewPageCount() == null || request.getPreviewPageCount() <= 0
                    ? generatedIndex + (finished ? 0 : 1)
                    : Math.max(generatedIndex, Math.max(0, request.getPreviewStartPageIndex() == null ? 0 : request.getPreviewStartPageIndex())
                            + Math.max(1, request.getPreviewPageCount()));
            response.setTotalPreviewPages(finished ? Math.max(generatedIndex, responsePageIndex + 1) : Math.max(rangeEnd, responsePageIndex + 2));
            response.setTotalMasters(masterIndex);
            return response;
        }

        @Override
        public void close() throws IOException {
            dataInput.close();
        }
    }

    private static class PreviewSelection {
        int pageIndex;
        int totalPreviewPages;
        List<Integer> sheetDocumentIndexes;
        int masterIndex;
        int totalMasters;
        int repetitionIndex;
        int totalRepetitions;
        int documentIndex;
        List<Integer> visibleDocumentIndexes;
        String failureMessage;
        Map<String, String> fields;
    }

    private record RecordWithOffset(String value, long offset) {
    }

    private static class RangeInputStream extends InputStream {
        private static final int RANGE_BLOCK_SIZE = 256 * 1024;

        private final RangeInputProvider provider;
        private final long contentLength;
        private long position;
        private InputStream currentRange;
        private boolean closed;

        RangeInputStream(RangeInputProvider provider, long contentLength) {
            this(provider, contentLength, 0);
        }

        RangeInputStream(RangeInputProvider provider, long contentLength, long startPosition) {
            this.provider = provider;
            this.contentLength = contentLength;
            this.position = Math.max(0, Math.min(startPosition, contentLength));
        }

        @Override
        public int read() throws IOException {
            byte[] single = new byte[1];
            return read(single, 0, 1) == -1 ? -1 : single[0] & 0xFF;
        }

        @Override
        public int read(byte[] buffer, int offset, int length) throws IOException {
            if (length == 0) {
                return 0;
            }
            ensureOpen();
            if (position >= contentLength) {
                return -1;
            }
            while (true) {
                openNextRangeIfNeeded();
                int read = currentRange.read(buffer, offset, length);
                if (read > 0) {
                    position += read;
                    return read;
                }
                closeCurrentRange();
                if (position >= contentLength) {
                    return -1;
                }
            }
        }

        private void openNextRangeIfNeeded() throws IOException {
            if (currentRange != null) {
                return;
            }
            long end = Math.min(contentLength - 1, position + RANGE_BLOCK_SIZE - 1L);
            try {
                currentRange = provider.open(position, end);
            } catch (Exception error) {
                throw new IOException("Nao foi possivel abrir o intervalo " + position + "-" + end + " do arquivo de preview", error);
            }
        }

        private void closeCurrentRange() throws IOException {
            if (currentRange != null) {
                currentRange.close();
                currentRange = null;
            }
        }

        private void ensureOpen() throws IOException {
            if (closed) {
                throw new IOException("Stream de preview fechado");
            }
        }

        @Override
        public void close() throws IOException {
            if (!closed) {
                closed = true;
                closeCurrentRange();
            }
        }
    }

    private static class FixedRecordIterator implements Iterator<RecordWithOffset> {
        private final InputStream input;
        private final Charset charset;
        private final int recordSize;
        private long nextOffset;
        private RecordWithOffset next;
        private boolean loaded;
        private boolean done;

        FixedRecordIterator(InputStream input, Charset charset, int recordSize, long firstRecordOffset) {
            this.input = input;
            this.charset = charset;
            this.recordSize = recordSize;
            this.nextOffset = firstRecordOffset;
        }

        @Override
        public boolean hasNext() {
            load();
            return !done;
        }

        @Override
        public RecordWithOffset next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            RecordWithOffset value = next;
            next = null;
            loaded = false;
            return value;
        }

        private void load() {
            if (loaded || done) {
                return;
            }
            try {
                byte[] buffer = input.readNBytes(recordSize);
                if (buffer.length == 0) {
                    done = true;
                    return;
                }
                next = new RecordWithOffset(new String(buffer, charset), nextOffset);
                nextOffset += buffer.length;
                loaded = true;
            } catch (IOException error) {
                throw new IllegalStateException("Erro ao ler registro do arquivo de preview", error);
            }
        }
    }

    private static class DelimitedRecordIterator implements Iterator<RecordWithOffset> {
        private final InputStream input;
        private final Charset charset;
        private final byte[] delimiter;
        private long nextOffset;
        private RecordWithOffset next;
        private boolean loaded;
        private boolean done;

        DelimitedRecordIterator(InputStream input, Charset charset, byte[] delimiter, long firstRecordOffset) {
            if (delimiter == null || delimiter.length == 0) {
                throw new IllegalArgumentException("Delimitador de registro invalido");
            }
            this.input = input;
            this.charset = charset;
            this.delimiter = delimiter;
            this.nextOffset = firstRecordOffset;
        }

        @Override
        public boolean hasNext() {
            load();
            return !done;
        }

        @Override
        public RecordWithOffset next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            RecordWithOffset value = next;
            next = null;
            loaded = false;
            return value;
        }

        private void load() {
            if (loaded || done) {
                return;
            }
            try {
                ByteArrayOutputStream record = new ByteArrayOutputStream();
                int value;
                int matchedDelimiterBytes = 0;
                long recordOffset = nextOffset;
                while ((value = input.read()) != -1) {
                    record.write(value);
                    nextOffset++;
                    if ((byte) value == delimiter[matchedDelimiterBytes]) {
                        matchedDelimiterBytes++;
                    } else {
                        matchedDelimiterBytes = (byte) value == delimiter[0] ? 1 : 0;
                    }
                    if (matchedDelimiterBytes == delimiter.length) {
                        byte[] bytes = record.toByteArray();
                        next = new RecordWithOffset(new String(bytes, 0, bytes.length - delimiter.length, charset), recordOffset);
                        loaded = true;
                        return;
                    }
                }
                if (record.size() == 0) {
                    done = true;
                    return;
                }
                next = new RecordWithOffset(record.toString(charset), recordOffset);
                loaded = true;
            } catch (IOException error) {
                throw new IllegalStateException("Erro ao ler registro delimitado do arquivo de preview", error);
            }
        }
    }
}