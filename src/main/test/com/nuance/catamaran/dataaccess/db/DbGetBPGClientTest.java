/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.db;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.nuance.catamaran.dataaccess.data.DNISProfile;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.MemberProcessingInfo;
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
public class DbGetBPGClientTest {
    
    private static SessionData sessionData;
    private static MemberProcessingInfo expResult = new MemberProcessingInfo();
    private static DNISProfile dnisProfile;
    private static DbGetBPGClient instance;
        
    //private static DataAccessConfiguration dataAccessConfiguration = null;
    
    public DbGetBPGClientTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
        
        instance = new DbGetBPGClient();
        sessionData = new SessionData();
        dnisProfile = new DNISProfile();
        
        dnisProfile.setCtiServerIP("10.100.234.50");
        dnisProfile.setCtiServerPort("1521");
        dnisProfile.setCtiServerID("CIBD");
        dnisProfile.setCtiUsername("ivr");
        dnisProfile.setCtiPassword("temp4now");
        
        sessionData.setDnisProfile(dnisProfile);
        
        //dataAccessConfiguration = new DataAccessConfiguration();
        
    }
    
    @AfterClass
    public static void tearDownClass() {
        sessionData = null;
        dnisProfile = null;
        instance = null;
    }
    
    @Before
    public void setUp() {
        
    }
    
    @After
    public void tearDown() {
    }

    @Test
    public void testGetBPGNegative() throws Exception {
//        System.out.println("getBPG");
        sessionData.setClientHierarchyLevel1Value("");
        sessionData.setClientHierarchyLevel2Value("");
        sessionData.setClientHierarchyLevel3Value("");
        MemberProcessingInfo result = instance.getBPG(sessionData);
        assertEquals(null, result.getPcn());
    }
    
    @Test
    public void testGetBPGPositive() throws Exception {
        System.out.println("getBPG");
        sessionData.setClientHierarchyLevel1Value("IVR2013RE");
        sessionData.setClientHierarchyLevel2Value("IVR2013REJ");
        sessionData.setClientHierarchyLevel3Value("IVR2013REJ");
        MemberProcessingInfo result = instance.getBPG(sessionData);
        assertEquals("1232", result.getBin());
    }
    
}
