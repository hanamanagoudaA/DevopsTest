<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>  
<%@ taglib uri="/WEB-INF/tld/audio-service.tld" prefix="as"%>
<%
String sentenceID = (String) request.getAttribute("id");
if (sentenceID == null) {
    sentenceID = "dynamic sentence id not set.";
}

String stateID = sentenceID;
if(sentenceID!=null) {
    String tempStateID = (String)request.getParameter(sentenceID+"StateID");
    if( (tempStateID!=null) && ("".equals(tempStateID)==false) ) {
        stateID = tempStateID;
    }
}

%>
<util:vxml pageName="DtmfInputPresentation.jsp" cacheable="false" rootRequired="false">
    
    <util:ecma id="framework/vistamodel.es" />
    <util:ecma id="framework/vistamodelSupport.es" />
    <util:ecma id="framework/vistaserviceutils.es" />
    
    <util:var name="returnCode" expr="0" />
    <util:var name="event" expr="''" />
    <util:var name="message" expr="''" />
    
    <as:requestvars/>

    <util:form id="AudioReturnForm">
        <util:block>
            <as:audio id="<%=sentenceID %>" stateId="<%=stateID %>" />
            <util:return namelist="returnCode modelData"/>
        </util:block>
    </util:form>
    
    <util:catch>
        <util:assign name="returnCode" expr="1" />
        <util:assign name="event" expr="_event" />
        <util:assign name="message" expr="_message" />
        <util:if cond="message == null">
            <util:assign name="message" expr="'An event was thrown while processing the audio.'" />
        </util:if>
        <util:return namelist="returnCode modelData event message" />
    </util:catch>
    
</util:vxml>