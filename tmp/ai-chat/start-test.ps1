$ErrorActionPreference='Stop'
$root='C:/workspace/format-local/format'
$pidFile="$root/tmp/ai-chat/server.pid"
if(Test-Path $pidFile){$testPid=[int](Get-Content $pidFile);$proc=Get-CimInstance Win32_Process -Filter "ProcessId=$testPid";if($proc -and $proc.CommandLine -like '*runtime.jar*--server.port=8091*'){Stop-Process -Id $testPid}}
$env:SPRING_WEB_CORS_ALLOWED_ORIGINS='http://127.0.0.1:5174,http://localhost:5174'
$h2=(Get-ChildItem C:/Users/Kevyn/.m2/repository/com/h2database/h2 -Filter '*.jar' -Recurse | Select-Object -First 1).FullName
$argsList=@('-Xms96m','-Xmx384m','-cp',('runtime.jar;'+$h2),'org.springframework.boot.loader.launch.JarLauncher','--server.port=8091','--spring.datasource.url=jdbc:h2:mem:ai_chat_validation;DB_CLOSE_DELAY=-1','--spring.datasource.driver-class-name=org.h2.Driver','--spring.datasource.username=sa','--spring.datasource.password=','--spring.jpa.database-platform=org.hibernate.dialect.H2Dialect','--spring.jpa.hibernate.ddl-auto=create','--spring.jpa.defer-datasource-initialization=true','--spring.sql.init.mode=always',"--spring.sql.init.data-locations=file:$root/tmp/ai-chat/seed.sql","--format.storage.root=$root/tmp/ai-chat/projects",'--format.storage.type=filesystem',"--format.user-functions.default-dll-path=$root/Sirius32.dll",'--format.frontend.base-url=http://localhost:5174')
$run=Start-Process -FilePath 'C:/Program Files/Java/jdk-21/bin/java.exe' -ArgumentList $argsList -WorkingDirectory "$root/tmp/ai-chat" -WindowStyle Hidden -PassThru -RedirectStandardOutput "$root/tmp/ai-chat/h2-server.log" -RedirectStandardError "$root/tmp/ai-chat/h2-server.err.log"
$run.Id | Set-Content $pidFile
Write-Output ('Isolated H2 backend PID '+$run.Id)
