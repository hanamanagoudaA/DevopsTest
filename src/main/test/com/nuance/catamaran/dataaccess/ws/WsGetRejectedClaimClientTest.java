/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.ProactiveRejectedClaims;
import com.nuance.catamaran.dataaccess.objects.RejectedClaim;
import static com.nuance.catamaran.dataaccess.ws.AbstractWsBaseClientTest.sessionData;
import com.nuance.catamaran.dataaccess.ws.exception.BusinessLogicException;
import com.sxc.webservice.claim.ClaimSearchV3Item;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

/**
 *
 * @author 
 */
public class WsGetRejectedClaimClientTest  extends AbstractWsBaseClientTest {
    
    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsGetRejectedClaimClient instance = new WsGetRejectedClaimClient();
    RejectedClaim result =  null;
    ProactiveRejectedClaims result1 = null;
    
    public WsGetRejectedClaimClientTest() throws IOException{
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
        result =  null;
    }

    /**
     * Test of getRejectedClaim method, of class WsGetRejectedClaimClient.
     */
    //@Test
    public void testGetRejectedClaim() throws Exception {
        String npiNumber = "1861426678";
        String memberNumber = "IVR2013PA5";
        String navigationCommand = "";
        
        RejectedClaim expResult = null;
        
        sessionData.setDateOfBirth("1984-04-12");
        sessionData.getDnisProfile().setBpgFlag("");
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
        assertNull(sessionData.getClientHierarchyLevel1Value());
        assertNull(sessionData.getClientHierarchyLevel2Value());
        assertNull(sessionData.getClientHierarchyLevel3Value());
        //result = instance.getMemberProcessingInfo(sessionData, memberNumber);
        // TODO get ClaimSearchV3Items and set in sessionData
       List<ClaimSearchV3Item> claimSearchItemList = new ArrayList<ClaimSearchV3Item>();
       ClaimSearchV3Item csItem = null;
        sessionData.setClaimSearchItemList(claimSearchItemList);
        exception.expect(BusinessLogicException.class);
        exception.expectMessage("Unable to fetch CAG Information for this member");
        result = instance.getRejectedClaim(sessionData, memberNumber, npiNumber, navigationCommand);
        //assertNotNull(sessionData.getClientHierarchyLevel1Value());
        //assertNotNull(sessionData.getClientHierarchyLevel2Value());
        //assertNotNull(sessionData.getClientHierarchyLevel3Value());
        //TODO
        //assertNotNull(sessionData.getAccountIDs().get(memberNumber));
        //assertNotNull(sessionData.getCarrierIDs().get(memberNumber));
        //assertNotNull(sessionData.getGroupIDs().get(memberNumber));
    }
    
    //@Test
    public void testGetProactiveRejectedClaim() throws Exception {
        String npiNumber = "1407861727";
        String ncpdpNumber = "1712101";
        
        
        
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
     
        
        result1 = instance.getProactiveRejectedClaim(sessionData, npiNumber, ncpdpNumber);
        System.out.println("total:" + result1.getNumberOfClaimsFound());
        System.out.println("NPINumber:" + result1.getNpiNumber());
        System.out.println("returnCode:" + result1.getReturnCode());
        for(String rxNumber : result1.getRejectedClaimList())
        {
            System.out.println("RxNumber:" + rxNumber);
        }
        
        for(Boolean claimRead : result1.getIsClaimReadableList())
        {
            System.out.println("Readable:" + claimRead);
        }
               
        
    }
    
    @Test
    public void testGetRejectedClaimByRxNumber() throws Exception {
        String npiNumber = "1407861727";
        String rxNumber = "2096983";
        
        
        
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
     
        
        result = instance.getRejectedClaimDetailsForRx(sessionData, npiNumber, rxNumber);
        System.out.println("total:" + result.getNumberOfClaimsFound());
        System.out.println("lastName:" + result.getLastName());
        System.out.println("memberNumber:" + result.getMemberNumber());
        System.out.println("memberNumber:" + result.getMemberNumber());
        System.out.println("claimNumber:" + result.getCurrentClaimNumber());
               
        
    }
    
       @Ignore
    public void testInvalidMemberNumber() throws Exception {
        String memberNumber = "IVRXXXXPAX";
        sessionData.setDateOfBirth("1984-04-12");
        String npiNumber = "1861426678";        
        String navigationCommand = "";
        sessionData.getDnisProfile().setBpgFlag("");
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
        try {
            result = instance.getRejectedClaim(sessionData, memberNumber, npiNumber, navigationCommand);
        } catch (IllegalStateException e) {
            assertNull(sessionData.getClientHierarchyLevel1Value());
            assertNull(sessionData.getClientHierarchyLevel2Value());
            assertNull(sessionData.getClientHierarchyLevel3Value());
        }

        exception.expect(IllegalStateException.class);
        result = instance.getRejectedClaim(sessionData, memberNumber, npiNumber, navigationCommand);

    }
    
}
