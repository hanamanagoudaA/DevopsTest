<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%     response.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE, 
                        "No new sessions allowed, this was configured using OA&M!");
%>