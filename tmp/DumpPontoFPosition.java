import java.io.File;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import co.sirius.format.pontof.model.PontoF;

public class DumpPontoFPosition {
  static int u(short v) { return Short.toUnsignedInt(v); }
  public static void main(String[] args) throws Exception {
    PontoF p = new PontoFLer(new File(args[0])).execute();
    System.out.println("TamHorForm=" + u(p.getTamHorForm()));
    System.out.println("TamVerForm=" + u(p.getTamVerForm()));
    System.out.println("TamDocHor=" + u(p.getTamDocHor()));
    System.out.println("TamDocVer=" + u(p.getTamDocVer()));
    System.out.println("MarSupForm=" + u(p.getMarSupForm()));
    System.out.println("MarEsqForm=" + u(p.getMarEsqForm()));
    System.out.println("EspDocHor=" + u(p.getEspDocHor()));
    System.out.println("EspDocVer=" + u(p.getEspDocVer()));
    System.out.println("NDocGr=" + u(p.getNDocGr()));
    System.out.println("NDocHoriz=" + u(p.getNDocHoriz()));
    System.out.println("NDocVert=" + u(p.getNDocVert()));
    System.out.println("BookNext=" + p.getBookNext());
    System.out.println("NaoUsaFacSimile=" + p.getNaoUsaFacSimile());
    System.out.println("NDocForm=" + u(p.getNDocForm()));
  }
}
