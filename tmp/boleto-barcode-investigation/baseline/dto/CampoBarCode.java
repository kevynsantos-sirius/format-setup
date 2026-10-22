package com.totaldocs.format.web.dto;

import java.nio.charset.StandardCharsets;

import co.sirius.format.pontof.model.BarCode;
import co.sirius.format.pontof.util.Constantes;

public class CampoBarCode extends Component {

	private static final long serialVersionUID = 1L;

	private Integer tipoMPS;
	private Integer barcodeType;
	private Integer numChar;
	private Integer fontCpi;
	private boolean protectedField;

	public CampoBarCode() {}
	public CampoBarCode(BarCode obj) {
		this.setType("barcode");
		this.setContentFromString(new String(obj.getExpr(), StandardCharsets.ISO_8859_1).replace("\u0000", "").trim());
		this.setX(pxToMm(obj.getPosHor()));
		double altura = pxToMm(obj.getTamVer());
		this.setY(pxToMm(obj.getPosVer()) - altura);
		this.setWidth(pxToMm(obj.getLargura() > 0 ? obj.getLargura() : obj.getTamVer()));
		this.setHeight(altura);
		this.setOrientationFromEnum(obj.getOrientBarcode());
		this.tipoMPS = (int) obj.getTipoMPS();
		this.barcodeType = this.tipoMPS;
		this.numChar = (int) obj.getNumChar();
		this.protectedField = (obj.getOpcoes() & 1) == 1;
	}

	public BarCode toBarCode() {
		BarCode bc = new BarCode();
		applyTo(bc);
		return bc;
	}

	public void applyTo(BarCode bc) {
		if (bc == null) {
			return;
		}

		String texto = cleanBarcodeText((getContent() != null && getContent().isTextual()) ? getContent().asText() : "");
		byte[] bytes = texto.getBytes(StandardCharsets.ISO_8859_1);
		bc.setExpr(bytes);

		bc.setPosHor((short) mmToPx(this.getX()));
		bc.setPosVer((short) mmToPx(this.getY() + this.getHeight()));
		bc.setTamVer((short) mmToPx(this.getHeight()));
		if (this.getWidth() > 0) {
			bc.setLargura((short) mmToPx(this.getWidth()));
		}

		if (bc.getLargura() <= 0 && texto != null && !texto.isEmpty()) {
			bc.setLargura((short) (texto.length() * 12));
		}
		bc.setNumChar((short) Math.min(bytes.length, Constantes.MAXLENEXPR));

		int orient = this.getOrientation();
		co.sirius.format.pontof.util.Enums.or_cpo orientEnum;
		switch (orient) {
			case 90:
				orientEnum = co.sirius.format.pontof.util.Enums.or_cpo.OR_BAIXO;
				break;
			case 180:
				orientEnum = co.sirius.format.pontof.util.Enums.or_cpo.OR_INVERTIDO;
				break;
			case 270:
				orientEnum = co.sirius.format.pontof.util.Enums.or_cpo.OR_CIMA;
				break;
			case 200:
				orientEnum = co.sirius.format.pontof.util.Enums.or_cpo.OR_PERSONALIZADO;
				break;
			default:
				orientEnum = co.sirius.format.pontof.util.Enums.or_cpo.OR_NORMAL;
				break;
		}
		bc.setOrientBarcode(orientEnum);

		int selectedTipoMps = tipoMPS != null && tipoMPS > 0 ? tipoMPS : barcodeType != null && barcodeType > 0 ? barcodeType : bc.getTipoMPS();
		if (selectedTipoMps == 1 && texto.length() % 2 != 0) {
			selectedTipoMps = 3;
		}
		bc.setTipoMPS((short) (selectedTipoMps > 0 ? selectedTipoMps : 1));

		bc.setFlagUsado(true);
		bc.setUsaFonte((short) 0);
		bc.setUsaFonteW((short) 0);
		bc.setLoadF((short) 0);
		bc.setOpcoes(protectedField ? 1 : 0);
	}

	private String cleanBarcodeText(String value) {
		String text = value == null ? "" : value.trim();
		if (text.length() >= 2) {
			char quote = text.charAt(0);
			if ((quote == '"' || quote == '\'') && text.charAt(text.length() - 1) == quote) {
				return text.substring(1, text.length() - 1).trim();
			}
		}
		return text;
	}
	public Integer getTipoMPS() { return tipoMPS; }
	public void setTipoMPS(Integer tipoMPS) { this.tipoMPS = tipoMPS; }
	public Integer getBarcodeType() { return barcodeType; }
	public void setBarcodeType(Integer barcodeType) { this.barcodeType = barcodeType; }
	public Integer getNumChar() { return numChar; }
	public void setNumChar(Integer numChar) { this.numChar = numChar; }
	public Integer getFontCpi() { return fontCpi; }
	public void setFontCpi(Integer fontCpi) { this.fontCpi = fontCpi; }
	public boolean isProtectedField() { return protectedField; }
	public void setProtectedField(boolean protectedField) { this.protectedField = protectedField; }
}
