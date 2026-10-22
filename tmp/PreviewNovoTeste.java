import java.nio.file.*;
import com.fasterxml.jackson.databind.*;
import com.totaldocs.format.web.dto.*;
import com.totaldocs.format.web.service.*;
import com.totaldocs.format.web.storage.*;
import org.springframework.web.client.RestClient;

public class PreviewNovoTeste {
  public static void main(String[] args) throws Exception {
    var mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    var request = mapper.readValue(Path.of(args[0]).toFile(), LayoutPreviewRequest.class);
    var client = new SiriusUserFunctionClient(RestClient.builder(), "http://localhost:8082",
        "http://localhost:8090/oauth2/token", "format-api-client", System.getenv("PREVIEW_TEST_SECRET"),
        "format.process format.read format.admin");
    var service = new LayoutPreviewService(mapper, client, new FileSystemProjectStorage("format-web/projects"));
    try (var data = Files.newInputStream(Path.of(args[1]))) {
      var cursor = service.openPreviewCursor(request, data, "APPREM_A1P1_0001", null);
      for(int page = 0; page < 10; page++) {
        try {
          var result = service.previewCursorPage(cursor, page);
          System.out.println("SUCCESS page=" + (page+1) + " document=" + result.getPage().getName());
          mapper.writeValue(Path.of("tmp/preview-real-page-"+(page+1)+".json").toFile(), result);
        } catch (java.util.NoSuchElementException end) { break; }
      }
    }
  }
}
