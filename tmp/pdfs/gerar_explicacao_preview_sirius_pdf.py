from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
)


OUTPUT = Path("output/pdf/explicacao-preview-sirius32.pdf")


def style_sheet():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="TitleCustom",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=colors.HexColor("#1F2937"),
            spaceAfter=12,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=16,
            textColor=colors.HexColor("#0F766E"),
            spaceBefore=12,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyCustom",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10.2,
            leading=14,
            textColor=colors.HexColor("#111827"),
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CodeCustom",
            parent=styles["BodyText"],
            fontName="Courier",
            fontSize=8.2,
            leading=11,
            textColor=colors.HexColor("#374151"),
        )
    )
    return styles


def para(text, style):
    return Paragraph(text, style)


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    styles = style_sheet()
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=1.7 * cm,
        leftMargin=1.7 * cm,
        topMargin=1.6 * cm,
        bottomMargin=1.6 * cm,
        title="Preview e Sirius32.dll no Format Web",
        author="Codex",
    )

    story = []
    story.append(para("Preview e Sirius32.dll no Format Web", styles["TitleCustom"]))
    story.append(
        para(
            "Resumo tecnico sobre como o format-web trata as funcoes exportadas pela "
            "Sirius32.dll e o que acontece durante o preview do layout.",
            styles["BodyCustom"],
        )
    )

    story.append(para("Conclusao Curta", styles["Section"]))
    story.append(
        para(
            "No preview web, a Sirius32.dll nao e executada. O codigo Java do proprio "
            "format-web simula a avaliacao das expressoes e resolve apenas um conjunto "
            "limitado de funcoes conhecidas.",
            styles["BodyCustom"],
        )
    )

    data = [
        ["Contexto", "O que acontece"],
        [
            "Preview do editor",
            "Executado por LayoutPreviewService em Java, sem chamada nativa para DLL.",
        ],
        [
            "Funcoes da Sirius32.dll",
            "Sao listadas, importadas e validadas, mas nao chamadas no preview.",
        ],
        [
            "Processamento real",
            "O format-web encaminha ZIP e dados para a Format API externa em /formatar.",
        ],
    ]
    table = Table(data, colWidths=[4.2 * cm, 12.2 * cm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E0F2F1")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#0F172A")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("LEADING", (0, 0), (-1, -1), 12),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#CBD5E1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8FAFC")]),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(Spacer(1, 6))
    story.append(table)

    sections = [
        (
            "Fluxo do Preview",
            [
                "O endpoint POST /api/layout-preview fica em LayoutApiController.",
                "Ele recebe o layout em JSON e o arquivo de dados de entrada.",
                "Depois chama LayoutPreviewService.preview(...).",
                "O servico le o registro mestre, monta campos e variaveis do sistema, "
                "seleciona documentos visiveis e resolve os componentes da pagina.",
            ],
        ),
        (
            "Como as Expressoes Sao Avaliadas",
            [
                "A avaliacao ocorre nos metodos evaluateAsText(...), evaluateAsBoolean(...) "
                "e evaluateFunction(...), dentro de LayoutPreviewService.",
                "As funcoes suportadas diretamente incluem RTRIM, LTRIM, TRIM, UPPER, "
                "LOWER, LEFT, RIGHT, SUBSTR, LEN, STR, VAL e INT.",
                "Quando a funcao nao e uma das conhecidas, o codigo cai no default e chama "
                "rebuildUnknownFunction(...). Isso recompÃµe a chamada textual com os "
                "argumentos resolvidos, mas nao executa codigo nativo.",
            ],
        ),
        (
            "Papel da Sirius32.dll no Format Web",
            [
                "A DLL padrao e configurada por format.user-functions.default-dll-path, "
                "com fallback para ../Sirius32.dll.",
                "ProjectApiController expoe /api/default-user-function-dll e "
                "/api/upload-user-function-dll para listar ou enviar uma DLL.",
                "DllExportParser le o binario PE da DLL e extrai os nomes exportados.",
                "ExpressionFunctionValidator valida se as expressoes usam funcoes existentes "
                "na DLL configurada e, quando possivel, valida a quantidade de parametros.",
                "PontoFTojson grava o nome da DLL e a lista de funcoes no arquivo .f.",
            ],
        ),
        (
            "Onde Deve Acontecer a Execucao Real",
            [
                "O format-web nao contem System.load, JNA, JNI, LoadLibrary ou GetProcAddress "
                "para executar a Sirius32.dll.",
                "No processamento final, FormatProcessingApiController monta um ZIP com o "
                "layout e assets e envia para a Format API externa em /formatar.",
                "Assim, se os metodos da Sirius32.dll forem executados de verdade, isso deve "
                "acontecer no motor externo de formatacao, nao no preview web.",
            ],
        ),
    ]

    for title, bullets in sections:
        story.append(KeepTogether([para(title, styles["Section"])]))
        for item in bullets:
            story.append(para("- " + item, styles["BodyCustom"]))

    story.append(para("Arquivos-chave", styles["Section"]))
    files = [
        "format-web/src/main/java/com/totaldocs/format/web/controller/api/LayoutApiController.java",
        "format-web/src/main/java/com/totaldocs/format/web/service/LayoutPreviewService.java",
        "format-web/src/main/java/com/totaldocs/format/web/controller/api/ProjectApiController.java",
        "format-web/src/main/java/com/totaldocs/format/web/util/DllExportParser.java",
        "format-web/src/main/java/com/totaldocs/format/web/util/ExpressionFunctionValidator.java",
        "format-web/src/main/java/com/totaldocs/format/web/util/PontoFTojson.java",
        "format-web/src/main/java/com/totaldocs/format/web/controller/api/FormatProcessingApiController.java",
        "frontend/src/editor/editorController.js",
    ]
    for item in files:
        story.append(para(item, styles["CodeCustom"]))

    def footer(canvas, document):
        canvas.saveState()
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#64748B"))
        canvas.drawString(1.7 * cm, 1.0 * cm, "Format Web - Preview e Sirius32.dll")
        canvas.drawRightString(A4[0] - 1.7 * cm, 1.0 * cm, f"Pagina {document.page}")
        canvas.restoreState()

    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT.resolve())

