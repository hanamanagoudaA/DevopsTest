/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.unitedhealthgroup.optumrx.schema.balancepayment.canonical.getpatientbalancedue.GetPatientBalanceResType;
import org.junit.*;

/**
 *
 * @author ivrdev2
 */
public class GetPatientBalanceServiceTest {
    
    public GetPatientBalanceServiceTest() {
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
     * Test of GetPatientBalanceServiceTestResponse method, of class GetPatientBalanceServiceTest.
     */
    @Test
    public void testGetPatientBalanceServiceTestResponse() throws Exception {
        System.out.println("testGetPatientBalanceServiceTestResponse");
        
        String patientID = "8467484";
        String ucid = "1234";
        String irisDomain = "rxsts04soa.uhc.com";
                
        DataAccessConfiguration.getInstance().setIrisGetPatientBalanceDueURL("https://[IRIS_DOMAIN]:443/OSB/getPatientBalanceDue/v1_00");
        //DataAccessConfiguration.getInstance().setPatientBalanceURL("http://localhost:8092/mock");
        DataAccessConfiguration.getInstance().setBackendIRISUsername("ws_ts4_webivr");
        DataAccessConfiguration.getInstance().setBackendIRISPassword("ph1l1pp1s1sts4");
        GetPatientBalanceResType result = GetPatientBalanceService.getPatientBalanceResponse(ucid,irisDomain, patientID);
        
        System.out.println("Result  "+result);
        System.out.println("Result Status "+result.getBalanceDue());
        //assertEquals("000", result.getReturnStatus().getReturnCd());
        // TODO review the generated test code and remove the default call to fail.
    }

}
