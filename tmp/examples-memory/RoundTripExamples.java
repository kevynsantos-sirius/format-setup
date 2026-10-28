import java.nio.file.*;import java.util.*;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import co.sirius.format.pontof.controller.gravar.PontoFGravar;
public class RoundTripExamples{
 public static void main(String[] args)throws Exception{
  var file=Path.of(args[0]);var model=new PontoFLer(file.toFile()).execute();
  var before=ReviewedBinary.leaves(model);var dest=Path.of(args[1]);new PontoFGravar(dest.toFile(),model).execute();
  var after=ReviewedBinary.leaves(new PontoFLer(dest.toFile()).execute());var changed=ReviewedBinary.diff(before,after);
  System.out.println("NATIVE CHANGES "+changed.size());for(var p:changed.stream().limit(25).toList())System.out.println(p+" "+before.get(p)+" -> "+after.get(p));
  var a=Files.readAllBytes(file);var b=Files.readAllBytes(dest);System.out.println("BYTES "+a.length+" -> "+b.length);int n=0;for(int i=0;i<Math.min(a.length,b.length);i++)if(a[i]!=b[i]){if(n++<25)System.out.println("BYTE "+i+": "+(a[i]&255)+" -> "+(b[i]&255));}System.out.println("DIFFERENT BYTE COUNT "+n);
 }
}
