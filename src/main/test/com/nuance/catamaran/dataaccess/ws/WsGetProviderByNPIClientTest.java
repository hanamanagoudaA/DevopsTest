/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.ProviderInfo;
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
public class WsGetProviderByNPIClientTest  extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsGetProviderByNPIClient instance = new WsGetProviderByNPIClient();
    ProviderInfo result = null;
    
    public WsGetProviderByNPIClientTest() throws IOException{
    }
    
    
    /**
     * Test of getProviderByNPI method, of class WsGetProviderByNPIClient.
     */
    @Test
    public void testGetPharmacyProviderByNPI() throws Exception {
        String npiNumber = "1861426678";
        String callerType = "pharmacy";
        
        ProviderInfo expResult = new ProviderInfo(true);
        ProviderInfo expResult2 = new ProviderInfo(false);
        assertNull(sessionData.getNpiNumber());
        result = instance.getProviderByNPI(sessionData, npiNumber, callerType);
        assertEquals(expResult.getIsValidNPI(), result.getIsValidNPI());
        assertEquals(npiNumber, sessionData.getNpiNumber());
        npiNumber = "1861426679";
        result = instance.getProviderByNPI(sessionData, npiNumber, callerType);
        assertEquals(expResult2.getIsValidNPI(), result.getIsValidNPI());
       
    }
    
    @Test
    public void testGetPhysicianProviderByNPI() throws Exception {
        String npiNumber = "1457449688";
        String callerType = "PRTG";
        assertNull(sessionData.getNpiNumber());
        ProviderInfo expResult = new ProviderInfo(true);
        ProviderInfo expResult2 = new ProviderInfo(false);
        result = instance.getProviderByNPI(sessionData, npiNumber, callerType);
        assertEquals(expResult.getIsValidNPI(), result.getIsValidNPI());
        assertEquals(npiNumber, sessionData.getNpiNumber());        
        npiNumber = "1457449689";
        result = instance.getProviderByNPI(sessionData, npiNumber, callerType);
        assertEquals(expResult2.getIsValidNPI(), result.getIsValidNPI());
       
    }
    
}
