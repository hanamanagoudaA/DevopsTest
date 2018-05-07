/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.nuance.catamaran.dataaccess.objects.PasLocationDetails;
import static com.nuance.catamaran.dataaccess.ws.AbstractWsBaseClientTest.sessionData;
import java.io.IOException;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

/**
 *
 * @author ivrdev4
 */
public class WsGetPasLocatorClientTest extends AbstractWsBaseClientTest {
    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsGetPasLocatorClient instance = new WsGetPasLocatorClient();
    PasLocationDetails result = null;
    
    public WsGetPasLocatorClientTest() throws IOException{
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
    
    @Test
    public void testWsGetPasLocatorClient() throws Exception {
        
        DataAccessConfiguration.getInstance().setPasLocatorURL("http://stg-shared-orxws.uhc.com/OptumRxServices/services/FSRoutingServiceV4");
        
        String carrierId = "06351858";
        sessionData.setUcid("123");
        sessionData.setDateOfBirth("19510118");
        result = instance.getPasLocation(sessionData, carrierId);
        System.out.println("Reaponse :"+result.getBusinessId());
    }
    
}
