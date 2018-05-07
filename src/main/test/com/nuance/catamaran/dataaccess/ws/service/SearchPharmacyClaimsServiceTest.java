/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.catalystrx.integration.wsdl.claim._20120405.SearchPharmacyClaimsResponseDocument;
import com.nuance.catamaran.config.DataAccessConfiguration;
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
public class SearchPharmacyClaimsServiceTest {
    
    public SearchPharmacyClaimsServiceTest() {
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
    }

    /**
     * Test of SearchPharmacyClaimsServiceResponse method, of class SearchPharmacyClaimsService.
     */
    @Test
    public void testSearchPharmacyClaimsServiceResponse() throws Exception {
        System.out.println("SearchPharmacyClaimsServiceResponse");
        String ucid = "junit_claim";
        String consumerAppId = "CAT_ESB";
        String esbProvider = "SXC";
        String esbInstance = "A6-IRX";
        String rxNumber = "786798770506";
        String npiNumber = "1063678209";
        DataAccessConfiguration.getInstance().setClaimServiceURL("http://tibutpolagents.healthextras.local:8981/eProxy/service/CRX_Int_ClaimServiceV4.2.0");
        DataAccessConfiguration.getInstance().setBackendUsername("IVR01User");
        DataAccessConfiguration.getInstance().setBackendPassword("IVR01pwd");
        DataAccessConfiguration.getInstance().setClaimsSearchWindow(365);
        SearchPharmacyClaimsResponseDocument.SearchPharmacyClaimsResponse expResult = null;
        SearchPharmacyClaimsResponseDocument.SearchPharmacyClaimsResponse result = SearchPharmacyClaimsService.SearchPharmacyClaimsServiceResponse(ucid, consumerAppId, esbProvider, esbInstance, rxNumber, npiNumber);
        assertEquals("DAVIS", result.getPharmacyClaimsOutputArray(0).getMemberBasicInformation().getLastName());
        
    }
    
}
