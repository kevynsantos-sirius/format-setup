const fs=require('node:fs');
let s=fs.readFileSync('format-manager/src/main/java/co/sirius/format/pontof/controller/ler/TextFieldLer.java','utf8');
s=s.replace('public class TextFieldLer extends Leitura{','public class TextFieldLer extends Leitura{\n public static final java.util.Map<TextField,long[]> OFFSETS=new java.util.IdentityHashMap<>();');
s=s.replace('TextField tf = new TextField();','TextField tf = new TextField();\n long[] offsets=new long[5];');
s=s.replace('tf.setColorText(getInt());','try { offsets[4]=raf.getFilePointer(); } catch(Exception e){throw new RuntimeException(e);}\n tf.setColorText(getInt());');
s=s.replace('tf.setTatual(getShort());','try { offsets[0]=raf.getFilePointer(); } catch(Exception e){throw new RuntimeException(e);}\n tf.setTatual(getShort());');
s=s.replace('tf.setTmax(getShort());','try { offsets[1]=raf.getFilePointer(); } catch(Exception e){throw new RuntimeException(e);}\n tf.setTmax(getShort());');
s=s.replace('tf.setTexto(getString(tf.getTatual()));','try { offsets[2]=raf.getFilePointer(); } catch(Exception e){throw new RuntimeException(e);}\n tf.setTexto(getString(tf.getTatual()));\n offsets[3]=tf.getTexto().length; OFFSETS.put(tf,offsets);');
const dir='tmp/final-legacy/instrumented/co/sirius/format/pontof/controller/ler';fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/TextFieldLer.java',s);
