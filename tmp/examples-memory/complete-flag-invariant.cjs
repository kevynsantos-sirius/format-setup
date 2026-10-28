const fs=require('fs'),assert=require('assert/strict');
for(const type of ['CpoSai','TextField','Fio']){
 const file='format-manager/src/main/java/co/sirius/format/pontof/model/'+type+'.java';let s=fs.readFileSync(file,'latin1');
 assert(s.includes('private byte[] serializedUsedFlag;'));
 s=s.replace('private byte[] serializedUsedFlag;','private byte[] serializedUsedFlag = new byte[2];');
 s=s.replace('setFlagUsado(bytes[0] == 1);','FlagUsado = bytes[0] == 1;');
 const marker='public void setFlagUsado(boolean flagUsado) {';assert(s.includes(marker));
 s=s.replace(marker,marker+'\r\n        if (FlagUsado != flagUsado) serializedUsedFlag = new byte[] {(byte) (flagUsado ? 1 : 0), 0};');
 fs.writeFileSync(file,s,'latin1');
}
