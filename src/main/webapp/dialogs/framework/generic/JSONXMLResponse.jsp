<?xml version="1.0" encoding="UTF-8"?>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@ page session="false"%>
<%@page import="java.util.Map"%>
<%@page import="com.nuance.framework.controller.constants.Constants"%>
<%@page import="org.json.simple.JSONObject"%><response>
<%
response.setHeader("Cache-Control", "no-cache");
response.setHeader("Pragma", "no-cache");
response.setDateHeader("Expires", 0);
Map<String,Object> responseMap = (Map<String,Object>)request.getAttribute(Constants.MAP_REQUEST_KEY);

// Please note that some platforms need an anchor object to
// be able to call eval() on the generated string, like this:
// response={}
// In such a case it has to be prepended, as of now there is
// no automatic handling of browsers except osb/cvp.
String json = JSONObject.toJSONString(responseMap);
%>

<json><![CDATA[<%=json%>]]></json>
</response>