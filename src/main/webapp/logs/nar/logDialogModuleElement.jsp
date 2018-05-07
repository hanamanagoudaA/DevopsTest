<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:choose>	
	<c:when test="${next.name == 'try'}">
		<li class="closed">
			Step ${stepCounter} --
			<c:forEach var="element" items="${next.elements}">
				<c:if test="${element.name == 'swityst.role'}">
					Type : ${element.value}
				</c:if> 
			</c:forEach>
			<c:set var="stepCounter" value="${stepCounter + 1}" scope="request"/>
			<ul>
				<c:forEach var="element" items="${next.elements}">
					<c:if test="${element.name == 'switynd.hypo' or element.name == 'switynd.dcsn'}">
						<li>
							${element.name} : ${element.value}
						</li>
					</c:if> 
				</c:forEach>
				<c:choose>
					<c:when test="${not empty next.next}">
						<li class="closed"> 
							<c:set var="next" value="${next.next}" scope="request"/>
							<jsp:include page="logDialogModuleElement.jsp"></jsp:include>
						</li>
					</c:when>
				</c:choose>
	</c:when>
	<c:when test="${next.name == 'swiprst'}">
		Prompt -- 
		<ul>
			<c:forEach var="element" items="${next.elements}">
				<c:if test="${element.name == 'prnm'}">
					<li class="closed"> 
						Prompt Name : ${element.value}
						<c:forEach var="element1" items="${next.elements}">
							<c:if test="${element1.name == 'prtx'}">
								-- Prompt Text : ${element1.value} 
							</c:if>
						</c:forEach>
						<ul>
							<li class="closed"> Text :
								<ul>
									<c:forEach var="element2" items="${next.elements}">
										<c:if test="${element2.name == 'prtxt'}">
											<li>
												${element2.value}
											</li> 
										</c:if>
									</c:forEach>
								</ul>
							</li>
						</ul>
					</li>
				</c:if>
			</c:forEach>
		</ul>
	</c:when>
	<c:when test="${next.name == 'step'}">
		<li class="closed"> 
			Recognition -- 
			<ul>
				<c:forEach var="element" items="${next.elements}">
					<c:choose>
						<c:when test="${element.name == 'swistst.grnm'}">
							<li class="closed">
								GRNM
								<ul>
									<li>
										${element.value}
									</li>
								</ul>
							</li>
						</c:when>
						<c:when test="${element.name != 'swistst.time' and element.name != 'swistst.role'}">
							<li>
								${element.name} : ${element.value}
							</li>
						</c:when>
					</c:choose>
				</c:forEach>
			</ul>
		</li>
		</ul>
	</li>
	</c:when>
</c:choose>

<c:choose>
	<c:when test="${not empty next.next}">
		<c:set var="next" value="${next.next}" scope="request"/>
		<jsp:include page="logDialogModuleElement.jsp"></jsp:include>
	</c:when>
</c:choose>
