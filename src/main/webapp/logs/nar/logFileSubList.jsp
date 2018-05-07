<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<c:if test="${not empty childFiles}">
	<c:forEach items="${childFiles}" var="map">
		<c:choose>
			<c:when test="${not empty map.value}">
				<li><span class="folder">${map.key}</span>
					<ul>
						<c:set var="childFiles" value="${map.value}" scope="request"/>
						<jsp:include page="logFileSubList.jsp"/>
					</ul>
				</li>
			</c:when>
			<c:otherwise>
				
				<li>
					<a href="#" onclick="loadFile('${map.key}');">
						<span class="file">${map.key}</span>
					</a>
				</li>
			</c:otherwise>
		</c:choose>
	</c:forEach>
</c:if>
