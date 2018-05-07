/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.objects.NewOrderSummary;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
public class WsGetNewOrderSummaryClientTest  extends AbstractWsBaseClientTest {
    
    WsGetNewOrderSummaryClient instance = new WsGetNewOrderSummaryClient();
    NewOrderSummary result = null;
    
    public WsGetNewOrderSummaryClientTest() throws IOException{
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
     * Test of getNewOrderSummary method, of class WsGetNewOrderSummaryClient.
     */
    @Test
    public void testGetNewOrderSummary() {  
        NewOrderSummary expResult = new NewOrderSummary();
        List<String> drugPromptList = new ArrayList<String>();
        drugPromptList.add("a");
        List<String> drugTTSList = new ArrayList<String>();
        drugTTSList.add("a");
        expResult.setDrugPromptList(drugPromptList);
        expResult.setDrugTTSList(drugTTSList);
        expResult.setNumberOfRefillsOnOrder("1");
        sessionData.addDrugTTSToRefill("a");
        sessionData.addDrugPromptToRefill("a");
        result = instance.getNewOrderSummary(sessionData);
        assertEquals(expResult.getDrugPromptList(), result.getDrugPromptList());
        assertEquals(expResult.getDrugTTSList(), result.getDrugTTSList());
        assertEquals(expResult.getNumberOfRefillsOnOrder(), result.getNumberOfRefillsOnOrder());
    }
    
    @Test
    public void testGetNewOrderSummaryWithNullData() {     
        NewOrderSummary expResult = new NewOrderSummary();
        List<String> drugPromptList = new ArrayList<String>();
        List<String> drugTTSList = new ArrayList<String>();
        expResult.setDrugPromptList(drugPromptList);
        expResult.setDrugTTSList(drugTTSList);
        expResult.setNumberOfRefillsOnOrder("0");
        result = instance.getNewOrderSummary(sessionData);
        assertEquals(expResult.getDrugPromptList(), result.getDrugPromptList());
        assertEquals(expResult.getDrugTTSList(), result.getDrugTTSList());
        assertEquals(expResult.getNumberOfRefillsOnOrder(), result.getNumberOfRefillsOnOrder());
    }
    
}
