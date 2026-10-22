import java.io.*;
import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.lang.reflect.*;
import java.util.*;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import co.sirius.format.pontof.controller.gravar.PontoFGravar;
import co.sirius.format.pontof.model.*;

public class ReviewedBinary {
 static String hash(byte[] b)throws Exception{return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(b));}
 static Map<String,String> leaves(Object o)throws Exception{Map<String,String> m=new TreeMap<>();visit(o,"$",m);return m;}
 static void visit(Object o,String p,Map<String,String> m)throws Exception{
  if(o==null){m.put(p,"null");return;}Class<?> c=o.getClass();
  if(o instanceof byte[] b){m.put(p,"bytes:"+b.length+":"+hash(b));return;}
  if(c.isArray()){m.put(p+"#length",String.valueOf(Array.getLength(o)));for(int i=0;i<Array.getLength(o);i++)visit(Array.get(o,i),p+"["+i+"]",m);return;}
  if(o instanceof List<?> l){m.put(p+"#length",String.valueOf(l.size()));for(int i=0;i<l.size();i++)visit(l.get(i),p+"["+i+"]",m);return;}
  if(o instanceof Number||o instanceof Boolean||o instanceof String||o instanceof Enum<?>){m.put(p,c.getName()+":"+o);return;}
  for(Class<?> k=c;k!=Object.class;k=k.getSuperclass())for(Field f:k.getDeclaredFields())if(!Modifier.isStatic(f.getModifiers())){f.setAccessible(true);visit(f.get(o),p+"."+f.getName(),m);}
 }
 static List<String> diff(Map<String,String>a,Map<String,String>b){Set<String> all=new TreeSet<>(a.keySet());all.addAll(b.keySet());return all.stream().filter(k->!Objects.equals(a.get(k),b.get(k))).toList();}
 static String web(int bgr){return String.format("#%02X%02X%02X",bgr&255,(bgr>>>8)&255,(bgr>>>16)&255);}
 static int bgr(String s){int rgb=Integer.parseInt(s.substring(1),16);return ((rgb&255)<<16)|(rgb&0xff00)|((rgb>>>16)&255);}
 static String quote(String s){return "\""+s.replace("\\","\\\\").replace("\"","\\\"")+"\"";}
 public static void main(String[] args)throws Exception{
  Path original=Path.of(args[0]),output=Path.of(args[1]);
  if(original.toRealPath().equals(output.toAbsolutePath().normalize())||Files.exists(output))throw new IllegalArgumentException("Output must be a new separate copy");
  String sourceHash=hash(Files.readAllBytes(original));PontoF model=new PontoFLer(original.toFile()).execute();Map<String,String> before=leaves(model);
  int changes=0;
  for(String line:Files.readAllLines(Path.of(args[2]),StandardCharsets.UTF_8)){
   String[] v=line.split("\t",-1);int doc=Integer.parseInt(v[0]),index=Integer.parseInt(v[1]);
   TextField field=model.getDocumentos().get(doc).getListaTextField().get(index);
   if(!web(field.getColorText()).equalsIgnoreCase(v[2])||Math.abs(field.getPosHor()*25.4/300-Double.parseDouble(v[4]))>0.001||Math.abs(field.getPosVer()*25.4/300-Double.parseDouble(v[5]))>0.001)throw new IllegalStateException("Target precondition mismatch: "+doc+":"+index);
   field.setColorText(bgr(v[3]));changes++;
  }
  Map<String,String> expected=leaves(model);List<String> edits=diff(before,expected);
  if(edits.size()!=changes||edits.stream().anyMatch(k->!k.endsWith(".ColorText")))throw new IllegalStateException("Unexpected planned model changes");
  new PontoFGravar(output.toFile(),model).execute();
  PontoF reread=new PontoFLer(output.toFile()).execute();Map<String,String> actual=leaves(reread);List<String> extra=diff(expected,actual);
  String report="{\"originalSha256\":"+quote(sourceHash)+",\"editedSha256\":"+quote(hash(Files.readAllBytes(output)))+",\"expectedChanges\":"+changes+",\"modelScalarAndArrayFields\":"+before.size()+",\"actualModelChanges\":"+diff(before,actual).size()+",\"unexpectedRoundTripPaths\":["+String.join(",",extra.stream().map(ReviewedBinary::quote).toList())+"],\"originalUnchanged\":"+sourceHash.equals(hash(Files.readAllBytes(original)))+",\"changedPaths\":["+String.join(",",edits.stream().map(ReviewedBinary::quote).toList())+"]}";
  Files.writeString(Path.of(args[3]),report);System.out.println(report);
  if(!extra.isEmpty())throw new IllegalStateException("Serialization changed undeclared model fields: "+extra.size());
 }
}
