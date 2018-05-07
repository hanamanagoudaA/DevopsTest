<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ taglib uri="/WEB-INF/tld/ldm-service-confirm.tld" prefix="cldm"%>
<%@ taglib uri="/WEB-INF/tld/ldm-service.tld" prefix="ldm"%>
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

String ldmMethod = request.getMethod();
%>
<%@page import="com.nuance.framework.vxml.service.dialog.ldm.util.LDMConstants"%>
<util:vxml pageName="ConfirmationSubdialogLDMPresentation.jsp" cacheable="true" rootRequired="false">
	<ldm:ldmEcma/>
    
    <util:var name="returnCode" expr="0" />
    <util:var name="event" expr="''" />
    <util:var name="message" expr="''" />
    <util:var name="ldmObject" expr="new Object()"/>
	<util:var name="isValueConfirmed" expr="false"/>
	
	<% if("get".equalsIgnoreCase(ldmMethod)){%>
		<util:var name="value" expr="''"/>
		<util:var name="confirmPrompt" expr="''"/>
	<%}%>
	
	<cldm:ldmvars id="<%=id%>" stateId="<%=stateID%>"/>	

	<util:form id="Start_Form">
		<cldm:startsub id="<%=id%>" stateId="<%=stateID%>"/>
		<util:block>
			<util:goto next="#Confirmation_Form"/>
		</util:block>
	</util:form>
  
	<util:form id="Confirmation_Form">
		<cldm:main id="<%=id%>" stateId="<%=stateID%>"/>
		<util:block>			
			<util:if cond="ldmObject.confirmValue == &apos;no&apos;">
				<util:assign name="isValueConfirmed" expr="false"/>
			<util:else/>				
				<util:assign name="isValueConfirmed" expr="true"/>
			</util:if>
			<util:return namelist="returnCode dialogStates modelData isValueConfirmed ldmObject"/>
		</util:block>
	</util:form>
  
  	<util:catch>
        <util:assign name="returnCode" expr="1" />
        <util:assign name="event" expr="_event" />
        <util:assign name="message" expr="_message" />
        <util:if cond="message == null">
            <util:assign name="message" expr="'An event was thrown while processing the dialog.'" />
        </util:if>
        <util:if cond="ldmObject.event==undefined || ldmObject.event==''">
            <script>updateLDMEvent(ldmObject, event, message);</script>
        </util:if>
        <script>trackLDMEvent(ldmObject);</script>
        <util:return namelist="returnCode modelData event message dialogStates ldmObject" />
    </util:catch>
</util:vxml>