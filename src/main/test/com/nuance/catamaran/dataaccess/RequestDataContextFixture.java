package com.nuance.catamaran.dataaccess;

import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.mockito.Mockito;

import com.nuance.catamaran.dataaccess.accessor.ClientServiceAccessor;
import com.nuance.catamaran.dataaccess.constants.SessionVariables;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.framework.configuration.ConfigurationException;
import com.nuance.framework.controller.requestdata.RequestDataContext;
import com.nuance.nstub.NStub;

public class RequestDataContextFixture {

    private RequestDataContext requestDataContextMock = Mockito.mock(RequestDataContext.class);
    
    private SessionData sessionData = new SessionData();
    
    private HttpServletRequest httpServletRequestMock = Mockito.mock(HttpServletRequest.class);
    private HttpSession httpSessionMock = Mockito.mock(HttpSession.class);
    
    public RequestDataContextFixture() throws ConfigurationException {
        when(requestDataContextMock.getHttpRequest()).thenReturn(httpServletRequestMock);
        when(httpServletRequestMock.getSession()).thenReturn(httpSessionMock);
        
        when(httpSessionMock.getAttribute(eq(SessionVariables.SESSION_DATA.getCallFlowValue()))).thenReturn(sessionData);
        
        ClientServiceAccessor clientServiceAccessor = Mockito.spy(new ClientServiceAccessor());
        doReturn(true).when(clientServiceAccessor).BackendConfigurationReload();
        clientServiceAccessor.initConfiguration(null);
        NStub.setPathToStubs("classpath:mockData");
    }
    
    public void addParameter(String parameter, String value) {
        when(httpServletRequestMock.getParameter(eq(parameter))).thenReturn(value);
    }
    
    public RequestDataContext get() {
        return requestDataContextMock;
    }
    
    public SessionData getSessionData() {
        return sessionData;
    }
}
