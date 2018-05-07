package com.nuance.catamaran.utilities;

import java.util.*;
import org.junit.Test;
import static org.junit.Assert.*;

public class StringUtilTest {

    @Test
    public void testGetArrayListFromCSVString() {
        System.out.println("GetArrayListFromCSVString");
        String s = "1,2,3,4,5,6";
        List<String> expResult = new ArrayList<String>(Arrays.asList("1", "2", "3", "4", "5", "6"));
        List<String> result = StringUtil.GetArrayListFromCSVString(s);
        assertEquals(expResult, result);
    }

    @Test
    public void testIsAlphaNumeric() {
        System.out.println("isAlphaNumeric");
        String s = "26 NADEL Court";
        boolean expResult = true;
        boolean result = StringUtil.isAlphaNumeric(s);
        assertEquals(expResult, result);
    }

    @Test
    public void testMatchPrefix() {
        System.out.println("isNumeric");
        String s = "12345";
        boolean expResult = true;
        boolean result = StringUtil.isNumeric(s);
        assertEquals(expResult, result);
    }

    @Test
    public void testIsNumeric() {
        System.out.println("isNumeric");
        String s = "26 NADEL Court";
        boolean expResult = false;
        boolean result = StringUtil.isNumeric(s);
        assertEquals(expResult, result);
    }

    @Test
    public void testExtractAddressNumber() {
        System.out.println("ExtractNumber - Test 4");
        String s = "26 NADEL Court";
        System.out.println("String:" + s);
        String e = StringUtil.ExtractAddressNumber(s);
        System.out.println("Extract:" + e);
        String expResult = "26";
        String result = e;
        assertEquals(expResult, result);
    }
    
    @Test    
    public void testExtractNumber2()
    {
        System.out.println("ExtractNumber - Test 2");
        String s = "PO Box 13";
        System.out.println("String:" + s);
        String e = StringUtil.ExtractAddressNumber(s);
        System.out.println("Extract:" + e);
        String expResult = "13";
        String result = e;
        assertEquals(expResult, result);
    }
    
    @Test
    public void testExtractNumber3()
    {
        System.out.println("ExtractNumber - Test 3");
        String s = "2400 Route 33 North";
        System.out.println("String:" + s);
        String e = StringUtil.ExtractAddressNumber(s);
        System.out.println("Extract:" + e);
        String expResult = "2400";
        String result = e;
        assertEquals(expResult, result);
    }
    
    @Test
    public void testExtractNumber4()
    {
        System.out.println("ExtractNumber - Test 4");
        String s = "2400 Old Stone Mill Apt 12";
        System.out.println("String:" + s);
        String e = StringUtil.ExtractAddressNumber(s);
        System.out.println("Extract:" + e);
        String expResult = "2400";
        String result = e;
        assertEquals(expResult, result);
    }
    
    @Test
    public void testExtractNumber5()
    {
        System.out.println("ExtractNumber - Test 5");
        String s = "Old Stone Mill Apt 12G";
        System.out.println("String:" + s);
        String e = StringUtil.ExtractAddressNumber(s);
        System.out.println("Extract:" + e);
        String expResult = "12";
        String result = e;
        assertEquals(expResult, result);
    }
    
    @Test
    public void testExtractNumber6()
    {
        System.out.println("ExtractNumber - Test 6");
        String s = "2412 Stone Mill Apt 12";
        System.out.println("String:" + s);
        String e = StringUtil.ExtractAddressNumber(s);
        System.out.println("Extract:" + e);
        String expResult = "2412";
        String result = e;
        assertEquals(expResult, result);
    }
    
    @Test
    public void testExtractNumber7()
    {
        System.out.println("ExtractNumber - Test 7");
        String s = "2412 Stone Mill Apt 12 ~ ! @ # $ % ^ & * ( ) _ - = + { } [ ] | \\ ; : ‘ “ < > , . ? /.";
        System.out.println("String:" + s);
        String e = StringUtil.ExtractAddressNumber(s);
        System.out.println("Extract:" + e);
        String expResult = "2412";
        String result = e;
        assertEquals(expResult, result);
    }
    
        
    @Test
    public void testExtractNumber8()
    {
        System.out.println("ExtractNumber - Test 8");
        String s = "Stone Mill Apt ~ ! @ # $ % ^ & * ( ) _ - 12 = + { } [ ] 15 | \\ ; : ‘ “ < > , . ? /.";
        System.out.println("String:" + s);
        String e = StringUtil.ExtractAddressNumber(s);
        System.out.println("Extract:" + e);
        String expResult = "12";
        String result = e;
        assertEquals(expResult, result);
    }
    
    
    @Test
    public void testExtractNumber9()
    {
        System.out.println("ExtractNumber - Test 9");
        String s = "2412. Stone. Mill. Apt. 12. @124";
        System.out.println("String:" + s);
        String e = StringUtil.ExtractAddressNumber(s);
        System.out.println("Extract:" + e);
        String expResult = "2412";
        String result = e;
        assertEquals(expResult, result);
    }
    
    @Test
    public void testSanitizeAlphaNumeric()
    {
        System.out.println("SanitizeAlphaNumeric - Test 1");
        String s = "2412. Stone. Mill. Apt. 12. @124";
        System.out.println("String:" + s);
        String e = StringUtil.SanitizeAlphaNumeric(s);
        System.out.println("Extract:" + e);
        String expResult = "2412StoneMillApt12124";
        String result = e;
        assertEquals(expResult, result);
    }
    
    @Test
    public void testSanitizeNumeric()
    {
        System.out.println("SanitizeNumeric - Test 1");
        String s = "2412. Stone. Mill. Apt. 12. @124";
        System.out.println("String:" + s);
        String e = StringUtil.SanitizeNumeric(s);
        System.out.println("Extract:" + e);
        String expResult = "241212124";
        String result = e;
        assertEquals(expResult, result);   
    }
}