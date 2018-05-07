<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="com.nuance.framework.vxml.service.dataaccess.test.DataAccessTestUtility"%>
<%@page import="java.util.Collections"%>
<%
List<Map<String, List<String>>> idList = DataAccessTestUtility.getDataAccesIDAndInputs(request);

request.setAttribute("dataAccessIdList", idList);
%>
<html>
	<head>
		<title>Data Access</title>
		
		<link rel="stylesheet" href="../../logs/css/jquery.treeview.css" />
		<link rel="stylesheet" type="text/css" href="../../logs/css/screen.css" />
		<link rel="stylesheet" type="text/css" href="../../logs/css/style.css"/>
		
		<script type="text/javascript" src="../../logs/scripts/jquery.js"></script>
		<script type="text/javascript" src="../../logs/scripts/jquery.treeview.js"></script>
		
		<script>
  			$(document).ready(function(){
    			$("#dataAccessIds").treeview();
  			});
  				
  			function loadConfiguration(id, query){
  				
  				var currentTime = new Date();
  				var minutes = currentTime.getMinutes();
  				var seconds = currentTime.getSeconds();

                if (minutes < 10) {
                    minutes = "0" + minutes;
                }

                if (seconds < 10) {
                	seconds = "0" + seconds;
                }
                
  				var latest = "Latest response as of "+currentTime.getHours()+":"+minutes+":"+seconds+"  -->      ";
  				
                $.ajax({
                    type: "POST",
                    url: "../../"+id+".dataaccess",
                    data: query,
                    dataType: "text",
                    success: function (data){
                        if (document.getElementById("content"))
                        {
                            document.getElementById("content").style.display = "block";
                        }
                        var value = data;
                        //value = value.replace(/>/g, ">\n");
                        //alert(value);
                        $('#subContent').text(latest+"\n"+value);
                    }
                });
            }
  		</script>
  			
		
		<style>
			#wrapper {font-family : Verdana, helvetica, arial, sans-serif; }
 			#menu { height: 100%; width: 25%; float: left; padding-right: 5px; padding-bottom: 15px; }
 			#content {height: 510px; width: auto; border-left: 1px solid black; overflow: auto; padding-left: 10px; padding-bottom: 10px;}
			#header {border-bottom: 1px solid black;}
 		</style>
	</head>
	
	<body>
		<div id="wrapper">
			<div id="header">
				<img src="../../logs/img/nuancelogo.png"/>
				<h2>Data Access - Viewer</h2>
			</div>
			
			<div id="menu">
				<h3>IDs</h3>
				<c:choose>
					<c:when test="${not empty dataAccessIdList}">
						<ul id="dataAccessIds">
							<c:set var="dataAccessIdList" value="${dataAccessIdList}" scope="request"/>
							<jsp:include page="./daList.jsp" />
						</ul>
					</c:when>
					<c:otherwise>
						None.
					</c:otherwise>
				</c:choose>
    		</div>
    		
    		<div id="content" style="display:none;">
				<h3>Contents</h3>
				<div id="subContent"></div>
			</div>
		</div>
	</body>
</html>