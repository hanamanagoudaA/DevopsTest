<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:forEach	items="${elements}" var="element">
	<c:if test="${element.name == 'swidbtx.name'}">
		Query Name : ${element.value}
	</c:if>
</c:forEach>
<ul>
	<c:forEach	items="${elements}" var="element">
		<c:choose>
			<c:when test="${element.name == 'swidbtx.time'}">
				<li> 
					Start : ${element.value}
				</li>
			</c:when>
			<c:when test="${element.name == 'swidbtx.input'}">
				<li class="closed">
					Input 
					<c:set var="values" value="${element.value}" scope="request"/>
					<jsp:include page="./logKeyValueDisplay.jsp"></jsp:include>
				</li>
			</c:when>
			<c:when test="${element.name == 'swidbrx.output'}">
				<li class="closed">
					Output
					<c:set var="values" value="${element.value}" scope="request"/>
					<jsp:include page="./logKeyValueDisplay.jsp"></jsp:include>
				</li>
			</c:when>
			<c:when test="${element.name == 'swidbrx.rslt'}">
				<li class="closed">
					Result : ${element.value}
				</li>
			</c:when>
		</c:choose>
		<c:if test="${not empty  element.valueConstraints}">
			<c:set var="values" value="${element.valueConstraints}" scope="request"/>
			<jsp:include page="./logKeyValueDisplay.jsp"></jsp:include>
		</c:if>
	</c:forEach>
</ul>