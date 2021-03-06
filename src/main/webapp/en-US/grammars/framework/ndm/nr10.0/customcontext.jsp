<?xml version="1.0"?>
<%@ page language="java" contentType="text/xml"%>
<%@ page import="java.util.HashMap"%>

<%
String query1=(String)request.getQueryString();
HashMap<String,String> parameterValue = new HashMap<String,String>();
if(query1!=null){
	query1=query1.toLowerCase();
	query1=query1.concat(";");
	String[] chunks = query1.split(";");
	for(int i=0;i<chunks.length;i++){
		if(chunks[i].indexOf('=')>0){
			String[]keyValue = chunks[i].split("=");
			parameterValue.put(keyValue[0],keyValue[1]);
		}
	}
}
//String prefix =(String)parameterValue.get("prefix");

%>

<!--
  Copyright 2003-2004 ScanSoft, Inc.
  All Rights Reserved

  Understands yes, no, correct
-->

<!-- $Id: grammar_customcontext.xml,v 1.3 2004/08/04 21:27:17 badamczy Exp $ -->

<grammar xml:lang="en-US" version="1.0" root="___ROOT___">
  <rule id="___ROOT___" scope="public">
    <item>
      <ruleref tag="dm_root=CustomContext.dm_root;dm_confirmation_mode=CustomContext.dm_confirmation_mode;dm_confirm_string=CustomContext.dm_confirm_string;" uri="#CustomContext"/>
    </item>
  </rule>
  <rule id="CustomContext">
     <one-of>
		<item tag="dm_root='payment';dm_confirmation_mode='IF_NECESSARY';dm_confirm_string='make a payment';">make a payment</item>
		<item tag="dm_root='accounts';dm_confirmation_mode='IF_NECESSARY';dm_confirm_string='list accounts';">list accounts</item>
		<item tag="dm_root='balance';dm_confirmation_mode='IF_NECESSARY';dm_confirm_string='get my balance';">Get my balance</item>
     </one-of>
   </rule>
</grammar>


