<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="com.nuance.framework.logging.*" %>

<%
String strFileName = request.getParameter("file");
if(strFileName == null) {
  strFileName = "";
}

String strNumLines = request.getParameter("numLines");
int iNumLines = 100;
if(strNumLines != null && !"".equals(strNumLines.trim())) {
  try {
    iNumLines = Integer.parseInt(strNumLines);
  } catch (NumberFormatException e) {}
}
%>

<HTML>
<HEAD><TITLE>Log tail</TITLE>
<STYLE>
BODY {
  background-color:       #FFFFFF;
}
pre{
  font-family:            Arial;
  font-size:              8pt;
}
.tabMain
{
    BORDER-RIGHT: #999999 1px solid;
    BORDER-TOP: #999999 1px solid;
    PADDING-LEFT: 5px;
    FONT-SIZE: 9pt;
    BORDER-LEFT: #999999 1px solid;
    COLOR: #000000;
    BORDER-BOTTOM: #999999 1px solid;
    FONT-FAMILY: Verdana;
    BACKGROUND-COLOR: #fdfdef
}
.header {
  font-size:              9pt;
  color:                  #000000;
  font-weight:            bold;
  background-color:       #e5e5c6;
  text-align: left;
}

.button {
  font-family:            Arial;
  font-size:              8pt;
  color:                  #000000;
  background-color:       #e5e5c6;
  text-align: center;
}
input {
  font-family:            Arial;
  font-size:              8pt;
  color:                  #000000;
}
.cell {
  background-color: #fdfdef;
  font-size:              8pt;
}
</STYLE> 
</HEAD>
<BODY>
<form name="frmLogTail">
<TABLE WIDTH="500" CELLPADDING="1" CELLSPACING="1" class=tabmain>
  <TR>
   <TD CLASS="header" VALIGN=CENTER>
   File&nbsp;<INPUT TYPE="TEXT" NAME="file" SIZE="50" VALUE="<%=strFileName%>">&nbsp;
   Number of lines&nbsp;<INPUT TYPE="TEXT" NAME="numLines" VALUE="<%=iNumLines%>">&nbsp;
   <INPUT TYPE="SUBMIT" VALUE="Get log" class="button">
   </TD>     
  </TR>                                    
  <TR>
    <TD class="cell">
<%
if(!"".equals(strFileName)) 
{
%> 
    <PLAINTEXT>
<%
Tail.tail(strFileName, iNumLines, out);
}
else
{
%>
   </TD>
  </TR>    
</table>
  </form>
</BODY>
</HTML>
<%
}
%>

