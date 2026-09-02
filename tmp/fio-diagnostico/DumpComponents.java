import java.io.File;
import java.nio.charset.StandardCharsets;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import co.sirius.format.pontof.model.*;

public class DumpComponents {
  static int u(short s) { return Short.toUnsignedInt(s); }
  static String s(byte[] b) { return b == null ? "" : new String(b, StandardCharsets.ISO_8859_1).replace('\r', ' ').replace('\n', ' ').trim(); }
  static String clip(String v) { return v.length() > 70 ? v.substring(0, 70) + "..." : v; }
  public static void main(String[] args) throws Exception {
    PontoF p = new PontoFLer(new File(args[0])).execute();
    System.out.printf("form=%d x %d doc=%d x %d orient=%d\n", u(p.getTamHorForm()), u(p.getTamVerForm()), u(p.getTamDocHor()), u(p.getTamDocVer()), p.getOrientForm());
    int d=0;
    for (Documento doc : p.getDocumentos()) {
      String name = s(doc.getNomeDoc());
      System.out.printf("DOC %d %s texts=%d saidas=%d logos=%d fios=%d\n", d++, name,
        doc.getListaTextField()==null?0:doc.getListaTextField().size(),
        doc.getListaCpoSai()==null?0:doc.getListaCpoSai().size(),
        doc.getListaLogo()==null?0:doc.getListaLogo().size(),
        doc.getListaFio()==null?0:doc.getListaFio().size());
      if (doc.getListaTextField()!=null) {
        int i=0; for (TextField t : doc.getListaTextField()) {
          System.out.printf("  TEXT %d x=%d y=%d w=%d h=%d font=%s corpo=%d espLin=%s atEsp=%d text=%s\n", i++, u(t.getPosHor()), u(t.getPosVer()), u(t.getTamHor()), u(t.getTamVer()), s(t.getFnomeWText()), u(t.getCorpoText()), t.getEspLinText(), u(t.getAtEspLinText()), clip(s(t.getTexto())));
        }
      }
      if (doc.getListaCpoSai()!=null) {
        int i=0; for (CpoSai c : doc.getListaCpoSai()) {
          System.out.printf("  SAIDA %d x=%d y=%d w=%d h=%d font=%s corpo=%d expr=%s\n", i++, u(c.getPosHorCposai()), u(c.getPosVerCposai()), u(c.getTamHorCposai()), u(c.getTamVerCposai()), s(c.getFnomeWCposai()), u(c.getCorpoCposai()), clip(s(c.getExprCposai())));
        }
      }
      if (doc.getListaLogo()!=null) {
        int i=0; for (Logo l : doc.getListaLogo()) {
          System.out.printf("  LOGO %d x=%d y=%d w=%d h=%d dpi=%d\n", i++, u(l.getPosHor()), u(l.getPosVer()), u(l.getTamHor()), u(l.getTamVer()), l.getDpiImg());
        }
      }
      if (doc.getListaFio()!=null) {
        int i=0; for (Fio f : doc.getListaFio()) {
          System.out.printf("  FIO %d tipo=%s x=%d y=%d w=%d h=%d esp=%d cor=%d\n", i++, f.getTipo(), u(f.getPosHor()), u(f.getPosVer()), u(f.getTamHor()), u(f.getTamVer()), u(f.getEspessura()), f.getColorFio());
        }
      }
    }
  }
}
