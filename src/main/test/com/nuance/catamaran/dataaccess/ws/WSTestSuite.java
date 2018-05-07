/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

/**
 *
 * @author 
 */
@RunWith(Suite.class)
@SuiteClasses(value={WsGetProviderByNPIClientTest.class, WsGetMemberDetailsListByIDClientITest.class, WsGetOrderStatusClientTest.class, 
    WsSubmitOrderClientTest.class, WsGetMemberIDListByZIPAndDOBClientTest.class, WsGetMemberDetailsByRxNumberClientTest.class, 
    WsGetLastNameListByZIPAndDOBClientTest.class, WsGetMemberListByANIClientTest.class, WsUpdateContactHistoryClientTest.class, 
    WsGetPriorAuthStatusClientTest.class, WsGetMemberIDByNameClientTest.class, WsGetMemberDetailsbyNPIClientITest.class, 
    WsGetNextRefillClientITest.class, WsGetMemberProcessingInfoClientTest.class, WsGetNewOrderSummaryClientTest.class, 
    WsChangeMemberAddressByIDClientTest.class, WsGetRejectedClaimClientTest.class, WsGetMemberRxByPatientNumberClientTest.class, 
    WsAddPrescriptionToOrderClientTest.class, WsGetPrescriptionInfoClientTest.class, WsGetMemberDetailsByLastNameAndDOBClientTest.class, 
    WsGetMemberDetailsListByANIClientTest.class, WsUpdateAddressInfoOnOrderClientTest.class, WsUpdateAccountOnOrderClientTest.class})

public class WSTestSuite {

    @BeforeClass
    public static void setUpClass() throws Exception {
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }
    
}
