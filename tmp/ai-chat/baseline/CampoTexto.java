package com.totaldocs.format.web.dto;

import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.fasterxml.jackson.databind.JsonNode;
import com.totaldocs.format.web.util.FonteConversorUtil;

import co.sirius.format.pontof.model.TextField;
import co.sirius.format.pontof.util.Constantes;
import co.sirius.format.pontof.util.Enums;
import co.sirius.format.pontof.util.TypesUtil;

public class CampoTexto extends Component {

	private static final long serialVersionUID = 1L;
	private static final Pattern LEGACY_FONT_TOKEN = Pattern.compile("\\[F([^\\]]*)\\]");

	private short lineHeight;
	private Integer lineSpacing;
	private String fontExpression;
	private boolean hasBorder;
	private double borderThickness;
	private double borderPadding;
	private boolean respectLogoHeight;
	private boolean protectedField;
	private boolean textEdited;
	private Integer legacyTextPosX;
	private Integer legacyTextY;
	private Integer legacyTextWidth;
	private Integer legacyTextHeight;
	private Integer legacyBorderThickness;
	private Integer legacyBorderPadding;
	
	public CampoTexto() {}
	public CampoTexto(TextField obj) {
		this.setType("text");
		this.setContentFromString(new String(obj.getTexto(), StandardCharsets.ISO_8859_1));
		this.setX(pxToMm(textVisualPosHor(obj)));
		this.setY(pxToMm(obj.getPosVer()));
		this.setWidth(pxToMm(obj.getTamHor()));
		this.setHeight(pxToMm(obj.getTamVer()));
		this.setLegacyTextPosX((int) obj.getPosHor());
		this.setLegacyTextY((int) obj.getPosVer());
		this.setLegacyTextWidth((int) obj.getTamHor());
		this.setLegacyTextHeight((int) obj.getTamVer());
		this.setOrientationFromEnum(obj.getOrientText());
		this.setConditional(new String(obj.getCond(), StandardCharsets.ISO_8859_1).trim());
		this.setLineHeight(obj.getAtEspLinText());
		this.setLineSpacing(obj.getEspLinText() != null ? obj.getEspLinText().ordinal() : 0);
		this.setAlignment(alignmentToWeb(obj.getJustText()));
		this.setFontExpression(new String(obj.getExprFonteText(), StandardCharsets.ISO_8859_1).trim());
		this.setHasBorder(obj.isMoldurado());
		this.setBorderThickness(pxToMm(obj.getEspessura()));
		this.setBorderPadding(pxToMm(obj.getSombra()));
		this.setLegacyBorderThickness((int) obj.getEspessura());
		this.setLegacyBorderPadding((int) obj.getSombra());
		this.setRespectLogoHeight((obj.getOpcoes() & Constantes.OPC_OBJ_TXT_LOGO) == Constantes.OPC_OBJ_TXT_LOGO);
		
		Font font = new Font();
		font.setFamily(cleanFontFamily(new String(obj.getFnomeWText(), StandardCharsets.ISO_8859_1)));
		font.setSize(obj.getCorpoText());
		font.setColor(FonteConversorUtil.convertColorToWeb(obj.getColorText()));
		font.setWeight(FonteConversorUtil.convertWeightToWeb(obj.getFboldText()));
		font.setItalico(obj.isFitaText());
		font.setSublinhado(obj.isFundText());
		font.setTachado(obj.isFstkText());
		font.setTextAlign(alignmentToCss(obj.getJustText()));
		
		this.setFont(font);		
		
		this.trataExpressao();
		this.applyFirstInlineFont();
	}
	
	public TextField toTextField() {
		TextField tf = new TextField();
		applyTo(tf, true);
		return tf;
	}

	public void applyTo(TextField tf) {
		applyTo(tf, false);
	}

	private void applyTo(TextField tf, boolean forceContent) {
		if (tf == null) {
			return;
		}

		if (forceContent || textEdited) {
			String texto = getContentAsLegacyString();
			byte[] bytes = texto.getBytes(StandardCharsets.ISO_8859_1);
			tf.setTexto(bytes);
			tf.setTatual((short) bytes.length);
			tf.setTmax((short) bytes.length);
		} else {
			repairTextFieldLegacyTokens(tf);
		}

		tf.setPosHor((short) mmToPx(getExportTextX()));
		tf.setPosVer((short) mmToPx(this.getY()));
		tf.setTamHor((short) mmToPx(this.getWidth()));
		tf.setTamVer((short) mmToPx(this.getHeight()));

		if (this.getFont() != null) {
			String fontFamily = this.getFont().getFamily();
			if (fontFamily != null && !fontFamily.isEmpty()) {
				tf.setFnomeWText(fixedBytes(fontFamily, Constantes.LF_FACESIZE));
			}

			if (this.getFont().getSize() > 0) {
				tf.setCorpoText((short) Math.round(this.getFont().getSize()));
			}

			tf.setFboldText(FonteConversorUtil.convertWeight(this.getFont().getWeight()));
			tf.setFitaText(this.getFont().getItalico());
			tf.setFstkText(this.getFont().getTachado());
			tf.setFundText(this.getFont().getSublinhado());

			if (this.getFont().getColor() != null) {
				tf.setColorText(FonteConversorUtil.convertColor(this.getFont().getColor()));
			}
		}

		tf.setOrientText(orientationToLegacy(this.getOrientation()));

		if (this.getConditional() != null) {
			tf.setCond(fixedBytes(this.getConditional(), Constantes.MAXLENEXPR));
		}

		tf.setJustText(alignmentToLegacy(this.getAlignment()));
		if (this.getLineSpacing() != null) {
			tf.setEspLinText(lineSpacingToLegacy(this.getLineSpacing()));
		}
		tf.setAtEspLinText(this.getLineHeight());
		tf.setMoldurado(this.isHasBorder());
		tf.setEspessura(toLegacyBorderPixels(this.getBorderThickness()));
		tf.setSombra(toLegacyBorderPixels(this.getBorderPadding()));
		tf.setExprFonteText(fixedBytes(this.getFontExpression(), Constantes.MAXLENEXPR));
		tf.setOpcoes(toggleOption(tf.getOpcoes(), Constantes.OPC_OBJ_TXT_LOGO, this.isRespectLogoHeight()));
	}

	private short toLegacyBorderPixels(double millimeters) {
		if (!Double.isFinite(millimeters) || millimeters <= 0) {
			return 0;
		}
		// Espessura and Sombra use the same 300 dpi coordinates as TamHor.
		// Round to the nearest point; casting truncates 0.5 mm to 0.42 mm.
		return (short) Math.min(Short.MAX_VALUE, Math.max(1, Math.round(mmToPx(millimeters))));
	}

	private void applyFirstInlineFont() {
		JsonNode content = getContent();
		if (content == null || !content.isArray()) {
			return;
		}

		for (JsonNode node : content) {
			if (!"FontDescriptor".equals(node.path("type").asText())) {
				continue;
			}

			JsonNode descriptor = node.path("fontDescriptor");
			String family = cleanFontFamily(descriptor.path("family").asText(""));
			if (family.isEmpty()) {
				return;
			}

			Font inlineFont = new Font();
			inlineFont.setFamily(family);
			inlineFont.setSize(descriptor.path("size").asDouble(0));
			inlineFont.setColor(descriptor.path("color").asText("#000000"));
			inlineFont.setWeight(descriptor.path("weight").asInt(400));
			inlineFont.setItalico(descriptor.path("italico").asBoolean(false));
			inlineFont.setSublinhado(descriptor.path("sublinhado").asBoolean(false));
			inlineFont.setTachado(descriptor.path("tachado").asBoolean(false));
			inlineFont.setStyle(inlineFont.getItalico() ? "italic" : "normal");
			inlineFont.setTextAlign(alignmentToCss(alignmentToLegacy(getAlignment())));
			this.setFont(inlineFont);
			return;
		}
	}

	private String getContentAsLegacyString() {
		if (getContent() == null || getContent().isNull()) {
			return "";
		}
		if (getContent().isTextual()) {
			return decodeLegacyTokens(getContent().asText());
		}
		if (getContent().isArray()) {
			StringBuilder out = new StringBuilder();
			getContent().forEach(node -> {
				String type = node.path("type").asText();
				if ("text".equals(type) || "campoSaida".equals(type)) {
					out.append(node.path("content").asText());
				} else if ("fio".equals(type) || "textFio".equals(type)) {
					out.append(fioNodeAsLegacyText(node));
				} else if ("Logo".equals(type) || "logo".equals(type) || "textLogo".equals(type)) {
					out.append(logoNodeAsLegacyToken(node));
				} else if ("breakline".equals(type)) {
					out.append("\r\n");
				}
			});
			return decodeLegacyTokens(out.toString());
		}
		return decodeLegacyTokens(getContent().toString());
	}

	private static String fioNodeAsLegacyText(JsonNode node) {
		String content = node.path("content").asText("").trim();
		String esc = String.valueOf((char) 27);
		String sep = String.valueOf((char) 1);
		if (content.startsWith(esc + "R") && content.endsWith(esc)) {
			return content;
		}
		if (content.startsWith("R" + sep)) {
			return esc + content + esc;
		}

		String tipoFio = normalizeFioType(node.path("tipoFio").asText(node.path("type").asText("FIO_HORIZONTAL")));
		int defaultLength = "FIO_VERTICAL".equals(tipoFio) ? 3 : 32;
		int length = Math.max(1, Math.min(200, node.path("length").asInt(defaultLength)));
		String color = firstNonBlank(node.path("color").asText(""), node.path("cor").asText(""), "#000000");
		int thickness = Math.max(1, node.path("thickness").asInt(node.path("espessura").asInt(1)));
		return esc + "R" + sep + tipoFio + sep + length + sep + color + sep + thickness + esc;
	}

	private static String normalizeFioType(String value) {
		return "FIO_VERTICAL".equalsIgnoreCase(value) ? "FIO_VERTICAL" : "FIO_HORIZONTAL";
	}

	private static String logoNodeAsLegacyToken(JsonNode node) {
		String content = node.path("content").asText("").trim();
		if (content.startsWith(String.valueOf((char) 27) + "L") && content.endsWith(String.valueOf((char) 27))) {
			return content;
		}
		if (content.startsWith("L" + (char) 1)) {
			return String.valueOf((char) 27) + content + (char) 27;
		}

		String occurrence = firstNonBlank(node.path("occurrence").asText(""), content);
		String sep = String.valueOf((char) 1);
		return String.valueOf((char) 27) + "L" + sep
				+ occurrence + sep
				+ node.path("width").asInt(40) + sep
				+ node.path("height").asInt(20) + sep
				+ firstNonBlank(node.path("hReduced").asText(""), node.path("hreduced").asText(""), "0") + sep
				+ firstNonBlank(node.path("vReduced").asText(""), node.path("vreduced").asText(""), "0") + sep
				+ node.path("comprType").asInt(0) + sep
				+ firstNonBlank(node.path("resolucao").asText(""), node.path("resolution").asText(""), "300") + sep
				+ node.path("expType").asInt(0)
				+ (char) 27;
	}

	private static String firstNonBlank(String... values) {
		for (String value : values) {
			if (value != null && !value.isBlank()) {
				return value.trim();
			}
		}
		return "";
	}
	private static String decodeLegacyTokens(String value) {
		if (value == null || value.isEmpty()) {
			return "";
		}

		Matcher matcher = LEGACY_FONT_TOKEN.matcher(value);
		StringBuffer decoded = new StringBuffer();
		while (matcher.find()) {
			StringBuilder token = new StringBuilder();
			String[] parts = matcher.group(1).split(",", -1);
			token.append((char) 27).append('F');
			if (parts.length > 0) {
				token.append(String.join(String.valueOf((char) 1), parts));
			}
			token.append((char) 27);
			matcher.appendReplacement(decoded, Matcher.quoteReplacement(token.toString()));
		}
		matcher.appendTail(decoded);
		return normalizeLineBreaks(decoded.toString());
	}

	private static void repairTextFieldLegacyTokens(TextField tf) {
		if (tf.getTexto() == null || tf.getTexto().length == 0) {
			return;
		}
		String textoAtual = new String(tf.getTexto(), StandardCharsets.ISO_8859_1);
		if (!textoAtual.contains("[F")) {
			return;
		}
		byte[] bytes = decodeLegacyTokens(textoAtual).getBytes(StandardCharsets.ISO_8859_1);
		tf.setTexto(bytes);
		tf.setTatual((short) bytes.length);
		tf.setTmax((short) bytes.length);
	}

	private static String normalizeLineBreaks(String value) {
		return value
				.replace("\r\n", "\n")
				.replace('\r', '\n')
				.replace("\n", "\r\n");
	}

	private static String cleanFontFamily(String value) {
		if (value == null) {
			return "";
		}
		String cleanValue = value.split(",", 2)[0].trim();
		if (cleanValue.length() >= 2
				&& ((cleanValue.startsWith("\"") && cleanValue.endsWith("\""))
						|| (cleanValue.startsWith("'") && cleanValue.endsWith("'")))) {
			return cleanValue.substring(1, cleanValue.length() - 1).trim();
		}
		return cleanValue;
	}

	private static double textVisualPosHor(TextField obj) {
		if (obj != null && obj.getOrientText() == Enums.or_cpo.OR_BAIXO) {
			return obj.getPosHor() - obj.getTamVer();
		}
		return obj != null ? obj.getPosHor() : 0;
	}

	private double getExportTextX() {
		return this.getOrientation() == 90 ? this.getX() + this.getHeight() : this.getX();
	}

	private static byte[] fixedBytes(String value, int size) {
		byte[] target = new byte[size];
		if (value != null) {
			TypesUtil.add(target, value.getBytes(StandardCharsets.ISO_8859_1));
		}
		return target;
	}

	private static int toggleOption(int options, int flag, boolean enabled) {
		return enabled ? options | flag : options & ~flag;
	}

	private static Enums.or_cpo orientationToLegacy(int orientation) {
		return switch (orientation) {
			case 90 -> Enums.or_cpo.OR_BAIXO;
			case 180 -> Enums.or_cpo.OR_INVERTIDO;
			case 270 -> Enums.or_cpo.OR_CIMA;
			case 200 -> Enums.or_cpo.OR_PERSONALIZADO;
			default -> Enums.or_cpo.OR_NORMAL;
		};
	}

	private static int alignmentToWeb(Enums.tp_alin alignment) {
		if (alignment == null) {
			return 0;
		}
		return switch (alignment) {
			case AL_DIR -> 1;
			case AL_CEN -> 2;
			case AL_JUS -> 3;
			default -> 0;
		};
	}

	private static Enums.tp_alin alignmentToLegacy(int alignment) {
		return switch (alignment) {
			case 1 -> Enums.tp_alin.AL_DIR;
			case 2 -> Enums.tp_alin.AL_CEN;
			case 3 -> Enums.tp_alin.AL_JUS;
			default -> Enums.tp_alin.AL_ESQ;
		};
	}

	private static String alignmentToCss(Enums.tp_alin alignment) {
		return switch (alignmentToWeb(alignment)) {
			case 1 -> "right";
			case 2 -> "center";
			case 3 -> "justify";
			default -> "left";
		};
	}

	private static Enums.esp_lin lineSpacingToLegacy(int lineSpacing) {
		Enums.esp_lin[] values = Enums.esp_lin.values();
		if (lineSpacing < 0 || lineSpacing >= values.length) {
			return Enums.esp_lin.ESP_SIMPLES;
		}
		return values[lineSpacing];
	}
	
	public short getLineHeight() {
		return lineHeight;
	}
	public void setLineHeight(short lineHeight) {
		this.lineHeight = lineHeight;
	}
	public Integer getLineSpacing() {
		return lineSpacing;
	}
	public void setLineSpacing(Integer lineSpacing) {
		this.lineSpacing = lineSpacing;
	}
	public String getFontExpression() {
		return fontExpression;
	}
	public void setFontExpression(String fontExpression) {
		this.fontExpression = fontExpression;
	}
	public boolean isHasBorder() {
		return hasBorder;
	}
	public void setHasBorder(boolean hasBorder) {
		this.hasBorder = hasBorder;
	}
	public double getBorderThickness() {
		return borderThickness;
	}
	public void setBorderThickness(double borderThickness) {
		this.borderThickness = borderThickness;
	}
	public double getBorderPadding() {
		return borderPadding;
	}
	public void setBorderPadding(double borderPadding) {
		this.borderPadding = borderPadding;
	}
	public boolean isRespectLogoHeight() {
		return respectLogoHeight;
	}
	public void setRespectLogoHeight(boolean respectLogoHeight) {
		this.respectLogoHeight = respectLogoHeight;
	}
	public boolean isProtectedField() {
		return protectedField;
	}
	public void setProtectedField(boolean protectedField) {
		this.protectedField = protectedField;
	}
	public boolean isTextEdited() {
		return textEdited;
	}
	public void setTextEdited(boolean textEdited) {
		this.textEdited = textEdited;
	}
	public Integer getLegacyTextPosX() {
		return legacyTextPosX;
	}
	public void setLegacyTextPosX(Integer legacyTextPosX) {
		this.legacyTextPosX = legacyTextPosX;
	}
	public Integer getLegacyTextY() {
		return legacyTextY;
	}
	public void setLegacyTextY(Integer legacyTextY) {
		this.legacyTextY = legacyTextY;
	}
	public Integer getLegacyTextWidth() {
		return legacyTextWidth;
	}
	public void setLegacyTextWidth(Integer legacyTextWidth) {
		this.legacyTextWidth = legacyTextWidth;
	}
	public Integer getLegacyTextHeight() {
		return legacyTextHeight;
	}
	public void setLegacyTextHeight(Integer legacyTextHeight) {
		this.legacyTextHeight = legacyTextHeight;
	}
	public Integer getLegacyBorderThickness() {
		return legacyBorderThickness;
	}
	public void setLegacyBorderThickness(Integer legacyBorderThickness) {
		this.legacyBorderThickness = legacyBorderThickness;
	}
	public Integer getLegacyBorderPadding() {
		return legacyBorderPadding;
	}
	public void setLegacyBorderPadding(Integer legacyBorderPadding) {
		this.legacyBorderPadding = legacyBorderPadding;
	}
}
