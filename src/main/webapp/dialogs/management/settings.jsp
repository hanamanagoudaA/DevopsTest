<%@ page import="java.util.Date"%>

<%	
	Logger logger = LoggerManager.getLogger("com.nuance.framework.management.jsp");
	SettingsInterfaceMBean settingsInterface = (SettingsInterfaceMBean)request.getAttribute(OAMConstants.ATTRIBUTE_NAME_SETTINGS_INTERFACE);
 	String reqURI = (String) request.getRequestURI();
 	String contextPath = request.getContextPath();
 	String managementPath = contextPath + "/dialogs/management";
	String logLevel = settingsInterface.getLogLevel();
	long lUptime = settingsInterface.getApplicationUptime();
	String sUptime = "";

	if(lUptime > -1){
		long s = 1000;
		long m = 60 * s;
		long h = 60 * m;
		long d = 24 * h;
	
		long days = lUptime / d;
		long hours = (lUptime % d) / h;
		long minutes = (lUptime % h) / m;
		//long seconds = (lUptime % m) / s;

	
		if (days > 0) {
			sUptime += "<b>" + days + "</b>" + " d ";
		}
		sUptime += "<b>" + hours + "</b>" + " h ";
		sUptime += "<b>" + minutes + "</b>" + " m ";
		//sUptime += "<b>"+seconds+"</b>" + " s";
	}
	else {
		sUptime = "No time information available.";
	}
		
	Boolean newCalls = new Boolean(settingsInterface.getNewSessionsAccepted());
	//we want to know if new calls are blocked...
	String checkoptions = "";
	if (!newCalls) {
		checkoptions += " checked=\"checked\"";
	}
	String options = "";
	String[] levels = settingsInterface.getLogLevels();
	for (String item : levels) {
		options += "<option";
		if (item.equals(logLevel)) {
			options += " selected=\"selected\"";
		}
		options += ">" + item + "</options>";
	}
	
%>


<%@page import="com.nuance.framework.oam.OAMManager"%>
<%@page import="com.nuance.framework.oam.SettingsInterfaceMBean"%>
<%@page import="com.nuance.framework.oam.OAMConstants"%>
<%@page import="com.nuance.framework.logging.LoggerManager"%>
<%@page import="com.nuance.framework.logging.Logger"%><html>
<head>
<link rel="stylesheet" href="<%=managementPath%>/mserver.css">
<script type="text/javascript" src="<%=managementPath %>/utils.js"></script>
<script>
<!--
	function handleOk(){
		document.getElementById('<%=OAMConstants.PARAM_NAME_CMD%>').value='<%=OAMConstants.PARAM_VALUE_CMD_SUBMIT%>';
		adjustLoggingParam();
	  	document.mainForm.submit();
	  	top.close(); 
	}
	  
	function handleCancel(){
	  	top.close();
	}
	  
	function handleApply(){
	  	document.getElementById('<%=OAMConstants.PARAM_NAME_CMD%>').value='<%=OAMConstants.PARAM_VALUE_CMD_SUBMIT%>';
	  	adjustLoggingParam();
	  	document.mainForm.submit();
	}
	  
	function handleRefresh(){
	  	document.getElementById('<%=OAMConstants.PARAM_NAME_CMD%>').value='<%=OAMConstants.PARAM_VALUE_CMD_REFRESH%>';
	  	document.mainForm.submit();
	}

	function adjustLoggingParam(){
		if (parent.frames.length > 0){
			document.getElementById('<%=OAMConstants.PARAM_NAME_LOG_LEVEL%>').name='<%=OAMConstants.PARAM_NAME_LOG_LEVEL+"_"%>';
		}
	}
		
	
//-->	
</script>	
</head>
<body onload="setDynamicStyle()">
<form name="mainForm" action="<%=contextPath%>/settings.oam" method="post">
<input type="hidden" id="<%=OAMConstants.PARAM_NAME_CMD%>" name="<%=OAMConstants.PARAM_NAME_CMD%>" value="<%=OAMConstants.PARAM_VALUE_CMD_REFRESH%>"/>
<table class="displayNoFrame" align="center" cellspacing="0" cellpadding="0">
	<tr>
		<td align="center">
			<h1>NDF Settings</h1>
		</td>
	</tr>
</table>
<table width="100%" cellspacing="0" cellpadding="0" border="0">
	<tr><td nowrap="nowrap" align="right">
		<img src="<%=managementPath%>/images/transparent.gif" width="1" height="15">
		<nobr><a class="right-content-menu-item" href="javascript: handleRefresh()">Refresh</a></nobr>
	</td></tr>
	<tr><td>
		<img src="<%=managementPath%>/images/light_blue_line.gif" border="0" height="1" vspace="4" width="100%">
	</td></tr>
</table>
<table class="displayNoFrame">
	<tr>
		<td width="151">Logging Level: </td>
		<td><select id="<%=OAMConstants.PARAM_NAME_LOG_LEVEL%>" class="table-cell" name="<%=OAMConstants.PARAM_NAME_LOG_LEVEL%>">
			<%=options%>
		</select></td>
	</tr>
</table>
<table>
	<tr>
		<td width="147">Stop New Calls: </td>
		<td><input name="<%=OAMConstants.PARAM_NAME_BLOCK_NEW_SESSIONS%>" type="checkbox"
			<%=checkoptions%>></td>
	</tr>
</table>
<img src="<%=managementPath%>/images/light_blue_line.gif" border="0" height="1" vspace="4" width="100%">
<table>
	<tr>
		<td width="150">Application Up Time: </td>
		<td><%=sUptime%></td>
	</tr>
</table>
<table>
	<tr>
		<td width="150">Active Calls in System: </td>
		<td><b><%=Long.toString(settingsInterface.getCurrentCallNumber())%></b></td>
	</tr>
</table>
<table>
	<tr>
		<td width="150">Total Calls in System: </td>
		<td><b><%=settingsInterface.getTotalCallNumber()%></b></td>
	</tr>
</table>
<br/>
<br/>
<table width="100%">
	<tr>
		<td>
		<center>
			<span class="displayFrame"><a class="button-enabled" href="javascript: handleOk();">OK</a></span>
			<span class="displayFrame"><a class="button-enabled" href="javascript: handleCancel();">Cancel</a></span>
			<a class="button-enabled" href="javascript: handleApply();">Apply</a>
		</center>
		</td>
	</tr>
</table>
</form>
</body>
</html>