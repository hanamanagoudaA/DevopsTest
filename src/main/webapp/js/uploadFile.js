function uploadDNISAudioFiles(){
   
       document.getElementById('msg').innerHTML="";
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
   
var selectDNIS=document.getElementById("selectDNIS").value;
                var fileToUpload=document.getElementById("fileToUpload").value;
    if(fileToUpload=="")
                {
                                alert('Please Upload File');
                                return;
                }
                 var ext = fileToUpload.substring(fileToUpload.lastIndexOf('.') + 1);
 
    if(ext !="wav")
    {
        alert("Upload wav Audio only");
        document.getElementById("fileToUpload").value="";
        return false;
    }
 
        if(selectDNIS=="DNIS")
                {
                alert("Please Select DNIS Profile");
                return;
                }
          
    var url="UploadDNISGreetingAudio?method=1234&dnis=" + document.getElementById("selectDNIS").value;
    var form=document.getElementById("Client_Form");
    var formData = new FormData(form);
   
    xmlhttp.open("POST",url,true);
    xmlhttp.send(formData);
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
           
            var res = xmlhttp.responseText.split("||");
            if(res[0]==1)
            {
               
                document.getElementById('msg').innerHTML=res[1];
            }
            else
            {
                document.getElementById('msg').innerHTML=res[1];
            }
           
            document.getElementById("fileToUpload").value="";
           
                
            
        }
    };
     
}
function uploadMultipleFiles(){
    
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(document.getElementById("file").value=="")
    {
        alert("Please select files to upload");
        document.getElementById('response').innerHTML="";
        return false;
    }
    var url="UploadMultipleFilesServlet";
    var form=document.getElementById("Client_Form");
    var formData = new FormData(form);
    xmlhttp.open("POST",url,true);
    xmlhttp.send(formData);
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var res = xmlhttp.responseText.split("|");
            if(res[0]==1)
            {
                var response="";
                var split=res[1].split(";");
                for(i = 0; i < split.length; i++)
                {
                    response += split[i] + "<br />" ;
                }
                document.getElementById('response').innerHTML=response;
            }
            else
            {
                document.getElementById('response').innerHTML=res[1];
            }
            
            document.getElementById("file").value="";
            
                
            
        }
    };
}

function uploadMultiplePrompts(){
    
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(document.getElementById("file").value=="")
    {
        alert("Please select files to upload");
        document.getElementById('response').innerHTML="";
        return false;
    }
    var url="UploadMultiplePromptServlet";
    var form=document.getElementById("Client_Form");
    var formData = new FormData(form);
    xmlhttp.open("POST",url,true);
    xmlhttp.send(formData);
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            var res = xmlhttp.responseText.split("|");
            if(res[0]==1)
            {
                var response="";
                var split=res[1].split(";");
                for(i = 0; i < split.length; i++)
                {
                    response += split[i] + "<br />" ;
                }
                document.getElementById('response').innerHTML=response;
            }
            else
            {
                document.getElementById('response').innerHTML=res[1];
            }
            
            document.getElementById("file").value="";
            
                
            
        }
    };
}

// jquery function for validation

$(document).ready(function()
{

  $("#upload").click(function(){
     var files = $('#file')[0].files;
    var len = $('#file').get(0).files.length;
    var check_Ext=true;
    var check_Size=true;
    for (var i = 0; i < len; i++) {

        f = files[i];
        var ext = f.name.split('.').pop().toLowerCase();
        if ($.inArray(ext, ['properties']) == -1) {            
            check_Ext=false;
        }
        else
        {
           if (f.size==0) {            
                check_Size=false;
            }
        }
    }
    if(check_Ext==true && check_Size==true)
    {
        uploadMultipleFiles();
    }
    else if(check_Size==false)
    {
        alert('Files are empty!');
        document.getElementById("file").value="";
    }
    else
    {
        alert('Invalid Extension!');
        document.getElementById("file").value="";
    }
      
    
  });
  $("#uploadprompt").click(function(){
     var files = $('#file')[0].files;
    var len = $('#file').get(0).files.length;
    var check_Ext=true;
    var check_Size=true;
    for (var i = 0; i < len; i++) {

        f = files[i];
        var ext = f.name.split('.').pop().toLowerCase();
        if ($.inArray(ext, ['wav']) == -1) {            
            check_Ext=false;
        }
        else
        {
           if (f.size==0) {            
                check_Size=false;
            }
        }
    }
    if(check_Ext==true && check_Size==true)
    {
        uploadMultiplePrompts();
    }
    else if(check_Size==false)
    {
        alert('Files are empty!');
        document.getElementById("file").value="";
    }
    else
    {
        alert('Invalid Extension!');
        document.getElementById("file").value="";
    }
      
    
  });
    
});



function ajRequest(src)
{
    var ajaxRequest;  // The variable that makes Ajax possible!

    try {
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer Browsers
        try {
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }
        }
    }

    ajaxRequest.open("GET", src, true);
    ajaxRequest.send(null);
    return ajaxRequest;
}

//***********  Validation for blank field  ****************

function isBlank(val)
{
    for(var i=0;i<val.length;i++)
        {
            if(document.getElementById(""+val[i]+"").value.length===0)
                {
                     alert("Enter the "+val[i]+" .");
                     document.getElementById(""+val[i]+"").focus();
                     return false;
                }
        }
}


function isValidDate(dateString)
{
    // First check for the pattern
   var regex_date = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
   // var regex_date=/^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/;
alert(dateString);
    if(!regex_date.test(dateString))
    {
        alert(dateString);
        return false;
    }

    // Parse the date parts to integers
    var parts   = dateString.split("-");
    var day     = parseInt(parts[2], 10);
    var month   = parseInt(parts[1], 10);
    var year    = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
    {
        return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}
//***********  Validation for 10 digit mobile no. ****************

function validateMobile(mobile)
{
    var mobileFormat= /^\d{10}$/;
    for(var i=0;i<mobile.length;i++)
        {
            if(!mobileFormat.test(document.getElementById(""+mobile[i]+"").value))
                {
                    alert("Enter valid 10-digit "+mobile[i]+" .");
                    document.getElementById(""+mobile[i]+"").focus();
                    return false;
                }
            if(mobileFormat.test(document.getElementById(""+mobile[i]+"").value))
            {
                var no=document.getElementById(""+mobile[i]+"").value;
                if(no.charAt(0)==0 && no.charAt(1)==0)
                {
                    alert("Enter valid 10-digit "+mobile[i]+" .");
                    document.getElementById(""+mobile[i]+"").focus();
                    return false;
                }    
            }
        }
}


function caller_mis(pageNo) {
    
    var crow = document.getElementById("crow").value;
    var date1 = document.getElementById("start_date").value;
    var limitt= document.getElementById("limitt").value;
    var date2 = document.getElementById("end_date").value;
    var callerID = document.getElementById("caller_id").value;
    var UCID = document.getElementById("ucid").value;
    var minus = 0;
    
    if(callerID == "" && UCID == "") {
        document.getElementById("first").style.visibility = "hidden";
                document.getElementById("previous").style.visibility = "hidden";
                document.getElementById("next").style.visibility = "hidden";
                document.getElementById("last").style.visibility = "hidden";
                document.getElementById("table1").style.visibility = "hidden";
    document.getElementById('msg').innerHTML="Please Enter either Caller ID or UCID";
    return false;
    }

    if(UCID.length == 0 && callerID.length != 0) {
    if(callerID.length != 10) {
        document.getElementById("first").style.visibility = "hidden";
                document.getElementById("previous").style.visibility = "hidden";
                document.getElementById("next").style.visibility = "hidden";
                document.getElementById("last").style.visibility = "hidden";
                document.getElementById("table1").style.visibility = "hidden";
    document.getElementById('msg').innerHTML="Caller ID must be 10 digits";
    return false;
    }
    }
    if(UCID.length != 0 && callerID.length == 0) 
    {
    if(UCID.length != 5) {
        document.getElementById("first").style.visibility = "hidden";
                document.getElementById("previous").style.visibility = "hidden";
                document.getElementById("next").style.visibility = "hidden";
                document.getElementById("last").style.visibility = "hidden";
                document.getElementById("table1").style.visibility = "hidden";
    document.getElementById('msg').innerHTML="UCID must be 5 digits";
    return false;
    }
    }
    if(UCID.length != 0 && callerID.length != 0) {
    if(callerID.length != 10) {
        document.getElementById("first").style.visibility = "hidden";
                document.getElementById("previous").style.visibility = "hidden";
                document.getElementById("next").style.visibility = "hidden";
                document.getElementById("last").style.visibility = "hidden";
                document.getElementById("table1").style.visibility = "hidden";
    document.getElementById('msg').innerHTML="Caller ID must be 10 digits";
    return false;
    }
    
    
    if(UCID.length != 5) {
        document.getElementById("first").style.visibility = "hidden";
                document.getElementById("previous").style.visibility = "hidden";
                document.getElementById("next").style.visibility = "hidden";
                document.getElementById("last").style.visibility = "hidden";
                document.getElementById("table1").style.visibility = "hidden";
    document.getElementById('msg').innerHTML="UCID must be 5 digits";
    return false;
    }
    }
    
                    /*    if(date1!="")
			{
                            alert(date1);
                            if(isValidDate(date1)==false)
                            {
                                alert("invalid date");
                                return false;
                            }
			}*/

//	if(date2=="")
//			{
//				alert("Please Select End Date");

//				return;
//			}




    if (pageNo == 0)
    {
        crow = "0";
    }
    else if (pageNo == -1)
    {
        crow = parseInt(crow) - 1;
        minus = 1;
    }
    else if (pageNo == 1)
    {
        crow = parseInt(crow) + 1;
    }
    else if (pageNo == -2)
    {
        var trow = document.getElementById("trow").value;
        var rowlimit = trow % limitt;
        if (rowlimit > 0)
        {
            rowlimit = 1;
        }
        minus = -2;
        crow = (Math.floor(trow / limitt)) + rowlimit - 1;
    }

    var src = "GetCTIData?method=summary&date1=" + date1 + "&date2=" + date2 + "&ani=" + callerID + "&ucid=" + UCID + "&crow=" + crow + "&minus=" + minus + "&limit=" + limitt;
    
    var ajaxRequest = ajRequest(src);

    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState == 4) {
        var strr = ajaxRequest.responseText.split(";");
        
        if(strr[0]=="0")
        {
            document.getElementById('msg').innerHTML="No Record Found";
                document.getElementById("first").style.visibility = "hidden";
                document.getElementById("previous").style.visibility = "hidden";
                document.getElementById("next").style.visibility = "hidden";
                document.getElementById("last").style.visibility = "hidden";
                document.getElementById("table1").style.visibility = "hidden";
                
        }
        else
        {
            document.getElementById('msg').innerHTML="<a href='" + window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')) + "/downloadCTIReport?date1=" + date1 + "&date2=" + date2 + "&ucid=" + UCID + "&ani=" + callerID + "'> Download Searched Data in Excel </a>";
        
         document.getElementById("first").style.visibility = "visible";
                document.getElementById("previous").style.visibility = "visible";
                document.getElementById("next").style.visibility = "visible";
                document.getElementById("last").style.visibility = "visible";
                document.getElementById("table1").style.visibility = "visible";
                
            document.getElementById('trow').value = strr[0];
            document.getElementById('crow').value = strr[1];
            var cr = (parseInt(strr[1]) + 1) * limitt;
            if (parseInt(strr[1]) == 0 && parseInt(strr[0]) <= limitt)
            {
                document.getElementById("first").disabled = true;
                document.getElementById("previous").disabled = true;
                document.getElementById("next").disabled = true;
                document.getElementById("last").disabled = true;
            }
            else if (parseInt(strr[1]) == 0 && cr < parseInt(strr[0]))
            {
                document.getElementById("first").disabled = true;
                document.getElementById("previous").disabled = true;
                document.getElementById("next").disabled = false;
                document.getElementById("last").disabled = false;
            }
            else if (parseInt(strr[1]) > 0 && cr < parseInt(strr[0]))
            {
                document.getElementById("first").disabled = false;
                document.getElementById("previous").disabled = false;
                document.getElementById("next").disabled = false;
                document.getElementById("last").disabled = false;
            }
            else if (cr >= parseInt(strr[0]))
            {
                document.getElementById("first").disabled = false;
                document.getElementById("previous").disabled = false;
                document.getElementById("next").disabled = true;
                document.getElementById("last").disabled = true;
            }

            if (document.getElementById('crow').value * 3 < document.getElementById('trow').value)
            {
                document.getElementById("few").style.display = "block";
            }
            var root = document.getElementById('table1');
            root.innerHTML = "";
            var tab = document.createElement('table');
            tab.className = "gridtable";

            var tbo = document.createElement('tbody');
            var row, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, row0, cell01, cell02, cell03, cell04, cell05, cell06, cell07, cell08, cell09, cell010, cell011;

            row0 = document.createElement('tr');
            cell01 = document.createElement('th');
            cell02 = document.createElement('th');
            cell03 = document.createElement('th');
            

            cell01.appendChild(document.createTextNode('Call Date'));
            cell02.appendChild(document.createTextNode('UCID'));
            cell03.appendChild(document.createTextNode(''));
            row0.appendChild(cell01);
            row0.appendChild(cell02);
            row0.appendChild(cell03);
            tbo.appendChild(row0);

            var str = strr[2].split("||");

            
            for (var i = 1; i < str.length; i++)
            {
                var strrr = str[i].split(",");

                row = document.createElement('tr');
                cell1 = document.createElement('td');
                cell2 = document.createElement('td');
                cell3 = document.createElement('td');
                

                cell1.appendChild(document.createTextNode(strrr[0]));
                cell2.appendChild(document.createTextNode(strrr[1].substring(15)));
                
                row.appendChild(cell1);
                row.appendChild(cell2);
                
                
                var a = document.createElement('a');
                var linkText = document.createTextNode("View Data");
                a.appendChild(linkText);
                a.title = "View Data";
                a.href = "javascript:showData('" + strrr[1] + "');";

		cell3.appendChild(a);
                row.appendChild(cell3);
                tbo.appendChild(row);
            }
            tab.appendChild(tbo);
            root.appendChild(tab);
        }
    }
    }
}


function download_mis() {
    
    var date1 = document.getElementById("start_date").value;
    var date2 = document.getElementById("end_date").value;
    var callerID = document.getElementById("caller_id").value;
    var ucid = document.getElementById("ucid").value;
    
    var src = "downloadCTIReport?date1=" + date1 + "&date2=" + date2 + "&ani=" + callerID + "&ucid=" + ucid;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST",src,true);
    xmlhttp.send();
   
}

function showData(val)
{
//	window.open("viewCallData.jsp?child=" + val, "View " + val, 'height=600,width=1000,titlebar=no,location=0,toolbar=no,menubar=no,scrollbars=no,resizable=no');
        window.open("viewCallData.jsp?ucid=" + val, "View " + val, 'height=600,width=1000');

}


function getCallData(){

        var qrStr = window.location.search;
    var spQrStr = qrStr.substring(1);
    //var arrQrStr = new Array();
    var arr = spQrStr.split('&');


    var queryvalue = arr[0].split('=');
    
    var ucid=queryvalue[1];

    var src="GetCTIData?method=detail&ucid="+ucid;
    
     var ajaxRequest=ajRequest(src);

     ajaxRequest.onreadystatechange = function(){
       if(ajaxRequest.readyState == 4){

          var strr=ajaxRequest.responseText.split("|");

            document.getElementById('ucid').value=ucid;
            document.getElementById('tfn').value=strr[2];
            document.getElementById('DNIS').value=strr[3];
            document.getElementById('ANI').value=strr[4];
            document.getElementById('ESB_PROVIDER').value=strr[5];
            document.getElementById('ESB_INSTANCE').value=strr[6];
            document.getElementById('CTI_DATASTORE').value=strr[7];
            document.getElementById('REASON_CODE').value=strr[8];
            document.getElementById('CALL_TYPE').value=strr[9];
            document.getElementById('MEMBER_FIRST_NAME').value=strr[10];
            document.getElementById('MEMBER_LAST_NAME').value=strr[11];
            document.getElementById('MEMBER_DOB').value=strr[12];
            document.getElementById('MEMBER_GENDER').value=strr[13];
            document.getElementById('MEMBER_ZIP').value=strr[14];
            document.getElementById('MEMBER_ID').value=strr[15];
            document.getElementById('RX_CODE').value=strr[16];
            document.getElementById('RX_NUMBER').value=strr[17];
            document.getElementById('NPI').value=strr[18];
            document.getElementById('EMP').value=strr[19];
            document.getElementById('MEDD').value=strr[20];
            document.getElementById('CREATED').value=strr[21];
            document.getElementById('LAST_ACCESS').value=strr[22];
            document.getElementById('LAST_UPDATE').value=strr[23];
            document.getElementById('CLIENT_NAME').value=strr[24];
            document.getElementById('GEN').value=strr[25];
            document.getElementById('PROSPECT').value=strr[26];
            document.getElementById('CLIENT_DESCRIPTION').value=strr[27];
            document.getElementById('RXEXPRESS_CARRIER_ID').value=strr[28];
            document.getElementById('RXEXPRESS_MEMBER_ID').value=strr[29];
            document.getElementById('LAST_FILL_DATE').value=strr[30];
            document.getElementById('RXNUMBERS_IN_ORDER').value=strr[31];
            document.getElementById('MAIL_SHIPPING_ADDRESS').value=strr[32];
            document.getElementById('CREDIT_CARD_LAST_4_DIGITS').value=strr[33];
            document.getElementById('CREDIT_CARD_TYPE').value=strr[34];
            document.getElementById('MAIL_SHIPPING_TYPE').value=strr[35];
            document.getElementById('MAIL_ORDER_NUMBER').value=strr[36];
            document.getElementById('MAIL_ORDER_QUEUE').value=strr[37];
            document.getElementById('MAIL_ORDER_PATIENT_ID').value=strr[38];
            
       }
     }


    }
    function getDNISFileNames(){
 
   
    var src="UploadDNISGreetingAudio?method=dnisfiles";
   
     var ajaxRequest=ajRequest(src);
 
     ajaxRequest.onreadystatechange = function(){
       if(ajaxRequest.readyState == 4){
 
          var strr=ajaxRequest.responseText.split("|");
          var select = document.getElementById("selectDNIS");
 
        for(var i = 0; i < strr.length-1; i++) {
            var opt = strr[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
 
       }
     }
 
 
    }