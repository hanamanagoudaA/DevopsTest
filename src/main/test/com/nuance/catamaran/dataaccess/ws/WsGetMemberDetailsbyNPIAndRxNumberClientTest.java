/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.nuance.catamaran.dataaccess.data.DNISProfile;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.RejectedClaim;
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
public class WsGetMemberDetailsbyNPIAndRxNumberClientTest {
    
    private static SessionData sessionData = null;
    private static DNISProfile dnis = null;
    
    public WsGetMemberDetailsbyNPIAndRxNumberClientTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
        
        dnis = new DNISProfile();
        ArrayList<String> esbInstaceList = new ArrayList<String>();
        esbInstaceList.add("A6-IRX");
        dnis.setEsbInstance(esbInstaceList);
        ArrayList<String> esbProvideList = new ArrayList<String>();
        esbProvideList.add("SXC");
        dnis.setEsbProvider(esbProvideList);
        
        sessionData = new SessionData();
        sessionData.setUcid("TEST");
        sessionData.setConsumerAppId("CAT_ESB");
        sessionData.setDnisProfile(dnis);
        
        DataAccessConfiguration.getInstance().setClaimServiceURL("http://tibutpolagents.healthextras.local:8981/eProxy/service/CRX_Int_ClaimServiceV4.2.0");
        DataAccessConfiguration.getInstance().setBackendUsername("IVR01User");
        DataAccessConfiguration.getInstance().setBackendPassword("IVR01pwd");
        DataAccessConfiguration.getInstance().setClaimsSearchWindow(7);
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
     * Test of getMemberDetailsByNPIAndRxNumber method, of class WsGetMemberDetailsbyNPIAndRxNumberClient.
     */
    @Test
    public void testNegativeNoClaim() throws Exception {
        DataAccessConfiguration.getInstance().setClaimsSearchWindow(7);
        String npiNumber = "1063678209";
        String rxNumber = "786798770506";
        WsGetMemberDetailsbyNPIAndRxNumberClient instance = new WsGetMemberDetailsbyNPIAndRxNumberClient();
        RejectedClaim expResult = null;
        RejectedClaim result = instance.getMemberDetailsByNPIAndRxNumber(sessionData, npiNumber, rxNumber);
        assertEquals(expResult, result);
    }
    
    /**
     * Test for positive case
     * @throws Exception 
     */
    @Test
    public void testPositiveSingleClaim() throws Exception {
        // Search for 1 year
        DataAccessConfiguration.getInstance().setClaimsSearchWindow(365);
        String npiNumber = "1063678209";
        String rxNumber = "786798770506";
        WsGetMemberDetailsbyNPIAndRxNumberClient instance = new WsGetMemberDetailsbyNPIAndRxNumberClient();
        RejectedClaim expResult = null;
        RejectedClaim result = instance.getMemberDetailsByNPIAndRxNumber(sessionData, npiNumber, rxNumber);
        
        assertEquals("IVR2013PA5", result.getMemberNumber());
        assertEquals("19840412", result.getDateOfBirth());
        assertEquals("ANDREA", result.getFirstName());
        assertEquals("DAVIS", result.getLastName());
        assertEquals(4, result.getRejectCodes().size());
        assertEquals("oxepa", result.getDrugTTS().trim());
        assertEquals("20140418", result.getOriginalClaimFileDate());
    }
    
    /**
     * This case returns 2 claims, but the application will consider claim with latest
     * sequence number
     * @throws Exception 
     */
    @Test
    public void testPositiveMultipleClaims() throws Exception {
        // Search for 2 years
        DataAccessConfiguration.getInstance().setClaimsSearchWindow(730);
        String npiNumber = "1063678209";
        String rxNumber = "786798770506";
        WsGetMemberDetailsbyNPIAndRxNumberClient instance = new WsGetMemberDetailsbyNPIAndRxNumberClient();
        RejectedClaim expResult = null;
        RejectedClaim result = instance.getMemberDetailsByNPIAndRxNumber(sessionData, npiNumber, rxNumber);
        // Claim with latest sequence numbeer has 4 reject codes where as other claim has 1 reject code
        assertEquals(4, result.getRejectCodes().size());
    }
    
    /**
     * Invalid npi
     * @throws Exception 
     */
    @Test
    public void testNegativeInvalidNPI() throws Exception {
        DataAccessConfiguration.getInstance().setClaimsSearchWindow(730);
        // Empty npiNumber
        String npiNumber = "";
        String rxNumber = "786798770506";
        WsGetMemberDetailsbyNPIAndRxNumberClient instance = new WsGetMemberDetailsbyNPIAndRxNumberClient();
        //RejectedClaim expResult = null;
        RejectedClaim result = null;
        try {
            result = instance.getMemberDetailsByNPIAndRxNumber(sessionData, npiNumber, rxNumber);
        } catch(Exception e){
            assertEquals("Either npiNumber or rxNumber is Invalid",e.getMessage());
        }
    }
    
    /**
     * Invalid rxNumber
     * @throws Exception 
     */
    @Test
    public void testNegativeInvalidRxNumber() throws Exception {
        DataAccessConfiguration.getInstance().setClaimsSearchWindow(730);
        String npiNumber = "1063678209";
        // rxNumber is null
        String rxNumber = null;
        WsGetMemberDetailsbyNPIAndRxNumberClient instance = new WsGetMemberDetailsbyNPIAndRxNumberClient();
        //RejectedClaim expResult = null;
        RejectedClaim result = null;
        try {
            result = instance.getMemberDetailsByNPIAndRxNumber(sessionData, npiNumber, rxNumber);
        } catch(Exception e){
            assertEquals("Either npiNumber or rxNumber is Invalid",e.getMessage());
        }
    }
    
}
