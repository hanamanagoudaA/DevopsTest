<?xml version="1.0"?>
<%@ page contentType="text/xml;charset=UTF-8" %> 
<%@ taglib uri="/WEB-INF/tld/ivr-stats.tld" prefix="rtst" %>
<%@ taglib uri="/WEB-INF/tld/audio-service.tld" prefix="as" %>
<%@ taglib uri="/WEB-INF/tld/data-access-service.tld" prefix="das" %>
<%@ taglib uri="/WEB-INF/tld/ndm-addon-service.tld" prefix="dm"%>
<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ taglib uri="/WEB-INF/tld/node-log-utils.tld" prefix="node"%>
<%@ taglib uri="/WEB-INF/tld/decision-log-utils.tld" prefix="decision"%>

<util:vxml pageName="AuthMemberClaim.jsp" cacheable="true" rootRequired="true">
    <!-- This jsp represents technical group - AuthMemberClaim.
         Author 	 : Sherin
         Description : $description
         Comment     : $comment
         List of nodes/states in this jsp :
         
			 0.ac0127_CheckAuthType_DS
             1.ac0130_GetMemberIDListByZipAndDOB_DB
             2.ac0140_GetMemberIDConstrainedGmr_DM
             3.ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB
             4.ac0150_ConfirmFirstName_DM
             5.ac0160_GetMemberIDStaticGmr_DM
             6.ac0162_GetMemberIDStaticGmrOneTry_DM
             7.ac0165_GetMemberDetailsByIDafterStaticGmr_DB
             8.ac0210_DoesDOBMatch_DS
             9.ac0220_GetState_DM
             10.ac0230_DoesStateMatch_DS
             11.ac0310_GetMemberIDinRxCLAIM_DB
             12.ac0320_DoesDOBMatch_DS
             13.ac0430_GetLastNameListByZipAndDOB_DB
             14.ac0440_GetLastNameConstrainedGmr_DM
             15.ac0445_GetFirstNameListForLastName_DB
             16.ac0450_GetFirstNameConstrainedGmr_DM
             17.ac0455_GetMemberIDByName_DB
             18.ac0435_GetLastNameConstrainedGmrIRIS_DM
    
    -->
    <%

    %>

    <util:var name="returnCode" expr="''"/>
    
    <!--State start - ac0127_CheckAuthType_DS-->
    <util:form id="ac0127_CheckAuthType_DS" >
        <util:block name="ac0127_CheckAuthType_DSBlock" >
            <node:start name="ac0127_CheckAuthType_DS" />
            <decision:start stateId="ac0127_CheckAuthType_DS" />
        </util:block>
        <util:block>
        	<util:log>authStatus---><util:value expr="authStatus"/></util:log>
            <util:log>claimAuthenticationMode---><util:value expr="claimAuthenticationMode"/></util:log>
            <util:assign name="zipCode" expr="providedZip"/> 
			<util:assign name="dateOfBirth" expr="providedDOB"/> 
			<util:log>**** AuthClaim inputs ****</util:log>
			<util:log>zipCode---><util:value expr="zipCode"/></util:log>
            <util:log>dateOfBirth---><util:value expr="dateOfBirth"/></util:log>
            <util:log>lastName---><util:value expr="lastName"/></util:log>
            <util:log>firstName---><util:value expr="firstName"/></util:log>
            <util:log>********</util:log>
            <util:if cond="authenticationDBType == 'IRIS'">
            	<decision:end stateId="ac0127_CheckAuthType_DS"  label="authenticationDBType is IRIS" />
            	<util:goto next="#ac0430_GetLastNameListByZipAndDOB_DB" />
            </util:if>
            <util:if cond="selectedLanguage == 'spanish'">
            	<decision:end stateId="ac0127_CheckAuthType_DS"  label="selectedLanguage is spanish " />
            	 <util:log>selectedLanguage is spanish : Cannot proceed to Claim Auth using Name/ID- Transfer out </util:log>
            	 <util:assign name="spanishNeedRxClaimTransfer" expr="true" />
            	  <util:submit expr="getReturnLink()"/>
           <util:else />     
	            <util:if cond="authStatus == 'partial_IRIS'">
	            	<decision:end stateId="ac0127_CheckAuthType_DS"  label="authenticationDBType is partial_IRIS" />
	            	<util:goto next="#ac0435_GetLastNameConstrainedGmrIRIS_DM" />
	            <util:else />            	
		            <util:if cond="claimAuthenticationMode == AUTHENTICATION_MODE_ZIP_ID">
		                <decision:end stateId="ac0127_CheckAuthType_DS"  label="authentication type is ZIP_ID  for DNIS" />
		                <util:goto next="#ac0130_GetMemberIDListByZipAndDOB_DB" />
		            <util:else/>	
		                <decision:end stateId="ac0127_CheckAuthType_DS"  label="authentication type is not ZIP_ID for DNIS (assuming ZIP_NAME)" />
		                <util:goto next="#ac0430_GetLastNameListByZipAndDOB_DB"/>
		            </util:if>
	            </util:if>
	         </util:if>
        </util:block>
    </util:form>

    <!--State start - ac0130_GetMemberIDListByZipAndDOB_DB-->
    <util:form id="ac0130_GetMemberIDListByZipAndDOB_DB" >
        <util:block name="ac0130_GetMemberIDListByZipAndDOB_DB" >
            <util:log>Enterd</util:log>
            <node:start name="ac0130_GetMemberIDListByZipAndDOB_DB" />
        </util:block>
        <util:var name="strMemberNumbers" expr="''"/>
        <util:var name="strMemberNumbersLen" expr="''"/>
        <util:var name="i" expr="0"/>	
        <das:dataAccess id="ac0130_GetMemberIDListByZipAndDOB_DB" namelist="zipCode dateOfBirth"/>
        <util:block>
            <util:assign name="returnCode" expr="ac0130_GetMemberIDListByZipAndDOB_DB.returnCode" />
            <util:log>return code --><util:value expr="returnCode"/></util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="numberOfMemberNumbersFound" expr="ac0130_GetMemberIDListByZipAndDOB_DB.numberOfMemberNumbersFound" />
                <util:assign name="memberNumbers" expr="ac0130_GetMemberIDListByZipAndDOB_DB.memberNumbers" />
                <util:if cond="numberOfMemberNumbersFound &gt; 0">
                    <util:script>
                        strMemberNumbersLen = memberNumbers.length;
                        if(strMemberNumbersLen > 0)
                        {
                            for(var i=0; strMemberNumbersLen > i; i++)
                            {
                                strMemberNumbers =  memberNumbers[i] + "_" + strMemberNumbers;
                            }
                            strMemberNumbers = strMemberNumbers.substring(0,strMemberNumbers.length - 1);
                        }
                    </util:script>
                    <util:assign name="memberNumbers" expr="strMemberNumbers"/>
                    <util:goto next="#ac0140_GetMemberIDConstrainedGmr_DM" />
                    <util:else />
                    <util:goto next="#ac0160_GetMemberIDStaticGmr_DM" />
                </util:if>
                <util:else/>
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" />
            </util:if>
        </util:block>
    </util:form>	

    <!--State start - ac0140_GetMemberIDConstrainedGmr_DM-->
    <util:form id="ac0140_GetMemberIDConstrainedGmr_DM" >
        <util:var name="collection_grammar1" expr="''" />
        <util:var name="collection_dtmfgrammar1" expr="''" />
        <util:log>memberNumbers--> <util:value expr="memberNumbers" /> </util:log>
        <util:log>authStatus--> <util:value expr="authStatus" /> </util:log>
        <util:log>callerType--> <util:value expr="callerType" /> </util:log>
        <util:block name="ac0140_GetMemberIDConstrainedGmr_DMBlock">
            <node:start name="ac0140_GetMemberIDConstrainedGmr_DM" />
            <util:assign name="lastDM" expr="'AuthMemberClaim.dvxml#ac0140_GetMemberIDConstrainedGmr_DM'"/>
        </util:block>
        <script>
            collection_grammar1 = "ac0140_GetMemberIDConstrainedGmr_DM.jsp?memberIDs=" + memberNumbers + "&amp;";
            collection_dtmfgrammar1 = "ac0140_GetMemberIDConstrainedGmr_DM_dtmf.jsp?memberIDs=" + memberNumbers + "&amp;";
        </script>
        <dm:ndm id="ac0140_GetMemberIDConstrainedGmr_DM" namelist="collection_grammar1 collection_dtmfgrammar1" audionamelist="callerType">
            <dm:success>
                <dm:default>
                    <util:assign name="memberNumber"  expr="ac0140_GetMemberIDConstrainedGmr_DM.returnvalue" />
                    <util:log>memberNumber--> <util:value expr="memberNumber" /> </util:log>
                    <util:assign name="authStatus"  expr="'auth_3_pieces'" />
                    <util:log>authStatus--> <util:value expr="authStatus" /> </util:log>
                    <util:assign name="agentRequestTreatment"  expr="'transfer_upon_request'" />
                    <util:log>agentRequestTreatment--> <util:value expr="agentRequestTreatment" /> </util:log>
                    <util:goto next="#ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB"/>					
                </dm:default>
            </dm:success>
            <dm:command>
                <dm:recoOption value="dont_know">
                    <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" />
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
        <util:catch event="event.nuance.dialog.ndm.maxnomatches"  count="1" >
            <as:audio id="ac0140_out_01" playState="true" />
            <util:goto next="#ac0162_GetMemberIDStaticGmrOneTry_DM"/>
        </util:catch>
        <util:catch event="event.nuance.dialog.ndm.maxnoinputs"  count="1" >
            <as:audio id="failure_prompt" playState="true" />
            <util:throw event="event.nuance.logic.transfer" message="'max_errors'" />
        </util:catch>
    </util:form>	

    <!--State start - ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB-->
    <util:form id="ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB" >
        <util:block name="ac0145_GetMemberDetailsByIDafterConstrainedGmr_DBBlock" >
            <node:start name="ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB" />
        </util:block>
        <das:dataAccess id="ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB" namelist="memberNumber"/>
        <util:block>
            <util:assign name="returnCode" expr="ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB.returnCode" />
            <util:log>return code --> <util:value expr="returnCode" /> </util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="memberNumberFound" expr="ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB.memberNumberFound" />
                <util:assign name="backendDateOfBirth" expr="ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB.dateOfBirth" />
                <util:assign name="backendZipCode" expr="ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB.zipCode" />
                <util:assign name="firstName" expr="ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB.firstName" />
                <util:assign name="state" expr="ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB.state" />
                <util:log>memberNumberFound --> <util:value expr="memberNumberFound" /> </util:log>
                <util:log>backendDateOfBirth --> <util:value expr="backendDateOfBirth" /> </util:log>
                <util:log>backendZipCode --> <util:value expr="backendZipCode" /> </util:log>
                <util:log>firstName --> <util:value expr="firstName" /> </util:log>
                <util:log>state --> <util:value expr="state" /> </util:log>
                <util:if cond="memberNumberFound == 'true'">
                	<util:if cond="authenticationDBType == 'IRIS'">
                		<util:assign name="authenticationDBType" expr="'IRIS_and_RxClaim'" />
                		<util:submit expr="getReturnLink()"/>
                	 <util:else />	
	                    <util:if cond="collectedFirstName == 'false'">
	                    	<util:goto next="#ac0150_ConfirmFirstName_DM" />
						<util:else />
	                        <util:assign name="authenticationDBType" expr="'RxCLAIM'" />
	                        <util:submit expr="getReturnLink()"/>
	                    </util:if>
	                 </util:if>
               <util:else />
                    <util:assign name="authStatus" expr="'failed'" />
                    <util:submit expr="getReturnLink()"/>
                </util:if>
            <util:elseif cond="returnCode == '2'" />
                <util:log> Exit form:[business_logic_transfer] </util:log>
                <util:throw event="event.nuance.logic.transfer" message="'process_error'"/>
            <util:else/>
                <util:log> Exit form:[system_error] </util:log>
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" />
            </util:if>
        </util:block>
    </util:form>	

    <!--State start - ac0150_ConfirmFirstName_DM-->
    <util:form id="ac0150_ConfirmFirstName_DM" >
        <util:block name="ac0150_ConfirmFirstName_DMBlock" >
            <rtst:cfp name="ac0150_dm"/>
            <node:start name="ac0150_ConfirmFirstName_DM" />
            <util:assign name="lastDM" expr="'AuthMemberClaim.dvxml#ac0150_ConfirmFirstName_DM'"/>
        </util:block>
        <script>
            firstName = firstName.replace("'", "");
        </script>
        <dm:ndm id="ac0150_ConfirmFirstName_DM" audionamelist="firstName callerType">
            <dm:success>
                <dm:recoOption value="true">    
                	<util:assign name="authenticationDBType" expr="'RxCLAIM'"/>                 
                	<util:submit expr="getReturnLink()"/>
                </dm:recoOption>
                <dm:recoOption value="false">
                	<util:assign name="authStatus" expr="'failed'"/>
                    <util:submit expr="getReturnLink()"/>
                </dm:recoOption>
            </dm:success>
        </dm:ndm>
    </util:form>	

    <!--State start - ac0160_GetMemberIDStaticGmr_DM-->
    <util:form id="ac0160_GetMemberIDStaticGmr_DM" >
        <util:block name="ac0160_GetMemberIDStaticGmr_DMBlock" >
            <rtst:cfp name="ac0160_dm"/>
            <node:start name="ac0160_GetMemberIDStaticGmr_DM" />
            <util:assign name="lastDM" expr="'AuthMemberClaim.dvxml#ac0160_GetMemberIDStaticGmr_DM'"/>
        </util:block>
        <dm:ndm id="ac0160_GetMemberIDStaticGmr_DM" audionamelist="callerType">
            <dm:success>
                <dm:default>
                    <util:assign name="memberNumber" expr="ac0160_GetMemberIDStaticGmr_DM.returnvalue" />
                    <util:log>memberNumber---><util:value expr="memberNumber"/></util:log>
                    <util:goto next="#ac0165_GetMemberDetailsByIDafterStaticGmr_DB"/>
                </dm:default>
            </dm:success>
            <dm:command>
                <dm:recoOption value="dont_know">
                    <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" />
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>	

    <!--State start - ac0162_GetMemberIDStaticGmrOneTry_DM-->
    <util:form id="ac0162_GetMemberIDStaticGmrOneTry_DM" >
        <util:block name="ac0162_GetMemberIDStaticGmrOneTry_DMBlock" >
            <rtst:cfp name="ac0162_dm"/>
            <node:start name="ac0162_GetMemberIDStaticGmrOneTry_DM" />
            <util:assign name="lastDM" expr="'AuthMemberClaim.dvxml#ac0162_GetMemberIDStaticGmrOneTry_DM'"/>
        </util:block>
        <dm:ndm id="ac0162_GetMemberIDStaticGmrOneTry_DM" audionamelist="callerType">
            <dm:success>
                <dm:default>
                    <util:assign name="memberNumber"  expr="ac0162_GetMemberIDStaticGmrOneTry_DM.returnvalue" />
                    <util:goto next="#ac0165_GetMemberDetailsByIDafterStaticGmr_DB"/>
                </dm:default>
            </dm:success>
            <dm:command>
                <dm:recoOption value="dont_know">
                    <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" />
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
        <util:catch event="event.nuance.dialog.ndm.maxnoinputs" count="1">
            <as:audio id="ac0162_GetMemberIDStaticGmrOneTry_DM_noinput_1" playState="true" />
            <util:throw event="event.nuance.logic.transfer" message="'max_errors'" />
        </util:catch>
        <util:catch event="event.nuance.dialog.ndm.maxnomatches"  count="1" >
            <as:audio id="ac0162_GetMemberIDStaticGmrOneTry_DM_nomatch_1" playState="true" />
            <util:throw event="event.nuance.logic.transfer" message="'max_errors'" />
        </util:catch>
    </util:form>		

    <!--State start - ac0165_GetMemberDetailsByIDafterStaticGmr_DB-->
    <util:form id="ac0165_GetMemberDetailsByIDafterStaticGmr_DB" >
        <util:block name="ac0165_GetMemberDetailsByIDafterStaticGmr_DBBlock" >
            <rtst:cfp name="ac0165_db"/>
            <node:start name="ac0165_GetMemberDetailsByIDafterStaticGmr_DB" />
        </util:block>
        <das:dataAccess id="ac0165_GetMemberDetailsByIDafterStaticGmr_DB" namelist="memberNumber"/>
        <util:block>
            <util:assign name="returnCode" expr="ac0165_GetMemberDetailsByIDafterStaticGmr_DB.returnCode" />
            <util:log>return code --> <util:value expr="returnCode" /> </util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="memberNumberFound" expr="ac0165_GetMemberDetailsByIDafterStaticGmr_DB.memberNumberFound" />
                <util:assign name="backendDateOfBirth" expr="ac0165_GetMemberDetailsByIDafterStaticGmr_DB.dateOfBirth" />
                <util:assign name="backendZipCode" expr="ac0165_GetMemberDetailsByIDafterStaticGmr_DB.zipCode" />
                <util:assign name="firstName" expr="ac0165_GetMemberDetailsByIDafterStaticGmr_DB.firstName" />
                <util:assign name="state" expr="ac0165_GetMemberDetailsByIDafterStaticGmr_DB.state" />
                <util:log>memberNumberFound --> <util:value expr="memberNumberFound" /> </util:log>
                <util:log>backendDateOfBirth --> <util:value expr="backendDateOfBirth" /> </util:log>
                <util:log>backendZipCode --> <util:value expr="backendZipCode" /> </util:log>
                <util:log>firstName --> <util:value expr="firstName" /> </util:log>
                <util:log>state --> <util:value expr="state" /> </util:log>
                <util:if cond="memberNumberFound == 'true'">
                    <util:goto next="#ac0210_DoesDOBMatch_DS" />
                    <util:else />
                    <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" />
                </util:if>
            <util:elseif cond="returnCode == '2'" />
                <util:throw event="event.nuance.logic.transfer" message="'process_error'"/>
            <util:else/>
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" />
            </util:if>
        </util:block>
    </util:form>	

    <!--State start - ac0210_DoesDOBMatch_DS-->
    <util:form id="ac0210_DoesDOBMatch_DS" >
        <util:block name="ac0210_DoesDOBMatch_DSBlock" >
            <rtst:cfp name="ac0210_ds"/>
            <node:start name="ac0210_DoesDOBMatch_DS" />
            <decision:start stateId="ac0210_DoesDOBMatch_DS" />
        </util:block>
        <util:block>
            <util:log>backendDateOfBirth---><util:value expr="backendDateOfBirth"/></util:log>
            <util:if cond="backendDateOfBirth == dateOfBirth">
                <decision:end stateId="ac0210_DoesDOBMatch_DS"  label="matched" />
                <util:goto next="#ac0220_GetState_DM" />
            <util:else/>	
                <util:assign name="authStatus"  expr="'failed'" />
                <decision:end stateId="ac0210_DoesDOBMatch_DS"  label="not matched" />
                <util:throw event="event.nuance.logic.transfer" message="'dob_not_matched'" />
            </util:if>
        </util:block>
    </util:form>		

    <!--State start - ac0220_GetState_DM-->
    <util:form id="ac0220_GetState_DM" >
        <util:block name="ac0220_GetState_DMBlock" >
            <rtst:cfp name="ac0220_dm"/>
            <node:start name="ac0220_GetState_DM" />
            <util:assign name="lastDM" expr="'AuthMemberClaim.dvxml#ac0220_GetState_DM'"/>
        </util:block>
        <dm:ndm id="ac0220_GetState_DM" audionamelist="callerType">
            <dm:success>
                <dm:default>
                    <util:assign name="collectedState" expr="ac0220_GetState_DM.returnvalue" />
                    <util:log>collectedState----><util:value expr="collectedState"/></util:log>
                    <util:goto next="#ac0230_DoesStateMatch_DS"/>
                </dm:default>
            </dm:success>
        </dm:ndm>
    </util:form>	

    <!--State start - ac0230_DoesStateMatch_DS-->
    <util:form id="ac0230_DoesStateMatch_DS" >
        <util:block name="ac0230_DoesStateMatch_DSBlock" >
            <rtst:cfp name="ac0230_ds"/>
            <node:start name="ac0230_DoesStateMatch_DS" />
            <decision:start stateId="ac0230_DoesStateMatch_DS" />
        </util:block>
        <util:block>
            <util:if cond="collectedState.toUpperCase() == state.toUpperCase()">
                <util:assign name="authStatus"  expr="'auth_3_pieces'" />
                <util:assign name="agentRequestTreatment"  expr="'transfer_upon_request'"/>
                <util:log>agentRequestTreatment---><util:value expr="agentRequestTreatment"/></util:log>
                <decision:end stateId="ac0230_DoesStateMatch_DS"  label="matched" />
                <util:goto next="#ac0150_ConfirmFirstName_DM" />
                <util:else />
                <decision:end stateId="ac0230_DoesStateMatch_DS"  label="not matched" />
                <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" />
            </util:if>
        </util:block>
    </util:form>

    <!--State start - ac0310_GetMemberIDinRxCLAIM_DB-->
    <util:form id="ac0310_GetMemberIDinRxCLAIM_DB" >
        <util:block name="ac0310_GetMemberIDinRxCLAIM_DBBlock" >
            <rtst:cfp name="ac0310_db"/>
            <node:start name="ac0310_GetMemberIDinRxCLAIM_DB" />
            <util:assign name="memberNumber" expr="rxClaimNumber"/>
        </util:block>
        <das:dataAccess id="ac0310_GetMemberIDinRxCLAIM_DB" namelist="memberNumber"/>
        <util:block>
            <util:assign name="returnCode" expr="ac0310_GetMemberIDinRxCLAIM_DB.returnCode" />
            <util:log>return code --> <util:value expr="returnCode" /> </util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="memberNumberFound" expr="ac0310_GetMemberIDinRxCLAIM_DB.memberNumberFound" />
                <util:assign name="backendDateOfBirth" expr="ac0310_GetMemberIDinRxCLAIM_DB.dateOfBirth" />
                <util:assign name="backendZipCode" expr="ac0310_GetMemberIDinRxCLAIM_DB.zipCode" />
                <util:assign name="firstName" expr="ac0310_GetMemberIDinRxCLAIM_DB.firstName" />
                <util:assign name="state" expr="ac0310_GetMemberIDinRxCLAIM_DB.state" />
                <util:log>memberNumberFound --> <util:value expr="memberNumberFound" /> </util:log>
                <util:log>backendDateOfBirth --> <util:value expr="backendDateOfBirth" /> </util:log>
                <util:log>backendZipCode --> <util:value expr="backendZipCode" /> </util:log>
                <util:log>firstName --> <util:value expr="firstName" /> </util:log>
                <util:log>state --> <util:value expr="state" /> </util:log>
                <util:if cond="memberNumberFound == 'true'">
                    <util:goto next="#ac0320_DoesDOBMatch_DS" />
                    <util:else/>
                    <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" />		
                </util:if>
                <util:else/>
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" />
            </util:if>
        </util:block>
    </util:form>	

    <!--State start - ac0320_DoesDOBMatch_DS-->
    <util:form id="ac0320_DoesDOBMatch_DS" >
        <util:block name="ac0320_DoesDOBMatch_DSBlock" >
            <rtst:cfp name="ac0320_ds"/>
            <node:start name="ac0320_DoesDOBMatch_DS" />
            <decision:start stateId="ac0320_DoesDOBMatch_DS" />
        </util:block>
        <util:block>
            <util:if cond="backendDateOfBirth == dateOfBirth">
                <util:if cond="authStatus == 'auth_3_peices'">
                    <util:if cond="task == 'coverage'">
                        <util:log>task--> <util:value expr="task" /></util:log>
                        <decision:end stateId="ac0320_DoesDOBMatch_DS"  label="task == coverage" />
                        <util:if cond="eligibilityFlag == 'Y'">
                            <util:submit next="Eligibility.dvxml#eg0110_EntryLogic_DS"/>
                            <util:else />
                            <util:assign name="authenticated" expr="true"/>
                            <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" />
                        </util:if>
                        <util:elseif cond="task == 'pa_status'" />
                        <util:log>task--> <util:value expr="task" /></util:log>
                        <decision:end stateId="ac0320_DoesDOBMatch_DS"  label="task == pa_status" />
                        <util:if cond="paStatusMemberFlag == 'Y'">
                            <util:submit next="PriorAuthStatus.dvxml#pa0110_EntryLogic_DS"/>
                            <util:else />
                            <util:assign name="authenticated" expr="true"/>
                            <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" />
                        </util:if>
                        <util:elseif cond="task == 'something_else'" />
                        <util:assign name="authenticated" expr="true"/>
                        <util:log>task--> <util:value expr="task" /></util:log>
                        <decision:end stateId="ac0320_DoesDOBMatch_DS"  label="task == something_else" />
                        <util:throw event="event.nuance.logic.transfer" message="'something_else'" />
                    </util:if>
                    <util:else/>
                    <util:log>authStatus---><util:value expr="authStatus"/></util:log>
                    <decision:end stateId="ac0320_DoesDOBMatch_DS"  label="authStatus != auth_3_peices" />
                    <util:goto next="#ac0120_GetZip_DM"/>
                </util:if>
                <util:else/>	
                <decision:end stateId="ac0320_DoesDOBMatch_DS"  label="not matched" />
                <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" />
            </util:if>
        </util:block>
    </util:form>

    <!--State start - ac0430_GetLastNameListByZipAndDOB_DB-->
    <util:form id="ac0430_GetLastNameListByZipAndDOB_DB" >
        <util:block name="ac0430_GetLastNameListByZipAndDOB_DBBlock" >
            <rtst:cfp name="ac0430_db"/>
            <node:start name="ac0430_GetLastNameListByZipAndDOB_DB" />
        </util:block>
        <util:var name="strLastNames" expr="''"/>
        <util:var name="strLastNamesLen" expr="''"/>
        <util:var name="i" expr="0"/>	
        <util:var name="lastNameFound" expr="false"/>	        
        <das:dataAccess id="ac0430_GetLastNameListByZipAndDOB_DB" namelist="zipCode dateOfBirth"/>
        <util:block>
            <util:assign name="returnCode" expr="ac0430_GetLastNameListByZipAndDOB_DB.returnCode" />
            <util:log>return code --><util:value expr="returnCode"/></util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="canIVRDisambiguate" expr="ac0430_GetLastNameListByZipAndDOB_DB.canIVRDisambiguate"/>
                <util:assign name="numberOfLastNamesFound" expr="ac0430_GetLastNameListByZipAndDOB_DB.numberOfLastNamesFound" />
                <util:assign name="lastNameList" expr="ac0430_GetLastNameListByZipAndDOB_DB.lastNameList" />
                <util:log>lastNameList <-- <util:value expr="lastNameList" /></util:log>
                <util:log>canIVRDisambiguate--> <util:value expr="canIVRDisambiguate" /></util:log>
                <util:log>numberOfLastNamesFound--> <util:value expr="numberOfLastNamesFound" /></util:log>
                <util:if cond="numberOfLastNamesFound &gt; 0 &amp;&amp; canIVRDisambiguate == 'true'">
                    <util:script>
                        strLastNamesLen = lastNameList.length;
                        if(strLastNamesLen > 0)
                        {
                            for(var i=0; strLastNamesLen > i; i++)
                            {     
                            	if(!(lastName == '' || lastName == undefined)){                       	
	                            	if(lastNameList[i] == lastName){
	                            		lastNameFound = true;
	                            	}
                            	}
                                strLastNames =  lastNameList[i] + "~" + strLastNames;
                            }
                            strLastNames = strLastNames.substring(0,strLastNames.length - 1);
                        }
                    </util:script>
                    <util:assign name="lastNameList" expr="strLastNames"/>
                    <util:log>lastNameList <-- <util:value expr="lastNameList" /></util:log>
                                        
                    <util:if cond="authenticationDBType != 'IRIS'">
                    	<util:goto next="#ac0440_GetLastNameConstrainedGmr_DM" />
                    <util:else />
                    	<util:if cond="lastNameFound == true">
                    		<util:goto next="#ac0445_GetFirstNameListForLastName_DB" />
                    	<util:else/>
                    		<util:assign name="authStatus"  expr="'failed'" />
                    		<util:submit expr="getReturnLink()"/>
                    	</util:if>	
                    </util:if>
                <util:else />
                    <util:assign name="authStatus"  expr="'failed'" />
                    <util:submit expr="getReturnLink()"/>
                </util:if>
                <util:else/>
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" />
            </util:if>
        </util:block>
    </util:form>	

    <!--State start - ac0435_GetLastNameConstrainedGmrIRIS_DM-->
    <util:form id="ac0435_GetLastNameConstrainedGmrIRIS_DM" >
        <util:var name="collection_grammar1" expr="''" />
        <util:var name="collection_dtmfgrammar1" expr="''" />
        <util:var name="nbest1" expr="''"/>
        <util:var name="nbest1_confidence" expr="''"/>
        <util:var name="nbest2" expr="''"/>
        <util:var name="nbest2_confidence" expr="''"/>
        <util:block name="ac0435_GetLastNameConstrainedGmrIRIS_DMBlock" >
            <rtst:cfp name="ac0435_dm"/>
            <node:start name="ac0435_GetLastNameConstrainedGmrIRIS_DM" />
            <util:assign name="lastDM" expr="'AuthMemberClaim.dvxml#ac0435_GetLastNameConstrainedGmrIRIS_DM'"/>
            <util:log>lastName --> <util:value expr="lastName" /></util:log>
        </util:block>
        <script>
            collection_grammar1 = "ac0435_GetLastNameConstrainedGmrIRIS_DM.jsp?names=" + cleanNameInput(lastName) + "&amp;";
        </script>
        <dm:ndm id="ac0435_GetLastNameConstrainedGmrIRIS_DM" namelist="collection_grammar1" audionamelist="callerType">
            <dm:success>
                <dm:default>
                    <util:assign name="providedLastName"  expr="ac0435_GetLastNameConstrainedGmrIRIS_DM.returnvalue" />                    
                    <util:assign name="nbest1" expr="ac0435_GetLastNameConstrainedGmrIRIS_DM.nbestresults[0].interpretation['MEANING']"/>
                    <util:assign name="nbest1_confidence" expr="ac0435_GetLastNameConstrainedGmrIRIS_DM.nbestresults[0].confidence"/>
                    <util:log>nbest1--> <util:value expr="nbest1" /> </util:log>
                    <util:log>nbest1_confidence--> <util:value expr="nbest1_confidence" /> </util:log>
                    <util:if cond="ac0435_GetLastNameConstrainedGmrIRIS_DM.nbestresults[1] != null">
                        <util:assign name="nbest2" expr="ac0435_GetLastNameConstrainedGmrIRIS_DM.nbestresults[1].interpretation['MEANING']"/>
                        <util:assign name="nbest2_confidence" expr="ac0435_GetLastNameConstrainedGmrIRIS_DM.nbestresults[1].confidence"/>
                        <util:log>nbest2--> <util:value expr="nbest2" /> </util:log>
                        <util:log>nbest2_confidence--> <util:value expr="nbest2_confidence" /> </util:log>
                    </util:if>
                    <util:log>providedLastName--> <util:value expr="providedLastName" /> </util:log>
                    <util:if cond="nbest2 != 'operator' &amp;&amp; nbest2_confidence &gt; 0.399">    
                        <util:log>nbest2_confidence -->  greater than 0.399</util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'nbest2_confidence_too_low'" />
                    </util:if>                                                                               
                    <util:assign name="authStatus"  expr="'auth_3_pieces'" />
                    <util:assign name="authenticationDBType"  expr="'IRIS'" />
                    <util:goto next="#ac0127_CheckAuthType_DS"/>                                      
                </dm:default>
            </dm:success>
        </dm:ndm>        
        <util:catch event="event.nuance.dialog.ndm.maxnomatches"  count="1" >
            <as:audio id="ac0435_GetLastNameConstrainedGmrIRIS_DM_noinput_1" playState="true" />
            <util:assign name="authStatus"  expr="'failed'" />
            <util:submit expr="getReturnLink()" />
        </util:catch>
        <util:catch event="event.nuance.dialog.ndm.maxnoinputs"  count="1" >
            <as:audio id="ac0435_GetLastNameConstrainedGmrIRIS_DM_noinput_1" playState="true" />
            <util:assign name="authStatus"  expr="'failed'" />
            <util:submit expr="getReturnLink()" />
        </util:catch>
    </util:form>


    <!--State start - ac0440_GetLastNameConstrainedGmr_DM-->
    <util:form id="ac0440_GetLastNameConstrainedGmr_DM" >
        <util:var name="collection_grammar1" expr="''" />
        <util:var name="collection_dtmfgrammar1" expr="''" />
        <util:var name="nbest1" expr="''"/>
        <util:var name="nbest1_confidence" expr="''"/>
        <util:var name="nbest2" expr="''"/>
        <util:var name="nbest2_confidence" expr="''"/>
        <util:block name="ac0440_GetLastNameConstrainedGmr_DMBlock" >
            <rtst:cfp name="ac0440_dm"/>
            <node:start name="ac0440_GetLastNameConstrainedGmr_DM" />
            <util:assign name="lastDM" expr="'AuthMemberClaim.dvxml#ac0440_GetLastNameConstrainedGmr_DM'"/>
            <util:log>lastNameList --> <util:value expr="lastNameList" /></util:log>
        </util:block>
        <script>
            collection_grammar1 = "ac0440_GetLastNameConstrainedGmr_DM.jsp?names=" + cleanNameInput(lastNameList) + "&amp;";
        </script>
        <dm:ndm id="ac0440_GetLastNameConstrainedGmr_DM" namelist="collection_grammar1" audionamelist="callerType">
            <dm:success>
                <dm:default>
                    <util:assign name="lastName"  expr="ac0440_GetLastNameConstrainedGmr_DM.returnvalue" />                    
                    <util:assign name="nbest1" expr="ac0440_GetLastNameConstrainedGmr_DM.nbestresults[0].interpretation['MEANING']"/>
                    <util:assign name="nbest1_confidence" expr="ac0440_GetLastNameConstrainedGmr_DM.nbestresults[0].confidence"/>
                    <util:log>nbest1--> <util:value expr="nbest1" /> </util:log>
                    <util:log>nbest1_confidence--> <util:value expr="nbest1_confidence" /> </util:log>
                    <util:if cond="ac0440_GetLastNameConstrainedGmr_DM.nbestresults[1] != null">
                        <util:assign name="nbest2" expr="ac0440_GetLastNameConstrainedGmr_DM.nbestresults[1].interpretation['MEANING']"/>
                        <util:assign name="nbest2_confidence" expr="ac0440_GetLastNameConstrainedGmr_DM.nbestresults[1].confidence"/>
                        <util:log>nbest2--> <util:value expr="nbest2" /> </util:log>
                        <util:log>nbest2_confidence--> <util:value expr="nbest2_confidence" /> </util:log>
                    </util:if>
                    <util:log>lastName--> <util:value expr="lastName" /> </util:log>
                    <util:if cond="nbest2 != 'operator' &amp;&amp; nbest2_confidence &gt; 0.399">    
                        <util:log>nbest2_confidence -->  greater than 0.399</util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'nbest2_confidence_too_low'" />
                    </util:if>                                       

                    <util:goto next="#ac0445_GetFirstNameListForLastName_DB"/>

                </dm:default>
            </dm:success>
        </dm:ndm>
    </util:form>	

    <!--State start - ac0445_GetFirstNameListForLastName_DB-->
    <util:form id="ac0445_GetFirstNameListForLastName_DB" >
        <util:block name="ac0445_GetFirstNameListForLastName_DBBlock" >
            <rtst:cfp name="ac0445_db"/>
            <node:start name="ac0445_GetFirstNameListForLastName_DB" />
        </util:block>
        <util:var name="strFirstNames" expr="''"/>
        <util:var name="strFirstNamesLen" expr="''"/>
        <util:var name="i" expr="0"/>	
        <util:var name="firstNameFound" expr="false"/>        
        <das:dataAccess id="ac0445_GetFirstNameListForLastName_DB" namelist="lastName"/>
        <util:block>
            <util:assign name="returnCode" expr="ac0445_GetFirstNameListForLastName_DB.returnCode" />
            <util:log>return code --><util:value expr="returnCode"/></util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="canIVRDisambiguate" expr="ac0445_GetFirstNameListForLastName_DB.canIVRDisambiguate"/>
                <util:assign name="numberOfFirstNamesFound" expr="ac0445_GetFirstNameListForLastName_DB.numberOfFirstNamesFound" />
                <util:assign name="firstNameList" expr="ac0445_GetFirstNameListForLastName_DB.firstNameList" />
                <util:log>canIVRDisambiguate--> <util:value expr="canIVRDisambiguate" /></util:log>
                <util:log>numberOfFirstNamesFound--> <util:value expr="numberOfFirstNamesFound" /></util:log>
                <util:log>firstNameList--> <util:value expr="firstNameList" /></util:log>
                <util:if cond="canIVRDisambiguate == 'true'">
                    <util:if cond="authenticationDBType != 'IRIS'">
	                    <util:if cond="numberOfFirstNamesFound &gt; 1 ">
	                        <util:script>
	                            strFirstNamesLen = firstNameList.length;
	                            if(strFirstNamesLen > 0)
	                            {
	                                for(var i=0; strFirstNamesLen > i; i++)
	                                {
	                                    strFirstNames =  firstNameList[i] + "~" + strFirstNames;
	                                }
	                                strFirstNames = strFirstNames.substring(0,strFirstNames.length - 1);
	                            }
	                        </util:script>
	                        <util:assign name="firstNameList" expr="strFirstNames"/>	                        
	                    	<util:goto next="#ac0450_GetFirstNameConstrainedGmr_DM" />	                    	
	                    <util:else />	
	                        <util:assign name="firstName" expr="firstNameList[0]"/>
	                        <util:log>firstName--> <util:value expr="firstName" /> </util:log>
	                        <util:goto next="#ac0455_GetMemberIDByName_DB" />
	                    </util:if>
	                <util:else/>
	                	    <util:script>
	                            strFirstNamesLen = firstNameList.length;
	                            if(strFirstNamesLen > 0)
	                            {
	                                for(var i=0; strFirstNamesLen > i; i++)
	                                {
	                                    if(!(firstName == '' || firstName == undefined)){                       	
	                            			if(firstNameList[i] == firstName){
	                            				firstNameFound = true;
	                            			}
                            			}
	                                }
	                            }
	                        </util:script>
                    		<util:if cond="firstNameFound == true">
                    			<util:goto next="#ac0455_GetMemberIDByName_DB" />
                    		<util:else/>
                    			<util:assign name="authStatus"  expr="'failed'" />
                    			<util:submit expr="getReturnLink()"/>
                    		</util:if>		                        
	                </util:if>    
                <util:else />
                    <util:assign name="authStatus"  expr="'failed'" />
                    <util:submit expr="getReturnLink()" />
                </util:if>
                <util:else/>
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" />
            </util:if>
        </util:block>
    </util:form>	

    <!--State start - ac0450_GetFirstNameConstrainedGmr_DM-->
    <util:form id="ac0450_GetFirstNameConstrainedGmr_DM" >
        <util:var name="collection_grammar1" expr="''" />
        <util:var name="collection_dtmfgrammar1" expr="''" />
        <util:var name="nbest1" expr="''"/>
        <util:var name="nbest1_confidence" expr="''"/>
        <util:var name="nbest2" expr="''"/>
        <util:var name="nbest2_confidence" expr="''"/>
        <util:log>firstNameList--> <util:value expr="firstNameList" /> </util:log>
        <util:block name="ac0450_GetFirstNameConstrainedGmr_DMBlock" >
            <rtst:cfp name="ac0450_dm"/>
            <node:start name="ac0450_GetFirstNameConstrainedGmr_DM" />
            <util:assign name="lastDM" expr="'AuthMemberClaim.dvxml#ac0450_GetFirstNameConstrainedGmr_DM'"/>
        </util:block>
        <script>
            collection_grammar1 = "ac0450_GetFirstNameConstrainedGmr_DM.jsp?names=" + cleanNameInput(firstNameList) + "&amp;";
        </script>
        <dm:ndm id="ac0450_GetFirstNameConstrainedGmr_DM" namelist="collection_grammar1" audionamelist="callerType">
            <dm:success>
                <dm:default>
                    <util:assign name="firstName"  expr="ac0450_GetFirstNameConstrainedGmr_DM.returnvalue" />
                    <util:assign name="nbest1" expr="ac0450_GetFirstNameConstrainedGmr_DM.nbestresults[0].interpretation['MEANING']"/>
                    <util:assign name="nbest1_confidence" expr="ac0450_GetFirstNameConstrainedGmr_DM.nbestresults[0].confidence"/>
                    <util:log>nbest1--> <util:value expr="nbest1" /> </util:log>
                    <util:log>nbest1_confidence--> <util:value expr="nbest1_confidence" /> </util:log>
                    <util:if cond="ac0450_GetFirstNameConstrainedGmr_DM.nbestresults[1] != null">
                        <util:assign name="nbest2" expr="ac0450_GetFirstNameConstrainedGmr_DM.nbestresults[1].interpretation['MEANING']"/>
                        <util:assign name="nbest2_confidence" expr="ac0450_GetFirstNameConstrainedGmr_DM.nbestresults[1].confidence"/>
                        <util:log>nbest2--> <util:value expr="nbest2" /> </util:log>
                        <util:log>nbest2_confidence--> <util:value expr="nbest2_confidence" /> </util:log>
                    </util:if>
                    <util:log>firstName--> <util:value expr="firstName" /> </util:log>
                    <util:assign name="collectedFirstName" expr="'true'"/>
                    <util:if cond="nbest2 != 'operator' &amp;&amp; nbest2_confidence &gt; 0.299">    
                        <util:throw event="event.nuance.logic.transfer" message="'nbest2_confidence_to_low'" />
                    </util:if>
                    <util:goto next="#ac0455_GetMemberIDByName_DB"/>
                </dm:default>
            </dm:success>
        </dm:ndm>
    </util:form>

    <!--State start - ac0455_GetMemberIDByName_DB-->
    <util:form id="ac0455_GetMemberIDByName_DB" >
        <util:block name="ac0455_GetMemberIDByName_DBBlock" >
            <rtst:cfp name="ac0455_db"/>
            <node:start name="ac0455_GetMemberIDByName_DB" />
        </util:block>
        <das:dataAccess id="ac0455_GetMemberIDByName_DB" namelist="lastName firstName"/>
        <util:block>
            <util:assign name="returnCode" expr="ac0455_GetMemberIDByName_DB.returnCode" />
            <util:log>return code --><util:value expr="returnCode"/></util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="isAmbiguous" expr="ac0455_GetMemberIDByName_DB.isAmbiguous"/>
                <util:assign name="memberNumber" expr="ac0455_GetMemberIDByName_DB.memberNumber" />
                <util:log>isAmbiguous--> <util:value expr="isAmbiguous" /></util:log>
                <util:log>memberNumber--> <util:value expr="memberNumber" /></util:log>
                
                <util:if cond="(memberNumber != null) &amp;&amp; (memberNumber != '') &amp;&amp; (memberNumber != undefined) ">
	                <util:if cond="isAmbiguous == 'false'">
	                    <util:assign name="authStatus" expr="'auth_3_peices'" />
	                    <util:if cond="authenticationDBType == 'IRIS'">
	                    	<util:assign name="authenticationDBType"  expr="'IRIS_and_RxCLAIM'" /> 
	                    <util:else />
	                    	<util:assign name="authenticationDBType"  expr="'RxCLAIM'" />	
	                    </util:if>
	                	<util:assign name="agentRequestTreatment"  expr="'transfer_upon_request'" />
	                	<util:goto next="#ac0145_GetMemberDetailsByIDafterConstrainedGmr_DB" />
	                <util:else />
	                    <util:assign name="authStatus"  expr="'failed'" />
	                    <util:submit expr="getReturnLink()"/>
	                </util:if>
                <util:else />
                	<util:assign name="authStatus"  expr="'failed'" />
	                <util:submit expr="getReturnLink()"/>
                </util:if>                
                <util:else/>
               	<util:throw event="event.nuance.logic.transfer" message="'system_error'" />
            </util:if>
        </util:block>
    </util:form>

</util:vxml>