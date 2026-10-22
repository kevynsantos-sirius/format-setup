import java.nio.file.*;import java.util.*;import com.fasterxml.jackson.databind.*;import com.fasterxml.jackson.core.type.TypeReference;
import com.totaldocs.format.web.dto.*;import com.totaldocs.format.web.util.*;import co.sirius.format.pontof.controller.gravar.*;
public class ConversionControl {
 public static void main(String[] args)throws Exception{
  var m=new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);var x=m.readTree(Path.of(args[0]).toFile());
  List<Page> pages=m.convertValue(x.get("listaDocumentos"),new TypeReference<List<Page>>(){});
  var ponto=PontoFTojson.convertToPontoF(pages,Path.of(args[1]).toFile(),m.treeToValue(x.get("dataFileConfig"),DataFileConfig.class),m.convertValue(x.get("camposEntrada"),new TypeReference<List<CampoEntrada>>(){}),m.treeToValue(x.get("userFunctionConfig"),UserFunctionConfig.class),m.convertValue(x.get("userVariables"),new TypeReference<List<UserVariable>>(){}),m.treeToValue(x.get("overlayConfig"),OverlayConfig.class),m.convertValue(x.get("conditionalFonts"),new TypeReference<List<ConditionalFont>>(){}));
  if(args.length>3) {
   var result=AiTextFormattingPersistence.prepare(pages,Path.of(args[1]).toFile(),ponto).orElseThrow();
   Files.write(Path.of(args[2]),result);System.out.println("SCOPED_FORMATTING_REREAD_PASSED "+result.length);
  } else new PontoFGravar(Path.of(args[2]).toFile(),ponto).execute();
 }
}
