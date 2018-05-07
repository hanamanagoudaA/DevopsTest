<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
	<head>
		<title>DM configurations</title>
		
		<link rel="stylesheet" href="../../logs/css/jquery.treeview.css" />
		<link rel="stylesheet" type="text/css" href="../../logs/css/screen.css" />
		<link rel="stylesheet" type="text/css" href="../../logs/css/style.css"/>
		
		<script type="text/javascript" src="../../logs/scripts/jquery.js"></script>
		<script type="text/javascript" src="../../logs/scripts/jquery.treeview.js"></script>
		
		<script>
  			$(document).ready(function(){
    			$("#dmConfigurations").treeview();
  			});
  				
  			function loadConfiguration(language, library, dmId){
				$.ajax({
					type: "POST",
					url: "instanceConfiguration.html",
					data: "language=" + language + "&library=" + library + "&dmId=" + dmId + "&type=getConfiguration",
					success: function (data){
						if (document.getElementById("content"))
						{
							document.getElementById("content").style.display = "block";
						}
						$('#subContent').html(data);
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
				<h2>NDM - NDM configurations viewer tool</h2>
			</div>
			
			<div id="menu">
				<h3>Dialogs</h3>
				<c:choose>
					<c:when test="${not empty dmConfigurations}">
						<ul id="dmConfigurations">
							<c:set var="dmConfigurations" value="${dmConfigurations}" scope="request"/>
							<jsp:include page="./dmList.jsp" />
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