/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.LastNameListByZIPAndDOB;
import static com.nuance.catamaran.dataaccess.ws.AbstractWsBaseClientTest.sessionData;
import com.nuance.catamaran.dataaccess.ws.service.ClaimSearchV3Service;
import com.nuance.catamaran.dataaccess.ws.service.RxAuthSearchService;
import com.nuance.catamaran.dataaccess.ws.service.UserMemberPortalService;
import com.sxc.webservice.claim.ClaimSearchV3ResponseDocument;
import com.sxc.webservice.claim.ClaimSearchV3ResponseDocument.ClaimSearchV3Response;
import com.sxc.webservice.member.UserMemberPortalV2ResponseDocument;
import com.sxc.webservice.member.UserMemberPortalV2ResponseDocument.UserMemberPortalV2Response;
import com.sxc.webservice.rxauth.RxAuthSearchResponseDocument;
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
public class UserMemberPortalTest extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
   
   UserMemberPortalV2Response result = null;        


    public UserMemberPortalTest() throws IOException{
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
     * Test of GetUserMemberPortalV2Response method, of class
     * UserMemberPortalService.
     */
    @Test
    public void testGetLastNameListByZipAndDOB() throws Exception {
       
        result = UserMemberPortalService.GetUserMemberPortalV2Response("ksr.webservice.catamaranrx.com","A5-KSR","13542201","MR");
      
        //assertEquals(false, result.getMemberItemsArray());
    }
}
