/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.objects.MemberDetailsList;
import com.nuance.catamaran.dataaccess.ws.service.GetMemberListByANIService;
import com.nuance.catamaran.utilities.WebServiceResponseUtilities;
import com.sxc.webservice.rxexpressssl.member.GetMemberListResponseDocument;
import java.io.IOException;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Rule;
import org.junit.rules.ExpectedException;

/**
 *
 * @author
 */
public class WsGetMemberListByANIClientTest extends AbstractWsBaseClientTest {

    WsGetMemberListByANIClient instance = new WsGetMemberListByANIClient();
    MemberDetailsList result = null;
    @Rule
    public ExpectedException exception = ExpectedException.none();

    public WsGetMemberListByANIClientTest() throws IOException{
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
        result = null;
    }

    /**
     * Test of getMemberDetailsByANI method, of class
     * WsGetMemberListByANIClient.
     */
    @Test
    public void testGetMemberDetailsByANI() throws Exception {
        String ani = "2155102901";
        assertTrue(sessionData.getMemberInformation().isEmpty());
        result = instance.getMemberDetailsByANI(sessionData, ani);
        assertTrue(result.getMemberFound());
        assertNotNull(sessionData.getMemberInformation().get(0));
        assertFalse(sessionData.getMemberInformation().isEmpty());
        assertEquals("000", result.getReturnCode());
        assertNotNull(sessionData.getGetMemberListResponse(ani));        
        GetMemberListResponseDocument.GetMemberListResponse getMemberListResponse = GetMemberListByANIService.GetGetMemberListResponse(ani, "");
        assertEquals(WebServiceResponseUtilities.createMemberList(getMemberListResponse).get(0).getPatientID(),result.getMemberDetails().get(0).getPatientID());
        
    }

    @Test
    public void testGetMemberDetailsByInvalidANI() throws Exception {
        String ani = "0123456789";
        result = instance.getMemberDetailsByANI(sessionData, ani);
        assertFalse(result.getMemberFound());
        assertNotNull(sessionData.getGetMemberListResponse(ani));
        assertEquals("002", result.getReturnCode());
        exception.expect(NullPointerException.class);
        assertNull(sessionData.getMemberInformation().get(0));

    }

}
