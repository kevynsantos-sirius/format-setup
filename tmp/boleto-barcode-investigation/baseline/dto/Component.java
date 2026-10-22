package com.totaldocs.format.web.dto;

import java.io.ByteArrayOutputStream;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.totaldocs.format.web.util.ConversorUtil;

import co.sirius.format.pontof.model.CpoSai;
import co.sirius.format.pontof.util.Enums.or_cpo;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "type", visible = true)
@JsonSubTypes({
    @JsonSubTypes.Type(value = CampoTexto.class, name = "text"),
    @JsonSubTypes.Type(value = CampoLogo.class, name = "image"),
    @JsonSubTypes.Type(value = CampoBarCode.class, name = "barcode"),
    @JsonSubTypes.Type(value = CampoQRCode.class, name = "qrcode"),
    @JsonSubTypes.Type(value = CampoSaida.class, name = "campoSaida"),
    @JsonSubTypes.Type(value = CampoJanelaDetalhe.class, name = "detalhe"),
    @JsonSubTypes.Type(value = CampoBlocoEnderecamento.class, name = "blocoEnderecamento"),
    @JsonSubTypes.Type(value = CampoFio.class, name = "fio"),
    @JsonSubTypes.Type(value = CampoFio.class, name = "FIO_MOLDURA"),
    @JsonSubTypes.Type(value = CampoFio.class, name = "FIO_ELIPSE"),
    @JsonSubTypes.Type(value = CampoFio.class, name = "FIO_HORIZONTAL"),
    @JsonSubTypes.Type(value = CampoFio.class, name = "FIO_VERTICAL")
})
public abstract class Component implements Serializable {
    private static final long serialVersionUID = 1L;

    private static final Logger logger = LoggerFactory.getLogger(Component.class);

    private double DPI = 300; // Assuming 96 DPI for conversion
    
    private String type; // text, image, barcode, qrcode, camposaida
    private double x;
    private double y;
    private double width;
    private double height;
    private JsonNode content;
    private Font font; // only for type == "text"
    private int orientation;
    private String conditional;
    private int alignment; // 0=left, 1=center, 2=right, 3=justify

    public Component() {}
//    public ComponentDTO(int dpi) {DPI = dpi;}

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
    	this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

	public String getConditional() {
		return conditional;
	}

	public void setConditional(String conditional) {
		this.conditional = conditional;
	}
	
    public JsonNode getContent() {
        return content;
    }

    public void setContent(JsonNode content) {
        this.content = content;
    }
    
    public int getAlignment() {
		return alignment;
	}
	public void setAlignment(int alignment) {
	    this.alignment = alignment;
	}
	
    public void setContentFromString(String content) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Tenta parsear como JSON (pode ser array serializado)
            this.content = mapper.readTree(content);
        } catch (Exception e) {
            // Se não for JSON válido, trata como texto simples
            this.content = mapper.getNodeFactory().textNode(content);
        }
    }

    public void setContentFromBytes(byte[] content) {
    	setContentFromString(decodeField(content));
    }

    public Font getFont() {
        return font;
    }

    public void setFont(Font font) {
        this.font = font;
    }
    
    public void setPosicao(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public void setOrientationFromEnum(or_cpo orientBarcode) {
		switch (orientBarcode) {
		case OR_NORMAL:
			this.orientation = 0;
			break;
		case OR_BAIXO:
			this.orientation = 90;
			break;
		case OR_INVERTIDO:
			this.orientation = 180;
			break;
		case OR_CIMA:
			this.orientation = 270;
			break;
		case OR_PERSONALIZADO:
			this.orientation = 200;
			break;
		default:
			this.orientation = 0;
			break;
		}
	}
    
	public void setOrientation(short valOrientCposai) {
	    this.orientation = valOrientCposai;
	}

	public int getOrientation() {
        return orientation;
	}

	public void trataExpressao() {
	    List<ObjectNode> trechoJsonList = new ArrayList<>();
	    try {
	    	String texto = (content != null && content.isTextual()) 
	    		    ? content.asText() 
	    		    : null;
	
	        if (texto == null || texto.indexOf(27) == -1) {
	            return;
	        }
	        
	        texto = texto.toString().replace("\r", String.valueOf((char) 27)+ "\r");
	
	        ObjectMapper mapper = new ObjectMapper();
	        boolean exec = texto.indexOf(27) == 0;
	        int posEscI = 0;
	        while (posEscI > -1) {
	            int posEscF = texto.indexOf(27, posEscI + 1);
	            String trecho = "";
	            try {
	                if (exec) {
	                    trecho = texto.substring(posEscI + 1, posEscF);
	                } else {
	                    trecho = texto.substring(posEscI, posEscF);
	                    exec = true;
	                }
	            } catch (StringIndexOutOfBoundsException si) {
	                trecho = texto.substring(posEscI + 1);
	            }
	
	            // build JSON for this trecho
	            ObjectNode node = mapper.createObjectNode();
//	            node.put("raw", trecho);
	
	            if (!trecho.isEmpty()) {
	            	if(trecho.getBytes().length == 1 || trecho.getBytes()[1] != 1) {
	            		if(trecho.equals("\r\n")) {
	            			node.put("type", "breakline");
	            		} else {
		                    node.put("type", "text");
		                    node.put("content", trecho);
	            		}
		                    
	            	} else 
	                if (trecho.startsWith("C")) {
                    List<String> parts = splitExpression(trecho);
                    CampoSaida tText = getCampoSaida(trecho);
                    node.put("type", "campoSaida");
                    if (tText != null) {
                        node.set("content", tText.getContent());
                    } else {
                        node.put("content", trecho);
                    }
                    node.put("expressao", valueAt(parts, 1));
                    node.put("width", parseInt(valueAt(parts, 3), 150));
                    node.put("mask", valueAt(parts, 2));
                    node.put("autoLF", parseInt(valueAt(parts, 4), 0) == 1);
                    node.put("rtrim", parseInt(valueAt(parts, 5), 0) == 1);
                    int fontIndex = legacyFontIndex(parts);
                    if (fontIndex > 0) {
                        Font inlineFont = new Font(valueAt(parts, fontIndex).trim(),
                                parseInt(valueAt(parts, fontIndex + 1), 0),
                                parseInt(valueAt(parts, fontIndex + 5), 400),
                                getCorFonte(parseInt(valueAt(parts, fontIndex + 2), 0)));
                        inlineFont.setItalico("I".equals(valueAt(parts, fontIndex + 3)) || parseInt(valueAt(parts, fontIndex + 3), 0) == 1);
                        inlineFont.setTachado("K".equals(valueAt(parts, fontIndex + 4)) || parseInt(valueAt(parts, fontIndex + 4), 0) == 1);
                        inlineFont.setSublinhado(parseInt(valueAt(parts, fontIndex + 6), 0) == 1);
                        inlineFont.setStyle(inlineFont.getItalico() ? "italic" : "normal");
                        node.set("font", mapper.valueToTree(inlineFont));
                    }
                } else if (trecho.startsWith("F")) {
	                    node.put("type", "FontDescriptor");
	                    // getFonte currently returns a String representation; include it
	                    JsonNode fonteDesc = getFonte(trecho);
	                    node.set("fontDescriptor", fonteDesc);
	                }
	                else if (trecho.startsWith("R")) {
	                    node.put("type", "textFio");
	                    List<String> parts = splitExpression(trecho);
	                    node.put("tipoFio", valueAt(parts, 1).isBlank() ? "FIO_HORIZONTAL" : valueAt(parts, 1));
	                    node.put("length", parseInt(valueAt(parts, 2), "FIO_VERTICAL".equalsIgnoreCase(valueAt(parts, 1)) ? 3 : 32));
	                    node.put("color", valueAt(parts, 3).isBlank() ? "#000000" : valueAt(parts, 3));
	                    node.put("thickness", parseInt(valueAt(parts, 4), 1));
	                    node.put("content", trecho);
	                } else if (trecho.startsWith("L")) {
	                    node.put("type", "Logo");
	                    // try to extract dimensions via replace() like original getLogo
	                    List<String> parts = splitExpression(trecho);
	                    if (parts.size() > 3) {
	                        try {
	                            node.put("width", Integer.parseInt(parts.get(2)));
	                            node.put("height", Integer.parseInt(parts.get(3)));
	                        } catch (NumberFormatException ignored) {}
	                    }
	                    node.put("content", trecho);
	                } else {
	                    node.put("type", "text");
	                    node.put("content", trecho);
	                }
	            } else {
	                node.put("type", "empty");
	            }
	
	            // add JSON string to the list
	            trechoJsonList.add(node);
	
	            posEscI = posEscF == -1 ? -1 : texto.indexOf(27, posEscF);
	        }
	        content = mapper.valueToTree(trechoJsonList);
	    } catch (Exception e) {
	        logger.error("Erro ao processar conteúdo do componente: {}", e.getMessage(), e);
	    }
	}

	private CampoSaida getCampoSaida(String pTrecho) {
		String texto = pTrecho.trim();
		int posEscI = texto.indexOf(1);
		if(posEscI == -1){
			return null;
		}
		
		/** 
		   1-expressao, 2-mascara, 3-largura, 4-automatic, 5-rtrim, 
		   6-nome_da_fonte, 7-corpo, 8-E, 9-S, 10-num_fonte_int, 11-FonteW, 12-altura, 
		   13-I, 14-K, 15-NumBold, 16-expressao_fonte, 17-So, 18-Su
		   
		   1- IF ( Sexo =  "M" ) "Prezado Sr.  " ELSE "Prezada Sra.  ",  2- "", 3- 600, 
		   4- 0,  5- 0, 6- TNR11P, 7- 0, 8- "", 9- "", 10- 0, 
		   11- Times New Roman, 12- 11 12- "", 13- 0, 14- "", 15- "", 16- 400, 17- "",  18- ""
		 **/
		
		List<String> lista = new ArrayList<>();
		lista = splitExpression(pTrecho);
		
		CpoSai cs = new CpoSai();
		cs.setExprCposai(lista.get(1).getBytes());
		cs.setFnomeWCposai(lista.get(5).getBytes());
		cs.setCorpoCposai((short) Integer.parseInt(lista.get(7)));
		cs.setTamVerCposai((short) Integer.parseInt(lista.get(3)));
		
		return new CampoSaida(cs);
	}
	
	private JsonNode getFonte(String pTrecho) {
		List<String> lista = splitExpression(pTrecho);
		//1- nome da fonte, 2- corpo, 3- E, 4- S, 5- num fonte int, 6- FonteW, 7- altura, 8- I, 9- K, 10- NumBold, 11- expressao fonte, 12- So, 13- Su
		//DEFAULT, 10, , , 0, Times New Roman, 12, 0, , , 400, ,
		int fontIndex = legacyFontIndex(lista);
		Font fonte = new Font(valueAt(lista, fontIndex).trim(), 
				parseInt(valueAt(lista, fontIndex + 1), 0), 
				parseInt(valueAt(lista, fontIndex + 5), 400), //bold
				getCorFonte(parseInt(valueAt(lista, fontIndex + 2), 0)) //cor
				);
		fonte.setItalico("I".equals(valueAt(lista, fontIndex + 3)) || parseInt(valueAt(lista, fontIndex + 3), 0) == 1);
		fonte.setSublinhado(parseInt(valueAt(lista, fontIndex + 6), 0) == 1);
		fonte.setTachado(parseInt(valueAt(lista, fontIndex + 4), 0) == 1);
		
		ObjectMapper mapper = new ObjectMapper();
		return mapper.valueToTree(fonte);
	}

	private int legacyFontIndex(List<String> lista) {
		int best = -1;
		for (int index = 1; index < lista.size() - 1; index++) {
			String candidate = valueAt(lista, index).trim();
			int size = parseInt(valueAt(lista, index + 1), -1);
			if (isLegacyFontNameCandidate(candidate) && size > 0 && size <= 300) {
				best = index;
			}
		}
		return best >= 0 ? best : 6;
	}

	private String valueAt(List<String> lista, int index) {
		return index >= 0 && index < lista.size() && lista.get(index) != null ? lista.get(index) : "";
	}

	private int parseInt(String value, int fallback) {
		try {
			return Integer.parseInt(isEmpty(value) ? String.valueOf(fallback) : value.trim());
		} catch (NumberFormatException e) {
			return fallback;
		}
	}

	private boolean isInteger(String value) {
		try {
			Integer.parseInt(value.trim());
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	private boolean isLegacyFontNameCandidate(String value) {
		if (value == null || value.isBlank() || "F".equals(value)) {
			return false;
		}
		if (isInteger(value)) {
			return false;
		}
		return !value.matches("(?i)^[IKESU]$");
	}
	
	private String getFonte2(String pTrecho) {
		List<String> lista = splitExpression(pTrecho);
		//1- nome da fonte, 2- corpo, 3- E, 4- S, 5- num fonte int, 6- FonteW, 7- altura, 8- I, 9- K, 10- NumBold, 11- expressao fonte, 12- So, 13- Su
		//DEFAULT, 10, , , 0, Times New Roman, 12, 0, , , 400, ,
		return lista.toString();
	}
	
	private boolean isEmpty(String value) {
		return value == null || value.trim().isEmpty();
	}
	
	private void getDefaultFonte(String pTrecho) {
		List<String> lista = splitExpression(pTrecho);
		//1- nome da fonte, 2- corpo, 3- E, 4- S, 5- num fonte int, 6- FonteW, 7- altura, 8- I, 9- K, 10- NumBold, 11- expressao fonte, 12- So, 13- Su
		//DEFAULT, 10, , , 0, Times New Roman, 12, 0, , , 400, , 
		
		setFont(new Font(lista.get(6).trim(), 
				Integer.parseInt(lista.get(7)) * DPI, 
				Integer.parseInt(lista.get(11)), //bold
				getCorFonte(Integer.parseInt(lista.get(8))) //cor
				));
	}
	
	private String getCorFonte(int corInt) {
        // Extrai R, G e B (invertendo a ordem)
        int r = corInt & 0xFF;
        int g = (corInt >> 8) & 0xFF;
        int b = (corInt >> 16) & 0xFF;

        // Converte para hexadecimal no formato web (#RRGGBB)
        String hex = String.format("#%02X%02X%02X", r, g, b);
        return hex;
	}
	
	private List<String> splitExpression(String pTrecho) {
		byte[] l = pTrecho.getBytes();
		List<String> lista = new  ArrayList<>();
		String sRet = "";
		for(int i = 0; i < l.length; i++){
			if(l[i]==1){
				lista.add(sRet.substring(0));
				sRet = "";
			} else {
				byte[] b = new byte[]{l[i]};
				sRet += new String(b);
			}
		}
		lista.add(sRet.substring(0));
		return lista;
	}

	public String calculaLargura(String initText){
		String result = "";
		String c = "c";
		double tamText = 0.0;
		double tam = initText.length();
		initText = "";
		while (tamText < tam) {
			c = getLetra(c);
			result += c;
			tamText += 1.0;
		}
		return result;
	}

	protected String getLetra(String c) {
		switch (c) {
			case "A": c = "a"; break;
			case "a": c = "B"; break;
			case "B": c = "b"; break;
			case "b": c = "C"; break;
			case "C": c = "c"; break;
			default: c = "A";
		}
		return c;
	}
	
	protected double mmToPx(double mm, double dpi) {
	    return ConversorUtil.mmToPx(mm, dpi);
	}

	protected double pxToMm(double px, double dpi) {
		return ConversorUtil.pxToMm(px, dpi);
	}
	
	protected double mmToPx(double mm) {
		return ConversorUtil.mmToPx(mm, DPI);
	}

	protected double pxToMm(double px) {
		return ConversorUtil.pxToMm(px, DPI);
	}
	
	private String decodeField(byte[] fieldBytes) {
	    ByteArrayOutputStream out = new ByteArrayOutputStream();
	    for (byte b : fieldBytes) {
	        if (b == 0x1B) continue;     // remove ESC
	        if (b == 0x00) continue;     // remove NULL
	        if (b == 0x01) out.write('|'); // troca separador por |
	        else out.write(b);
	    }
	    return new String(out.toByteArray(), StandardCharsets.ISO_8859_1);
	}
}
