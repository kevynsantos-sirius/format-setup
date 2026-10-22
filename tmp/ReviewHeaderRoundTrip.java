import java.io.*;
import java.nio.file.*;
import co.sirius.format.pontof.model.*;
import co.sirius.format.pontof.controller.ler.*;
import co.sirius.format.pontof.controller.gravar.*;
import co.sirius.format.pontof.util.Constantes;
class ReviewHeaderRoundTrip {
 public static void main(String[] args) throws Exception {
  var window = new JanelaDetalhe();
  window.getObj().setExprCond(new byte[Constantes.MAXLENEXPR]);
  window.setNCab(1);
  for(int i=0;i<window.getListaDet().length;i++) window.getListaDet()[i]=new Detalhe();
  Path file=Files.createTempFile("format-review-header-", ".bin");
  try(var raf=new RandomAccessFile(file.toFile(),"rw")) {
   new JanelaDetalheGravar(raf).execute(window);
   raf.seek(0);
   var reread=new JanelaDetalheLer(raf).execute();
   System.out.println("HEADERS_BEFORE="+window.getNCab()+" HEADERS_AFTER="+reread.getNCab());
  } finally {Files.deleteIfExists(file);}
 }
}
