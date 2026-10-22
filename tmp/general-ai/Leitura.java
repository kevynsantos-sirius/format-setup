package co.sirius.format.pontof.controller.ler;

import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public abstract class Leitura {
	protected static final int TAM_SHORT = 2;
	protected static final int TAM_CHAR = 1;
	protected static final int TAM_BOOLEAN = 2;
	protected static final int TAM_LONG = 8;
	protected static final int TAM_INT = 4;
	
	protected RandomAccessFile raf;
	
	private byte[] getContent(int tamanhoRegistro){
		byte[] lByte = null;
		try {
			lByte = new byte[tamanhoRegistro];
			raf.readFully(lByte);
			return lByte;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	protected boolean getBoolean() {
		byte[] lByte = getContent(TAM_BOOLEAN);
		if((lByte[0]!=0&&lByte[0]!=1)||lByte[1]!=0){try{System.out.println("OPAQUE_BOOLEAN "+(raf.getFilePointer()-2)+" "+new Exception().getStackTrace()[1]);}catch(Exception ignored){}} return (lByte[0] == 1);
	}

	protected short[] getShortArray(int tam) {
		short[] s = new short[tam];
		
		try{
			for(int i=0;i<tam;i++){
				s[i] = getShort();
			}
			return s;
		} catch(Exception e){
			return null;
		}
	}

	protected byte getByte() {
		byte[] lByte = getContent(TAM_CHAR);
		return lByte[0];
	}

//	protected String getString(int tam) {
//		byte[] lByte = getContent(tam);
//		return new String(lByte);//, java.nio.charset.Charset.forName("Windows-1252"));
//	}

	protected byte[] getString(int tam) {
		return getContent(tam);
	}

	protected short getShortByInt(){
		try {
			byte[] lByte = getContent(TAM_INT);
			ByteBuffer buffer = ByteBuffer.wrap(lByte);
			buffer.order(ByteOrder.LITTLE_ENDIAN);
			return buffer.getShort();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	protected short getShort(){
		try {
			byte[] lByte = getContent(TAM_SHORT);
			ByteBuffer buffer = ByteBuffer.wrap(lByte);
			buffer.order(ByteOrder.LITTLE_ENDIAN);
			return buffer.getShort();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	protected long getLong(){
		try{
			byte[] b = getContent(TAM_LONG);
			ByteBuffer buffer = ByteBuffer.wrap(b);
//			buffer.order(ByteOrder.LITTLE_ENDIAN);
			return buffer.getLong();
		} catch(Exception e){
			return 0;
		}
	}
	
	/**
	 * Le do Randon tamanho do int (4 bytes)
	 * @return
	 */
	protected int getInt(){
		try{
			byte[] b = getContent(TAM_INT);
			ByteBuffer buffer = ByteBuffer.wrap(b);
			buffer.order(ByteOrder.LITTLE_ENDIAN);
			return buffer.getInt();
		} catch(Exception e){
			return 0;
		}
	}
	
	/**
	 * Le do Randon [tam] vezes com tamanho de int (4 bytes)
	 * @param tam
	 * @return int[tam]
	 */
	protected int[] getIntArray(int tam) {
		int[] s = new int[tam];
		
		try{
			for(int i=0;i<tam;i++){
				s[i] = getInt();
			}
			return s;
		} catch(Exception e){
			return null;
		}
	}
}
