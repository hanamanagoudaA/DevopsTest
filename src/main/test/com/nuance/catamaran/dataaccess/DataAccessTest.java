package com.nuance.catamaran.dataaccess;

import java.util.Map;

import com.nuance.catamaran.dataaccess.constants.CallFlowVariable;
import com.nuance.framework.configuration.ConfigurationException;
import com.nuance.framework.controller.requestdata.RequestDataContext;

public class DataAccessTest {

    private RequestDataContextFixture requestMock;

    protected void setUp() throws ConfigurationException {
        requestMock = new RequestDataContextFixture();
    }
    
    protected void addRequestParameter(CallFlowVariable callFlowVariable, String value) {
        requestMock.addParameter(callFlowVariable.getCallFlowValue(), value);
    }
    
    protected RequestDataContext getRequestDataContext() {
        return requestMock.get();
    }
    
    protected Object getResponseValue(Map<String, Object> response, CallFlowVariable callFlowVariable) {
        return response.get(callFlowVariable.getCallFlowValue());
    }
}
