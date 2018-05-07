<%@page import="com.nuance.catamaran.dataaccess.constants.CallFlowVariable"%>
<%@page import="com.nuance.catamaran.dataaccess.data.DNISProfile"%>
<?xml version="1.0"?>
<%@ page contentType="text/xml;charset=UTF-8" %> 
<%@ taglib uri="/WEB-INF/tld/ivr-stats.tld" prefix="rtst" %>
<%@ taglib uri="/WEB-INF/tld/audio-service.tld" prefix="as" %>
<%@ taglib uri="/WEB-INF/tld/data-access-service.tld" prefix="das" %>
<%@ taglib uri="/WEB-INF/tld/ndm-addon-service.tld" prefix="dm"%>
<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ taglib uri="/WEB-INF/tld/node-log-utils.tld" prefix="node"%>
<%@ taglib uri="/WEB-INF/tld/decision-log-utils.tld" prefix="decision"%>


<util:vxml pageName="AuthMail.jsp" cacheable="true" rootRequired="true">
    <!-- This jsp represents technical group - AuthMail.
         Author      : A.Ravichandran
         Description : $description
         Comment     : $comment
         List of nodes/states in this jsp :
         
        1.	am0110_EntryLogic_DS
        2.	am0120_GetRx_DM
        3.	am0123_HoldOnRx_DM
        4.	am0125_DoesDOBMatch_DS
        5.	am0127_GetMemberListByANI_DB
        6.	am0130_GetDOB_DM
        7.	am0134_GetLastNameConstrainedGmr_DM
        8.	am0136_GetFirstNameConstrainedGmr_DM
        9.	am0140_GetMemberDetailsByRxNumber_DB
        10.	am0142_GetMemberDetailsByLastNameAndDOB_DB
        11.	am0144_GetMemberRxNumberByPatientNumber_DB
        12.	am0150_EvaluateRxAndDOBResult_DS
        13.	am0155_AuthFailedMax_PP
        14.	am0160_IsZipNeeded_DS
        15.	am0220_AuthFailedOnce_PP
        16.	am0225_ConfirmRxYN_DM
        17.	am0230_GetCorrectRx_DM
        18.	am0235_ConfirmDOBYN_DM
        19.	am0240_GetCorrectDOB_DM
        20.	am0245_RxOrDOBChanged_DS
        21.	am0310_GetZip_DM
        22.	am0320_ValidateZip_DS
        23.	am0330_ConfirmZip_DM
        24.	am0332_CheckToAskToSaveANI_DS
        25.	am0334_AskToSaveANI_DM
        26.	am0336_SaveANI_DB
        27.	am0340_SubmitSelectedZip_DB

    -->

    <util:var name="rxFound" expr="false"/>
    <util:var name="returnCode" expr="''"/>
    <util:var name="firstName" expr="''"/>
    <util:var name="lastName" expr="''"/>
    <util:var name="am0120PreviousResult" expr="''"/>
    <util:var name="saidDontKnowOrHoldOnRx" expr="''"/>
    <util:var name="shippingZipCode" expr="''"/>
    <util:var name="individualZipCode" expr="''"/>
    <util:var name="primaryZipCode" expr="''"/>
    <util:var name="dependentZipCode" expr="''"/>
    <util:var name="numberOfMembersFound" expr="0" />
    <util:var name="saveANIStatus" expr="''"/>
    <util:var name="saveANIStatusMessage" expr="''"/>
    <util:var name="resultCode" expr="''"/>
    <util:var name="resultCodeDescription" expr="''"/>
    <util:var name="callLocatorService" expr="''"/>

    <util:log>Task ---> <util:value expr="task" /> </util:log>

    <!--State Start - am0110_EntryLogic_DS-->
    <util:form id="am0110_EntryLogic_DS" >
        <util:block name="am0110_EntryLogic_DSBlock" >
            <node:start name="am0110_EntryLogic_DS" />
            <decision:start stateId="am0110_EntryLogic_DS" />
        </util:block>
        <util:block>
            <util:assign name="rxAndDobAttempts"  expr="0" />
            <util:assign name="zipAttempts"  expr="0" />
            <util:assign name="collectedZipCode" expr="''"/>
            <util:assign name="rxOrDobChanged" expr="false"/>
            <util:assign name="zipConfirmed" expr="false"/>
            <util:assign name="am0120PreviousResult" expr="''" />
            <util:if cond="task == 'another_order' || task == 'get_rx_again'">
                <util:assign name="authStatus" expr="''" />
                <util:assign name="tempRxNumber" expr="''" />             <!--Release 2.2 - 6.2.2 - RxNumbers_in_Order - clear temp rx number after order is submitted.-->
            </util:if>
            <util:log>authenticated --> <util:value expr="authenticated"/></util:log>
            <util:log>usedAniAuth --> <util:value expr="usedAniAuth"/></util:log>
            <util:log>authStatus --> <util:value expr="authStatus"/></util:log>
            <util:if cond="authStatus == 'auth_3_pieces'">
                <util:log>rxNumber --> <util:value expr="rxNumber"/></util:log>
                <util:if cond="rxNumber != undefined">
                    <util:log>task --> 'refill'</util:log>
                    <util:if cond="task == 'refill'">
                        <decision:end stateId="am0110_EntryLogic_DS"  label="Already authenticated" />
                        <util:log>mailOrderRefillFlag --> <util:value expr="mailOrderRefillFlag"/></util:log>
                        <util:if cond="mailOrderNewFlag == 'Y'">
                            <util:log> Exit form:[normal] </util:log>
                            <util:submit next="OrderStatus_01_PlayStatus_1.dvxml#os0110_GetOrderStatus_DB"/>
                        <util:else />
                            <util:log> Exit form:[normal] </util:log>
                            <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" /> 
                        </util:if>
                    <util:else />
                        <decision:end stateId="am0110_EntryLogic_DS"  label="Already authenticated" />
                        <util:log>-- mailOrderStatusFlag --> <util:value expr="mailOrderStatusFlag"/></util:log>
                        <util:if cond="mailOrderStatusFlag == 'Y'">
                            <util:log> Exit form:[normal] </util:log>
                            <util:submit next="OrderStatus_01_PlayStatus_1.dvxml#os0110_GetOrderStatus_DB"/>
                        <util:else />
                            <util:log> Exit form:[normal] </util:log>
                            <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" /> 
                        </util:if>
                    </util:if>
                <util:else/>
                    <decision:end stateId="am0110_EntryLogic_DS"  label="Just need Rx Number" />
                    <util:log>authenticated <-- <util:value expr="authenticated"/></util:log>
                    <util:log> Exit form:[normal] </util:log>
                    <util:goto next="#am0120_GetRx_DM" />
                </util:if>
            <util:elseif cond="authStatus == 'auth_2_pieces'"/>
                <util:log>task --> <util:value expr="task"/></util:log>
                <util:if cond="task == 'order_status'">
                    <decision:end stateId="am0110_EntryLogic_DS"  label="Already authenticated" />
                    <util:log>mailOrderStatusFlag --> <util:value expr="mailOrderStatusFlag"/></util:log>
                    <util:if cond="mailOrderStatusFlag == 'Y'">
                        <util:log> Exit form:[normal] </util:log>
                        <util:submit next="OrderStatus_01_PlayStatus_1.dvxml#os0110_GetOrderStatus_DB" />
                    <util:else />
                        <util:log> Exit form:[normal] </util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" /> 
                    </util:if>
                    <util:else/>
                    <decision:end stateId="am0110_EntryLogic_DS"  label="Just need zip code" />
                    <util:log> Exit form:[normal] </util:log>
                    <util:goto next="#am0310_GetZip_DM" />
                </util:if>
            <util:else/>
                <decision:end stateId="am0110_EntryLogic_DS"  label="Normal first entry OR any Refill request OR authenticated in RxCLAIM only" />
                <util:log> Exit form:[normal] </util:log>
                <util:goto next="#am0120_GetRx_DM" />
            </util:if>
        </util:block>
    </util:form>

    <!--State start - am0120_GetRx_DM-->
    <util:form id="am0120_GetRx_DM" >
        <util:block name="am0120_GetRx_DMBlock" >
            <node:start name="am0120_GetRx_DM" />
            <util:assign name="lastDM" expr="'AuthMail.dvxml#am0120_GetRx_DM'"/>
        </util:block>
        <dm:ndm id="am0120_GetRx_DM" audionamelist="callerType task am0120PreviousResult">
            <dm:success>
                <util:log>saidDontKnowOrHoldOnRx --> <util:value expr="saidDontKnowOrHoldOnRx"/></util:log>
                <util:log>am0120PreviousResult --> <util:value expr="am0120PreviousResult"/></util:log>
                <util:log>am0120_GetRx_DM_return_value --> <util:value expr="am0120_GetRx_DM.returnvalue" /> </util:log>
                <dm:default>
                    <util:assign name="rxNumber"  expr="am0120_GetRx_DM.returnvalue" />
                    <util:log>rxNumber <-- <util:value expr="rxNumber" /> </util:log>
                    <util:log>authStatus --> <util:value expr="authStatus"/></util:log>
                    <util:if cond="authStatus != undefined">
                        <util:log> Exit form:[normal] </util:log>
                        <util:goto next="#am0140_GetMemberDetailsByRxNumber_DB"/>
                    <util:else />
                        <util:log> Exit form:[normal] </util:log>
                        <util:goto next="#am0130_GetDOB_DM"/>
                    </util:if>
                </dm:default>
            </dm:success>
            <dm:command>
                <dm:recoOption value="dont_know">
                    <util:log>COMMAND --> dont_know </util:log>
                    <util:log>saidDontKnowOrHoldOnRx --> <util:value expr="saidDontKnowOrHoldOnRx"/></util:log>
                    <util:if cond="saidDontKnowOrHoldOnRx == 'true'">
                        <util:goto next="#am0155_AuthFailedMax_PP"/>
                    <util:else />
                        <util:assign name="saidDontKnowOrHoldOnRx" expr="'true'" />
                        <util:assign name="am0120PreviousResult" expr="'dont_know'" />
                        <util:log>saidDontKnowOrHoldOnRx <-- <util:value expr="saidDontKnowOrHoldOnRx"/></util:log>
                        <util:log>am0120PreviousResult <-- <util:value expr="am0120PreviousResult"/></util:log>
                        <util:log> Exit form:[normal] </util:log>
                        <util:goto next="#am0120_GetRx_DM" />
                    </util:if>
                </dm:recoOption>
                <dm:recoOption value="hold_on">
                    <util:log>COMMAND --> hold_on </util:log>
                    <util:assign name="saidDontKnowOrHoldOnRx" expr="'true'" />
                    <util:assign name="am0120PreviousResult" expr="'hold_on'" />
                    <util:log>saidDontKnowOrHoldOnRx <-- <util:value expr="saidDontKnowOrHoldOnRx"/></util:log>
                    <util:log>am0120PreviousResult <-- <util:value expr="am0120PreviousResult"/></util:log>
                    <util:log> Exit form:[normal] </util:log>
                    <util:goto next="#am0123_HoldOnRx_DM" />
                </dm:recoOption>	
                <dm:recoOption value="operator" >
                    <util:log>COMMAND --> operator </util:log>
                    <util:log> Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.operator"/>
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>

    <!--State start - am0123_HoldOnRx_DM-->
    <util:form id="am0123_HoldOnRx_DM" >
        <util:block name="am0123_HoldOnRx_DMBlock" >
            <node:start name="am0123_HoldOnRx_DM" />
            <util:assign name="lastDM" expr="'AuthMail.dvxml#am0123_HoldOnRx_DM'"/>
        </util:block>
        <util:catch event="event.nuance.dialog.ndm.maxnoinputs">
            <util:log> Exit form:[hold_max] </util:log>
            <util:throw event="event.goodbye" message="''"/>
        </util:catch>
        <dm:ndm id="am0123_HoldOnRx_DM">
            <util:log>am0123_HoldOnRx_DM --> <util:value expr="am0123_HoldOnRx_DM.returnvalue" /></util:log>
            <util:log>am0123_HoldOnRx_DM --> <util:value expr="am0123_HoldOnRx_DM.returncode" /></util:log>
            <dm:success>
                <dm:default>
                    <util:log> Exit form:[hold_max] </util:log>
                    <util:goto next="#am0120_GetRx_DM"/>
                </dm:default>
            </dm:success>
        </dm:ndm>
    </util:form>	

    <!--State start - am0125_DoesDOBMatch_DS-->
    <util:form id="am0125_DoesDOBMatch_DS" >
        <util:block name="am0125_DoesDOBMatch_DSBlock" >
            <node:start name="am0125_DoesDOBMatch_DS" />
            <decision:start stateId="am0125_DoesDOBMatch_DS" />
        </util:block>
        <util:block>
            <util:if cond="rxFound == 'true'">
                <util:if cond="task == 'refill'||task == 'another_order'||task == 'get_rx_again'">
                    <decision:end stateId="am0125_DoesDOBMatch_DS" label="DOB in RxCLAIM Matched Rx #" />
                    <util:if cond="mailOrderNewFlag == 'Y'">
                        <util:log> Exit form:[normal] </util:log>                        
                        <util:submit next="OrderStatus_01_PlayStatus_1.dvxml#os0110_GetOrderStatus_DB" />
                    <util:else />
                        <util:log> Exit form:[normal] </util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" /> 
                    </util:if>
                <util:else/>
                    <decision:end stateId="am0125_DoesDOBMatch_DS" label="DOB in RxCLAIM does not match Rx #" />
                    <util:if cond="mailOrderStatusFlag == 'Y'">
                        <util:log> Exit form:[normal] </util:log>                        
                        <util:submit next="OrderStatus_01_PlayStatus_1.dvxml#os0110_GetOrderStatus_DB"/>
                    <util:else />
                        <util:log> Exit form:[normal] </util:log>                        
                        <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" /> 
                    </util:if>
                </util:if>	
            <util:else/>
                <decision:end stateId="am0125_DoesDOBMatch_DS" label="rxFound != true" />
                <util:assign name="authStatus" expr="''" />
                <util:log>authStatus <-- <util:value expr="authStatus"/></util:log>
                <util:log> Exit form:[normal] </util:log>                        
                <util:goto next="#am0130_GetDOB_DM"/>
            </util:if>
        </util:block>
    </util:form>

    <!--State start - am0127_GetMemberListByANI_DB-->
    <util:form id="am0127_GetMemberListByANI_DB" >
        <util:block name="am0127_GetMemberListByANI_DBBlock" >
            <node:start name="am0127_GetMemberListByANI_DB" />
        </util:block>
        <das:dataAccess id="am0127_GetMemberListByANI_DB" namelist="ani"/>
        <util:block>
            <util:var name="i" expr="0"/>
            <util:var name="strLastNames" expr="''"/>
            <util:var name="strLastNamesLen" expr="''"/>
            <util:var name="j" expr="0"/>
            <util:log>usedAniAuth --> <util:value expr="usedAniAuth"/></util:log>
            <util:assign name="returnCode" expr="am0127_GetMemberListByANI_DB.returnCode" />
            <util:log>return code <-- <util:value expr="returnCode"/></util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="numberOfMembersFound" expr="am0127_GetMemberListByANI_DB.numberOfMembersFound" />
                <util:assign name="lastNameList" expr="am0127_GetMemberListByANI_DB.lastNameList" />
                <util:log>lastNameList <-- <util:value expr="lastNameList" /></util:log>
                <util:log>numberOfMembersFound <-- <util:value expr="numberOfLastNamesFound" /></util:log>
                <util:if cond="numberOfMembersFound &gt; 0" >
                    <util:script>
                        strLastNamesLen = lastNameList.length;
                        if(strLastNamesLen > 0)
                        {
                            for(var i=0; strLastNamesLen > i; i++)
                            {
                                strLastNames =  lastNameList[i] + "~" + strLastNames;
                            }
                            strLastNames = strLastNames.substring(0,strLastNames.length - 1);
                        }
                    </util:script>  
                    <util:assign name="lastNameList" expr="strLastNames"/>
                    <util:log>lastNameList <-- <util:value expr="lastNameList" /></util:log>
                    <util:log>dateOfBirthConfirmed --> <util:value expr="dateOfBirthConfirmed"/></util:log>
                    <util:if cond="dateOfBirthConfirmed == true">
                        <util:goto next="#am0134_GetLastNameConstrainedGmr_DM" />                    
                    <util:else />
                        <util:goto next="#am0130_GetDOB_DM" />                                                         
                    </util:if> 
                <util:else />
                    <util:goto next="#am0155_AuthFailedMax_PP" />
                </util:if>
            <util:else/>
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" /> 
            </util:if>
        </util:block>             
    </util:form>     

    <!--State start - am0130_GetDOB_DM-->
    <util:form id="am0130_GetDOB_DM" >
        <util:block name="am0130_GetDOB_DMBlock" >
            <node:start name="am0130_GetDOB_DM" />
            <util:assign name="lastDM" expr="'AuthMail.dvxml#am0130_GetDOB_DM'"/>
        </util:block>
        <dm:ndm id="am0130_GetDOB_DM" audionamelist="callerType usedAniAuth task">
            <util:log>rxAndDobAttempts --> <util:value expr="rxAndDobAttempts"/></util:log>
            <util:log>am0130_GetDOB_DM_return_value --> <util:value expr="am0130_GetDOB_DM.returnvalue" /> </util:log>
            <dm:success>
                <dm:default>
                    <util:assign name="rxAndDobAttempts"  expr="rxAndDobAttempts + 1" />
                    <util:assign name="dateOfBirth" expr="am0130_GetDOB_DM.returnvalue" />
                    <util:log>rxAndDobAttempts <-- <util:value expr="rxAndDobAttempts" /> </util:log>
                    <util:log>dateOfBirth <-- <util:value expr="dateOfBirth" /> </util:log>
                    <util:log>usedAniAuth --> <util:value expr="usedAniAuth" /> </util:log>
                    <util:if cond="usedAniAuth == true">                       
                        <util:log> Exit form:[normal] </util:log>                   
                        <util:goto next="#am0134_GetLastNameConstrainedGmr_DM"/>  
                    <util:else/>
                        <util:log> Exit form:[normal] </util:log>
                    <util:if cond="dateOfBirth != undefined">
                        <util:goto next="#am0140_GetMemberDetailsByRxNumber_DB"/>
                    </util:if>
                </dm:default>
            </dm:success>
            <dm:command>
                <dm:recoOption value="dont_know">
                    <util:log>COMMAND --> dont_know </util:log>
                    <util:log> Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" /> 
                </dm:recoOption>
                <dm:recoOption value="operator" >
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.COMMAND.OPERATOR");</script>                    
                    <util:log>COMMAND --> operator </util:log>
                    <util:log> Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.operator"/>
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>
                    
                    <!--State start - am0105_MailOrderLocatorService_DB-->
    <util:form id="am0105_MailOrderLocatorService_DB" >
       
        <util:block name="am0105_MailOrderLocatorService_DBBlock" >
            <node:start name="am0105_MailOrderLocatorService_DB" />
        </util:block>
                    <das:dataAccess id="am0105_MailOrderLocatorService_DB" namelist="rxNumber dateOfBirth"/>
                    <util:block>  
                        <util:assign name="returnCode" expr="am0105_MailOrderLocatorService_DB.returnCode" />            
            <util:log>return code --> <util:value expr="returnCode" /> </util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="resultCode" expr="am0105_MailOrderLocatorService_DB.resultCode" />      
                <util:assign name="resultCodeDescription" expr="am0105_MailOrderLocatorService_DB.resultCodeDescription" />
                <util:log>ResultCode --> <util:value expr="resultCode"/></util:log>
                <util:log>ResultDesc --> <util:value expr="resultCodeDescription"/></util:log>                
                <util:if cond="resultCode != 'M'">  
                    <util:goto next="#am0140_GetMemberDetailsByRxNumber_DB"/>
                <util:else/>     
                    <util:throw event="event.nuance.logic.transfer" message="'system_error'" />            
                </util:if>
            <util:else/>     
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" />            
            </util:if>
        </util:block>  
    </util:form>

    <!--State start - am0134_GetLastNameConstrainedGmr_DM-->
    <util:form id="am0134_GetLastNameConstrainedGmr_DM" >
        <util:var name="collection_grammar1" expr="''" />
        <util:var name="collection_dtmfgrammar1" expr="''" />
        <util:var name="nbest1" expr="''"/>
        <util:var name="nbest1_confidence" expr="''"/>
        <util:var name="nbest2" expr="''"/>
        <util:var name="nbest2_confidence" expr="''"/>
        <util:block name="am0134_GetLastNameConstrainedGmr_DMBlock" >
            <node:start name="am0134_GetLastNameConstrainedGmr_DM" />
            <util:assign name="lastDM" expr="'AuthMail.dvxml#am0134_GetLastNameConstrainedGmr_DM'"/>
            <util:log>lastNameList --> <util:value expr="lastNameList" /></util:log>
        </util:block>
        <script>
            collection_grammar1 = "am0134_GetLastNameConstrainedGmr_DM.jsp?names=" + cleanNameInput(lastNameList) + "&amp;";
        </script>
        <dm:ndm id="am0134_GetLastNameConstrainedGmr_DM" namelist="collection_grammar1" audionamelist="callerType">
            <dm:success>
                <dm:default>
                    <util:assign name="lastName"  expr="am0134_GetLastNameConstrainedGmr_DM.returnvalue" />
                    <util:assign name="nbest1" expr="am0134_GetLastNameConstrainedGmr_DM.nbestresults[0].interpretation['MEANING']"/>
                    <util:assign name="nbest1_confidence" expr="am0134_GetLastNameConstrainedGmr_DM.nbestresults[0].confidence"/>
                    <util:log>nbest1 <-- <util:value expr="nbest1" /> </util:log>
                    <util:log>nbest1_confidence <-- <util:value expr="nbest1_confidence" /> </util:log>
                    <util:if cond="am0134_GetLastNameConstrainedGmr_DM.nbestresults[1] != null">
                        <util:assign name="nbest2" expr="am0134_GetLastNameConstrainedGmr_DM.nbestresults[1].interpretation['MEANING']"/>
                        <util:assign name="nbest2_confidence" expr="am0134_GetLastNameConstrainedGmr_DM.nbestresults[1].confidence"/>
                        <util:log>nbest2 <-- <util:value expr="nbest2" /> </util:log>
                        <util:log>nbest2_confidence <-- <util:value expr="nbest2_confidence" /> </util:log>
                    </util:if>
                    <util:if cond="nbest2 != 'operator' &amp;&amp; nbest2_confidence &gt; 0.399">
                        <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.ANI_LOOKUP.FAILED.LASTNAME_MISMATCH");</script>                    
                        <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.ANI_LOOKUP.FAILED.LASTNAME_LOW_CONF");</script>                    
                        <util:log>nbest confidence is below 0.399 for lastName --> <util:value expr="lastName" /></util:log>
                        <util:log> Exit form:[last_name_recognition_ambiguous] </util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" /> 
                    <util:else/>
                        <util:log> Exit form:[normal] </util:log>
                        <util:goto next="#am0142_GetMemberDetailsByLastNameAndDOB_DB" />               
                        
                    </util:if>       
                </dm:default>
            </dm:success>
            <dm:command>
                <dm:recoOption value="operator" >
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.COMMAND.OPERATOR");</script>                    
                    <util:log>COMMAND --> operator </util:log>
                    <util:log> Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.operator" message="'agent_request'" />               
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>	                 

    <!--State start - am0138_ConfirmFirstName_DM-->
    <util:form id="am0138_ConfirmFirstName_DM" >
        <util:block name="am0138_ConfirmFirstName_DMBlock" >
            <node:start name="am0138_ConfirmFirstName_DM" />
            <util:assign name="lastDM" expr="'AuthMail.dvxml#am0138_ConfirmFirstName_DM'"/>
            <util:log>firstName --> <util:value expr="firstName" /></util:log>
                <script>
                    firstName = firstName.replace("'", "");
                </script>        
            <util:log>firstName <-- <util:value expr="firstName" /></util:log>
        </util:block>
        <dm:ndm id="am0138_ConfirmFirstName_DM" audionamelist="firstName callerType">
            <dm:success>
                <dm:recoOption value="true">
                    <util:log> Exit form:[normal] </util:log>
                    <util:goto next="#am0144_GetMemberRxNumberByPatientNumber_DB"/>
                </dm:recoOption>
                <dm:recoOption value="false">
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.ANI_LOOKUP.FAILED.FIRSTNAME_MISMATCH");</script>                    
                    <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" /> 
                </dm:recoOption>
            </dm:success>
            <dm:command>
                <dm:recoOption value="operator" >
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.COMMAND.OPERATOR");</script>                    
                    <util:log>COMMAND --> operator </util:log>
                    <util:log> Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.operator" message="'agent_request'" />               
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>	

    <!--State start - am0140_GetMemberDetailsByRxNumber_DB-->
    <util:form id="am0140_GetMemberDetailsByRxNumber_DB" >
        <util:block name="am0140_GetMemberDetailsByRxNumber_DBBlock" >
            <node:start name="am0140_GetMemberDetailsByRxNumber_DB" />
        </util:block>
        <das:dataAccess id="am0140_GetMemberDetailsByRxNumber_DB" namelist="rxNumber dateOfBirth"/>
        <util:block>
            <util:assign name="returnCode" expr="am0140_GetMemberDetailsByRxNumber_DB.returnCode" />
            <util:log>return code --> <util:value expr="returnCode" /> </util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="rxFound" expr="am0140_GetMemberDetailsByRxNumber_DB.rxFound" />
                <util:assign name="phoneNumber" expr="am0140_GetMemberDetailsByRxNumber_DB.primaryPhone" />
                <util:assign name="shippingZipCode" expr="am0140_GetMemberDetailsByRxNumber_DB.shippingZipCode.substring(0, 5)" />
                <util:assign name="individualZipCode" expr="am0140_GetMemberDetailsByRxNumber_DB.individualZipCode.substring(0, 5)" />
                <util:assign name="primaryZipCode" expr="am0140_GetMemberDetailsByRxNumber_DB.primaryZipCode.substring(0, 5)" />
                <util:assign name="dependentZipCode" expr="am0140_GetMemberDetailsByRxNumber_DB.dependentZipCode.substring(0, 5)" />
                <util:assign name="rxClaimNumber" expr="am0140_GetMemberDetailsByRxNumber_DB.rxClaimNumber" />
                <util:assign name="patientNumber" expr="am0140_GetMemberDetailsByRxNumber_DB.patientNumber" />
                <util:assign name="cardHolder" expr="am0140_GetMemberDetailsByRxNumber_DB.cardHolder" />
                <util:assign name="isMemberIRIS" expr="am0140_GetMemberDetailsByRxNumber_DB.isMemberIRIS" />
                <util:log>rxFound --> <util:value expr="rxFound" /> </util:log>
                <util:log>shippingZipCode--> <util:value expr="shippingZipCode" /> </util:log>
                <util:log>individualZipCode--> <util:value expr="individualZipCode" /> </util:log>
                <util:log>primaryZipCode--> <util:value expr="primaryZipCode" /> </util:log>
                <util:log>dependentZipCode--> <util:value expr="dependentZipCode" /> </util:log>
                <util:log>rxClaimNumber--> <util:value expr="rxClaimNumber" /> </util:log>
                <util:log>patientNumber--> <util:value expr="patientNumber" /> </util:log>
                <util:log>cardHolder--> <util:value expr="cardHolder" /> </util:log>
                <util:if cond="task == 'refill' || task == 'another_order'">
                    <util:assign name="tempRxNumber" expr="rxNumber" />
                </util:if>
                <util:assign name="authenticated" expr="true"/>
                <util:if cond="authStatus == 'auth_3_pieces'">
                    <util:log> Exit form:[normal] </util:log>
                    <util:goto next="#am0125_DoesDOBMatch_DS" />  
                <util:elseif cond="authStatus == 'auth_2_pieces'"/>
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0125_DoesDOBMatch_DS" />
                <util:else />
                    <util:log> Exit form:[normal] </util:log>
                    <util:goto next="#am0150_EvaluateRxAndDOBResult_DS" />
                </util:if>
            <util:else/>
                <util:if cond="rxAndDobAttempts == 1" >
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0220_AuthFailedOnce_PP" />                    
                    <util:else/>
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0155_AuthFailedMax_PP" />
                </util:if>
            </util:if>
        </util:block>
    </util:form>	           

    <!--State start - am0142_GetMemberDetailsByLastNameAndDOB_DB-->
    <util:form id="am0142_GetMemberDetailsByLastNameAndDOB_DB" >
        <util:block name="am0142_GetMemberDetailsByLastNameAndDOB_DBBlock" >
            <node:start name="am0142_GetMemberDetailsByLastNameAndDOB_DB" />
        </util:block>
        <das:dataAccess id="am0142_GetMemberDetailsByLastNameAndDOB_DB" namelist="lastName dateOfBirth"/>
        <util:block>
            <util:assign name="returnCode" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.returnCode" />
            <util:log>return code <-- <util:value expr="returnCode" /></util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="canIVRDisambiguate" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.canIVRDisambiguate"/>
                <util:log>canIVRDisambiguate <-- <util:value expr="canIVRDisambiguate" /></util:log>
                <util:if cond="canIVRDisambiguate == 'true'">
                    <util:assign name="rxFound" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.rxFound" />
                    <util:assign name="phoneNumber" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.primaryPhone" />
                    <util:assign name="firstName" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.firstName" />                    
                    <util:assign name="shippingZipCode" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.shippingZipCode.substring(0, 5)" />
                    <util:assign name="individualZipCode" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.individualZipCode.substring(0, 5)" />
                    <util:assign name="primaryZipCode" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.primaryZipCode.substring(0, 5)" />
                    <util:assign name="dependentZipCode" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.dependentZipCode.substring(0, 5)" />
                    <util:assign name="rxClaimNumber" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.rxClaimNumber" />
                    <util:assign name="patientNumber" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.patientNumber" />
                    <util:assign name="cardHolder" expr="am0142_GetMemberDetailsByLastNameAndDOB_DB.cardHolder" />
                    <util:log>rxFound --> <util:value expr="rxFound" /> </util:log>
                    <util:log>firstName--> <util:value expr="firstName" /> </util:log>
                    <util:log>shippingZipCode--> <util:value expr="shippingZipCode" /> </util:log>
                    <util:log>individualZipCode--> <util:value expr="individualZipCode" /> </util:log>
                    <util:log>primaryZipCode--> <util:value expr="primaryZipCode" /> </util:log>
                    <util:log>dependentZipCode--> <util:value expr="dependentZipCode" /> </util:log>
                    <util:log>rxClaimNumber--> <util:value expr="rxClaimNumber" /> </util:log>
                    <util:log>patientNumber--> <util:value expr="patientNumber" /> </util:log>
                    <util:log>cardHolder--> <util:value expr="cardHolder" /> </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:if cond="firstName">
                        <util:goto next="#am0138_ConfirmFirstName_DM" />
                    <util:else/>
                        <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.ANI_LOOKUP.FAILED.LASTNAME_MISMATCH");</script>                    
                        <util:throw event="event.nuance.logic.transfer" message="'system_error'" /> 
                    </util:if>
                <util:else />
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.ANI_LOOKUP.FAILED.AMBIGUOS");</script>                    
                    <util:log>Exit form:[last_name_recognition_ambiguous] </util:log>
                    <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" /> 
                </util:if>
            <util:else /> 
                <util:log>Exit form:[system_error] </util:log>
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" /> 
            </util:if>
        </util:block>
    </util:form>	

    <!--State start - am0144_GetMemberRxNumberByPatientNumber_DB-->
    <util:form id="am0144_GetMemberRxNumberByPatientNumber_DB" >
        <util:block name="am0144_GetMemberRxNumberByPatientNumber_DBBlock" >
            <node:start name="am0144_GetMemberRxNumberByPatientNumber_DB" />
        </util:block>
        <das:dataAccess id="am0144_GetMemberRxNumberByPatientNumber_DB" namelist="patientNumber"/>
        <util:block>       
            <util:assign name="returnCode" expr="am0144_GetMemberRxNumberByPatientNumber_DB.returnCode" />
            <util:log>return code --> <util:value expr="returnCode" /> </util:log>
            <util:if cond="returnCode == '0'">
                <util:assign name="rxFound" expr="am0144_GetMemberRxNumberByPatientNumber_DB.rxFound" />
                <util:assign name="rxNumber" expr="am0144_GetMemberRxNumberByPatientNumber_DB.rxNumber" />
                <util:log> rxFound <-- <util:value expr="rxFound" /> </util:log>
                <util:log> rxNumber <-- <util:value expr="rxNumber" /> </util:log>
                <util:log> Exit form:[normal] </util:log>
                <util:goto next="#am0150_EvaluateRxAndDOBResult_DS" />
            <util:else/>
                <util:log>Exit form:[system_error] </util:log>
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" />
            </util:if>
        </util:block>
    </util:form>	

    <!--State start - am0150_EvaluateRxAndDOBResult_DS-->
    <util:form id="am0150_EvaluateRxAndDOBResult_DS" >
        <util:block name="am0150_EvaluateRxAndDOBResult_DSBlock" >
            <node:start name="am0150_EvaluateRxAndDOBResult_DS" />
            <decision:start stateId="am0150_EvaluateRxAndDOBResult_DS" />
        </util:block>
        <util:block>
            <util:log>rxFound --> <util:value expr="rxFound" /> </util:log>
            <util:log>rxAndDobAttempts --> <util:value expr="rxAndDobAttempts"/></util:log>
            <util:if cond="rxFound == 'true'">
                <decision:end stateId="am0150_EvaluateRxAndDOBResult_DS"  label="Valid match" />
                <util:assign name="dateOfBirthConfirmed" expr="true"/>
                <util:log>dateOfBirthConfirmed <-- <util:value expr="dateOfBirthConfirmed" /> </util:log>
                <util:log>Exit form:[normal] </util:log>
                <util:goto next="#am0160_IsZipNeeded_DS" />
            <util:elseif cond="rxAndDobAttempts == 1"/>
                <decision:end stateId="am0150_EvaluateRxAndDOBResult_DS"  label="Auth failed first time" />
                <util:log>Exit form:[normal] </util:log>
                <util:goto next="#am0220_AuthFailedOnce_PP" />                    
            <util:else />
                <util:if cond="dateOfBirthConfirmed == true">
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.ANI_LOOKUP.FAILED.DOB_MISMATCH");</script>                    
                </util:if>
                <util:if cond="zipConfirmed == false">
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.ANI_LOOKUP.FAILED.ZIP_MISMATCH ");</script>                    
                </util:if>
                <decision:end stateId="am0150_EvaluateRxAndDOBResult_DS"  label="Auth failed,second time" />
                <util:log>Exit form:[normal] </util:log>
                <util:goto next="#am0155_AuthFailedMax_PP" />
            </util:if>
        </util:block>
    </util:form>	

    <!--State start - am0155_AuthFailedMax_PP-->
    <util:form id="am0155_AuthFailedMax_PP" >
        <util:block name="am0155_AuthFailedMax_PPBlock" >
            <node:start name="am0155_AuthFailedMax_PP" />
        </util:block>
        <util:block>
                <util:assign name="usedAniAuth" expr="true" />
                <util:log>usedAniAuth <-- <util:value expr="usedAniAuth"/></util:log>
                <as:audio id="am0155_out_02" playState="true" />                
                <as:audio id="am0155_out_03" playState="true" />     
                <util:log>Exit form:[normal] </util:log>
                <util:goto next="#am0127_GetMemberListByANI_DB" />                    
            </util:if>
        </util:block>
    </util:form>	

    <!--State start - am0160_IsZipNeeded_DS-->
    <util:form id="am0160_IsZipNeeded_DS" >
        <util:block name="am0160_IsZipNeeded_DSBlock" >
            <node:start name="am0160_IsZipNeeded_DS" />
            <decision:start stateId="am0160_IsZipNeeded_DS" />
        </util:block>
        <util:block>
            <util:if cond="task == 'refill'||task =='another_order'||task =='get_rx_again'|| task == 'order_details' || task == 'order_status' || task == 'balance_and_payment'">
                <decision:end stateId="am0160_IsZipNeeded_DS"  label="ZIP is needed." />
                <util:log>zipConfirmed --> <util:value expr="zipConfirmed" /> </util:log>
                <util:log>usedAniAuth --> <util:value expr="zipConfirmed" /> </util:log>
                <util:if cond="zipConfirmed == false">
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0310_GetZip_DM" />
                <util:else/>
                    <util:assign name="zipAttempts"  expr="zipAttempts + 1" />
                    <util:log>zipAttempts <-- <util:value expr="zipAttempts" /> </util:log>
                    <util:log>collectedZipCode --> <util:value expr="collectedZipCode" /> </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0320_ValidateZip_DS" />
                </util:if>
            <util:else/>
                <decision:end stateId="am0160_IsZipNeeded_DS"  label="Zip is NOT needed" />
                <util:assign name="authStatus"  expr="'auth_2_pieces'" />
                <util:assign name="agentRequestTreatment"  expr="'transfer_upon_request'" />
                <util:log>authStatus <-- <util:value expr="authStatus"/></util:log>
                <util:log>agentRequestTreatment <-- <util:value expr="agentRequestTreatment"/></util:log>
                <util:goto next="#am0332_CheckToAskToSaveANI_DS" />
            </util:if>
        </util:block>
    </util:form>	

    <!--State start - am0220_AuthFailedOnce_PP-->
    <util:form id="am0220_AuthFailedOnce_PP" >
        <util:block name="am0220_AuthFailedOnce_PPBlock" >
            <node:start name="am0220_AuthFailedOnce_PP" />
        </util:block>
        <util:block>
            <as:audio id="am0220_out_01" playState="true" />
            <util:log>Exit form:[normal] </util:log>
            <util:goto next="#am0225_ConfirmRxYN_DM" />
        </util:block>
    </util:form>	

    <!--State start - am0225_ConfirmRxYN_DM-->
    <util:form id="am0225_ConfirmRxYN_DM" >
        <util:block name="am0225_ConfirmRxYN_DMBlock" >
            <node:start name="am0225_ConfirmRxYN_DM" />
            <util:assign name="lastDM" expr="'AuthMail.dvxml#am0225_ConfirmRxYN_DM'"/>
        </util:block>
        <dm:ndm id="am0225_ConfirmRxYN_DM" audionamelist="callerType rxNumber">
            <dm:success>
                <dm:recoOption value="true" form="am0235_ConfirmDOBYN_DM">
                    <util:log>caller confirmed rxNumber is correct</util:log>
                    <util:log>Exit form:[normal] </util:log>
                </dm:recoOption>
                <dm:recoOption value="false" form="am0230_GetCorrectRx_DM">
                    <util:log>caller confirmed rxNumber is NOT correct</util:log>
                    <util:log>Exit form:[normal] </util:log>
                </dm:recoOption>
            </dm:success>
            <dm:command>
                <dm:recoOption value="operator" >
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.COMMAND.OPERATOR");</script>                    
                    <util:log> COMMAND --> operator </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.operator"/>
                </dm:recoOption>
                <dm:recoOption value="repeat" >
                    <util:log>COMMAND --> repeat </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0225_ConfirmRxYN_DM"/>
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>	

    <!--State start - am0230_GetCorrectRx_DM-->
    <util:form id="am0230_GetCorrectRx_DM" >
        <util:block name="am0230_GetCorrectRx_DMBlock" >
            <node:start name="am0230_GetCorrectRx_DM" />
            <util:assign name="lastDM" expr="'AuthMail.dvxml#am0230_GetCorrectRx_DM'"/>
        </util:block>
        <dm:ndm id="am0230_GetCorrectRx_DM" audionamelist="callerType">
            <util:log>am0230_GetCorrectRx_DM return value--> <util:value expr="am0230_GetCorrectRx_DM.returnvalue" /> </util:log>
            <util:log>am0230_GetCorrectRx_DM_return_value --> <util:value expr="am0230_GetCorrectRx_DM.returnvalue" /></util:log>
            <dm:success>
                <dm:default>
                    <util:assign name="rxNumber"  expr="am0230_GetCorrectRx_DM.returnvalue" />
                    <util:assign name="rxOrDobChanged"  expr="'true'" />
                    <util:log>rxNumber <-- <util:value expr="rxNumber" /> </util:log>
                    <util:log>rxOrDobChanged <-- <util:value expr="rxOrDobChanged" /> </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0235_ConfirmDOBYN_DM"/>
                </dm:default>
            </dm:success>
            <dm:command>
                <dm:recoOption value="dont_know">   
                        <util:log>Exit form:[normal] </util:log>
                        <util:goto next="#am0155_AuthFailedMax_PP"/>
                </dm:recoOption>
                <dm:recoOption value="operator" >
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.COMMAND.OPERATOR");</script>                    
                    <util:log>COMMAND --> operator </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.operator"/>
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>	

    <!--State start - am0235_ConfirmDOBYN_DM-->
    <util:form id="am0235_ConfirmDOBYN_DM" >
        <util:block name="am0235_ConfirmDOBYN_DMBlock" >
            <node:start name="am0235_ConfirmDOBYN_DM" />
            <util:assign name="lastDM" expr="'AuthMail.dvxml#am0235_ConfirmDOBYN_DM'"/>
        </util:block>
        <dm:ndm id="am0235_ConfirmDOBYN_DM" audionamelist="callerType dateOfBirth">
            <dm:success>
                <dm:recoOption value="true">
                    <util:assign name="dateOfBirthConfirmed" expr="true"/>
                    <util:log>dateOfBirth <-- <util:value expr="dateOfBirth"/></util:log>
                    <util:log>dateOfBirthConfirmed <-- <util:value expr="dateOfBirthConfirmed"/></util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0245_RxOrDOBChanged_DS" />
                </dm:recoOption>
                <dm:recoOption value="false">
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0240_GetCorrectDOB_DM" />
                </dm:recoOption>
            </dm:success>
            <dm:command>
                <dm:recoOption value="operator" >
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.COMMAND.OPERATOR");</script>                    
                    <util:log>COMMAND --> operator </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.operator"/>
                </dm:recoOption>
                <dm:recoOption value="repeat" >
                    <util:log>COMMAND --> repeat </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0235_ConfirmDOBYN_DM"/>
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>	 

    <!--State start - am0240_GetCorrectDOB_DM-->
    <util:form id="am0240_GetCorrectDOB_DM" >
        <util:block name="am0240_GetCorrectDOB_DMBlock" >
            <node:start name="am0240_GetCorrectDOB_DM" />
            <util:assign name="lastDM" expr="'AuthMail.dvxml#am0240_GetCorrectDOB_DM'"/>
        </util:block>
        <dm:ndm id="am0240_GetCorrectDOB_DM" audionamelist="callerType">
            <util:log>am0240_GetCorrectDOB_DM return value --> <util:value expr="am0240_GetCorrectDOB_DM.returnvalue"/> </util:log>
            <dm:success>
                <dm:default>
                    <util:assign name="dateOfBirth"  expr="am0240_GetCorrectDOB_DM.returnvalue" />
                    <util:assign name="rxOrDobChanged" expr="'true'" />
                    <util:log>dateOfBirth <-- <util:value expr="dateOfBirth" /> </util:log>
                    <util:log>rxOrDobChanged <-- <util:value expr="rxOrDobChanged" /> </util:log>                
                    <util:goto next="#am0245_RxOrDOBChanged_DS"/>                 
                </dm:default>
            </dm:success>
            <dm:command>
                <dm:recoOption value="dont_know">
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.ANI_LOOKUP.FAILED.DOB_UNKNOWN");</script>                    
                    <util:log>COMMAND --> dont_know </util:log>
                    <util:log>Exit form:[normal] </util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" /> 
                </dm:recoOption>
                <dm:recoOption value="operator" >
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.COMMAND.OPERATOR");</script>                    
                    <util:log>COMMAND --> operator </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.operator"/>
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>	 

    <!--State start - am0245_RxOrDOBChanged_DS-->
    <util:form id="am0245_RxOrDOBChanged_DS" >
        <util:block name="am0245_RxOrDOBChanged_DSBlock" >
            <node:start name="am0245_RxOrDOBChanged_DS" />
            <decision:start stateId="am0245_RxOrDOBChanged_DS" />
        </util:block>
        <util:block>
            <util:if cond="rxOrDobChanged == 'true'">
                <decision:end stateId="am0245_RxOrDOBChanged_DS"  label="Caller has corrected Rx and/or DOB" />
                <util:assign name="rxAndDobAttempts"  expr="rxAndDobAttempts + 1" />
                <util:log>rxAndDobAttempts <-- <util:value expr="rxAndDobAttempts" /> </util:log>
                <util:goto next="#am0140_GetMemberDetailsByRxNumber_DB" />
            <util:else />
                <decision:end stateId="am0245_RxOrDOBChanged_DS"  label="Caller has confirmed Rx and DOB to be correct, transferring." />  
                <util:log>Exit form:[normal] </util:log>
                <util:goto next="#am0155_AuthFailedMax_PP"/>
            </util:if>
        </util:block>
    </util:form>

    <!--State start - am0310_GetZip_DM-->
    <util:form id="am0310_GetZip_DM" >
        <util:block name="am0310_GetZip_DMBlock" >
            <node:start name="am0310_GetZip_DM" />
            <util:assign name="lastDM" expr="'AuthMail.dvxml#am0310_GetZip_DM'"/>
        </util:block>
        <dm:ndm id="am0310_GetZip_DM" audionamelist="callerType usedAniAuth task zipAttempts authStatus">
            <util:log>am0310_GetZip_DM_return_value--> <util:value expr="am0310_GetZip_DM.returnvalue" /></util:log>
            <dm:success>
                <dm:default>
                    <util:assign name="zipAttempts"  expr="zipAttempts + 1" />
                    <util:assign name="collectedZipCode"  expr="am0310_GetZip_DM.returnvalue" />
                    <util:log>zipAttempts <-- <util:value expr="zipAttempts" /> </util:log>
                    <util:log>collectedZipCode <-- <util:value expr="collectedZipCode" /> </util:log>
                    <util:goto next="#am0320_ValidateZip_DS"/>
                </dm:default>
            </dm:success>
            <dm:command>
                <dm:recoOption value="dont_know">
                    <util:log>Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.logic.transfer" message="'failed_authentication'" /> 
                </dm:recoOption>
                <dm:recoOption value="operator" >
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.COMMAND.OPERATOR");</script>                    
                    <util:log>COMMAND --> operator </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.operator" message="'agent_request'" />               
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>	

    <!--State start - am0320_ValidateZip_DS-->
    <util:form id="am0320_ValidateZip_DS" >
        <util:block name="am0320_ValidateZip_DSBlock" >
            <node:start name="am0320_ValidateZip_DS" />
            <decision:start stateId="am0320_ValidateZip_DS" />
        </util:block>
        <util:block>
            <util:log>collectedZipCode --> <util:value expr="collectedZipCode" /></util:log>           
            <util:log>zipAttempts --> <util:value expr="zipAttempts" /></util:log>
            <util:log>shippingZipCode --> <util:value expr="shippingZipCode" /></util:log>
            <util:if cond="shippingZipCode === collectedZipCode">
                <util:log>collectedZipCode(<util:value expr="collectedZipCode"/>) == shippingZipCode(<util:value expr="shippingZipCode"/>)</util:log>
                <util:assign name="zipCode" expr="collectedZipCode" />
            </util:if>
            <util:log>individualZipCode --> <util:value expr="individualZipCode" /></util:log>
            <util:if cond="individualZipCode === collectedZipCode ">
                <util:log>collectedZipCode(<util:value expr="collectedZipCode"/>) == individualZipCode(<util:value expr="individualZipCode"/>)</util:log>
                <util:assign name="zipCode" expr="collectedZipCode" />
            </util:if>
            <util:log>primaryZipCode --> <util:value expr="primaryZipCode" /></util:log>
            <util:if cond="primaryZipCode === collectedZipCode ">
                <util:log>collectedZipCode(<util:value expr="collectedZipCode"/>) == primaryZipCode(<util:value expr="primaryZipCode"/>)</util:log>
                <util:assign name="zipCode" expr="collectedZipCode" />
            </util:if>
            <util:log>dependentZipCode --> <util:value expr="dependentZipCode" /></util:log>
            <util:if cond="dependentZipCode === collectedZipCode ">
                <util:log>collectedZipCode(<util:value expr="collectedZipCode"/>) == dependentZipCode(<util:value expr="dependentZipCode"/>)</util:log>
                <util:assign name="zipCode" expr="collectedZipCode" />
            </util:if>
            <util:if cond="zipCode != undefined">    
                <decision:end stateId="am0320_ValidateZip_DS"  label="zip code matched one on record" />
                <util:assign name="authStatus" expr="'auth_3_pieces'" />
                <util:assign name="agentRequestTreatment" expr="'transfer_upon_request'" />
                <util:log>zipCode <-- <util:value expr="zipCode" /></util:log>
                <util:log>authStatus <-- <util:value expr="authStatus" /></util:log>
                <util:log>agentRequestTreatment <-- <util:value expr="agentRequestTreatment" /></util:log>
                <util:goto next="#am0332_CheckToAskToSaveANI_DS" />
            <util:elseif cond="(zipAttempts + rxAndDobAttempts) &lt; 3" />
                <decision:end stateId="am0320_ValidateZip_DS"  label="zip code does NOT match records" />
                <util:log>Exit form:[normal] </util:log>
                <util:goto next="#am0330_ConfirmZip_DM" />
            <util:else />
                <decision:end stateId="am0320_ValidateZip_DS"  label="zip code does NOT match records, Max Attempts" />
                <util:log>Exit form:[normal] </util:log>
                <util:goto next="#am0155_AuthFailedMax_PP" />   
            </util:if>			
        </util:block>
    </util:form>	

    <!--State start - am0330_ConfirmZip_DM-->
    <util:form id="am0330_ConfirmZip_DM" >
        <util:block name="am0330_ConfirmZip_DMBlock" >
            <rtst:cfp name="am0330_dm"/>
            <node:start name="am0330_ConfirmZip_DM" />
            <util:assign name="lastDM" expr="'AuthMail.dvxml#am0330_ConfirmZip_DM'"/>
        </util:block>
        <dm:ndm id="am0330_ConfirmZip_DM" audionamelist="callerType collectedZipCode">
            <dm:success>
                <dm:recoOption value="true">
                    <util:assign name="zipConfirmed"  expr="true" /> 
                    <util:log>zipCode --> <util:value expr="zipCode"/></util:log>
                    <util:log>zipConfirmed <-- <util:value expr="zipConfirmed"/></util:log>
                    <util:log>usedAniAuth --> <util:value expr="usedAniAuth"/></util:log>
                    <util:if cond="usedAniAuth == false" >
                        <util:log>Exit form:[normal] </util:log>
                        <util:goto next="#am0155_AuthFailedMax_PP"/>
                    <util:else />
                        <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.ANI_LOOKUP.FAILED.ZIP_MISMATCH");</script>                    
                        <util:log>Exit form:[system_error] </util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'system_error'" /> 
                    </util:if>     
                </dm:recoOption>
                <dm:recoOption value="false" form="am0310_GetZip_DM">
                    <util:assign name="zipConfirmed"  expr="false" /> 
                    <util:log>Exit form:[normal] </util:log>
                </dm:recoOption>
            </dm:success>
            <dm:command>
                <dm:recoOption value="operator" >
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.COMMAND.OPERATOR");</script>                    
                    <util:log>COMMAND --> operator </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.operator" message="'agent_request'" />               
                </dm:recoOption>
                <dm:recoOption value="repeat" >
                    <util:log>COMMAND --> repeat </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0330_ConfirmZip_DM"/>
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>    

    <!--State start - am0332_CheckToAskToSaveANI_DS-->
    <util:form id="am0332_CheckToAskToSaveANI_DS" >
        <util:block name="am0332_CheckToAskToSaveANI_DSBlock" >
            <node:start name="am0332_CheckToAskToSaveANI_DS" />
            <decision:start stateId="am0332_CheckToAskToSaveANI_DS" />
        </util:block>
        <util:block>
            <util:if cond="isSaveCallerANIEnabled == true">
                <util:if cond="phoneNumber == ani" >
                    <decision:end stateId="am0332_CheckToAskToSaveANI_DS"  label="ani matches records" />
                    <util:log><util:value expr="ani" /> matches the primary phone number on record.</util:log>           
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0340_SubmitSelectedZip_DB" />
                <util:elseif cond="phoneNumber != ani &amp;&amp; phoneNumber != undefined &amp;&amp; phoneNumber != ''" />
                    <util:log><util:value expr="ani" /> does NOT match the primary phone number on record.</util:log>           
                    <util:log><util:value expr="phoneNumber" /> is the primary phone number on record.</util:log>           
                    <util:if cond="cardHolder == 'true'">     
                        <decision:end stateId="am0332_CheckToAskToSaveANI_DS"  label="ani is NOT in our records as the primary phone number on record. Ask to save ani." />
                        <util:log>Exit form:[normal] </util:log>
                        <util:goto next="#am0334_AskToSaveANI_DM" />
                        <util:else/>
                        <decision:end stateId="am0332_CheckToAskToSaveANI_DS"  label="ani does NOT match the primary phone number on record. Do NOT ask to save ani." />
                        <util:log>Exit form:[normal] </util:log>
                        <util:goto next="#am0340_SubmitSelectedZip_DB" />
                    </util:if> 
                <util:else/>
                    <util:log><util:value expr="ani" /> is NOT in our records.</util:log>           
                    <util:if cond="cardHolder == 'true'">                   
                        <decision:end stateId="am0332_CheckToAskToSaveANI_DS"  label="ani is NOT in our records as the primary phone number on record. Ask to save ani." />
                        <util:log>Exit form:[normal] </util:log>
                        <util:goto next="#am0334_AskToSaveANI_DM" />
                    <util:else/>
                        <decision:end stateId="am0332_CheckToAskToSaveANI_DS"  label="is NOT in the card holder on record. Do NOT ask to save ani." />
                        <util:log>Exit form:[normal] </util:log>
                        <util:if cond="task == 'something_else'">        
                            <util:assign name="authenticated" expr="true" />
                            <util:log>authenticated <-- <util:value expr="authenticated"/></util:log>
                            <util:log>Exit form:[normal] </util:log>
                            <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" />
                        <util:else/>
                            <util:goto next="#am0340_SubmitSelectedZip_DB" />
                        </util:if>                             
                    </util:if> 
                </util:if>
            <util:else/> 
                <decision:end stateId="am0332_CheckToAskToSaveANI_DS"  label="Save ani is turned off." />
                <util:log>Exit form:[normal] </util:log>
                <util:if cond="task == 'something_else'">        
                    <util:assign name="authenticated" expr="true" />
                    <util:log>authenticated <-- <util:value expr="authenticated"/></util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" />
                <util:else/>
                    <util:goto next="#am0340_SubmitSelectedZip_DB" />
                </util:if>                 
            </util:if>
        </util:block>
    </util:form>

    <!--State start - am0334_AskToSaveANI_DM-->
    <util:form id="am0334_AskToSaveANI_DM">
        <util:block name="am0334_AskToSaveANI_DMBlock">
            <node:start name="am0334_AskToSaveANI_DM" />
            <util:log>ani --> <util:value expr="ani" /> </util:log>
        </util:block>
        <dm:ndm id="am0334_AskToSaveANI_DM" audionamelist="origination callerType">
            <dm:success>
                <util:log>am0334_AskToSaveANI_DM_return_value --> <util:value expr="am0334_AskToSaveANI_DM.returnvalue"/></util:log>
                <dm:recoOption value="true">
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.YES_SAVE_ANI");</script>                    
                    <util:log>Exit form:[normal] </util:log>
                    <util:goto next="#am0336_SaveANI_DB" />
                </dm:recoOption> 
                <dm:recoOption value="false">
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.NO_SAVE_ANI");</script>                    
                    <util:log>Exit form:[normal] </util:log>
                    <util:if cond="task == 'something_else'">        
                        <util:assign name="authenticated" expr="true" />
                        <util:log>authenticated <-- <util:value expr="authenticated"/></util:log>
                        <util:log>Exit form:[normal] </util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" />
                    <util:else/>
                        <util:goto next="#am0340_SubmitSelectedZip_DB" />
                    </util:if>                               
                </dm:recoOption>
            </dm:success>
            <dm:command>
                <dm:recoOption value="operator">
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_FAILURE.COMMAND.OPERATOR");</script>                    
                    <util:log>COMMAND --> operator </util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.operator" message="'agent_request'" />               
                </dm:recoOption>
            </dm:command>
        </dm:ndm>
    </util:form>

    <!--State start - am0336_SaveANI_DB-->
    <util:form id="am0336_SaveANI_DB" >
        <util:block name="am0336_SaveANI_DBBlock" >
            <node:start name="am0336_SaveANI_DB" />
        </util:block>
        <util:log>ani --> <util:value expr="ani" /> </util:log>
        <util:log>patientNumber --> <util:value expr="patientNumber" /> </util:log>
        <das:dataAccess id="am0336_SaveANI_DB" namelist="ani patientNumber"/>
        <util:block>
            <util:assign name="returnCode" expr="am0336_SaveANI_DB.returnCode" />
            <util:assign name="saveANIStatus" expr="am0336_SaveANI_DB.status" />
            <util:assign name="saveANIStatusMessage" expr="am0336_SaveANI_DB.statusMessage" />
            <util:log>saveANIStatus --> <util:value expr="saveANIStatus" /></util:log>
            <util:log>saveANIStatusMessage --> <util:value expr="saveANIStatusMessage" /></util:log>
            <util:log>return code --> <util:value expr="returnCode" /></util:log>
            <util:if cond="returnCode == '0'">
                <as:dynamicAudio id="am0336_SavedANI_PP" namelist="ani saveANIStatus" playState="true"/>
                <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.SAVE_ANI_SUCCESS");</script>                    
                <util:log>Exit form:[normal] </util:log>
                <util:if cond="task == 'something_else'">        
                        <util:assign name="authenticated" expr="true" />
                        <util:log>authenticated <-- <util:value expr="authenticated"/></util:log>
                        <util:log>Exit form:[normal] </util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" />
                <util:else/>
                        <util:goto next="#am0340_SubmitSelectedZip_DB" />
                </util:if>                
            <util:else/>
                <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.SAVE_ANI_FAILED");</script>                    
                <util:log>Exit form:[system_error] </util:log>
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" /> 
            </util:if>
        </util:block>
    </util:form>           

    <!--State start - am0340_SubmitSelectedZip_DB-->
    <util:form id="am0340_SubmitSelectedZip_DB" >
        <util:block name="am0340_SubmitSelectedZip_DBBlock" >
            <node:start name="am0340_SubmitSelectedZip_DB" />
        </util:block>
        <util:if cond="usedAni == true">
            <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_SUCCESS.ANI");</script>
        <util:else />
            <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_SUCCESS.RX");</script>          
        </util:if>
        <das:dataAccess id="am0340_SubmitSelectedZip_DB" namelist="collectedZipCode dateOfBirth"/>
        <util:block>
            <util:assign name="returnCode" expr="am0340_SubmitSelectedZip_DB.returnCode" />
            <util:log>return code <-- <util:value expr="returnCode" /></util:log>
            <util:if cond="returnCode == '0'">
                <util:if cond="task == 'order_details'">
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_SUCCESS.THREE_PIECE");</script>                    
                    <util:if cond="mailOrderStatusFlag == 'Y'">
                        <util:log>Exit form:[normal] </util:log>
                        <util:submit next="OrderStatus_02_WrapUp.dvxml#os0220_PlayDetailedStatus_PP" />
                    <util:else />
                        <util:log>Exit form:[normal] </util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" /> 
                    </util:if>                       
                <util:elseif cond="task == 'refill' || task=='another_order' || task=='get_rx_again' || task == 'balance_and_payment'"/>
                    <script>modelsupport.logString("EVNT=IVR_STAT|NAME=MAIL_ORDER.AUTH_SUCCESS.THREE_PIECE");</script>                    
                    <util:if cond="mailOrderNewFlag == 'Y'">
                        <util:log>Exit form:[normal] </util:log>
                        <util:submit next="OrderStatus_01_PlayStatus_1.dvxml#os0110_GetOrderStatus_DB" />
                    <util:else />
                        <util:log>Exit form:[normal] </util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" /> 
                    </util:if>
                <util:elseif cond="task == 'order_status'"/>        
                    <util:if cond="mailOrderStatusFlag == 'Y'">
                        <util:log>Exit form:[normal] </util:log>
                        <util:submit next="OrderStatus_01_PlayStatus_1.dvxml#os0110_GetOrderStatus_DB" />
                    <util:else />
                        <util:log>Exit form:[normal] </util:log>
                        <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" /> 
                    </util:if>
                    <util:else />  
                    <util:assign name="authenticated" expr="true" />
                    <util:log>authenticated <-- <util:value expr="authenticated"/></util:log>
                    <util:log>Exit form:[normal] </util:log>
                    <util:throw event="event.nuance.logic.transfer" message="'option_not_available'" /> 
                </util:if>
            <util:else/>
                <util:log>Exit form:[system_error] </util:log>
                <util:throw event="event.nuance.logic.transfer" message="'system_error'" /> 
            </util:if>
        </util:block>
    </util:form>	                     

</util:vxml>