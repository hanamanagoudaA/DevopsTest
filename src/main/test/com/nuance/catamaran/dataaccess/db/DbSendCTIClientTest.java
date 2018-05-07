package com.nuance.catamaran.dataaccess.db;

import com.nuance.catamaran.dataaccess.constants.ReasonCode;
import com.nuance.catamaran.dataaccess.data.SessionData;
import com.nuance.catamaran.dataaccess.db.DbSendCTIClient;
import com.nuance.catamaran.dataaccess.objects.SendCTIResponse;

import org.junit.Test;
import static org.junit.Assert.*;

public class DbSendCTIClientTest {

    @Test
    public void testSendCTI() throws Exception
    {
        System.out.println("sendCTI");
        SessionData sessionData = null;
        String ucid = "";
        String ani = "";
        String selectedLanguage = "";
        String callerType = "";
        ReasonCode reasonCode = ReasonCode.NONE;
        String authenticated = "";
        String medicarePartD = "";
        DbSendCTIClient instance = new DbSendCTIClient();
        SendCTIResponse expResult = null;
        SendCTIResponse result = instance.sendCTI(sessionData, ucid, ani, selectedLanguage, callerType, reasonCode, authenticated, medicarePartD);
        assertEquals(expResult, result);
    }

}
