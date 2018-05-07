package com.nuance.catamaran.dataaccess;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import com.nuance.catamaran.dataaccess.clients.AddPrescriptionToOrderClient;
import com.nuance.catamaran.dataaccess.constants.CallFlowConstants;
import com.nuance.catamaran.dataaccess.constants.CallFlowVariable;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.framework.configuration.ConfigurationException;
import com.nuance.framework.exception.BusinessException;
import com.nuance.framework.exception.SystemException;
import org.junit.Assert;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class AddPrescriptionToOrderTest extends DataAccessTest{

    private AddPrescriptionToOrder addPrescriptionToOrder;
    private AddPrescriptionToOrderClient addPrescriptionToOrderClientMock = Mockito.mock(AddPrescriptionToOrderClient.class);
    
    private static final String rxNumber = "12345678";
    
    @Before
    public void setUp() throws ConfigurationException {
        super.setUp();
        
        addPrescriptionToOrder = Mockito.spy(new AddPrescriptionToOrder());
        addPrescriptionToOrder.clientType = AbstractDataAccessBusinessFunction.DATA_ACCESS_MOCK;
        
        addRequestParameter(CallFlowVariable.RX_NUMBER, rxNumber);
    }
    
    @Test
    public void testExecute() throws SystemException, BusinessException {
        Map<String, Object> response = addPrescriptionToOrder.execute(getRequestDataContext());
        assertNotNull(response);
        assertEquals(getResponseValue(response,CallFlowVariable.RETURN_CODE), AbstractDataAccessBusinessFunction.KEY_SUCCESS);
        assertEquals(getResponseValue(response,CallFlowVariable.IS_FIRST_PRESCRIPTION), CallFlowConstants.TRUE);
        assertEquals(getResponseValue(response,CallFlowVariable.IS_INCLUDE_COLD_PACK), CallFlowConstants.TRUE);
    }
    
    @Test
    public void testExecute_Exception() throws SystemException, BusinessException {
        when(addPrescriptionToOrderClientMock.addPrescriptionToOrder(any(SessionData.class), eq(rxNumber))).thenThrow(new RuntimeException());
        doReturn(addPrescriptionToOrderClientMock).when(addPrescriptionToOrder).getClient(eq(AddPrescriptionToOrderClient.class), anyString());
        
        Map<String, Object> response = addPrescriptionToOrder.execute(getRequestDataContext());
        
        assertNotNull(response);
        assertEquals(response.get(CallFlowVariable.RETURN_CODE.getCallFlowValue()), AbstractDataAccessBusinessFunction.KEY_FAILURE);
        assertNotNull(getResponseValue(response,CallFlowVariable.IS_FIRST_PRESCRIPTION));
        assertNotNull(getResponseValue(response,CallFlowVariable.IS_INCLUDE_COLD_PACK));
    }
}
