<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<ul>
    <c:set var="temp" value="" scope="request"/>
	<c:forEach items="${dataAccessIdList}" var="dataAccessIdMap">
        <c:forEach items="${dataAccessIdMap}" var="dataAccessId">
            <c:set var="temp" value="" scope="request"/>
            <li class="closed">
    			${dataAccessId.key}
    			<ul>
    				<c:choose>
    					<c:when test="${empty dataAccessId.value}">
    						<table>
            					<tr>
                                	<td style="padding-bottom:0;">
                                    	<a href="#" onclick="loadConfiguration('${dataAccessId.key}','${temp}');">execute</a>
                                    </td>
                                    <td>
                                	</td>
                            	</tr>
                            </table>
    					</c:when>
    					<c:otherwise>
                                <table>
            						<c:forEach items="${dataAccessId.value}" var="input">
                                        <tr>
                                            <td style="padding-bottom:0;">${input}</td>
                                            <td><input size="30" name="${input}" type="text" id="${dataAccessId.key}-${input}"/></td>
                                            <c:set var="idName" value="'+document.getElementById('${dataAccessId.key}-${input}').value+'" scope="request"/>
                                        </tr>
                                        <c:set var="temp" value="${temp}${input}=${idName}&amp;" scope="request"/>
            						</c:forEach>
                                        <tr>
                                            <td style="padding-bottom:0;">
                                                <a href="#" onclick="loadConfiguration('${dataAccessId.key}','${temp}');">execute</a>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                </table>
    					</c:otherwise>
    				</c:choose>
    			</ul>
    		</li>
        </c:forEach>
	</c:forEach>
</ul>