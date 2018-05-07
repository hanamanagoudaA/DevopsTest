/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws.service;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.sxc.webservice.member.UserMemberPortalV2RequestDocument;
import com.sxc.webservice.member.UserMemberPortalV2RequestDocument.UserMemberPortalV2Request;
import java.util.Map;
import org.junit.Test;

/**
 *
 * @author Cjohns
 */
public class WebServicesIT
{

    protected UserMemberPortalV2RequestDocument requestDocument;
    protected UserMemberPortalV2Request request;
    protected String axis2RepositoryLocation = "";
    protected String axis2ConfigurationLocation = "";
    protected Map<?, ?> configuration;
    protected String cardHolderId = "";
    protected String groupId = "";
    protected String rxcDomain = "";
    protected String irisDomain = "";
    protected String pasDomain = "";

    public WebServicesIT()
    {
        requestDocument = UserMemberPortalV2RequestDocument.Factory.newInstance();
        request = requestDocument.addNewUserMemberPortalV2Request();
        axis2RepositoryLocation = "D:/rampart";
        axis2ConfigurationLocation = "D:/rampart/axis2-A6-CGC.xml";
        cardHolderId = "U0137919101";
        groupId = "NNET";
        rxcDomain = "cigcomm6.webservice.catamaranrx.com";
        rxcDomain = "cigcomm6.webservice.catamaranrx.com";
        rxcDomain = "cigcomm6.webservice.catamaranrx.com";
        DataAccessConfiguration.getInstance().setMemberServiceURL("http://tibpolagents.healthextras.local:8981/eProxy/service/CRX_Int_MemberServiceV3.0.0");
        DataAccessConfiguration.getInstance().setClaimServiceURL("http://tibpolagents.healthextras.local:8981/eProxy/service/CRX_Int_ClaimServiceV2.0.0");
        DataAccessConfiguration.getInstance().setRxExpressURL("http://tibpolagents.healthextras.local:8981/eProxy/service/RxExpressV1.0.0");
        DataAccessConfiguration.getInstance().setPharmarcyServiceURL("http://tibpolagents.healthextras.local:8981/eProxy/service/CRX_Int_PharmacyServiceV2.0.0-1");
        DataAccessConfiguration.getInstance().setPrescriberServiceURL("http://tibpolagents.healthextras.local:8981/eProxy/service/CRX_Int_PrescriberServiceV2.0.0");
        DataAccessConfiguration.getInstance().setUserMemberPortalURL("https://[RXC_DOMAIN]:443/WebService/services/UserMemberPortalV2");
        DataAccessConfiguration.getInstance().setRxAuthSearchURL("https://[RXC_DOMAIN]:443/WebService/services/RxAuthSearch");
        DataAccessConfiguration.getInstance().setClaimSearchURL("https://[RXC_DOMAIN]:443/WebService/services/ClaimSearchV3");
        DataAccessConfiguration.getInstance().setContactHistoryURL("http://10.100.201.59:9780/GTConnect/StatelessSoapAcceptor/?gtxInitialProcess=CATContactHistory.Implementation.WebService.ExternalContactHistoryWebServiceV4");
        DataAccessConfiguration.getInstance().setIrisGetRxDetailsURL("https://[IRIS_DOMAIN]:443/OSB/getRxDetails/v1_10");
        DataAccessConfiguration.getInstance().setIrisGetOrderDetailsURL("https://[IRIS_DOMAIN]:443/OSB/getOrderDetails/v1_10");
        DataAccessConfiguration.getInstance().setIrisGetPatientURL("https://[IRIS_DOMAIN]:443/GetPatientOSB/proxy/v1_00");
        DataAccessConfiguration.getInstance().setIrisGetPatientPrescriptionListURL("https://[IRIS_DOMAIN]:443/GetPatientPrescriptionListOSB/proxy_service/GetPatientPrescriptionListProxy");
        DataAccessConfiguration.getInstance().setIrisGetPaymentMethodsURL("https://[IRIS_DOMAIN]:443/OSB/getPaymentMethods/v1_00");
        DataAccessConfiguration.getInstance().setIrisGetPatientBalanceStatementURL("https://[IRIS_DOMAIN]:443/OSB/getPatientBalanceStatement/v1_00");
        DataAccessConfiguration.getInstance().setIrisGetDrugDetailsURL("https://[IRIS_DOMAIN]:443/OSB/getDrugDetails/v2_00");
        DataAccessConfiguration.getInstance().setIrisMakePaymentURL("https://[IRIS_DOMAIN]:443/OSB/makePayment/v1_00");
        DataAccessConfiguration.getInstance().setIrisGetPaymentHistoryURL("https://[IRIS_DOMAIN]:443/OSB/getPaymentHistory/v1_00");
        DataAccessConfiguration.getInstance().setIrisCreateOrderRequestURL("https://[IRIS_DOMAIN]:443/OSB/createOrderRequest/v2_00");
        DataAccessConfiguration.getInstance().setPasRetrievePAStatusURL("https://[PAS_DOMAIN]:443/prweb/PRSOAPServlet/SOAP/IVR/Services");
        DataAccessConfiguration.getInstance().setAxis2Path("D:/rampart");
        DataAccessConfiguration.getInstance().setCtiServerID("CIDS");
        DataAccessConfiguration.getInstance().setCtiServerIP("10.100.204.50");
        DataAccessConfiguration.getInstance().setCtiServerPort("1521");
        DataAccessConfiguration.getInstance().setCtiUsername("ivr");
        DataAccessConfiguration.getInstance().setCtiPassword("temp4now");
        DataAccessConfiguration.getInstance().setCarrierFilter("PHI|PEGWPS");
        DataAccessConfiguration.getInstance().setBackendUsername("IVR01User");
        DataAccessConfiguration.getInstance().setBackendPassword("CatrxIVR01");
        DataAccessConfiguration.getInstance().setClaimsSearchWindow(Integer.parseInt("7"));
        DataAccessConfiguration.getInstance().setRxAuthSearchWindow(Integer.parseInt("30"));
        DataAccessConfiguration.getInstance().setRefillSearchWindow(Integer.parseInt("365"));
        DataAccessConfiguration.getInstance().setRefillTooSoonWindow(Integer.parseInt("9"));
        DataAccessConfiguration.getInstance().setOrderStatusSearchWindow(Integer.parseInt("30"));
        DataAccessConfiguration.getInstance().setKeystorePass("ivrivr");
    }

    @Test
    public void testFindMemberResponse() throws Exception
    {
        System.out.println("findMember");
    }

//    @Test
//    public void testGetUserMemberPortalV2Response() throws Exception
//    {
//
//        System.out.println("getUserMemberPortalV2");
//
//        request.setGroupId(groupId);
//        request.setCardholderId(cardHolderId);
//        String url = DataAccessConfiguration.getInstance().getUserMemberPortalURL();
//        URL endpoint = new URL(url);;
//        if (url.contains("[RXC_DOMAIN]"))
//        {
//            url = url.replace("[RXC_DOMAIN]", rxcDomain);
//        }
//        endpoint = new URL(url);
//        ConfigurationContext ctx = ConfigurationContextFactory.createConfigurationContextFromFileSystem(axis2RepositoryLocation, axis2ConfigurationLocation);
//        UserMemberPortalV2Stub stub = new UserMemberPortalV2Stub(ctx, endpoint.toExternalForm());
//        UserMemberPortalV2ResponseDocument responseDocument = stub.getUserMemberPortalV2(requestDocument);
//        UserMemberPortalV2Response result = responseDocument.getUserMemberPortalV2Response();
//        assertNotNull(groupId, result);
//    }
//
//    public void testIrisGetRxDetailsURL() throws Exception
//    {
//        System.out.println("IRIS.GetRxDetailsURL");
//        request.String url = DataAccessConfiguration.getInstance().getIrisGetRxDetailsURL();
//        URL endpoint;
//        if (url.contains("[IRIS_DOMAIN]"))
//        {
//            url = url.replace("[IRIS_DOMAIN]", irisDomain);
//        }
//        assertTrue(false);
//    }
//
//    public void testIrisGetOrderDetailsURL() throws Exception
//    {
//        assertTrue(false);
//    }
//
//    public void testIrisGetPatientURL() throws Exception
//    {
//        assertTrue(false);
//    }
//
//    public void testIrisGetPatientPrescriptionListURL() throws Exception
//    {
//        assertTrue(false);
//    }
//
//    public void testIrisGetPaymentMethodsURL() throws Exception
//    {
//        assertTrue(false);
//    }
//
//    public void testIrisGetPatientBalanceStatementURL() throws Exception
//    {
//        assertTrue(false);
//    }
//
//    public void testIrisGetDrugDetailsURL() throws Exception
//    {
//        assertTrue(false);
//    }
//
//    public void testIrisMakePaymentURL() throws Exception
//    {
//        assertTrue(false);
//    }
//
//    public void testIrisGetPaymentHistoryURL() throws Exception
//    {
//        assertTrue(false);
//    }
//
//    public void testIrisCreateOrderRequestURL() throws Exception
//    {
//        assertTrue(false);
//    }
//
//    public void testIrisPasRetrievePAStatusURL() throws Exception
//    {
//        assertTrue(false);
//    }

}
