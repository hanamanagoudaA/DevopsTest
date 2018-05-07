<%@ taglib uri="/WEB-INF/tld/dtmf-service.tld" prefix="dtmf"%>
<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>

<%
    String id = (String) request.getAttribute("id");
    if (id == null) {
        id = "The dtmf input ID passed in the request was null or empty. id:["+id+"].";
    }
    
    String menuOptionsString = (String)request.getParameter(id+ServiceContext.MENU_OPTIONS_KEY);
    if(menuOptionsString==null) {
        menuOptionsString = "";
    }

    String stateID = (String)request.getParameter(id+"StateID");
    String dynamicStateIDString = (String)request.getParameter(id+"DynamicStateID");
    if( (dynamicStateIDString!=null) && ("".equals(dynamicStateIDString)==false) ) {
        stateID = dynamicStateIDString;
    }
    
    if( (stateID==null) || ("".equals(stateID)) ) {
        stateID = id;
    }
%>
<%@page import="com.nuance.framework.vxml.service.ServiceContext"%>
<util:vxml pageName="DtmfInputPresentation.jsp" cacheable="false" rootRequired="false">
    <!-- model scripts -->
    <util:ecma id="framework/vistamodel.es" />
    <util:ecma id="framework/vistamodelSupport.es" />
    <util:ecma id="framework/vistaserviceutils.es" />
    <util:ecma id="framework/vistadtmfserviceutils.es" />
    
    <util:var name="returnCode" expr="0" />
    <util:var name="value" expr="undefined" />
    <util:var name="event" expr="''" />
    <util:var name="message" expr="''" />
    <dtmf:requestvars/>

    <util:form id="StartDtmfInputPresentation">
        <dtmf:presentationDtmfInput id="<%=id%>" stateId="<%=stateID%>" menuOptions="<%=menuOptionsString%>"/>
        <util:block>
            <util:return namelist="returnCode value modelData"/>
        </util:block>
    </util:form>
    
    <util:catch event="event.nuance.dialog">
        <util:assign name="returnCode" expr="3" />
        <util:assign name="event" expr="_event" />
        <util:assign name="message" expr="_message" />
        <util:if cond="message == null">
            <util:assign name="message" expr="'A dialog event was thrown while processing dynamic input dialog.'" />
        </util:if>
        <util:return namelist="returnCode modelData event message" />
    </util:catch>
    <util:catch event="connection.disconnect.hangup">
        <util:assign name="returnCode" expr="2" />
        <util:assign name="event" expr="_event" />
        <util:assign name="message" expr="_message" />
        <util:if cond="message == null">
            <util:assign name="message" expr="'A hangup event was thrown while processing dynamic input dialog.'" />
        </util:if>
        <util:return namelist="returnCode modelData event message" />
    </util:catch>
	<util:catch>
		<util:assign name="returnCode" expr="1" />
		<util:assign name="event" expr="_event" />
		<util:assign name="message" expr="_message" />
		<util:if cond="message == null">
			<util:assign name="message" expr="'An event was thrown while processing dynamic input dialog.'" />
		</util:if>
        <util:return namelist="returnCode modelData event message" />
	</util:catch>
</util:vxml>
