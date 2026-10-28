const {execFileSync}=require('child_process');
const sql="SELECT COUNT(*) FROM users WHERE email='format-api-client@format.local';\n";
const result=execFileSync('docker',['exec','-i','format-mysql','sh','-c','MYSQL_PWD="$MYSQL_PASSWORD" exec mysql -u "$MYSQL_USER" "$MYSQL_DATABASE" --batch --skip-column-names'],{input:sql,encoding:'utf8'}).trim();
console.log('Conta técnica já cadastrada no MySQL: '+(result==='1'?'sim':'não'));
