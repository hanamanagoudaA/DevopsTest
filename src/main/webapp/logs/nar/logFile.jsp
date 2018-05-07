<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script>
	<!--
		$(document).ready(function(){
			$("#logContents").treeview({
				control: "#treecontrol"
			});
			
			$("#logContents1").treeview({
				control: "#treecontrol"
			});
		});
	-->
</script>
<br/>

<c:if test="${not empty dataSet}">
	<!-- Extracting the header elements from the dataset object and storing it in the head object -->
	<c:set var="head" value="${dataSet.head}"/>
	<!-- Extracting the tailer elements from the dataset object and storing it in the tail object -->
	<c:set var="tail" value="${dataSet.tail}"/>
	<c:set var="stepCounter" value="1" scope="request"/>
	<!-- Printing the summary of the call using the head and tail object from the dataset. -->
	<c:if test="${not empty head}">
		<div id="headerHeading">
			<b>Log Header</b>
		</div>
		
		<div id="logHeader">
			<table cellspacing="3" id="logHeaderTable">
				<tr>
					<td class="field">Start</td>
					<td>:</td>
					<td>${head['swiclst.time']}</td>
					<td class="field">Session Id</td>
					<td>:</td>
					<td>${head['swiclst.sesn']}</td>
				</tr>
				
				<tr>
					<td class="field">Browser IP</td>
					<td>:</td>
					<td>${head['swiclst.browserip']}</td>
					<td class="field">ANI</td>
					<td>:</td>
					<td>${head['swiclst.ani']}</td>
				</tr>
				
				<tr>
					<td class="field">DNIS</td>
					<td>:</td>
					<td>${head['swiclst.dnis']}</td>
					<td class="field">App Server</td>
					<td>:</td>
					<td>${head['swisvst.appserv']}</td>
				</tr>
				
				<tr>
					<td class="field">UNID</td>
					<td>:</td>
					<td>${head['swiunid.unid']}</td>
					<td class="field">Language</td>
					<td>:</td>
					<td>${head['swiclst.lang']}</td>
				</tr>
				<c:if test="${not empty tail}">
					<tr>
						<td class="field">End</td>
						<td>:</td>
						<td>${tail['swiendcall.time']}</td>
						<td class="field">Out come </td>
						<td>:</td>
						<td>${tail['swiendcall.outcome']}</td>
					</tr>
				</c:if>				
			</table>
		</div>
	</c:if>
	
	<!-- Printing the detail information of the call which is stored in the data object of the dataSet object. -->
	<c:if test="${not empty dataSet.data}">
		<div id="bodyHeader">
			<b>Log Body</b>
		</div>
		
		<div id="treecontrol">
			<a href="#">Collapse All</a> 
			<a href="#">Expand All</a>
		</div>
				
		<div id="logContents">
			<ul>			
				<c:forEach items="${dataSet.data}" var="data">
					<c:choose>
						<c:when test="${data.name == 'database'}">
							<li class="closed">DA -- 
								<c:set var="elements" value="${data.elements}" scope="request"/>
								<jsp:include page="./logDataAccessElement.jsp" />
							</li>
						</c:when>
						<c:when test="${data.name == 'decisionstate'}">
							<li class="closed">DS --
								<c:set var="elements" value="${data.elements}" scope="request"/>
								<jsp:include page="./logDecisionStateElement.jsp" />
							</li>
						</c:when>
						<c:when test="${data.name == 'playprompt'}">
							<li class="closed">PP --
								<c:set var="elements" value="${data.elements}" scope="request"/>
								<c:set var="next" value="${data.next}" scope="request"/>
								<jsp:include page="./logPlayPromptElement.jsp" />
							</li>
						</c:when>
						<c:when test="${data.name == 'dialogmodule'}">
							<li class="closed">DM --
								<c:forEach var="element" items="${data.elements}">
									<c:if test="${element.name == 'swidmst.dmnm' }">
										Name : ${element.value}
									</c:if>
								</c:forEach>
								<ul>
									<li>
										<c:forEach var="element" items="${data.elements}">
											<c:if test="${element.name == 'swidmnd.time'}">
												<li>
													Start : ${element.value}
												</li>
											</c:if>
										</c:forEach>
									</li>
									<li class="closed">
										<c:set var="next" value="${data.next}" scope="request"/>
										<jsp:include page="./logDialogModuleElement.jsp" />
									</li>
								</ul>
							</li>
						</c:when>
						<c:otherwise>
							<li class="closed">${data.name}
								${data.elements}
							</li>
						</c:otherwise>
					</c:choose>
				</c:forEach>
			</ul>
		</div>
	</c:if>
</c:if>

<c:if test="${not empty logObjects}">
	<c:set var="logObject" value="${logObjects[0]}"/>
	<c:if test="${logObject.type == 'SWIclst'}">
		<div id="headerHeading">
			<b>Log Header</b>
		</div>
		
		<div id="logHeader">
			<table cellspacing="3">
				<tr>
					<td class="field">Call Start</td>
					<td>:</td>
					<td>${logObject.attributes['START TIME']}</td>
					<td class="field">Session Id</td>
					<td>:</td>
					<td>${logObject.attributes['SESN']}</td>
				</tr>
				<tr>
					<td class="field">Browser IP</td>
					<td>:</td>
					<td>${logObject.attributes['BROWSERIP']}</td>
					<td class="field">ANI</td>
					<td>:</td>
					<td>${logObject.attributes['ANI']}</td>
				</tr>
				<tr>
					<td class="field">DNIS</td>
					<td>:</td>
					<td>${logObject.attributes['DNIS']}</td>
					<td class="field">App Server</td>
					<td>:</td>
					<td>${logObject.attributes['APPSERV']}</td>
				</tr>
				<tr>
					<td class="field">UNID</td>
					<td>:</td>
					<td>${logObject.attributes['UNID']}</td>
					<td class="field">Language</td>
					<td>:</td>
					<td>${logObject.attributes['LANG']}</td>
				</tr>
			</table>
		</div>
	</c:if>
	
	<div id="logContents1">
		<c:forEach items="${logObjects}" var="logObject">
			<c:choose>
				<c:when test="${logObject.type == 'SWIppst'}">
					<li class="closed">
						<span class="folder">PP : ${logObject.attributes['PPNM']}</span>
						<ul>
							<li>
								Start : ${logObject.attributes['START TIME']}
							</li>
							<li class="closed">
								Prompt Name : ${logObject.attributes['PRNM']} :: Prompt Text : ${logObject.attributes['PRTX']}
								<ul>
									<li class="closed">Text
										<ul>
											<li>
												${logObject.attributes['PRTXT']}
											</li>
										</ul>
									</li>
								</ul>
							</li>
							
							<li>
								Result : ${logObject.attributes['RSLT']}
							</li>
							
							<li>
								End : ${logObject.attributes['END TIME']}
							</li>
						</ul>
					</li>
				</c:when>
				<c:when test="${logObject.type == 'SWIdbtx' }">
					<li class="closed">
						<span class="folder">DA:  Query Name : ${logObject.attributes['NAME']}</span>
						<ul>
							<li>
								Start : ${logObject.attributes['START TIME']}
							</li>
						
							<li class="closed"> 
								Input
								<ul>
									<c:forEach var="input" items="${logObject.attributes['INPUT']}">
										<li>
											${input.key} : ${input.value}
										</li>
									</c:forEach>
								</ul>
							</li>
													
							<li class="closed">
								Output
								<ul>
									<c:forEach var="output" items="${logObject.attributes['OUTPUT']}">
										<c:choose>
											<c:when test="${output.value.getClass().simpleName == 'String'}">
												<li>
													${output.key} : ${output.value}
												</li>
											</c:when>
											<c:otherwise>
												<li class="closed">
													${output.key}
													<ul>
														<c:forEach items="${output.value}" var="nestedValue">
															<c:choose>
																<c:when test="${nestedValue.value.getClass().simpleName == 'String'}">
																	<li>
																		${nestedValue.key} : ${nestedValue.value}
																	</li>
																</c:when>
																<c:otherwise>
																	<li class="closed">
																		${nestedValue.key}
																		<ul> 
																			<c:forEach items="${nestedValue.value}" var="finalValue">
																				<li>
																					${finalValue.key} : ${finalValue.value}
																				</li>
																			</c:forEach>
																		</ul>
																	</li>
																</c:otherwise>
															</c:choose>
														</c:forEach>
													</ul>
												</li>
											</c:otherwise>
										</c:choose>
									</c:forEach>
								</ul>
							</li>
							
							<li> 
								Result : ${logObject.attributes['RSLT']}
							</li>
							
							<li>
								End : ${logObject.attributes['END TIME']}
							</li>
						</ul>
					</li>
				</c:when>
				<c:when test="${logObject.type == 'SWIdmst'}">
					<li class="closed">
						<span class="folder">DM : ${logObject.attributes['DMNM']} :: Dialog Type : ${logObject.attributes['DMTP']}</span>
						<ul>
							<li>
								Start : ${logObject.attributes["START TIME"]}
							</li>
							<li>
								SESN : ${logObject.attributes["SESN"]}
							</li>
							<li>
								1SC : ${logObject.attributes["1SC"]}
							</li>
							<li>
								CONFLEV : ${logObject.attributes["CONFLEV"]}
							</li>
							<li>
								HIGHCONFLEV : ${logObject.attributes["HIGHCONFLEV"]}
							</li>
							<li>
								LANG : ${logObject.attributes["LANG"]}
							</li>
							<li>
								DEFCONFTYPE : ${logObject.attributes["DEFCONFTYPE"]}
							</li>
							<li>
								DEFCONFCOND : ${logObject.attributes["DEFCONFCOND"]}
							</li>
							<li>
								DMID : ${logObject.attributes["DMID"]}
							</li>
							<li>
								CONFCOND : ${logObject.attributes["CONFCOND"]}
							</li>
							<c:set var="phaseState" value="${logObject.attributes['SWIphst'].attributes}"/>
							<c:set var="tryStateList" value="${phaseState['SWItyst']}"/>
							<c:forEach var="tryState" items="${tryStateList}">
								<c:set var="SWIstst" value="${tryState.attributes['SWIstst']}"/>
								<li class="closed">
									Step : ${tryState.attributes['STEP']} :: Type : ${SWIstst.attributes['ROLE']}
									<ul>
										<li class="closed">
											Recognition : 
											<c:set var="recognitionValues" value="${SWIstst.attributes['RVAL']}"/>
											<c:if test="${not empty recognitionValues and recognitionValues.getClass().simpleName != 'String'}">
												dm_root = ${recognitionValues['dm_root']} :: Meaning = ${recognitionValues['MEANING']} :: 
												SWI_meaning = ${recognitionValues['SWI_meaning']} :: SWI_literal = ${recognitionValues['SWI_literal']}
											</c:if>
											<ul>
												<li>
													LPNM : ${SWIstst.attributes['LPNM']}
												</li>
												<li class="closed">
													GRNM
													<ul>
														<c:forEach items="${SWIstst.attributes['GRNM']}" var="grnm">
															<li>
																${grnm}
															</li>
														</c:forEach>
													</ul>
												</li>
												<li>
													CONFSLOT : ${SWIstst.attributes['CONFSLOT']}
												</li>
												<li>
													TYPE : ${SWIstst.attributes['TYPE']}
												</li>
												<li>
													RDEC : ${SWIstst.attributes['RDEC']}
												</li>
												<li>
													MODE : ${SWIstst.attributes['MODE']}
												</li>
												<li>
													CONFTYPE : ${SWIstst.attributes['CONFTYPE']}
												</li>
												<li>
													CONFCOND : ${SWIstst.attributes['CONFCOND']}
												</li>
											</ul>
										</li>
										<c:set var="stepStateValue" value="${SWIstst.attributes['SWIprst'].attributes}"/>
										<li class="closed">
											Prompt
											<ul>
												<li class="closed">
													Prompt Name : ${stepStateValue["PRNM"]} :: Prompt Text : ${stepStateValue["PRTX"]}
													<ul>
														<li class="closed">
															Text
															<ul>
																<li>${stepStateValue["PRTXT"]}</li>
															</ul>
														</li>
													</ul>
												</li>
											</ul>
										</li>
										<li class="closed">
											Properties
											<ul>
												<li>
													incompletetimeout : ${logObject.attributes["incompletetimeout"]}
												</li>
												<li>
													maxspeechtimeout : ${logObject.attributes["maxspeechtimeout"]}
												</li>
												<li>
													sensitivity : ${logObject.attributes["sensitivity"]}
												</li>
												<li>
													timeout : ${logObject.attributes["timeout"]}
												</li>
												<li>
													speedvsaccuracy : ${logObject.attributes["speedvsaccuracy"]}
												</li>
												<li>
													interdigittimeout : ${logObject.attributes["interdigittimeout"]}
												</li>
												<li>
													bargein : ${logObject.attributes["bargein"]}
												</li>
												<li>
													bargeintype : ${logObject.attributes["bargeintype"]}
												</li>
												<li>
													termtimeout : ${logObject.attributes["termtimeout"]}
												</li>
												<li>
													defaultconfirmation : ${logObject.attributes["defaultconfirmation"]}
												</li>
												<li>
													termchar : ${logObject.attributes["termchar"]}
												</li>
												<li>
													collection_high_confidence_threshold : ${logObject.attributes["collection_high_confidence_threshold"]}
												</li>
											</ul>
										</li>
									</ul>
								</li>
							</c:forEach>
							<li>
								End : ${logObject.attributes["END TIME"]}
							</li>
						</ul>
					</li>
				</c:when>
				<c:when test="${logObject.type == 'SWIdsst'}">
					<li class="closed">
						<span class="folder">DS : ${logObject.attributes['DSNM']}</span>
						<ul>
							<li>
								Start : ${logObject.attributes['START TIME']}
							</li>
							<li>
								Result : ${logObject.attributes['RSLT']}
							</li>
							<li>
								End : ${logObject.attributes['END TIME']}
							</li>
						</ul>
					</li>
				</c:when>
			</c:choose>
		</c:forEach>
	</div>
</c:if>
