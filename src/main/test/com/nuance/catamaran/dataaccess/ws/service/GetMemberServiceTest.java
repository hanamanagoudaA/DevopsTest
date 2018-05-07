/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.sxc.webservice.rxexpressssl.member.GetMemberResponseDocument;
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
public class GetMemberServiceTest {
    
    public GetMemberServiceTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
        DataAccessConfiguration.getInstance().setRxExpressURL("http://tibutpolagents.healthextras.local:8981/eProxy/service/RxExpressV1.0.0");
        DataAccessConfiguration.getInstance().setBackendUsername("IVR01User");
        DataAccessConfiguration.getInstance().setBackendPassword("CatrxIVR01");
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
     * Test of GetGetMemberResponse method, of class GetMemberService.
     */
    @Test
    public void testGetGetMemberResponse() throws Exception {
        System.out.println("GetGetMemberResponse");
        String rxCode = "000";
        String rxNumber = "206332796";
        String dateOfBirth = "19681004";
        GetMemberResponseDocument.GetMemberResponse expResult = null;
        GetMemberResponseDocument.GetMemberResponse result = GetMemberService.GetGetMemberResponse(rxCode, rxNumber, dateOfBirth);
        assertEquals("14050394", result.getFamilyId());
        // TODO review the generated test code and remove the default call to fail.
    }
    
}
