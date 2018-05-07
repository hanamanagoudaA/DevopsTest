/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.sxc.webservice.rxexpressssl.member.ChangeMemberAddressResponseDocument;
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
public class ChangeMemberAddressServiceTest {
    
    public ChangeMemberAddressServiceTest() {
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
     * Test of GetChangeMemberAddressResponse method, of class ChangeMemberAddressService.
     */
    @Test
    public void testGetChangeMemberAddressResponse() throws Exception {
        System.out.println("GetChangeMemberAddressResponse");
        String ani = "2563541266";
        String patientNumber = "95117365";
         DataAccessConfiguration.getInstance().setRxExpressURL("http://tibutpolagents.healthextras.local:8981/eProxy/service/RxExpressV1.0.0");
        ChangeMemberAddressResponseDocument.ChangeMemberAddressResponse expResult = null;
        ChangeMemberAddressResponseDocument.ChangeMemberAddressResponse result = ChangeMemberAddressService.GetChangeMemberAddressResponse(ani, patientNumber);
        System.out.println("Result  "+result);
        System.out.println("Result Status "+result.getReturnStatus());
        assertEquals("000", result.getReturnStatus().getReturnCd());
        // TODO review the generated test code and remove the default call to fail.
    }
    
}
