/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.sxc.webservice.rxexpressssl.member.GetMemberListResponseDocument;
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
public class GetMemberListByANIServiceTest {
    
    public GetMemberListByANIServiceTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
        DataAccessConfiguration.getInstance().setRxExpressURL("http://tibpolagents.healthextras.local:8981/eProxy/service/RxExpressV1.0.0");
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
     * Test of GetGetMemberListResponse method, of class GetMemberListByANIService.
     */
    @Test
    public void testGetGetMemberListResponse() throws Exception {
        System.out.println("GetGetMemberListResponse");
        String ani = "2155102901";
        String dob = "19780303";
        GetMemberListResponseDocument.GetMemberListResponse expResult = null;
        GetMemberListResponseDocument.GetMemberListResponse result = GetMemberListByANIService.GetGetMemberListResponse(ani, dob);
        assertEquals("16575781", result.getMemberArray(0).getFamilyId());
        // TODO review the generated test code and remove the default call to fail.
    }
    
}
