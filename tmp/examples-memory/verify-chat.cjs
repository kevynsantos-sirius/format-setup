const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const out='output/chat-examples-validation',http=out+'/http/';
function diff(a,b,p='$'){if(a===b)return [];if(a&&b&&typeof a==='object'&&typeof b==='object')return [...new Set([...Object.keys(a),...Object.keys(b)])].flatMap(k=>diff(a[k],b[k],p+'/'+k));return [{path:p,before:a,after:b}];}
const read=id=>JSON.parse(fs.readFileSync(http+id+'.json')).data;
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const report={status:'passed',environment:'Chat real do Format Web em 127.0.0.1:5174, backend H2 isolado 8091, conta técnica OAuth, API do format-agent 3217 e Sirius32 real pelo format-api. Somente dados sintéticos.',cases:[]};
for(const [name,pairs,nativePath,expectedCounts]of [
 ['SaudeA3',[['0017','0044'],['0019','0050']],'$.documentos[0].listaCpoSai[4].ColorCposai',[1,0]],
 ['Etq_SEG_RE',[['0054','0065'],['0056','0067']],'$.documentos[0].listaCpoSai[0].ColorCposai',[12,1]]]){
 const native=JSON.parse(fs.readFileSync(out+'/'+name+'-diferencas-nativas.json'));
 assert.equal(native.changedFields,1);assert.deepEqual(native.differences,[nativePath]);
 const pages=[];
 for(const [index,[beforeId,afterId]]of pairs.entries()){
  const before=read(beforeId),after=read(afterId);const changes=diff(before.page,after.page);
  assert.equal(changes.length,expectedCounts[index]);
  for(const change of changes){assert(change.path.endsWith('/font/color'));assert.equal(change.after,'#0057B8');}
  if(name==='SaudeA3'&&index===0)assert.equal(changes[0].path,'$/layout/15/font/color');
  if(name==='Etq_SEG_RE'){
   assert.equal(after.page.layout.length,index===0?108:9);
   assert.deepEqual(changes.map(c=>c.path),Array.from({length:expectedCounts[index]},(_,i)=>'$/layout/'+(i*9)+'/font/color'));
   const labels=after.page.layout.filter((x,i)=>i%9===0).map(x=>x.content);assert.equal(new Set(labels).size,labels.length);
  }
  pages.push({pageIndex:index,documentIndex:after.documentIndex,components:after.page.layout.length,changes});
 }
 const original=fs.readFileSync('C:/Users/Kevyn/Downloads/'+name+'.f'),baseline=fs.readFileSync(out+'/'+name+'-antes.f'),edited=fs.readFileSync(out+'/'+name+'-editado.f');
 const catalog=JSON.parse(fs.readFileSync('tmp/examples-memory/'+name+'-private.json'));
 assert.equal(hash(original),catalog.hash);assert(original.equals(baseline));assert.equal(edited.length,original.length);
 const changedBytes=[];for(let i=0;i<original.length;i++)if(original[i]!==edited[i])changedBytes.push(i);
 assert(changedBytes.length>0&&changedBytes.length<=3,'Apenas bytes de um valor RGB podem mudar');
 report.cases.push({name,originalUnchanged:true,sha256Original:hash(original),sha256Edited:hash(edited),bytes:original.length,changedBytes,fieldsCompared:native.fieldsCompared,nativeChanges:native.differences,pages});
}
const replies=['0006','0052'].map(id=>read(id).reply??read(id).message??read(id));
assert(JSON.stringify(replies[0]).includes('PAG1'));assert(JSON.stringify(replies[1]).includes('12 etiquetas')||JSON.stringify(replies[1]).includes('12 documentos'));
report.memory={confirmedInBrowserChat:true,saudeResponse:'http/0006.json',labelsResponse:'http/0052.json',note:'As perguntas recuperaram os catálogos novos; as edições foram resolvidas contra o inventário do .f atual, por seleção e propriedade explícita.'};
report.limits=['SaudeA3 possui referências de imagens externas não fornecidas; essas referências foram preservadas, mas a fidelidade com os recursos ausentes não foi certificada.','Foram comparados os previews das duas páginas de cada exemplo. Não foi gerado PDF nesta tarefa.','A massa do SaudeA3 contém um mestre sintético sem registros de detalhe; todas as janelas, bandas e dependências foram verificadas na comparação integral do modelo nativo.'];
fs.writeFileSync(out+'/resultado.json',JSON.stringify(report,null,2)+'\n');
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
fs.writeFileSync(out+'/validacao.html','<!doctype html><html lang="pt-br"><meta charset="utf-8"><title>Chat — SaudeA3 e etiquetas</title><style>body{font:16px system-ui;background:#f3f5f7;color:#182b3b;margin:36px auto;max-width:1100px;padding:0 20px}h1{font-size:28px}section{background:white;padding:24px;margin:22px 0;border:1px solid #dbe3e8;border-radius:10px}table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:12px;border-bottom:1px solid #ddd}.ok{color:#087c52;font-weight:700}img{max-width:100%;height:auto;border:1px solid #ddd}a{color:#0057b8}code{overflow-wrap:anywhere}.blue{color:#0057b8}details{margin:15px 0}</style><h1>Teste pelo chat: SaudeA3 e Etq_SEG_RE</h1><p class="ok">Duas edições concluídas em cópias. Uma propriedade nativa alterada em cada arquivo.</p><p>'+e(report.environment)+'</p><table><tr><th>Exemplo</th><th>Pedido aplicado</th><th>Conferência do preview</th><th>Modelo nativo</th></tr><tr><td>SaudeA3</td><td>Campo BRADESCO DENTAL da frente: cor azul</td><td>Só esse campo mudou; verso idêntico</td><td>41.052 campos comparados; 1 alterado</td></tr><tr><td>Etq_SEG_RE</td><td>Campo Segurado: cor azul</td><td>12 + 1 etiquetas; só Segurado mudou em cada repetição</td><td>828 campos comparados; 1 alterado</td></tr></table><p>Os dois originais foram preservados por SHA-256. Endereços, nomes e valores do preview são sintéticos.</p>'+report.cases.map(c=>'<section><h2>'+e(c.name)+'</h2><p>Nova cor: <strong class="blue">#0057B8</strong>. '+c.changedBytes.length+' bytes alterados, exclusivamente no valor RGB. Todo o restante do arquivo é idêntico.</p><p><a href="'+c.name+'-editado.f">Baixar cópia editada .f</a> · <a href="'+c.name+'-diferencas-nativas.json">Comparação nativa</a></p><img src="'+c.name+'-preview-depois.png" alt="Preview real após edição de '+c.name+'"><details><summary>Proposta no chat antes de salvar</summary><img src="'+c.name+'-proposta.png" alt="Proposta revisada no chat"></details><details><summary>Diferenças verificadas no preview</summary><pre>'+e(JSON.stringify(c.pages,null,2))+'</pre></details></section>').join('')+'<section><h2>Memória e integridade</h2><p>Os dois chats responderam com os novos catálogos e confirmaram o estado atual do .f. A seleção foi destacada e a proposta foi revisada antes de salvar.</p><p>O teste descobriu um caso de flags legadas não canônicas no SaudeA3. O reader/writer foi corrigido para preservar esses bytes. A proteção que recusa diferenças não solicitadas continuou ativa.</p><p>Regressão: testes de preservação e etiquetas aprovados, incluindo leitura/gravação integral de SaudeA3, Etq_SEG_RE, NovoTeste, boleto e Campos Altos.</p><ul>'+report.limits.map(x=>'<li>'+e(x)+'</li>').join('')+'</ul><a href="resultado.json">Evidência completa em JSON</a></section></html>');
console.log(JSON.stringify(report.cases.map(c=>({name:c.name,changedBytes:c.changedBytes,nativeChanges:c.nativeChanges,previewChanges:c.pages.map(p=>p.changes.length)}))));
