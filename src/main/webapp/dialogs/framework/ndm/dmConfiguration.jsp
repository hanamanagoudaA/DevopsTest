<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:choose>
	<c:when test="${not empty  dmConfiguration}">
		<table border="1" style="border : thin;" cellpadding="5px;">
			<tr>
				<th align="left">
					Key
				</th>
				<th align="left">
					Value
				</th>
			</tr>
			<c:forEach items="${dmConfiguration}" var="dm">
				<tr>
					<td>
						${dm.key}
					</td>
					<td>
						${dm.value}
					</td>
				</tr>
			</c:forEach>
		</table>
	</c:when>
	<c:otherwise>
		None.
	</c:otherwise>
</c:choose>