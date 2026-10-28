const fs=require('fs');const root='format-manager/src/main/java/co/sirius/format/pontof/';
function edit(file,fn){const p=root+file,s=fs.readFileSync(p,'latin1'),v=fn(s);if(s===v)throw Error('No change '+file);fs.writeFileSync(p,v,'latin1');}
edit('controller/ler/Leitura.java',s=>s.replace('protected RandomAccessFile raf;','protected RandomAccessFile raf;\r\n\tprotected int fileNameLength = 256;'));
edit('controller/gravar/Gravar.java',s=>s.replace('protected RandomAccessFile raf;','protected RandomAccessFile raf;\r\n\tprotected int fileNameLength = 256;'));
edit('model/PontoF.java',s=>s.replace('private static final long serialVersionUID = 1L;',`private static final long serialVersionUID = 1L;
    // Serialization profile belongs to this file, never to a process-wide constant.
    private int serializedFileNameLength = 256;
    public int getSerializedFileNameLength() { return serializedFileNameLength == 128 ? 128 : 256; }
    public void setSerializedFileNameLength(int length) {
        if (length != 128 && length != 256) throw new IllegalArgumentException("Invalid filename width");
        serializedFileNameLength = length;
    }`));
for(const cls of ['Funcoes','Msg','Overlay']){
 edit('controller/ler/'+cls+'Ler.java',s=>s.replace('getString(MAXLENFILENAME)','getString(fileNameLength)').replace('public '+cls+'Ler(RandomAccessFile raf) {',`public ${cls}Ler(RandomAccessFile raf, int length) { this(raf); this.fileNameLength = length; }
    public ${cls}Ler(RandomAccessFile raf) {`));
 edit('controller/gravar/'+cls+'Gravar.java',s=>s.replace('public '+cls+'Gravar(RandomAccessFile raf) {',`public ${cls}Gravar(RandomAccessFile raf, int length) { this(raf); this.fileNameLength = length; }
    public ${cls}Gravar(RandomAccessFile raf) {`).replace('setByteArray(cs.getObjFun());','setByteArray(cs.getObjFun(), fileNameLength);').replace('setByteArray(msg.getTxtArq());','setByteArray(msg.getTxtArq(), fileNameLength);').replace('setByteArray(ovl.getArquivo(), MAXLENFILENAME);','setByteArray(ovl.getArquivo(), fileNameLength);'));
}
edit('controller/ler/PontoFLer.java',s=>s.replace('pontoF.setVersao(getString(3));',`pontoF.setVersao(getString(3));
            fileNameLength = detectFileNameLength(pontoF.getVersao());
            pontoF.setSerializedFileNameLength(fileNameLength);`).replaceAll('getString(MAXLENFILENAME)','getString(fileNameLength)').replace('new FuncoesLer(raf)','new FuncoesLer(raf, fileNameLength)').replace('new MsgLer(raf)','new MsgLer(raf, fileNameLength)').replace('new OverlayLer(raf)','new OverlayLer(raf, fileNameLength)').replace('\tprivate void carregarDocumentosLegados',`
    private int detectFileNameLength(byte[] version) throws IOException {
        String tag = new String(version, java.nio.charset.StandardCharsets.US_ASCII);
        int preferred = "831".equals(tag) ? 128 : 256;
        int alternative = preferred == 128 ? 256 : 128;
        if (plausibleGeometry(preferred)) return preferred;
        if (plausibleGeometry(alternative)) return alternative;
        return preferred;
    }

    private boolean plausibleGeometry(int length) throws IOException {
        long position = raf.getFilePointer();
        long dimensions = 3L + length + 4;
        try {
            if (raf.length() < dimensions + 25) return false;
            int formW = Short.toUnsignedInt(getShortAt(dimensions));
            int formH = Short.toUnsignedInt(getShortAt(dimensions + 2));
            int docW = Short.toUnsignedInt(getShortAt(dimensions + 6));
            int docH = Short.toUnsignedInt(getShortAt(dimensions + 8));
            int horizontal = Short.toUnsignedInt(getShortAt(dimensions + 21));
            int vertical = Short.toUnsignedInt(getShortAt(dimensions + 23));
            return formW > 0 && formH > 0 && docW > 0 && docH > 0
                && horizontal > 0 && horizontal <= 60 && vertical > 0 && vertical <= 60;
        } finally { raf.seek(position); }
    }

\tprivate void carregarDocumentosLegados`));
edit('controller/gravar/PontoFGravar.java',s=>s.replace('this.pontoF = pontoF;','this.pontoF = pontoF;\r\n        this.fileNameLength = pontoF.getSerializedFileNameLength();').replaceAll(', MAXLENFILENAME)',', fileNameLength)').replace('new FuncoesGravar(raf)','new FuncoesGravar(raf, fileNameLength)').replace('new MsgGravar(raf)','new MsgGravar(raf, fileNameLength)').replace('new OverlayGravar(raf)','new OverlayGravar(raf, fileNameLength)'));
