import java.io.*;
import java.nio.charset.StandardCharsets;
import co.sirius.format.pontof.controller.ler.*;
import com.fasterxml.jackson.databind.*;
import com.totaldocs.format.web.util.PontoFTojson;
public class InspectLabel {
 static String text(byte[] b){return b==null?"":new String(b,StandardCharsets.ISO_8859_1).split("\0",2)[0].trim();}
 public static void main(String[] args)throws Exception {
  if(System.getProperty("legacy.nameLength")!=null)co.sirius.format.pontof.util.Constantes.MAXLENFILENAME=Integer.parseInt(System.getProperty("legacy.nameLength"));
  var p=new PontoFLer(new File(args[0])).execute();
  if(p==null){System.out.println("Parser returned null");return;}
  System.out.println("version="+text(p.getVersao())+" headerDocuments="+p.getNDocForm()+" documents="+p.getDocumentos().size()+" inputFields="+p.getCamposEntradas().size());
  System.out.println("form="+p.getTamHorForm()+"x"+p.getTamVerForm()+" document="+p.getTamDocHor()+"x"+p.getTamDocVer()+" grid="+p.getNDocHoriz()+"x"+p.getNDocVert()+" groups="+p.getNDocGr()+" spacing="+p.getEspDocHor()+","+p.getEspDocVer());
  System.out.println("functions="+p.getFuncoes().size()+" variables="+p.getVariaveis().size()+" details="+p.getCamposDetalhes().size());
  if(System.getProperty("label.json")!=null){var dto=PontoFTojson.convertFromPontoF(p,args[0]);new ObjectMapper().writerWithDefaultPrettyPrinter().writeValue(new File(System.getProperty("label.json")),dto);System.out.println("converted="+(dto==null?0:dto.getListaDocumentos().size()));}
  if(args.length>1)try(var raf=new RandomAccessFile(args[0],"r")){
   raf.seek(Long.parseLong(args[1]));var d=new DocumentoLer(raf).execute();
   System.out.println("candidate="+text(d.getNomeDoc())+" used="+d.isFlagUsado()+" principal="+d.isDocPrinc()+" condition="+text(d.getCondDoc())+" end="+raf.getFilePointer());
   System.out.println("outputs="+d.getListaCpoSai().size()+" text="+d.getListaTextField().size()+" logos="+d.getListaLogo().size()+" barcode="+d.getListaBarCode().size()+" detail="+d.getListaJanelaDetalhe().size());
  }
 }
}
