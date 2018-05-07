/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.unitedhealthgroup.optumrx.schema.balancepayment.canonical.getpaymenthistory.PaymentHistoryResType;
import org.junit.*;

/**
 *
 * @author ivrdev2
 */
public class GetPaymentHistoryORXServiceTest {
      
    public GetPaymentHistoryORXServiceTest() {
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
     * Test of GetPaymentHistoryORXServiceTestResponse method, of class GetPaymentHistoryORXServiceTest.
     */
    @Test
    public void testGetPaymentHistoryORXServiceTestResponse() throws Exception {
        System.out.println("testGetPaymentHistoryORXServiceTestResponse");
        
        String patientID = "8467484";
                
        
        DataAccessConfiguration.getInstance().setIrisGetPaymentHistoryURL("https://rxsts04soa.uhc.com:443/OSB/getPaymentHistory/v1_00");
        //DataAccessConfiguration.getInstance().setPaymentHistoryURL("https://apsot0004.uhc.com:8427/OSB/getPaymentHistory/v1_00");
        DataAccessConfiguration.getInstance().setBackendIRISUsername("ws_ts4_webivr");
        DataAccessConfiguration.getInstance().setBackendIRISPassword("ph1l1pp1s1sts4");
        //GetPaymentHistoryORXService getPaymentHistoryORXService= new GetPaymentHistoryORXService();
        PaymentHistoryResType result = GetPaymentHistoryORXService.getPaymentHistoryResponse(patientID);
        
        System.out.println("Result  "+result);
        System.out.println("Result Status "+result.getPayments().getPaymentArray().length);
        //assertEquals("000", result.getReturnStatus().getReturnCd());
        // TODO review the generated test code and remove the default call to fail.
    }

}
