import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import co.sirius.format.pontof.controller.gravar.PontoFGravar;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import co.sirius.format.pontof.model.Documento;
import co.sirius.format.pontof.model.Fio;
import co.sirius.format.pontof.model.PontoF;
import co.sirius.format.pontof.model.TextField;
import co.sirius.format.pontof.util.Constantes;
import co.sirius.format.pontof.util.Enums.tp_alin;
import co.sirius.format.pontof.util.Enums.tp_fio;

public class PontoFDraftTool {
    private static final DateTimeFormatter TS = DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss");
    private static final double UNITS_PER_MM = 300.0 / 25.4;
    private static final double A4_W = 210.0;
    private static final double A4_H = 297.0;

    public static void main(String[] args) throws Exception {
        if (args.length == 0) {
            usage();
            return;
        }

        switch (args[0]) {
            case "criar" -> criar(args);
            case "criar-carta" -> criarCarta(args);
            case "editar-cor" -> editarCor(args);
            case "ajustar-fios", "mover-linha-topo" -> throw new IllegalArgumentException("Ajuste sem alvo desativado. Use plano com snapshot, documentos e IDs explicitos.");
            case "mapear-elementos" -> mapearElementos(args);
            case "inspecionar" -> inspecionar(args);
            default -> usage();
        }
    }

    private static void criar(String[] args) throws Exception {
        String nome = option(args, "--nome", "carta-simples");
        String titulo = option(args, "--titulo", "Carta simples");
        String corpo = option(args, "--corpo", "Texto inicial criado pela ferramenta local do Format LLM.");
        String cor = option(args, "--cor", "#000000");

        Documento documento = baseDocument(titulo);
        documento.setListaTextField(new ArrayList<>(List.of(
                text(titulo, 18, 22, 174, 12, 16, "#000000", 700),
                text(corpo, 18, 48, 174, 70, 11, cor, 400)
        )));
        documento.setnText((short) documento.getListaTextField().size());
        gravarNovo(nome, documento);
    }

    private static void criarCarta(String[] args) throws Exception {
        String nome = option(args, "--nome", "carta-completa");
        String titulo = option(args, "--titulo", "Carta de Comunicacao");
        String empresa = option(args, "--empresa", "Empresa Exemplo");
        String destinatario = option(args, "--destinatario", "Cliente Exemplo");
        String assunto = option(args, "--assunto", "Atualizacao cadastral");
        String data = option(args, "--data", "13/10/2026");
        String corpo = option(args, "--corpo", "Informamos que este documento foi gerado pelo fluxo local do Format LLM para validar uma carta mais completa, com secoes, linhas e assinatura.");
        String assinatura = option(args, "--assinatura", "Equipe de Atendimento");
        String cor = option(args, "--cor", "#222222");

        Documento documento = baseDocument(titulo);
        List<TextField> textos = new ArrayList<>();
        textos.add(text(empresa, 18, 14, 72, 8, 11, "#333333", 700));
        textos.add(text("LOGO", 160, 13, 24, 10, 10, "#555555", 700));
        textos.add(text(titulo, 18, 31, 174, 12, 16, "#000000", 700));
        textos.add(text("Data: " + data, 132, 49, 60, 8, 10, "#333333", 400));
        textos.add(text("Destinatario: " + destinatario, 18, 62, 174, 9, 11, "#222222", 700));
        textos.add(text("Assunto: " + assunto, 18, 76, 174, 9, 11, "#222222", 700));
        textos.add(text("Prezado(a),", 18, 98, 174, 8, 11, cor, 400));
        textos.add(text(corpo, 18, 112, 174, 52, 11, cor, 400));
        textos.add(text("Atenciosamente,", 18, 177, 80, 8, 11, cor, 400));
        textos.add(text(assinatura, 118, 199, 74, 8, 11, "#222222", 700));
        textos.add(text("Documento gerado para teste de Ponto F via API local.", 18, 276, 174, 7, 8, "#555555", 400));
        documento.setListaTextField(textos);
        documento.setnText((short) textos.size());

        List<Fio> fios = new ArrayList<>();
        fios.add(fioHorizontal(18, 28, 174, "#BBBBBB", 0.25));
        fios.add(fioHorizontal(18, 44, 174, "#DDDDDD", 0.20));
        fios.add(fioHorizontal(118, 196, 74, "#333333", 0.25));
        fios.add(fioHorizontal(18, 272, 174, "#DDDDDD", 0.20));
        fios.add(fioMoldura(156, 10, 32, 16, "#BBBBBB", 0.20));
        documento.setListaFio(fios);
        documento.setnFio((short) fios.size());

        gravarNovo(nome, documento);
    }

    private static Documento baseDocument(String titulo) {
        Documento documento = new Documento();
        documento.setDocPrinc(true);
        documento.setNomeDoc(fixed(titulo, Constantes.MAXLENNAME));
        documento.setCondDoc(fixed("1", Constantes.MAXLENEXPR));
        return documento;
    }

    private static void gravarNovo(String nome, Documento documento) throws Exception {
        Path session = Path.of("draft", TS.format(LocalDateTime.now()) + "-" + slug(nome));
        Files.createDirectories(session);
        File output = session.resolve("layout.f").toFile();
        PontoF pontoF = new PontoF();
        applyA4(pontoF);
        pontoF.setDocumentos(new ArrayList<>(List.of(documento)));
        pontoF.setNDocForm((short) 1);
        new PontoFGravar(output, pontoF).execute();
        System.out.println("CRIADO=" + output.getAbsolutePath());
        printResumo(new PontoFLer(output).execute());
    }

    private static void editarCor(String[] args) throws Exception {
        File file = new File(required(args, "--arquivo"));
        String cor = option(args, "--cor", "#0057B8");
        String texto = option(args, "--texto", null);
        String elemento = option(args, "--elemento", null);
        if (elemento == null) throw new IllegalArgumentException("--elemento explicito obrigatorio; nao selecionar o primeiro texto.");

        PontoF pontoF = new PontoFLer(file).execute();
        TextField target = textById(pontoF, elemento);
        if (target == null) {
            throw new IllegalStateException(elemento == null
                    ? "Nenhum texto encontrado no Ponto F."
                    : "Elemento de texto nao encontrado: " + elemento);
        }

        target.setColorText(webColorToLegacyBgr(cor));
        if (texto != null && !texto.isBlank()) {
            byte[] bytes = texto.getBytes(StandardCharsets.ISO_8859_1);
            target.setTexto(bytes);
            target.setTatual((short) bytes.length);
            target.setTmax((short) bytes.length);
        }

        new PontoFGravar(file, pontoF).execute();
        System.out.println("EDITADO=" + file.getAbsolutePath());
        printResumo(new PontoFLer(file).execute());
    }

    private static void mapearElementos(String[] args) throws Exception {
        File file = new File(required(args, "--arquivo"));
        PontoF pontoF = new PontoFLer(file).execute();
        int total = 0;
        for (int documentIndex = 0; documentIndex < pontoF.getDocumentos().size(); documentIndex++) {
            Documento document = pontoF.getDocumentos().get(documentIndex);
            if (document.getListaTextField() != null) {
                for (int index = 0; index < document.getListaTextField().size(); index++) {
                    TextField field = document.getListaTextField().get(index);
                    String text = new String(field.getTexto(), StandardCharsets.ISO_8859_1).replaceAll("[\\r\\n|]+", " ").trim();
                    printElement("doc-" + documentIndex + "-texto-" + index, "texto", text,
                            field.getPosHor(), field.getPosVer(), field.getTamHor(), field.getTamVer(), null);
                    total++;
                }
            }
            if (document.getListaFio() != null) {
                for (int index = 0; index < document.getListaFio().size(); index++) {
                    Fio fio = document.getListaFio().get(index);
                    printElement("doc-" + documentIndex + "-fio-" + index, "fio", "",
                            fio.getPosHor(), fio.getPosVer(), fio.getTamHor(), fio.getTamVer(), fio.getTipo().name());
                    total++;
                }
            }
        }
        System.out.println("ELEMENTOS_TOTAL=" + total);
    }

    private static void inspecionar(String[] args) throws Exception {
        File file = new File(required(args, "--arquivo"));
        printResumo(new PontoFLer(file).execute());
    }

    private static void ajustarFios(String[] args) throws Exception {
        File file = new File(required(args, "--arquivo"));
        PontoF pontoF = new PontoFLer(file).execute();
        int adjusted = clampFiosToDocument(pontoF);
        new PontoFGravar(file, pontoF).execute();
        System.out.println("FIOS_AJUSTADOS=" + adjusted);
        System.out.println("EDITADO=" + file.getAbsolutePath());
        printResumo(new PontoFLer(file).execute());
    }

    private static void moverLinhaTopo(String[] args) throws Exception {
        File file = new File(required(args, "--arquivo"));
        double displacementMm = optionDouble(args, "--deslocamento-y-mm", 8.0);
        PontoF pontoF = new PontoFLer(file).execute();
        int adjusted = clampFiosToDocument(pontoF);
        Fio topLine = topHorizontalLine(pontoF);
        if (topLine == null) {
            throw new IllegalStateException("Nenhuma linha horizontal encontrada no Ponto F.");
        }

        int pageHeight = documentHeight(pontoF);
        int height = unsigned(topLine.getTamVer());
        int maxY = Math.max(0, pageHeight - height);
        int targetY = Math.min(maxY, Math.max(0, unsigned(topLine.getPosVer()) + mm(displacementMm)));
        if (targetY != unsigned(topLine.getPosVer())) {
            topLine.setPosVer((short) targetY);
            adjusted++;
        }

        new PontoFGravar(file, pontoF).execute();
        System.out.println("FIOS_AJUSTADOS=" + adjusted);
        System.out.println("LINHA_TOPO_Y_MM=" + String.format(java.util.Locale.ROOT, "%.2f", pxToMm(topLine.getPosVer())));
        System.out.println("EDITADO=" + file.getAbsolutePath());
        printResumo(new PontoFLer(file).execute());
    }

    private static TextField firstText(PontoF pontoF) {
        if (pontoF == null || pontoF.getDocumentos() == null) {
            return null;
        }
        for (Documento doc : pontoF.getDocumentos()) {
            if (doc.getListaTextField() != null && !doc.getListaTextField().isEmpty()) {
                return doc.getListaTextField().get(0);
            }
        }
        return null;
    }

    private static TextField textById(PontoF pontoF, String id) {
        java.util.regex.Matcher matcher = java.util.regex.Pattern.compile("doc-(\\d+)-texto-(\\d+)").matcher(id);
        if (!matcher.matches()) return null;
        int documentIndex = Integer.parseInt(matcher.group(1));
        int textIndex = Integer.parseInt(matcher.group(2));
        if (pontoF == null || pontoF.getDocumentos() == null || documentIndex >= pontoF.getDocumentos().size()) return null;
        List<TextField> fields = pontoF.getDocumentos().get(documentIndex).getListaTextField();
        return fields != null && textIndex < fields.size() ? fields.get(textIndex) : null;
    }

    private static void printElement(String id, String type, String label, short x, short y, short width, short height, String subtype) {
        System.out.println("ELEMENTO=" + id
                + "|tipo=" + type
                + (subtype == null ? "" : "|subtipo=" + subtype)
                + "|rotulo=" + label
                + "|xMm=" + formatMm(x)
                + "|yMm=" + formatMm(y)
                + "|larguraMm=" + formatMm(width)
                + "|alturaMm=" + formatMm(height));
    }

    private static String formatMm(short value) {
        return String.format(java.util.Locale.ROOT, "%.2f", pxToMm(value));
    }

    private static Fio topHorizontalLine(PontoF pontoF) {
        Fio selected = null;
        if (pontoF == null || pontoF.getDocumentos() == null) return null;
        for (Documento doc : pontoF.getDocumentos()) {
            if (doc.getListaFio() == null) continue;
            for (Fio fio : doc.getListaFio()) {
                if (fio.getTipo() != tp_fio.FIO_HORIZONTAL) continue;
                if (selected == null || unsigned(fio.getPosVer()) < unsigned(selected.getPosVer())) {
                    selected = fio;
                }
            }
        }
        return selected;
    }

    private static int clampFiosToDocument(PontoF pontoF) {
        int adjusted = 0;
        int pageWidth = documentWidth(pontoF);
        int pageHeight = documentHeight(pontoF);
        if (pontoF == null || pontoF.getDocumentos() == null) return adjusted;
        for (Documento doc : pontoF.getDocumentos()) {
            if (doc.getListaFio() == null) continue;
            for (Fio fio : doc.getListaFio()) {
                int width = Math.min(unsigned(fio.getTamHor()), pageWidth);
                int height = Math.min(unsigned(fio.getTamVer()), pageHeight);
                int x = Math.min(Math.max(0, unsigned(fio.getPosHor())), Math.max(0, pageWidth - width));
                int y = Math.min(Math.max(0, unsigned(fio.getPosVer())), Math.max(0, pageHeight - height));
                if (width != unsigned(fio.getTamHor()) || height != unsigned(fio.getTamVer())
                        || x != unsigned(fio.getPosHor()) || y != unsigned(fio.getPosVer())) {
                    fio.setTamHor((short) width);
                    fio.setTamVer((short) height);
                    fio.setPosHor((short) x);
                    fio.setPosVer((short) y);
                    adjusted++;
                }
            }
        }
        return adjusted;
    }

    private static int documentWidth(PontoF pontoF) {
        return pontoF == null || unsigned(pontoF.getTamDocHor()) == 0 ? mm(A4_W) : unsigned(pontoF.getTamDocHor());
    }

    private static int documentHeight(PontoF pontoF) {
        return pontoF == null || unsigned(pontoF.getTamDocVer()) == 0 ? mm(A4_H) : unsigned(pontoF.getTamDocVer());
    }

    private static int unsigned(short value) {
        return Short.toUnsignedInt(value);
    }

    private static TextField text(String value, double x, double y, double w, double h, int size, String color, int weight) {
        TextField tf = new TextField();
        byte[] bytes = value.getBytes(StandardCharsets.ISO_8859_1);
        tf.setFlagUsado(true);
        tf.setIndProxText((short) -1);
        tf.setPosHor(mm(x));
        tf.setPosVer(mm(y));
        tf.setTamHor(mm(w));
        tf.setTamVer(mm(h));
        tf.setFnomeWText(fixed("Arial", Constantes.LF_FACESIZE));
        tf.setCorpoText((short) size);
        tf.setFboldText((short) weight);
        tf.setColorText(webColorToLegacyBgr(color));
        tf.setJustText(tp_alin.AL_DIR);
        tf.setCond(fixed("", Constantes.MAXLENEXPR));
        tf.setExprFonteText(fixed("", Constantes.MAXLENEXPR));
        tf.setTexto(bytes);
        tf.setTatual((short) bytes.length);
        tf.setTmax((short) bytes.length);
        return tf;
    }

    private static Fio fioHorizontal(double x, double y, double w, String color, double thickness) {
        Fio fio = baseFio(x, y, w, 0.5, color, thickness);
        fio.setTipo(tp_fio.FIO_HORIZONTAL);
        return fio;
    }

    private static Fio fioMoldura(double x, double y, double w, double h, String color, double thickness) {
        Fio fio = baseFio(x, y, w, h, color, thickness);
        fio.setTipo(tp_fio.FIO_MOLDURA);
        return fio;
    }

    private static Fio baseFio(double x, double y, double w, double h, String color, double thickness) {
        Fio fio = new Fio();
        fio.setFlagUsado(true);
        fio.setIndProxFio((short) -1);
        fio.setPosHor(mm(x));
        fio.setPosVer(mm(y));
        fio.setTamHor(mm(w));
        fio.setTamVer(mm(h));
        fio.setEspessura(mm(thickness));
        fio.setColorFio(webColorToLegacyBgr(color));
        fio.setCond(fixed("", Constantes.MAXLENEXPR));
        return fio;
    }

    private static void printResumo(PontoF pontoF) {
        System.out.println("DOCUMENTOS=" + pontoF.getDocumentos().size());
        boolean boundsOk = true;
        for (int i = 0; i < pontoF.getDocumentos().size(); i++) {
            Documento doc = pontoF.getDocumentos().get(i);
            int textos = doc.getListaTextField() == null ? 0 : doc.getListaTextField().size();
            int saidas = doc.getListaCpoSai() == null ? 0 : doc.getListaCpoSai().size();
            int logos = doc.getListaLogo() == null ? 0 : doc.getListaLogo().size();
            int fios = doc.getListaFio() == null ? 0 : doc.getListaFio().size();
            int barcodes = doc.getListaBarCode() == null ? 0 : doc.getListaBarCode().size();
            int qrcodes = doc.getListaBarCodeBi() == null ? 0 : doc.getListaBarCodeBi().size();
            int detalhes = doc.getListaJanelaDetalhe() == null ? 0 : doc.getListaJanelaDetalhe().size();
            int blocos = doc.getListaBlocoEnderecamento() == null ? 0 : doc.getListaBlocoEnderecamento().size();
            System.out.println("DOC[" + i + "].TEXTOS=" + textos);
            System.out.println("DOC[" + i + "].CAMPOS_SAIDA=" + saidas);
            System.out.println("DOC[" + i + "].LOGOS=" + logos);
            System.out.println("DOC[" + i + "].FIOS=" + fios);
            System.out.println("DOC[" + i + "].BARCODES=" + barcodes);
            System.out.println("DOC[" + i + "].QRCODES=" + qrcodes);
            System.out.println("DOC[" + i + "].DETALHES=" + detalhes);
            System.out.println("DOC[" + i + "].BLOCOS_ENDERECAMENTO=" + blocos);
            if (textos > 0) {
                TextField tf = doc.getListaTextField().get(0);
                System.out.println("DOC[" + i + "].TEXTO0=" + new String(tf.getTexto(), StandardCharsets.ISO_8859_1));
                System.out.println("DOC[" + i + "].TEXTO0.COR=" + legacyBgrToWebColor(tf.getColorText()));
            }
            if (doc.getListaTextField() != null) {
                for (TextField tf : doc.getListaTextField()) {
                    boundsOk = boundsOk && inside(tf.getPosHor(), tf.getPosVer(), tf.getTamHor(), tf.getTamVer());
                }
            }
            if (doc.getListaFio() != null) {
                for (Fio fio : doc.getListaFio()) {
                    boundsOk = boundsOk && inside(fio.getPosHor(), fio.getPosVer(), fio.getTamHor(), fio.getTamVer());
                }
            }
        }
        System.out.println("BOUNDS_OK=" + boundsOk);
    }

    private static boolean inside(short x, short y, short w, short h) {
        double xMm = pxToMm(x);
        double yMm = pxToMm(y);
        double wMm = pxToMm(w);
        double hMm = pxToMm(h);
        return xMm >= 0 && yMm >= 0 && (xMm + wMm) <= A4_W && (yMm + hMm) <= A4_H;
    }

    private static void applyA4(PontoF pontoF) {
        short width = mm(A4_W);
        short height = mm(A4_H);
        pontoF.setTamHorForm(width);
        pontoF.setTamVerForm(height);
        pontoF.setTamDocHor(width);
        pontoF.setTamDocVer(height);
        pontoF.setTamPolegada((byte) 1);
        pontoF.setOrientForm((byte) 0);
    }

    private static short mm(double value) {
        return (short) Math.round(value * UNITS_PER_MM);
    }

    private static double pxToMm(short value) {
        return Short.toUnsignedInt(value) / UNITS_PER_MM;
    }

    private static byte[] fixed(String value, int length) {
        byte[] out = new byte[length];
        if (value != null) {
            byte[] src = value.getBytes(StandardCharsets.ISO_8859_1);
            System.arraycopy(src, 0, out, 0, Math.min(src.length, out.length));
        }
        return out;
    }

    private static int webColorToLegacyBgr(String hexColor) {
        String hex = hexColor.startsWith("#") ? hexColor.substring(1) : hexColor;
        if (hex.length() == 3) {
            hex = "" + hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
        }
        int r = Integer.parseInt(hex.substring(0, 2), 16);
        int g = Integer.parseInt(hex.substring(2, 4), 16);
        int b = Integer.parseInt(hex.substring(4, 6), 16);
        return (b << 16) | (g << 8) | r;
    }

    private static String legacyBgrToWebColor(int bgr) {
        int r = bgr & 0xFF;
        int g = (bgr >> 8) & 0xFF;
        int b = (bgr >> 16) & 0xFF;
        return String.format("#%02X%02X%02X", r, g, b);
    }

    private static String option(String[] args, String name, String fallback) {
        for (int i = 1; i < args.length - 1; i++) {
            if (name.equals(args[i])) {
                return args[i + 1];
            }
        }
        return fallback;
    }

    private static String required(String[] args, String name) {
        String value = option(args, name, null);
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Parametro obrigatorio: " + name);
        }
        return value;
    }

    private static double optionDouble(String[] args, String name, double fallback) {
        String value = option(args, name, null);
        if (value == null || value.isBlank()) return fallback;
        try {
            return Double.parseDouble(value.replace(',', '.'));
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Valor invalido para " + name + ": " + value);
        }
    }

    private static String slug(String value) {
        String normalized = value == null ? "ponto-f" : value.toLowerCase().replaceAll("[^a-z0-9]+", "-");
        normalized = normalized.replaceAll("^-|-$", "");
        return normalized.isBlank() ? "ponto-f" : normalized;
    }

    private static void usage() {
        System.out.println("Uso:");
        System.out.println("  ponto-f-draft.bat criar --nome carta --titulo \"Carta\" --corpo \"Texto\" --cor #000000");
        System.out.println("  ponto-f-draft.bat criar-carta --nome carta --titulo \"Carta\" --destinatario \"Cliente\" --assunto \"Assunto\"");
        System.out.println("  ponto-f-draft.bat editar-cor --arquivo draft\\...\\layout.f --cor #0057B8 --texto \"Novo titulo\"");
        System.out.println("  ponto-f-draft.bat ajustar-fios --arquivo draft\\...\\layout.f");
        System.out.println("  ponto-f-draft.bat mover-linha-topo --arquivo draft\\...\\layout.f --deslocamento-y-mm 8");
        System.out.println("  ponto-f-draft.bat mapear-elementos --arquivo draft\\...\\layout.f");
        System.out.println("  ponto-f-draft.bat inspecionar --arquivo draft\\...\\layout.f");
    }
}

