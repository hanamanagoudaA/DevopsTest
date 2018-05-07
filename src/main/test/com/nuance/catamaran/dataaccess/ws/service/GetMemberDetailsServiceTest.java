/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.catalystrx.integration.wsdl.member._20120405.GetMemberDetailsResponseDocument;
import com.nuance.catamaran.config.DataAccessConfiguration;
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
public class GetMemberDetailsServiceTest {
    
    public GetMemberDetailsServiceTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
        DataAccessConfiguration.getInstance().setMemberServiceURL("http://tibpolagents.healthextras.local:8981/eProxy/service/CRX_Int_MemberServiceV3.0.0");
        //DataAccessConfiguration.getInstance().setMemberServiceURL("http://tibutpolagents.healthextras.local:8981/eProxy/service/CRX_Int_MemberServiceV3.0.0");
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
     * Test of GetGetMemberDetailsResponse method, of class GetMemberDetailsService.
     */
    @Test
    public void testGetGetMemberDetailsResponse() throws Exception {
        System.out.println("GetGetMemberDetailsResponse");
        String ucid = "";
        String consumerAppId = "CAT_ESB";
        String esbProvider = "SXC";
        String esbInstance = "A6-IRX";
        String clientHierarchyLevel1Name = "Carrier";
        String clientHierarchyLevel1Value = "GBOP";
        String clientHierarchyLevel2Name = "Account";
        String clientHierarchyLevel2Value = "31428";
        String clientHierarchyLevel3Name = "Group";
        String clientHierarchyLevel3Value = "BCBSACT1000P2";
        String memberNumber = "000867895001";
        GetMemberDetailsResponseDocument.GetMemberDetailsResponse expResult = null;
        GetMemberDetailsResponseDocument.GetMemberDetailsResponse result = GetMemberDetailsService.GetGetMemberDetailsResponse(ucid, consumerAppId, esbProvider, esbInstance, clientHierarchyLevel1Name, clientHierarchyLevel1Value, clientHierarchyLevel2Name, clientHierarchyLevel2Value, clientHierarchyLevel3Name, clientHierarchyLevel3Value, memberNumber);
        assertEquals("000867895001", result.getMember().getBasicInformation().getMemberId());
        // TODO review the generated test code and remove the default call to fail.
    }
    
}
