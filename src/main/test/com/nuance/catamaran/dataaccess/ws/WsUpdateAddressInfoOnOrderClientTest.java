/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.config.DataAccessConfiguration;
import static com.nuance.catamaran.dataaccess.ws.AbstractWsBaseClientTest.sessionData;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.junit.After;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import org.junit.Before;
import org.junit.Test;

/**
 *
 * @author ivrdev1
 */
public class WsUpdateAddressInfoOnOrderClientTest extends AbstractWsBaseClientTest {
    
    WsUpdateAddressInfoOnOrderClient instance = new WsUpdateAddressInfoOnOrderClient();
    
    
    /**
     *
     */
    public WsUpdateAddressInfoOnOrderClientTest() throws IOException{
    }
    
    
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    
    
    @Test
    public void testUpdateAddressInfoOnOrder() throws Exception {
        String orderNumber = "96002449";
        String address1 = "100 MAIN ST";
        String address2 = "PO BOX 1022";
        String city = "SEATTLE";
        String state = "WA";
        String zip = "98104";

        String rxNumber = "6053325";
        sessionData.setDateOfBirth("19510118");

        sessionData.getDnisProfile().setBpgFlag("");
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
        assertNull(sessionData.getClientHierarchyLevel1Value());
        assertNull(sessionData.getClientHierarchyLevel2Value());
        assertNull(sessionData.getClientHierarchyLevel3Value());
        DataAccessConfiguration.getInstance().setCarrierFilter("CarrierFilter");

        instance.updateAddressInfoOnOrderClient(sessionData, orderNumber, address1, address2, city, state, zip);
        
       
    }
}  