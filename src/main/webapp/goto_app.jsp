<vxml version="2.0" xmlns="http://www.w3.org/2001/vxml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.w3.org/2001/vxml http://www.w3.org/TR/voicexml20/vxml.xsd">
    <%@ page contentType="text/xml;charset=UTF-8" %> 
    <%@ page import="java.net.URL" %>
    <%@ page import="java.io.FileNotFoundException" %>
    <%@ page import="java.net.HttpURLConnection" %>

    <script>
        //<![CDATA[ 
        function sayAsDigits(number)
        {
            var digitNumber = number.charAt(0);
            for (var i = 1; i < number.length; i++)
            {
                digitNumber += ' ' + number.charAt(i);
            }
            return digitNumber;
        };
        
        function speakTestCallId(number)
        {
            var digitNumber = "";
            for (var i = number.length - 5; i < number.length; i++)
            {
                digitNumber += ' ' + number.charAt(i);
            }
            return digitNumber;
        };
        //]]>
    </script>

    <form id="set_tfn">
        <block>
            <%
                String app = request.getParameter("app");
                String filepath = "/" + app + "/configuration/application/properties/dnis/profile" + request.getParameter("tfn") + ".properties";
                URL myUrl = new URL("http", request.getServerName(), request.getServerPort(), filepath);
                HttpURLConnection con = null;
                con = (HttpURLConnection) myUrl.openConnection();
            %>
            <!--<%= myUrl.toString()%> -->
            <!--<%= con.getResponseCode()%> -->
            <%
            if (con.getResponseCode() == 200 || request.getParameter("tfn") == "00")
            {
            %>  
            <var name="tfn" expr="'<%= request.getParameter("tfn")%>'"/>
            <var name="ani" expr="'<%= request.getParameter("ani")%>'"/>
            <var name="ucid" expr="session.avaya.ucid"/>
            <var name="test" expr="''"/>
            <!--  
            setting Test call <value expr="speakTestCallId(ucid)"/>
            setting D N I S to <value expr="sayAsDigits(dnis)"/>
            setting A N I to <value expr="sayAsDigits(ani)"/>
            -->
            <submit next="http://<%= request.getServerName()%>:<%= request.getParameter("port")%>/<%= app%>/init" method="get" namelist="ucid tfn ani test"/>
            <%}
            else
            {%>  
            D N I S <value expr="sayAsDigits('<%= request.getParameter("tfn")%>')"/> does not have a profile.
            <throw event="nomatch"/>
            <%}%>  
        </block>
    </form>

    <catch event="nomatch">
        <submit next="http://<%= request.getServerName()%>:<%= request.getParameter("port")%>/<%= app%>/router.jsp" method="get"/>
    </catch>

</vxml>