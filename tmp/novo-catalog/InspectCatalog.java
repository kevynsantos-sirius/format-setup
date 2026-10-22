import java.io.*;
import java.util.*;
import com.fasterxml.jackson.databind.*;
import com.totaldocs.format.web.util.NativeEditor;
public class InspectCatalog {
 public static void main(String[] args)throws Exception {
  var mapper=new ObjectMapper();var editor=new NativeEditor(mapper);
  var snapshot=editor.inspect(new File(args[0]));
  var result=new LinkedHashMap<String,Object>();
  int nativeGraphics=0;
  for(var doc:snapshot.nativeModel().getDocumentos()){
   nativeGraphics+=doc.getListaGrafico()==null?0:doc.getListaGrafico().size();
   if(doc.getListaJanelaDetalhe()!=null)for(var window:doc.getListaJanelaDetalhe())if(window.getListaDet()!=null)for(var band:window.getListaDet())if(band!=null&&band.getListaGrafico()!=null)nativeGraphics+=band.getListaGrafico().size();
  }
  result.put("nativeGraphObjects",nativeGraphics);
  result.put("hash",snapshot.hash());result.put("layout",snapshot.layout());result.put("inventory",snapshot.inventory());
  mapper.writeValue(new File(args[1]),result);
  System.out.println("Native inventory: "+snapshot.inventory().size()+" records; SHA256="+snapshot.hash());
 }
}
