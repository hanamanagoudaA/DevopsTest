<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>	
    <head>
        <title><util:configParam id="application.name" type="other"/></title>

        <link href="index.css" rel="stylesheet" type="text/css" />
        
        <script src="js/uploadFile.js"></script>

        <link rel="stylesheet" href="http://code.jquery.com/ui/1.8.21/themes/base/jquery-ui.css">
        <!-- CSS -->
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
        <script src="http://code.jquery.com/jquery-1.9.1.js"></script>

        <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <script>
            $(function()
            {
                //$("#start_date").datepicker();
                $(function() {
                    $("#start_date").datepicker({maxDate: "0D"});
                });
                $(function() {
                    $("#end_date").datepicker({maxDate: "0D"});
                });
            });
        </script>
        <style type="text/css">
            table.gridtable {
                font-family: verdana,arial,sans-serif;
                font-size:11px;
                color:#333333;
                border-width: 1px;
                border-color: #666666;
                border-collapse: collapse;
            }
            table.gridtable th {
                border-width: 1px;
                padding: 8px;
                border-style: solid;
                border-color: #666666;
                background-color: #dedede;
            }
            table.gridtable td {
                border-width: 1px;
                padding: 8px;
                border-style: solid;
                border-color: #666666;
                background-color: #ffffff;
            }
        </style>
    </head>

    <body>
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
        <div  id="footer">


            <center>


                <form name='myForm'>
                    

                    <input type="hidden" id="trow" value='0'/>
                    <input type="hidden" id="crow" value='0'/>
                    <input type="hidden" id="limitt" value='10'/>

                    <center><p><div><b><u>CTI Data Search</u></b></div></p></center>
                    <br />
                    <p>
                        <input type="text" id="start_date" readonly="true" placeholder="Start Date" />
                    </p>
                    <p>
                        <input type="text" id="end_date" readonly="true" placeholder="End Date" />
                    </p>

                    <p>
                        <input type="text" id="caller_id" placeholder="Caller ID" />
                    </p>
                    
                    <p>
                        <input type="text" id="ucid" placeholder="Last 5 digit of UCID" />
                    </p>

                    <p><div id="msg" ></div></p>
                    <p><input type='button' onclick='caller_mis(0);'
                              value='Get Report'/></p>

                    <p><div id="table1" ></div></p>
                    <p id="few" style="display:none;">
                        <input type='button' disabled="true" id="first" onclick='caller_mis(0);' value='<<'/>
                        <input disabled="true" type='button' id="previous" onclick='caller_mis(-1);' value='<'/>
                        <input disabled="true" type='button' id="next" onclick='caller_mis(1);' value='>'/>
                        <input disabled="true" type='button' id="last" onclick='caller_mis(-2);' value='>>'/>
                    </p>

                </form>


        </div>
    </body>

</html>