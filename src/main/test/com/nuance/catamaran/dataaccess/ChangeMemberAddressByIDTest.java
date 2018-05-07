package com.nuance.catamaran.dataaccess;

//import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import com.nuance.catamaran.dataaccess.clients.ChangeMemberAddressByIDClient;
import com.nuance.catamaran.dataaccess.constants.CallFlowConstants;
import com.nuance.catamaran.dataaccess.constants.CallFlowVariable;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.GenericResponse;
import com.nuance.framework.configuration.ConfigurationException;

public class ChangeMemberAddressByIDTest extends DataAccessTest{

    private ChangeMemberAddressByID changeMemberAddressByID;
    private ChangeMemberAddressByIDClient changeMemberAddressByIDClientMock = Mockito.mock(ChangeMemberAddressByIDClient.class);
    
    private static final String ani = "5149047800";
    private static final String patientNumber = "123456";
    
    private static final String statusMessage = "Success";
    
    @Before
    public void setUp() throws ConfigurationException {
        super.setUp();
        
        changeMemberAddressByID = Mockito.spy(new ChangeMemberAddressByID());
        changeMemberAddressByID.clientType = AbstractDataAccessBusinessFunction.DATA_ACCESS_MOCK;
        
        addRequestParameter(CallFlowVariable.ANI, ani);
        addRequestParameter(CallFlowVariable.PATIENT_NUMBER, patientNumber);
    }
    
    @Test
    public void testExecute() throws Exception {
        final GenericResponse genericResponse = new GenericResponse();
        genericResponse.setStatus(CallFlowConstants.STATUS_SUCCESS);
        genericResponse.setStatusMessage(statusMessage);
        when(changeMemberAddressByIDClientMock.changeMemberAddressByID(any(SessionData.class), eq(ani), eq(patientNumber))).thenReturn(genericResponse);
        doReturn(changeMemberAddressByIDClientMock).when(changeMemberAddressByID).getClient(eq(ChangeMemberAddressByIDClient.class), anyString());
        
        Map<String, Object> response = changeMemberAddressByID.execute(getRequestDataContext());
//        assertThat(response).isNotNull();
//
//        assertThat(getResponseValue(response,CallFlowVariable.RETURN_CODE)).isEqualTo(AbstractDataAccessBusinessFunction.KEY_SUCCESS);
//        assertThat(getResponseValue(response,CallFlowVariable.STATUS)).isEqualTo(genericResponse.getStatus());
//        assertThat(getResponseValue(response,CallFlowVariable.STATUS_MESSAGE)).isEqualTo(genericResponse.getStatusMessage());
    }
    
    @Test
    public void testExecute_Fail() throws Exception {
        final GenericResponse genericResponse = new GenericResponse();
        genericResponse.setStatus(CallFlowConstants.STATUS_FAIL);
        genericResponse.setStatusMessage(statusMessage);
        when(changeMemberAddressByIDClientMock.changeMemberAddressByID(any(SessionData.class), eq(ani), eq(patientNumber))).thenReturn(genericResponse);
        doReturn(changeMemberAddressByIDClientMock).when(changeMemberAddressByID).getClient(eq(ChangeMemberAddressByIDClient.class), anyString());
        
        Map<String, Object> response = changeMemberAddressByID.execute(getRequestDataContext());
//        assertThat(response).isNotNull();
//
//        assertThat(getResponseValue(response,CallFlowVariable.RETURN_CODE)).isEqualTo(AbstractDataAccessBusinessFunction.KEY_FAILURE);
//        assertThat(getResponseValue(response,CallFlowVariable.STATUS)).isEqualTo(genericResponse.getStatus());
//        assertThat(getResponseValue(response,CallFlowVariable.STATUS_MESSAGE)).isNull();
   }
    
    @Test
    public void testExecute_Exception() throws Exception {
        when(changeMemberAddressByIDClientMock.changeMemberAddressByID(any(SessionData.class), eq(ani), eq(patientNumber))).thenThrow(new RuntimeException());
        doReturn(changeMemberAddressByIDClientMock).when(changeMemberAddressByID).getClient(eq(ChangeMemberAddressByIDClient.class), anyString());
        
        Map<String, Object> response = changeMemberAddressByID.execute(getRequestDataContext());
        
        //assertThat(response).isNotNull();
        //assertThat(response.get(CallFlowVariable.RETURN_CODE.getCallFlowValue())).isEqualTo(AbstractDataAccessBusinessFunction.KEY_FAILURE);
    }
}
