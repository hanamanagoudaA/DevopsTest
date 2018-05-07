File format is: PrescriptionInfo_[rxNumber].xml

Example contents:
<com.nuance.catamaran.dataaccess.objects.PrescriptionInfo>
  <canRxBeRefilled>true</canRxBeRefilled>
  <cannotRefillReason></cannotRefillReason>
  <nextRefillDate></nextRefillDate>
  <drugName>Lipitor</drugName>
  <zipCode>01880</zipCode>
  <floorLimit>100</floorLimit>
  <creditOnAccount>20</creditOnAccount>
  <isPreferredCardOnAccount>true</isPreferredCardOnAccount>
  <isPreferredCardExpired>true</isPreferredCardExpired>
  <preferredCreditCardType>Visa</preferredCreditCardType>
  <preferredCreditCardLast4>5339</preferredCreditCardLast4>
  <numberOfAdditionalCardsOnFile>2</numberOfAdditionalCardsOnFile>
  <isAdditionalCardsExpired>
    <string>false</string>
    <string>true</string>
  </isAdditionalCardsExpired>
  <additionalCardsType>
    <string>MasterCard</string>
    <string>AMEX</string>
  </additionalCardsType>
  <additionalCardsLast4>
    <string>4030</string>
    <string>6314</string>
  </additionalCardsLast4>
</com.nuance.catamaran.dataaccess.objects.PrescriptionInfo>

Refer to DID for description of fields: http://10.1.42.35/catamaran/wiki/index.php/Data_Interface_Design

The following java application in the catamaran-ivr source tree can be used to generate stub data: com.nuance.catamaran.stubgen.StubGenerator
You may need to change the currently hardcoded paths within this application to match your system. The current hardcoded path is:
 * C:/Projects/2009_AF/Catamaran/3-Implementation/Source/catamaran-ivr/src/mockdata/
Once you generate the stub data, you'll want to copy the src/mockdata folder to WebContent/WEB-INF/classes