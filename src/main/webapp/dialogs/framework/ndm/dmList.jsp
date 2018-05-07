<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<ul>
	<c:forEach items="${dmConfigurations}" var="dmConfiguration">
		<li class="closed">
			${dmConfiguration.key}
			<ul>
				<c:choose>
					<c:when test="${empty dmConfiguration.value}">
						<li>
							None.
						</li>
					</c:when>
					<c:otherwise>
						<c:forEach items="${dmConfiguration.value}" var="library">
							<li class="closed">
								${library.key}
								<ul>
									<c:choose>
										<c:when test="${empty library.value}">
											<li>
												None.
											</li>
										</c:when>
										<c:otherwise>
											<c:forEach items="${library.value}" var="dm">
												<li>
													<a href="#" onclick="loadConfiguration('${dmConfiguration.key}','${library.key}','${dm}');">
														${dm}
													</a>
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
</ul>