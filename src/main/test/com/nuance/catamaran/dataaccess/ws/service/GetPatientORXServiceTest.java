/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.unitedhealthgroup.optumrx.getpatient.v1_00.GetPatientResponseType;
import org.junit.*;

/**
 *
 * @author ivrdev2
 */
public class GetPatientORXServiceTest {
  public GetPatientORXServiceTest() {
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
    public void testGetPatientORXServiceTestResponse() throws Exception {
        System.out.println("testGetPatientORXServiceTestResponse");
        
        String patientID = "8467484";
        String dateOfBirth = "1941-08-19";
        String ucid = "1234";
        String irisDomain = "rxsts04soa.uhc.com";
        
        DataAccessConfiguration.getInstance().setIrisGetPatientURL("https://[IRIS_DOMAIN]:443/GetPatientOSB/proxy/v1_00");
        DataAccessConfiguration.getInstance().setBackendIRISUsername("ws_ts4_webivr");
        DataAccessConfiguration.getInstance().setBackendIRISPassword("ph1l1pp1s1sts4");
        GetPatientResponseType result = GetPatientORXService.getPatientResponse(ucid, irisDomain, patientID, dateOfBirth);
        
        System.out.println("Result  "+result);
        System.out.println("Result Status "+result.getSearchSummary());
        //assertEquals("000", result.getReturnStatus().getReturnCd());
        // TODO review the generated test code and remove the default call to fail.
    }

}
