<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <%
        String pageUrl = request.getRequestURL().toString();
    %>

    <head>
        <title><util:configParam id="application.name" type="other"/></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <link href="index.css" rel="stylesheet" type="text/css" />
    </head>

    <body>
        *****
        <div id="masthead">
            <table cellpadding="10" style="width: 100%">
                <tr>
                    <td style="width: 80%">
                        <h1>
                            <util:configParam id="application.name" type="other"/>
                        </h1>
                    </td>
                    <td class="logo">
                        <img alt="Member Services IVR Technology Team" src="http://catamaranrx.com/uploadedImages/Images/catamaranLogo.png" /></td>
                </tr>
            </table>
        </div>
        <div id="top_nav">
            <table cellpadding="10">
                <tr>
                    <td>VXML Application Initial URL:&nbsp;<a href="<%=pageUrl%>init"><%=pageUrl%>init</a>
                        <br />
                        Release: 3.0
                        <br/>
                        Version: <util:configParam id="application.version" type="other"/>
                    </td>
                </tr>
            </table>
        </div>
        <div id="footer">
            <div id="page_content" style="height: 805px">
                <h4>Application Releases Notes</h4>
                <ul>
                    <li><a href="">Catamaran Callflow Document - N/A</a></li>
                    <li><a href="docs/Catamaran_IVR_DID.pdf">Catamaran Data Interface Document</a></li>
                    <li><a href="docs/Catamaran_IVR_SA.pdf">Catamaran System Architecture Document</a></li>
                    <li><a href="docs/Catamaran_IVR_VUI.pdf">Catamaran VUI Document</a></li>
                    <li><a href="docs/Release_Transmittal.pdf">Release Transmittal Document</a></li>
                </ul>
                <p></p>
                <h4>Configuration Management Service</h4>
                <ul>
                    <li><form action="viewDNIS.jsp" method="get">
                            View Profile: <input type="text" name="dnis" />
                            <input type="hidden" name="app" value="optum-ivr">
                            <input type="submit"/>
                        </form>
                    </li>
                    <li><a href="uploadTFN.jsp">Upload xlsx Profile</a></li>
                    <li><a href="uploadProfile.jsp">Upload Profile property </a></li>
             <!--       <li><a href="showCTIReport.jsp">Show CTI Report</a></li>-->
                    <li><a href="uploadDNISGreetingAudio.jsp">Upload Profile Greeting</a></li>
                    <li><a href="uploadPrompt.jsp">Upload Dynamic Prompt</a></li>
                    <li><a href="<%=pageUrl%>reloaddata.oam">Reload Configurations</a></li>
                    <li><a href="<%=pageUrl%>settings.oam">Application Settings</a></li>
                    <li><a href="<%=pageUrl%>plugins/data-access-service/DataAccessTester.html">Data Access Tester</a></li>
                    <li><a href="<%=pageUrl%>plugins/audio-service/Validator.html">Audio Service Tester</a></li>
                    <li><a href="<%=pageUrl%>plugins/ndm-service/instanceConfiguration.html">NDM Service Tester</a></li>
                    <li><a href="<%=pageUrl%>plugins/nar-logging/NARLogViewer.html">NAR Log Viewer</a></li>
                    <li><a href="LoadLoggerConfiguration.logger">Log4j Runtime Updater</a></li>
                    <li><a href="bypassANIConfigure.jsp">Bypass ANI Configuration</a></li>
                </ul>
                <p></p>
            </div>
        </div>

    </body>

</html>

