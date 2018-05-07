<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <%
        String pageUrl = request.getRequestURL().toString();
    %>
    <head>
        <title><util:configParam id="application.name" type="other"/></title>

        <link href="index.css" rel="stylesheet" type="text/css" />  
        <meta charset="UTF-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js" ></script>
        <script src="http://malsup.github.com/jquery.form.js" ></script>
        <script src="js/fileUploadExcelScript.js" ></script>
        <!-- Include css styles here -->
        <link href="css/style.css" rel="stylesheet" type="text/css" />
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

                <center><p><div><b><u>Upload TFN Excel</u></b></div></p></center>
                <br />
                <form id="UploadForm" action="UploadTFNSheet" method="post"  enctype="multipart/form-data">
                    <input type="file" size="60" id="myfile" accept=".xlsx" name="myfile"> 
                    <input type="submit" disabled="true" name="upload" value="TFN Excel Upload">
                    <input type="hidden" id="randomVal"  name="randomVal" value="">

                    <div id="progressbox">
                        <div id="progressbar"></div>
                        <div id="percent">0%</div>
                    </div>

                    <br />
                    <div id="message"></div>
                </form>
                <!--<form method="post"  accept-charset="UTF-8">-->
                <div id="second" style="display: none" >
                    <p><input type="radio" name="selectall" value="all" > Select All  <input type="radio" name="selectall" value="none" checked> UnSelect All</p>
                    <input type="button" id="btn_partner" name="uploadprofile" value="Extract Profiles">
                    <div id="containerId">
                    </div>
                </div>
                <div id="message1" style="display: none">
                </div>
                
                <!--</form>-->
                <br />
                <br />
                <br />
                <div id="saur" style="display: none">
                    <a href="/optumrx-mst-ivr/FileDownloadServlet?">Click to Download Property Zipped Files</a>
                </div>
            </center>
        </div>
                        
    </body>
</html>


<script type="text/javascript">


    $('input[name="selectall"]').on('click change', function(e) {

        var lastSelected = $('[name="selectall"]:checked').val();

        if (lastSelected == "all")
        {
            $('input[name=myCheckbox5]').each(function() {

                $(this).attr('checked', true);
            });
        }
        else
        {
            $('input[name=myCheckbox5]').each(function() {

                $(this).prop('checked', false);
            });
        }

    });


    $(document).ready(function() {
        $("#btn_partner").click(function() {
       
        servletCall();

        });

    });
    function servletCall() {
        document.getElementById("message1").style.display = 'none';
        document.getElementById("message").style.display = 'none';
        var filename = $('#randomVal').val();
        var profiles = "";
        $('input[name=myCheckbox5]:checked').each(function() {
            profiles += $(this).val() + ";";
        });


        if (profiles === "") {
            alert("Please Select atleast 1 profile");
            return;
        }


        $.post(
                "UploadSelectedProfiles",
                {filename: filename, profiles: profiles}, //meaasge you want to send
        function(result) {
            alert(result);


            document.getElementById("message1").style.display = 'inline';

            $('#randomVal').val("");
            $('#containerId').val("");
            //$('#message1').val(result);

            $('input:radio[name="selectall"][value="none"]').prop('checked', true);
            document.getElementById("second").style.display = 'none';
            if (result == "Profiles Created Successfully")
            {
                $("#message1").html("<font color='green'>Profiles Created Successfully, Please Download from the below link</font>\n");
            }
            else
            {
                $("#message1").html("<font color='red'>" + result + "</font>");
            }
            document.getElementById("saur").style.display = 'inline';
        });
    }
    ;


</script>