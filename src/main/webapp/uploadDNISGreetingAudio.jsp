<%@ taglib uri="/WEB-INF/tld/ndf-utils.tld" prefix="util"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
         <title><util:configParam id="application.name" type="other"/></title>

        <link href="index.css" rel="stylesheet" type="text/css" />  
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <script src="js/uploadFile.js"></script>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>

    </head>
    <body onload="getDNISFileNames();">
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
            <center><p><div><b><u>Upload Profile Greeting Audio</u></b></div></p></center>
        <form id="Client_Form">
            <p><label>Choose Profile :</label>
            <select id="selectDNIS">
                <option>Profile</option>\
            </select></p>
            
            <p><input id="fileToUpload" type="file" size="45" name="fileToUpload" accept="audio/*"></p>
		
		<p><input type='button' onclick='uploadDNISAudioFiles();'
                              value='Upload File'/></p>
                <p><div id="msg" ></div></p>
        </form>
            </center>
            <br />
        </div>
    </body>
</html>
