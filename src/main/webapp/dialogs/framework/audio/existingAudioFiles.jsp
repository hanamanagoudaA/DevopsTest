<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
	<head>
		<title>NDF Audio Service - Existing Audio Files</title>
		
		<link rel="stylesheet" type="text/css" href="../../logs/css/jquery.treeview.css" />
		<link rel="stylesheet" type="text/css" href="../../logs/css/screen.css" />
				
		<script type="text/javascript" src="../../logs/scripts/jquery.js"></script>
		<script type="text/javascript" src="../../logs/scripts/jquery.treeview.js"></script>
				
		<style>
			#wrapper {margin-left : 10px;}
			#empty {height : 5px;}
			#header {border-bottom: 1px solid black;}
			#contents {overflow : auto; float: left; height: 300px;}
			body {font-family : Verdana, helvetica, arial, sans-serif; font-size : 82.75%; padding-bottom: 10px;}
  		</style>
	</head>
	<body>
		<div id="wrapper">
		
			<div id="header">
				<img src="../../logs/img/nuancelogo.png"/>
				<h2>NDF - Audio configuration - <a href="Validator-Help.html" target="_blank">Help</a></h2>
			</div>

			<h3>Existing audio files from prompt library: <a href="../../export/ExistingAudioFiles.csv">Export</a></h3>
			<c:choose>
				<c:when test="${not empty missingPromptList}">
					<c:set var="missingList" value="${missingPromptList}" scope="request"/>
					<jsp:include page="./missingList.jsp">
						<jsp:param value="missingPrompts" name="divId"/>
						<jsp:param value="string" name="type"/>
					</jsp:include>
				</c:when>
				<c:otherwise>
					<ul>
						<li>
							None.
						</li>
					</ul>
				</c:otherwise>
			</c:choose>
			
			<div id="empty"></div>
		</div>
	</body>
</html>

