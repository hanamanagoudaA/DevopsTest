<%@page contentType="application/x-javascript"%>
<%@page import="com.nuance.framework.controller.constants.Constants"%>

<%
response.setHeader("Cache-Control", "no-cache");
response.setHeader("Pragma", "no-cache");
response.setDateHeader("Expires", 0);
String responseMap = (String)request.getAttribute(Constants.MAP_REQUEST_KEY);
// Please note that some platforms need an anchor object to
// be able to call eval() on the generated string, like this:
// response={}
// In such a case it has to be prepended, as of now there is
// no automatic handling of browsers except osb/cvp.
String json = responseMap;
%>

<%=json%>

