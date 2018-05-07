/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.rest.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.nuance.catamaran.dataaccess.data.CTIData;
import com.nuance.catamaran.dataaccess.data.CTIRoute;
import com.nuance.catamaran.dataaccess.data.DNISProfile;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.CallerDetails;
import com.nuance.catamaran.dataaccess.ws.AbstractWsBaseClientTest;
import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *
 * @author ivrdev1
 */
public class VCCBPEClientTest {
    
    VCCBPEClient instance = null;
    SessionData sessionData = null;
    static String VCCBPEServiceURL = "http://localhost:9090/context/vccbpe/contexts";
        static String VCCBPERouteServiceURL = "http://localhost:9090/aaep/routing";
       static  DataAccessConfiguration daConfiguration = DataAccessConfiguration.getInstance(); 
       static DNISProfile dnis = null;
        
    public VCCBPEClientTest() throws IOException{
    }
    
    @BeforeClass
    public static void setUpClass() {
        
        daConfiguration.setVccBPEURL(VCCBPEServiceURL);
            daConfiguration.setVccBPERouteURL(VCCBPEServiceURL);
            dnis = new DNISProfile();
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
        instance = new VCCBPEClient();
        sessionData = new SessionData();
        
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of getCTIData method, of class VCCBPEClient.
     */
    @Test
    public void testGetCTIData() throws Exception {
        System.out.println("getCTIData");
        String ucid = "20";
        //String ucid = "00128122031462986158";
        VCCBPEClient instance = new VCCBPEClient();
        DataAccessConfiguration.getInstance().setVccBPEURL("http://172.20.200.20:9090/context/vccbpe/contexts/");
        String result = instance.getCTIData(ucid);
        JsonReader jsonReader = null;
        String tfn = "";
        jsonReader = Json.createReader(new StringReader(result));
        // Store the response as the BPE context in the session
        JsonObject json = jsonReader.readObject();
        jsonReader.close();
        if (json != null && !json.isEmpty()) {
            if (json.containsKey("data")) {
                if (json.getJsonObject("data").size() > 0) {
                    JsonObject dataObj = json.getJsonObject("data");
                    tfn = dataObj.getString("TFN");
                    if(dataObj.containsKey("ani")){
                        System.out.println("ANI: "+dataObj.getString("ani"));
                    }
                    
                }
            }
        }
        assertEquals("8445468300", tfn);
        
    }

    /**
     * Test of callCTIService method, of class VCCBPEClient.
     */
    @Test
    public void testCallCTIService() throws Exception {
        System.out.println("callCTIService");
        String method = "POST";
        String endpoint = "http://localhost:9090/context/vccbpe/contexts";
        String ucid = "123456789";
        String serviceName = "VccBPE";
        String operationName = "POST";
        String jsonValue = "";
        String expResult = "";
        sessionData.setUcid("123456789");
        sessionData.setDnisProfile(dnis);
        CTIData cdata = new CTIData();
        CallerDetails cd = new CallerDetails();        
        sessionData.setCtiContext(cdata.getContext());        
        sessionData.setAni("12345");
        cdata.populateContext(sessionData,dnis,"Something Else",false);
        String result = VCCBPEClient.callCTIService(method, endpoint, ucid, serviceName, operationName, sessionData, jsonValue);
        assertNotNull(result);
        operationName = "PUT";
        result = VCCBPEClient.callCTIService(method, endpoint, ucid, serviceName, operationName, sessionData, jsonValue);
        assertNotNull(result);
        endpoint = "http://localhost:9090/aaep/routing";
        operationName = "POST";
        CTIRoute croute = new CTIRoute();
         sessionData.setDnis("123456789");
        croute.populateRoute(sessionData, dnis);
        sessionData.setRouteContext(croute.getContext());
        result = VCCBPEClient.callCTIService(method, endpoint, ucid, serviceName, operationName, sessionData, jsonValue);
        assertNotNull(result);


    }
    
}
