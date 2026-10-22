const fs=require('node:fs');
const base='http://127.0.0.1:8082',headers={authorization:'Bearer '+process.env.FORMAT_API_BEARER_TOKEN};
(async()=>{
 const [mode,label='original']=process.argv.slice(2),stateFile=__dirname+'/'+label+'-job.json';
 if(mode==='start'){
  const zip=fs.readFileSync(__dirname+'/'+label+'-layout.zip'),data=fs.readFileSync(__dirname+'/../novo-teste-import/APPREM_A1P1_0001');const form=new FormData();form.append('layoutZip',new Blob([zip]),label+'-layout.zip');form.append('dataFile',new Blob([data]),'APPREM_A1P1_0001.dat');
  const response=await fetch(base+'/formatar',{method:'POST',headers,body:form});const state=await response.json();if(!response.ok)throw Error(JSON.stringify(state));fs.writeFileSync(stateFile,JSON.stringify(state,null,2));console.log(JSON.stringify(state));return;
 }
 const state=JSON.parse(fs.readFileSync(stateFile));const response=await fetch(base+'/processes?size=100',{headers});const list=await response.json();const job=list.content?.find(p=>p.processId===state.processId);if(!job)throw Error(JSON.stringify(list));fs.writeFileSync(stateFile,JSON.stringify({...state,process:job},null,2));console.log(JSON.stringify(job));
 if(job.status==='COMPLETED'||job.status==='SUCCESS'){
  const response=await fetch(base+'/process/'+state.processId+'/pdfs?size=100',{headers});const result=await response.json();fs.writeFileSync(__dirname+'/'+label+'-pdfs.json',JSON.stringify(result,null,2));
  for(const [i,pdf] of result.content.entries()){const content=await fetch(base+'/download/'+pdf.id,{headers});if(!content.ok)throw Error('PDF download '+content.status);fs.writeFileSync(__dirname+'/'+label+'-'+i+'.pdf',Buffer.from(await content.arrayBuffer()));}console.log(JSON.stringify({pdfs:result.content.length}));
 }
})().catch(e=>{console.error(e);process.exitCode=1;});
