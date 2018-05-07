<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="java.util.*" %>
<%@page import="java.net.*" %>
<%@page import="org.apache.log4j.*" %>
<%@page import="org.apache.log4j.spi.*" %>
<%@page import="com.nuance.framework.logging.*"%>

<%
	HashMap catogaryHasmap = null;

	String strAction = request.getParameter("action");
	if(strAction == null) { strAction = ""; }

	LoggerRepository repository = LogManager.getLoggerRepository(); // Use default log4j repository

	// Get list of loggers and sort
	LinkedList lLoggers = new LinkedList();
	Enumeration eLoggers = repository.getCurrentLoggers();
	while(eLoggers.hasMoreElements()) {
		org.apache.log4j.Logger logger = (org.apache.log4j.Logger)eLoggers.nextElement();
		lLoggers.add(logger.getName());
	}
	Collections.sort(lLoggers);

	// HashMap to store appenders
	HashMap mAppenders = new HashMap();

	if("reloadConfig".equalsIgnoreCase(strAction)) {
	    //DT: Commented out configureLogger due to LoggerManager changes in NDF BETA-03
	    //LoggerImpl.configureLogger();
	} else if("setRootLevel".equalsIgnoreCase(strAction)) {
		String strLevel = request.getParameter("rootLogLevel");
		if(strLevel == null || strLevel.trim().equals("")) {
	strLevel = "ERROR";
		}
		org.apache.log4j.Logger rootLogger = repository.getRootLogger();
		rootLogger.setLevel(Level.toLevel(strLevel));

		// Set all defined loggers to the new priority
		Iterator itLoggers = lLoggers.iterator();
		while(itLoggers.hasNext()) {
	String strLoggerName = (String)itLoggers.next();
	org.apache.log4j.Logger logger = repository.getLogger(strLoggerName);
	logger.setLevel(Level.toLevel(strLevel));
		}

		//LogManager.getLogger(IvrLogger.getClass().getName()).info(IvrLogger.getClass().getName(), "Root logger priority changed to "+strLevel);
	} else if("setCategoryLevel".equalsIgnoreCase(strAction))
	{
		String strCategory = request.getParameter("categoryName");
		if(strCategory != null && (!strCategory.trim().equals("")))
		{
	String strLevel = request.getParameter("categoryLogLevel");
	if(strLevel == null || strLevel.trim().equals(""))
	{
		strLevel = "ERROR";
	}
	Level newLevel = Level.toLevel(strLevel);
	org.apache.log4j.Logger logger = repository.getLogger(strCategory);
	logger.setLevel(newLevel);
	LogManager.getLogger("IvrLogConfig.jsp").info("Logger priority changed to "+strLevel+" for logger "+strCategory, null);

		}
	}
%>

<HTML>
 <HEAD><TITLE>Log4j configuration</TITLE>
     
 <STYLE>
BODY {
  background-color:       #CCCCDD;
}
.header {
  font-family:            Arial;
  font-size:              9pt;
  color:                  #000000;
  font-weight:            bold;
  background-color:       #E5E5E5;
  text-align: center;
}
.cell {
  background-color: #F0F0F0;
}
.button {
  font-family:            SansSerif;
  font-size:              9pt;
  color:                  #000000;
  background-color:       #D5D5D5;
  text-align: center;
}
</STYLE>
<SCRIPT LANGUAGE="javascript">
function doChangeLevel(form) {
  form.submit();
}
</SCRIPT>
</HEAD>

 <BODY>
<H2>Set root logging level</H2>
<FORM NAME="frmSetRootLevel">
<INPUT TYPE="HIDDEN" NAME="action" VALUE="setRootLevel">
Root logging level:
<SELECT NAME="rootLogLevel">
<%
	org.apache.log4j.Logger rootLogger = repository.getRootLogger();
	Level rootLevel = rootLogger.getLevel();
	Priority[] priorities = Level.getAllPossiblePriorities();
        Priority.getAllPossiblePriorities();
	for(int i=0; i<priorities.length; i++) {
		Priority priority = priorities[i];
		%><OPTION VALUE="<%=priority.toString()%>" <%
		if(priority.equals(rootLevel)) {
			%>SELECTED<%
		}
		%>><%=priority.toString()%></OPTION>
<%
	}
%>
</SELECT>
<INPUT TYPE="SUBMIT" VALUE="Set Root Log Level">
</FORM>
<HR>
<FORM NAME="frmReloadLog4j">
<INPUT TYPE="HIDDEN" NAME="action" VALUE="reloadConfig">
<INPUT TYPE="SUBMIT" VALUE="Reload log4j configuration from file">
</FORM>
<HR>
<H2>Current Log4j configuration</H2>
<B>Loggers</B><BR>
<TABLE>
<TR>
<TD BGCOLOR="#999999"><TABLE WIDTH="500" CELLPADDING="1" CELLSPACING="2">
<TR>
  <TD CLASS="header">Level</TD>
  <TD CLASS="header">Name</TD>
  <TD CLASS="header">Appenders</TD>
  <TD CLASS="header">Parent</TD>
</TR>
<%
	Iterator itLoggers = lLoggers.iterator();
	int frmNum=0;
	while(itLoggers.hasNext()) {
		String strLoggerName = (String)itLoggers.next();
		org.apache.log4j.Logger logger = repository.getLogger(strLoggerName);
 %><TR>
    <TD VALIGN=MIDDLE CLASS="cell" >
<!--     <DIV TITLE="Actual level: <%=logger.getLevel()%>"><%=logger.getEffectiveLevel()%></DIV> -->
<FORM NAME="frm_<%=++frmNum%>" ACTION="#<%=logger.getName()%>">
<INPUT TYPE="HIDDEN" NAME="action" VALUE="setCategoryLevel">
<INPUT TYPE="HIDDEN" NAME="categoryName" VALUE="<%=logger.getName()%>">
<SELECT NAME="categoryLogLevel" onchange="doChangeLevel(document.frm_<%=frmNum%>);">
<%
		for(int i=0; i<priorities.length; i++) {
			Priority priority = priorities[i];
			%><OPTION VALUE="<%=priority.toString()%>" <%=(priority.toString().equals(logger.getEffectiveLevel().toString()))?"SELECTED":""%><%
			%>><%=priority.toString()%></OPTION>
<%
		}
%>
</SELECT>
</FORM>
    </TD>
    <TD VALIGN=MIDDLE CLASS="cell"><A><%=logger.getName()%></A></TD>
    <TD VALIGN=MIDDLE CLASS="cell">
<%
		Enumeration eAppenders = logger.getAllAppenders();
		while(eAppenders.hasMoreElements()) {
			Appender appender = (Appender)eAppenders.nextElement();
			mAppenders.put(appender.getName(), appender);
			%><%=appender.getName()%><%=(eAppenders.hasMoreElements())?",":""%><%
		}
%>
    </TD>

   <TD VALIGN=MIDDLE CLASS="cell">
     <A HREF="#<%=logger.getParent().getName()%>"><%=logger.getParent().getName()%></A>
   </TD>
   </TR>
<%
	}
%>
 </TABLE>
 </TD></TR>
</TABLE>
<HR>
<H2>Appenders</H2>
<TABLE>
<TR>
  <TD BGCOLOR="#999999"><TABLE WIDTH="500" CELLPADDING="1" CELLSPACING="2">
    <TR>
      <TD CLASS="header">Name</TD>
      <TD CLASS="header">Class</TD>
      <TD CLASS="header">Target</TD>
    </TR>
<%
	Set sAppenders = mAppenders.entrySet();
	Iterator itAppenders = sAppenders.iterator();
	while(itAppenders.hasNext()) {
		Map.Entry obj = (Map.Entry)itAppenders.next();
		Appender appender = (Appender)obj.getValue();
		%><TR>
		<TD CLASS="cell"><%=appender.getName()%></TD>
		<TD CLASS="cell"><%=appender.getClass().getName()%></TD>
		<TD CLASS="cell">
<%
		if(appender instanceof FileAppender) {
			FileAppender fileAppender = (FileAppender)appender;
			%><A HREF="ReadFile.logger?file=<%=URLEncoder.encode(fileAppender.getFile(),"")%>">
			<%=fileAppender.getFile()%>
			</A><%
		} else {
			%>&nbsp;<%
		}
%>
		</TD>
      </TR>
<%
	}
%>
    </TABLE></TD>
  </TR>
</TABLE>
</BODY>
</HTML>