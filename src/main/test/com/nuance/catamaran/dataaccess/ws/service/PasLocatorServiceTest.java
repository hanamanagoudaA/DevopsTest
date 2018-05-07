/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws.service;

import com.catalystrx.integration.wsdl.mo_member._20120405.LocateMOMemberResponseDocument;
import com.nuance.catamaran.config.DataAccessConfiguration;
import com.optumrx.webservice.routing.RoutingResponseV4Document;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *
 * @author ivrdev4
 */
public class PasLocatorServiceTest {
 
    public PasLocatorServiceTest() {
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
     * Test of getPasLocatorResponse method, of class PasLocatorService.
     */
    @Test
    public void getPasLocatorResponse() throws Exception {
        System.out.println("testgetPasLocatorResponse");
        
        String carrierId = "06351858";
        
                
        DataAccessConfiguration.getInstance().setPasLocatorURL("http://stg-shared-orxws.uhc.com/OptumRxServices/services/FSRoutingServiceV4");
        //DataAccessConfiguration.getInstance().setPatientBalanceURL("http://localhost:8092/mock");
//        DataAccessConfiguration.getInstance().setBackendIRISUsername("ws_ts4_webivr");
//        DataAccessConfiguration.getInstance().setBackendIRISPassword("ph1l1pp1s1sts4");
        RoutingResponseV4Document.RoutingResponseV4 result = PasLocatorService.getPasLocatorResponse(carrierId);
        
        System.out.println("Result  "+result);
       // System.out.println("Result Status "+result.getResultCode());
        //assertEquals("000", result.getReturnStatus().getReturnCd());
        // TODO review the generated test code and remove the default call to fail.
    }

    
}
