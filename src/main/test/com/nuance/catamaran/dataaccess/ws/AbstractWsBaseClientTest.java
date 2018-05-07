/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.data.TFNProfile;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import org.junit.AfterClass;
import org.junit.BeforeClass;

/**
 *
 * @author ivrdev1
 */
public abstract class AbstractWsBaseClientTest {

    protected static SessionData sessionData = null;
    protected static SessionData invalidSessionData = null;
    private static TFNProfile tfnProfile = null;
    private static DataAccessConfiguration daConfiguration = null;
    protected static SessionData sessionData2 = null;
    private static String env = "PROD";  // MOCK or  UAT  or  PROD 

    private static void changeEnvironment() {

        String SOAPUI_MOCK_SERVICE_URL = "http://localhost:8099/claim";
        String SOAPUI_MOCK_MEMBER_SERVICE_URL = "http://localhost:8093/Index";

        String CLAIM_URL_UAT = "http://tibcopdqa.catamaranrx.com:8981/proxy/Services/CRX_Int_ClaimServiceV4.2";
        String PRESCRIBER_URL_UAT = "http://tibcopdqa.catamaranrx.com:8981/proxy/integration.catalyst.com/ws/CRX_Int_PrescriberServiceV2.0";
        String PHARMACY_URL_UAT = "http://tibcopdqa.catamaranrx.com:8981/proxy/integration.catalyst.com/ws/CRX_Int_PharmacyServiceV1.2.0";
        String RXEXPRESS_URL_UAT = "http://tibcopdqa.catamaranrx.com:8981/eProxy/service/RxExpressV1.0.0";
        String MEMBER_URL_UAT = "http://tibcopdqa.catamaranrx.com:8981/proxy/ws/MemberServiceV3.0.0";
        String USERMEMBERPORTAL_URL_UAT = "";
        String RXAUTHSEARCH_URL_UAT = "";
        String CONTACTHISTORY_URL_UAT = "";
        String CLAIMSEARCH_URL_UAT = "";

        String CLAIM_URL_PROD = "http://tibcopd.catamaranrx.com:8981/service/ClaimV4";
        String PRESCRIBER_URL_PROD = "http://tibcopd.catamaranrx.com:8981/service/PrescriberV2";
        String PHARMACY_URL_PROD = "http://tibcopd.catamaranrx.com:8981/service/PharmacyInvoiceV2";
        String RXEXPRESS_URL_PROD = "http://tibcopd.catamaranrx.com:8981/service/RxExpressV1";
//        String MEMBER_URL_PROD = "http://tibcopdsit-mpls.catamaranrx.com:8981/service/MemberV5";
        String MEMBER_URL_PROD ="http://tibcopdsit.catamaranrx.com:8981/service/MemberV5";
        String USERMEMBERPORTAL_URL_PROD = "";
        String CONTACTHISTORY_URL_PROD = "";
        String CLAIMSEARCH_URL_PROD = "";
        String RXAUTHSEARCH_URL_PROD ="https://ksr.webservice.catamaranrx.com:443/WebService/services/RxAuthSearch";
        //String RXAUTHSEARCH_URL_PROD ="https://informedrx6.webservice.sxc.com:443/WebService/services/RxAuthSearch";
        //String UserMemberPortalURL="https://asp.webservice.sxc.com:443/WebService/services/ClaimSearchV3";
        String GETPATIENTSERVICE = "https://[IRIS_DOMAIN]:443/GetPatientOSB/proxy/v1_00";
        String GETPAYMENTMETHOD = "https://[IRIS_DOMAIN]:443/OSB/getPaymentMethods/v1_00";
        String GETPATIENTPRESCRIPTION = "https://[IRIS_DOMAIN]:443/GetPatientPrescriptionListOSB/proxy_service/GetPatientPrescriptionListProxy";
        String GETPATIENTBALANCE ="https://[IRIS_DOMAIN]:443/OSB/getPatientBalanceDue/v1_00";
        String LOCATE_MEMBER = "http://tibcopdsit.catamaranrx.com:8987/service/MailOrderServiceV1_ORCA";
        String MAKE_PAYMENT = "https://[IRIS_DOMAIN]:443/OSB/makePayment/v1_00";
        String MEMBER_PROCESSING_INFO_URL = "https://aesystestproxy-vm.uhc.com:22443/upm3/optumrxbenefit/ReadRxProcessingInformationV2";

        if (env.equals("MOCK")) {
            daConfiguration.setClaimServiceURL(SOAPUI_MOCK_SERVICE_URL);
            daConfiguration.setMemberServiceURL(SOAPUI_MOCK_MEMBER_SERVICE_URL);
            daConfiguration.setPrescriberServiceURL(SOAPUI_MOCK_SERVICE_URL);
            daConfiguration.setAxis2Path("D:/rampart-test");
            daConfiguration.setKeystorePass("ivrqaivrqa");
            daConfiguration.setIrisMakePaymentURL(MAKE_PAYMENT);
        } else if (env.equals("UAT")) {
            daConfiguration.setClaimServiceURL(CLAIM_URL_UAT);
            daConfiguration.setMemberServiceURL(MEMBER_URL_UAT);
            daConfiguration.setAxis2Path("D:/rampart");
            daConfiguration.setKeystorePass("ivrqaivrqa");
            daConfiguration.setIrisMakePaymentURL(MAKE_PAYMENT);
        } else if (env.equals("PROD")) {
            daConfiguration.setClaimServiceURL(CLAIM_URL_PROD);
            daConfiguration.setMemberServiceURL(MEMBER_URL_PROD);
            daConfiguration.setPrescriberServiceURL(PRESCRIBER_URL_PROD);
            daConfiguration.setIrisGetPatientURL(GETPATIENTSERVICE);
            daConfiguration.setIrisGetPaymentMethodsURL(GETPAYMENTMETHOD);
            daConfiguration.setIrisGetPatientPrescriptionListURL(GETPATIENTPRESCRIPTION);
            daConfiguration.setIrisGetPatientBalanceDueURL(GETPATIENTBALANCE);
            //daConfiguration.setLocateMemberURL(LOCATE_MEMBER);
            daConfiguration.setIrisMakePaymentURL(MAKE_PAYMENT);
            daConfiguration.setMemberProcessingInformationURL(MEMBER_PROCESSING_INFO_URL);
        }

        //daCinfiguration.setBackendUsername("IVR01User");
        //daCinfiguration.setBackendPassword("IVR01pwd");
        daConfiguration.setBackendIRISUsername("ws_ts4_webivr");
        daConfiguration.setBackendIRISPassword("ph1l1pp1s1sts4");
//        daConfiguration.setBPGUsername("nav_uat");
//        daConfiguration.setBPGPassword("LnJeDtb6");
        daConfiguration.setRxCcrSystemAppId("rxhd");
        daConfiguration.setRxCcrSystemPassword("cnhoYFMjcg==");
    }

    public AbstractWsBaseClientTest() throws IOException {

        setUpClass();
        daConfiguration = DataAccessConfiguration.getInstance();
    }

    @BeforeClass
    public static void setUpClass() throws FileNotFoundException, IOException {
        daConfiguration = DataAccessConfiguration.getInstance();
        changeEnvironment();
        ArrayList<String> esbInstaceList = new ArrayList<String>();
        esbInstaceList.add("A6-IRX");
        //esbInstaceList.add("A6-IRX");
        ArrayList<String> esbProvideList = new ArrayList<String>();
        //esbProvideList.add("SXC");
        esbProvideList.add("SXC");
        sessionData = new SessionData();
        sessionData.setUcid("TEST");
        sessionData.setConsumerAppId("CAT_ESB");
        HashMap carrierMap = new HashMap<String, String>();
        carrierMap.put("Carrier", "WCKYMCD");
        //sessionData.setCarrierFilter("abc");
        //sessionData.setCarrierIDs(carrierMap);

       
        ArrayList<String> esbInstaceList2 = new ArrayList<String>();
        //esbInstaceList.add(null);
        esbInstaceList.add("");
       
        ArrayList<String> esbProvideList2 = new ArrayList<String>();
        //esbProvideList.add(null);
        esbProvideList.add("");

        sessionData2 = new SessionData();
        sessionData2.setUcid("TEST");
        sessionData2.setConsumerAppId("CAT_ESB");
        ArrayList<String> esbInvalidInstaceList = new ArrayList<String>();
        esbInstaceList.add(new String(""));
        ArrayList<String> esbInvalidProvideList = new ArrayList<String>();
        esbProvideList.add(new String(""));

        invalidSessionData = new SessionData();
        invalidSessionData.setUcid("");
        invalidSessionData.setConsumerAppId("");

        DataAccessConfiguration.getInstance().setCarrierFilter("CarrierFilter");
        DataAccessConfiguration.getInstance().setAxis2Path("D:/rampart");
    DataAccessConfiguration.getInstance().setKeystorePass("ivrivr");
    tfnProfile = new TFNProfile();
    tfnProfile.setESB_Instance("A6-IRX");
    tfnProfile.setESB_Provider("SXC");
    sessionData.setTFNProfile(tfnProfile);
    sessionData.setUcid("1");
    }

    @AfterClass
    public static void tearDownClass() {

        //sessionData = null;
        //dnis = null;
        //invalidSessionData = null;
        //invalidDnis = null;
    }

}
