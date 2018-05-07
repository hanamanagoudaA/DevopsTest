/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.DNISProfile;
import com.nuance.catamaran.dataaccess.data.MemberInformation;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.MemberIDByName;
import static com.nuance.catamaran.dataaccess.ws.WsGetMemberDetailsByLastNameAndDOBClientTest.sessionData9;
import com.nuance.catamaran.utilities.CalendarUtilities;
import com.nuance.catamaran.utilities.StringUtil;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author 
 */
public class WsGetMemberIDByNameClientTest  extends AbstractWsBaseClientTest {
    
    protected static SessionData sessionData9 = null;
    private static DNISProfile dnis9 = null;
    WsGetMemberIDByNameClient wsGetMemberIDByNameclient = new WsGetMemberIDByNameClient();
    WsGetMemberDetailsByLastNameAndDOBClient instance = new WsGetMemberDetailsByLastNameAndDOBClient();
    MemberInformation result = null;
    MemberIDByName memberIDByName = null;
    
    public WsGetMemberIDByNameClientTest() throws IOException{
    }
    
    @BeforeClass
    public static void setUpClass() {
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
        memberIDByName = null;
    }

    /**
     * Test of testinactiveMatchesGetMemberIDByName method, of class WsGetMemberIDByNameClient.
     */
    /*
    @Test
    public void testinactiveMatchesGetMemberIDByName() throws Exception {
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
        miList.add(mi1);
        sessionData9.setMemberInformation(miList);
        String lastName = "ROJAS FERNANDEZ";
        String dateOfBirth = "1968-04-12-06:00";        

        result = instance.GetMemberDetailsByNameAndDOB(sessionData9, lastName, dateOfBirth);
        assertEquals("OSVALDO", result.getFirstName());
        assertEquals("ROJAS FERNANDEZ", result.getLastName());
        assertEquals("M", result.getGender());
        String firstName = "OSVALDO";
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, firstName, lastName);
        assertEquals("", memberIDByName.getMemberNumber());
        assertEquals("false", memberIDByName.getIsAmbiguous());
        sessionData9.setMemberInformation(null);
    }
    */
    
    /**
     * Case1: 0 Act, 1 In active, Not yet eligible
     */
    @Test
    public void testCase1() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        MemberInformation m1 = new MemberInformation();
        
        m1.setRxClaimID("IVR22MBR1");
        m1.setLastName("Rantissi");
        m1.setFirstName("John");
        // Set inactive member
        m1.setActiveIndicator("I");
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20141009"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20160109"));
        
        // Add the memberinfo to the list
        miList.add(m1);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "John", "Rantissi");
        assertEquals("IVR22MBR1", memberIDByName.getMemberNumber());
        assertEquals("false", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case2: 0 Act, 1 In active, No longer eligible
     */
    @Test
    public void testCase2() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        MemberInformation m1 = new MemberInformation();
        
        m1.setRxClaimID("IVR22MBR2");
        m1.setLastName("Manuel");
        m1.setFirstName("Sam");
        // Set inactive member
        m1.setActiveIndicator("I");
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20120108"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140108"));
        
        // Add the memberinfo to the list
        miList.add(m1);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Sam", "Manuel");
        assertEquals("IVR22MBR2", memberIDByName.getMemberNumber());
        assertEquals("false", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case3: 0 Act, 2 In active, Mbr IDs diff, From Date diff
     */
    @Test
    public void testCase3() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR3");
        m1.setLastName("Simpson");
        m1.setFirstName("Homer");
        // make it inactive
        m1.setActiveIndicator("I");
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20130105"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140105"));
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR3A");
        m2.setLastName("Simpson");
        m2.setFirstName("Homer");
        // make it inactive
        m2.setActiveIndicator("I");
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20130106"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140105"));
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Homer", "Simpson");
        assertEquals("IVR22MBR3", memberIDByName.getMemberNumber());
        assertEquals("true", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case4: 0 Act, 2 In active, Mbr IDs diff, From Date same
     */
    @Test
    public void testCase4() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR4");
        m1.setLastName("Williams");
        m1.setFirstName("Robin");
        // make it inactive
        m1.setActiveIndicator("I");
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR4DIFF");
        m2.setLastName("Williams");
        m2.setFirstName("Robin");
        // make it inactive
        m2.setActiveIndicator("I");
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Robin", "Williams");
        assertEquals("IVR22MBR4", memberIDByName.getMemberNumber());
        assertEquals("true", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case5: 0 Act, 2 In active, Mbr IDs same, From Date diff
     */
    @Test
    public void testCase5() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR5");
        m1.setLastName("Feynman");
        m1.setFirstName("Richard");
        // make it inactive
        m1.setActiveIndicator("I");
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20120101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR5");
        m2.setLastName("Feynman");
        m2.setFirstName("Richard");
        // make it inactive
        m2.setActiveIndicator("I");
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20120105"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m2.setCarrierId("IVR16BPG");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Richard", "Feynman");
        assertEquals("IVR22MBR5", memberIDByName.getMemberNumber());
        assertEquals("false", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case6: 0 Act, 2 In active, Mbr IDs same, From Date same
     */
    @Test
    public void testCase6() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR6");
        m1.setLastName("Feynman");
        m1.setFirstName("Richard");
        // make it inactive
        m1.setActiveIndicator("I");
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20120101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR6");
        m2.setLastName("Feynman");
        m2.setFirstName("Richard");
        // make it inactive
        m2.setActiveIndicator("I");
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m2.setCarrierId("IVR16BPG");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Richard", "Feynman");
        assertEquals("IVR22MBR6", memberIDByName.getMemberNumber());
        assertEquals("true", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case8: 1 Act, 1 In active, Mbr IDs diff
     */
    @Test
    public void testCase8() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR8");
        m1.setLastName("Mozart");
        m1.setFirstName("Wolfgang");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR8DIFF");
        m2.setLastName("Mozart");
        m2.setFirstName("Wolfgang");
        // make it inactive
        m2.setActiveIndicator("I");
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m2.setCarrierId("IVR2013REA");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Wolfgang", "Mozart");
        assertEquals("IVR22MBR8", memberIDByName.getMemberNumber());
        assertEquals("false", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case9: 1 Act, 1 In active, Mbr IDs same
     */
    @Test
    public void testCase9() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR9");
        m1.setLastName("Newton");
        m1.setFirstName("Isaac");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR9");
        m2.setLastName("Newton");
        m2.setFirstName("Isaac");
        // make it inactive
        m2.setActiveIndicator("I");
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m2.setCarrierId("IVR2013PA");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Isaac", "Newton");
        assertEquals("IVR22MBR9", memberIDByName.getMemberNumber());
        assertEquals("false", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case10: 1 Act, 2 In active
     */
    @Test
    public void testCase10() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR10");
        m1.setLastName("Picasso");
        m1.setFirstName("Pablo");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR10");
        m2.setLastName("Picasso");
        m2.setFirstName("Pablo");
        // make it inactive
        m2.setActiveIndicator("I");
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m2.setCarrierId("IVR2013PA");
        
        // 2 inactive member
        MemberInformation m3 = new MemberInformation();
        m3.setRxClaimID("IVR22MBR10NEW");
        m3.setLastName("Picasso");
        m3.setFirstName("Pablo");
        // make it inactive
        m3.setActiveIndicator("I");
        m3.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m3.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m3.setCarrierId("IVR2013PAB");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        miList.add(m3);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Pablo", "Picasso");
        assertEquals("IVR22MBR10", memberIDByName.getMemberNumber());
        assertEquals("false", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case11: 1 Act, 3 In active
     */
    @Test
    public void testCase11() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR11");
        m1.setLastName("Washington");
        m1.setFirstName("George");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("TEST");
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR11");
        m2.setLastName("Washington");
        m2.setFirstName("George");
        // make it inactive
        m2.setActiveIndicator("I");
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20110101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m2.setCarrierId("IVR2013RE");
        
        // 2 inactive member
        MemberInformation m3 = new MemberInformation();
        m3.setRxClaimID("IVR22MBR11");
        m3.setLastName("Washington");
        m3.setFirstName("George");
        // make it inactive
        m3.setActiveIndicator("I");
        m3.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20050101"));
        m3.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m3.setCarrierId("IVR2013PA");
        
        // 3 inactive member
        MemberInformation m4 = new MemberInformation();
        m4.setRxClaimID("IVR22MBR11A");
        m4.setLastName("Washington");
        m4.setFirstName("George");
        // make it inactive
        m4.setActiveIndicator("I");
        m4.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20030101"));
        m4.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20050101"));
        // Set CAG
        m4.setCarrierId("IVR2013PA");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        miList.add(m3);
        miList.add(m4);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "George", "Washington");
        assertEquals("IVR22MBR11", memberIDByName.getMemberNumber());
        assertEquals("false", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case12: 2 Act, Mbr IDs diff, From date diff
     */
    @Test
    public void testCase12() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR12");
        m1.setLastName("Armstrong");
        m1.setFirstName("Neil");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR12A");
        m2.setLastName("Armstrong");
        m2.setFirstName("Neil");
        // make it active
        m2.setActiveIndicator("A");
        m2.setIsPlanActive(true);
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100102"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20180101"));
        // Set CAG
        m2.setCarrierId("IVR2013PA");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Neil", "Armstrong");
        assertEquals("IVR22MBR12", memberIDByName.getMemberNumber());
        assertEquals("true", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case13: 2 Act, Mbr IDs diff, From date same
     */
    @Test
    public void testCase13() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR13");
        m1.setLastName("King");
        m1.setFirstName("Martin");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR13A");
        m2.setLastName("King");
        m2.setFirstName("Martin");
        // make it active
        m2.setActiveIndicator("A");
        m2.setIsPlanActive(true);
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20180101"));
        // Set CAG
        m2.setCarrierId("IVR2013PA");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Martin", "King");
        assertEquals("IVR22MBR13", memberIDByName.getMemberNumber());
        assertEquals("true", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case14: 2 Act, Mbr IDs same, From date diff
     */
    @Test
    public void testCase14() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR14");
        m1.setLastName("King");
        m1.setFirstName("Martin");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR14");
        m2.setLastName("King");
        m2.setFirstName("Martin");
        // make it active
        m2.setActiveIndicator("A");
        m2.setIsPlanActive(true);
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20090101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20180101"));
        // Set CAG
        m2.setCarrierId("IVR2013PA");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Martin", "King");
        assertEquals("IVR22MBR14", memberIDByName.getMemberNumber());
        assertEquals("false", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case15: 2 Act, Mbr IDs same, From date same
     */
    @Test
    public void testCase15() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 inactive member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR15");
        m1.setLastName("King");
        m1.setFirstName("Martin");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 1 inactive member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR15");
        m2.setLastName("King");
        m2.setFirstName("Martin");
        // make it active
        m2.setActiveIndicator("A");
        m2.setIsPlanActive(true);
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20180101"));
        // Set CAG
        m2.setCarrierId("IVR2013PA");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Martin", "King");
        assertEquals("IVR22MBR15", memberIDByName.getMemberNumber());
        assertEquals("true", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case16: 2 Act, 1 inactive, Mbr IDs diff, From date diff
     */
    @Test
    public void testCase16() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 active member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR16");
        m1.setLastName("King");
        m1.setFirstName("Martin");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 2 active member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR16A");
        m2.setLastName("King");
        m2.setFirstName("Martin");
        // make it active
        m2.setActiveIndicator("A");
        m2.setIsPlanActive(true);
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100102"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20180101"));
        // Set CAG
        m2.setCarrierId("IVR2013PA");
        
        // 2 active member
        MemberInformation m3 = new MemberInformation();
        m3.setRxClaimID("IVR22MBR16B");
        m3.setLastName("King");
        m3.setFirstName("Martin");
        // make it active
        m3.setActiveIndicator("I");
        m3.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20050101"));
        m3.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m3.setCarrierId("IVR2013RG");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        miList.add(m3);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Martin", "King");
        assertEquals("IVR22MBR16", memberIDByName.getMemberNumber());
        assertEquals("true", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case17: 2 Act, 1 inactive, Mbr IDs diff, From date same
     */
    @Test
    public void testCase17() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 active member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR17");
        m1.setLastName("King");
        m1.setFirstName("Martin");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 2 active member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR17A");
        m2.setLastName("King");
        m2.setFirstName("Martin");
        // make it active
        m2.setActiveIndicator("A");
        m2.setIsPlanActive(true);
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20180101"));
        // Set CAG
        m2.setCarrierId("IVR2013PA");
        
        // 2 active member
        MemberInformation m3 = new MemberInformation();
        m3.setRxClaimID("IVR22MBR17B");
        m3.setLastName("King");
        m3.setFirstName("Martin");
        // make it active
        m3.setActiveIndicator("I");
        m3.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m3.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m3.setCarrierId("IVR2013RG");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        miList.add(m3);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Martin", "King");
        assertEquals("IVR22MBR17", memberIDByName.getMemberNumber());
        assertEquals("true", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case18: 2 Act, 1 inactive, Mbr IDs same, From date diff
     */
    @Test
    public void testCase18() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 active member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR18");
        m1.setLastName("King");
        m1.setFirstName("Martin");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20110101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 2 active member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR18");
        m2.setLastName("King");
        m2.setFirstName("Martin");
        // make it active
        m2.setActiveIndicator("A");
        m2.setIsPlanActive(true);
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20100101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20180101"));
        // Set CAG
        m2.setCarrierId("IVR2013PA");
        
        // 2 active member
        MemberInformation m3 = new MemberInformation();
        m3.setRxClaimID("IVR22MBR18");
        m3.setLastName("King");
        m3.setFirstName("Martin");
        // make it active
        m3.setActiveIndicator("I");
        m3.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20110101"));
        m3.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m3.setCarrierId("IVR2013RG");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        miList.add(m3);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Martin", "King");
        assertEquals("IVR22MBR18", memberIDByName.getMemberNumber());
        assertEquals("false", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }
    
    /**
     * Case19: 2 Act, 1 inactive, Mbr IDs same, From date same
     */
    @Test
    public void testCase19() throws Exception {
        
        List<MemberInformation> miList = new ArrayList<MemberInformation>();
        
        // 1 active member
        MemberInformation m1 = new MemberInformation();
        m1.setRxClaimID("IVR22MBR19");
        m1.setLastName("King");
        m1.setFirstName("Martin");
        // make it active
        m1.setActiveIndicator("A");
        m1.setIsPlanActive(true);
        m1.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20110101"));
        m1.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20200101"));
        // Set CAG
        m1.setCarrierId("IVR2013RE");
        
        // 2 active member
        MemberInformation m2 = new MemberInformation();
        m2.setRxClaimID("IVR22MBR19");
        m2.setLastName("King");
        m2.setFirstName("Martin");
        // make it active
        m2.setActiveIndicator("A");
        m2.setIsPlanActive(true);
        m2.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20110101"));
        m2.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20180101"));
        // Set CAG
        m2.setCarrierId("IVR2013PA");
        
        // 2 active member
        MemberInformation m3 = new MemberInformation();
        m3.setRxClaimID("IVR22MBR19");
        m3.setLastName("King");
        m3.setFirstName("Martin");
        // make it active
        m3.setActiveIndicator("I");
        m3.setMemberEffectiveDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20110101"));
        m3.setMemberEffectiveThruDate(CalendarUtilities.getCalendarFromYYYYMMDDString("20140101"));
        // Set CAG
        m3.setCarrierId("IVR2013RG");
        
        // Add the memberinfo to the list
        miList.add(m1);
        miList.add(m2);
        miList.add(m3);
        // Add the member list to session
        sessionData9.setMemberInformation(miList);
        
        memberIDByName = wsGetMemberIDByNameclient.getMemberIDByName(sessionData9, "Martin", "King");
        assertEquals("IVR22MBR19", memberIDByName.getMemberNumber());
        assertEquals("true", memberIDByName.getIsAmbiguous());
        
        sessionData9.setMemberInformation(null);

    }

    
    
    
}
