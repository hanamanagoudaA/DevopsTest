<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title><util:configParam id="application.name" type="other"/></title>
        
       <link href="index.css" rel="stylesheet" type="text/css" />  
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js" ></script>
        <script src="http://malsup.github.com/jquery.form.js" ></script>
        <script src="js/fileUploadScript.js" ></script>
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
        
        <center><p><div><b><u>Upload Profile Files</u></b></div></p></center>
        <br />
         <form id="UploadForm" action="UploadMultipleFilesServlet" method="post"  enctype="multipart/form-data">
     <input type="file" size="60" id="myfile" multiple="true" accept=".properties" name="myfile"> 
     <input type="submit" disabled="true" name="upload" value="Profile Upload">
       <div id="progressbox">
         <div id="progressbar"></div>
         <div id="percent">0%</div>
       </div>
 <br />
<div id="message"></div>
</form>
        <br />
        <br />
        <br />
        
    </center>
        </div>
    </body>
</html>
