/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.objects.MemberDetailsList;
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
public class WsGetMemberDetailsListByANIClientTest extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsGetMemberDetailsListByANIClient instance = new WsGetMemberDetailsListByANIClient();
    MemberDetailsList result = null;

    public WsGetMemberDetailsListByANIClientTest() throws IOException{
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
     * WsGetMemberDetailsListByANIClient.
     */
    @Test
    public void testGetMemberDetailsByANI() throws Exception {
        String ani = "7028694600";
        result = instance.getMemberDetailsByANI(sessionData, ani);
        assertNotNull(result);
        assertNotNull(sessionData.getGetMemberListResponse(ani));
        assertEquals(true, result.getMemberFound());
        assertEquals(sessionData.getMemberInformation().get(0), sessionData.getMemberInformation().get(0));

    }

    @Test
    public void testInvalidANI() throws Exception {

        String ani = "7028694609";
        assertNull(sessionData.getGetMemberListResponse(ani));
        result = instance.getMemberDetailsByANI(sessionData, ani);
        assertEquals(false, result.getMemberFound());
    }

}
