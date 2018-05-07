/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.nuance.catamaran.dataaccess.objects.LastNameListByZIPAndDOB;
import com.nuance.catamaran.dataaccess.objects.SubmitOrderResponse;
import static com.nuance.catamaran.dataaccess.ws.AbstractWsBaseClientTest.sessionData;
import com.nuance.catamaran.dataaccess.ws.exception.BusinessLogicException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
/**
 *
 * @author 
 */
public class WsSubmitOrderClientTest  extends AbstractWsBaseClientTest {
    
    WsSubmitOrderClient instance = new WsSubmitOrderClient();
    @Rule
    public ExpectedException exception = ExpectedException.none();
    SubmitOrderResponse result = null;
    
    /**
     *
     */
    public WsSubmitOrderClientTest() throws IOException{
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

    
    
    
    @Ignore
    public void testPreferedCardNotInAccountException() throws Exception {
        String rxNumber = "000206053325";
        
        //sessionData.setDateOfBirth("19461228");
        String shippingMethod = "";
        String selectedCardIndex = "-1";
        String creditCardNum = "";
        String creditCardExpDate = "";
        String saveOnProfile = "";
        String savePreferred = "";
        String memberNumber = "IVR2013PA5";
        
       // sessionData.setDateOfBirth("1984-04-12");
        sessionData.getDnisProfile().setBpgFlag("");
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
        assertNull(sessionData.getClientHierarchyLevel1Value());
        assertNull(sessionData.getClientHierarchyLevel2Value());
        assertNull(sessionData.getClientHierarchyLevel3Value());
        exception.expectMessage("WsSubmitOrderClient: Preferred card selected, but preferred card not found on account!");
        exception.expect(BusinessLogicException.class);
        result = instance.submitOrder(sessionData, rxNumber, shippingMethod, selectedCardIndex, creditCardNum, creditCardExpDate, saveOnProfile, savePreferred);
        
    }
    
    
    @Ignore
    public void testCallerCardNotFoundInAccountException() throws Exception {
        String rxNumber = "00000000";
        
        //sessionData.setDateOfBirth("19461228");
        String shippingMethod = "";
        String selectedCardIndex = "notset";
        String creditCardNum = "";
        String creditCardExpDate = "";
        String saveOnProfile = "";
        String savePreferred = "";
        String memberNumber = "IVR2013PA5";
        
       // sessionData.setDateOfBirth("1984-04-12");
        sessionData.getDnisProfile().setBpgFlag("");
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
        assertNull(sessionData.getClientHierarchyLevel1Value());
        assertNull(sessionData.getClientHierarchyLevel2Value());
        assertNull(sessionData.getClientHierarchyLevel3Value());
        exception.expectMessage("WsSubmitOrderClient: Caller chose charge card, but no card found on account");
        exception.expect(BusinessLogicException.class);
        result = instance.submitOrder(sessionData, rxNumber, shippingMethod, selectedCardIndex, creditCardNum, creditCardExpDate, saveOnProfile, savePreferred);
        
    }
    
    
   
  
    @Test
    public void testSubmitOrderCHGAccount() throws Exception {
        String rxNumber = "6053325";
        sessionData.setDateOfBirth("19510118");
        String shippingMethod = "";
        String selectedCardIndex = "notset";
        String creditCardNum = "";
        String creditCardExpDate = "2201";
        String saveOnProfile = "true";
        String savePreferred = "false";
        
        
       
        sessionData.getDnisProfile().setBpgFlag("");
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
        assertNull(sessionData.getClientHierarchyLevel1Value());
        assertNull(sessionData.getClientHierarchyLevel2Value());
        assertNull(sessionData.getClientHierarchyLevel3Value());
        DataAccessConfiguration.getInstance().setCarrierFilter("CarrierFilter");
        
       
         String dob = "19510118";
        String zip = "78260";
        WsGetLastNameListByZIPAndDOBClient wsGetLastNameListByZIPAndDOBClient = new WsGetLastNameListByZIPAndDOBClient();
        LastNameListByZIPAndDOB ws;
        ws = wsGetLastNameListByZIPAndDOBClient.getLastNameListByZipAndDOB(sessionData, zip, dob);
        
        sessionData.getMemberInformation().get(0).setDateOfBirth(dob);
        
        WsGetPrescriptionInfoClient wsGetPrescriptionInfoClient = new WsGetPrescriptionInfoClient();
        wsGetPrescriptionInfoClient.getPrescriptionInfo(sessionData, rxNumber);
        
        
       
        
      
        result = instance.submitOrder(sessionData, rxNumber, shippingMethod, selectedCardIndex, creditCardNum, creditCardExpDate, saveOnProfile, savePreferred);
        assertNotNull( result);
       // assertEquals("950003742", sessionData.getCreditCardChargeNumber()); or 950003743
        assertEquals("CHG", sessionData.getCreditCardType());
        assertEquals("", sessionData.getCreditCardNumber());
        assertEquals("", result.getPrescriptionsOrdered());
        assertEquals("",sessionData.getMailOrderQueue());
        assertEquals("0",sessionData.getMailShippingType());
        //assertEquals(00000000,sessionData.getMailOrderNumber());  //00000000 0
        
        //TODO CHG account not found exception
              
    }
    
    
    
    @Test
    public void testSubmitOrderVISAExistingCard() throws Exception {
        String rxNumber = "6053325";
        sessionData.setDateOfBirth("19510118");
        String shippingMethod = "standard";
        String selectedCardIndex = "0";
        String creditCardNum = "";
        String creditCardExpDate = "";
        String saveOnProfile = "false";
        String savePreferred = "false";
        DataAccessConfiguration.getInstance().setCarrierFilter("CarrierFilter");
        
       
        sessionData.getDnisProfile().setBpgFlag("");
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
        assertNull(sessionData.getClientHierarchyLevel1Value());
        assertNull(sessionData.getClientHierarchyLevel2Value());
        assertNull(sessionData.getClientHierarchyLevel3Value());
       
       
        String dob = "19510118";
        String zip = "78260";
        
        WsGetLastNameListByZIPAndDOBClient wsGetLastNameListByZIPAndDOBClient = new WsGetLastNameListByZIPAndDOBClient();
        LastNameListByZIPAndDOB ws;
        ws = wsGetLastNameListByZIPAndDOBClient.getLastNameListByZipAndDOB(sessionData, zip, dob);
       
                 sessionData.getMemberInformation().get(0).setDateOfBirth(dob);
                 
                 
        WsGetPrescriptionInfoClient wsGetPrescriptionInfoClient = new WsGetPrescriptionInfoClient();
        wsGetPrescriptionInfoClient.getPrescriptionInfo(sessionData, rxNumber);
        sessionData.setCurrentRxNumber("95167228");
     
       
        WsAddPrescriptionToOrderClient client = new WsAddPrescriptionToOrderClient();
        client.addPrescriptionToOrder(sessionData, "95167228");
            
        result = instance.submitOrder(sessionData, rxNumber, shippingMethod, selectedCardIndex, creditCardNum, creditCardExpDate, saveOnProfile, savePreferred);
        assertNotNull( result);
        //assertEquals("950003734", sessionData.getCreditCardChargeNumber()); //or 950003743
        assertEquals("VIS", sessionData.getCreditCardType());
        assertEquals("************9990", sessionData.getCreditCardNumber());
        //assertEquals("************1111", sessionData.getCreditCardNumber());
        assertEquals("95167228", result.getPrescriptionsOrdered());
        assertEquals("0",sessionData.getMailShippingType());
        //assertEquals(00000000,sessionData.getMailOrderNumber());  //00000000 0
        assertEquals("",sessionData.getMailOrderQueue());
        

              
    }
   
    
    @Test
    public void testSubmitOrderPreferredCardNotFound() throws Exception {
        String rxNumber = "6053325";
        sessionData.setDateOfBirth("19510118");
        String shippingMethod = "";
        String selectedCardIndex = "-1";
        String creditCardNum = "4111111111111111";
        String creditCardExpDate = "";
        String saveOnProfile = "false";
        String savePreferred = "false";
        
        
       
        sessionData.getDnisProfile().setBpgFlag("");
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
        assertNull(sessionData.getClientHierarchyLevel1Value());
        assertNull(sessionData.getClientHierarchyLevel2Value());
        assertNull(sessionData.getClientHierarchyLevel3Value());
       
       
         String dob = "19510118";
        String zip = "78260";
        WsGetLastNameListByZIPAndDOBClient wsGetLastNameListByZIPAndDOBClient = new WsGetLastNameListByZIPAndDOBClient();
        LastNameListByZIPAndDOB ws;
        ws = wsGetLastNameListByZIPAndDOBClient.getLastNameListByZipAndDOB(sessionData, zip, dob);
        
        sessionData.getMemberInformation().get(0).setDateOfBirth(dob);
        
        WsGetPrescriptionInfoClient wsGetPrescriptionInfoClient = new WsGetPrescriptionInfoClient();
        wsGetPrescriptionInfoClient.getPrescriptionInfo(sessionData, rxNumber);
        exception.expect(BusinessLogicException.class);
      exception.expectMessage("WsSubmitOrderClient: Preferred card selected, but preferred card not found on account!");
        result = instance.submitOrder(sessionData, rxNumber, shippingMethod, selectedCardIndex, creditCardNum, creditCardExpDate, saveOnProfile, savePreferred);
                 
    }
    
    
    @Test
    public void testSubmitOrderAmericanExpressNewCardOnlyOneTime() throws Exception {
        String rxNumber = "6053325";
        sessionData.setDateOfBirth("19510118");
        String shippingMethod = "";
        String selectedCardIndex = "notset";
        String creditCardNum = "378282246310005";
        String creditCardExpDate = "20220101";
        String saveOnProfile = "false";
        String savePreferred = "false";
        
        
       
        sessionData.getDnisProfile().setBpgFlag("");
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
        assertNull(sessionData.getClientHierarchyLevel1Value());
        assertNull(sessionData.getClientHierarchyLevel2Value());
        assertNull(sessionData.getClientHierarchyLevel3Value());
       
       
        String dob = "19510118";
        String zip = "78260";
        WsGetLastNameListByZIPAndDOBClient wsGetLastNameListByZIPAndDOBClient = new WsGetLastNameListByZIPAndDOBClient();
        LastNameListByZIPAndDOB ws;
        ws = wsGetLastNameListByZIPAndDOBClient.getLastNameListByZipAndDOB(sessionData, zip, dob);
        
        sessionData.getMemberInformation().get(0).setDateOfBirth(dob);
        
        WsGetPrescriptionInfoClient wsGetPrescriptionInfoClient = new WsGetPrescriptionInfoClient();
        wsGetPrescriptionInfoClient.getPrescriptionInfo(sessionData, rxNumber);
      
        result = instance.submitOrder(sessionData, rxNumber, shippingMethod, selectedCardIndex, creditCardNum, creditCardExpDate, saveOnProfile, savePreferred);
        assertNotNull( result);
        assertEquals("AMX", sessionData.getCreditCardType());
        assertEquals("378282246310005", sessionData.getCreditCardNumber());
        assertEquals("", result.getPrescriptionsOrdered());
        assertEquals("",sessionData.getMailOrderQueue());
        assertEquals("0",sessionData.getMailShippingType());
        assertEquals("",sessionData.getMailOrderQueue());
        
        // TODO verify from getAccntService 
              
    }
    
    
    @Test
    public void testSubmitOrderInvalidCardOnlyOneTime() throws Exception {
        String rxNumber = "6053325";
        sessionData.setDateOfBirth("19510118");
        String shippingMethod = "";
        String selectedCardIndex = "notset";
        String creditCardNum = "1234123412341234";
        String creditCardExpDate = "20220101";
        String saveOnProfile = "false";
        String savePreferred = "false";
        
        
       
        sessionData.getDnisProfile().setBpgFlag("");
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
        assertNull(sessionData.getClientHierarchyLevel1Value());
        assertNull(sessionData.getClientHierarchyLevel2Value());
        assertNull(sessionData.getClientHierarchyLevel3Value());
       
       
        String dob = "19510118";
        String zip = "78260";
        WsGetLastNameListByZIPAndDOBClient wsGetLastNameListByZIPAndDOBClient = new WsGetLastNameListByZIPAndDOBClient();
        LastNameListByZIPAndDOB ws;
        ws = wsGetLastNameListByZIPAndDOBClient.getLastNameListByZipAndDOB(sessionData, zip, dob);
        
        sessionData.getMemberInformation().get(0).setDateOfBirth(dob);
        
        WsGetPrescriptionInfoClient wsGetPrescriptionInfoClient = new WsGetPrescriptionInfoClient();
        wsGetPrescriptionInfoClient.getPrescriptionInfo(sessionData, rxNumber);
        result = instance.submitOrder(sessionData, rxNumber, shippingMethod, selectedCardIndex, creditCardNum, creditCardExpDate, saveOnProfile, savePreferred);
        assertNotNull( result);
        assertEquals("", sessionData.getCreditCardType());
        assertEquals("1234123412341234", sessionData.getCreditCardNumber());
        assertEquals("", result.getPrescriptionsOrdered());
        assertEquals("",sessionData.getMailOrderQueue());
        assertEquals("0",sessionData.getMailShippingType());
        assertEquals("",sessionData.getMailOrderQueue());
        // TODO verify from getAccntService 
              
    }
    
    
     @Test
    public void testSubmitOrderAMXPrefferedAccount() throws Exception {
        String rxNumber = "6053325";
        sessionData.setDateOfBirth("19510118");
        String shippingMethod = "two_day";
        String selectedCardIndex = "notset";
       String creditCardNum = "371449635398431";
        String creditCardExpDate = "20220101";
        String saveOnProfile = "true";
        String savePreferred = "true";
        
        
       
        sessionData.getDnisProfile().setBpgFlag("");
        List<String> list = new ArrayList<String>();
        sessionData.getDnisProfile().setRxcDomain(list);
        assertNull(sessionData.getClientHierarchyLevel1Value());
        assertNull(sessionData.getClientHierarchyLevel2Value());
        assertNull(sessionData.getClientHierarchyLevel3Value());
       
       
        String dob = "19510118";
        String zip = "78260";
        WsGetLastNameListByZIPAndDOBClient wsGetLastNameListByZIPAndDOBClient = new WsGetLastNameListByZIPAndDOBClient();
        LastNameListByZIPAndDOB ws;
        ws = wsGetLastNameListByZIPAndDOBClient.getLastNameListByZipAndDOB(sessionData, zip, dob);
        
        sessionData.getMemberInformation().get(0).setDateOfBirth(dob);
        
        WsGetPrescriptionInfoClient wsGetPrescriptionInfoClient = new WsGetPrescriptionInfoClient();
        wsGetPrescriptionInfoClient.getPrescriptionInfo(sessionData, rxNumber);
      
        result = instance.submitOrder(sessionData, rxNumber, shippingMethod, selectedCardIndex, creditCardNum, creditCardExpDate, saveOnProfile, savePreferred);
        assertNotNull( result);
       // assertEquals("950003742", sessionData.getCreditCardChargeNumber()); or 950003743
        assertEquals("AMX", sessionData.getCreditCardType());
        assertEquals("371449635398431", sessionData.getCreditCardNumber());
        assertEquals("", result.getPrescriptionsOrdered());
        assertEquals("",sessionData.getMailOrderQueue());
        assertEquals("2",sessionData.getMailShippingType());
        //assertEquals(00000000,sessionData.getMailOrderNumber());  //00000000 0
        
        
              
    }
     
    
}
