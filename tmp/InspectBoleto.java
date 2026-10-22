import java.io.*;
import com.fasterxml.jackson.databind.*;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import com.totaldocs.format.web.util.PontoFTojson;
public class InspectBoleto { public static void main(String[] a) throws Exception { var p = new PontoFLer(new File(a[0])).execute(); var dto = PontoFTojson.convertFromPontoF(p,a[0]); new ObjectMapper().writerWithDefaultPrettyPrinter().writeValue(new File(a[1]),dto); } }
