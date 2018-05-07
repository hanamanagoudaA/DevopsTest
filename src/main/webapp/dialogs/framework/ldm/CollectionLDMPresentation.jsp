<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ taglib uri="/WEB-INF/tld/ldm-service-collect.tld" prefix="ldm"%>
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
String submitType = LDMConstants.CONFIRM;
if("post".equalsIgnoreCase(method)){
	submitType = LDMConstants.SECURE_CONFIRM;
}
%>
<%@page import="com.nuance.framework.vxml.service.dialog.ldm.util.LDMConstants"%>
<util:vxml pageName="CollectionLDMPresentation.jsp" cacheable="true" rootRequired="true" root="LDMRoot">
	<ldm:ldmvars id="<%=id%>" stateId="<%=stateID%>"/>
    <cc:callCopyVars id="<%=id%>"/>
    
	<util:form id="Start_Form">
		<ldm:start id="<%=id%>" stateId="<%=stateID%>"/>
		<util:block>
			<cc:callCopyData id="<%=id%>" type="blackoutstart"/>
			<util:goto next="#Collection_Form"/>
		</util:block>
		<cc:callCopyCatch id="<%=id%>">
			<util:goto next="#Collection_Form"/>
		</cc:callCopyCatch>
  	</util:form>
  
	<util:form id="ReEnter_Form">
		<ldm:reentry id="<%=id%>" stateId="<%=stateID%>"/>
		<util:block>
			<util:goto next="#Collection_Form"/>
		</util:block>
	</util:form>
  
	<util:form id="Collection_Form">
		<util:var name="collectionLastResult"/>
		<ldm:main id="<%=id%>" stateId="<%=stateID%>"/>
		<util:block>
			<util:var name="value" expr="ldmObject.value"/>
			<util:if cond="validateLDMCollectionConfidenceHighLevel(ldmObject)==false">
				<util:var name="confirmPrompt" expr="ldmObject.confirmPrompt"/>
				<ldm:submit id="<%=id%>" type="<%=submitType%>" namelist="value confirmPrompt"/>
			<util:else/>
				<assign name="dialogStates.<%=stateID%>.hasPlayed" expr="true"/>
				<util:assign name="collectionLastResult" expr="getCollectionLastResult(ldmObject)"/>
				<cc:callCopyData id="<%=id%>" type="blackoutstop"/>     
				<util:return namelist="returnCode value dialogStates modelData collectionLastResult"/>
			</util:if>
		</util:block>
		<cc:callCopyCatch id="<%=id%>">
			<util:var name="value" expr="ldmObject.value"/>
			<util:return namelist="returnCode value dialogStates modelData collectionLastResult"/>
		</cc:callCopyCatch>
	</util:form>
</util:vxml>