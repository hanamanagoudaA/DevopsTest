<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="com.nuance.framework.configuration.AbstractApplicationConfigurationManagerFactory"%>
<%@page import="com.nuance.framework.configuration.ApplicationConfigurationManager"%>
<%@page import="com.nuance.framework.logging.Logger"%>
<%@page import="com.nuance.framework.logging.LoggerManager"%>
<%@page import="com.nuance.framework.vxml.service.AbstractServiceContextFactory"%>
<%@page import="com.nuance.framework.vxml.service.ServiceContext"%>
<%@page import="com.nuance.framework.vxml.service.RequestImpl"%>
<%@page import="com.nuance.framework.vxml.service.SessionImpl"%>
<%@page import="com.nuance.framework.vxml.service.VXMLService"%>
<%@page import="com.nuance.framework.vxml.service.dialog.ldm.Dialog"%>
<%@page import="com.nuance.framework.vxml.service.dialog.ldm.PropertiesDialogServiceManagerImpl"%>

<%@page import="java.io.StringWriter"%>
<%@page import="java.util.Vector"%>
<%
  String jspName = "CheckDialog.jsp";
  Logger logger = LoggerManager.getLogger(jspName);

  String library = "default";
  String language = "en-US";
  String id = (String) request.getParameter("dialogID");
  StringWriter writer = new StringWriter();

  HttpServletRequest httpServletRequest = (HttpServletRequest)pageContext.getRequest();
  HttpServletResponse httpServletResponse = (HttpServletResponse)pageContext.getResponse();

  RequestImpl requestImpl = new RequestImpl();
  requestImpl.setHttpServletRequest(httpServletRequest);

  SessionImpl sessionImpl = new SessionImpl();
  sessionImpl.setHttpSession(httpServletRequest.getSession());
  
  AbstractServiceContextFactory serviceContextFactory = AbstractServiceContextFactory.newInstance();
  ServiceContext serviceContext = serviceContextFactory.getServiceContext(id, id, requestImpl, sessionImpl, writer);

  AbstractApplicationConfigurationManagerFactory appConfigFactory = AbstractApplicationConfigurationManagerFactory.newInstance();
  ApplicationConfigurationManager applicationConfig = appConfigFactory.getApplicationConfiguration(serviceContext);

  PropertiesDialogServiceManagerImpl dialogManager = (PropertiesDialogServiceManagerImpl) applicationConfig.getService(VXMLService.DTMF);

  if (logger.isDebugEnabled()) logger.debug(jspName + ".getServiceContext: Exiting method.");
  //}

  /* [collGlobals] 0-1 {USE_DIALOG, USE_GLOBAL}<br/>
   * [confGlobals] 0-1 {USE_DIALOG, USE_GLOBAL}<br/>
   * [collMax]     0-6 {REGULAR_MAXES, FEWER_NOINPUTS, FEWER_NOMATCHS, FEWER_TRIES, FEWER_TURNS, FEWER_HELPS, FEWER_REPEATS}<br/>
   * [confMax]     0-4 {REGULAR_MAXES, FEWER_NOINPUTS, FEWER_NOMATCHS, FEWER_TRIES, FEWER_NO_TO_CONF}<br/>
   * [confType]    0-2 {CONFIRM_ALWAYS, CONFIRM_SOMETIMES, CONFIRM_NEVER}<br/>
   * [univSetting] 0-2 {ENABLE_UNIVERSAL, ENABLE_TYPE, DISABLE_UNIVERSAL}<br/>
   * [reuseInit]   0-1 {!reuseInitialPrompt, reuseInitialPrompt}<br/>
   */
  int collGlobals = 0;
  int confGlobals = 0;
  int collMax = 0;
  int confMax = 0;
  int confType = 0;
  int univSetting = 0;
  int reuseInit = 1;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Checking Dialog</title>
</head>
  <body>

<table>
<%
  if ("all".equalsIgnoreCase(id)) {
    Vector<Dialog> dialogs = dialogManager.getAllDialogs(library, language);
//    System.out.println("Dialogs.size = " + dialogs.size());
    
    String outputString = null;
    for (int i = 0; i < dialogs.size(); i++) {
      Dialog dialog = dialogs.get(i);
      outputString = dialog.getAllDataAsString();
%>
    <tr>
      <td>
        <%=outputString%>
      </td>
    </tr>
<%  
    }
  } else if (id != null && id.trim().length() == 7) {
    String outputString = null;
    Dialog dialog = dialogManager.getDialog(id, library, language);
    outputString = dialog.getAllDataAsString();
%>
    <tr>
      <td>
        <%=outputString%>
      </td>
    </tr>
<%} else {%>
	  <tr>
	    <td>
	      The ID passed in [<%=id%>] is not valid, or type all into the id to print out all the dialogs.
	    </td>
	  </tr>
<%}%>

</table>

<br/><br/><br/><br/>
  <center>
  <b>Please enter an ID for the dialog</b><br/><br/>
    <li>[collGlobals] 0-1 {USE_DIALOG, USE_GLOBAL}</li>
    <li>[confGlobals] 0-1 {USE_DIALOG, USE_GLOBAL}</li>
    <li>[collMax]     0-6 {REGULAR_MAXES, FEWER_NOINPUTS, FEWER_NOMATCHS, FEWER_TRIES, FEWER_TURNS, FEWER_HELPS, FEWER_REPEATS}</li>
    <li>[confMax]     0-4 {REGULAR_MAXES, FEWER_NOINPUTS, FEWER_NOMATCHS, FEWER_TRIES, FEWER_NO_TO_CONF}</li>
    <li>[confType]    0-2 {CONFIRM_ALWAYS, CONFIRM_SOMETIMES, CONFIRM_NEVER}</li>
    <li>[univSetting] 0-2 {ENABLE_UNIVERSAL, ENABLE_TYPE, DISABLE_UNIVERSAL}</li>
    <li>[reuseInit]   0-1 {!reuseInitialPrompt, reuseInitialPrompt}</li>
    <li>Format it as: [collPrompts][confPrompts][collMax][confMax][confType][univSetting][reuseInit]</li>
  </center>


    <form id="setDialogID" action="CheckDialog.jsp" method=post>
      <input type="text" name="dialogID" size="7" value="<%=id%>"></input> dialogID<br/>
      <input type="submit" value="Next Dialog"/>
    </form>

  </body>
</html>