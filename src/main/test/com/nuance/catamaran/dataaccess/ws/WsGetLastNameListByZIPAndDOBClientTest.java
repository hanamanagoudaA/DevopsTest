/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.objects.LastNameListByZIPAndDOB;
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
public class WsGetLastNameListByZIPAndDOBClientTest extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsGetLastNameListByZIPAndDOBClient instance = new WsGetLastNameListByZIPAndDOBClient();
    LastNameListByZIPAndDOB result = null;

    public WsGetLastNameListByZIPAndDOBClientTest() throws IOException{
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
     * Test of getLastNameListByZipAndDOB method, of class
     * WsGetLastNameListByZIPAndDOBClient.
     */
    @Test
    public void testGetLastNameListByZipAndDOB() throws Exception {
        String zipCode = "81240";
        String dateOfBirth = "1962-02-27";
        result = instance.getLastNameListByZipAndDOB(sessionData, zipCode, dateOfBirth);
        assertEquals("SMITH", result.getLastNameList().get(0));
        assertEquals("true", result.getCanIVRDisambiguate());
        assertEquals(1, result.getLastNameList().size());
    }

    @Test
    public void testActiveAndInactive() throws Exception {
        String zipCode = "30021";
        //String dateOfBirth = "1993-01-01-06:00";
        String dateOfBirth = "19930101";
        result = instance.getLastNameListByZipAndDOB(sessionData, zipCode, dateOfBirth);
        assertNotSame(-1, result.getLastNameList().indexOf("KARMANUE"));
        assertEquals("true", result.getCanIVRDisambiguate());
        assertEquals(63, result.getLastNameList().size());
        assertSame(-1, result.getLastNameList().indexOf("JAVA"));
    }

    @Test
    public void testNoZipMatch() throws Exception {
        String zipCode = "123456";
        String dateOfBirth = "19930101";
        result = instance.getLastNameListByZipAndDOB(sessionData, zipCode, dateOfBirth);
        assertNull(result);
    }

    @Test
    public void testInternal() throws Exception {
        String zipCode = "30021";
        //String dateOfBirth = "1993-01-01-06:00";
        String dateOfBirth = "19930101";
        result = instance.getLastNameListByZipAndDOB(sessionData, zipCode, dateOfBirth);
        assertNotSame(-1, result.getLastNameList().indexOf("MEH"));
        assertEquals("true", result.getCanIVRDisambiguate());
        assertEquals(63, result.getLastNameList().size());
        assertSame(-1, result.getLastNameList().indexOf("JAVA"));
    }

}
