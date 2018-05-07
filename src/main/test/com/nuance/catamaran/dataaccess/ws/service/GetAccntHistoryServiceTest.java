/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.sxc.webservice.rxexpressssl.member.GetAccntHistoryResponseDocument;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Change Identifier to 01 in the service consumer before executing the test 
 * @author ivrdev1
 */
public class GetAccntHistoryServiceTest {
    
    public GetAccntHistoryServiceTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
        //DataAccessConfiguration.getInstance().setRxExpressURL("http://tibutpolagents.healthextras.local:8981/eProxy/service/RxExpressV1.0.0");
        DataAccessConfiguration.getInstance().setRxExpressURL("http://tibpolagents.healthextras.local:8981/eProxy/service/RxExpressV1.0.0");
        DataAccessConfiguration.getInstance().setBackendUsername("IVR01User");
        DataAccessConfiguration.getInstance().setBackendPassword("CatrxIVR01");
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
     * Test of getAccntHistoryResponse method, of class GetAccntHistoryService.
     */
    @Test
    public void testGetAccntHistoryResponse() throws Exception {
        System.out.println("getAccntHistoryResponse");
        String familyNumber = "06332796";
        GetAccntHistoryResponseDocument.GetAccntHistoryResponse expResult = null;
        GetAccntHistoryResponseDocument.GetAccntHistoryResponse result = GetAccntHistoryService.getAccntHistoryResponse(familyNumber);
        assertEquals("000", result.getReturnStatus().getReturnCd());
        assertEquals("150325209", result.getAccountsArray(0).getChargeNum());
        // TODO review the generated test code and remove the default call to fail.
    }
    
}
