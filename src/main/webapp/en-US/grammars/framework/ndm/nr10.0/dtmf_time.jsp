<?xml version="1.0" encoding="ISO-8859-1" ?>
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

<grammar xml:lang="en-US" mode="dtmf" version="1.0" root="_time" tag-format="swi-semantics/1.0">
<!--
   Copyright 2010 Nuance Communications, Inc.
   All Rights Reserved.

   Time DTMF grammar
-->

<meta name="swirec_compile_parser" content="1"/>

  <rule id="_time" scope="public">
    <item>
      <ruleref uri="#TIME_ABS" tag="
          HOUR=TIME_ABS.H;
          MINUTE=TIME_ABS.M;
          AMPM=(HOUR > 12 || HOUR == 0) ? 'h' : '?';
          QUALIFIER='exact';
	  if (HOUR==24) HOUR = '00';

          SWI_disallow = 0;
          var hm = parseInt (HOUR+MINUTE, 10);
          var mina = SWI_vars.minallowed ? SWI_vars.minallowed : '0000';
          var maxa = SWI_vars.maxallowed ? SWI_vars.maxallowed : '2359';
          mina = parseInt(mina, 10);
          maxa = parseInt(maxa, 10);
	  var hmpm;
          if (AMPM == '?') {
             hmpm = hm + 1200;
             if (hmpm &gt;= 2400) hmpm -= 2400;
             if ( (hm &lt; mina || hm &gt; maxa) &amp;&amp;
                  (hmpm &lt; mina || hmpm &gt; maxa)) SWI_disallow=1;

           /* if am/pm ambiguous but only fits one allowed range */
           /* make it unambiguous */
           /* It is not in AM range but is in PM range */
           if ( (hm &lt; mina || hm &gt; maxa) &amp;&amp;
                  !(hmpm &lt; mina || hmpm &gt; maxa)) 
               AMPM = 'p';
           /* vice-versa */
             else if ( !(hm &lt; mina || hm &gt; maxa) &amp;&amp;
                  (hmpm &lt; mina || hmpm &gt; maxa)) 
               AMPM = 'a';
          }
          else if (AMPM == 'a' || AMPM == 'h') {
             if (hm &lt; mina || hm &gt; maxa) SWI_disallow=1;
          }
          else if (AMPM == 'p') {
             hmpm = hm + 1200;
             if (hmpm &gt;= 2400) hmpm -= 2400;
             if (hmpm &lt; mina || hmpm &gt; maxa) SWI_disallow=1;
          }
          var minutes = 60 * parseInt (HOUR, 10) + parseInt (MINUTE);
          var grana = SWI_vars.granularityallowed;
          if (grana &amp;&amp; (minutes % grana != 0)) SWI_disallow=1;
          SWI_meaning = HOUR+MINUTE+AMPM;
          MEANING=SWI_meaning;
      "/>
    </item>
  </rule>
  <rule id="TIME_ABS">
    <ruleref uri="#H" tag="H=H.SWI_literal.replace(/ /g, '')"/>
    <ruleref uri="#M1" tag="M=M1.SWI_literal"/>
    <ruleref uri="#M2" tag="M+=M2.SWI_literal"/>
  </rule>
  
  <rule id="H">
    <one-of>
      <item>0 0</item>
      <item>0 1</item>
      <item>0 2</item>
      <item>0 3</item>
      <item>0 4</item>
      <item>0 5</item>
      <item>0 6</item>
      <item>0 7</item>
      <item>0 8</item>
      <item>0 9</item>
      <item>1 0</item>
      <item>1 1</item>
      <item>1 2</item>
      <item>1 3</item>
      <item>1 4</item>
      <item>1 5</item>
      <item>1 6</item>
      <item>1 7</item>
      <item>1 8</item>
      <item>1 9</item>
      <item>2 0</item>
      <item>2 1</item>
      <item>2 2</item>
      <item>2 3</item>
      <item>2 4</item>
    </one-of>
  </rule>
  <rule id="M1">
    <one-of>
      <item>0</item>
      <item>1</item>
      <item>2</item>
      <item>3</item>
      <item>4</item>
      <item>5</item>
    </one-of>
  </rule>
  <rule id="M2">
    <one-of>
      <item>0</item>
      <item>1</item>
      <item>2</item>
      <item>3</item>
      <item>4</item>
      <item>5</item>
      <item>6</item>
      <item>7</item>
      <item>8</item>
      <item>9</item>
    </one-of>
  </rule>
</grammar>



