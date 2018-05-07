<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<script>
	<!--
		$(document).ready(function(){
			$("#${param.divId}").treeview({
				control: "#${param.divId}_treecontrol"
			});
		
		});
	-->
</script>

<div id="${param.divId}_treecontrol">
	<a href="#">Collapse All</a> 
	<a href="#">Expand All</a>
</div>

<div id="${param.divId}">
	<ul>
		<c:forEach items="${missingList}" var="missingObject">
			<li class="closed">
				Language : ${missingObject.key}
				<ul>
					<c:choose>
						<c:when test="${empty missingObject.value}">
							<li>
								None.
							</li>
						</c:when>
						<c:otherwise>
							<c:forEach items="${missingObject.value}" var="library">
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
												<c:forEach items="${library.value}" var="prompt">
													<c:choose>
														<c:when test="${empty param.type or param.type == 'string'}">
																<li>${prompt.key}
																(${prompt.value})</li>
														</c:when>
														<c:when test="${not empty param.type and param.type == 'list'}">
														<li class="closed"> 
															${prompt.key}
															<ul>
																<c:forEach items="${prompt.value}" var="value">
																	<li>
																		${value}
																	</li>
																</c:forEach>	
															</ul>
														</li>
														</c:when>
														
														<c:when test="${not empty param.type and param.type == 'map'}">
															
																<li>
																	(${prompt.value})
																</li>
																
														</c:when>
													</c:choose>
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
	</ul>
</div>
		
