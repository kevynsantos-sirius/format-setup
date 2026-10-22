import java.nio.file.*;import java.util.*;import co.sirius.format.pontof.controller.ler.PontoFLer;
public class CompareAiBinary {
 public static void main(String[] a)throws Exception{
  var before=ReviewedBinary.leaves(new PontoFLer(Path.of(a[0]).toFile()).execute());
  var after=ReviewedBinary.leaves(new PontoFLer(Path.of(a[1]).toFile()).execute());
  var diff=ReviewedBinary.diff(before,after);
  var json=new StringBuilder("{\"fieldsCompared\":"+before.size()+",\"changedFields\":"+diff.size()+",\"differences\":[");
  boolean first=true;for(String p:diff){if(!first)json.append(',');first=false;json.append('"').append(p.replace("\\","\\\\").replace("\"","\\\"")).append('"');}
  json.append("]}");Files.writeString(Path.of(a[2]),json.toString());
  System.out.println("Fields compared: "+before.size()+"; changed: "+diff.size());diff.stream().limit(30).forEach(System.out::println);
 }
}
