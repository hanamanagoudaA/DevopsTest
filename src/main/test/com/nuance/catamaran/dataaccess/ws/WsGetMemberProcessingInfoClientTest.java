/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess.ws;

import com.nuance.catamaran.config.DataAccessConfiguration;
import com.nuance.catamaran.dataaccess.objects.MemberDetailsList;
import com.nuance.catamaran.dataaccess.objects.MemberProcessingInfo;
import com.nuance.catamaran.dataaccess.ws.service.MemberProcessingInformationService;
import com.nuance.catamaran.dataaccess.ws.service.UserMemberPortalService;
import com.sxc.webservice.member.UserMemberPortalV2ResponseDocument.UserMemberPortalV2Response;
import com.uhc.upm3.optumrxbenefit.readrxprocessinginformation.v2.InvokeServiceResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.axis2.AxisFault;
import org.apache.axis2.context.ConfigurationContext;
import org.apache.axis2.context.ConfigurationContextFactory;
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
public class WsGetMemberProcessingInfoClientTest extends AbstractWsBaseClientTest {

    @Rule
    public ExpectedException exception = ExpectedException.none();
    WsGetMemberProcessingInfoClient instance = new WsGetMemberProcessingInfoClient();
    MemberProcessingInfo result;

    public WsGetMemberProcessingInfoClientTest() throws IOException {
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

//    @Test
//    public void invokeServiceResponse() throws Exception {
//        System.out.println("BPG member Test 1");
//        System.out.println("SearchPharmacyClaimsServiceResponse");
//        String accountID = "AM024000TX0QU";
//        String carrierID = "UHGUP0001";
//        String groupID = "070125402320232";
//        sessionData.getTFNProfile().setLegacy("OPTRX");
//        DataAccessConfiguration.getInstance().setMemberProcessingInformationURL("https://aesystestproxy-vm.uhc.com:22443/upm3/optumrxbenefit/ReadRxProcessingInformationV2");
//
//        DataAccessConfiguration.getInstance().setBPGPassword("LnJeDtb6");
//        DataAccessConfiguration.getInstance().setBPGUsername("nav_uat");
//        InvokeServiceResponse result = MemberProcessingInformationService.getMemberBPGesponse(accountID, carrierID, groupID);
//        assertEquals("610494", result.getReturn().getProcessingInformation().getBin());
//
//    }
    @Test
    public void testBPGMemberDetails() throws Exception {
        System.out.println(" BPG  member Test 2");
        String memberId = "";
        WsGetMemberProcessingInfoClient client = new WsGetMemberProcessingInfoClient();
        MemberProcessingInfo eminfo = null;
        assertEquals(0, sessionData.getMemberInformation().size());
        String accountID = "AM024000TX0QU";
        String carrierID = "UHGUP0001";
        String groupID = "070125402320232";
        
        HashMap<String, String> carrierIDMap = null;
        HashMap<String, String> accountIDMap = null;
        HashMap<String, String> groupIDMap = null;

        carrierIDMap = new HashMap();
        carrierIDMap.put(memberId, carrierID);

        accountIDMap = new HashMap();
        accountIDMap.put(memberId, accountID);

        groupIDMap = new HashMap();
        groupIDMap.put(memberId, groupID);

        sessionData.setCarrierIDs(carrierIDMap);
        sessionData.setAccountIDs(accountIDMap);
        sessionData.setGroupIDs(groupIDMap);

        sessionData.getTFNProfile().setLegacy("OPTRX");
        sessionData.getTFNProfile().setESB_Instance("ORX-ALL");
        sessionData.getTFNProfile().setESB_Pharmacy_Instance("Book1");
        sessionData.getTFNProfile().setESB_Physician_Instance("Book1");

        DataAccessConfiguration.getInstance().setMemberProcessingInformationURL("https://aesystestproxy-vm.uhc.com:22443/upm3/optumrxbenefit/ReadRxProcessingInformationV2");
        DataAccessConfiguration.getInstance().setBackendAEPassword("A9G3x6L7");
        DataAccessConfiguration.getInstance().setBackendAEUsername("optumrxivr_tst");
        eminfo = client.getMemberProcessingInfo(sessionData, memberId);
        assertEquals("610494", eminfo.getBin());

    }

    @Test
    public void testUserMemberPortalService() throws AxisFault {
        System.out.println("User member Test");
        WsGetMemberProcessingInfoClient client = new WsGetMemberProcessingInfoClient();
        MemberProcessingInfo eminfo = null;
       
        String memberId = "000123456";
        String accountID = "Mexp1";
        String carrierID = "Mexp1";
        String groupID = "Mexp1";
        
        /** memberId = "JACKBENSXCD11";
        accountID = "ACUAZCRS";
         carrierID = "ACUAZ1";
         groupID = "ACUAZCRS";*/
        
        
//        memberId = "TARGETHSA01";
//        accountID = "SARAH";
//         carrierID = "CTR999TST";
//         groupID = "TARGETHSA";
//                 
        HashMap<String, String> carrierIDMap = null;
        HashMap<String, String> accountIDMap = null;
        HashMap<String, String> groupIDMap = null;

        carrierIDMap = new HashMap();
        carrierIDMap.put(memberId, carrierID);

        accountIDMap = new HashMap();
        accountIDMap.put(memberId, accountID);

        groupIDMap = new HashMap();
        groupIDMap.put(memberId, groupID);

        sessionData.setCarrierIDs(carrierIDMap);
        sessionData.setAccountIDs(accountIDMap);
        sessionData.setGroupIDs(groupIDMap);

        sessionData.getTFNProfile().setLegacy("CTRX");//A5-CTR
        sessionData.getTFNProfile().setESB_Pharmacy_Instance("A6-IRX");
        sessionData.getTFNProfile().setESB_Physician_Instance("A6-IRX");
        
        
        
//        sessionData.getTFNProfile().setESB_Instance("A5-CTR");
//        sessionData.getTFNProfile().setESB_Pharmacy_Instance("A5-CTR");
//        sessionData.getTFNProfile().setESB_Physician_Instance("A5-CTR");
        UserMemberPortalV2Response result = null;
       // sessionData.setESB_Instance("ORX-ALL");
       DataAccessConfiguration.getInstance().setAxis2Path("D:/rampart-test");
//            String axis2ConfigurationLocation = "D:/rampart-test/axis2" + "-" +  "A6-IRX.xml";
//            String axis2RepositoryLocation = "D:/rampart-test";
            
            DataAccessConfiguration.getInstance().setKeystorePass("ivrqaivrqa");
//            ConfigurationContext ctx = ConfigurationContextFactory.createConfigurationContextFromFileSystem(axis2RepositoryLocation, axis2ConfigurationLocation);
            //DataAccessConfiguration.getInstance().getConfigurationContext("A6-IRX");
            DataAccessConfiguration.getInstance().getConfigurationContext("A5-CTR");
          
            DataAccessConfiguration.getInstance().setUserMemberPortalURL("https://sxcqa.webservice.sxc.com:443/WebService/services/UserMemberPortalV2");
        try {
            eminfo = client.getMemberProcessingInfo(sessionData, memberId);
            System.out.println(eminfo);
            assertEquals("090539", eminfo.getBin());
        } catch (Exception ex) {
            Logger.getLogger(WsGetMemberProcessingInfoClientTest.class.getName()).log(Level.SEVERE, null, ex);
        }
//        assertEquals(account, result.getMemberItemsArray(0).getAccountId());
    }
}
