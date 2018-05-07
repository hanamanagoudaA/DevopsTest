/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.ws.service.MakePaymentORxService;
import com.unitedhealthgroup.optumrx.schema.balancepayment.canonical.makepayment.MakePaymentResType;
import java.io.IOException;
import org.junit.*;
import org.junit.rules.ExpectedException;
/**
 *
 * @author ivrdev3
 */
public class MakePaymentORXServiceClientTest  extends AbstractWsBaseClientTest  {
     @Rule
    public ExpectedException exception = ExpectedException.none();
     
    MakePaymentORxService instance = new MakePaymentORxService();
    MakePaymentResType result = null;
    
    public MakePaymentORXServiceClientTest() throws IOException{
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
    public void testMakePayment() throws Exception {
        String patientID = "72004648";
        String ucid = "1234";
        String irisDomain = "rxsts04soa.uhc.com";        
        
        result = MakePaymentORxService.makePaymentResponse(ucid, irisDomain, patientID,"1","1","1");
        System.out.println("total:" + result);
        
        
    }
}
