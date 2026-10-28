import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import com.fasterxml.jackson.databind.*;
import com.totaldocs.format.web.dto.*;
import com.totaldocs.format.web.service.*;
import org.springframework.web.client.RestClient;
public class ProbeSheet {
 public static void main(String[] args)throws Exception {
  var mapper=new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
  var root=mapper.readTree(new File(args[0]));var page=mapper.treeToValue(root.path("listaDocumentos").get(0),Page.class);
  var field=new CampoSaida();field.setType("campoSaida");field.setExpressao("LabelId");field.setX(1);field.setY(5);field.setWidth(20);field.setHeight(4);page.setLayout(List.of(field));
  var input=new CampoEntrada();input.setNome("LabelId");input.setPosicao(1);input.setTamanho(1);
  var cfg=new DataFileConfig();cfg.setRecordSize(1);cfg.setRecordFormat("fixed");
  var request=new LayoutPreviewRequest();request.setListaDocumentos(List.of(page));request.setCamposEntrada(List.of(input));request.setDataFileConfig(cfg);request.setPageIndex(0);
  var client=new SiriusUserFunctionClient(RestClient.builder(),"http://localhost:8082","http://localhost:8090/oauth2/token","unused","unused",""){
   @Override public String execute(String name,List<String> values){throw new IllegalStateException("Unexpected function "+name);}
  };
  var service=new LayoutPreviewService(mapper,client,null);
  var response=service.previewAll(request,new ByteArrayInputStream("ABCDEFGHIJKLM".getBytes(StandardCharsets.US_ASCII)),"synthetic.dat",null);
  var report=new LinkedHashMap<String,Object>();report.put("syntheticRecords",13);report.put("horizontal",page.getDocumentsHorizontal());report.put("vertical",page.getDocumentsVertical());report.put("expectedSheetsAtCapacity12",2);report.put("actualPreviewPages",response.getTotalPreviewPages());report.put("firstSheetElements",response.getPage().getLayout().size());report.put("firstSheetValue",response.getPage().getLayout().get(0).getContent().asText());
  mapper.writerWithDefaultPrettyPrinter().writeValue(new File(args[1]),report);System.out.println(report);
 }
}
