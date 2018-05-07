/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.PrescriptionInfo;
import java.io.IOException;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Rule;
import org.junit.rules.ExpectedException;

/**
 *
 * @author 
 */
public class WsGetPrescriptionInfoClientTest  extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsGetPrescriptionInfoClient instance = new WsGetPrescriptionInfoClient();
    PrescriptionInfo result = null;
    
    public WsGetPrescriptionInfoClientTest() throws IOException{
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
        result = null;
    }
    
    @Test
    public void testGetPrescriptionInfoMemberNotFound() throws Exception {
        String rxNumber = "000206332796";
        sessionData.setDateOfBirth("19510118");
        assertNull(sessionData.getGetMemberResponse(rxNumber));
        assertNull(sessionData.getGetPatientHistoryResponse(rxNumber));
        assertNull(sessionData.getGetAccntHistoryResponse(rxNumber));
        result = instance.getPrescriptionInfo(sessionData, rxNumber);
        assertNotNull(result);
        assertEquals("false",result.getCanRxBeRefilled());
        assertEquals("ERROR_NoRecordsFound",result.getCannotRefillReason());
        assertNotNull(sessionData.getGetMemberResponse(rxNumber+ sessionData.getDateOfBirth()));
        assertNotNull(sessionData.getGetPatientHistoryResponse(rxNumber));
        String familyID = sessionData.getGetMemberResponse(rxNumber+ sessionData.getDateOfBirth()).getFamilyId();
        assertNotNull(sessionData.getGetAccntHistoryResponse(familyID));
        
        
        // TODO review the generated test code and remove the default call to fail.

        /*
        assertNull(sessionData.getGetOrderHistorySummaryResponse(rxNumber));
        assertNull(sessionData.getGetPatientHistoryResponse(rxNumber));
        assertNull(sessionData.getGetOrderDetailResponses(orderNumber));
        
        
        rxNumber = "06332796";
        sessionData2.setDateOfBirth("19681004");
        result = instance.getPrescriptionInfo(sessionData2, rxNumber);
        assertNotNull( result);
        assertEquals("true",result.getCanRxBeRefilled());
                */
    }
    
    // get data  MEMBER FOUND    
     @Test
    public void testGetPrescriptionInfo() throws Exception {
        String rxNumber = "06332796";
        sessionData.setDateOfBirth("19681004");
        assertNull(sessionData.getGetMemberResponse(rxNumber));
        assertNull(sessionData.getGetPatientHistoryResponse(rxNumber));
        assertNull(sessionData.getGetAccntHistoryResponse(rxNumber));
        result = instance.getPrescriptionInfo(sessionData, rxNumber);
        assertNotNull( result);
        assertEquals("false",result.getCanRxBeRefilled());
        assertEquals("ERROR_NoRecordsFound",result.getCannotRefillReason());
        assertNotNull(sessionData.getGetMemberResponse(rxNumber+sessionData.getDateOfBirth()));
        assertNotNull(sessionData.getGetPatientHistoryResponse(rxNumber));
        String familyID = sessionData.getGetMemberResponse(rxNumber+sessionData.getDateOfBirth()).getFamilyId();
        assertNotNull(sessionData.getGetAccntHistoryResponse(familyID));
        
        
       
              
    }
    
    
}
