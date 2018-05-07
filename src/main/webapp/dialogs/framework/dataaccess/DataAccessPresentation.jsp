<?xml version="1.0"?>
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml">
<%@page contentType="text/xml; charset=UTF-8"%>    
<%@page session="false"%>
<%@taglib prefix="ds" uri="/WEB-INF/tld/data-access-service.tld"%>
<%
response.setHeader("Cache-Control", "no-cache");
response.setHeader("Pragma", "no-cache");
response.setDateHeader("Expires", 0);
response.setContentType("text/xml");
%>
<%
    String namelist = (String) request.getParameter("namelist");
%>

    <ds:setDataAccessVars/>
    <ds:setDataAccessAssigns/>
    
    <form id="data">
        <block>
            <ds:setDataAccessReturn namelist="<%=namelist%>"/>
        </block>
    </form>
    
    <catch>
        <var name="event" expr="_event" />
        <var name="message" expr="_message" />
        
        <if cond="message == null || message == ''">
            <assign name="message" expr="'An event was thrown while processing the data access.'" />
        </if>
        
        <return eventexpr="event" messageexpr="message"/>
    </catch>
</vxml> 