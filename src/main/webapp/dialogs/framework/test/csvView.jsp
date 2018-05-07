<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0">
    <jsp:directive.page language="java"
        contentType="charset=ISO-8859-1" pageEncoding="ISO-8859-1" />
    <jsp:scriptlet>out.write((String)request.getAttribute("dataMap"));</jsp:scriptlet>
</jsp:root>