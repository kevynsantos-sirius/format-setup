const fs=require('fs');const file='.env',text=fs.readFileSync(file,'utf8');
const prior=text.match(/^NGINX_WEB_UPSTREAM=(.*)$/m)?.[1]?.trim()||null;
fs.writeFileSync('tmp/docker-jars-update/previous-routing.json',JSON.stringify({NGINX_WEB_UPSTREAM:prior},null,2));
const next=/^NGINX_WEB_UPSTREAM=.*$/m.test(text)?text.replace(/^NGINX_WEB_UPSTREAM=.*$/m,'NGINX_WEB_UPSTREAM=http://web:8081'):text+'\nNGINX_WEB_UPSTREAM=http://web:8081\n';
fs.writeFileSync(file,next);console.log('Nginx configurado para o serviço web:8081 da rede Docker.');
