/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.MemberIDListByZIPAndDOB;
import java.io.IOException;
import java.util.HashMap;
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
public class WsGetMemberIDListByZIPAndDOBClientTest  extends AbstractWsBaseClientTest {
    
    WsGetMemberIDListByZIPAndDOBClient instance = new WsGetMemberIDListByZIPAndDOBClient();
    MemberIDListByZIPAndDOB result =  null;
    
    public WsGetMemberIDListByZIPAndDOBClientTest() throws IOException{
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
        result =  null;
    }

    /**
     * Test of getMemberIDListByZIPAndDOB method, of class WsGetMemberIDListByZIPAndDOBClient.
     */
    @Test
    public void testGetMemberIDListByZIPAndDOB() throws Exception {
        String zipCode = "81240";
        String dateOfBirth = "1962-02-27";
       HashMap carrierMap = new HashMap<String, String>();
        carrierMap.put("Carrier", "WCKYMCD");
        //sessionData.setCarrierFilter("abc");
        //sessionData.setCarrierIDs(carrierMap);
        MemberIDListByZIPAndDOB expResult = null;
        //TODO line 175   DataAccessConfiguration.getInstance().getCarrierFilterExpression() is NULL
        //result = instance.getMemberIDListByZIPAndDOB(sessionData, zipCode, dateOfBirth);
        
    }
    
}
