/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.objects.MemberDetailsList;
import static com.nuance.catamaran.dataaccess.ws.AbstractWsBaseClientTest.sessionData;
import java.io.IOException;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertSame;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

/**
 *
 * @author ivrdev2
 */
public class WsGetMemberDetailsByRxNumberORXClientTest  extends AbstractWsBaseClientTest {
    
    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsGetMemberDetailsByRxNumberORxClient instance = new WsGetMemberDetailsByRxNumberORxClient();
    MemberDetailsList result = null;
    
    public WsGetMemberDetailsByRxNumberORXClientTest() throws IOException{
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
        /*String rxNumber = "000206332796";
        String dateOfBirth = "19681004";*/
        String rxNumber = "133863673";
        String dateOfBirth = "19381205";
        sessionData.setUcid("121243");
        sessionData.getDnisProfile().setIrisDomain("rxsts04soa.uhc.com");
        result = instance.getMemberDetailsByRxNumber(sessionData, rxNumber, dateOfBirth);
        assertEquals(true, result.getMemberFound());
        //assertEquals("000206332796",sessionData.getRxNumber());
        //assertNotNull(sessionData.getGetMemberResponse("00020633279619681004"));
        //assertSame(rxNumber,sessionData.getRxNumber());
        
    }
    
    //@Test
    public void testInvalidRxNumber() throws Exception {
        String rxNumber = "000206332796";
        String dateOfBirth = "19681004";
        sessionData.setUcid("121243");
        sessionData.getDnisProfile().setIrisDomain("rxsts04soa.uhc.com");
        result = instance.getMemberDetailsByRxNumber(sessionData, rxNumber, dateOfBirth);
        assertEquals(true, result.getMemberFound());
    }
}
