<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:forEach	items="${elements}" var="element">
	<c:choose>
		<c:when test="${element.name == 'swippst.ppnm'}">
			Name : ${element.value}
		</c:when>
	</c:choose>
</c:forEach>
<ul>
	<c:forEach items="${elements}" var="element">
		<c:if test="${element.name == 'swippnd.rslt'}">
			<li>
				Result : ${element.value}
			</li>
		</c:if>
	</c:forEach>
	<c:if test="${not empty next and next.name == 'swiprst'}">
		<c:forEach var="element" items="${next.elements}">
			<c:if test="${element.name == 'time'}">
				<li> Start : ${element.value} </li>
			</c:if>
			<c:if test="${element.name == 'prnm'}">
				<li class="closed">
					Prompt Name : ${element.value}
					<ul>
						<c:forEach var="e" items="${next.elements}">
							<c:choose>
								<c:when test="${e.name == 'prtx'}">
									<li>
										Prompt Text : ${e.value}
									</li>
								</c:when>
								<c:when test="${e.name == 'prtxt'}">
									<li class="closed">
										Text
										<ul>
											<li>
												${e.value}
											</li>
										</ul>
									</li>
								</c:when>
							</c:choose>
						</c:forEach>
					</ul>
				</li>
			</c:if>
		</c:forEach>
	</c:if>
</ul>
