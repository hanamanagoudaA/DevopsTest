<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="com.nuance.framework.oam.ExecutionResponse"%>
<%@page import="com.nuance.framework.oam.ChangeResponse"%>
<%@page import="com.nuance.framework.logging.Logger"%>
<%@page import="com.nuance.framework.logging.LoggerManager"%>
<%@page import="com.nuance.framework.oam.ReloaddataInterfaceMBean"%>
<%@page import="com.nuance.framework.oam.OAMConstants"%>
<%@page import="java.net.URLEncoder"%>
<!--In this section the elements are prepared for display -->
<%
    Logger logger = LoggerManager.getLogger("com.nuance.framework.management.jsp");
    ReloaddataInterfaceMBean reloaddataInterface = (ReloaddataInterfaceMBean) request.getAttribute(OAMConstants.ATTRIBUTE_NAME_RELOADDATA_INTERFACE);
    String reqURI = (String) request.getRequestURI();
    String contextPath = request.getContextPath();
    String managementPath = contextPath + "/dialogs/management";
    ExecutionResponse executionResponse = (ExecutionResponse) request.getAttribute(OAMConstants.ATTRIBUTE_NAME_EXECUTION_RESPONSE);
    ChangeResponse changeResponse = (ChangeResponse) request.getAttribute(OAMConstants.ATTRIBUTE_NAME_CHANGE_RESPONSE);

    String noVariableText = "No shared variables available";
    String noMethodText = "No shared methods available";

    int varKeyMax = -1;//noVariableText.length();
    int varChoiceMax = -1;
    int varFreeMax = -1;
    int methMax = -1;//noMethodText.length();

    boolean varsAvailable = false;
    boolean methodsAvailable = false;

    String methodOptions = "";
    String methodElementAttribute = "";
    String[] methods = reloaddataInterface.getMethodKeys();
    if (methods != null && methods.length > 0)
    {
        methodsAvailable = true;
        for (String m : methods)
        {
            methodOptions += "<option>";
            methodOptions += m;
            if (methMax < m.length())
            {
                methMax = m.length();
            }
            methodOptions += "</option>";
        }
    }
    else
    {
        methMax = noMethodText.length();
        methodOptions += "<option>" + noMethodText + "</option>";
        methodElementAttribute = "disabled=\"disabled\" ";
    }

    String mapDefScript = "var map = new Object();";

    String variableOptions = "";
    String variableElementAttribute = "";

    String[] variables = reloaddataInterface.getVariableKeys();
    if (variables != null && variables.length > 0)
    {
        varsAvailable = true;
        for (String v : variables)
        {
            if (varKeyMax < v.length())
            {
                varKeyMax = v.length();
            }
            String currentValue = reloaddataInterface.getValue(v).toString();
            //the code for the selection
            variableOptions += "<option>";
            variableOptions += v;
            variableOptions += "</option>";
            //get choice for the variable
            Object[] choice = reloaddataInterface.getChoice(v);
            String htmlTxt = "";
            //if there is a choice for that variable, add a combo box 
            if (choice != null && choice.length > 0)
            {
                htmlTxt += "<select class=\"table-cell\" name=\"" + OAMConstants.PARAM_NAME_VARIABLE_VALUE + "\">";
                for (int i = 0; i < choice.length; i++)
                {
                    if (varChoiceMax < choice[i].toString().length())
                    {
                        varChoiceMax = choice[i].toString().length();
                    }
                    //select the current value if contained
                    //otherwise the first entry will be selected
                    if (choice[i].toString().equals(currentValue))
                    {
                        htmlTxt += "<option selected=\"selected\">" + choice[i] + "</option>";
                    }
                    else
                    {
                        htmlTxt += "<option>" + choice[i] + "</option>";
                    }
                }
                htmlTxt += "</select>";
            }
            //for elements with no choice add a text field
            else
            {
                if (varFreeMax < currentValue.length())
                {
                    varFreeMax = currentValue.length();
                }
                htmlTxt += "<input class=\"table-cell\" name=\"" + OAMConstants.PARAM_NAME_VARIABLE_VALUE + "\" type=\"text\" value=\"" + currentValue + "\"/>";
            }
            mapDefScript += "\n map['" + v + "']='" + htmlTxt + "';";
        }
    }
    else
    {
        varKeyMax = noVariableText.length();
        mapDefScript += "\n map['No shared variables available']='<p/>';";
        variableOptions += "<option>No shared variables available</option>";
        variableElementAttribute = "disabled=\"disabled\" ";
    }

    double factor = 7.0;
    int buttonPart = 4;
    int marginWidth = 8;

    int methodListWidth = -1;
    int varListWidth = -1;
    int varValueWidth = -1;

    String debug = "";

    if (!varsAvailable)
    {
        int units = Math.max(varKeyMax, methMax);
        methodListWidth = (int) (factor * units);
        varListWidth = (int) (factor * units);
    }

    else
    {
        int tempVarListWidth = (int) (varKeyMax * factor);
        int tempVarValueWidth = (int) (Math.max(varFreeMax, varChoiceMax + buttonPart) * factor);
        int tempVarWidth = tempVarValueWidth + tempVarListWidth + marginWidth;
        int tempMethListWidth = (int) ((methMax + buttonPart) * factor);

        if (tempVarWidth == tempMethListWidth)
        {
            varListWidth = tempVarListWidth;
            varValueWidth = tempVarValueWidth;
            methodListWidth = tempMethListWidth;
        }
        else
        {
            if (tempVarWidth < tempMethListWidth)
            {

                int diff = tempMethListWidth - tempVarWidth;
                if (diff % 2 == 0)
                {
                    varListWidth = tempVarListWidth + diff / 2;
                }
                else
                {
                    varListWidth = tempVarListWidth + diff / 2 + 1;
                }
                varValueWidth = tempVarValueWidth + diff / 2;
                methodListWidth = tempMethListWidth;
            }
            else
            {
                int diff = tempVarWidth - tempMethListWidth;
                varListWidth = tempVarListWidth;
                varValueWidth = tempVarValueWidth;
                methodListWidth = tempMethListWidth + diff;
            }
        }
    }

//Apply sizes to the map...
    mapDefScript = mapDefScript.replaceAll("<input", "<input style=\"width: " + varValueWidth + "px; margin-left:" + marginWidth + "px;\"");
    mapDefScript = mapDefScript.replaceAll("<select", "<select style=\"width: " + varValueWidth + "px; margin-left:" + marginWidth + "px;\"");

%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <link rel="stylesheet" href="<%=managementPath%>/mserver.css"/>
        <script type="text/javascript" src="<%=managementPath%>/utils.js"></script>
        <script>
        <!--
            <%
                //print the definition of the named array created before to
                //construct the object
                out.println(mapDefScript);
            %>
            function updateValues(select) {
                var val = select.options[select.options.selectedIndex].text;
                var content = map[val];
                var divElem = document.getElementById('<%=OAMConstants.PARAM_NAME_VARIABLE_VALUE%>.cell');
                divElem.innerHTML = content;
            }

            function handleSubmitVariable() {
                document.getElementById('<%=OAMConstants.PARAM_NAME_CMD%>').value = '<%=OAMConstants.PARAM_VALUE_CMD_SUBMIT_VARIABLE%>';
                document.mainForm.submit();
            }

            function handleSubmitMethod() {
                document.getElementById('<%=OAMConstants.PARAM_NAME_CMD%>').value = '<%=OAMConstants.PARAM_VALUE_CMD_SUBMIT_METHOD%>';
                document.mainForm.submit();
            }

            function handleRefresh() {
                document.getElementById('<%=OAMConstants.PARAM_NAME_CMD%>').value = '<%=OAMConstants.PARAM_VALUE_CMD_REFRESH%>';
                document.mainForm.submit();
            }

            function handleCancel() {
                top.close();
            }
//-->
        </script>
    </head>
    <!-- <body onload="setDynamicStyle(); updateValues(document.getElementById('<%//=OAMConstants.PARAM_NAME_VARIABLE_KEY%>'));">-->
    <body onload="setDynamicStyle();">
        <form name="mainForm" action="<%=contextPath%>/reloaddata.oam" method="post">
            <input type="hidden" id="<%= OAMConstants.PARAM_NAME_CMD%>" name="<%= OAMConstants.PARAM_NAME_CMD%>" value="<%= OAMConstants.PARAM_VALUE_CMD_REFRESH%>"/>
            <table class="displayNoFrame" align="center" cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                        <h1>NDF Reload Data</h1>
                    </td>
                </tr>
            </table>
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td nowrap="nowrap" align="right">
                        <img src="<%=managementPath%>/images/transparent.gif" width="1" height="15">
                <nobr><a class="right-content-menu-item" href="javascript: handleRefresh()">Refresh</a></nobr>
                </td>
                </tr>
                <tr>
                    <td>
                        <img src="<%=managementPath%>/images/light_blue_line.gif" border="0" height="1" vspace="4" width="100%">
                    </td>
                </tr>
            </table>
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td><img src="<%=managementPath%>/images/transparent.gif" width="1" height="4"></td>
                </tr>
                <tr>
                    <td width="150"><nobr>Execute Shared</nobr> Method: </td>
                <td>

                    <!-- <select style="width: <%//=methodListWidth%>px;" class="table-cell" name="<%//=OAMConstants.PARAM_NAME_METHOD_KEY%>" <%//=methodElementAttribute%>><%//=methodOptions%></select> -->

                    <select style="width: <%=methodListWidth%>px;" class="table-cell" name="<%=OAMConstants.PARAM_NAME_METHOD_KEY%>" <%=methodElementAttribute%>>
                        <option>TFNMapReload() - com.nuance.catamaran.dataaccess.accessor.TFNMapAccessor </option>
                        <option>DrugPromptReload() - com.nuance.catamaran.dataaccess.accessor.DrugPromptAccessor</option>
                        <option>BackendConfigurationReload() - com.nuance.catamaran.dataaccess.accessor.ClientServiceAccessor</option>
                        <option>BIEByPassANIReload() - com.nuance.catamaran.dataaccess.accessor.BIEByPassANIAccessor</option>
                    </select>
                </td>
                <td>
                    <div style="margin-top:2px;margin-bottom:3px;">
                        <a style="margin-left:<%=marginWidth%>px;<%=methodsAvailable ? "" : "cursor:default;"%>" class="<%=methodsAvailable ? "button-enabled" : "button-disabled"%>" href="javascript: <%=methodsAvailable ? "handleSubmitMethod();" : ""%>">Apply</a>
                    </div>
                </td>
                </tr>
            </table>
        </form>
        <br/>
        <table width="100%"><tr><td>
                    <!-- Information on the last executed action -->				
                    <center>	
                        <%
                            if (executionResponse != null)
                            {
                        %>
                        <span style="font-size:11px;"><b>Last action: Shared method execution</b><br/><br/>
                            Executed method: <%=executionResponse.getKey()%><br/></span>
                            <%if (executionResponse.getException() != null)
                        {%>
                        <span style="font-size:11px;">An exception was thrown: <%=executionResponse.getException().getClass()%><br/>
                            Message: <%=executionResponse.getException().getMessage()%></span>
                            <%}
                    else
                    {%>
                        <span style="font-size:11px;">Return value: '<%=executionResponse.getReturnValue()%>'<br/>
                            The execution was successful.</span>
                            <%} %>
                            <%} %>
                            <% if (changeResponse != null)
                        {%>
                        <span style="font-size:11px;"><b>Last action: Shared variable assignment</b><br/><br/>
                            Changed variable: <%=changeResponse.getKey()%><br/></span>
                            <%if (changeResponse.getException() != null)
                        {%>
                        <span style="font-size:11px;">An exception was thrown: <%=changeResponse.getException().getClass()%><br/>
                            Message: <%=changeResponse.getException().getMessage()%></span>
                            <%}
                    else
                    {%>
                        <span style="font-size:11px;">New value: '<%=URLEncoder.encode(changeResponse.getNewValue().toString(), "utf-8")%>'<br/>
                            The assignment was successful.</span>
                            <%} %>
                            <%}%>
                    </center>
                </td></tr></table>
    </body>
</html>