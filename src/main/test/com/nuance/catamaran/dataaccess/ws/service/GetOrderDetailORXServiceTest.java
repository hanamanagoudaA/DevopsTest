/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.unitedhealthgroup.optumrx.ao.getorderdetails.v1_10.GetOrderDetailResponseDocument.GetOrderDetailResponse;
import org.junit.*;

/**
 *
 * @author ivrdev2
 */
public class GetOrderDetailORXServiceTest
{

    public GetOrderDetailORXServiceTest()
    {
    }

    @BeforeClass
    public static void setUpClass()
    {

    }

    @AfterClass
    public static void tearDownClass()
    {
    }

    @Before
    public void setUp()
    {
    }

    @After
    public void tearDown()
    {
    }

    /**
     * Test of GetOrderDetailORXServiceTestResponse method, of class GetOrderDetailORXServiceTest.
     */
    @Test
    public void testGetOrderDetailORXServiceTestResponse() throws Exception
    {
        System.out.println("testGetOrderDetailORXServiceTestResponse");

        String rxNumber = "133863673";
        String patientID = "8467484";
        String ucid = "1234";
        String irisDomain = "rxsts04soa.uhc.com";

        DataAccessConfiguration.getInstance().setOrderStatusSearchWindow(450);
        
        DataAccessConfiguration.getInstance().setIrisGetOrderDetailsURL("https://rxsts04soa.uhc.com:443/OSB/getOrderDetails/v1_10");
        DataAccessConfiguration.getInstance().setBackendIRISUsername("ws_ts4_webivr");
        DataAccessConfiguration.getInstance().setBackendIRISPassword("ph1l1pp1s1sts4");

        GetOrderDetailResponse result = GetOrderDetailsORXService.getOrderDetailResponse(ucid, irisDomain,rxNumber, patientID);

        System.out.println("Result  " + result);
        System.out.println("Result Status " + result.getOrders().getOrderArray().length);
        //assertEquals("000", result.getReturnStatus().getReturnCd());
        // TODO review the generated test code and remove the default call to fail.
    }

}
