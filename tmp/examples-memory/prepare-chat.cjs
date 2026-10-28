const fs=require('fs'),assert=require('assert/strict');
const out='output/chat-examples-validation';
for(const name of ['SaudeA3','Etq_SEG_RE']){
 const s=JSON.parse(fs.readFileSync('tmp/examples-memory/'+name+'-private.json')),l=s.layout;
 const report={name,originalSha256:s.hash,inputFields:l.camposEntrada.length,documentCount:l.listaDocumentos.length};
 if(name==='SaudeA3'){
  const buf=Buffer.alloc(l.dataFileConfig.recordSize,32);
  const values={QtdDet:'0',Destinatario:'DESTINATARIO SINTETICO',EndDest:'RUA TESTE 100',BairroDest:'BAIRRO TESTE',CidadeDest:'CIDADE TESTE',UFDest:'SP',CepDest:'01000000',Remetente:'REMETENTE SINTETICO',EndRemet:'RUA REMETENTE 200',BairroRemet:'BAIRRO TESTE',CidadeRemet:'CIDADE TESTE',UFRemet:'SP',CepRemet:'01000000',TipoCob:'M',CEDO:'0',QtdCorresp:'1',Mes:'01',Chave:'0000000000000000000001',CodBarra:'00000000000000000000000000000000000000000000',CodBarra2:'00000000000000000000000000000000000000000000',CepNet:'01000000',SeqCIF:'000000001',CRLF:'\r\n'};
  for(const field of l.camposEntrada){const v=Buffer.from(values[field.nome]??'0','latin1');assert(field.posicao>=1);v.copy(buf,field.posicao-1,0,Math.min(v.length,field.tamanho));}
  fs.writeFileSync(out+'/'+name+'-sintetico.txt',buf);
  report.target={documentIndex:0,index:9,type:'text',nativePath:'$.documentos[0].listaTextField[0]',requestedProperty:'font/color',requestedValue:'#0000ff'};
 }else{
  const rows=[];for(let i=1;i<=13;i++){
   const values={Segurado:'SINTETICO '+String(i).padStart(3,'0'),Corretor:'CORRETOR SINTETICO',Endereco:'RUA TESTE 100',Bairro:'BAIRRO TESTE',Cidade:'CIDADE TESTE',UF:'SP',Cep:'01000000',CodKit:'KIT TESTE',Chave:String(i).padStart(22,'0'),SeqKit:String(i).padStart(3,'0'),NroCompKit:'13'};
   const row=Array(Math.max(...l.camposEntrada.map(x=>x.indice))+1).fill('');for(const field of l.camposEntrada)row[field.indice]=values[field.nome]??'0';rows.push(row.join('\t'));
  }fs.writeFileSync(out+'/'+name+'-sintetico.txt',rows.join('\n')+'\n','latin1');
  report.target={documentIndex:0,index:0,type:'campoSaida',nativePath:'$.documentos[0].listaCpoSai[0]',requestedProperty:'font/color',requestedValue:'#0000ff'};
 }
 fs.writeFileSync(out+'/'+name+'-plano-teste.json',JSON.stringify(report,null,2)+'\n');
}
console.log('Cópias e dados sintéticos preparados; apenas cor de um elemento por projeto será alterada.');
