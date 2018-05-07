/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.sxc.webservice.rxexpressssl.member.GetAROrderSummaryResponseDocument;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author ivrdev1
 */
public class GetAROrderSummaryServiceTest {
    
    public GetAROrderSummaryServiceTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
        DataAccessConfiguration.getInstance().setRxExpressURL("http://tibutpolagents.healthextras.local:8981/eProxy/service/RxExpressV1.0.0");
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of GetGetAROrderSummaryResponse method, of class GetAROrderSummaryService.
     */
    @Test
    public void testGetGetAROrderSummaryResponse() throws Exception {
        System.out.println("GetGetAROrderSummaryResponse");
        String familyNumber = "14050394";
        GetAROrderSummaryResponseDocument.GetAROrderSummaryResponse expResult = null;
        GetAROrderSummaryResponseDocument.GetAROrderSummaryResponse result = GetAROrderSummaryService.GetGetAROrderSummaryResponse(familyNumber);
        assertEquals("14050394", result.getFamilyNumber());
        // TODO review the generated test code and remove the default call to fail.
    }
    
}
