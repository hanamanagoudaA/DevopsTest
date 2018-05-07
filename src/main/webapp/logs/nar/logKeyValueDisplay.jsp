<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<ul>
	<c:forEach var="map" items="${values}">
		<li>
			<c:choose>
				<c:when test="${map.getClass().simpleName == 'String'}">
					${map}
				</c:when>
				<c:when test="${map.getClass().simpleName == 'HashMap'}">
					${map.key} : ${map.value}
				</c:when>
			</c:choose>
		</li>
	</c:forEach>
</ul>