const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const {FormatTools}=require('C:/workspace/format/format-agent/api/format-tools');
const source='tmp/boleto-barcode-investigation/Boleto Instituidos.f';
const fileHash=()=>crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex');
(async()=>{
 const before=fileHash();const tokenBody=await fetch('http://localhost:8090/oauth2/token',{method:'POST',headers:{authorization:'Basic '+Buffer.from('format-api-client:'+process.env.TEST_CLIENT_SECRET).toString('base64'),'content-type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials&scope=format.read%20format.process%20format.admin'}).then(r=>r.json());assert(tokenBody.access_token);
 const tools=new FormatTools({webBaseUrl:process.env.TEST_WEB_URL||'http://localhost:8081',apiBaseUrl:'http://localhost:8082',timeoutMs:180000},{webToken:tokenBody.access_token,apiToken:tokenBody.access_token});
 await tools.prepareCsrf();
 const l=JSON.parse(fs.readFileSync('tmp/boleto-memory/layout.json'));const doc=structuredClone(l.listaDocumentos.find(x=>x.name==='OABPrevSP'));
 const originalExpressions=doc.layout.filter(x=>x.type==='campoSaida'&&String(x.expressao).includes('4898147'));
 assert.equal(originalExpressions.length,2);const vertical=doc.layout.find(x=>x.type==='barcode');assert(vertical);doc.layout=[...originalExpressions,vertical];doc.documentExpression='1';doc.numberingExpression='2';
 const layout={listaDocumentos:[doc],camposEntrada:[],userVariables:[],dataFileConfig:{recordSize:1,recordFormat:'fixed',useHeader:false}};
 const report={sourceHash:before,scope:'Original expressions from OABPrevSP, copied in-memory; synthetic two-master data and two repetitions; real Web API and Sirius32 API',pages:[]};
 fs.mkdirSync('output/boleto-numbering-validation',{recursive:true});
 for(let index=0;index<4;index++){
  const form=new FormData();form.append('layout',JSON.stringify({...layout,pageIndex:index}));form.append('dataFile',new Blob(['AB']),'synthetic.dat');
  const response=await tools.request('web','/api/layout-preview',{method:'POST',body:form});const d=response.data;assert.equal(d.pageIndex,index);
  const expected='4898147'+String(Math.floor(index/2)+1).padStart(5,'0');
  const barcode=d.page.layout.find(x=>x.previewBarcodeContent);const text=d.page.layout.find(x=>!x.previewBarcodeContent);
  const actual=typeof text.content==='string'?text.content:JSON.stringify(text.content);assert.equal(actual,expected);assert.equal(barcode.previewBarcodeContent,expected);
  const nativeBarcode=d.page.layout.find(x=>x.type==='barcode');assert.equal(nativeBarcode.content,'147'+String(Math.floor(index/2)+1).padStart(5,'0'));
  report.pages.push({page:index+1,pageNum:d.fields._PageNum,expected,text:actual,barcodePayload:barcode.previewBarcodeContent,barcodeType:barcode.previewBarcodeType,verticalBarcodePayload:nativeBarcode.content,passed:true});
  fs.writeFileSync('output/boleto-numbering-validation/resultado.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report.pages.at(-1)));
 }
 assert.equal(fileHash(),before);report.originalUnchanged=true;report.status='passed';fs.writeFileSync('output/boleto-numbering-validation/resultado.json',JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});

