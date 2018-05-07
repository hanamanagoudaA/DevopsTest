/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.nuance.catamaran.dataaccess.data.DNISProfile;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.MemberDetailsList;
import java.util.ArrayList;
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
public class WsGetMemberDetailsListByIDClientTest {
    
    private static SessionData sessionData = null;
    private static DNISProfile dnis = null;
    
    public WsGetMemberDetailsListByIDClientTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
        
        dnis = new DNISProfile();
        ArrayList<String> esbInstaceList = new ArrayList<String>();
        esbInstaceList.add("A6-CGC");
        dnis.setEsbInstance(esbInstaceList);
        ArrayList<String> esbProvideList = new ArrayList<String>();
        esbProvideList.add("SXC");
        dnis.setEsbProvider(esbProvideList);
        
        sessionData = new SessionData();
        sessionData.setUcid("TEST");
        sessionData.setConsumerAppId("CAT_ESB");
        sessionData.setDnisProfile(dnis);
        
        DataAccessConfiguration.getInstance().setMemberServiceURL("http://tibutpolagents.healthextras.local:8981/eProxy/service/CRX_Int_MemberServiceV3.0.0");
        DataAccessConfiguration.getInstance().setCarrierFilter("abc");
        DataAccessConfiguration.getInstance().setBackendUsername("IVR01User");
        DataAccessConfiguration.getInstance().setBackendPassword("IVR01pwd");
    }
    
    @AfterClass
    public static void tearDownClass() {
         sessionData = null;
        dnis = null;
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of getMemberDetailsListByID method, of class WsGetMemberDetailsListByIDClient.
     */
    @Test
    public void testPositiveGetMemberDetailsListByID() throws Exception {
        System.out.println("getMemberDetailsListByID");
       
        String memberId = "U6627334801";
        WsGetMemberDetailsListByIDClient instance = new WsGetMemberDetailsListByIDClient();
        MemberDetailsList expResult = null;
        MemberDetailsList result = instance.getMemberDetailsListByID(sessionData, memberId);
        assertEquals(1, result.getNumberOfMembersFound());
        assertEquals("RUTH", result.getFirstNameList().get(0));
        // TODO review the generated test code and remove the default call to fail.
    }
    
    @Test
    public void testNegativeGetMemberDetailsListByID() throws Exception {
        System.out.println("getMemberDetailsListByID");
       
        String memberId = "U66273348";
        WsGetMemberDetailsListByIDClient instance = new WsGetMemberDetailsListByIDClient();
        MemberDetailsList expResult = null;
        MemberDetailsList result = instance.getMemberDetailsListByID(sessionData, memberId);
        assertEquals(0, result.getNumberOfMembersFound());
        // TODO review the generated test code and remove the default call to fail.
    }
    
}
