/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.catalystrx.integration.wsdl.member._20120405.FindMemberResponseDocument;
import com.nuance.catamaran.config.DataAccessConfiguration;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author ivrdev1
 */
public class FindMemberServiceTest {
    
    public FindMemberServiceTest() {
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
    }

    /**
     * Test of GetFindMemberResponseMemberID method, of class FindMemberService.
     */
    @Test
    public void testGetFindMemberResponseMemberID_5args() throws Exception {
        System.out.println("GetFindMemberResponseMemberID");
        String esbInstance = "A6-CGC";
        String esbProvider = "SXC";
        String ucid = "unit_test";
        String dateOfBirth = "19480703";
        String memberNumber = "U6627334801";
        DataAccessConfiguration.getInstance().setMemberServiceURL("http://tibutpolagents.healthextras.local:8981/eProxy/service/CRX_Int_MemberServiceV3.0.0");
        //FindMemberResponseDocument.FindMemberResponse expResult = null;
        FindMemberResponseDocument.FindMemberResponse result = FindMemberService.GetFindMemberResponseMemberID(esbInstance, esbProvider, ucid, dateOfBirth, memberNumber);
        System.out.println(result.getMemberSearchItemArray(0).getFirstName());
        assertEquals("RUTH", result.getMemberSearchItemArray(0).getFirstName());
        // TODO review the generated test code and remove the default call to fail.
    }
    
    /**
     * Test of GetFindMemberResponseMemberID method, of class FindMemberService.
     */
    @Test
    public void testDuplicateGetFindMemberResponseMemberID_5args() throws Exception {
        System.out.println("GetFindMemberResponseMemberID");
        String esbInstance = "A6-CGC";
        String esbProvider = "SXC";
        String ucid = "unit_test";
        String dateOfBirth = "19480703";
        String memberNumber = "U6627334801";
        DataAccessConfiguration.getInstance().setMemberServiceURL("http://tibutpolagents.healthextras.local:8981/eProxy/service/CRX_Int_MemberServiceV3.0.0");
        //FindMemberResponseDocument.FindMemberResponse expResult = null;
        FindMemberResponseDocument.FindMemberResponse result = FindMemberService.GetFindMemberResponseMemberID(esbInstance, esbProvider, ucid, dateOfBirth, memberNumber);
        assertEquals("RUTH", result.getMemberSearchItemArray(0).getFirstName());
        // TODO review the generated test code and remove the default call to fail.
    }

//    /**
//     * Test of GetFindMemberResponseZipDOB method, of class FindMemberService.
//     */
//    @Test
//    public void testGetFindMemberResponseZipDOB() throws Exception {
//        System.out.println("GetFindMemberResponseZipDOB");
//        String esbInstance = "";
//        String esbProvider = "";
//        String ucid = "";
//        String zipCode = "";
//        String dateOfBirth = "";
//        FindMemberResponseDocument.FindMemberResponse expResult = null;
//        FindMemberResponseDocument.FindMemberResponse result = FindMemberService.GetFindMemberResponseZipDOB(esbInstance, esbProvider, ucid, zipCode, dateOfBirth);
//        assertEquals(expResult, result);
//        // TODO review the generated test code and remove the default call to fail.
//        fail("The test case is a prototype.");
//    }
//
//    /**
//     * Test of GetFindMemberResponseMemberID method, of class FindMemberService.
//     */
//    @Test
//    public void testGetFindMemberResponseMemberID_4args() throws Exception {
//        System.out.println("GetFindMemberResponseMemberID");
//        String esbInstance = "";
//        String esbProvider = "";
//        String ucid = "";
//        String memberNumber = "";
//        FindMemberResponseDocument.FindMemberResponse expResult = null;
//        FindMemberResponseDocument.FindMemberResponse result = FindMemberService.GetFindMemberResponseMemberID(esbInstance, esbProvider, ucid, memberNumber);
//        assertEquals(expResult, result);
//        // TODO review the generated test code and remove the default call to fail.
//        fail("The test case is a prototype.");
//    }
    
}
