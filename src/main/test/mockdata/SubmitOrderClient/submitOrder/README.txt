File format is: SubmitOrderResponse_[rxNumber].xml

There is no data returned with this service aside from the return code (which is outside of the response object). The presence of this a SubmitOrderResponse_[rxNumber].xml file with the contents shown in the "example contents" below will result in a success return code. If this file is missing, the result will be a failure return code.

Example contents:
  <com.nuance.catamaran.dataaccess.objects.SubmitOrderResponse/>

Refer to DID for description of fields: http://10.1.42.35/catamaran/wiki/index.php/Data_Interface_Design

The following java application in the catamaran-ivr source tree can be used to generate stub data: com.nuance.catamaran.stubgen.StubGenerator
You may need to change the currently hardcoded paths within this application to match your system. The current hardcoded path is:
 * C:/Projects/2009_AF/Catamaran/3-Implementation/Source/catamaran-ivr/src/mockdata/
Once you generate the stub data, you'll want to copy the src/mockdata folder to WebContent/WEB-INF/classes