<vxml version="2.0" xmlns="http://www.w3.org/2001/vxml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.w3.org/2001/vxml http://www.w3.org/TR/voicexml20/vxml.xsd">
    <%@ page contentType="text/xml;charset=UTF-8" %> 
    <%
        String app = "optumrx-mst-ivr";
    %>
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
        }

        //]]>
    </script>

    <var name="app" expr="'<%= app%>'"/>
    <!--<var name="dnis" expr="session.telephone.dnis"/>-->
    <var name="tfn" expr="session.telephone.tfn"/>
    <var name="ani" expr="session.telephone.ani" />  
    <var name="port" expr="'<%= String.valueOf(request.getServerPort())%>'" /> 
    <var name="test" expr="''"/>

    <form id="check_dev" scope="document">
        <block>
            <%
                String callModeUrl = "'dev'";
                if (request.getParameter("dev") == null)
                {
                    callModeUrl = "'test'";
            %>
            <goto next="#enter_tfn" />
            <%}else{%>
            <goto next="#enter_port" />
            <%}%>
        </block>
    </form>
    <form id="enter_port" scope="document">
        <field name="test_port" type="digits?minlength=4;maxlength=5">
            <property name="termchar" value="#"/>
            <prompt> enter the test port number, followed by the pound key.</prompt>
            <filled>
                <if cond="test_port != '00'">
                    <assign name="port" expr="test_port"/>
                </if>
                <goto next="#enter_tfn" />
            </filled>
            <noinput>you did not enter a value for the test port, please try again.</noinput>
        </field>
    </form>    
    <form id="enter_tfn" scope="document">
        <field name="test_tfn" type="digits?minlength=2;maxlength=10">
            <property name="termchar" value="#"/>
            <prompt> enter the T F N, followed by the pound key... Enter zero zero followed by the pound key for default</prompt>
            <filled>
                <if cond="test_tfn != '00'">
                    <assign name="tfn" expr="test_tfn"/>
                </if>
                <goto next="#enter_ani" />
            </filled>
            <noinput>you did not enter a value for the T F N, please try again.</noinput>
        </field>
    </form>

    <form id="enter_ani" scope="document">
        <field name="test_ani" type="digits?minlength=2;maxlength=10">
            <property name="termchar" value="#"/>
            <prompt> enter the A N I, followed by the pound key... Enter zero zero followed by the pound key for default</prompt>
            <filled>
                <if cond="test_ani != '00'">
                    <assign name="ani" expr="test_ani"/>
                </if>                
                <submit next="http://<%= request.getServerName()%>:<%= String.valueOf(request.getServerPort())%>/<%= app%>/goto_app.jsp" method="get" namelist="tfn ani port app"/>                    
            </filled>
            <noinput>you did not enter a value for the A N I, please try again.</noinput>
        </field>
    </form>

    <catch event="nomatch noinput" count="2">
        <log expr="'***** Exceeded Attempts - Defaulting  *****'"/>
        <prompt>using default settings. T F N set to <value expr="sayAsDigits(tfn)"/> and A N I set to <value expr="sayAsDigits(ani)"/></prompt> 
        <submit next="http://<%= request.getServerName()%>:<%= String.valueOf(request.getServerPort())%>/<%= app%>/init" method="get" namelist="tfn ani port app test"/>
    </catch>
</vxml>