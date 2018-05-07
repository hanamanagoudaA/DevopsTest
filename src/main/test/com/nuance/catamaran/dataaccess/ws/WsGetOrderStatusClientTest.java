/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.constants.ActionableAlertType;
import com.nuance.catamaran.dataaccess.constants.CallFlowVariable;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.OrderStatus;
import com.nuance.catamaran.dataaccess.ws.service.GetOrderDetailService;
import com.sxc.webservice.rxexpressssl.member.GetOrderDetailResponseDocument;
import com.sxc.webservice.rxexpressssl.member.GetOrderHeaderResponseDocument;
import java.io.IOException;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Ignore;
import org.junit.Rule;
import org.junit.rules.ExpectedException;

/**
 *
 * @author 
 */
public class WsGetOrderStatusClientTest  extends AbstractWsBaseClientTest {
    
    WsGetOrderStatusClient instance = new WsGetOrderStatusClient();
    OrderStatus result = null;
    @Rule
    public ExpectedException exception = ExpectedException.none();
    
    public WsGetOrderStatusClientTest() throws IOException{
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
     * Test of getOrderStatus method, of class WsGetOrderStatusClient.
     */
    //@Test
    public void testGetOrderStatus() throws Exception {
        String rxNumber = "93712580";
        String returnNextOrder = "true";
        String returnNextOrder2 = "notset";
        result = instance.getOrderStatus(sessionData, rxNumber, returnNextOrder2);
        //sessionData.addGetOrderDetailResponses
        result = instance.getOrderStatus(sessionData, rxNumber, returnNextOrder);
        assertEquals("4", result.getNumberOfOrders());
        assertEquals("in process", result.getOrderStatus());
    }
    
    //@Test
    public void testInValidRxNumberNotSet() throws Exception {
        String rxNumber = "9371258011";
        String returnNextOrder = "notset";
        assertEquals(0, sessionData.getOrderIndex());
        assertNull(sessionData.getOrderHistorySummaryList());
         assertNull(sessionData.getGetOrderHistorySummaryResponse(rxNumber));
         assertNull(sessionData.getGetPatientHistoryResponse(rxNumber));
        result = instance.getOrderStatus(sessionData, rxNumber, returnNextOrder);
        assertEquals("0", result.getNumberOfOrders());        
        assertEquals("011",sessionData.getGetOrderHistorySummaryResponse(rxNumber).getReturnStatus().getReturnCd());
        
    }
    
    //@Test
    public void testInValidRxNumberTrue() throws Exception {
        String rxNumber = "9371258011";
        String returnNextOrder = "true";
        exception.expect(NullPointerException.class);
        result = instance.getOrderStatus(sessionData, rxNumber, returnNextOrder);
        assertEquals("4",sessionData.getOrderHistorySummaryList());
    }
    
    //@Test
    public void testInValidRxNumber() throws Exception {
        String rxNumber = "9371258011";
        String returnNextOrder = "";
        exception.expect(NullPointerException.class);
        result = instance.getOrderStatus(sessionData, rxNumber, returnNextOrder);
        assertEquals("4",sessionData.getOrderHistorySummaryList());
    }
    
    //@Test
    public void testReturnNextOrderNull() throws Exception {
        String rxNumber = "93712580";
        String returnNextOrder = "notset";
        result = instance.getOrderStatus(sessionData, rxNumber, returnNextOrder);
        assertEquals("4", result.getNumberOfOrders());
    }
    
    
    //@Test
    public void testGetOrderStatusMessage() throws Exception {
        String rxNumber = "06365161";
        String returnNextOrder = "notset";
        String orderNumber = "10737917";
        assertEquals(0, sessionData.getOrderIndex());
        assertNull(sessionData.getOrderHistorySummaryList());
         assertNull(sessionData.getGetOrderHistorySummaryResponse(rxNumber));
         assertNull(sessionData.getGetPatientHistoryResponse(rxNumber));
         assertNull(sessionData.getGetOrderDetailResponses(orderNumber));
        result = instance.getOrderStatus(sessionData, rxNumber, returnNextOrder);
        assertNotNull(sessionData.getGetOrderHistorySummaryResponse(rxNumber));
        assertNotNull(sessionData.getGetPatientHistoryResponse(rxNumber));
        assertNotNull(sessionData.getGetOrderDetailResponses(orderNumber));
        //assertNotNull(sessionData.getOrderHistorySummaryList());
        //assertEquals(1,sessionData.getOrderHistorySummaryList().size());
        assertEquals(orderNumber,sessionData.getMailOrderNumber());
        assertEquals("1", result.getNumberOfOrders());
        assertEquals("MELANIE", result.getMemberFirstName());
        assertEquals("33486", result.getZipCode());
        assertEquals("2", result.getNumberOfPrescriptions());
        assertEquals("", result.getShipMethod());
        assertEquals("1114", result.getShipDate());
        assertEquals("shipped", result.getOrderStatus());        
        assertEquals("true",result.getIsFirstOrder());
        assertEquals("false",result.getIsMoreOrders());
        assertEquals("",result.getWorkQueue());
        assertEquals("",sessionData.getMailOrderQueue());
        assertEquals("9200196900747507013387",result.getTrackingNumber());
        assertEquals("USP",result.getCarrierName());
        assertNotNull(result.getReleaseDate());
}
    
    public void testGetOrderStatusMessage1() throws Exception {
        String rxNumber = "06365161";
        String returnNextOrder = "notset";
        String orderNumber = "10737917";
        assertEquals(0, sessionData.getOrderIndex());
        assertNull(sessionData.getOrderHistorySummaryList());
         assertNull(sessionData.getGetOrderHistorySummaryResponse(rxNumber));
         assertNull(sessionData.getGetPatientHistoryResponse(rxNumber));
         assertNull(sessionData.getGetOrderDetailResponses(orderNumber));
        result = instance.getOrderStatus(sessionData, rxNumber, returnNextOrder);
        assertNotNull(sessionData.getGetOrderHistorySummaryResponse(rxNumber));
        assertNotNull(sessionData.getGetPatientHistoryResponse(rxNumber));
        assertNotNull(sessionData.getGetOrderDetailResponses(orderNumber));
        //assertNotNull(sessionData.getOrderHistorySummaryList());
        //assertEquals(1,sessionData.getOrderHistorySummaryList().size());
        assertEquals(orderNumber,sessionData.getMailOrderNumber());
        assertEquals("1", result.getNumberOfOrders());
        assertEquals("MELANIE", result.getMemberFirstName());
        assertEquals("33486", result.getZipCode());
        assertEquals("2", result.getNumberOfPrescriptions());
        assertEquals("", result.getShipMethod());
        assertEquals("1114", result.getShipDate());
        assertEquals("INCCV", result.getOrderStatus());        
        assertEquals("true",result.getIsFirstOrder());
        assertEquals("false",result.getIsMoreOrders());
        assertEquals("CC14",result.getWorkQueue());
        assertEquals("CC14",sessionData.getMailOrderQueue());
        assertEquals("9200196900747507013387",result.getTrackingNumber());
        assertEquals("USP",result.getCarrierName());
        assertEquals(Boolean.TRUE,result.isHasActionableAlert());
        assertEquals(ActionableAlertType.CREDIT_CARD_EXPIRED,result.getActionableAlertType());
        assertNotNull(result.getReleaseDate());
}
        @Test
        public void testGetOrderStatusMessage2() throws Exception {
        String rxNumber = "06365161";
        String returnNextOrder = "notset";
        //String orderNumber = "10737917";
        GetOrderDetailResponseDocument.GetOrderDetailResponse getOrderDetailResponse;
        GetOrderHeaderResponseDocument.GetOrderHeaderResponse getOrderHeaderResponse;
        assertEquals(0, sessionData.getOrderIndex());
        assertNull(sessionData.getOrderHistorySummaryList());
         assertNull(sessionData.getGetOrderHistorySummaryResponse(rxNumber));
         assertNull(sessionData.getGetPatientHistoryResponse(rxNumber));
         for (int i = sessionData.getGetOrderHistorySummaryResponse(rxNumber).getSummaryArray().length - 1; i >= 0; i--)
                {
                    String orderNumber = sessionData.getGetOrderHistorySummaryResponse(rxNumber).getSummaryArray(i).getOrderNumber();
                    getOrderDetailResponse = GetOrderDetailService.GetGetOrderDetailResponse(orderNumber);
                    assertNull(sessionData.getGetOrderDetailResponses(orderNumber));
                }
         
         
        result = instance.getOrderStatus(sessionData, rxNumber, returnNextOrder);
        //assertNotNull(sessionData.getGetOrderHistorySummaryResponse(rxNumber));
        //assertNotNull(sessionData.getGetPatientHistoryResponse(rxNumber));
        //assertNotNull(sessionData.getGetOrderDetailResponses(orderNumber));
        assertNotNull(sessionData.getOrderStatusList());
        assertEquals(1,sessionData.getOrderStatusList().size());
        //assertEquals(orderNumber,sessionData.getMailOrderNumber());
        assertEquals("1", result.getNumberOfOrders());
        assertEquals("MELANIE", result.getMemberFirstName());
        assertEquals("33486", result.getZipCode());
        assertEquals("2", result.getNumberOfPrescriptions());
        assertEquals("", result.getShipMethod());
        assertEquals("1114", result.getShipDate());
        assertEquals("INAV", result.getOrderStatus());        
        assertEquals("true",result.getIsFirstOrder());
        assertEquals("false",result.getIsMoreOrders());
        assertEquals("AV14",result.getWorkQueue());
        assertEquals("AV14",sessionData.getMailOrderQueue());
        assertEquals("9200196900747507013387",result.getTrackingNumber());
        assertEquals("USP",result.getCarrierName());
        assertEquals(Boolean.TRUE,result.isHasActionableAlert());
        //assertEquals(ActionableAlertType.CREDIT_CARD_EXPIRED,result.getActionableAlertType());
        assertEquals(ActionableAlertType.ADDRESS_VERIFICATION,result.getActionableAlertType());
        assertNotNull(result.getReleaseDate());
}

    
}