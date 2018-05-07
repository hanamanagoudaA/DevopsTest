$(document).ready(function() {     
    
    $('input[type=file]').change(function () {
var val = $(this).val().toLowerCase();
document.getElementById("second").style.display = 'none';
document.getElementById("message1").style.display = 'none';
if(val=="")
{
    $("#progressbar").width('0%');
               
                $("#percent").html("0%");
$("#message").html("<font color='red'>Please browse file first</font>");
}
else
{
var regex = new RegExp("(.*?)\.(xlsx)$");
 
if(!(regex.test(val))) {
$(this).val('');
//alert('Unsupported file');
$("#progressbar").width('0%');
               
                $("#percent").html("0%");
$("#message").html("<font color='red'>Unsupported Files</font>");
}
else
{
    $('input[name="upload"]').removeAttr('disabled');
}
}
    });
 
 
var options = {
        beforeSend : function() {
           
            
                $("#progressbox").show();
                // clear everything
                $("#progressbar").width('0%');
                $("#message").empty();
                $("#percent").html("0%");
        },
        uploadProgress : function(event, position, total, percentComplete) {
            $('input[name="upload"]').attr('disabled','disabled');
                $("#progressbar").width(percentComplete + '%');
                $("#percent").html(percentComplete + '%');
 
                // change message text to red after 50%
                if (percentComplete > 50) {
                $("#message").html("<font color='red'>File Upload is in progress</font>");
                }
        },
        success : function(data, textStatus, jqXHR) {
            $('input[name="upload"]').attr('disabled','disabled');
            document.getElementById("second").style.display = 'inline';
            
            var tfn = data.split("||");
            
            var cnt=1;
            for (i=0;i<tfn.length-1;i++){
                if(i==0)
                {
                    $('input[name="randomVal"]').val(tfn[0]);
//                    $('#containerId').append('').append('</br>');
                }
                else
                {
                    $('#containerId').append('<input type="checkbox" value='+tfn[i]+' name="myCheckbox5" />').append(tfn[i]);
                    if(cnt==5)
                    {
                        $('#containerId').append('</br>');
                    //$('#containerId').append('<input type="checkbox" name="myCheckbox5" />');//.append(tfn[i]).append('</br>');
                    cnt=0;
                        
                    }
                    
                    cnt +=1;
                }
            }
            
            
            $('input[type="file"]').val("");
                $("#progressbar").width('100%');
                $("#percent").html('100%');
        },
        complete : function(response) {
            $('input[name="upload"]').attr('disabled','disabled');
            $('input[type="file"]').val("");
        $("#message").html("<font color='blue'>Your file has been uploaded!</font>");
        },
        error : function() {
            $('input[name="upload"]').attr('disabled','disabled');
            $('input[type="file"]').val("");
        $("#message").html("<font color='red'> ERROR: unable to upload files</font>");
        }
};
$("#UploadForm").ajaxForm(options);
 
 
});