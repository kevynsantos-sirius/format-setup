import java.io.File;
import java.nio.charset.StandardCharsets;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import co.sirius.format.pontof.model.*;

public class DumpTextRaw {
  static int u(short s) { return Short.toUnsignedInt(s); }
  static String esc(byte[] b) {
    if (b == null) return "";
    String v = new String(b, StandardCharsets.ISO_8859_1);
    return v.replace("\u001b", "<ESC>").replace("\u0001", "<SEP>").replace("\r", "<CR>").replace("\n", "<LF>");
  }
  public static void main(String[] args) throws Exception {
    PontoF p = new PontoFLer(new File(args[0])).execute();
    int d=0;
    for (Documento doc : p.getDocumentos()) {
      int i=0;
      if (doc.getListaTextField()!=null) for (TextField t : doc.getListaTextField()) {
        System.out.printf("DOC %d TEXT %d x=%d y=%d w=%d h=%d font=%s corpo=%d espLin=%s atEsp=%d\n%s\n", d, i++, u(t.getPosHor()), u(t.getPosVer()), u(t.getTamHor()), u(t.getTamVer()), esc(t.getFnomeWText()), u(t.getCorpoText()), t.getEspLinText(), u(t.getAtEspLinText()), esc(t.getTexto()));
      }
      d++;
    }
  }
}
