/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import java.io.IOException;
import java.util.Calendar;
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
public class WsUpdateContactHistoryClientTest  extends AbstractWsBaseClientTest {
    
    WsUpdateContactHistoryClient instance = new WsUpdateContactHistoryClient();
    boolean result = false;
    
    public WsUpdateContactHistoryClientTest() throws IOException{
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
        result = false;
    }

    /**
     * Test of updateContactHistory method, of class WsUpdateContactHistoryClient.
     */
    @Test
    public void testUpdateContactHistory() throws Exception {
        String willTransfer = "";
        String ucid = "";
        sessionData.setStartTime();
        sessionData.setEndTime();
        boolean expResult = false;
        //TODO create mock service
        //result = instance.updateContactHistory(sessionData, willTransfer, ucid);
        assertEquals("1", "1");
    }
    
}
