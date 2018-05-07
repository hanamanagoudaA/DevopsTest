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
import com.sxc.webservice.claim.ClaimSearchV3ResponseDocument;
import com.sxc.webservice.claim.ClaimSearchV3ResponseDocument.ClaimSearchV3Response;
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
public class ClaimSearchV3Test extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    ClaimSearchV3Response result = null;        


    public ClaimSearchV3Test() throws IOException{
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
     * Test of GetClaimSearchV3ResponseByPharmacyID method, of class
     * ClaimSearchV3Service.
     */
    @Test
    public void testGetClaimSearchV3Service() throws Exception {
        
        result = ClaimSearchV3Service.GetClaimSearchV3ResponseByPharmacyID("ksr.webservice.catamaranrx.com","A6-IRX","1063678209","01");
      
        assertEquals(false, result.getMaxRowExceededInd());
    }
}
