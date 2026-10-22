package co.sirius.format.pontof.controller.ler;
import static co.sirius.format.pontof.util.Constantes.LF_FACESIZE;
import static co.sirius.format.pontof.util.Constantes.MAXLENEXPR;
import static co.sirius.format.pontof.util.Constantes.MAXLENNAME;

import java.io.RandomAccessFile;

import co.sirius.format.pontof.model.TextField;
import co.sirius.format.pontof.util.ConversorAlinhamento;
import co.sirius.format.pontof.util.ConversorEspacamento;
import co.sirius.format.pontof.util.ConversorOrientacao;
import co.sirius.format.pontof.util.Enums.or_cpo;
import co.sirius.format.pontof.util.Enums.tp_alin;

public class TextFieldLer extends Leitura{
 public static final java.util.Map<TextField,long[]> OFFSETS=new java.util.IdentityHashMap<>();
	
	public TextFieldLer(RandomAccessFile raf) {
		try {
			this.raf = raf;
		} catch (Exception e) {
			e.printStackTrace();
		}  
	}
	
	public TextField execute() {
		TextField tf = new TextField();
 long[] offsets=new long[5];
		
		tf.setFlagUsado(getBoolean());
		tf.setIndProxText(getShort());
		tf.setPosHor(getShort());
		tf.setPosVer(getShort());
		tf.setTamHor(getShort());
		tf.setTamVer(getShort());
		tf.setFontText(getString(MAXLENNAME));
		tf.setLoadFText(getShort());
		tf.setFPropText(getBoolean());
		tf.setFcpiText(getShort());
		tf.setFexpText(getBoolean());
		tf.setFundText(getBoolean());

		//le o alinhamento
		int or = getShort();
		tp_alin enumAl = ConversorAlinhamento.getAlin(or);
		tf.setJustText(enumAl);
		
		//le a orientacao
		or = getShort();
		or_cpo enumOr = ConversorOrientacao.toDocument(or);
		tf.setOrientText(enumOr);

		//le a espessura da linha
		tf.setEspLinText(ConversorEspacamento.fromFile(getShort()));
		
		tf.setAtEspLinText(getShort());
		tf.setHmeta(getShort());
		tf.setText(getShort());
		try { offsets[0]=raf.getFilePointer(); } catch(Exception e){throw new RuntimeException(e);}
 tf.setTatual(getShort());
		try { offsets[1]=raf.getFilePointer(); } catch(Exception e){throw new RuntimeException(e);}
 tf.setTmax(getShort());
		tf.setCond(getString(MAXLENEXPR));
		tf.setMoldurado(getBoolean());
		tf.setEspessura(getShort());
		tf.setSombra(getShort());
		tf.setFitaText(getBoolean()); 
		tf.setFstkText(getBoolean()); 
		tf.setFboldText(getShort()); 
		tf.setFnomeWText(getString(LF_FACESIZE)); 
		tf.setCorpoText(getShort()); 
		try { offsets[4]=raf.getFilePointer(); } catch(Exception e){throw new RuntimeException(e);}
 tf.setColorText(getInt()); 
		tf.setExprFonteText(getString(MAXLENEXPR));
		tf.setOpcoes(getInt());
		
		try { offsets[2]=raf.getFilePointer(); } catch(Exception e){throw new RuntimeException(e);}
 tf.setTexto(getString(tf.getTatual()));
 offsets[3]=tf.getTexto().length; OFFSETS.put(tf,offsets);

		return tf;
	}
}
