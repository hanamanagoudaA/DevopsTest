File format is: PriorAuthStatus_[memberNumber]_[npiNumber]_[index].xml

The index keeps track of all of the potential PAs on the account. 
* When the dataAccess method is called for the first time with no navigation command, the index of "0" is used. 
* When the dataAccess method is called with the "next" navigation command, the index is incrememnted.
* When the dataAccess method is called with the "previous" navigation command, the index is decremented.

Example contents:
<com.nuance.catamaran.dataaccess.objects.PriorAuthStatus>
  <numberOfPAs>3</numberOfPAs>
  <onFirstPA>true</onFirstPA>
  <onLastPA>false</onLastPA>
  <drugName>Lipitor</drugName>
  <priorAuthorizationDate>20130504</priorAuthorizationDate>
  <status>Approved</status>
</com.nuance.catamaran.dataaccess.objects.PriorAuthStatus>

Refer to DID for description of fields: http://10.1.42.35/catamaran/wiki/index.php/Data_Interface_Design

The following java application in the catamaran-ivr source tree can be used to generate stub data: com.nuance.catamaran.stubgen.StubGenerator
You may need to change the currently hardcoded paths within this application to match your system. The current hardcoded path is:
 * C:/Projects/2009_AF/Catamaran/3-Implementation/Source/catamaran-ivr/src/mockdata/
Once you generate the stub data, you'll want to copy the src/mockdata folder to WebContent/WEB-INF/classes