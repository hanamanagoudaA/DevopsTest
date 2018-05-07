package com.nuance.catamaran.utilities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.lang.StringUtils;

public class StringUtil
{

    public static List<String> GetArrayListFromCSVString(String s)
    {
    	List<String> items = new ArrayList<String>(Arrays.asList(s.split("\\s*,\\s*")));
        return items;
    }

    // @TASK:  1-1343760771 R1.7.0
    public static boolean isAlphaNumeric(String s)
    {
        return StringUtils.isAlphanumericSpace(s);
    }

    // @TASK:  1-1343760771 R1.7.0
    public static boolean matchPrefix(String s, String f)
    {
        Pattern p = Pattern.compile(f);
        Matcher m = p.matcher(s);
        return m.find();
    }

    // @TASK:  1-1343760771 R1.7.0
    public static boolean isNumeric(String s)
    {
        return StringUtils.isNumeric(s);
    }

    // @TASK:  1-1343760771 R1.7.0
    // @TASK:  1-1398565314 R2.0.0
    public static String ExtractAddressNumber(String s)
    {
        String extracted = "";
        Pattern p = Pattern.compile("\\d+");
        Matcher m = p.matcher(s);
        if (m.find())
        {
            extracted = m.group(0);
        }
        return (StringUtils.isNotEmpty(s))? extracted : ""; 
    }
    
    public static String ExtractStreetNumber(String s)
    {
        String extracted = "";
        if (StringUtil.isAlphaNumeric(StringUtil.SanitizeAlphaNumeric(s)))
			{
				if (s != null && !s.isEmpty())
				{
					extracted = ExtractAddressNumber(s);					
				}
			}
        return extracted;
    }
    
    // @FIX:  1-1441594591 R2.0.0
    public static String SanitizeNumeric(String s)
    {
        return (StringUtils.isNotEmpty(s)) ? s.replaceAll("[^0-9]*","") : "";  
    }
    
    // @FIX:  1-1441594591 R2.0.0
    public static String SanitizeAlphaNumeric(String s)
    {
        return (StringUtils.isNotEmpty(s)) ? s.replaceAll("[^a-zA-Z0-9]*","") : ""; 
    }
    
    public static String sanitizeName(String name){
        
        if(StringUtils.isNotEmpty(name)){
            // !@#$%^&*()+=[]{}\|;�,/<>? 
            name = name.replaceAll("[^A-Za-z0-9'.\\s,]", "");
            name = name.replaceAll("[\\s+\\.,]", "_");
            name = name.replaceAll("_+", "_");
            name = name.replaceAll("\'+", "'");
            name = name.replaceAll("^(?i)jr_", "");
            name = name.replaceAll("^(?i)sr_", "");
            name = name.replaceAll("^(?i)ii_", "");
            name = name.replaceAll("^(?i)iii_", "");
            name = name.replaceAll("^(?i)iv_", "");
            name = name.replaceAll("_+(?i)jr(_|$)", "");
            name = name.replaceAll("_+(?i)sr(_|$)", "");
            name = name.replaceAll("_+(?i)ii(_|$)", "");
            name = name.replaceAll("_+(?i)iii(_|$)", "");
            name = name.replaceAll("_+(?i)iv(_|$)", "");
            if(name.endsWith("_"))
            {
                name = name.substring(0, name.length()-1);
            }
        }
        return name;
    }
    
    public static Date convertStringToDate(String str) throws ParseException{
        
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        if(StringUtils.isNotEmpty(str)){
            return sdf.parse(str);
        } else {
            return new Date();
        }
    }
    
    /** 
     * Returns true if given string is empty or  null 
     * @param str
     * @return 
     */
    public static boolean isNullOrEmpty(String str){
    
        return (str == null || str.isEmpty() || str.trim().equals(""));
    }
    
    public static void check(String streetNumber)
    {
        if (StringUtil.isAlphaNumeric(StringUtil.SanitizeAlphaNumeric(streetNumber)))
        {
            if (streetNumber != null && !streetNumber.isEmpty())
            {
                String extracted = StringUtil.ExtractAddressNumber(streetNumber);
                if (extracted != null && !extracted.isEmpty())
                {
//                    System.out.println("extracted - "+extracted);
                }
            }
        }
    }
    
    public static void main(String args[])
    {
        check("2342 W DEMING");
    }
}
