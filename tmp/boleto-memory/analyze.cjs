const fs=require('fs'),crypto=require('crypto'),assert=require('assert/strict');
const JSZip=require('../../frontend/node_modules/jszip');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
(async()=>{
 const zipBytes=fs.readFileSync('C:/Users/Kevyn/Downloads/Boleto_Instituidos (2).zip');
 const zip=await JSZip.loadAsync(zipBytes),base='tmp/boleto-barcode-investigation/';
 const entries=[];for(const e of Object.values(zip.files).filter(e=>!e.dir)){
  const b=await e.async('nodebuffer');assert(!e.name.includes('..')&&!e.name.includes('/'));
  assert.equal(hash(b),hash(fs.readFileSync(base+e.name)),'Existing copy differs from attachment: '+e.name);
  entries.push({name:e.name,bytes:b.length,sha256:hash(b)});
 }
 const l=JSON.parse(fs.readFileSync('tmp/boleto-memory/layout.json'));
 const documents=l.listaDocumentos.map((d,index)=>({index,name:d.name,size:d.documentSize,condition:d.documentExpression,counts:d.layout.reduce((a,x)=>(a[x.type]=(a[x.type]||0)+1,a),{}),barcodes:d.layout.filter(x=>x.type==='barcode').map(x=>({expression:x.content,numChar:x.numChar,orientation:x.orientation,tipoMPS:x.tipoMPS,barcodeType:x.barcodeType}))}));
 const totals={};for(const d of documents)for(const [k,v]of Object.entries(d.counts))totals[k]=(totals[k]||0)+v;
 const data=entries.find(x=>x.name.endsWith('.tmp'));assert.equal(data.bytes%l.dataFileConfig.recordSize,0);
 const recordBytes=fs.readFileSync(base+data.name),references=new Set();
 for(let i=0;i<recordBytes.length;i+=l.dataFileConfig.recordSize)for(const [name,ext]of [['LogoBanco',''],['LogoInst','.jpg'],['LogoProd','.jpg'],['PreImpressoV','.gif']]){
  const field=l.camposEntrada.find(x=>x.nome===name);assert(field);const value=recordBytes.subarray(i+field.posicao-1,i+field.posicao-1+field.tamanho).toString('latin1').trim();if(value)references.add(value+ext);
 }
 const names=new Set(entries.map(x=>x.name.toLowerCase()));
 const resourceStatus=name=>({name,present:names.has(name.toLowerCase()),extensionCandidate:!name.includes('.')&&names.has((name+'.bmp').toLowerCase())?name+'.bmp':null});
 const report={attachmentSha256:hash(zipBytes),nativeFileSha256:entries.find(x=>x.name.endsWith('.f')).sha256,attachmentMatchesPreviouslyExtractedCopy:true,entries,documents,totals,inputFields:l.camposEntrada.length,detailWindows:l.camposDetalhe.length,data:{recordFormat:l.dataFileConfig.recordFormat,recordSize:l.dataFileConfig.recordSize,bytes:data.bytes,records:data.bytes/l.dataFileConfig.recordSize},resourceReferences:[...references].map(name=>({name,present:names.has(name.toLowerCase())})),functionDeclarations:l.userFunctionConfig.functions,pdfIncluded:entries.some(x=>/\.pdf$/i.test(x.name)),limitations:['Structural reading only; no preview/PDF or financial correctness validation','DLL declarations do not prove exported functions were executed','Resource reference evaluation covers supplied fixed-width records only']};
 report.resourceReferences=[...references].map(resourceStatus);
 assert.equal(report.documents.length,8);assert.equal(report.inputFields,186);assert.equal(report.totals.barcode,8);
 fs.mkdirSync('output/boleto-memory-validation',{recursive:true});fs.writeFileSync('output/boleto-memory-validation/estrutura.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({documents:documents.map(d=>({name:d.name,counts:d.counts})),totals,inputFields:report.inputFields,data:report.data,resourceReferences:report.resourceReferences,nativeFileSha256:report.nativeFileSha256}));
})().catch(e=>{console.error(e);process.exitCode=1});
