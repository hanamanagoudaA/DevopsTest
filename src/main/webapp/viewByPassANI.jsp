<%@ page contentType="text/html;charset=UTF-8" %> 
<%@ page import="java.net.URL" %>
<%@ page import="java.io.FileNotFoundException" %>
<%@ page import="java.net.HttpURLConnection" %>
<%
    String app = request.getParameter("app");
    String pageUrl = request.getRequestURL().toString();
    pageUrl = pageUrl.replace("viewByPassANI.jsp","");
    String filepath = pageUrl + "/configuration/application/properties/bypassani.properties";
    
    URL myUrl = new URL(filepath);
    HttpURLConnection con = null;
    con = (HttpURLConnection) myUrl.openConnection();
    if (con.getResponseCode() == 200)
    {                
        response.sendRedirect(filepath);
    }
    else
    {
        out.println("<html><body>");
        out.println("Profile Not Found");
        out.println(filepath);
        out.println("</body></html>");
    }
%>