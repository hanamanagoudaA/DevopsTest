<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ taglib uri="/WEB-INF/tld/ldm-service.tld" prefix="ldm"%>
<%@page contentType="text/xml" %>
<util:vxml pageName="LDMRootPresentation.jsp" cacheable="true" rootRequired="false">
    <ldm:ldmEcma/>
    
    <util:var name="returnCode" expr="0" />
    <util:var name="event" expr="''" />
    <util:var name="message" expr="''" />
    
    <util:var name="ldmObject" expr="new Object()"/>
    <util:var name="paramMap" expr="new Object()"/>
    
    <util:property name="FETCHAUDIO" value="" />
    
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
        <util:return namelist="returnCode modelData event message dialogStates" />
    </util:catch>
    
</util:vxml>