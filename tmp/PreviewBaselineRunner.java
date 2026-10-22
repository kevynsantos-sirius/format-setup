import org.junit.platform.launcher.core.*;
import org.junit.platform.launcher.listeners.SummaryGeneratingListener;
import org.junit.platform.engine.DiscoverySelector;
import org.junit.platform.engine.discovery.DiscoverySelectors;
import org.junit.jupiter.api.Test;
import java.util.Arrays;

public class PreviewBaselineRunner {
  public static void main(String[] args) throws Exception {
    Class<?> type=Class.forName("com.totaldocs.format.web.service.LayoutPreviewServiceTest");
    DiscoverySelector[] selectors=Arrays.stream(type.getDeclaredMethods())
      .filter(m -> m.getAnnotation(Test.class)!=null && !m.getName().equals("shouldExecuteMascaraThroughTheApiInsteadOfEmulatingTheDll"))
      .map(m -> DiscoverySelectors.selectMethod(type,m)).toArray(DiscoverySelector[]::new);
    var listener=new SummaryGeneratingListener();
    var launcher=LauncherFactory.create();
    launcher.registerTestExecutionListeners(listener);
    launcher.execute(LauncherDiscoveryRequestBuilder.request().selectors(selectors).build());
    var summary=listener.getSummary();
    System.out.println("BASELINE tests="+summary.getTestsFoundCount()+" failed="+summary.getTestsFailedCount());
    for(var failure:summary.getFailures()) System.out.println("BASELINE failure="+failure.getTestIdentifier().getDisplayName());
  }
}
