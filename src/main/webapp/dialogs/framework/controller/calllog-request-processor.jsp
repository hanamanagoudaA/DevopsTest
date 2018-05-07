<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@page contentType="text/xml"%>
<%@page session="false"%>
<%@page import="com.nuance.framework.controller.requestprocessor.calllog.*"%>
<%@page import="java.util.HashMap"%>

<vxml version="2.0" xmlns="http://www.w3.org/2001/vxml">
    <form id="CallLogRequestProcessor">
        <%
        String VarDecl = CalllogRequestProcessor.genVxmlVarDecl((HashMap)request.getAttribute(CalllogRequestProcessor.VIEW_RETURN_HM_KEY));
        String VarList = CalllogRequestProcessor.genVxmlVarList((HashMap)request.getAttribute(CalllogRequestProcessor.VIEW_RETURN_HM_KEY));
        %>        
    
        <block>
           <%=VarDecl%>    
           <%if (null == VarList || VarList.equals("")) { %>
                <return/>           
           <%} else { %>        
                <return namelist="<%=VarList%>"/>
           <%} %>
        </block>
    </form>
</vxml>
