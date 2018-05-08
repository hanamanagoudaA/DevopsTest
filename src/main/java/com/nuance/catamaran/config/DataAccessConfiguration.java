package com.nuance.catamaran.config;

import java.util.HashMap;
import java.util.logging.Logger;
import org.apache.axis2.AxisFault;
import org.apache.axis2.context.ConfigurationContext;
import org.apache.axis2.context.ConfigurationContextFactory;

public class DataAccessConfiguration {

    private final HashMap<String, ConfigurationContext> configurationContext = new HashMap<String, ConfigurationContext>();

    private static DataAccessConfiguration instance = null;

    private String ANIServiceURL;

    private String BPEContextServiceURL;
    private String BPERouteServiceURL;

    private String IrisGetPatientPrescriptionListURL;
    private String IrisGetPaymentMethodsURL;
    private String IrisGetPatientHFFURL;
    private String IrisGetOrderDetailsURL;
    private String IrisGetRxDetailsURL;
    private String IrisGetPatientURL;
    private String IrisGetPatient360URL;
    private String IrisGetPatientBalanceDueURL;
    private String IrisGetPatientBalanceStatementURL;
    private String IrisGetDrugDetailsURL;
    private String IrisMakePaymentURL;
    private String IrisGetPaymentHistoryURL;
    private String IrisCreateOrderRequestURL;

    private String MemberServiceURL;
    private String ClaimServiceURL;
    private String PharmacyServiceURL;
    private String PrescriberServiceURL;
    private String PASRoutingServiceURL;
    private String PASPaStatusServiceURL;
    private String RXAUTHPaStatusSearchServiceURL;
    private String UserMemberPortalURL;

    private String backendANIUsername;
    private String backendANIPassword;
    private String backendIRISUsername;
    private String backendIRISPassword;
    private String backendESBUsername;
    private String backendESBPassword;
//    private String backendPASUsername;
//    private String backendPASPassword;

    private String CarrierFilter;
    private int ClaimsSearchWindow;
    private int RxAuthSearchWindow;
    private int RefillSearchWindow;
    private int RefillTooSoonWindow;
    private int OrderStatusSearchWindow;
    private int pasSearchWindow;
    //Pas Locator Service
    private String PasLocatorURL;
    private String PasPriorAuthStatus;

    private String Axis2Path;
    private String keystorePass;

    private String StatServerEnabled;
    private String StatServer;
    private String StatServerPort;
    private String StatServerUser;
    private String StatServerPassword;
    private String StatServerVirtualHost;
    private String StatServerMessageQueue;
    private String MemberProcessingInformationURL;
//    private String BPGUsername;
//    private String BPGPassword;
    private String backendAEUsername;
    private String backendAEPassword;
    private String RxCcrSystemAppId;
    private String RxCcrSystemPassword;
    private int HFFChangeOrderWindow;
    
    

    private DataAccessConfiguration() {
        // Exists only to defeat instantiation.
    }

    public static DataAccessConfiguration getInstance() {
        if (instance == null) {
            instance = new DataAccessConfiguration();
        }
        return instance;
    }

    public static void setInstance(DataAccessConfiguration instance) {
        DataAccessConfiguration.instance = instance;
    }

    public ConfigurationContext getConfigurationContext(String esbInstance) throws AxisFault {
        if (configurationContext.get(esbInstance) == null) {
            String axis2ConfigurationLocation = DataAccessConfiguration.getInstance().getAxis2Path() + "/axis2" + "-" + esbInstance.trim() + ".xml";
            String axis2RepositoryLocation = DataAccessConfiguration.getInstance().getAxis2Path();

            ConfigurationContext ctx = ConfigurationContextFactory.createConfigurationContextFromFileSystem(axis2RepositoryLocation, axis2ConfigurationLocation);
            configurationContext.put(esbInstance, ctx);
        }
        return configurationContext.get(esbInstance);
    }
   
    public String getUserMemberPortalURL() {
        return UserMemberPortalURL;
    }

    public void setUserMemberPortalURL(String UserMemberPortalURL) {
        this.UserMemberPortalURL = UserMemberPortalURL;
    }
    
    public int getPasSearchWindow() {
        return pasSearchWindow;
    }

    public void setPasSearchWindow(String pasSearchWindow) {
         try {
            this.pasSearchWindow = Integer.parseInt(pasSearchWindow);
        } catch (Exception e) {
            this.pasSearchWindow = 30;
        }
    }

    public String getPasLocatorURL() {
        return PasLocatorURL;
    }

    public void setPasLocatorURL(String PasLocatorURL) {
        this.PasLocatorURL = PasLocatorURL;
    }

    public String getPasPriorAuthStatus() {
        return PasPriorAuthStatus;
    }

    public void setPasPriorAuthStatus(String PasPriorAuthStatus) {
        this.PasPriorAuthStatus = PasPriorAuthStatus;
    }
    
    

    public String getANIServiceURL() {
        return ANIServiceURL;
    }

    public void setANIServiceURL(String ANIServiceURL) {
        this.ANIServiceURL = ANIServiceURL;
    }

    public String getBPEContextServiceURL() {
        return BPEContextServiceURL;
    }

    public void setBPEContextServiceURL(String BPEContextServiceURL) {
        this.BPEContextServiceURL = BPEContextServiceURL;
    }

    public String getBPERouteServiceURL() {
        return BPERouteServiceURL;
    }

    public void setBPERouteServiceURL(String BPERouteServiceURL) {
        this.BPERouteServiceURL = BPERouteServiceURL;
    }

    public String getIrisGetPatientPrescriptionListURL() {
        return IrisGetPatientPrescriptionListURL;
    }

    public void setIrisGetPatientPrescriptionListURL(String IrisGetPatientPrescriptionListURL) {
        this.IrisGetPatientPrescriptionListURL = IrisGetPatientPrescriptionListURL;
    }

    public String getIrisGetPaymentMethodsURL() {
        return IrisGetPaymentMethodsURL;
    }

    public void setIrisGetPaymentMethodsURL(String IrisGetPaymentMethodsURL) {
        this.IrisGetPaymentMethodsURL = IrisGetPaymentMethodsURL;
    }
    public String getIrisGetPatient360URL() {
        return IrisGetPatient360URL;
    }

    public void setIrisGetPatient360URL(String IrisGetPatient360URL) {
        this.IrisGetPatient360URL = IrisGetPatient360URL;
    }
    public String getIrisGetPatientHFFURL() {
        return IrisGetPatientHFFURL;
    }

    public void setIrisGetPatientHFFURL(String IrisGetPatientHFFURL) {
        this.IrisGetPatientHFFURL = IrisGetPatientHFFURL;
    }

    public String getIrisGetOrderDetailsURL() {
        return IrisGetOrderDetailsURL;
    }

    public void setIrisGetOrderDetailsURL(String IrisGetOrderDetailsURL) {
        this.IrisGetOrderDetailsURL = IrisGetOrderDetailsURL;
    }

    public String getIrisGetRxDetailsURL() {
        return IrisGetRxDetailsURL;
    }

    public void setIrisGetRxDetailsURL(String IrisGetRxDetailsURL) {
        this.IrisGetRxDetailsURL = IrisGetRxDetailsURL;
    }

    public String getIrisGetPatientURL() {
        return IrisGetPatientURL;
    }

    public void setIrisGetPatientURL(String IrisGetPatientURL) {
        this.IrisGetPatientURL = IrisGetPatientURL;
    }

    public String getIrisGetPatientBalanceDueURL() {
        return IrisGetPatientBalanceDueURL;
    }

    public void setIrisGetPatientBalanceDueURL(String IrisGetPatientBalanceDueURL) {
        this.IrisGetPatientBalanceDueURL = IrisGetPatientBalanceDueURL;
    }

    public String getIrisGetPatientBalanceStatementURL() {
        return IrisGetPatientBalanceStatementURL;
    }

    public void setIrisGetPatientBalanceStatementURL(String IrisGetPatientBalanceStatementURL) {
        this.IrisGetPatientBalanceStatementURL = IrisGetPatientBalanceStatementURL;
    }

    public String getIrisGetDrugDetailsURL() {
        return IrisGetDrugDetailsURL;
    }

    public void setIrisGetDrugDetailsURL(String IrisGetDrugDetailsURL) {
        this.IrisGetDrugDetailsURL = IrisGetDrugDetailsURL;
    }

    public String getIrisMakePaymentURL() {
        return IrisMakePaymentURL;
    }

    public void setIrisMakePaymentURL(String IrisMakePaymentURL) {
        this.IrisMakePaymentURL = IrisMakePaymentURL;
    }

    public String getIrisGetPaymentHistoryURL() {
        return IrisGetPaymentHistoryURL;
    }

    public void setIrisGetPaymentHistoryURL(String IrisGetPaymentHistoryURL) {
        this.IrisGetPaymentHistoryURL = IrisGetPaymentHistoryURL;
    }

    public String getIrisCreateOrderRequestURL() {
        return IrisCreateOrderRequestURL;
    }

    public void setIrisCreateOrderRequestURL(String IrisCreateOrderRequestURL) {
        this.IrisCreateOrderRequestURL = IrisCreateOrderRequestURL;
    }

    public String getMemberServiceURL() {
        return MemberServiceURL;
    }

    public void setMemberServiceURL(String MemberServiceURL) {
        this.MemberServiceURL = MemberServiceURL;
    }

    public String getClaimServiceURL() {
        return ClaimServiceURL;
    }

    public void setClaimServiceURL(String ClaimServiceURL) {
        this.ClaimServiceURL = ClaimServiceURL;
    }

    public String getPharmacyServiceURL() {
        return PharmacyServiceURL;
    }

    public void setPharmacyServiceURL(String PharmacyServiceURL) {
        this.PharmacyServiceURL = PharmacyServiceURL;
    }

    public String getPrescriberServiceURL() {
        return PrescriberServiceURL;
    }

    public void setPrescriberServiceURL(String PrescriberServiceURL) {
        this.PrescriberServiceURL = PrescriberServiceURL;
    }

    public String getPASRoutingServiceURL() {
        return PASRoutingServiceURL;
    }

    public void setPASRoutingServiceURL(String PASRoutingServiceURL) {
        this.PASRoutingServiceURL = PASRoutingServiceURL;
    }

    public String getPASPaStatusServiceURL() {
        return PASPaStatusServiceURL;
    }

    public void setPASPaStatusServiceURL(String PASPaStatusServiceURL) {
        this.PASPaStatusServiceURL = PASPaStatusServiceURL;
    }

    public String getRXAUTHPaStatusSearchServiceURL() {
        return RXAUTHPaStatusSearchServiceURL;
    }

    public void setRXAUTHPaStatusSearchServiceURL(String RXAUTHPaStatusSearchServiceURL) {
        this.RXAUTHPaStatusSearchServiceURL = RXAUTHPaStatusSearchServiceURL;
    }

    public String getBackendANIUsername() {
        return backendANIUsername;
    }

    public void setBackendANIUsername(String backendANIUsername) {
        this.backendANIUsername = backendANIUsername;
    }

    public String getBackendANIPassword() {
        return backendANIPassword;
    }

    public void setBackendANIPassword(String backendANIPassword) {
        this.backendANIPassword = backendANIPassword;
    }

    public String getBackendIRISUsername() {
        return backendIRISUsername;
    }

    public void setBackendIRISUsername(String backendIRISUsername) {
        this.backendIRISUsername = backendIRISUsername;
    }

    public String getBackendIRISPassword() {
        return backendIRISPassword;
    }

    public void setBackendIRISPassword(String backendIRISPassword) {
        this.backendIRISPassword = backendIRISPassword;
    }

    public String getBackendESBUsername() {
        return backendESBUsername;
    }

    public void setBackendESBUsername(String backendESBUsername) {
        this.backendESBUsername = backendESBUsername;
    }

    public String getBackendESBPassword() {
        return backendESBPassword;
    }

    public void setBackendESBPassword(String backendESBPassword) {
        this.backendESBPassword = backendESBPassword;
    }

//    public String getBackendPASUsername() {
//        return backendPASUsername;
//    }
//
//    public void setBackendPASUsername(String backendPASUsername) {
//        this.backendPASUsername = backendPASUsername;
//    }
//
//    public String getBackendPASPassword() {
//        return backendPASPassword;
//    }
//
//    public void setBackendPASPassword(String backendPASPassword) {
//        this.backendPASPassword = backendPASPassword;
//    }

    public String getCarrierFilter() {
        return CarrierFilter;
    }

    public void setCarrierFilter(String CarrierFilter) {
        this.CarrierFilter = CarrierFilter;
    }

    public int getClaimsSearchWindow() {
        return ClaimsSearchWindow;
    }

    public void setClaimsSearchWindow(String ClaimsSearchWindow) {
        try {
            this.ClaimsSearchWindow = Integer.parseInt(ClaimsSearchWindow);
        } catch (Exception e) {
            this.ClaimsSearchWindow = 7;
        }    }

    public int getRxAuthSearchWindow() {
        return RxAuthSearchWindow;
    }

    public void setRxAuthSearchWindow(String RxAuthSearchWindow) {
        try {
            this.RxAuthSearchWindow = Integer.parseInt(RxAuthSearchWindow);
        } catch (Exception e) {
            this.RxAuthSearchWindow = 30;
        }
    }

    public int getRefillSearchWindow() {
        return RefillSearchWindow;
    }

    public void setRefillSearchWindow(String RefillSearchWindow) {
        try {
            this.RefillSearchWindow = Integer.parseInt(RefillSearchWindow);
        } catch (Exception e) {
            this.RefillSearchWindow = 60;
        }
    }

    public int getRefillTooSoonWindow() {
        return this.RefillTooSoonWindow;
    }

    public void setRefillTooSoonWindow(String RefillTooSoonWindow) {
        try {
            this.RefillTooSoonWindow = Integer.parseInt(RefillTooSoonWindow);
        } catch (Exception e) {
            this.RefillTooSoonWindow = 2;
        }
    }

    public int getOrderStatusSearchWindow() {
        return this.OrderStatusSearchWindow;
    }

    public void setOrderStatusSearchWindow(String OrderStatusSearchWindow) {
        try {
            this.OrderStatusSearchWindow = Integer.parseInt(OrderStatusSearchWindow);
        } catch (Exception e) {
            this.OrderStatusSearchWindow = 180;
        } 
    }

    public String getAxis2Path() {
        return Axis2Path;
    }

    public void setAxis2Path(String Axis2Path) {
        this.Axis2Path = Axis2Path;
    }

    public String getKeystorePass() {
        return keystorePass;
    }

    public void setKeystorePass(String keystorePass) {
        this.keystorePass = keystorePass;
    }

    public String getStatServerEnabled() {
        return StatServerEnabled;
    }

    public void setStatServerEnabled(String StatServerEnabled) {
        this.StatServerEnabled = StatServerEnabled;
    }

    public String getStatServer() {
        return StatServer;
    }

    public void setStatServer(String StatServer) {
        this.StatServer = StatServer;
    }

    public String getStatServerPort() {
        return StatServerPort;
    }

    public void setStatServerPort(String StatServerPort) {
        this.StatServerPort = StatServerPort;
    }

    public String getStatServerUser() {
        return StatServerUser;
    }

    public void setStatServerUser(String StatServerUser) {
        this.StatServerUser = StatServerUser;
    }

    public String getStatServerPassword() {
        return StatServerPassword;
    }

    public void setStatServerPassword(String StatServerPassword) {
        this.StatServerPassword = StatServerPassword;
    }

    public String getStatServerVirtualHost() {
        return StatServerVirtualHost;
    }

    public void setStatServerVirtualHost(String StatServerVirtualHost) {
        this.StatServerVirtualHost = StatServerVirtualHost;
    }

    public String getStatServerMessageQueue() {
        return StatServerMessageQueue;
    }

    public void setStatServerMessageQueue(String StatServerMessageQueue) {
        this.StatServerMessageQueue = StatServerMessageQueue;
    }
    
    public String getMemberProcessingInformationURL() {
        return MemberProcessingInformationURL;
    }

    public void setMemberProcessingInformationURL(String MemberProcessingInformationURL) {
        this.MemberProcessingInformationURL = MemberProcessingInformationURL;
    }

//    public String getBPGUsername() {
//        return BPGUsername;
//    }
//
//    public void setBPGUsername(String BPGUsername) {
//        this.BPGUsername = BPGUsername;
//    }

//    public String getBPGPassword() {
//        return BPGPassword;
//    }
//
//    public void setBPGPassword(String BPGPassword) {
//        this.BPGPassword = BPGPassword;
//    }

    public String getBackendAEUsername() {
        return backendAEUsername;
    }

    public void setBackendAEUsername(String backendAEUsername) {
        this.backendAEUsername = backendAEUsername;
    }

    public String getBackendAEPassword() {
        return backendAEPassword;
    }

    public void setBackendAEPassword(String backendAEPassword) {
        this.backendAEPassword = backendAEPassword;
    }

    public String getRxCcrSystemAppId() {
        return RxCcrSystemAppId;
    }

    public void setRxCcrSystemAppId(String RxCcrSystemAppId) {
        this.RxCcrSystemAppId = RxCcrSystemAppId;
    }

    public String getRxCcrSystemPassword() {
        return RxCcrSystemPassword;
    }

    public void setRxCcrSystemPassword(String RxCcrSystemPassword) {
        this.RxCcrSystemPassword = RxCcrSystemPassword;
    }

    public int getHFFChangeOrderWindow() {
        return HFFChangeOrderWindow;
    }

    public void setHFFChangeOrderWindow(String HFFChangeOrderWindow) {
        try {
            this.HFFChangeOrderWindow = Integer.parseInt(HFFChangeOrderWindow);
        } catch (Exception e) {
            this.HFFChangeOrderWindow = 30;
        }
    }  
}
