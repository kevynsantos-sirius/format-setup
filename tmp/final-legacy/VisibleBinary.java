import java.nio.*;import java.nio.file.*;import java.nio.charset.*;import java.util.*;import java.io.*;import java.util.regex.*;
import co.sirius.format.pontof.controller.ler.*;import co.sirius.format.pontof.model.*;
public class VisibleBinary {
 record Patch(int start,int length,byte[] data){}
 static byte[] word(int value){return ByteBuffer.allocate(2).order(ByteOrder.LITTLE_ENDIAN).putShort((short)value).array();}
 public static void main(String[] a)throws Exception{
  byte[] original=Files.readAllBytes(Path.of(a[0]));PontoF model=new PontoFLer(Path.of(a[0]).toFile()).execute();var before=ReviewedBinary.leaves(model);List<Patch> patches=new ArrayList<>();int count=0;
  for(String line:Files.readAllLines(Path.of(a[2]))){String[] v=line.split("\t");TextField tf=model.getDocumentos().get(Integer.parseInt(v[0])).getListaTextField().get(Integer.parseInt(v[1]));
   if(Math.abs(tf.getPosHor()*25.4/300-Double.parseDouble(v[4]))>0.001||Math.abs(tf.getPosVer()*25.4/300-Double.parseDouble(v[5]))>0.001)throw new Exception("Position mismatch");
   String raw=new String(tf.getTexto(),StandardCharsets.ISO_8859_1);Matcher m=Pattern.compile("\\x1bF([^\\x1b]*)\\x1b").matcher(raw);boolean bracket=false;
   if(!m.find()){m=Pattern.compile("\\[F([^\\]]*)\\]").matcher(raw);bracket=true;if(!m.find()){
    if(!ReviewedBinary.web(tf.getColorText()).equalsIgnoreCase(v[2]))throw new Exception("Base color mismatch");int color=ReviewedBinary.bgr(v[3]);tf.setColorText(color);long[] at=TextFieldLer.OFFSETS.get(tf);patches.add(new Patch((int)at[4],4,ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(color).array()));count++;continue;
   }}
   String token=m.group(1),sep=token.indexOf(1)>=0?"\u0001":",";String[] parts=token.split(Pattern.quote(sep),-1);int font=-1;
   for(int i=0;i<parts.length-2;i++){try{int size=Integer.parseInt(parts[i+1].trim());if(parts[i].trim().matches("[A-Za-z][A-Za-z0-9 _-]*")&&size>0&&size<=300)font=i;}catch(NumberFormatException ignored){}}
   if(font<0)throw new Exception("Unknown font token schema");int old=Integer.parseInt(parts[font+2].trim());if(!ReviewedBinary.web(old).equalsIgnoreCase(v[2]))throw new Exception("Inline color precondition mismatch");parts[font+2]=String.valueOf(ReviewedBinary.bgr(v[3]));
   String newToken=String.join(sep,parts),changed=raw.substring(0,m.start(1))+newToken+raw.substring(m.end(1));byte[] text=changed.getBytes(StandardCharsets.ISO_8859_1);if(text.length>32767)throw new Exception("Text length exceeds legacy limit");long[] at=TextFieldLer.OFFSETS.get(tf);if(at==null)throw new Exception("Missing proven offsets");
   tf.setTexto(text);tf.setTatual((short)text.length);tf.setTmax((short)Math.max(Short.toUnsignedInt(tf.getTmax()),text.length));
   patches.add(new Patch((int)at[0],2,word(tf.getTatual())));patches.add(new Patch((int)at[1],2,word(tf.getTmax())));patches.add(new Patch((int)at[2],(int)at[3],text));count++;
  }
  patches.sort(Comparator.comparingInt(Patch::start));ByteArrayOutputStream out=new ByteArrayOutputStream();int cursor=0;
  for(Patch p:patches){if(p.start<cursor)throw new Exception("Overlapping patches");out.write(original,cursor,p.start-cursor);out.write(p.data);cursor=p.start+p.length;}out.write(original,cursor,original.length-cursor);Files.write(Path.of(a[1]),out.toByteArray());
  var expected=ReviewedBinary.leaves(model);var actual=ReviewedBinary.leaves(new PontoFLer(Path.of(a[1]).toFile()).execute());var extra=ReviewedBinary.diff(expected,actual);var all=ReviewedBinary.diff(before,actual);
  if(!extra.isEmpty()||all.stream().anyMatch(k->!k.endsWith(".texto")&&!k.endsWith(".Tatual")&&!k.endsWith(".Tmax")&&!k.endsWith(".ColorText")))throw new Exception("Unexpected full-model difference: "+extra);
  String json="{\"sourceSha256\":\""+ReviewedBinary.hash(original)+"\",\"editedSha256\":\""+ReviewedBinary.hash(out.toByteArray())+"\",\"changedTextBlocks\":"+count+",\"changedModelFields\":"+all.size()+",\"modelFieldsCompared\":"+before.size()+",\"unexpectedModelChanges\":0,\"unchangedOriginalByteSegmentsCopiedExactly\":true,\"sourceBytes\":"+original.length+",\"editedBytes\":"+out.size()+"}";Files.writeString(Path.of(a[3]),json);System.out.println(json);
 }
}
