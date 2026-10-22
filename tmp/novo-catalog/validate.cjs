const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const {expr,safeObject,contentStructure}=require('./build-catalog.cjs');
const raw=JSON.parse(fs.readFileSync('tmp/novo-catalog/private-inspection.json'));
const dir='docs/novoteste-catalogo',files=fs.readdirSync(dir),all=files.map(f=>fs.readFileSync(dir+'/'+f,'utf8')).join('\n');
function jsonBlocks(file){return [...fs.readFileSync(dir+'/'+file,'utf8').matchAll(/```json\n([\s\S]*?)\n```/g)].map(x=>JSON.parse(x[1]));}
const docs=files.filter(f=>/^(?:[01]\d|2[0-5])-/.test(f)).map(f=>jsonBlocks(f)[0]);
const actual=docs.flatMap(d=>d.records),paths=new Set(actual.map(r=>r.nativePath));
assert.equal(docs.length,26);assert.equal(actual.length,raw.inventory.length);assert.equal(paths.size,3522);
for(const r of raw.inventory){const copy=actual.find(x=>x.nativePath===r.nativePath);assert(copy,r.nativePath);assert.equal(copy.pointer,r.pointer);assert.equal(copy.type,r.type);assert.equal(copy.condition,expr(r.condition,r.nativePath));if(copy.parentNativePath)assert(paths.has(copy.parentNativePath));}
const windows=jsonBlocks('28-janelas-detalhe.md');assert.equal(windows.length,146);
assert.equal(windows.reduce((n,w)=>n+w.bands.length,0),328);
for(const w of windows)for(const b of w.bands){const slot=Number(b.nativePath.match(/ListaDet\[(\d+)\]/)[1]);assert(b.kind==='cabecalho'?slot<20:b.kind==='detalhe'?slot>=20&&slot<119:b.kind==='rodape'?slot>=119&&slot<139:slot===139);}
const lin=windows.find(w=>w.document==='Frente01'&&w.window==='LIN01');assert(lin);assert.deepEqual(lin.bands.map(x=>x.name),['DET1','DetQuebra']);assert(lin.condition.includes('TipoDet'));assert.equal(lin.printCondition,'');
const schema=jsonBlocks('27-esquema-e-dependencias.md')[0];assert.equal(schema.inputFields.length,157);assert.equal(schema.detailInputFields.length,36);assert.equal(schema.variables.length,19);
const secret='CLIENTE_PRIVADO_92837465';const safe=JSON.stringify({expression:expr('IF ( CodServico = "'+secret+'" ) "cliente@example.invalid" | "11987654321"','test'),object:safeObject({fileName:'C:/clientes/'+secret+'/dados.dat',preview:secret,nome:secret+'@mail',texto:secret},'test'),text:contentStructure([{type:'text',content:secret},{type:'campoSaida',content:'"'+secret+'"',expressao:'"'+secret+'"'}],'test')});
assert(!safe.includes(secret));assert(!safe.includes('cliente@example.invalid'));assert(!safe.includes('11987654321'));assert(!safe.includes('C:/clientes'));
const literalTexts=[];function collect(v){if(!v||typeof v!=='object')return;if(v.type==='text'&&typeof v.content==='string'&&v.content.trim().length>=32)literalTexts.push(v.content.trim());for(const value of Object.values(v))if(typeof value==='object')Array.isArray(value)?value.forEach(collect):collect(value);}collect(raw.layout);
for(const text of new Set(literalTexts))assert(!all.includes(text),'Literal text leaked to catalog');
assert(!/[A-Za-z]:[\\/]/.test(all),'Absolute path in catalog');assert(!/\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i.test(all),'Email in catalog');
assert.equal(crypto.createHash('sha256').update(fs.readFileSync('tmp/novo-teste-import/ApoliceVD2_P1.f')).digest('hex'),raw.hash);
const report={status:'passed',checks:['26 documentos e 3522 caminhos nativos completos e únicos','146 janelas, 328 bandas e slots legados coerentes','LIN01/Frente01: DET1 e DetQuebra, condições distintas','157 entradas mestre, 36 entradas detalhe e 19 variáveis','Textos literais longos do layout ausentes do catálogo','Canários de dados pessoais, email, telefone e caminho absoluto removidos','Arquivo original preservado por hash'],literalTextSegmentsChecked:new Set(literalTexts).size,catalogFiles:files.length};
fs.writeFileSync('output/novoteste-catalog-validation/validacao.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
