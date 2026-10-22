import org.junit.platform.launcher.core.*;
import org.junit.platform.launcher.listeners.*;
import static org.junit.platform.engine.discovery.DiscoverySelectors.*;
public class RunBoletoTests {
 public static void main(String[] a) throws Exception {
  var listener = new SummaryGeneratingListener();
  var request = LauncherDiscoveryRequestBuilder.request().selectors(selectClass("com.totaldocs.format.web.service.ProjectServiceTest")).build();
  var launcher=LauncherFactory.create(); launcher.registerTestExecutionListeners(listener); launcher.execute(request);
  listener.getSummary().printTo(new java.io.PrintWriter(System.out));
  listener.getSummary().printFailuresTo(new java.io.PrintWriter(System.out));
  if(listener.getSummary().getTestsFailedCount()>0) System.exit(1);
 }
}


