<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<html>
    <head>
        <title>NAR Log Viewer - Tool used for view list and view NAR logs built within Nuance Development Framework</title>
        
        
        <link rel="stylesheet" href="../../logs/css/jquery.treeview.css" />
				<link rel="stylesheet" type="text/css" href="../../logs/css/screen.css" />
				<link rel="stylesheet" type="text/css" href="../../logs/css/style.css"/>
				
				<script type="text/javascript" src="../../logs/scripts/jquery.js"></script>
				<script type="text/javascript" src="../../logs/scripts/jquery.treeview.js"></script>
				<script>
  				$(document).ready(function(){
    				$("#example").treeview();
  				});
  				
  				function loadFile(fileName){
					$.ajax({
						type: "POST",
						url: "../../logFile.nar",
						data: "fileName=" + fileName,
						success: function (data){
							$('#subContent').html(data);
						}
					});
  				}
  			</script>
  			<style>
  				#menu { height: auto; width: 500px; border-right: 1px solid black; float: left; padding-right: 5px; padding-bottom: 15px; }
  				#content {width: auto; position: absolute; left: 520px; }
				#header {border-bottom: 1px solid black;}
				#headerHeading {padding-bottom: 5px;}
				#logHeader {border-bottom: 1px solid black;}
				#bodyHeader{padding-top : 5px;}
				#logHeaderTable {font-family : Verdana, helvetica, arial, sans-serif; font-size : 82.75%; padding-bottom: 10px;}
				
				#errorMessage {font-family : Verdana, helvetica, arial, sans-serif; color: red; padding-top : 5px; padding-left : 5px;}
  			</style>
    </head>
    
    <body>
		<br/>
		<div id="header">
			<img src="../../logs/img/nuancelogo.png"/>
			<H2>NDF/NAR - NAR Call Log Viewer</H2>
		</div>
    	
    	<c:choose>
    		<c:when test="${not empty files}">
    			<div id="menu">
					<h3>Log Files</h3>
		    		<ul id="example" class="filetree">
						<c:set var="childFiles" value="${files}" scope="request"/>
						<jsp:include page="logFileSubList.jsp" />
					</ul>
		    	</div>
		    	<div id="content" >
					<h3>Contents</h3>
					<div id="subContent"></div>
				</div>
    		</c:when>
    		<c:otherwise>
    			<div id="errorMessage">
    				<h3>No log file.</h3>
    			</div>
    		</c:otherwise>
    	</c:choose>
    	
    </body>
</html>
