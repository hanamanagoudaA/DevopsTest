/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.MemberDetailsList;
import com.nuance.catamaran.dataaccess.objects.MemberDetailsRx;
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
public class WsGetMemberDetailsByRxClientTest  extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsGetMemberDetailsByRxClient instance = new WsGetMemberDetailsByRxClient();
            

    MemberDetailsRx result = null;
    
    public WsGetMemberDetailsByRxClientTest() throws IOException{
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
        String rxNumber = "138398562";
        String dateOfBirth = "19520512";
        String zip = "20170";
        result = instance.getMemberDetailsByRx(sessionData, rxNumber, dateOfBirth, zip);
        assertEquals(true, result.getMemberFound());
        assertEquals("138398562",sessionData.getRxNumber());
        //assertNotNull(sessionData.getGetMemberResponse("00020633279619681004"));
        assertSame(rxNumber,sessionData.getRxNumber());
        
    }
    /*
    @Test
    public void testInvalidRxNumber() throws Exception {
        String dateOfBirth = "19681004";   
        String rxNumber = "000206332799";
                String zip = "20170";

        result = instance.getMemberDetailsByRx(sessionData, rxNumber, dateOfBirth, zip);
          //TODO wrong logic in clientclass  WsGetMemberDetailsByRxNumberClient line 38 not checking status code #
        assertEquals(true, result.getMemberFound());
    }*/
    
}
