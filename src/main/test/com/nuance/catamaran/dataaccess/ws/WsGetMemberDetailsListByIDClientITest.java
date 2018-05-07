/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.DNISProfile;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.MemberDetailsList;
import com.nuance.catamaran.dataaccess.ws.exception.BusinessLogicException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
 * @author ivrdev1
 */
public class WsGetMemberDetailsListByIDClientITest extends AbstractWsBaseClientTest {

    WsGetMemberDetailsListByIDClient instance = new WsGetMemberDetailsListByIDClient();
    MemberDetailsList result = null;
    @Rule
    public ExpectedException exception = ExpectedException.none();

    public WsGetMemberDetailsListByIDClientITest() throws IOException{
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
        //sessionData2 = null;
        //dnis2 = null;
    }

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
        result = null;
    }

    @Test
    public void testMemberDetails() throws Exception {
        String memberId = "03031966MSDI";

        MemberDetailsList expResult = null;
         assertEquals(0,sessionData.getMemberInformation().size());
        result = instance.getMemberDetailsListByID(sessionData, memberId);
        assertEquals(1, result.getNumberOfMembersFound());
        assertEquals(1, sessionData.getMemberInformation().size());
    }

    @Test
    public void testMemberDetailsData() throws Exception {
        String memberId = "U6627334801";
        MemberDetailsList expResult = null;
        result = instance.getMemberDetailsListByID(sessionData2, memberId);
        assertEquals(0, result.getNumberOfMembersFound());
    }

    /*
     
    
     @Test
     public void testMissingCarrier() throws Exception {
     System.out.println("*********************getMemberDetailsListByID*********************");
       
     String memberId = "U6627334801";
     WsGetMemberDetailsListByIDClient instance = new WsGetMemberDetailsListByIDClient();
     // exception.expect(NullPointerException.class);
     MemberDetailsList result = instance.getMemberDetailsListByID(invalidSessionData, memberId);
     // TODO review the generated test code and remove the default call to fail.
     }
     */
    @Test
    public void testNegativeGetMemberDetailsListByID() throws Exception {
        String memberId = "U66273348";
        result = instance.getMemberDetailsListByID(sessionData2, memberId);
        assertEquals(0, result.getNumberOfMembersFound());
        assertEquals(0, sessionData.getMemberInformation().size());
        // TODO review the generated test code and remove the default call to fail.
    }

    @Test
    public void testNullMemberID() throws Exception {
        String memberId = "";
        try {
            result = instance.getMemberDetailsListByID(sessionData, memberId);
        }catch(BusinessLogicException e){
            assertEquals("Invalid MemberId", e.getMessage());
        }
        
    }
   
     
}
