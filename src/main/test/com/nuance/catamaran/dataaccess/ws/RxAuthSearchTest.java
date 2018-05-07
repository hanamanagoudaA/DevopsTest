/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.LastNameListByZIPAndDOB;
import static com.nuance.catamaran.dataaccess.ws.AbstractWsBaseClientTest.sessionData;
import com.nuance.catamaran.dataaccess.ws.service.RxAuthSearchService;
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
public class RxAuthSearchTest extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    
    RxAuthSearchResponseDocument.RxAuthSearchResponse result = null;        


    public RxAuthSearchTest() throws IOException{
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
     * Test of GetRxAuthSearchResponse method, of class
     * RxAuthSearchService.
     */
    @Test
    public void testGetLastNameListByZipAndDOB() throws Exception {
        
        result = RxAuthSearchService.GetRxAuthSearchResponse("GDYEAR", "GOODYEAR", "1330062AE", "ksr.webservice.catamaranrx.com", "A5-KSR", "1463358910405501");
      
        assertEquals(false, result.getMaxRowExceededInd());
    }

}
