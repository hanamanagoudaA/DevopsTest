/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws.service;

import com.catalystrx.integration.wsdl.mo_member._20120405.LocateMOMemberResponseDocument;
import com.nuance.catamaran.config.DataAccessConfiguration;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *
 * @author ivrdev4
 */
public class MemberLocatorServiceTest {
 
    public MemberLocatorServiceTest() {
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
     * Test of getMemberLocatorResponse method, of class MemberLocatorService.
     */
    @Test
    public void testGetMemberLocatorResponse() throws Exception {
        System.out.println("testGetMemberLocatorServiceResponse");
        
        String rxNumber = "06351858";
        String DataOfBirth = "1956-11-22";
        String ProviderAppId = "RXExpressi";
        String ProviderInstanceId = "P1-Exp";
        String ConsumerAppId = "CAT_TEST04";
                
        DataAccessConfiguration.getInstance().setMemberLocatorURL("http://tibcopdsit.catamaranrx.com:8987/service/MailOrderServiceV1_ORCA");
        //DataAccessConfiguration.getInstance().setPatientBalanceURL("http://localhost:8092/mock");
//        DataAccessConfiguration.getInstance().setBackendIRISUsername("ws_ts4_webivr");
//        DataAccessConfiguration.getInstance().setBackendIRISPassword("ph1l1pp1s1sts4");
        LocateMOMemberResponseDocument.LocateMOMemberResponse result = MemberLocatorService.getMemberLocatorResponse(rxNumber,DataOfBirth,ProviderAppId,ProviderInstanceId,ConsumerAppId);
        
        System.out.println("Result  "+result);
        System.out.println("Result Status "+result.getResultCode());
        //assertEquals("000", result.getReturnStatus().getReturnCd());
        // TODO review the generated test code and remove the default call to fail.
    }

    
}
