/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.unitedhealthgroup.optumrx.schema.getdrugdetails.v2_00.GetDrugDetailsResponseType;
import org.junit.*;

/**
 *
 * @author ivrdev2
 */
public class GetDrugDetailServiceTest {
    public GetDrugDetailServiceTest() {
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
     * Test of GetDrugDetailServiceTestResponse method, of class GetDrugDetailServiceTest.
     * @throws java.lang.Exception
     */
    @Test
    public void testGetDrugDetailServiceTestResponse() throws Exception {
        System.out.println("testGetDrugDetailServiceTestResponse");
        
        String patientID = "8467484";
        String drugName = "VYTORIN      TAB 10-40MG";
         String ucid = "1234";
        String irisDomain = "rxsts04soa.uhc.com";
        
        DataAccessConfiguration.getInstance().setIrisGetDrugDetailsURL("https://rxsts04soa.uhc.com:443/OSB/getDrugDetails/v2_00");
        DataAccessConfiguration.getInstance().setBackendIRISUsername("ws_ts4_webivr");
        DataAccessConfiguration.getInstance().setBackendIRISPassword("ph1l1pp1s1sts4");
        GetDrugDetailsResponseType result = GetDrugDetailService.getDrugDetailResponse(ucid,irisDomain,patientID, drugName);
        
        System.out.println("Result  "+result);
        System.out.println("Result Status "+result.getDrugItemResponseArray().length);
        //assertEquals("000", result.getReturnStatus().getReturnCd());
        // TODO review the generated test code and remove the default call to fail.
    }
}
