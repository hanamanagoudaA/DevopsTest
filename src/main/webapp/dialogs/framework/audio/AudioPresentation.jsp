<%@ page contentType="text/xml; charset=UTF-8"%>
<%@ page session="false"%>

<%@ taglib uri="/WEB-INF/tld/audio-service.tld" prefix="as"%>
<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>

<util:vxml pageName="AudioPresentation.jsp" cacheable="false" rootRequired="false">
    
<%
response.setHeader("Cache-Control", "no-cache");
response.setHeader("Pragma", "no-cache");
response.setDateHeader("Expires", 0);

String sentenceID = (String) request.getAttribute("id");
if (sentenceID == null) {
    sentenceID = "dynamic sentence id not set.";
}

String playState = (String) request.getParameter("playState");
if (playState == null)
    playState = "";

String calllogEventName = (String) request.getParameter("calllogEventName");
if (calllogEventName == null)
    calllogEventName = "";

String stateID = sentenceID;
if(sentenceID!=null) {
    String tempStateID = (String)request.getParameter(sentenceID+"StateID");
    if( (tempStateID!=null) && ("".equals(tempStateID)==false) ) {
        stateID = tempStateID;
    }
}
String contexturi = request.getContextPath();

String secure_context = (String) request.getAttribute("secure_context");
%>

    <script src="<%=contexturi%>/scripts/framework/model.es"/>
    <script src="<%=contexturi%>/scripts/framework/modelSupport.es"/>
    <script src="<%=contexturi%>/scripts/framework/states.es"/>
    <script src="<%=contexturi%>/scripts/framework/serviceutils.es"/>
    <script>
        var modelfactory = new ModelFactory();
        var modelData = modelfactory.createModel();
        var modelsupport = new ModelSupport(modelData);
		var model = modelData;
    </script>
    
    <var name="returnCode" expr="0"/>
    <var name="event" expr="''"/>
    <var name="message" expr="''"/>
    
    <as:requestvars/>

    <form id="AudioReturnForm">
        <% if (secure_context!=null) { %>
        <property name="switts.secure_context" value="<%= secure_context %>"/>
        <% } %>
        <block>
            <as:audio id="<%=sentenceID %>" stateId="<%=stateID %>" playState="<%=playState %>" calllogEventName="<%=calllogEventName %>" />
            <return namelist="returnCode modelData" />
        </block>
    </form>
    
    <catch>
        <assign name="returnCode" expr="1" />
        <assign name="event" expr="_event" />
        <assign name="message" expr="_message" />
        
        <if cond="message == null || message == ''">
            <assign name="message" expr="'An event was thrown while processing the audio.'" />
        </if>
        <return namelist="returnCode modelData event message" />
    </catch>
</util:vxml>