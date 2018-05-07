<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:forEach	items="${elements}" var="element">
	<c:if test="${element.name == 'swidsst.dsnm'}">
		Name : ${element.value}
	</c:if>
</c:forEach>

<ul>
	<c:forEach	items="${elements}" var="element">
		<li>
			<c:choose>
				<c:when test="${element.name == 'swidsnd.rslt'}">
					Result : ${element.value}
				</c:when>
			</c:choose>
			<c:if test="${not empty  element.valueConstraints}">
				<c:set var="values" value="${element.valueConstraints}" scope="request"/>
				<jsp:include page="./logKeyValueDisplay.jsp"></jsp:include>
			</c:if>
		</li>
	</c:forEach>
</ul>