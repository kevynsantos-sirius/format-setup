import org.junit.platform.launcher.core.*;
import org.junit.platform.launcher.listeners.*;
import static org.junit.platform.engine.discovery.DiscoverySelectors.*;
public class RunNumberingBaseline {
 public static void main(String[] args)throws Exception {
  var listener=new SummaryGeneratingListener();var launcher=LauncherFactory.create();
  launcher.registerTestExecutionListeners(listener);
  launcher.execute(LauncherDiscoveryRequestBuilder.request().selectors(selectClass("com.totaldocs.format.web.service.LayoutPreviewServiceTest")).build());
  listener.getSummary().printTo(new java.io.PrintWriter(System.out));
  for(var failure:listener.getSummary().getFailures())System.out.println("FAILED "+failure.getTestIdentifier().getDisplayName());
 }
}
