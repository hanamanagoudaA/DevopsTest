File format is: GreetingByDNIS_[DNIS].xml

Example contents:
<com.nuance.catamaran.dataaccess.objects.GreetingByDNIS>
  <greetingPromptName>ca0110_out_03.wav</greetingPromptName>
  <greetingPromptVerbiage>Welcome to Catamaran</greetingPromptVerbiage>
</com.nuance.catamaran.dataaccess.objects.GreetingByDNIS>

Refer to DID for description of fields: http://10.1.42.35/catamaran/wiki/index.php/Data_Interface_Design

The following java application in the catamaran-ivr source tree can be used to generate stub data: com.nuance.catamaran.stubgen.StubGenerator
You may need to change the currently hardcoded paths within this application to match your system. The current hardcoded path is:
 * C:/Projects/2009_AF/Catamaran/3-Implementation/Source/catamaran-ivr/src/mockdata/
Once you generate the stub data, you'll want to copy the src/mockdata folder to WebContent/WEB-INF/classes