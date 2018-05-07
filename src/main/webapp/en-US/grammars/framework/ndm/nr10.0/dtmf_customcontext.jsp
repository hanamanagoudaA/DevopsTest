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
  
  CustomContext DTMF Grammar
-->
  
<grammar xml:lang="en-US" mode="dtmf" version="1.0" root="___ROOT___">
  <rule id="___ROOT___" scope="public">
     <one-of>
		<item tag="dm_root='payment';dm_confirmation_mode='NEVER';dm_confirm_string='make a payment';">1</item>
		<item tag="dm_root='accounts';dm_confirmation_mode='NEVER';dm_confirm_string='list accounts';">2</item>
		<item tag="dm_root='balance';dm_confirmation_mode='NEVER';dm_confirm_string='get my balance';">3</item>
    </one-of>
  </rule>
</grammar>