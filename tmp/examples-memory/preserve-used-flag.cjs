const fs=require('fs'),assert=require('assert/strict');
const root='format-manager/src/main/java/co/sirius/format/pontof/';
function replace(file,before,after){const p=root+file,s=fs.readFileSync(p,'latin1');assert(s.includes(before),p);fs.writeFileSync(p,s.replace(before,after),'latin1');}
for(const type of ['CpoSai','TextField','Fio']){
 const p=root+'model/'+type+'.java',s=fs.readFileSync(p,'latin1'),marker='private static final long serialVersionUID = 1L;';if(s.includes('getSerializedUsedFlag()'))continue;assert(s.includes(marker));
 const code=`

    // Legacy files can contain noncanonical bytes in this two-byte flag.
    // Keep them on unchanged objects; explicit boolean edits use canonical bytes.
    private byte[] serializedUsedFlag;
    public byte[] getSerializedUsedFlag() {
        if (serializedUsedFlag != null && serializedUsedFlag.length == 2
                && (serializedUsedFlag[0] == 1) == isFlagUsado()) return serializedUsedFlag.clone();
        return new byte[] {(byte) (isFlagUsado() ? 1 : 0), 0};
    }
    public void setSerializedUsedFlag(byte[] bytes) {
        if (bytes == null || bytes.length != 2) throw new IllegalArgumentException("Used flag requires two bytes");
        serializedUsedFlag = bytes.clone();
        setFlagUsado(bytes[0] == 1);
    }
`;
 fs.writeFileSync(p,s.replace(marker,marker+code.replace(/\n/g,'\r\n')),'latin1');
 const variable=type==='CpoSai'?'cs':type==='Fio'?'fio':'tf';
 replace('controller/ler/'+type+'Ler.java',variable+'.setFlagUsado(getBoolean());',variable+'.setSerializedUsedFlag(getString(TAM_BOOLEAN));');
 const writerVar=type==='CpoSai'?'cpoSai':type==='Fio'?'fio':'tf';
 replace('controller/gravar/'+type+'Gravar.java','setBoolean('+writerVar+'.isFlagUsado());','setByteArray('+writerVar+'.getSerializedUsedFlag(), 2);');
}
console.log('Preserved two-byte used flags for output and text fields without changing logical boolean behavior.');
