const {spawn}=require('child_process');
(async()=>{
 let ready=false;
 for(let i=0;i<45;i++){try{const r=await fetch('http://localhost/api/app/config',{signal:AbortSignal.timeout(3000)});if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,2000));}
 if(!ready)throw Error('O format-web não ficou pronto no tempo esperado.');
 console.log('Format Web respondeu HTTP 200 através do Nginx.');
 const child=spawn(process.execPath,['tmp/docker-jars-update/test-imports.cjs'],{stdio:'inherit',windowsHide:true});
 process.exitCode=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('exit',code=>resolve(code??1));});
})().catch(e=>{console.error(e.message);process.exitCode=1;});
