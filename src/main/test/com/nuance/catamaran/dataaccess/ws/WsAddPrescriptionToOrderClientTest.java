/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.objects.AddPrescriptionToOrderResponse;
import com.nuance.catamaran.dataaccess.objects.MemberDetailsList;
import com.nuance.catamaran.dataaccess.objects.PrescriptionInfo;
import static com.nuance.catamaran.dataaccess.ws.AbstractWsBaseClientTest.sessionData;
import com.nuance.catamaran.dataaccess.ws.service.GetMemberService;
import com.nuance.catamaran.utilities.WebServiceResponseUtilities;
import com.sxc.webservice.rxexpressssl.member.GetMemberResponseDocument;
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
public class WsAddPrescriptionToOrderClientTest extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsAddPrescriptionToOrderClient instance = new WsAddPrescriptionToOrderClient();
    AddPrescriptionToOrderResponse result = null;

    public WsAddPrescriptionToOrderClientTest() throws IOException{
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
     * Test of addPrescriptionToOrder method, of class
     * WsAddPrescriptionToOrderClient.
     */
    @Test
    public void testSessionDataWithoutRxNumber() {
        String rxNumber = "06513053";
        AddPrescriptionToOrderResponse expResult = null;
        exception.expect(NullPointerException.class);
        result = instance.addPrescriptionToOrder(sessionData, rxNumber);

    }

    @Test
    public void testSessionDataWithRxNumber() throws Exception {
        String rxNumber = "05900443";
        sessionData.setDateOfBirth("19461228");

        GetMemberResponseDocument.GetMemberResponse getMemberResponse = GetMemberService.GetGetMemberResponse(sessionData.getRxCode(), rxNumber, sessionData.getDateOfBirth());
        sessionData.addGetMemberResponse(rxNumber + sessionData.getDateOfBirth(), getMemberResponse);
        if (getMemberResponse.getReturnStatus().getReturnCd().equals("000")) {
            MemberDetailsList memberDetailsList = new MemberDetailsList();
            memberDetailsList.setReturnCode(getMemberResponse.getReturnStatus().getReturnCd());
            memberDetailsList.setMemberDetails(WebServiceResponseUtilities.createMemberList(getMemberResponse));
            sessionData.setMemberInformation(memberDetailsList.getMemberDetails());
        }

        WsGetPrescriptionInfoClient wsGetPrescriptionInfoClient = new WsGetPrescriptionInfoClient();

        PrescriptionInfo prescriptionInfo = wsGetPrescriptionInfoClient.getPrescriptionInfo(sessionData, rxNumber);

//        assertEquals("8034088828", sessionData.getRefillAddress().getPhone1());
        assertEquals("11", prescriptionInfo.getStreetNumber());
        assertEquals("0", prescriptionInfo.getFloorLimit());
        assertEquals("false", prescriptionInfo.getCanRxBeRefilled());
        assertEquals("Expired", prescriptionInfo.getCannotRefillReason());
        //assertEquals(sessionData.getCurrentDrugTTS(),"pravastatin  tab 40mg");
        WsAddPrescriptionToOrderClient instance = new WsAddPrescriptionToOrderClient();
        //WsAddPrescriptionToOrderClient client = new WsAddPrescriptionToOrderClient();
        //client.addPrescriptionToOrder(sessionData, "95167228");
        AddPrescriptionToOrderResponse result = instance.addPrescriptionToOrder(sessionData, rxNumber);
        assertNotNull(sessionData.getRxInfoArrayList().get(sessionData.getRefillIndex()));
        assertEquals(1, sessionData.sizeOfRxToRefill());
        assertEquals("true", result.getIsFirstPrescription());
        assertEquals("false", result.getIsIncludeColdPack());
    }

}
