package com.nuance.catamaran.utilities;

import java.util.HashMap;

import org.apache.commons.lang.math.NumberUtils;

import com.nuance.catamaran.config.AppConfiguration;
import com.nuance.catamaran.dataaccess.ws.WsGetProactiveAlertDetailsClient;
import com.nuance.framework.logging.Logger;
import com.nuance.framework.logging.LoggerManager;
//import com.nuance.catamaran.dataaccess.ws.test.StaticDrugPromptLoader;

public class DrugParser
{
    private static Logger logger = LoggerManager.getLogger(DrugParser.class.getName());

//    public static String getDrugNameFromNDCAndDrugString(String ndcCode, String drugString, Logger logger)
//    {
//        String drugName = NDCCodeMapping.GetDrugNameForNDCCode(ndcCode);
//        if (drugName.equals(""))
//        {
//            logger.warn("Missing NDC Code: " + ndcCode);
//            drugString.replaceAll("\\s+", " ");
//            String[] splitDrugString = drugString.split("\\s+");
//            if (splitDrugString.length > 1)
//            {
//                String newDrugString = "";
//                for (int i = 0; i < splitDrugString.length - 1; i++)
//                {
//                    newDrugString = newDrugString + splitDrugString[i] + " ";
//                }
//                newDrugString = newDrugString.replaceAll("\\/", " ");
//                newDrugString = newDrugString.replaceAll("\\s+", " ");
//                return newDrugString.trim();
//            }
//            else
//            {
//                return drugString.trim();
//            }
//
//        }
//        else
//        {
//            return drugName.trim();
//        }
//    }
//
//    public static String getDrugDoseFromNDCAndDrugString(String ndcCode, String drugString)
//    {
//        String drugDose = NDCCodeMapping.GetDrugStrengthAmountForNDCCode(ndcCode);
//        if (drugDose.equals(""))
//        {
//            drugString.replaceAll("\\s+", " ");
//            String[] splitDrugString = drugString.split("\\s+");
//            if (splitDrugString.length > 1)
//            {
//                return splitDrugString[splitDrugString.length - 1].trim();
//            }
//            else
//            {
//                return drugDose.trim();
//            }
//        }
//        else
//        {
//            return drugDose.trim();
//        }
//    }
    
    public static HashMap<String, String> GetDrugPromptAndTTSFromDrugName(String drugName)
    {
        drugName = drugName.trim().replaceAll(" +", " ");
        drugName = drugName.toLowerCase();
        String[] splitDrugName = drugName.split(" ");
        HashMap<String, String> drugPrompt = new HashMap<String, String>();
        int counter = 0;
        drugPrompt.put("prompt", "");
        for (int i = splitDrugName.length - 1; i >= 0; i--)
        {
            counter = i;
            StringBuffer promptName = new StringBuffer();
            for (int j = 0; j <= i; j++)
            {
                promptName.append(splitDrugName[j].replaceAll("/", "_"));
                if (j != i)
                {
                    promptName.append("_");
                }

            }

            if (AppConfiguration.getInstance().getDrugPromptMap() != null && AppConfiguration.getInstance().getDrugPromptMap().containsKey(promptName.toString() + "_f"))
            {
                drugPrompt.put("prompt", promptName.toString().toLowerCase());
                counter++;
                break;
            }

        }

        StringBuffer promptTTSBuffer = new StringBuffer();
        for (int j = counter; j < splitDrugName.length; j++)
        {
            promptTTSBuffer.append(splitDrugName[j]);
            if (j != splitDrugName.length - 1)
            {
                promptTTSBuffer.append(" ");
            }
        }

        String promptTTS = promptTTSBuffer.toString();

        // Replaces slashes with "per" unless the slash is in the drug name portion of the field
        if (counter != 0)
        {
            promptTTS = promptTTS.replaceAll("/", " per ");
            promptTTS = promptTTS.replaceAll("-", " dash ");
        }
        else
        {
            String drugNamePortion = promptTTS.substring(0, promptTTS.indexOf(" ")+1);
            String drugOtherPortion = promptTTS.substring(promptTTS.indexOf(" ")+1);
            drugNamePortion = drugNamePortion.replaceAll("/", " ");
            drugOtherPortion = drugOtherPortion.replaceAll("/", " per ");
            drugOtherPortion = drugOtherPortion.replaceAll("-", " dash ");

            promptTTS = drugNamePortion + drugOtherPortion;
        }

        // Insert spaces between alphas and numerics for TTS engine processing
        promptTTS = promptTTS.replaceAll("(?x) (?<= \\pL ) (?= \\pN ) | (?<= \\pN ) (?= \\pL )", " ");

        // Loop through and find units, convert to plural if necessary
        String[] splitStr = promptTTS.toString().split("\\s+");
        promptTTS = "";
        String previousValue = "";

        for (int i = 0; i < splitStr.length; i++)
        {
            if (NumberUtils.isNumber(previousValue) && !previousValue.equals("1"))
            {
                if (splitStr[i].equals("mg"))
                {
                    splitStr[i] = "mgs";
                }
                if (splitStr[i].equals("gm"))
                {
                    splitStr[i] = "gms";
                }
                if (splitStr[i].equals("gmml"))
                {
                    splitStr[i] = "gmmls";
                }
                if (splitStr[i].equals("m"))
                {
                    splitStr[i] = "ms";
                }
                if (splitStr[i].equals("mcgh"))
                {
                    splitStr[i] = "mcghs";
                }
                if (splitStr[i].equals("mcghr"))
                {
                    splitStr[i] = "mcghrs";
                }
                if (splitStr[i].equals("mcgml"))
                {
                    splitStr[i] = "mcgmls";
                }
                if (splitStr[i].equals("mghr"))
                {
                    splitStr[i] = "mghrs";
                }
                if (splitStr[i].equals("mgm"))
                {
                    splitStr[i] = "mgms";
                }
                if (splitStr[i].equals("mgml"))
                {
                    splitStr[i] = "mgmls";
                }
                if (splitStr[i].equals("mm"))
                {
                    splitStr[i] = "mms";
                }
                if (splitStr[i].equals("mmml"))
                {
                    splitStr[i] = "mmmls";
                }
                if (splitStr[i].equals("mqml"))
                {
                    splitStr[i] = "mqmls";
                }
                if (splitStr[i].equals("unitml"))
                {
                    splitStr[i] = "unitmls";
                }
                if (splitStr[i].equals("untml"))
                {
                    splitStr[i] = "untmls";
                }
                if (splitStr[i].equals("g"))
                {
                    splitStr[i] = "gs";
                }
                if (splitStr[i].equals("mcg"))
                {
                    splitStr[i] = "mcgs";
                }
                if (splitStr[i].equals("h"))
                {
                    splitStr[i] = "hs";
                }
                if (splitStr[i].equals("hr"))
                {
                    splitStr[i] = "hrs";
                }
                if (splitStr[i].equals("ml"))
                {
                    splitStr[i] = "mls";
                }
                if (splitStr[i].equals("unt"))
                {
                    splitStr[i] = "unts";
                }
                if (splitStr[i].equals("unit"))
                {
                    splitStr[i] = "units";
                }
            }
            promptTTS = promptTTS + splitStr[i] + " ";
            previousValue = splitStr[i];
        }

        promptTTS = promptTTS.replaceAll("\\.", " point ");

        // Cleanup any other special characters
        promptTTS = promptTTS.replaceAll("[^A-Za-z0-9%\\-\\s,]", "");

        if (promptTTS.equals(""))
        {
            promptTTS = "none";
        }

        drugPrompt.put("tts", promptTTS);

        return drugPrompt;
    }

//    public static void main(String args[])
//    {
//        StaticDrugPromptLoader.LoadDrugPrompts();
//        PrintDrugPrompt("QUINAPRIL    TAB 2MG/ML");
//
//        System.out.println(getDrugNameFromNDCAndDrugString("1234123412341234", "NEXIUM / APAK//KD 4.53MCG/ML",  LoggerManager.getLogger(DrugParser.class.getCanonicalName())));
//        System.out.println(getDrugDoseFromNDCAndDrugString("1234123412341234", "NEXIUM / APAK//KD 4.53MCG/ML"));
//    }
//
//    public static void PrintDrugPrompt(String drugName)
//    {
//        HashMap<String, String> drugPrompt = GetDrugPromptAndTTSFromDrugName(drugName);
//        System.out.println("Drug Name: " + drugName + ", Drug Prompt: " + drugPrompt.get("prompt") + ", Drug TTS: " + drugPrompt.get("tts"));
//    }
}
