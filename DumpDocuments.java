import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import co.sirius.format.pontof.controller.ler.PontoFLer;
import co.sirius.format.pontof.model.Documento;
import co.sirius.format.pontof.model.PontoF;

public class DumpDocuments {
    private static String clean(byte[] bytes) {
        if (bytes == null) return "";
        int len = 0;
        while (len < bytes.length && bytes[len] != 0) len++;
        return new String(Arrays.copyOf(bytes, len), StandardCharsets.ISO_8859_1).trim();
    }
    public static void main(String[] args) throws Exception {
        PontoF p = new PontoFLer(new File(args[0])).execute();
        System.out.println("NDocForm=" + p.getNDocForm());
        int i = 0;
        for (Documento d : p.getDocumentos()) {
            System.out.println("doc[" + i + "] name='" + clean(d.getNomeDoc())
                    + "' princ=" + d.isDocPrinc()
                    + " overflow=" + d.isDocOverflow()
                    + " expr='" + clean(d.getCondDoc())
                    + "' overflowExpr='" + clean(d.getCondDocOverflow()) + "'");
            i++;
        }
    }
}
