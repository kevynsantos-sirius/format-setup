const {execFileSync}=require('child_process');
const sql="INSERT INTO users(email,nome,password_hash,role,created_at) SELECT 'format-api-client@format.local','Validacao Docker de importacao','disabled-oauth-only-test-account','USER',CURRENT_TIMESTAMP WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='format-api-client@format.local'); SELECT role FROM users WHERE email='format-api-client@format.local';\n";
const result=execFileSync('docker',['exec','-i','format-mysql','sh','-c','MYSQL_PWD="$MYSQL_PASSWORD" exec mysql -u "$MYSQL_USER" "$MYSQL_DATABASE" --batch --skip-column-names'],{input:sql,encoding:'utf8'}).trim();
if(result!=='USER')throw Error('Papel inesperado da conta técnica; revisar antes dos testes.');
console.log('Conta técnica OAuth mapeada com papel USER para projetos de teste próprios.');
