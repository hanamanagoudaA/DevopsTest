/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.MemberDetailsList;
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
public class WsGetMemberDetailsByRxNumberClientTest  extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsGetMemberDetailsByRxNumberClient instance = new WsGetMemberDetailsByRxNumberClient();
    MemberDetailsList result = null;
    
    public WsGetMemberDetailsByRxNumberClientTest() throws IOException{
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
     * Test of getMemberDetailsByRxNumber method, of class WsGetMemberDetailsByRxNumberClient.
     */
    @Test
    public void testGetMemberDetailsByRxNumber() throws Exception {
        String rxNumber = "000206332796";
        String dateOfBirth = "19681004";
        sessionData.getDnisProfile().setRxCode("");
        result = instance.getMemberDetailsByRxNumber(sessionData, rxNumber, dateOfBirth);
        assertEquals(true, result.getMemberFound());
        assertEquals("000206332796",sessionData.getRxNumber());
        assertNotNull(sessionData.getGetMemberResponse("00020633279619681004"));
        assertSame(rxNumber,sessionData.getRxNumber());
        
    }
    
    @Test
    public void testInvalidRxNumber() throws Exception {
        String dateOfBirth = "19681004";   
        sessionData.getDnisProfile().setRxCode("");
        String rxNumber = "000206332799";
        result = instance.getMemberDetailsByRxNumber(sessionData, rxNumber, dateOfBirth);
          //TODO wrong logic in clientclass  WsGetMemberDetailsByRxNumberClient line 38 not checking status code #
        assertEquals(true, result.getMemberFound());
    }
    
}
