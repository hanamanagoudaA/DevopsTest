
<%@ taglib uri="/WEB-INF/tld/ndm-addon-service.tld" prefix="dm"%>
<%@ page contentType="application/voicexml+xml; charset=UTF-8" %>
<%@ page import="com.nuance.framework.controller.configuration.ConfigurationModel"%>
<%@ page session="false"%>

<%
	ConfigurationModel _ndfModel = (ConfigurationModel)request.getAttribute("ndfmodel");
	boolean isSessionAllow =_ndfModel.getSessionAllow();
	String browser = (String)request.getAttribute("browser");
	String recordname=((String)request.getAttribute("dmid"))+"Record";
	String dmid=((String)request.getAttribute("dmid"));
	
	String dmtype=((String)request.getAttribute("dmtype"));
%>
		
       <var name="<%=recordname%>" expr="false"/>
		<dm:properties context="global"/>
		<!-- catch for events like error-->
		<catch event="error cancel exit telephone connection" cond="glDM.hndl">
		<if cond="typeof(${dmid}) == 'undefined' || ${dmid} == null">
		    	<assign name="${dmid}" expr="new NDMVar(glDM, '${dmid}', <%=isSessionAllow%>)"/>				
		    </if>
			<goto expritem="hndlGLCatch(glDM,_event,_message)"/>
		</catch>
		
		 <block name="${dmid}">					
			<assign name="${dmid}" expr="new NDMVar(glDM, '${dmid}', <%=isSessionAllow%>)"/>
	       
			${renderAssignments}
		</block>
				
		<dm:disallowoptions/>
			
		<block name="${dmid}_dataBlk">
			<script>
			checkForError(${dmid},glDM);${dmid}.prompt='';
			${dmid}.props='${namelistprop}'; 
			if (appstepID > 0 &amp;&amp; ${dmid}.props.indexOf('appstepID')==-1)
			{${dmid}.props=checkAppstepID(${dmid}.props, appstepID);}</script>
			<assign name="appstepID" expr="0"/>
			<var name="stVar" expr=""/>
			<var name="reco" expr=""/>
		    <var name="nbtR" expr=""/>
			<dm:sendreceive id="response" namelist="stVar reco ${dmid}.props nbtR"/>

		<if cond="!${dmid}.prompt==''">

			<var name="prompt_vec" expr="${dmid}.prompt"/>
			<if cond="prompt_vec instanceof Array">
			   <foreach item="i" array="prompt_vec">
				
				<%if(browser.trim().equalsIgnoreCase("NVP")){%>
				     <if cond="typeof(i.bargein)=='undefined'">
				   	    <if cond="i.file != ''">
				   	     
						   <prompt xml:lang="${language}"><audio expr="i.file"><value expr="i.text" treatasmarkup="true"/></audio></prompt>
					    <else/>
						   <prompt xml:lang="${language}"><value expr="i.text" treatasmarkup="true"/></prompt>
					    </if>
					   
					 <elseif cond="i.bargein == 'true'"/>
					    <if cond="i.file != ''">
				   	   
						   <prompt  xml:lang="${language}" bargein='true'><audio expr="i.file"><value expr="i.text" treatasmarkup="true"/></audio></prompt>
					    <else/>
						   <prompt bargein='true' xml:lang="${language}"><value expr="i.text" treatasmarkup="true"/></prompt>
					    </if>
					 <elseif cond="i.bargein == 'false'"/>
					    <if cond="i.file != ''">
				   	   
						   <prompt xml:lang="${language}" bargein='false'><audio expr="i.file"><value expr="i.text" treatasmarkup="true"/></audio></prompt>
					    <else/>
						   <prompt xml:lang="${language}" bargein='false'><value expr="i.text" treatasmarkup="true"/></prompt>
					    </if>
					 </if>
				<%}else{%>
					<if cond="typeof(i.bargein)=='undefined'">
				   	    <if cond="i.file != ''">
				   	     
						   <prompt xml:lang="${language}"><audio expr="i.file"><value expr="i.text"/></audio></prompt>
					    <else/>
						   <prompt xml:lang="${language}"><value expr="i.text"/></prompt>
					    </if>
					   
					 <elseif cond="i.bargein == 'true'"/>
					    <if cond="i.file != ''">
				   	   
						   <prompt  xml:lang="${language}" bargein='true'><audio expr="i.file"><value expr="i.text"/></audio></prompt>
					    <else/>
						   <prompt bargein='true' xml:lang="${language}"><value expr="i.text"/></prompt>
					    </if>
					 <elseif cond="i.bargein == 'false'"/>
					    <if cond="i.file != ''">
				   	   
						   <prompt xml:lang="${language}" bargein='false'><audio expr="i.file"><value expr="i.text"/></audio></prompt>
					    <else/>
						   <prompt xml:lang="${language}" bargein='false'><value expr="i.text"/></prompt>
					    </if>
					 </if>
				<%}%>
			   </foreach>
			</if>
		
		</if>			
			<if cond="${dmid}.nextTarget!='record'"> 
		    <assign name="<%=recordname%>" expr="false"/>
			<goto expritem="'${dmid}_' + ${dmid}.nextTarget"/>
	        <else/>
	        <assign name="<%=recordname%>" expr="true"/>
		    </if>
			
		</block>
		<%if(dmtype.trim().equalsIgnoreCase("RCRD")){%>
		<dm:getRecordString condString="<%=recordname%>">
		 
		  <catch event="error cancel exit telephone connection noinput">
				<script>catchEvent(<%=dmid%>,'col',_event,_message);</script>
				<clear namelist="${dmid}_dataBlk"/> 
	      </catch>
	      <filled>
				<script>addRecord(<%=dmid%>,'col',audio);</script>
				<assign name="<%=recordname%>" expr="false"/>				
				<clear namelist="${dmid}_dataBlk"/> 
		  </filled>
		</dm:getRecordString>
		<%}else{%>
		<field name="${dmid}_colReco">
			<catch event="error cancel exit telephone connection noinput nomatch">
				<script>catchEvent(<%=dmid%>,'col',_event,_message);</script>
				<clear namelist="${dmid}_dataBlk"/> 
			</catch>
			<catch event="maxspeechtimeout">
				<script>catchEvent(<%=dmid%>,'col','nomatch',_message);</script>
				<clear namelist="${dmid}_dataBlk"/>
			</catch>

			<dm:properties context="collection"/>
			<dm:grammar context="collection"/>
			<filled>
				<if cond="!addReco(${dmid},'col',application,'${dmtype}')"><throw event="nomatch"/></if>
				<clear namelist="${dmid}_dataBlk"/> 
			</filled>
		</field>		
		<field name="${dmid}_confReco">
			<catch event="error cancel exit telephone connection noinput nomatch">
				<script>catchEvent(<%=dmid%>,'conf',_event,_message);</script>
				<clear namelist="${dmid}_dataBlk"/> 
			</catch>
			<catch event="maxspeechtimeout">
				<script>catchEvent(<%=dmid%>,'conf','nomatch',_message);</script>
				<clear namelist="${dmid}_dataBlk"/>
			</catch>

			<dm:properties context="confirmation"/>
			<dm:grammar context="confirmation"/>
			<filled>
				<script>addReco(<%=dmid%>,'conf',application,'<%=dmtype%>');</script>
				<clear namelist="${dmid}_dataBlk"/> 
			</filled>
		</field>
		<%}%>
		<block name="${dmid}_exitError">
			<script>exitError(<%=dmid%>,glDM);</script>
			<goto expritem="'${dmid}_exit'"/>
		</block>
		<block name="${dmid}_exit">
			<script>
				glDM.hndl = false; ${dmid}_dataBlk='done';<%if(!dmtype.trim().equalsIgnoreCase("RCRD")){%>${dmid}_colReco='done';	${dmid}_confReco='done';<%}%>
				${dmid}_exitError='done'; <%=dmid%>_exit='done';<%=dmid%> = <%=dmid%>.output;
			</script>
		</block>