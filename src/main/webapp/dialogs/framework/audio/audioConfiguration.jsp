<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
	<head>
		<title>NDF Audio Service Configuration</title>
		
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

			<h3>Missing audio files from prompt library: <a href="../../export/MissingAudioFiles.csv">Export</a></h3>
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
			
			<h3>Missing prompt IDs in sentences: <a href="../../export/MissingPromptsInSentences.csv">Export</a></h3>
			<c:choose>
				<c:when test="${not empty missingSentenceList}">
					<c:set var="missingList" value="${missingSentenceList}" scope="request"/>
					<jsp:include page="./missingList.jsp">
						<jsp:param value="missingSentence" name="divId"/>
						<jsp:param value="list" name="type"/>
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
			<h3>Missing sentence/prompt IDs in NDM configuration: <a href="../../export/MissingPromptSentencesInNdm.csv">Export</a></h3>
			<c:choose>
				<c:when test="${not empty missingDMAudioList}">
					<c:set var="missingList" value="${missingDMAudioList}" scope="request"/>
					<jsp:include page="./missingList.jsp">
						<jsp:param value="missingDMs" name="divId"/>
						<jsp:param value="list" name="type"/>
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
			<h3>Missing sentence/prompt IDs in JSP pages:</h3>
			
			<script>
				<!--
					$(document).ready(function(){
						$("#missingJsp").treeview({
							control: "#missingJsp_treecontrol"
						});
					
					});
				-->
			</script>
			
			<div id="missingJsp_treecontrol">
				<a href="#">Collapse All</a> 
				<a href="#">Expand All</a>
			</div>
			
			<div id="missingJsp">
				<ul>
			
				<c:choose>
					<c:when test="${not empty missingJsp}">
						<c:forEach items="${missingJsp}" var="missingObject">
							<li class="closed">
								JSP : ${missingObject.key}
								<ul>
									<c:choose>
										<c:when test="${empty missingObject.value}">
											<li>
												None.
											</li>
										</c:when>
										<c:otherwise>
											<c:forEach items="${missingObject.value}" var="language">
												<li class="closed">
													Language : ${language.key}
													<ul>
														<c:choose>
															<c:when test="${empty language.value}">
																<li>
																	None.
																</li>
															</c:when>
															<c:otherwise>
																<c:forEach items="${language.value}" var="library">
																	<li class="closed">
																		Library : ${library.key}
																		<ul>
																			<c:choose>
																				<c:when test="${empty library.value}">
																					<li>
																						None.
																					</li>
																				</c:when>
																				<c:otherwise>
																					<c:forEach items="${library.value}" var="id">
																						<li>
																							<c:choose>
																								<c:when test="${empty id}">
																									<li>
																										None.
																									</li>
																								</c:when>
																								<c:otherwise>
																									${id }
																								</c:otherwise>
																							</c:choose>
																						</li>
																					</c:forEach>
																				</c:otherwise>
																			</c:choose>
																		</ul>
																	</li>
																</c:forEach>
															</c:otherwise>
														</c:choose>
													</ul>
												</li>
											</c:forEach>
										</c:otherwise>
									</c:choose>
								</ul>
							</li>
						</c:forEach>
					</c:when>
					<c:otherwise>
						<ul>
							<li>
								None.
							</li>
						</ul>
					</c:otherwise>
				</c:choose>
			</ul>
		</div>
		</div>
	</body>
</html>

