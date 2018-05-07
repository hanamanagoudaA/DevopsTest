<%@page contentType="application/x-javascript"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="java.util.Map"%>
<%@page import="com.nuance.framework.controller.constants.Constants"%>
<%
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Pragma", "no-cache");
  response.setDateHeader("Expires", 0);
  // This assumes that the evaluating platform needs an assignment
  // in front of a JSON object to make eval(...) work as is the
  // case on several platforms including Cisco/CVP.
  Map<String,Object> responseMap = (Map<String,Object>)request.getAttribute(Constants.MAP_REQUEST_KEY);
  String browser = Constants.BROWSER_DEFAULT;
  String tmpBrowser = (String)request.getAttribute(Constants.BROWSER_SETTING_KEY);
  if(tmpBrowser != null){
      browser = tmpBrowser;
  }
  String json = "";
  if(Constants.BROWSER_CVP.equals(browser)){
      json = "response=";
  }
  json += JSONObject.toJSONString(responseMap);
%>
<%=json%>

