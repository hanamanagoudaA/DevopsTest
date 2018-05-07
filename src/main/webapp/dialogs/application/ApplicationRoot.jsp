<?xml version="1.0"?>
<%@ page contentType="text/xml;charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/tld/ivr-stats.tld" prefix="rtst" %>
<%@ taglib uri="/WEB-INF/tld/audio-service.tld" prefix="as" %>
<%@ taglib uri="/WEB-INF/tld/data-access-service.tld" prefix="das" %>
<%@ taglib uri="/WEB-INF/tld/ndm-addon-service.tld" prefix="dm"%>
<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ taglib uri="/WEB-INF/tld/node-log-utils.tld" prefix="node"%>
<%@ taglib uri="/WEB-INF/tld/decision-log-utils.tld" prefix="decision"%>
<%@ taglib uri="/WEB-INF/tld/oam-utils.tld" prefix="oam"%>
<util:vxml pageName="ApplicationRoot.jsp" cacheable="true" rootRequired="false">

    
    
    <!-- model scripts -->
    <util:ecma id="framework/states.es" />
    <util:ecma id="framework/dmresult.es" />
    <util:ecma id="framework/model.es" />
    <util:ecma id="framework/modelSupport.es" />
    <util:ecma id="framework/serviceutils.es" />
    <util:ecma id="framework/errorutils.es" />
    <util:ecma id="framework/ndmserviceutils.es" />
    <util:ecma id="framework/ndfapplicationutils.es" />
    <util:ecma id="framework/json2.es" />
    <util:ecma id="framework/ndm.es" />
    <util:ecma id="framework/recognitionserviceutils.es" />
    <util:ecma id="application/grammarInputValidation.es" />
    <util:ecma id="application/FindStringInList.es" />
    <util:ecma id="application/Utils.es" />

    <!-- Statistics -->
    <rtst:init />

    <!-- cache parameters -->

    <!-- NAS updated default variables. 
     When the ApplicationRoot JSP template be used without NAS replace 
     the '$xyz' manually with the real values, e.g 'en-US'. -->
    <!-- TODO verify the three lines -->
    <util:var name="language" expr="'en-US'"/>
    <util:var name="library" expr="'optumrx-mst-ivr'"/>
    <util:var name="version" expr="'0.0.0'"/>

    <!-- Application globals -->

    <!-- AAEP variables -->
    <util:var name="_avayaExitReason" expr="''"/>
    <util:var name="_avayaExitInfo1" expr="''"/>
    <util:var name="_avayaExitInfo2" expr="''"/>
    <util:var name="_avayaExitCustomerId" expr="''"/>
    <util:var name="_avayaExitPreferredPath" expr="'1'"/>
    <util:var name="_avayaExitTopic" expr="''"/>
    <util:var name="applicationName" expr="'optumrx-mst-ivr'"/>
    <util:var name="applicationServerHostname" expr="''"/>

    <!-- ICM Transfer variables -->
    <util:var name="ssaResult" expr="'AGENT_AVAILABLE'"/>
    <util:var name="skillId" expr="''"/>
    <util:var name="vdn" expr="''"/>
    <util:var name="acd" expr="''"/>
    <util:var name="acdtype" expr="''"/>
    <util:var name="queueposition" expr="''"/>
    <util:var name="skilldefaultvdn" expr="''"/>
    <util:var name="ewt" expr="''"/>
    <util:var name="refer" expr="'true'"/>
    <util:var name="ccxmlapplicationurl" expr="''"/>
    <util:var name="wta" expr="''"/>
    <util:var name="eha" expr="''"/>
    <util:var name="querystring" expr="''"/>
    <util:var name="enableExternalMessage" expr="'false'"/>
    <util:var name="cosmosDiv" expr="''" />

    <!-- Start Application variables -->

    <!-- Start Application Telephony variables -->
    <util:var name="dnis" expr="''"/> <!-- Change Before Production Deployment -->
    <util:var name="ani" expr="''"/> <!-- Change Before Production Deployment -->
    <util:var name="ucid" expr="''"/>
    <util:var name="callMode" expr="''"/>
    <util:var name="callID" expr="''"/>
    <util:var name="sessionID" expr="''"/>
    <util:var name="browserIP" expr="''"/>
    <!-- End Application Telephony variables -->


    <!-- Application Constants -->
    <util:var name="AUTHENTICATION_MODE_ID" expr="'id'"/>
    <util:var name="AUTHENTICATION_MODE_ZIP_NAME" expr="'zip_name'"/>
    <util:var name="AUTHENTICATION_MODE_ZIP_ID" expr="'zip_id'"/>

    <!-- Application TFN Profile variables -->
    <util:var name="tfn" expr="''"/>
    <util:var name="clientName" expr="''"/>
    <util:var name="lineOfBusiness" expr="''"/>
    <util:var name="greetingPromptName" expr="''"/>
    <util:var name="greetingPromptVerbiage" expr="''"/>
    <util:var name="origination" expr=""/>
    <util:var name="destination" expr=""/>    
    <util:var name="esbProvider" expr="''"/>
    <util:var name="esbInstance" expr="''"/>
    <util:var name="rxcDomain" expr="''"/>
    <util:var name="defaultLanguage" expr="'english'"/>
    <util:var name="offerLanguageSelection" expr="'N'"/>
    <util:var name="callerType" expr="''" />
    <util:var name="defaultCallerType" expr="''"/>
    <util:var name="transferVDN" expr="'1996830016@uhc.co'"/> <!-- Xfer_Default_VDN Change Before Production Deployment -->
    <util:var name="transferType" expr="'blind'"/> 
    <util:var name="claimAuthenticationMode" expr="AUTHENTICATION_MODE_ZIP_NAME"/>

    <!--  Feature flags-->
    <util:var name="memberFlag" expr="'N'"/>
    <util:var name="pharmacyFlag" expr="'N'"/>
    <util:var name="physicianFlag" expr="'N'"/>
    <util:var name="prospectFlag" expr="'N'"/>
    <util:var name="otherFlag" expr="'N'"/>
    <util:var name="memberInfoFlag" expr="'N'"/>
    <util:var name="eligibilityFlag" expr="'N'"/>
    <util:var name="mailOrderAlerts" expr="'N'"/>
    <util:var name="mailOrderFlag" expr="'N'"/>
    <util:var name="mailOrderNewFlag" expr="'N'"/>
    <util:var name="mailOrderRefillFlag" expr="'N'"/>
    <util:var name="mailOrderStatusFlag" expr="'N'"/>
    <util:var name="mailOrderBalanceAndPaymentFlag" expr="'N'"/>
    <util:var name="pharmacyMemberInfoFlag" expr="'N'"/>
    <util:var name="rejectCodesFlag" expr="'N'"/>
    <util:var name="paStatusMemberFlag" expr="'N'"/>
    <util:var name="paStatusPharmacyFlag" expr="false"/>
    <util:var name="paStatusPhysicianFlag" expr="false"/> 
    <util:var name="paStatusFilterSilentAuthFlag" expr="false"/>
    <util:var name="medPartDEligibleFlag" expr="'N'"/>
    <util:var name="egwpFilterFlag" expr="''"/>
    <util:var name="authMemberFlag" expr="''"/>
    <util:var name="authPharmacyFlag" expr="''"/>
    <util:var name="authPhyscianFlag" expr="''"/>
    <util:var name="ivrExitPriceQuoteFlag" expr="''"/>
    <util:var name="somethingElseFlag" expr="''"/>
    <util:var name="somethingElseFlagMember" expr="''"/>
    <util:var name="somethingElseFlagPharmacy" expr="''"/>
    <util:var name="bieBypassFlag" expr="''"/>
    <util:var name="vocSurveyFlag" expr="''"/>
    <util:var name="paIVRSpecialtyFlag" expr="''"/>

    <!-- Application Prompt variables -->
    <util:var name="memberPrompt" expr="''" />
    <util:var name="pharmacyPrompt" expr="''" />
    <util:var name="physicianPrompt" expr="''" />
    <util:var name="memberSomethingElsePrompt" expr="''" /> 
    <util:var name="pharmacySomethingElsePrompt" expr="''" /> 

    <!-- Application Prompt variables - Not Implemented -->
    <util:var name="mailOrderPrompt" expr="''" /> 
    <util:var name="paStatusPrompt" expr="''" /> 
    <util:var name="eligibilityPrompt" expr="''" />    
    <!--End  Application TFN Profile variables -->
    
    <util:var name="paNewRequestPrompt" expr="''" /> 

    <!-- Main Menu Variables -->    
    <util:var name="callerId" expr="''" />
    <util:var name="callerIdType" expr="''" />
    <util:var name="carrierID" expr="0"/>
    <util:var name="accountID" expr="0"/>
    <util:var name="groupID" expr="0"/>    

    <!-- Authentication Variables -->    
    <util:var name="memberNumber" expr="undefined"/>  
    <util:var name="dateOfBirth" expr="''"/>
    <util:var name="npiNumber" expr="undefined"/> 
    <util:var name="ncpdpNumber" expr="undefined"/>
    <util:var name="rxNumber" expr="undefined"/>
    <util:var name="zipCode" expr="undefined"/>
    <util:var name="phoneNumber" expr="undefined"/>
    <util:var name="authenticated" expr="false"/>
    <util:var name="authStatus" expr="undefined"/>
    <util:var name="isFirstAuthentication" expr="true"/>
    <util:var name="needAnotherMember" expr="false"/>
    <util:var name="gotoGetZip" expr="false"/>
    <util:var name="rxClaimNumber" expr="0"/>
    <util:var name="patientNumber" expr="0"/>

    <!--Required for auth mail-->
    <util:var name="rxAndDobAttempts" expr=""/>
    <util:var name="zipAttempts" expr=""/>
    <util:var name="collectedZipCode" expr="''"/>
    <util:var name="rxOrDobChanged" expr="false"/>
    <util:var name="zipConfirmed" expr="undefined"/>
    <util:var name="dateOfBirthConfirmed" expr="undefined" />

    <!--Required for auth claim-->
    <util:var name="backendZipCode" expr="''"/>
    <util:var name="backendDateOfBirth" expr="''"/>
    <util:var name="numberOfMemberNumbersFound" expr="0"/>
    <util:var name="memberNumbers" expr="''"/>
    <util:var name="memberNumberFound" expr="false"/>
    <util:var name="firstName" expr="''"/>
    <util:var name="formattedFirstName" expr="''" />
    <util:var name="state" expr="''"/>
    <util:var name="collectedState" expr="''"/>
    <util:var name="npiAttempts" expr="0"/>
    <util:var name="isValidNPI" expr="false" />
    <util:var name="cameFromConfirmNPI" expr="''"/>
    <util:var name="collectedFirstName" expr="'false'"/>
    <util:var name="canIVRDisambiguate" expr="''" />
    <util:var name="numberOfLastNamesFound" expr="0"/>
    <util:var name="lastNameList" expr="''"/>
    <util:var name="lastName" expr="''"/>
    <util:var name="numberOfFirstNamesFound" expr="0"/>
    <util:var name="firstNameList" expr="''"/>
    <util:var name="isAmbiguous" expr="''"/>
    <util:var name="isMoreOrders" expr="false" />
    <util:var name="memberFirstName" expr="''" />
    <util:var name="lastOrder" expr="false" />
    <util:var name="numberOfPrescriptions" expr="0" />
    <util:var name="medicarePartD" expr="'N'"/>
    <util:var name="returnCode" expr="''"/>
    <util:var name="ucidTransferData" expr="''"/>
    <util:var name="willTransfer" expr="''"/>
    <util:var name="tempRxNumber" expr="''"/>
    <util:var name="spanishNeedRxClaimTransfer" expr="false"/>
    <util:var name="vocSurveySelection" expr="'N'"/>
    
    <util:var name="paSpecialtySelection" expr="'N'"/>
     

    <!-- Member Processing Variables -->    
    <util:var name="bin" expr="''"/>
    <util:var name="pcn" expr="''"/>
    <util:var name="groupNumber" expr="''"/> 

    <!-- Application variables-->
    <util:var name="transferPrompt" expr="''"/>  
    <util:var name="selectedLanguage" expr="'english'"/>
    <util:var name="agentRequestTreatment" expr="'reprompt'"/>
    <util:var name="task" expr="''"/>
    <util:var name="authenticationDBType" expr="undefined" />   
    <util:var name="saidDontKnowInAuth" expr="false"/>   

    <!-- Agent Request Variables -->    
    <util:var name="logicTransferReason" expr="''"/>
    <util:var name="agentRequestCount" expr="0"/>

    <!-- Dead Code Variables To Be Removed -->
    <util:var name="saveCallerANI" expr="'N'"/> 
    <util:var name="SaveCallerANIFlag" expr="'N'"/>   
    <util:var name="isSaveCallerANIEnabled" expr="false"/>
    <util:var name="usedAniAuth" expr="false"/>


    <!-- Mail Order Variables -->    
    <util:var name="orderStatus" expr="''" />
    <util:var name="isAddingNewCard" expr="false"/>
    <util:var name="isPreferredCardSelected" expr="false"/>
    <util:var name="newCCNumber" expr="''"/>
    <util:var name="newExpDate" expr="''"/>
    <util:var name="selectedCardIndex" expr="'notset'"/>
    <util:var name="shippingMethod" expr="''"/>
    <util:var name="isMemberIRIS" expr="'false'"/>
    <util:var name="validCreditcardAvailable" expr="''"/>
    <util:var name="isColdPackOnOrder" expr="false"/>
    <util:var name="cannotRefillReason" expr="''"/>
    <util:var name="floorLimit" expr="''"/>
    <util:var name="streetNumber" expr="''"/>
    <util:var name="isPreferredCardOnAccount" expr="''"/>
    <util:var name="isPreferredCardExpired" expr="''"/>
    <util:var name="preferredCreditCardType" expr="''"/>
    <util:var name="preferredCreditCardLast4" expr="''"/>
    <util:var name="numberOfAdditionalCardsOnFile" expr="''"/>
    <util:var name="numberOfRefillsOnOrder" expr="''"/>
    <util:var name="isAdditionalCardsExpired" expr="''"/>
    <util:var name="additionalCardsType" expr="''"/>
    <util:var name="additionalCardsLast4" expr="''"/>
    <util:var name="creditOnAccount" expr="''"/>
    <util:var name="cardHolder" expr="'false'" />
    <util:var name="lastDM" expr="''"/>
    <util:var name="returnNextOrder" expr="'notset'"/>
    <util:var name="refillEndPrompt" expr="''"/>
    <util:var name="broadcastTransferPrompt" expr="''"/>
    <util:var name="nextRefillDate" expr="''"/>
    <util:var name="reasonCode" expr="'No_Selection'"/>  
    <util:var name="refillTransfer" expr="false"/>
    <util:var name="hffTask" expr="''"/>
    <util:var name="selectedCreditCardInfo" expr="new Object()"/>
    <util:var name="creditCardTransfer" expr="false"/>
    <util:var name="addressTransfer" expr="false"/>
    <util:var name="addressReason" expr="''"/>
    <util:var name="shipAddressInfo" expr="new Object()"/>
    <util:var name="postalAddressList" expr="new Object()"/>
    <util:var name="orderTransfer" expr="false"/>
    <util:var name="refillReason" expr="''"/>
    <util:var name="refillAlerts" expr="undefined"/>
    <util:var name="backendRefillAlerts" expr="undefined"/>   
    <util:var name="rxInfoList" expr="undefined"/>   
    <util:var name="creditCardReason" expr="''"/>      
    <util:var name="rxNumCounter" expr="-1"/>
    <util:var name="isFirstEntryCheckRxInfo" expr="true"/>
    <util:var name="isFirstEntryAskDupSpeakCodes" expr="true"/>
    <util:var name="estimatedOrderTotal" expr="0"/>
    <util:var name="isFirstEntryAddRxToOrder" expr="true"/>    
    <util:var name="newRxCounter" expr="-1"/> 
    <util:var name="newRxList" expr="new Object()"/>
    <util:var name="returnToConfirm" expr="true"/>   
    <util:var name="orderReason" expr="''"/>
    <util:var name="actualAmountCharged" expr="undefined"/>
    <util:var name="shipmentType" expr="''"/>
    <util:var name="isFirstEntryPlayOrderDetails" expr="true"/>  
    <util:var name="patientHFFFlag" expr="''"/>
    <util:var name="creditCardList" expr="undefined"/>	 
    <util:var name="isFirstEntryRecapOrder" expr="true"/>  
    <util:var name="removeRx" expr="false"/>  
    <util:var name="jsonNewRxList" expr="''"/>  
    <util:var name="validDrugNames" expr="''"/>  
    <util:var name="isAddedJsonTagsToNewRxList" expr="false"/>  
    <util:var name="isEncodedNewRxList" expr="false"/>  	
    <util:var name="orderConfirmNum" expr="''"/> 
    <util:var name="numRxAvailableForRefill" expr="0"/> 
    <util:var name="drugPrompt" expr="''"/> 
    <util:var name="jsonShipAddressInfo" expr="''"/>
    <util:var name="jsonSelectedCreditCardInfo" expr="''"/>
    <util:var name="numberOfShipments" expr="''"/>
    <util:var name="transferLookup" expr="''"/>
    <util:var name="drugTTS" expr="''"/>
    <util:var name="orderStatusFlag" expr="''"/>
    <util:var name="saidNoPatientHFFEnroll" expr="false"/>

    <!--Required for order status-->
    <util:var name="numberOfOrders" expr="0" />
    <util:var name="orderNumber" expr="''" />
    <util:var name="carrierName" expr="''" />
    <util:var name="shipMethod" expr="''" />
    <util:var name="shipDate" expr="''" />
    <util:var name="trackingNumber" expr="''" />
    <util:var name="receivedDate" expr="''" />
    <util:var name="releaseDate" expr="''" />
    <util:var name="workQueue" expr="''" />
    <util:var name="actionableAlertType" expr="''" />
    <util:var name="heardOrderDetails" expr="'false'" />
    <util:var name="creditCardNum" expr="''" />
    <util:var name="creditCardExpDate" expr="''" />
    <util:var name="accountBalance" expr="''" />
    <util:var name="chargeNumber" expr="''" />
    <util:var name="address1List" expr="''" />
    <util:var name="address2List" expr="''" />
    <util:var name="cityList" expr="''" />
    <util:var name="stateList" expr="''" />
    <util:var name="zipCodeList" expr="''" />
    <util:var name="streetNumberList" expr="''" />
    <util:var name="expiredOrDeclinedCardIndex" expr="''"/>
    <util:var name="hasActionableAlert" expr="'false'" />
    <util:var name="actionableAlertEndPrompt" expr="''"/>
    <util:var name="hasOutstandingBalance" expr="'false'"/>
    <util:var name="doneWithBalanceAndPayment" expr="'false'"/>
    <util:var name="OUTSTANDING_BALANCE" expr="'OUTSTANDING_BALANCE'" />
    <util:var name="CREDIT_CARD_DECLINED" expr="'CREDIT_CARD_DECLINED'" />
    <util:var name="CREDIT_CARD_EXPIRED" expr="'CREDIT_CARD_EXPIRED'" />
    <util:var name="ADDRESS_VERIFICATION" expr="'ADDRESS_VERIFICATION'" />
    <util:var name="BENEFIACIARY_CONSENT" expr="'BENEFIACIARY_CONSENT'" />

    <!-- Required for proactive rejected claims -->
    <util:var name="proactiveRejectedClaimCheck" expr="false" />
    <util:var name="proactiveRejectedClaimStatus" expr="undefined" />
    <util:var name="numberOfProactiveClaimsFound" expr="0" />

    <util:var name="aniMatchFound" expr="''"/>
    <util:var name="askProviderNPI" expr="'true'" />
    <util:var name="rxClaim_authenticationType" expr="undefined" />
    <util:var name="pharmacyNPIFound" expr="undefined" />
    <util:var name="physicianNPIFound" expr="undefined" />
    <util:var name="memberFound" expr="undefined" />
    <util:var name="memberInformation" expr="undefined" />
    <util:var name="providedZip" expr="undefined"/>
    <util:var name="providedTN" expr="undefined"/>
    <util:var name="providedDOB" expr="undefined"/>
    <util:var name="patientID" expr="undefined"/>
    <util:var name="proactiveAlertType" expr="undefined"/>
    <util:var name="rxNumberList" expr="''"/>    
    <util:var name="saidMoreInfoOnRx" expr="false"/>
    <util:var name="providedLastName" expr="undefined"/>
    <util:var name="firstEntryAuthFlow" expr="true"/>
	<!--Mike L added back -->
 	<util:var name="suppressRefillAtMenu" expr="false"/>  
 	
 	 <util:var name="dupAddedRxList" expr="''"/> 
 	  
 	  


    <!-- 
        VoiceXML parameters TODO verify the following 
         example: bargein setting
         <property name="bargein" value="true"/>
    -->
    <!-- NAS created app root properties and variables --> 
    <!--$app_properties_and_variables-->
    <!-- Event handling variables  -->
    <util:var name="eventCount" expr="0"/>

    <util:catch cond="eventCount == 0">

        
<!-- 
    //Constants for the Call outcome and the Exit reason.
    var AGENT_REQUEST = 'AGENT_REQUEST';
    var ANSWERING_MACHINE_LEFT_MESSAGE = 'ANSWERING_MACHINE_LEFT_MESSAGE';
    var ANSWERING_MACHINE_NO_MESSAGE = 'ANSWERING_MACHINE_NO_MESSAGE';
    var APP_ERROR = 'APP_ERROR';
    var APP_HUNG_UP = 'APP_HUNG_UP';
    var BUSINESS_RULE = 'BUSINESS_RULE';
    var BUSY = 'BUSY';
    var CALLER_HUNG_UP = 'CALLER_HUNG_UP';
    var COMPLETE = 'COMPLETE';
    var DB_FAILURE = 'DB_FAILURE';
    var MAX_ATTEMPTS = 'MAX_ATTEMPTS';
    var NETWORK_ERROR = 'NETWORK_ERROR';
    var NO_ANSWER = 'NO_ANSWER';
    var SPECIAL_INFORMATION_TONE = 'SPECIAL_INFORMATION_TONE';
    var TRANSFER = 'TRANSFER';
    var TRANSFER_IVR = 'TRANSFER_IVR';
    var UNKNOWN = 'UNKNOWN';
    var UNSUPPORTED_DEVICE_FAX = 'UNSUPPORTED_DEVICE_FAX';
-->
        
        
        <util:assign name="eventCount" expr="eventCount + 1"/>    
        <util:log>-- ** Event Caught: [<util:value expr="_event"/>] </util:log>
        <util:log>-- ** Event Message: [<util:value expr="_message"/>] </util:log>

            <util:if cond="_event == 'event.goodbye'" > 
            	<script>updateCallOutcomeReason(APP_HUNG_UP, COMPLETE);</script>  
                <util:submit next="EndCall.dvxml"/>
       
            <util:elseif cond="_event == 'event.nuance.dialog.ndm.maxnomatches' || _event == 'event.nuance.dialog.ndm.maxretries' || _event == 'event.nuance.dialog.ndm.maxretries' || _event == 'event.nuance.dialog.ndm.maxnoinputs' || _event == 'event.nuance.dialog.ndm.maxnotoconfirms'  || _event == 'event.nuance.dialog.ndm.maxturns' || _event == 'event.nuance.dialog.ndm.maxrepeats' || _event == 'event.nuance.dialog.ndm.maxhelps' "/>
                <util:assign name="transferPrompt" expr="'max_errors'"/>
                <script>updateCallOutcomeReason(TRANSFER, MAX_ATTEMPTS);</script>
                <util:submit next="Transfer.dvxml#tr0100_MedDandOtherChecks_DS" />
                
            <util:elseif cond="_event == 'event.nuance.operator'" />
                <util:assign name="transferPrompt" expr="'agent_request'"/>
                <util:log>-- ** Transfer Prompt: [<util:value expr="transferPrompt"/>]</util:log> 
                <script>updateCallOutcomeReason(TRANSFER, AGENT_REQUEST);</script>
                <util:submit next="Transfer.dvxml#tr0100_MedDandOtherChecks_DS"/>

            <util:elseif cond="_event == 'event.nuance.logic.transfer'"/>
                <util:log>-- ** Transfer Prompt: [<util:value expr="transferPrompt"/>]</util:log> 
                <script>updateCallOutcomeReason(TRANSFER, BUSINESS_RULE);</script>
                <util:submit next="Transfer.dvxml#tr0100_MedDandOtherChecks_DS"/>
                
            <util:elseif cond="_event == 'connection.disconnect.hangup'"/>
                <script>updateCallOutcomeReason(CALLER_HUNG_UP, COMPLETE);</script>        
                <util:submit next="EndCall.dvxml#ec0110_SetupContextBeforeHangup_DB"/>
                
            <util:elseif cond="_event == 'connection.disconnect.transfer'"/>
                <script>updateCallOutcomeReason(APP_HUNG_UP, COMPLETE);</script>        
                <util:submit next="EndCall.dvxm#ec0110_SetupContextBeforeHangup_DB"/>

            <util:elseif cond="_event == 'event.nuance.dialog.ndm.internalerror' || _event == 'event.nuance.dialog.ndm.no_matching_command_reco_option'  || _event == 'event.nuance.dialog.ndm.no_matching_success_reco_option' "/>
                <script>updateCallOutcomeReason(APP_HUNG_UP, APP_ERROR);</script>    
                <util:assign name="transferPrompt" expr="'system_error'"/>    
                  <util:log>-- ** Transfer Prompt: [<util:value expr="transferPrompt"/>]</util:log> 
                <script>updateCallOutcomeReason(TRANSFER, APP_ERROR);</script>
                <util:submit next="Transfer.dvxml#tr0100_MedDandOtherChecks_DS"/>
            <util:else />
                <util:assign name="transferPrompt" expr="'system_error'"/>
                <util:log>-- ** Transfer Prompt: [<util:value expr="transferPrompt"/>]</util:log> 
                 <script>updateCallOutcomeReason(TRANSFER, APP_ERROR);</script>
                <util:submit next="Transfer.dvxml#tr0100_MedDandOtherChecks_DS"/>
            </util:if>

    </util:catch>

    <util:catch cond="eventCount == 1">
        <util:assign name="eventCount" expr="eventCount + 1"/>    
        <util:if cond="_message != undefined &amp;amp;&amp;amp; _message != ''">
            <script>
                trackErrorAndMessageNoStateID(_event, _message);
            </script>
            <util:else/>
            <script>
                trackErrorNoStateID(_event);
            </script>
        </util:if>
        <script>
            updateCallOutcomeReason(APP_HUNG_UP, APP_ERROR);
        </script>
        <exit />
    </util:catch>    

        <util:catch cond="eventCount &gt;= 1">
        <exit />
    </util:catch>    
</util:vxml>