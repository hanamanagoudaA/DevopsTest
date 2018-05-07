 <!DOCTYPE vxml PUBLIC "-//W3C/DTD VoiceXML 2.0//EN"
  "http://www.w3.org/TR/voicexml20/vxml.dtd">
<%@ page import="javax.servlet.RequestDispatcher"%>
<%@ page import="com.nuance.framework.dialogmodule.view.wrapper.NDMRequestWrapper"%>
<%@ page import="com.nuance.framework.dialogmodule.view.wrapper.NDMResponseWrapper"%>
<%@ page import="java.util.Date"%>
<%
String ndmID = (String)request.getParameter("dm_ID");
if(ndmID == null) ndmID = (String)request.getParameter("ID");

if(ndmID == null || ndmID.trim().equals("")){
%>
<block>
	<log>ERROR: NDM ID not configured.</log>
</block>
<%
}else{
	RequestDispatcher dispatcher = request.getRequestDispatcher("/controller/" + ndmID + ".ndm?dm=ndm_" + ndmID);
    /**
     * since it is the include so getRequestURI  method always returns the JSP name as request URI.
     * Uses Response object wrapper to use the writer object provided by NDMTag through ServiceContext object. Same writer 
     * should be used to generate different blocks of NDM invocation VXML code (to maintan the order of VXML blocks).
     */
    dispatcher.include(new NDMRequestWrapper((HttpServletRequest)request),
					new NDMResponseWrapper((HttpServletResponse) response,out));
}
%>