<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/xml"%>
<%@ page import="java.util.HashMap"%>

<%
String query1=(String)request.getQueryString();
HashMap<String,String> parameterValue = new HashMap <String,String>();
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
<grammar version="1.0" xmlns="http://www.w3.org/2001/06/grammar"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.w3.org/2001/06/grammar
                             http://www.w3.org/TR/speech-grammar/grammar.xsd"
 xml:lang="en-US" mode="voice" root="_time">

<!--
   Copyright 2010 Nuance Communications, Inc.
   All Rights Reserved.

   Time grammar
   -->

   <meta name="maxspeechtimeout" content="10000"/>
   <meta name="incompletetimeout" content="1500"/>
   <meta name="swirec_compile_parser" content="1"/>
   <meta name="swirec_optimization" content="7"/> <!-- This makes it so the xml compilation level is the same as with sgc -->
   <meta name="swirec_user_dict_name" content="time.userdict"/>

   <rule id="_time" scope="public">
      <item repeat="0-1" repeat-prob="0.8">
         @hes@
      </item>
      <item>
      <ruleref uri="#TIME_ABS"/>
      <tag>           
          HOUR=TIME_ABS.H;
          MINUTE=TIME_ABS.M ? TIME_ABS.M : 0;
          AMPM=TIME_ABS.AMPM ? TIME_ABS.AMPM : '?';
          QUALIFIER=TIME_ABS.QUAL ? TIME_ABS.QUAL: 'exact';
          if (!TIME_ABS.SIGN) TIME_ABS.SIGN=1;
          if (TIME_ABS.SIGN == -1) {
             MINUTE=60-MINUTE; 
             HOUR--; if (HOUR==0) HOUR=12;
             if (AMPM == 'noon') AMPM = 'a';
             else if (AMPM == 'midnight') AMPM = 'p';
          }
          if (AMPM == 'midnight') AMPM = 'a';
	  else if (AMPM == 'noon') AMPM = 'p';
          HOUR = HOUR.toString();
          if (HOUR.length == 1) HOUR = '0' + HOUR;
          MINUTE = MINUTE.toString(); 
          if (MINUTE.length == 1) MINUTE = '0' + MINUTE;
          SWI_scoreDelta = 0;
          var hm = parseInt (HOUR+MINUTE, 10);
          var mina = SWI_vars.minallowed ? SWI_vars.minallowed : '0000';
          var maxa = SWI_vars.maxallowed ? SWI_vars.maxallowed : '2359';
          mina = parseInt(mina, 10);
          maxa = parseInt(maxa, 10);
          var mine = SWI_vars.minexpected ? SWI_vars.minexpected : '0000';
          var maxe = SWI_vars.maxexpected ? SWI_vars.maxexpected : '2359';
          mine = parseInt(mine, 10);
          maxe = parseInt(maxe, 10);
          var hmpm; /* hmpm is the 24-hour value of the time if its PM */ 
          if (AMPM == '?') {
             if (HOUR == 12) {
               hmpm = hm;
               hm = hmpm - 1200;
             }
             else {
               hmpm = hm + 1200;
             }
             if ( (hm &lt; mina || hm &gt; maxa) &amp;&amp;
                  (hmpm &lt; mina || hmpm &gt; maxa)) SWI_disallow=1;
             if ( (hm &lt; mine || hm &gt; maxe) &amp;&amp;
                  (hmpm &lt; mine || hmpm &gt; maxe)) SWI_scoreDelta=-300;
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
          else if ( AMPM == 'h' || (AMPM == 'a' &amp;&amp; HOUR != 12) ||
                    (AMPM == 'p' &amp;&amp; HOUR == 12)) {
             if (hm &lt; mina || hm &gt; maxa) SWI_disallow=1;
             if (hm &lt; mine || hm &gt; maxe) SWI_scoreDelta=-300;
          }
          else if ( (AMPM == 'p' &amp;&amp; HOUR != 12) ||
                    (AMPM == 'a' &amp;&amp; HOUR == 12) ) {
             hmpm = hm + 1200;
             if (hmpm &gt;= 2400) hmpm -= 2400;
             if (hmpm &lt; mina || hmpm &gt; maxa) SWI_disallow=1;
             if (hmpm &lt; mine || hmpm &gt; maxe) SWI_scoreDelta=-300;
          }
          var minutes = 60 * parseInt (HOUR, 10) + parseInt (MINUTE, 10);
          var grana = SWI_vars.granularityallowed;
          if (grana &amp;&amp; (minutes % grana != 0)) SWI_disallow=1;
          var grane = SWI_vars.granularityexpected;
          if (grane &amp;&amp; (minutes % grane != 0)) SWI_scoreDelta=-300;
          SWI_meaning = HOUR+MINUTE+AMPM;
          MEANING=SWI_meaning;
         </tag>
     </item>
   </rule>
      
   <rule id="TIME_ABS">
      <item repeat="0-1">
         <one-of>
            <item>
               <item repeat="0-1">
                  at
               </item>
               <item repeat="0-1">
                  <one-of>
                     <item>
                        around 
                     </item>
                     <item>
                        approximately 
                     </item>
                     <item>
                        about 
                     </item>
                  </one-of>
                  <tag>QUAL='approx'</tag>
               </item>
            </item>
            <item>
               before 
               <tag>QUAL='before'</tag>
            </item>
            <item>
               after 
               <tag>QUAL='after'</tag>
            </item>
         </one-of>
      </item>
      <one-of>
         <item weight="0.005">
            half past 
            <one-of>

               <item>
                  <ruleref uri="#COM_HOURS"/>
                  <tag>H=COM_HOURS.H</tag>
               </item>
               <item>
                  noon 
                  <tag>H=12; AMPM='p'</tag>
               </item>
               <item>
                  midnight 
                  <tag>H=12; AMPM='a'</tag>
               </item>
            </one-of>
            <tag>M=30</tag>
         </item>
         <item weight="0.008">
            <one-of>
               <item>
                  <ruleref uri="#MOD_MINUTES"/>
                  <tag>M=MOD_MINUTES.M</tag>
                  <item repeat="0-1">
                     <one-of>
                        <item>
                           minutes 
                        </item>
                        <item>
                           minute 
                        </item>
                     </one-of>
                  </item>
               </item>
               <item>
                  <item repeat="0-1">
                     a
                  </item>
                  quarter 
                  <tag>M=15</tag>
               </item>
            </one-of>
            <one-of>
               <item>
                  after 
               </item>
               <item>
                  past 
               </item>
               <item>
                  to 
                  <tag>SIGN=-1</tag>
               </item>
               <item>
                  of 
                  <tag>SIGN=-1</tag>
               </item>
               <item>
                  before 
                  <tag>SIGN=-1</tag>
               </item>
            </one-of>
            <one-of>
               <item>
                  <ruleref uri="#COM_HOURS"/>
                  <tag>H=COM_HOURS.H</tag>
                  <item repeat="0-1">
                     <one-of>
                        <item>
                           a_m 
                           <tag>AMPM='a'</tag>
                        </item>
                        <item>
                           p_m 
                           <tag>AMPM='p'</tag>
                        </item>
                        <item>
                           in_the_morning 
                           <tag>AMPM='a'</tag>
                        </item>
                        <item>
                           in_the_afternoon 
                           <tag>AMPM='p'</tag>
                        </item>
                        <item>
                           in_the_evening 
                           <tag>AMPM='p'</tag>
                        </item>
                     </one-of>
                  </item>
               </item>
               <item>
                  noon 
                  <tag>H=12; AMPM='noon'</tag>
               </item>
               <item>
                  midnight 
                  <tag>H=12; AMPM='midnight'</tag>
               </item>
            </one-of>
         </item>
         <item weight=".057">
            <item repeat="0-1">
               twelve 
               <item repeat="0-1">
                  oclock
               </item>
            </item>
            <one-of>
               <item>
                  noon 
                  <tag>AMPM='noon'</tag>
               </item>
               <item>
                  midnight 
                  <tag>AMPM='midnight'</tag>
               </item>
            </one-of>
            <tag>H=12</tag>
         </item>
         <item weight=".676">
            <ruleref uri="#COM_HOURS"/>
            <tag>H=COM_HOURS.H</tag>
            <item repeat="0-1">
               <one-of>
                  <item>
                     <ruleref uri="#MINUTES"/>
                     <tag>M=MINUTES.M</tag>
                  </item>
                  <item>
                     oclock 
                  </item>
               </one-of>
            </item>
            <one-of>
               <item>
                  a_m 
                  <tag>AMPM='a'</tag>
               </item>
               <item>
                  p_m 
                  <tag>AMPM='p'</tag>
               </item>
               <item>
                  in_the_morning 
                  <tag>AMPM='a'</tag>
               </item>
               <item>
                  in_the_afternoon 
                  <tag>AMPM='p'</tag>
               </item>
               <item>
                  in_the_evening 
                  <tag>AMPM='p'</tag>
               </item>
               <item>
                  at_night 
                  <tag>AMPM='p'</tag>
               </item>
            </one-of>
         </item>
         <item weight="0.036">
            <ruleref uri="#COM_HOURS"/>
            <tag>H=COM_HOURS.H</tag>
            <item repeat="0-1">
               <item>oclock</item>
            </item>
         </item>
         <item weight=".005">
            twenty_four hundred 
            <item repeat="0-1">
               hours
            </item>
            <tag>H=0;AMPM='h'</tag>
         </item>
         <item weight=".209">
            <one-of>
               <item>
                  <ruleref uri="#TWO_DIG_MIL_HOURS"/>
                  <tag>H=TWO_DIG_MIL_HOURS.H;  AMPM= H &gt;= 13 ? 'h':'?'</tag>
               </item>
               <item>
                  <item repeat="0-1">
                     <one-of>
                        <item>
                           oh 
                        </item>
                        <item>
                           zero 
                        </item>
                     </one-of>
                     <tag>AMPM='h'</tag>
                  </item>
                  <ruleref uri="#ONE_DIG_MIL_HOURS"/>
                  <tag>H=ONE_DIG_MIL_HOURS.H</tag>
               </item>
            </one-of>
            <one-of>
               <item>
                  hundred 
                  <tag>AMPM='h'; M=0</tag>
               </item>
               <item>
                  <ruleref uri="#MINUTES"/>
                  <tag>M=MINUTES.M</tag>
               </item>
            </one-of>
            <item repeat="0-1">
               <item>hours</item>
               <tag>AMPM='h'</tag>
            </item>
         </item>
      </one-of>
   </rule>
      
   <rule id="MOD_MINUTES">
      <one-of>
         <item>
            <ruleref uri="#MINUTE_TEENS"/>
            <tag>M=MINUTE_TEENS.M</tag>
         </item>
         <item>
            <ruleref uri="#MINUTE_TENS"/>
            <tag>M=MINUTE_TENS.M</tag>
            <item repeat="0-1">
               <ruleref uri="#MINUTE_ONES"/>
               <tag>M+=MINUTE_ONES.M</tag>
            </item>
         </item>
         <item>
            <ruleref uri="#MINUTE_ONES"/>
            <tag>M=MINUTE_ONES.M</tag>
         </item>
      </one-of>
   </rule>
      
   <rule id="MINUTES">
      <one-of>
         <item>
            <ruleref uri="#MINUTE_TEENS"/>
            <tag>M=MINUTE_TEENS.M</tag>
         </item>
         <item>
            <ruleref uri="#MINUTE_TENS"/>
            <tag>M=MINUTE_TENS.M</tag>
            <item repeat="0-1">
               <ruleref uri="#MINUTE_ONES"/>
               <tag>M+=MINUTE_ONES.M</tag>
            </item>
         </item>
         <item>
            <one-of>
               <item>
                  oh 
               </item>
               <item>
                  zero 
               </item>
            </one-of>
            <ruleref uri="#MINUTE_ONES"/>
            <tag>M=MINUTE_ONES.M</tag>
         </item>
      </one-of>
   </rule>
      
   <rule id="MINUTE_TEENS">
      <one-of>
         <item>
            nineteen 
            <tag>M=19</tag>
         </item>
         <item>
            eighteen 
            <tag>M=18</tag>
         </item>
         <item>
            seventeen 
            <tag>M=17</tag>
         </item>
         <item>
            sixteen 
            <tag>M=16</tag>
         </item>
         <item>
            fifteen 
            <tag>M=15</tag>
         </item>
         <item>
            fourteen 
            <tag>M=14</tag>
         </item>
         <item>
            thirteen 
            <tag>M=13</tag>
         </item>
         <item>
            twelve 
            <tag>M=12</tag>
         </item>
         <item>
            eleven 
            <tag>M=11</tag>
         </item>
         <item>
            ten 
            <tag>M=10</tag>
         </item>
      </one-of>
   </rule>
      
   <rule id="MINUTE_TENS">
      <one-of>
         <item>
            fifty 
            <tag>M=50</tag>
         </item>
         <item>
            forty 
            <tag>M=40</tag>
         </item>
         <item>
            thirty 
            <tag>M=30</tag>
         </item>
         <item>
            twenty 
            <tag>M=20</tag>
         </item>
      </one-of>
   </rule>
      
   <rule id="MINUTE_ONES">
      <one-of>
         <item>
            nine 
            <tag>M=9</tag>
         </item>
         <item>
            eight 
            <tag>M=8</tag>
         </item>
         <item>
            seven 
            <tag>M=7</tag>
         </item>
         <item>
            six 
            <tag>M=6</tag>
         </item>
         <item>
            five 
            <tag>M=5</tag>
         </item>
         <item>
            four 
            <tag>M=4</tag>
         </item>
         <item>
            three 
            <tag>M=3</tag>
         </item>
         <item>
            two 
            <tag>M=2</tag>
         </item>
         <item>
            one 
            <tag>M=1</tag>
         </item>
      </one-of>
   </rule>
      
   <rule id="COM_HOURS">
      <one-of>
         <item>
            twelve 
            <tag>H=12</tag>
         </item>
         <item>
            eleven 
            <tag>H=11</tag>
         </item>
         <item>
            ten 
            <tag>H=10</tag>
         </item>
         <item>
            nine 
            <tag>H=9</tag>
         </item>
         <item>
            eight 
            <tag>H=8</tag>
         </item>
         <item>
            seven 
            <tag>H=7</tag>
         </item>
         <item>
            six 
            <tag>H=6</tag>
         </item>
         <item>
            five 
            <tag>H=5</tag>
         </item>
         <item>
            four 
            <tag>H=4</tag>
         </item>
         <item>
            three 
            <tag>H=3</tag>
         </item>
         <item>
            two 
            <tag>H=2</tag>
         </item>
         <item>
            one 
            <tag>H=1</tag>
         </item>
      </one-of>
   </rule>
      
   <rule id="ONE_DIG_MIL_HOURS">
      <one-of>
         <item>
            nine 
            <tag>H=9</tag>
         </item>
         <item>
            eight 
            <tag>H=8</tag>
         </item>
         <item>
            seven 
            <tag>H=7</tag>
         </item>
         <item>
            six 
            <tag>H=6</tag>
         </item>
         <item>
            five 
            <tag>H=5</tag>
         </item>
         <item>
            four 
            <tag>H=4</tag>
         </item>
         <item>
            three 
            <tag>H=3</tag>
         </item>
         <item>
            two 
            <tag>H=2</tag>
         </item>
         <item>
            one 
            <tag>H=1</tag>
         </item>
         <item>
            zero 
            <tag>H=0</tag>
         </item>
         <item>
            oh 
            <tag>H=0</tag>
         </item>
      </one-of>
   </rule>
      
   <rule id="TWO_DIG_MIL_HOURS">
      <one-of>
         <item>
            twenty_three 
            <tag>H=23</tag>
         </item>
         <item>
            twenty_two 
            <tag>H=22</tag>
         </item>
         <item>
            twenty_one 
            <tag>H=21</tag>
         </item>
         <item>
            twenty 
            <tag>H=20</tag>
         </item>
         <item>
            nineteen 
            <tag>H=19</tag>
         </item>
         <item>
            eighteen 
            <tag>H=18</tag>
         </item>
         <item>
            seventeen 
            <tag>H=17</tag>
         </item>
         <item>
            sixteen 
            <tag>H=16</tag>
         </item>
         <item>
            fifteen 
            <tag>H=15</tag>
         </item>
         <item>
            fourteen 
            <tag>H=14</tag>
         </item>
         <item>
            thirteen 
            <tag>H=13</tag>
         </item>
         <item>
            twelve 
            <tag>H=12</tag>
         </item>
         <item>
            eleven 
            <tag>H=11</tag>
         </item>
         <item>
            ten 
            <tag>H=10</tag>
         </item>
      </one-of>
   </rule>

</grammar>

