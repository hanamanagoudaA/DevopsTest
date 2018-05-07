var CPR = new Object();
CPR.EN_US = "en.us";
CPR.ES_US = "es.us";
CPR.EN_UK = "en.uk";
CPR.EN_AU = "en.au";
CPR.FR_CA = "fr.ca";
CPR.PT_BR = "pt.br";
CPR.DE_DE = "de.de";

var DATIVE = 'd';
var NOMINATIVE = 'n';
var LANGUAGE;
var HASDECIMAL = true;
var CASE = NOMINATIVE;

var PROMPT_ULAW = ".ulaw";
var PROMPT_WAV = ".wav";
var MEDIAL = "MEDIAL";
var RISING = "RISING";
var FINAL = "FINAL";

var INTONATION = new Array();
INTONATION[MEDIAL] = "m.";
INTONATION[RISING] = "r.";
INTONATION[FINAL]  = "f.";

var fileExtension = PROMPT_WAV;
var cprPromptPath = "";


//NaturalNumber Constants
var NN_CONSTANTS = new Object();
NN_CONSTANTS.LABEL_DECIMALS = "natnum.decimals";
NN_CONSTANTS.ZEROUNITS = "natnum.zerounits";
NN_CONSTANTS.UNITS = "natnum.units";
NN_CONSTANTS.HUNDREDS = "natnum.hundreds";
NN_CONSTANTS.HUNDREDSAND = "natnum.hundredsand";
NN_CONSTANTS.HUNDREDS_X = "natnum.hundreds_x";
NN_CONSTANTS.THOUSANDS = "natnum.thousands";
NN_CONSTANTS.THOUSANDS_X = "natnum.thousands_x";
NN_CONSTANTS.MILLIONS = "natnum.millions";
NN_CONSTANTS.DATIVEMILLIONS = "natnum.millions01dative";
NN_CONSTANTS.PAUSE_PRE_CPR = "silence.natnum.precpr";
NN_CONSTANTS.PAUSE_POST_CPR = "silence.natnum.postcpr";
NN_CONSTANTS.PAUSE = "silence.natnum";

function loadNatnum (args) 
{

    // Result object
    var prompts = new Object();
    
    // Initialize the prompts array 
    prompts.audio = new Array();
    prompts.tts = new Array();   
    return prompts ;
    
}

/***********************************************************************************
*
*   For use in generating dynamic prompts 
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation                     MEDIAL
*   args.language                       en.us
*   args.playZeroUnits                  REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.playZeroDecimal                REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*
*   args.natnumString                   REQUIRED
*
***********************************************************************************/

function CPRNatnumDynamicPrompt(args)
{
    return CPRNaturalNumber(args);
}

/***********************************************************************************
*
*   For use by confirmation prompts in OSDMs
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation                     MEDIAL
*   args.language                       en.us
*   args.playZeroUnits                  REQUIRED    // Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.playZeroDecimal                REQUIRED    // Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*
*   args.value.dm_confirm_string ||     REQUIRED
*   args.value.dm_root || 
*   args.value.MEANING || 
*   args.value || 
*   args.dm_confirm_string || 
*   args.dm_root || 
*   args.MEANING 
*
***********************************************************************************/ 

function CPRNatnumAudioServiceConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.natnumString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.natnumString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.natnumString = args.value.MEANING;
        else
            args.natnumString = args.value ;
    }
    
    // Make sure we have a digitsString
    if (typeof args.natnumString == 'undefined' || args.natnumString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.natnumString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.natnumString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.natnumString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.natnumString = args.value ;
        }
    }
    
    return CPRNaturalNumber(formatNatnumAudioServiceConfiguration(args));
    
}

/***********************************************************************************
*
*   For use by confirmation prompts in OSDMs
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation                     MEDIAL
*   args.language                       en.us
*   args.playZeroUnits                  REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.playZeroDecimal                REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*
*   args.value.dm_confirm_string ||     REQUIRED
*   args.value.dm_root || 
*   args.value.MEANING || 
*   args.value || 
*   args.dm_confirm_string || 
*   args.dm_root || 
*   args.MEANING 
*
***********************************************************************************/ 

function CPRNatnumConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.natnumString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.natnumString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.natnumString = args.value.MEANING;
        else
            args.natnumString = args.value ;
    }
    
    // Make sure we have a digitsString
    if (typeof args.natnumString == 'undefined' || args.natnumString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.natnumString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.natnumString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.natnumString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.natnumString = args.value ;
        }
    }
    
    return CPRNaturalNumber(args);
    
}

/***********************************************************************************
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation                     MEDIAL
*   args.language                       en.us
*   args.playZeroUnits                  REQUIRED    // Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.playZeroDecimal                REQUIRED    // Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*
*   args.natnumString                   REQUIRED
*
***********************************************************************************/

function CPRNaturalNumberAudioService(args)
{
    return CPRNaturalNumber(formatNatnumAudioServiceConfiguration(args));
}

/***********************************************************************************
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation                     MEDIAL
*   args.language                       en.us
*   args.playZeroUnits                  REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.playZeroDecimal                REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*
*   args.natnumString                   REQUIRED
*
***********************************************************************************/

function CPRNaturalNumber(args)
{

    var bPlayZeroUnits = args.playZeroUnits;
    var bPlayZeroDecimal = args.playZeroDecimal;
    var intonation = args.intonation;
    var directory = args.applicationpromptsdirectory;
    var confValue = args.natnumString ;
    var language = args.language ;
    cprPromptPath = args.cprPromptPath ;
    fileExtension = args.fileExtension ;
    CASE = args.germanCase;
        
    var prompts   = new Object();
    prompts.audio = new Array();
    prompts.tts   = new Array();

    if ( language == null ) 
    {
        language = CPR.EN_US ; // default
    }
    
    if ( cprPromptPath == null  || cprPromptPath == '') 
    {
        cprPromptPath = directory + "/cpr/" ; // default
    }
    
    if (fileExtension == null) 
    {
        fileExtension = PROMPT_WAV;  // default
    }
    
    if (intonation == null) 
    {
        intonation = MEDIAL;  // default
    }

    if (CASE == null)
    {
        CASE = NOMINATIVE;
    }

    if (bPlayZeroUnits == "true")
    {
    	bPlayZeroUnits = true;	
    }
    if (bPlayZeroUnits == "false")
    {
    	bPlayZeroUnits = false;
    }

    if (bPlayZeroDecimal == "true")
    {
    	bPlayZeroDecimal = true;	
    }
    if (bPlayZeroDecimal == "false")
    {
    	bPlayZeroDecimal = false;
    }    
    
    var num = new Object();


    //Set Globals
    LANGUAGE = language;
    
    var dot_position = confValue.indexOf(".");
    
    //if there is a whole and decimal
    if(dot_position  > 0) 
    {    
        num.whole = confValue.substr(0, dot_position);
        num.fraction = confValue.substr(dot_position+1);
        
        //if decimal only has one character convert it to two(123.1-->123.10)
        if (num.fraction.toString().length < 2)
        {
            num.fraction = num.fraction + "0";
        }
        //if decimal has more than two characters (0.00999 --> 0.00)
        if (num.fraction.toString().length >2) 
        {
            num.fraction = num.fraction.substr(0, 2);
        }
    }
    
    else if(dot_position == 0) 
    {
        num.fraction = confValue.substr(1);
        num.whole = 0;
        //if decimal only has one character convert it to two(123.1-->123.10)
        if (num.fraction.toString().length < 2) 
        {
            num.fraction = num.fraction + "0";
        }
        //if decimal has more than two characters (0.00999 --> 0.00)
        if (num.fraction.toString().length >2) 
        {
            num.fraction = num.fraction.substr(0, 2);
        }
    }
        
    //else just a whole number
    else 
    {
        num.whole = confValue;
        num.fraction = 0;
    }

    //begin playback calls
    if ( ( num.fraction == 0 ) && (! bPlayZeroDecimal ) )
    {
        //there is no decimal
        HASDECIMAL = false;
    }
    else
    {
        //there is a decimal
        HASDECIMAL=true;
    }
    
    prompts.audio.push(cprPromptPath + NN_CONSTANTS.PAUSE_PRE_CPR + fileExtension);
    
    //******** MODIFY THE CODE HERE TO CHANGE WHAT TTS IS RETURNED *******************
    prompts.tts.push (confValue);  
    
    prompts = playWhole(prompts, num, bPlayZeroUnits, intonation);
    prompts = playDecimal( prompts, num, bPlayZeroUnits, bPlayZeroDecimal, intonation);
    
    prompts.audio.push(cprPromptPath + NN_CONSTANTS.PAUSE_POST_CPR + fileExtension);
    prompts.tts.push ("");
    
    return prompts; 
    
}    

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+
* Function: playWhole                                                
* Inputs:      vector, long, boolean, IntonationType    
* Effects:    this function generates the                      
*           vector of prompts to be played                      
*           back given an input, spliting                          
*           the dollar input into chunks                            
*           and calling the approrpriate functions.         
* Returns:  nothing                                                       
* Table:    Splitting $dollars into groups                    
*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*/
    
function playWhole(prompts, num, bPlayZeroUnits, intonation)    
{
   
    var temp_number;
    
    var hundred_millions = 0; //digit 9
    var millions = 0;  //digit 8
    var hundred_thousands = 0; //digit 6
    var thousands = 0; //digit 5
    var hundreds = 0; //digit 3
    var tens = 0; //digit 2
    var temp;
    temp_number = num.whole; 
    
    //get respective digits
    //digit 9
    temp = temp_number / 100000000;
    hundred_millions = Math.floor(temp);
    temp_number = temp_number - hundred_millions * 100000000;
    
    
    //digit 8
    temp = temp_number / 1000000;
    millions = Math.floor(temp);
    temp_number = temp_number - millions * 1000000;
        
    //digit 6
    temp = temp_number / 100000;
    hundred_thousands = Math.floor(temp); // 5
    temp_number = temp_number - hundred_thousands * 100000;
        
    //digit 5
    temp = temp_number / 1000;
    thousands  = Math.floor(temp); // 3
    temp_number = temp_number - thousands * 1000;
        
    //digit 3
    temp = temp_number / 100;
    hundreds = Math.floor(temp); // 2
    temp_number = temp_number - hundreds * 100;

         
    //digit 2
    temp = temp_number / 1;
    tens = Math.floor(temp);

         
    /*
    the code below this point follows the rules outlined in table 2
    of the algorithm
    */
    
    //follow subsequent playback rules
    if(millions>0 || hundred_millions>0) 
    {    
        //play millions
        prompts = playMillions( prompts, hundred_millions, millions);
        
        //only play thousands if there is a thousands unit (not 000)
        if(thousands>0 || hundred_thousands>0)
        {
            prompts = playThousands( prompts, hundred_thousands, thousands);
        }
    
        //play units as normal
        prompts = playUnits(prompts, hundreds, tens, intonation);
    }
    
    //if there is no millions but there is thousands
    else if(thousands>0 || hundred_thousands>0)
    {
        //play thousands
        prompts = playThousands( prompts, hundred_thousands, thousands);
        
        //play units
        prompts = playUnits(prompts, hundreds, tens, intonation);
    }
    
    //only units, just play them
    else if(hundreds>0 || tens>0)
    {
        //play units
        prompts = playUnits(prompts, hundreds, tens, intonation);
    }
    
    //dollar is zero
    else 
    {
        if(bPlayZeroUnits) 
        {
            prompts = playZeroUnits(prompts, intonation);
        }
        //else don't play any prompts
    }
    
    return prompts;

}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
* Function: playMillions                                       
* Inputs:      vector, int, int                                
* Effects:  this function is calls the                     
*           appropriate functions for the                 
*           correct playback of millions                   
*           (playHundreds & playTens)                   
* Returns:  nothing                                               
* Table:    4                                                           
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*/
    
function playMillions( prompts, hundred_millions, millions)  
{
    prompts = playHundreds(prompts, hundred_millions, millions);
    prompts = playTens(prompts, millions,NN_CONSTANTS.MILLIONS,MEDIAL);
    return prompts;
}
    
    
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
* Function: playThousands                                 
* Inputs:      vector, int, int                                    
* Effects:    this function calls the                       
*           appropriate functions for the                 
* 	correct playback of thousands             
*           (playHundreds & playTens)                   
* Returns:  nothing                                               
* Table:    4                                                           
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*/

function playThousands( prompts, hundred_thousands, thousands) 
{
    prompts = playHundreds(prompts, hundred_thousands,thousands);
    
    // If number is 1000 (no hundred thousands) use exception
    if ((hundred_thousands == 0) && (thousands == 1))
        prompts = playException(prompts, NN_CONSTANTS.THOUSANDS_X, MEDIAL);
    else
        prompts = playTens(prompts, thousands, NN_CONSTANTS.THOUSANDS, MEDIAL);
    
    return prompts;
}
    
    
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
* Function: playUnits                                            
* Inputs:      vector, int, int, IntonationType          
* Effects:  this function calls the                          
*           appropriate functions for the                  
* 	correct playback of units                        
*           (playHundreds & playTens)                    
* Returns:  nothing                                                
* Table:    4                                                           
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*/

function playUnits( prompts, hundreds, tens, intonation)   
{
    prompts = playHundreds(prompts, hundreds, tens);
    prompts = playTens(prompts, tens, NN_CONSTANTS.UNITS,intonation);
    return prompts;
}
    
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
* Function: playZeroUnits                                    
* Inputs:      vector, IntonationType                      
* Effects:  this function calls playException to   
*           generate the correct playback of           
*           zerodollars                                               
* Returns:  nothing                                               
* Table:    4                                                           
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*/

function playZeroUnits( prompts, intonation)    
{
    prompts = playException( prompts, NN_CONSTANTS.ZEROUNITS, intonation);
    return prompts;
}
    
    
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
* Function: playHundreds                                    
* Inputs:      vector, int, int                                     
* Effects:    this function calls getCPR of           
*           CPRModule to get the prompt               
*           needed for playback of                           
*	the hundreds digit                                   
* Returns:  nothing                                               
* Table:    5                                                           
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*/

function playHundreds( prompts, hundreds, tens)    
{
            
    //if it one of the below languages, follow default playback
    if(LANGUAGE == CPR.EN_US || LANGUAGE == CPR.FR_CA) 
    {
        prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + NN_CONSTANTS.HUNDREDS + hundreds + fileExtension);
        prompts.tts.push ("");
    }
    
    //if it is one of the below langauges, follow rules for hundreds AND or hundreds
    else if(LANGUAGE == CPR.EN_UK || LANGUAGE == CPR.EN_AU || LANGUAGE == CPR.DE_DE ) 
    {
        //if there is a tens unit (e.g. 293)
        if(tens!=0)
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + NN_CONSTANTS.HUNDREDSAND + hundreds + fileExtension);
            prompts.tts.push ("");
        }   
        //if there is no tens unit (e.g. 200)
        else
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + NN_CONSTANTS.HUNDREDS + hundreds + fileExtension);
            prompts.tts.push ("");
        }
    }
    
    else if(LANGUAGE== CPR.PT_BR) 
    {
        //if there is a tens unit (e.g. 293)
        if(tens!=0)
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + NN_CONSTANTS.HUNDREDSAND + hundreds + fileExtension);
            prompts.tts.push ("");
            
            //100 case (cien)
        }
        else if(hundreds==1)
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + NN_CONSTANTS.HUNDREDS_X + fileExtension);
            prompts.tts.push ("");
            //hundreds non 100 (e.g. 200, 300,...,900)
        }
        else
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + NN_CONSTANTS.HUNDREDS + hundreds + fileExtension);
            prompts.tts.push ("");
        }
    }
    
    else if(LANGUAGE == CPR.ES_US) 
    {
        //if the input is 100
        if(tens==0 && hundreds==1) 
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + NN_CONSTANTS.HUNDREDS_X + fileExtension);
            prompts.tts.push ("");
        }
        //input is not one hundred
        else 
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + NN_CONSTANTS.HUNDREDS + hundreds + fileExtension);
            prompts.tts.push ("");
        }
    }
    
    //undefined language uses default playback
    else
    {
        prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + NN_CONSTANTS.HUNDREDS + hundreds + fileExtension);
        prompts.tts.push ("");
    }
    
    return prompts;
    
}
    
    
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
* Function: playTens                                            
* Inputs:      vector, int, string, IntonationType    
* Effects:    this function is responsible            
*          for getting the appropriate                      
*          prompt to play the tens segment            
* Returns: nothing                                                
* Table:   6                                                            
+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*/

function playTens( prompts, tens, prefix, intonation)    
{
    
    //if it is one digits (e.g. 103 --> tens=3) pad with zero (3-->03)
    
    if(tens.toString().length < 2)
    {
        tens = "0" + tens;
    }
    
    //create a new object so as not to modify the value of the original.
    // it is equivalent to clone()
    var inton = intonation;
    if (HASDECIMAL) inton = MEDIAL;
    
    //if it is special german dative case (#01,###,###)
    if(LANGUAGE== CPR.DE_DE && CASE == DATIVE && tens=="01") 
    {
        if(prefix == NN_CONSTANTS.UNITS) 
        {
            prompts.audio.push(cprPromptPath + INTONATION[inton] + prefix + tens + fileExtension);
            prompts.tts.push ("");
        }
        //millions case for german 01
        else if(prefix == NN_CONSTANTS.MILLIONS) 
        {
            playDativeTensMillions(prompts, MEDIAL);
        }
        //thousands case for german 01
        else 
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + prefix + tens + fileExtension);
            prompts.tts.push ("");
        }
    }
    
    //all other languages, playing units part (need to pass TensTone here because
    //units might be last prompt
    else if( prefix == NN_CONSTANTS.UNITS)
    {
        prompts.audio.push(cprPromptPath + INTONATION[inton] + prefix + tens + fileExtension);
        prompts.tts.push ("");
    }
    
    //not units part, will always be medial (millions & thousands never final)
    else
    {
        prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + prefix + tens + fileExtension);
        prompts.tts.push ("");    
    }
    
    return prompts;
    
}

function playDativeTensMillions(prompts, tone)   
{

    prompts.audio.push(cprPromptPath + INTONATION[tone] + NN_CONSTANTS.DATIVEMILLIONS + fileExtension);
    prompts.tts.push ("");
    return prompts;

}

function playException(prompts, exception, intonation)  
{
      
    //if decimal prompt will be played (exception not final prompt in phrase)
    var inton = intonation;
    if(HASDECIMAL) inton = MEDIAL;
    prompts.audio.push(cprPromptPath + INTONATION[inton] + exception + fileExtension);
    prompts.tts.push ("");
    return prompts;
	
}

function playDecimal(prompts, num, bPlayZeroUnits, bPlayZeroDecimal, intonation)
{
    
    //convert the decimal to a string

    var sdecimal= num.fraction;
    
    //if the decimal is one digit (123.04 --> decimal=4) we need to pad it with a 0 (4-->04);
    if(sdecimal.toString().length<2)
        sdecimal = "0" + sdecimal;
    if(sdecimal.toString().length>2)
        sdecimal = sdecimal.substr(0,2);
    
    // If the decimal is > 0 then it is always played
    if (num.fraction > 0)
    {
        prompts.audio.push(cprPromptPath + NN_CONSTANTS.PAUSE + fileExtension);
        prompts.tts.push ("");

        prompts.audio.push(cprPromptPath + INTONATION[intonation] + NN_CONSTANTS.LABEL_DECIMALS + sdecimal + fileExtension);
        prompts.tts.push ("");    
    }
    else if (bPlayZeroDecimal)
    {
    	// If the whole number is 0 and the decimal is 0 then we only play the decimal
    	// if bPlayZeroUnits and bPlayZeroDecimal are true
    	if(num.whole==0) 
    	{
    		if (bPlayZeroUnits)
    		{
				prompts.audio.push(cprPromptPath + NN_CONSTANTS.PAUSE + fileExtension);
        		prompts.tts.push ("");

        		prompts.audio.push(cprPromptPath + INTONATION[intonation] + NN_CONSTANTS.LABEL_DECIMALS + sdecimal + fileExtension);
        		prompts.tts.push ("");
    		}
    	}
    	else // Otherwise if the whole number > 0 and the decimal is 0 and bPlayZeroDecimal is true, then play the decimal
    	{
			prompts.audio.push(cprPromptPath + NN_CONSTANTS.PAUSE + fileExtension);
        	prompts.tts.push ("");

        	prompts.audio.push(cprPromptPath + INTONATION[intonation] + NN_CONSTANTS.LABEL_DECIMALS + sdecimal + fileExtension);
        	prompts.tts.push ("");
    	}
    }
     
    return prompts;

}


function formatNatnumAudioServiceConfiguration(args) {
    args = buildNatnumPromptUrl(args);
    
    return args;
}


function buildNatnumPromptUrl(args) {
    var cprPromptPath = args.cprPromptPath;
    var cprPromptBaseUri = args.cprPromptBaseUri;
    var applicationpromptsdirectory = args.applicationpromptsdirectory;
    
    if ( applicationpromptsdirectory != null && applicationpromptsdirectory != '' )     
    {   
        var size = applicationpromptsdirectory.length;
        
        if(applicationpromptsdirectory.charAt(size-1)!='/') {
            applicationpromptsdirectory = applicationpromptsdirectory+'/';
        }
    }  
    
    if ( cprPromptPath == null || cprPromptPath == '' )     
    {
        if ( cprPromptBaseUri != null && cprPromptBaseUri != '' )     
        {
            var size = cprPromptBaseUri.length;
            
            if(cprPromptBaseUri.charAt(size-1)!='/') {
                cprPromptBaseUri = cprPromptBaseUri+'/';
            }
            if(cprPromptBaseUri.charAt(0)=='/') {
                cprPromptBaseUri = cprPromptBaseUri.slice(1);
            }
             applicationpromptsdirectory = applicationpromptsdirectory + cprPromptBaseUri;
        }
        args.cprPromptPath = applicationpromptsdirectory;
        args.applicationpromptsdirectory = applicationpromptsdirectory;
    } 
    
    return args;
}

