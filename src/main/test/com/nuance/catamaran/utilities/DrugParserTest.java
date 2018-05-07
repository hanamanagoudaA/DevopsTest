/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.nuance.catamaran.utilities;
import com.nuance.catamaran.config.AppConfiguration;

import java.util.HashMap;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author Cjohns
 */
public class DrugParserTest
{

    public static AppConfiguration instance = null;

    public DrugParserTest()
    {
        instance = new AppConfiguration();
    }

    @Test
    public void testGetDrugPromptAndTTSFromDrugName()
    {
        System.out.println("GetDrugPromptAndTTSFromDrugName");
        String drugName = "OXEPA        LIQ";
        String expResult = "oxepa liq ";
        System.out.println("Expected Result: '" + expResult +"'");
        HashMap<String, String> resultMap = DrugParser.GetDrugPromptAndTTSFromDrugName(drugName);
        String result = resultMap.get("tts");
        System.out.println("Actual Result: '" + result + "'");
        assertEquals(expResult, result);
    }

}
