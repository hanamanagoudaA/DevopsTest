<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/xml"%>
<%@ page import="java.net.URLDecoder"%>
<%@ page import="java.util.HashMap"%>
<%
String query1=(String)request.getQueryString();
query1 = URLDecoder.decode(query1,"UTF-8");
HashMap<String,String> parameterValue = new HashMap<String,String>();
if(query1!=null){
	query1=query1.concat(";");
	String[] chunks = query1.split(";");
	for(int i=0;i<chunks.length;i++){
		if(chunks[i].indexOf('=')>0){
			String[]keyValue = chunks[i].split("=");
			parameterValue.put(keyValue[0],keyValue[1]);
		}
	}
}


String sal=(String)parameterValue.get("secureanswerlist");
if ( sal == null ) {
	sal = "xxxabczzz";
}
%>
<grammar xml:lang="en-US" version="1.0" root="_secureanswerphrase" tag-format="swi-semantics/1.0">

<!--
   Copyright 2008 Nuance Communications, Inc.
   All Rights Reserved.

   Secure Answer Phrase grammar
-->
<rule id="_secureanswerphrase" scope="public">
<one-of>
<item><ruleref tag="SWI_meaning=Dontknow.V; dm_root=SWI_meaning;" uri="#Dontknow"/></item>
<item><ruleref tag="SWI_meaning=RightAnswer.V; dm_root=SWI_meaning;" uri="#RightAnswer" /></item>
<item><ruleref tag="SWI_meaning='Decoy'; dm_root=SWI_meaning;" uri="phoneloop.en-US.grxml" /></item>
</one-of>
</rule>

<rule id="Dontknow">
<one-of>
<item tag="V='dontknow'"> Dont know </item>
</one-of>
</rule>

<rule id="RightAnswer">
<one-of>
<% if (sal.indexOf("|") == -1)
{%>
<item tag="V='<%=sal%>'"> <%=sal%> </item>
<%}
else
{
    String[] saarray = null; 
    saarray=sal.split("\\|");
    for (int j=0; j<saarray.length; j++)
    {%>
<item tag="V='<%=saarray[j]%>'"> <%=saarray[j]%> </item>   
<%} }%>
</one-of>
</rule>
</grammar>