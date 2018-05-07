<%@ page contentType="application/voicexml+xml; charset=UTF-8" %><?xml version="1.0" encoding ="UTF-8"?>
<!DOCTYPE vxml PUBLIC "-//W3C//DTD VOICEXML 2.1//EN" 
"http://www.w3.org/TR/voicexml21/vxml.dtd">

<%String enc = (String)request.getAttribute("encoding");String version = (String)request.getAttribute("version");%>

<vxml  version="2.1"  xml:lang="${language}" xmlns="http://www.w3.org/2001/vxml">
	<script src="dialogs/framework/ndm/ndm.es?version=<%=version%>"/>
    <form id="ndm">
		<jsp:include page="${templateuri}"/>
		<block name="Resultblock">
			<if cond="typeof(${dmid}.error) != 'undefined' || ${dmid}.rethrow=='true'">
				<return eventexpr="${dmid}.error" messageexpr="${dmid}.errorMessage"/>
			</if>
			<script>${declareReturnKeysScript}</script>
			<return namelist="${returnKeys}"/>
		</block>
    </form>
</vxml>