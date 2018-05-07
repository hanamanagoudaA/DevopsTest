File format is: GetOrderStatus_[rxNumber]_[index].xml

The index keeps track of all of the potential orders on the account. 
* When the dataAccess method is called for the first time with "returnNextOrder" set to false or empty string, the index of "0" is used. 
* When the dataAccess method is called with "returnNextOrder" set to "true".

Example contents:
<com.nuance.catamaran.dataaccess.objects.OrderStatus>
  <numberOfOrders>2</numberOfOrders>
  <isFirstOrder>true</isFirstOrder>
  <isMoreOrders>true</isMoreOrders>
  <memberFirstName>Donna</memberFirstName>
  <drugNames>
    <string>Lipitor</string>
    <string>Ibuprofen</string>
    <string>Prozac</string>
  </drugNames>
  <drugStrengthAmounts>
    <string>100</string>
    <string>200</string>
    <string>1</string>
  </drugStrengthAmounts>
  <drugStrengthUnits>
    <string>milligrams</string>
    <string>milligrams</string>
    <string>grams</string>
  </drugStrengthUnits>
  <zipCode>01880</zipCode>
  <numberOfPrescriptions>3</numberOfPrescriptions>
  <orderStatus>shipped</orderStatus>
  <carrierName>USPS</carrierName>
  <shipMethod></shipMethod>
  <shipDate>0815</shipDate>
  <trackingNumber>1Z4F37F10341045225</trackingNumber>
  <receivedDate></receivedDate>
</com.nuance.catamaran.dataaccess.objects.OrderStatus>
Refer to DID for description of fields: http://10.1.42.35/catamaran/wiki/index.php/Data_Interface_Design

The following java application in the catamaran-ivr source tree can be used to generate stub data: com.nuance.catamaran.stubgen.StubGenerator
You may need to change the currently hardcoded paths within this application to match your system. The current hardcoded path is:
 * C:/Projects/2009_AF/Catamaran/3-Implementation/Source/catamaran-ivr/src/mockdata/
Once you generate the stub data, you'll want to copy the src/mockdata folder to WebContent/WEB-INF/classes