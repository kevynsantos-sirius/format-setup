import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import co.sirius.format.pontof.model.*;
import com.totaldocs.format.web.util.PontoFTojson;
import com.fasterxml.jackson.databind.ObjectMapper;

public class InspectNovo {
  static String clean(byte[] b) { if(b==null)return ""; int n=0; while(n<b.length&&b[n]!=0)n++; return new String(b,0,n,StandardCharsets.ISO_8859_1).trim(); }
  public static void main(String[] args) throws Exception {
    PontoF p = new PontoFLer(new File(args[0])).execute();
    if(p==null)throw new IllegalStateException("Parser retornou null");
    var app = PontoFTojson.convertFromPontoF(p,args[0]);
    var mapper=new ObjectMapper();
    mapper.writeValue(new File(args[1]),app);
    System.out.println("Documents="+p.getDocumentos().size()+" InputFields="+p.getCamposEntradas().size());
    System.out.println("InputFile="+clean(p.getFileName())+" ImageFile="+clean(p.getImageFile()));
    System.out.println("DLL="+clean(p.getDllFile())+" ImageDir="+clean(p.getDirImagens()));
    for(var d:p.getDocumentos()) {
      System.out.println("DOCUMENT "+clean(d.getNomeDoc())+" logos="+d.getListaLogo().size()+" text="+d.getListaTextField().size()+" fields="+d.getListaCpoSai().size());
      for(var logo:d.getListaLogo())System.out.println("LOGO "+clean(logo.getExprLogo()));
    }
    for(var o:p.getOverlays()) if(o.isFlagUsado())System.out.println("OVERLAY "+clean(o.getArquivo()));
  }
}
