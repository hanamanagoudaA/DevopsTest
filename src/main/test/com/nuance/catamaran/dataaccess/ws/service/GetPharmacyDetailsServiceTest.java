/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.catalystrx.integration.wsdl.pharmacy._20120405.GetPharmacyDetailsResponseDocument;
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
public class GetPharmacyDetailsServiceTest {
    
    public GetPharmacyDetailsServiceTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
        DataAccessConfiguration.getInstance().setPharmarcyServiceURL("http://tibutpolagents.healthextras.local:8981/eProxy/service/CRX_Int_PharmacyServiceV2.0.0");
        DataAccessConfiguration.getInstance().setBackendUsername("IVR01User");
        DataAccessConfiguration.getInstance().setBackendPassword("IVR01pwd");
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
     * Test of GetGetPharmacyDetailsResponse method, of class GetPharmacyDetailsService.
     */
    @Test
    public void testGetGetPharmacyDetailsResponse() throws Exception {
        System.out.println("GetGetPharmacyDetailsResponse");
        String ucid = "junit_pharmacy";
        String consumerAppId = "CAT_ESB";
        String esbProvider = "SXC";
        String esbInstance = "A6-IRX";
        String npiNumber = "1457408536";
        GetPharmacyDetailsResponseDocument.GetPharmacyDetailsResponse expResult = null;
        GetPharmacyDetailsResponseDocument.GetPharmacyDetailsResponse result = GetPharmacyDetailsService.GetGetPharmacyDetailsResponse(ucid, consumerAppId, esbProvider, esbInstance, npiNumber);
        assertEquals("4539079", result.getPharmacy().getNCPDPPharmacyId());
        // TODO review the generated test code and remove the default call to fail.
    }
    
}
