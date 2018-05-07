/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.nuance.catamaran.dataaccess.ws.service.RxAuthSearchService;
import com.nuance.catamaran.utilities.CalendarUtilities;
import com.sxc.webservice.rxauth.RxAuthSearchRequestDocument;
import com.sxc.webservice.rxauth.RxAuthSearchRequestDocument.RxAuthSearchRequest;
import com.sxc.webservice.rxauth.RxAuthSearchResponseDocument;
import com.sxc.webservice.rxauth.RxAuthSearchResponseDocument.RxAuthSearchResponse;
import com.sxc.webservice.rxauth.RxAuthSearchStub;
import java.io.IOException;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Rule;
import org.junit.rules.ExpectedException;


public class WsRxAuthSearchClientTest_1  extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
 RxAuthSearchService rservice = new RxAuthSearchService(); 
       
       
      /* 
        rxAuthSearchRequest.setThruDate(CalendarUtilities.getYYYYMMDDString(CalendarUtilities.GetToday()));
        rxAuthSearchRequest.setCarrierId(carrierId);
        rxAuthSearchRequest.setAccountId(accountId);
        rxAuthSearchRequest.setGroupId(groupId);
        rxAuthSearchRequest.setMemberId(memberId);
        rxAuthSearchRequest.setIncludePrescriberInfo(false);
        rxAuthSearchRequest.setIncludeProviderInfo(false);
        rxAuthSearchRequest.setMaximumResultSet(100);
        rxAuthSearchRequest.setMaximumResultSetInd(true);*/
    
    public WsRxAuthSearchClientTest_1() throws IOException{
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
        //result = null;
    }
    
    @Test
    public void testGetPrescriptionInfoMemberNotFound() throws Exception {
        //            RxAuthSearchResponse rxAuthSearchResponse = RxAuthSearchService.GetRxAuthSearchResponse("GDYEAR", "GOODYEAR", "1330062AE", "informedrx6.webservice.sxc.com", "A6-IRX", "1463358910405501");
            RxAuthSearchResponse rxAuthSearchResponse = RxAuthSearchService.GetRxAuthSearchResponse("GDYEAR", "GOODYEAR", "1330062AE", "ksr.webservice.catamaranrx.com", "A5-KSR", "1463358910405501");

        System.out.println(rxAuthSearchResponse);        
       
    }      
    
}
