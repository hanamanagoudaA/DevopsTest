/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

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
public class WsGetMemberRxByPatientNumberClientTest extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsGetMemberRxByPatientNumberClient instance = new WsGetMemberRxByPatientNumberClient();
    String result = null;

    public WsGetMemberRxByPatientNumberClientTest() throws IOException{
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
    public void testGetMemberRxByPatientNumber() throws Exception {
        String patientNumber = "820195901";
        String rxNumber = "06513053";
        assertNull(sessionData.getGetPatientHistoryResponse(rxNumber));
        result = instance.getMemberRxByPatientNumber(sessionData, patientNumber);
        assertEquals(rxNumber, result);
        assertEquals("820195901", sessionData.getRxExpressMemberID());
        assertEquals("19131723", sessionData.getMailOrderPatientID());
        assertEquals(rxNumber, sessionData.getRxNumber());
        assertNotNull(sessionData.getGetPatientHistoryResponse(rxNumber));

    }

    @Test
    public void testGetMemberRxByInvalidPatientNumber() throws Exception {
        String rxNumber = "06513053";
        assertNull(sessionData.getGetPatientHistoryResponse(rxNumber));
        String patientNumber = "";
        result = instance.getMemberRxByPatientNumber(sessionData2, patientNumber);
        assertEquals("", result);
    }

    @Test
    public void testGetMemberInvalidRxNumByPatientNumber() throws Exception {
        String patientNumber = "820195902";
        String rxNumber = "";

        result = instance.getMemberRxByPatientNumber(sessionData2, patientNumber);
        assertEquals("Invalid Rx Number Issued", sessionData2.getGetPatientHistoryResponse(rxNumber).getReturnStatus().getReturnMessage());
        assertNotNull(sessionData2.getGetPatientHistoryResponse(rxNumber));
        assertNull(sessionData2.getRxNumber());
        assertNull(sessionData2.getRxExpressMemberID());
        assertNull(sessionData2.getMailOrderPatientID());
    }

}
