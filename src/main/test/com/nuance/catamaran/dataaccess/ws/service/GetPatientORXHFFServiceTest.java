/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.rxexpress.services.domain.v1_0.GetPatientResponseDocument;

import org.junit.*;

/**
 *
 * @author ivrdev2
 */
public class GetPatientORXHFFServiceTest {
  public GetPatientORXHFFServiceTest() {
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
     * Test of GetPatientORXServiceTestResponse method, of class GetPatientORXServiceTest.
     */
    @Test
    public void testGetPatientORXHFFServiceTestResponse() throws Exception {
        System.out.println("testGetPatientORXHFFServiceTestResponse");
        
        String patientID = "80934256";
        String dateOfBirth = "1941-08-19";
        String ucid = "1234";
        String irisDomain = "rxsts04soa.uhc.com";
        
        DataAccessConfiguration.getInstance().setIrisGetPatientHFFURL("https://apsot0004.uhc.com:8426/IRISService/RxExpressServicePort");
        DataAccessConfiguration.getInstance().setBackendIRISUsername("ws_ts4_webivr");
        DataAccessConfiguration.getInstance().setBackendIRISPassword("r9b9sts2");
        GetPatientResponseDocument.GetPatientResponse result = GetPatientORXHFFService.getPatientResponseByPatientId(ucid, patientID);
        
        System.out.println("Result  "+result);
        System.out.println("Result Status "+result.getGetPatientReturn().getPatient().getPatientId());
        //assertEquals("000", result.getReturnStatus().getReturnCd());
        // TODO review the generated test code and remove the default call to fail.
    }

}
