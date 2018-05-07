<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ taglib uri="/WEB-INF/tld/ldm-service-confirm.tld" prefix="ldm"%>
<%@ taglib uri="/WEB-INF/tld/ldm-callcopy.tld" prefix="cc"%>
<%@page contentType="text/xml" %>
<% 
String id = (String) request.getAttribute("id");
if (id == null) {
    id = "The ldm ID passed in the request was null or empty. id:["+id+"].";
}

String stateID = (String)request.getParameter(id+"StateID");
  
if( (stateID==null) || ("".equals(stateID)) ) {
    stateID = id;
}

String method = request.getMethod();
String submitType = LDMConstants.COLLECT;
if("post".equalsIgnoreCase(method)){
	submitType = LDMConstants.SECURE_COLLECT;
}
%>
<%@page import="com.nuance.framework.vxml.service.dialog.ldm.util.LDMConstants"%>
<util:vxml pageName="ConfirmationLDMPresentation.jsp" cacheable="false" rootRequired="true" root="LDMRoot">
	<ldm:ldmvars id="<%=id%>" stateId="<%=stateID%>" namelist="value confirmPrompt"/>
	<cc:callCopyVars id="<%=id%>"/>

	<util:form id="Start_Form">
		<ldm:start id="<%=id%>" stateId="<%=stateID%>"/>
		<util:block>
			<util:goto next="#Confirmation_Form"/>
		</util:block>
	</util:form>
  
	<util:form id="Confirmation_Form">
		<util:var name="collectionLastResult"/>
		<util:var name="confirmationLastResult"/>
		<ldm:main id="<%=id%>" stateId="<%=stateID%>"/>
		<util:block>
			<util:if cond="ldmObject.confirmValue == &apos;no&apos;">
				<ldm:submit id="<%=id%>" type="<%=submitType%>" next="ReEnter_Form"/>
			<util:else/>				
				<util:var name="value" expr="ldmObject.value"/>
				<assign name="dialogStates.<%=stateID%>.hasPlayed" expr="true"/>
				<util:assign name="collectionLastResult" expr="getCollectionLastResult(ldmObject)"/>
				<util:assign name="confirmationLastResult" expr="getConfirmationLastResult(ldmObject)"/>
				<cc:callCopyData id="<%=id%>" type="blackoutstop"/>
				<util:return namelist="returnCode value dialogStates modelData collectionLastResult confirmationLastResult"/>
			</util:if>
		</util:block>
		<cc:callCopyCatch id="<%=id%>">
			<util:var name="value" expr="ldmObject.value"/>
			<util:return namelist="returnCode value dialogStates modelData collectionLastResult confirmationLastResult"/>
		</cc:callCopyCatch>
	</util:form>
</util:vxml>