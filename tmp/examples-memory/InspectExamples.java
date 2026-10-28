import java.io.*;
import java.nio.file.*;
import java.security.*;
import java.util.*;
import com.fasterxml.jackson.databind.*;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import com.totaldocs.format.web.util.PontoFTojson;
public class InspectExamples {
 public static void main(String[] args)throws Exception {
  File file=new File(args[0]); var model=new PontoFLer(file).execute();
  var result=new LinkedHashMap<String,Object>();
  result.put("hash",HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(Files.readAllBytes(file.toPath()))));
  result.put("fileNameWidth",model.getSerializedFileNameLength());
  result.put("nativeModel",model);
  result.put("layout",PontoFTojson.convertFromPontoF(model,file.getAbsolutePath()));
  new ObjectMapper().writeValue(new File(args[1]),result);
  System.out.println("Read "+file.getName()+": "+model.getDocumentos().size()+" documents");
 }
}
