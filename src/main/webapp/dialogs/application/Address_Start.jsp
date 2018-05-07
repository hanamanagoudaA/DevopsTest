<?xml version="1.0"?>
<%@ page contentType="text/xml;charset=UTF-8" %> 
<%@ taglib uri="/WEB-INF/tld/ivr-stats.tld" prefix="rtst" %>
<%@ taglib uri="/WEB-INF/tld/audio-service.tld" prefix="as" %>
<%@ taglib uri="/WEB-INF/tld/data-access-service.tld" prefix="das" %>
<%@ taglib uri="/WEB-INF/tld/ndm-addon-service.tld" prefix="dm"%>
<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ taglib uri="/WEB-INF/tld/node-log-utils.tld" prefix="node"%>
<%@ taglib uri="/WEB-INF/tld/decision-log-utils.tld" prefix="decision"%>
<%@ taglib uri="/WEB-INF/tld/calllog-utils.tld" prefix="cl"%>

<util:vxml pageName="Address_Start.jsp" cacheable="true" rootRequired="true">
<!-- This jsp represents technical group - M05_Address_Start.
     Author 	 : author
     Description : default start group
     Comment     : Start group
     List of nodes/states in this jsp :
    ad1010_CheckAddressReason_DS	
	ad2010_HasAddressOnFile_DS
	ad2015_AskVerifyAddressYN_DM
	ad2020_HasASecondAddress_DS
	ad2025_OfferSecondAddressYN_DM
-->
<%

%>
	<!--State start - ad1010_CheckAddressReason_DS-->
	<util:form id="ad1010_CheckAddressReason_DS" >
		<util:block name="ad1010_CheckAddressReason_DSBlock" >
			<decision:start stateId="ad1010_CheckAddressReason_DS" />
		</util:block>
		<util:block>
			<util:if cond="addressReason == 'shipping'">
				<decision:end stateId="ad1010_CheckAddressReason_DS"  label="Shipping" />
				<util:goto next="#ad2010_HasAddressOnFile_DS" />
			<util:else/>
				<!-- TODO this to be added in later cycles  -->
				<!-- for now return back to calling dialog -->
				<decision:end stateId="ad1010_CheckAddressReason_DS"  label="Alert" />
				<util:goto next="#ReturnToCallingDialog" />
			</util:if>
		</util:block>
	</util:form>
	
<!--State start - ad2010_HasAddressOnFile_DS-->
	<util:form id="ad2010_HasAddressOnFile_DS" >
		<util:block name="ad2010_HasAddressOnFile_DSBlock" >
			<decision:start stateId="ad2010_HasAddressOnFile_DS" />
		</util:block>
		<util:block>
			<util:if cond="postalAddressList == undefined || postalAddressList.length == 0 || 
							(postalAddressList.length == 1 &amp;&amp; postalAddressList[0].isUSPSValidated != 'true') ||
							 (postalAddressList.length == 2 &amp;&amp; postalAddressList[0].isUSPSValidated != 'true' &amp;&amp; postalAddressList[1].isUSPSValidated != 'true')">
				<util:assign name="addressTransfer"  expr="true" />
				<util:assign name="transferPrompt"  expr="'new_address'" />
				<decision:end stateId="ad2010_HasAddressOnFile_DS"  label="no address on file" />
				<goto next="#ReturnToCallingDialog"/>
			<util:else/>
				<decision:end stateId="ad2010_HasAddressOnFile_DS"  label="Has at least 1 address on file" />
				<util:goto next="#ad2015_AskVerifyAddressYN_DM" />
			</util:if>
		</util:block>
	</util:form>

	<!--State start - ad2015_AskVerifyAddressYN_DM-->
	<util:form id="ad2015_AskVerifyAddressYN_DM">
		<util:var name="streetNumber" expr="''" />
		<util:var name="zipCode" expr="''" />
		<util:block name="ad2015_AskVerifyAddressYN_DMBlock">
			<node:start name="ad2015_AskVerifyAddressYN_DM" />
		</util:block>
		<util:block>
			<util:assign name="streetNumber" expr="postalAddressList[0].houseNumber" />
			<util:assign name="zipCode" expr="postalAddressList[0].zipCode" />
		</util:block>
		<dm:ndm id="ad2015_AskVerifyAddressYN_DM"
			audionamelist="callerType streetNumber zipCode">
			<dm:success>
				<dm:recoOption value="true" form="ReturnToCallingDialog">
					<util:assign name="shipAddressInfo" expr="postalAddressList[0]" />
				</dm:recoOption>
				<dm:recoOption value="false" form="ad2020_HasASecondAddress_DS">
				</dm:recoOption>
			</dm:success>
			<dm:command>
				<dm:recoOption value="operator">
					<util:throw event="event.nuance.operator" message="'agent_request'" />
				</dm:recoOption>
			</dm:command>
		</dm:ndm>
	</util:form>

	<!--State start - ad2020_HasASecondAddress_DS-->
	<util:form id="ad2020_HasASecondAddress_DS" >
		<util:block name="ad2020_HasASecondAddress_DSBlock" >
			<decision:start stateId="ad2020_HasASecondAddress_DS" />
		</util:block>
		<util:block>
			<util:if cond="postalAddressList.length == 2 &amp;&amp; postalAddressList[1].isUSPSValidated == 'true' &amp;&amp; postalAddressList[1].houseNumber != postalAddressList[0].houseNumber">
				<decision:end stateId="ad2020_HasASecondAddress_DS"  label="Has second address" />
				<goto next="#ad2025_OfferSecondAddressYN_DM"/>
			<util:else/>
				<decision:end stateId="ad2020_HasASecondAddress_DS"  label="No second address" />
				<util:assign name="addressTransfer"  expr="true" />
				<util:assign name="transferPrompt"  expr="'new_address'" />
				<util:goto next="#ReturnToCallingDialog" />
			</util:if>
		</util:block>
	</util:form>	

	<!--State start - ad2025_OfferSecondAddressYN_DM-->
	<util:form id="ad2025_OfferSecondAddressYN_DM" >
		<util:var name="streetNumber" expr="''"/>
		<util:var name="zipCode" expr="''"/>
		<util:block name="ad2025_OfferSecondAddressYN_DMBlock" >
			<node:start name="ad2025_OfferSecondAddressYN_DM" />
		</util:block>
		<util:block>
			<util:assign name="streetNumber" expr="postalAddressList[1].houseNumber"/>
			<util:assign name="zipCode" expr="postalAddressList[1].zipCode"/>
		</util:block>
		<dm:ndm id="ad2025_OfferSecondAddressYN_DM" audionamelist="callerType streetNumber zipCode">
			<dm:success>
				<dm:recoOption value="true" form="ReturnToCallingDialog" >
					<util:assign name="shipAddressInfo"  expr="postalAddressList[1]" />
	       	 </dm:recoOption>
             <dm:recoOption value="false"  form="ReturnToCallingDialog" >
             	<util:assign name="addressTransfer"  expr="true" />
                <util:assign name="transferPrompt"  expr="'new_address'" />
             </dm:recoOption>
            </dm:success>
            <dm:command>
                <dm:recoOption value="operator">
                    <util:throw event="event.nuance.operator" message="'agent_request'" />
                </dm:recoOption>
            </dm:command>
		</dm:ndm>
	</util:form>
	
	<!--State start - ReturnToCallingDialog-->
    <util:form id="ReturnToCallingDialog" >
      <util:block name="ReturnToCallingDialogBlock" >
      	<node:start name="ReturnToCallingDialog_return" />
      </util:block>
      <util:block>
      	<util:log>Return from Address subdialog</util:log>
        <util:submit expr="getReturnLink()"/>
      </util:block>
    </util:form> 
</util:vxml>