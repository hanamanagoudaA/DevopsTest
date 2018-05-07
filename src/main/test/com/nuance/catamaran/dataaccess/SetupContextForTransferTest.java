/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.dataaccess;

import com.nuance.catamaran.config.AppConfiguration;
import com.nuance.catamaran.dataaccess.constants.CallFlowVariable;
import com.nuance.catamaran.dataaccess.constants.ReasonCategory;
import com.nuance.catamaran.dataaccess.constants.ReasonCode;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.framework.configuration.ConfigurationException;
import com.nuance.framework.controller.requestdata.RequestDataContext;
import com.nuance.framework.exception.BusinessException;
import com.nuance.framework.exception.SystemException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Before;
import org.mockito.Mockito;

/**
 *
 * @author ivrdev3
 */
public class SetupContextForTransferTest extends DataAccessTest {

    private SetupContextForTransfer setupContextForTransfer;
    SessionData sessionData;
    String medicarePartD = "N";
    String cosmosDiv = "";
    String callerType = "member";
    String reasonCode = "Something_Else";
    String transferVDN = "1993531002";
    String selectedLanguage = "english";
    String authenticationIndicator = "ANI;MEMBER_DOB;MEMBER_ZIP";

    @Before
    public void setUp() throws ConfigurationException {
        super.setUp();

        AppConfiguration.getInstance().setReasonCodeMap(new HashMap<ReasonCode, ReasonCategory>());
        setupContextForTransfer = Mockito.spy(new SetupContextForTransfer());

        addRequestParameter(CallFlowVariable.UCID, "8001111111");
        addRequestParameter(CallFlowVariable.MEDICARE_PART_D, medicarePartD);
        addRequestParameter(CallFlowVariable.COSMOS_DIV, cosmosDiv);
        addRequestParameter(CallFlowVariable.CALLER_TYPE, callerType);
        addRequestParameter(CallFlowVariable.REASON_CODE, reasonCode);
        addRequestParameter(CallFlowVariable.TRANSFER_VDN, transferVDN);
        addRequestParameter(CallFlowVariable.SELECTED_LANGUAGE, selectedLanguage);
        addRequestParameter(CallFlowVariable.AUTHENTICATIONINDICATOR, authenticationIndicator);
    }

    @Test
    public void testSetupContextForTransfer() throws SystemException, BusinessException {

        RequestDataContext rdc = getRequestDataContext();
        HttpServletRequest httpRequest = rdc.getHttpRequest();
        GetProfileByTFN getProfileByTFN = new GetProfileByTFN();
        getProfileByTFN.execute(rdc);

        Map<String, Object> response = setupContextForTransfer.execute(getRequestDataContext());
        SessionData sd = setupContextForTransfer.getSessionData(setupContextForTransfer.getRequest(getRequestDataContext()));
        Map<String, Object> exp_response = new HashMap();

        String str = sd.getCTIData().getContextOut().toString();

        assertEquals("ANI,MEMBER_DOB,PHSMEMBERFIRSTNAME", sd.getAuthenticationIndicator());

    }

}
