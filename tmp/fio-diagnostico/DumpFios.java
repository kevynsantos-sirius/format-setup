import java.io.File;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import co.sirius.format.pontof.model.*;

public class DumpFios {
  public static void main(String[] args) throws Exception {
    PontoF p = new PontoFLer(new File(args[0])).execute();
    System.out.printf("form=%d x %d doc=%d x %d orient=%d\n", Short.toUnsignedInt(p.getTamHorForm()), Short.toUnsignedInt(p.getTamVerForm()), Short.toUnsignedInt(p.getTamDocHor()), Short.toUnsignedInt(p.getTamDocVer()), p.getOrientForm());
    int d=0;
    for (Documento doc : p.getDocumentos()) {
      String name = new String(doc.getNomeDoc()).trim();
      System.out.printf("DOC %d %s fios=%d\n", d++, name, doc.getListaFio() == null ? 0 : doc.getListaFio().size());
      if (doc.getListaFio() == null) continue;
      int i=0;
      for (Fio f : doc.getListaFio()) {
        System.out.printf("  %d tipo=%s x=%d y=%d w=%d h=%d esp=%d cor=%d\n", i++, f.getTipo(), Short.toUnsignedInt(f.getPosHor()), Short.toUnsignedInt(f.getPosVer()), Short.toUnsignedInt(f.getTamHor()), Short.toUnsignedInt(f.getTamVer()), Short.toUnsignedInt(f.getEspessura()), f.getColorFio());
      }
    }
  }
}
