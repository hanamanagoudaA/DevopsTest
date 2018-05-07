/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.PriorAuthStatus;
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
public class WsGetPriorAuthStatusClientTest  extends AbstractWsBaseClientTest {
    
    WsGetPriorAuthStatusClient instance = new WsGetPriorAuthStatusClient();
    PriorAuthStatus result = null;
    
    public WsGetPriorAuthStatusClientTest() throws IOException{
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
     * Test of getPriorAuthStatus method, of class WsGetPriorAuthStatusClient.
     */
    @Test
    public void testGetPriorAuthStatus() throws Exception {
        String memberNumber = "";
        String navigationCommand = "";
        
        PriorAuthStatus expResult = null;
        //TODO create mock service
        //result = instance.getPriorAuthStatus(sessionData, memberNumber, navigationCommand);
        //assertEquals(expResult, result);
    }
    
}
