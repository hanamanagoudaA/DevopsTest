/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws;

import com.unitedhealthgroup.optumrx.getpatient.v1_00.GetPatientResponseType;
import java.io.IOException;
import org.junit.*;
import org.junit.rules.ExpectedException;
/**
 *
 * @author ivrdev2
 */
public class WsGetPatientORXServiceClientTest  extends AbstractWsBaseClientTest  {
     @Rule
    public ExpectedException exception = ExpectedException.none();
     
    WsGetPatientORXServiceClient instance = new WsGetPatientORXServiceClient();
    GetPatientResponseType result = null;
    
    public WsGetPatientORXServiceClientTest() throws IOException{
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
        result =  null;
    }

    @Test
    public void testGetPatient() throws Exception {
        String RxNumber = "72004648";
        String DOB = "1941-08-19";
        String ucid = "1234";
        String irisDomain = "rxsts04soa.uhc.com";
        
        
     
        
        result = instance.getPatientResponseType(ucid, irisDomain, RxNumber, DOB);
        System.out.println("total:" + result);
        System.out.println("total:" + result.getSearchSummary());
        
        
    }
}
