/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.DNISProfile;
import com.nuance.catamaran.dataaccess.data.MemberInformation;
import com.nuance.catamaran.dataaccess.data.SessionData;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
public class WsGetMemberDetailsByLastNameAndDOBClientTest extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    protected static SessionData sessionData9 = null;
    private static DNISProfile dnis9 = null;
    WsGetMemberDetailsByLastNameAndDOBClient instance = new WsGetMemberDetailsByLastNameAndDOBClient();
    MemberInformation result = null;

    public WsGetMemberDetailsByLastNameAndDOBClientTest() throws IOException{
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() {
        dnis9 = new DNISProfile();
        ArrayList<String> esbInstaceList = new ArrayList<String>();
        esbInstaceList.add("A6-IRX");
        dnis9.setEsbInstance(esbInstaceList);
        ArrayList<String> esbProvideList = new ArrayList<String>();
        esbProvideList.add("SXC");
        dnis9.setEsbProvider(esbProvideList);

        sessionData9 = new SessionData();
        sessionData9.setUcid("TEST");
        sessionData9.setConsumerAppId("CAT_ESB");
        sessionData9.setDnisProfile(dnis9);
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        MemberInformation mi1 = new MemberInformation();
        mi1.setCarrierId("CTR002X");
        mi1.setFirstName("OSVALDO");
        mi1.setLastName("ROJAS FERNANDEZ");
        mi1.setRxCarrierID("");
        mi1.setRxClaimID("");
        mi1.setRxBaseMemberID("653827421MS1");
        mi1.setPatientID("");
        mi1.setGender("M");
        mi1.setDateOfBirth("1968-04-12-06:00");
        /*
         MemberInformation mi1 = new MemberInformation();
         mi1.setCarrierId(null);
         mi1.setFirstName(null);
         mi1.setLastName(null);
         mi1.setRxCarrierID(null);
         mi1.setRxClaimID(null);
         mi1.setRxBaseMemberID(null);
         mi1.setPatientID(null);
         mi1.setGender(null);
         mi1.setDateOfBirth(null);
         */
        miList.add(mi1);
        sessionData9.setMemberInformation(miList);
    }

    @After
    public void tearDown() {
        result = null;
    }

    /**
     *
     * WsGetMemberDetailsByLastNameAndDOBClient.
     */
    @Test
    public void testGetMemberDetailsByNameAndDOB() throws Exception {
        String lastName = "ROJAS FERNANDEZ";
        String dateOfBirth = "1968-04-12-06:00";
        MemberInformation result = instance.GetMemberDetailsByNameAndDOB(sessionData9, lastName, dateOfBirth);
        assertEquals("OSVALDO", result.getFirstName());
        assertEquals("ROJAS FERNANDEZ", result.getLastName());
        assertEquals("M", result.getGender());
        String lastName2 = "John";
        result = instance.GetMemberDetailsByNameAndDOB(sessionData9, lastName2, dateOfBirth);
        exception.expect(NullPointerException.class);
        assertEquals("", result.getFirstName());
        assertEquals(lastName2, sessionData9.getMemberLastName());
        assertEquals(dateOfBirth, sessionData9.getDateOfBirth());
    }

    @Test
    public void testGetMemberDetailsByNameAndDOBMemberNotFound() throws Exception {
        String dateOfBirth = "1968-04-12-06:00";
        String lastName2 = "John";
        result = instance.GetMemberDetailsByNameAndDOB(sessionData9, lastName2, dateOfBirth);
        //exception.expect(NullPointerException.class);
        //assertEquals("", result.getFirstName());
        assertNull(result);
        assertEquals(lastName2, sessionData9.getMemberLastName());
        assertEquals(dateOfBirth, sessionData9.getDateOfBirth());
    }

}
