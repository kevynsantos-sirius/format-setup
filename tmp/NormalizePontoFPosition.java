import java.io.File;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import com.totaldocs.format.web.dto.AplicacaoPontoF;
import com.totaldocs.format.web.dto.Component;
import com.totaldocs.format.web.dto.Page;
import com.totaldocs.format.web.util.PontoFTojson;

import co.sirius.format.pontof.controller.gravar.PontoFGravar;
import co.sirius.format.pontof.controller.ler.PontoFLer;
import co.sirius.format.pontof.model.PontoF;

public class NormalizePontoFPosition {
  static int u(short v) { return Short.toUnsignedInt(v); }

  public static void main(String[] args) throws Exception {
    Path layoutPath = Path.of(args[0]);
    PontoF p = new PontoFLer(layoutPath.toFile()).execute();
    System.out.println("IN TamDocHor=" + u(p.getTamDocHor()) + " NDocHoriz=" + u(p.getNDocHoriz()) + " NDocVert=" + u(p.getNDocVert()) + " NDocForm=" + u(p.getNDocForm()));
    PontoF n = normalize(p, layoutPath);
    File out = new File(args[1]);
    new PontoFGravar(out, n).execute();
    PontoF r = new PontoFLer(out).execute();
    System.out.println("OUT TamHorForm=" + u(r.getTamHorForm()));
    System.out.println("OUT TamVerForm=" + u(r.getTamVerForm()));
    System.out.println("OUT TamDocHor=" + u(r.getTamDocHor()));
    System.out.println("OUT TamDocVer=" + u(r.getTamDocVer()));
    System.out.println("OUT NDocGr=" + u(r.getNDocGr()));
    System.out.println("OUT NDocHoriz=" + u(r.getNDocHoriz()));
    System.out.println("OUT NDocVert=" + u(r.getNDocVert()));
    System.out.println("OUT BookNext=" + r.getBookNext());
    System.out.println("OUT NDocForm=" + u(r.getNDocForm()));
    System.out.println("OUT docs.size=" + (r.getDocumentos() == null ? -1 : r.getDocumentos().size()));
  }

  static PontoF normalize(PontoF pontoF, Path layoutPath) throws Exception {
    int horizontal = Math.max(1, Short.toUnsignedInt(pontoF.getNDocHoriz()));
    AplicacaoPontoF app = PontoFTojson.convertFromPontoF(pontoF, layoutPath.toString());
    List<Page> pages = app.getListaDocumentos();
    System.out.println("DTO pages=" + pages.size() + " horizontal=" + horizontal);
    Page template = pages.get(0);
    Page sheet = physical(template);
    for (int slot = 0; slot < pages.size(); slot++) {
      Page page = pages.get(slot);
      double[] offset = offset(template, slot, horizontal);
      System.out.println("slot=" + slot + " layout=" + (page.getLayout()==null?-1:page.getLayout().size()) + " offset=" + offset[0] + "," + offset[1]);
      if (page.getLayout() == null) continue;
      for (Component component : page.getLayout()) {
        component.setX(component.getX() + offset[0]);
        component.setY(component.getY() + offset[1]);
        sheet.getLayout().add(component);
      }
    }
    PontoF normalized = PontoFTojson.convertToPontoF(List.of(sheet), layoutPath.toFile(), app.getDataFileConfig(), app.getCamposEntrada(), app.getUserFunctionConfig(), app.getUserVariables(), app.getOverlayConfig(), app.getConditionalFonts());
    normalized.setTamDocHor(normalized.getTamHorForm());
    normalized.setTamDocVer(normalized.getTamVerForm());
    normalized.setNDocGr((short)1);
    normalized.setNDocHoriz((short)1);
    normalized.setNDocVert((short)1);
    normalized.setBookNext((byte)0);
    return normalized;
  }

  static Page physical(Page template) {
    Page sheet = new Page();
    sheet.setName(template.getName());
    sheet.setLayout(new ArrayList<>());
    sheet.setSize(template.getSize());
    sheet.setDocumentSize(template.getSize());
    sheet.setOrientation(template.getOrientation());
    sheet.setPaperType(template.getPaperType());
    sheet.setPrintMode(template.getPrintMode());
    sheet.setJdeName(template.getJdeName());
    sheet.setIgnorePrinterMargins(template.getIgnorePrinterMargins());
    sheet.setNumberingExpression(template.getNumberingExpression());
    sheet.setOverlayConfig(template.getOverlayConfig());
    sheet.setPathFile(template.getPathFile());
    sheet.setMarginTop(0d);
    sheet.setMarginLeft(0d);
    sheet.setSpacingHorizontal(0d);
    sheet.setSpacingVertical(0d);
    sheet.setDocumentGroupCount(1);
    sheet.setDocumentsHorizontal(1);
    sheet.setDocumentsVertical(1);
    sheet.setDocumentSequence("next-right");
    sheet.setFillPageWithFacsimile(true);
    sheet.setDocPrinc(true);
    sheet.setDocOverflow(false);
    sheet.setDocumentExpression("1");
    sheet.setOverflowExpression("");
    return sheet;
  }

  static double[] offset(Page page, int slot, int horizontal) {
    double w = page.getDocumentSize() == null ? 0 : Math.max(0, page.getDocumentSize().getWidth());
    double h = page.getDocumentSize() == null ? 0 : Math.max(0, page.getDocumentSize().getHeight());
    double left = page.getMarginLeft() == null ? 0 : page.getMarginLeft();
    double top = page.getMarginTop() == null ? 0 : page.getMarginTop();
    double sh = page.getSpacingHorizontal() == null ? 0 : page.getSpacingHorizontal();
    double sv = page.getSpacingVertical() == null ? 0 : page.getSpacingVertical();
    int safe = Math.max(1, horizontal);
    int column = slot % safe;
    int row = slot / safe;
    return new double[]{ left + column * (w + sh), top + row * (h + sv) };
  }
}
