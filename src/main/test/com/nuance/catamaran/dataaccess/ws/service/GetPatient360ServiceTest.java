/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.rxexpress.services.domain.v1_0.GetPatientResponseDocument;
import com.unitedhealthgroup.optumrx.ao.patient360ao.v1_00.GetPatientDetailsResponseType;

import org.junit.*;

/**
 *
 * @author ivrdev2
 */
public class GetPatient360ServiceTest {
  public GetPatient360ServiceTest() {
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
     * Test of GetPatient360ServiceTestResponse method, of class GetPatient3ServiceTest.
     */
    @Test
    public void testGetPatient360ServiceTestResponse() throws Exception {
        System.out.println("testGetPatient360ServiceTestResponse");
        
        String patientID = "82269393";
       // String dateOfBirth = "1941-08-19";
        String ucid = "1234";
       // String irisDomain = "rxsts04soa.uhc.com";
        
        DataAccessConfiguration.getInstance().setIrisGetPatient360URL("https://apsot0004.uhc.com:8426/OSB/Patient360/get/v1_00");
        DataAccessConfiguration.getInstance().setBackendIRISUsername("ws_ts2_webivr");
        DataAccessConfiguration.getInstance().setBackendIRISPassword("r9b9sts2");
        GetPatientDetailsResponseType result = GetPatient360Service.getPatient360ResponseByPatientId(ucid, patientID);
        
        System.out.println("Result  "+result.toString());
      //  System.out.println("Result Status "+result.getPatientpreferences().getPreferences().getPreferenceArray(0).getCodeDesc());
       // System.out.println("Result Status "+result.getPatientaddress().getAddress().getPostalAddressArray(0).getPostalCode());
        //assertEquals("000", result.getReturnStatus().getReturnCd());
        // TODO review the generated test code and remove the default call to fail.
    }

}
