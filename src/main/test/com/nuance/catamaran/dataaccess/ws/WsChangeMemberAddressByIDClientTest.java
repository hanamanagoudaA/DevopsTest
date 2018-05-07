/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.GenericResponse;
import java.io.IOException;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author 
 */
public class WsChangeMemberAddressByIDClientTest extends AbstractWsBaseClientTest{
    
    WsChangeMemberAddressByIDClient instance = new WsChangeMemberAddressByIDClient();
    GenericResponse result = null;
    
    public WsChangeMemberAddressByIDClientTest() throws IOException{
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

    /**
     * Test of changeMemberAddressByID method, of class WsChangeMemberAddressByIDClient.
     */
    @Test
    public void testChangeMemberAddressByID() throws Exception {
        String ani = "2563541265";
        String patientNumber = "95117366";
        assertNull(sessionData.getChangeMemberAddressResponse(patientNumber));
        result = instance.changeMemberAddressByID(sessionData, ani, patientNumber);
        assertEquals("Success", result.getStatus());
        assertEquals("Success", result.getStatusMessage());
        assertNotNull(sessionData.getChangeMemberAddressResponse(patientNumber));
        
        result = instance.changeMemberAddressByID(sessionData, ani, patientNumber);
        assertEquals("Success", result.getStatus());
        assertEquals("Success", result.getStatusMessage());
        assertNotNull(sessionData.getChangeMemberAddressResponse(patientNumber));
    }
    
    @Test
    public void testInvalidPatientNumber() throws Exception {
        String ani = "2563541200";
        String patientNumber = "95117300";  
        assertNull(sessionData.getChangeMemberAddressResponse(patientNumber));
        result = instance.changeMemberAddressByID(sessionData, ani, patientNumber);
        assertEquals("Fail", result.getStatus());
        assertEquals("Missing/Invalid Patient Number", result.getStatusMessage());
        assertNotNull(sessionData.getChangeMemberAddressResponse(patientNumber));
    }
    
    
    
    
}
