/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.MemberDetailsList;
import com.nuance.catamaran.dataaccess.objects.NextRefill;
import static com.nuance.catamaran.dataaccess.ws.AbstractWsBaseClientTest.sessionData;
import com.nuance.catamaran.dataaccess.ws.service.GetMemberService;
import com.nuance.catamaran.dataaccess.ws.service.GetPatientHistoryService;
import com.nuance.catamaran.utilities.WebServiceResponseUtilities;
import com.sxc.webservice.rxexpressssl.member.GetMemberResponseDocument;
import com.sxc.webservice.rxexpressssl.member.GetPatientHistoryResponseDocument;
import com.sxc.webservice.rxexpressssl.member.HistoryRxInfo;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author
 */
public class WsGetNextRefillClientITest extends AbstractWsBaseClientTest {

    WsGetNextRefillClient instance = new WsGetNextRefillClient();
    NextRefill result = null;

    public WsGetNextRefillClientITest() throws IOException{
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
     * Test of getNextRefill method, of class WsGetNextRefillClient.
     */
    @Test
    public void testGetNextRefill() throws Exception {
        String rxNumber = "06332796";
        sessionData.setDateOfBirth("19681004");
        List<HistoryRxInfo> rxInfoArrayList = new ArrayList<HistoryRxInfo>();
        GetMemberResponseDocument.GetMemberResponse getMemberResponse2 = GetMemberService.GetGetMemberResponse(sessionData.getRxCode(), rxNumber, sessionData.getDateOfBirth());
        if (getMemberResponse2.getReturnStatus().getReturnCd().equals("000")) {
            MemberDetailsList memberDetailsList = new MemberDetailsList();
            memberDetailsList.setReturnCode(getMemberResponse2.getReturnStatus().getReturnCd());
            memberDetailsList.setMemberDetails(WebServiceResponseUtilities.createMemberList(getMemberResponse2));
            sessionData.setMemberInformation(memberDetailsList.getMemberDetails());
            List<String> list2 = new ArrayList<>();
            list2.add(rxNumber);
            sessionData.addRxToRefill(rxNumber);
        }

        GetPatientHistoryResponseDocument.GetPatientHistoryResponse getPatientHistoryResponse = sessionData.getGetPatientHistoryResponse(rxNumber);
        if (getPatientHistoryResponse == null) {
            getPatientHistoryResponse = GetPatientHistoryService.GetGetPatientHistoryResponse(sessionData.getRxCode(), rxNumber);
            sessionData.addGetPatientHistoryResponse(rxNumber, getPatientHistoryResponse);
        }
        if (getPatientHistoryResponse.getRxInfoArray().length > 0) {
            for (HistoryRxInfo rxInfo : getPatientHistoryResponse.getRxInfoArray()) {
                rxInfoArrayList.add(rxInfo);
            }
        }
        
        sessionData.setRxInfoArrayList(rxInfoArrayList);
        NextRefill expResult = new NextRefill();
        expResult.setAdditionalRefillDrugPrompt(null);
        expResult.setAdditionalRefillDrugTTS("one");
        expResult.setIsAdditionalRefill("true");
        expResult.setNumberOfAdditionalRefillsAvailable(6);
        expResult.setNumberOfRefillsOnOrder(6);
        expResult.setAdditionalRefillDrugTTS("fenofibrate cap 67 mgs ");
        result = instance.getNextRefill(sessionData, rxNumber);
        assertEquals(1,sessionData.getRefillIndex());
        assertEquals("06395530",sessionData.getCurrentRxNumber());
        assertEquals("20141124",sessionData.getCurrentLastRefillDate());
        assertEquals(expResult.getAdditionalRefillDrugPrompt(), result.getAdditionalRefillDrugPrompt());
        assertEquals(expResult.getAdditionalRefillDrugTTS(), result.getAdditionalRefillDrugTTS());
        assertEquals(expResult.getIsAdditionalRefill(), result.getIsAdditionalRefill());
        assertEquals(expResult.getNumberOfAdditionalRefillsAvailable(), result.getNumberOfAdditionalRefillsAvailable());
        assertEquals(expResult.getNumberOfRefillsOnOrder(), result.getNumberOfRefillsOnOrder());
        assertEquals(1, sessionData.getRefillIndex());
    }
    
    
    @Test
    public void testGetNextRefillFalse() throws Exception {
        String rxNumber = "06332797";
        sessionData.setDateOfBirth("19681004");
        List<HistoryRxInfo> rxInfoArrayList = new ArrayList<HistoryRxInfo>();
        GetMemberResponseDocument.GetMemberResponse getMemberResponse2 = GetMemberService.GetGetMemberResponse(sessionData.getRxCode(), rxNumber, sessionData.getDateOfBirth());
        if (getMemberResponse2.getReturnStatus().getReturnCd().equals("000")) {
            MemberDetailsList memberDetailsList = new MemberDetailsList();
            memberDetailsList.setReturnCode(getMemberResponse2.getReturnStatus().getReturnCd());
            memberDetailsList.setMemberDetails(WebServiceResponseUtilities.createMemberList(getMemberResponse2));
            sessionData.setMemberInformation(memberDetailsList.getMemberDetails());
            List<String> list2 = new ArrayList<>();
            list2.add(rxNumber);
            sessionData.addRxToRefill(rxNumber);
        }

        GetPatientHistoryResponseDocument.GetPatientHistoryResponse getPatientHistoryResponse = sessionData.getGetPatientHistoryResponse(rxNumber);
        if (getPatientHistoryResponse == null) {
            getPatientHistoryResponse = GetPatientHistoryService.GetGetPatientHistoryResponse(sessionData.getRxCode(), rxNumber);
            sessionData.addGetPatientHistoryResponse(rxNumber, getPatientHistoryResponse);
        }
        if (getPatientHistoryResponse.getRxInfoArray().length > 0) {
            for (HistoryRxInfo rxInfo : getPatientHistoryResponse.getRxInfoArray()) {
                rxInfoArrayList.add(rxInfo);
            }
        }
        
        sessionData.setRxInfoArrayList(rxInfoArrayList);        
        result = instance.getNextRefill(sessionData, rxNumber);
        assertEquals(0,sessionData.getRefillIndex());
        assertNull(sessionData.getCurrentRxNumber());
        assertNull(sessionData.getCurrentLastRefillDate());
        assertNull(result.getAdditionalRefillDrugPrompt());
        assertNull( result.getAdditionalRefillDrugTTS());
        assertEquals("false", result.getIsAdditionalRefill());
        assertEquals(-1, result.getNumberOfAdditionalRefillsAvailable());
        assertEquals(-1, result.getNumberOfRefillsOnOrder());
        assertEquals(0, sessionData.getRefillIndex());
    }

}
