import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.*;
import com.totaldocs.format.web.util.NativeEditor;
import java.io.*;
public class ReproduceWindow {
 public static void main(String[] args)throws Exception{
  var m=new ObjectMapper();var e=new NativeEditor(m);var file=new File(args[0]);var s=e.inspect(file);
  var doc=s.inventory().stream().filter(x->x.get("type").equals("document")).reduce((a,b)->b).orElseThrow();
  var op=m.createObjectNode().put("action","create").put("type","detalhe").put("parentId",doc.get("id").toString());
  op.set("data",m.readTree("{\"nome\":\"JAI01\",\"x\":20,\"y\":60,\"width\":80,\"height\":20,\"bandas\":[{\"id\":1,\"nome\":\"DET1\",\"kind\":\"detalhe\",\"defined\":true,\"height\":20,\"expressaoCondicao\":\"\",\"camposSaida\":[],\"camposTexto\":[],\"logos\":[],\"fios\":[],\"barCodes\":[],\"barCodesBi\":[]}],\"nDet\":1,\"tamVerDet\":20}"));
  var req=m.createObjectNode().put("fileHash",s.hash());req.set("operations",m.createArrayNode().add(op));var p=e.prepare(file,req);System.out.println("SUCCESS "+p.bytes().length);
 }
}
