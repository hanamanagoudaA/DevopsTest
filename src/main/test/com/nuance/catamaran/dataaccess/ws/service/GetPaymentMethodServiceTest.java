/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.unitedhealthgroup.optumrx.schema.balancepayment.canonical.getpaymentmethod.GetPaymentMethodResType;
import org.junit.*;
/**
 *
 * @author ivrdev2
 */
public class GetPaymentMethodServiceTest {
     public GetPaymentMethodServiceTest() {
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
     * Test of GetPaymentMethodServiceResponse method, of class GetPaymentMethodService.
     */
    @Test
    public void testGetPaymentMethodServiceResponse() throws Exception {
        System.out.println("testGetPaymentMethodServiceResponse");
        
        String patientID = "8467484";
         String ucid = "1234";
        String irisDomain = "rxsts04soa.uhc.com";
        DataAccessConfiguration.getInstance().setIrisGetPaymentMethodsURL("https://rxsts04soa.uhc.com:443/OSB/getPaymentMethods/v1_00");
        //DataAccessConfiguration.getInstance().setPaymentMethodsURL("http://localhost:8092/mock");
        DataAccessConfiguration.getInstance().setBackendIRISUsername("ws_ts4_webivr");
        DataAccessConfiguration.getInstance().setBackendIRISPassword("ph1l1pp1s1sts4");
        GetPaymentMethodResType result = GetPaymentMethodService.getPmtMethodResponse(ucid,irisDomain,patientID);
        
        System.out.println("Result  "+result);
        System.out.println("Result Status "+result.getPatientIdPaymentAccountsArray().length);
        //assertEquals("000", result.getReturnStatus().getReturnCd());
        // TODO review the generated test code and remove the default call to fail.
    }
    
}
