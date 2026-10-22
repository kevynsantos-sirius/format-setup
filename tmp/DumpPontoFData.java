import java.io.File;
import java.nio.charset.StandardCharsets;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import co.sirius.format.pontof.model.PontoF;
public class DumpPontoFData {
  static int u(short v) { return Short.toUnsignedInt(v); }
  static String s(byte[] b) { if (b == null) return ""; String text = new String(b, StandardCharsets.ISO_8859_1); int i = text.indexOf('\0'); return (i >= 0 ? text.substring(0,i) : text).trim(); }
  public static void main(String[] args) throws Exception {
    PontoF p = new PontoFLer(new File(args[0])).execute();
    System.out.println("FileName=" + s(p.getFileName()));
    System.out.println("HeaderFita=" + p.getHeaderFita());
    System.out.println("TamHeaderFita=" + u(p.getTamHeaderFita()));
    System.out.println("TamRegFita=" + u(p.getTamRegFita()));
    System.out.println("UsaRegVar=" + p.getUsaRegVar());
    System.out.println("DelCampo=" + p.getDelCampo());
    System.out.println("DelRegistro=" + p.getDelRegistro());
    System.out.println("UsaQtdCmp=" + p.getUsaQtdCmp());
    System.out.println("QtdCamposMestre=" + u(p.getQtdCamposMestre()));
    System.out.println("CondReg=" + s(p.getCondReg()));
    System.out.println("NRepGrExpr=" + s(p.getNRepGrExpr()));
    System.out.println("NDocForm=" + u(p.getNDocForm()));
    System.out.println("NDocHoriz=" + u(p.getNDocHoriz()));
  }
}
