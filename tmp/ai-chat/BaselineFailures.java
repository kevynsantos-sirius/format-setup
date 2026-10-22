public class BaselineFailures {
    public static void main(String[] args) throws Exception {
        Class<?> c=Class.forName("com.totaldocs.format.web.dto.ComponenteDtoTest");
        var constructor=c.getDeclaredConstructor();constructor.setAccessible(true);
        int failures=0;
        for(String name:new String[]{"testCampoBarCodeMetadadosLegado","testCampoLogoRoundTrip","testCampoQRCodeMetadadosLegado","testCampoSaidaPreservaMascaraValida","testCampoSaidaRoundTrip","testCampoTextoRoundTrip"}){
            var method=c.getDeclaredMethod(name);method.setAccessible(true);
            try{method.invoke(constructor.newInstance());System.out.println(name+": PASS");}
            catch(java.lang.reflect.InvocationTargetException e){if(!(e.getCause() instanceof AssertionError))throw e;failures++;System.out.println(name+": BASELINE_ASSERTION_FAILURE");}
        }
        if(failures!=6)throw new IllegalStateException("Unexpected baseline count: "+failures);
        System.out.println("Confirmed 6 failures with original HEAD CampoTexto class");
    }
}
