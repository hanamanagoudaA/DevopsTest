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

// Currency Constants
var CURRENCY_CONSTANTS = new Object();
CURRENCY_CONSTANTS.LABEL_AND_CENTS = "currency.andcents";
CURRENCY_CONSTANTS.LABEL_JUST_CENTS = "currency.cents";
CURRENCY_CONSTANTS.DATIVEJUSTCENTS = "currency.cents01dative";
CURRENCY_CONSTANTS.DATIVEANDCENTS = "currency.andcents01dative";
    
CURRENCY_CONSTANTS.ZERODOLLARS = "currency.zerodollars";
CURRENCY_CONSTANTS.DEDOLARES = "currency.dedolares";
CURRENCY_CONSTANTS.DATIVEUNITS = "currency.dollars01dative";
CURRENCY_CONSTANTS.DOLLARS = "currency.dollars";
CURRENCY_CONSTANTS.DOLLARS_X = "currency.dollars_x";
    
CURRENCY_CONSTANTS.HUNDREDS = "currency.hundreds";
CURRENCY_CONSTANTS.HUNDREDSAND = "currency.hundredsand";
CURRENCY_CONSTANTS.HUNDREDS_X = "currency.hundreds_x";
    
CURRENCY_CONSTANTS.THOUSANDS = "currency.thousands";
CURRENCY_CONSTANTS.THOUSANDS_X = "currency.thousands_x";
CURRENCY_CONSTANTS.MILLIONS = "currency.millions";
CURRENCY_CONSTANTS.DATIVEMILLIONS = "currency.millions01dative";
CURRENCY_CONSTANTS.HASCENTS;

CURRENCY_CONSTANTS.PAUSE_PRE_CPR = "silence.currency.precpr";
CURRENCY_CONSTANTS.PAUSE_POST_CPR = "silence.currency.postcpr";
CURRENCY_CONSTANTS.PAUSE = "silence.currency";

function loadCurrency (args) 
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
*   args.playZeroDollars                REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.playZeroCents                  REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*   args.currencyString                 REQUIRED
*
***********************************************************************************/

function CPRCurrencyDynamicPrompt(args)
{
    return CPRCurrency(args);
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
*   args.playZeroDollars                REQUIRED    // Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.playZeroCents                  REQUIRED    // Passed as a string (not boolean value) from jsp pages ("true" or "false")
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

function CPRCurrencyAudioServiceConfirmation(args)
{
    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.currencyString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.currencyString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.currencyString = args.value.MEANING;
        else
            args.currencyString = args.value ;
    }
    
    // Make sure we have a currencyString
    if (typeof args.currencyString == 'undefined' || args.currencyString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.currencyString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.currencyString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.currencyString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.currencyString = args.value ;
        }
    }
    
    var confValue = args.currencyString;
    if ( confValue != null && confValue != '' )     
    {
        if(confValue.charAt(0)=='-') {
            confValue = confValue.slice(1);
            args.currencyString = confValue;
        }
    }
    
    
    return CPRCurrency(formatCurrencyAudioServiceConfiguration(args));
    
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
*   args.playZeroDollars                REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.playZeroCents                  REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
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

function CPRCurrencyConfirmation(args)
{
    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.currencyString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.currencyString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.currencyString = args.value.MEANING;
        else
            args.currencyString = args.value ;
    }
    
    // Make sure we have a currencyString
    if (typeof args.currencyString == 'undefined' || args.currencyString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.currencyString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.currencyString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.currencyString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.currencyString = args.value ;
        }
    }
    
    return CPRCurrency(args);
    
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
*   args.playZeroDollars                REQUIRED    // Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.playZeroCents                  REQUIRED    // Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*   args.currencyString                 REQUIRED
*
***********************************************************************************/

function CPRCurrencyAudioService(args)
{
    var confValue = args.currencyString;
    if ( confValue != null && confValue != '' )     
    {
        if(confValue.charAt(0)=='-') {
            confValue = confValue.slice(1);
            args.currencyString = confValue;
        }
    }
    
    return CPRCurrency(formatCurrencyAudioServiceConfiguration(args));
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
*   args.playZeroDollars                REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.playZeroCents                  REQUIRED	// Passed as a string (not boolean value) from jsp pages ("true" or "false")
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*   args.currencyString                 REQUIRED
*
***********************************************************************************/

function CPRCurrency(args)
{
    var bPlayZeroDollars = args.playZeroDollars;
    var bPlayZeroCents = args.playZeroCents;
    var intonation = args.intonation;
    var directory = args.applicationpromptsdirectory;
    var confValue = args.currencyString;
    var language = args.language ;
    cprPromptPath = args.cprPromptPath ;
    fileExtension = args.fileExtension ;
    var intonation = args.intonation ;
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
        fileExtension = PROMPT_WAV ;  // default
    }
    
    if (intonation == null) 
    {
        intonation = MEDIAL;  // default
    }
    
    if (CASE == null)
    {
        CASE = NOMINATIVE;
    }

    if (bPlayZeroDollars == "true")
    {
    	bPlayZeroDollars = true;	
    }
    if (bPlayZeroDollars == "false")
    {
    	bPlayZeroDollars = false;
    }

    if (bPlayZeroCents == "true")
    {
    	bPlayZeroCents = true;	
    }
    if (bPlayZeroCents == "false")
    {
    	bPlayZeroCents = false;
    }
            
    var num = new Object();
    
    
    //Set Globals
    LANGUAGE = language;
    
    var dot_position = confValue.indexOf(".");
    var num = new Object();
    //if there is a number and cents
    if(dot_position  > 0) 
    {
        num.dollars = confValue.substring(0, dot_position);
        num.cents = confValue.substring(dot_position+1);
        
        var number = num.dollars;
        
        //if cents only has one character convert it to two(123.1-->123.10)
        if (num.cents.toString().length < 2) 
        {
            num.cents = num.cents + "0";
        }
        //if cents has more than two characters (0.00999 --> 0.00)
        if (num.cents.toString().length>2) 
        {
        num.cents = num.cents.substr(0,2);
        }
    }
    //if there is just a cents
    else if(dot_position == 0) 
    {
        num.cents = confValue.substring(1);
        num.dollars = 0;
        //if cents only has one character convert it to two(123.1-->123.10)
        if (num.cents.toString().length < 2) 
        {
            num.cents = num.cents + "0";
        }
        //if cents has more than two characters (0.00999 --> 0.00)
        if (num.cents.toString().length>2) 
        {
            num.cents = num.cents.substr(0,2);
        }
    }
    //else just a whole number
    else 
    {
        num.dollars = confValue;
        num.cents = 0;
    }
  
    //begin playback calls
    if ( ( num.cents == 0 ) && (! bPlayZeroCents ) )
    {
        //there are no cents
        CURRENCY_CONSTANTS.HASCENTS = false;
    }
    else
    {
        //there are cents
        CURRENCY_CONSTANTS.HASCENTS=true;
    }
    
    //call playdollars and playcents
    prompts.audio.push(cprPromptPath + CURRENCY_CONSTANTS.PAUSE_PRE_CPR + fileExtension);
    
    //******** MODIFY THE CODE HERE TO CHANGE WHAT TTS IS RETURNED *******************
    prompts.tts.push (confValue);        
    
    prompts = playDollars(prompts, num, bPlayZeroDollars, intonation);
    prompts = playCents(prompts, num, bPlayZeroDollars, bPlayZeroCents, intonation);
    
    prompts.audio.push(cprPromptPath + CURRENCY_CONSTANTS.PAUSE_POST_CPR + fileExtension);
    prompts.tts.push ("");        
    
    return prompts;
    
}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*
* Function: playDollars                                                                                                        
* Effects:    This function generates the vector of prompts to be played                        
*                  back given an input, spliting the dollar input into chunks                             
*                  and calling the approrpriate functions.                                                           
* Returns:  nothing                                                                                                                
* Table:    This code corresponds to table "Splitting $dollars into groups"                   
*                 and "Table 2: Rules for PLAYdollars"                                                              
*                 in the Algorithm document                                                                                 
*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*/

function playDollars(prompts, num, bPlayZeroDollars, intonation)  
{
    
    var temp_number;
    var temp;
    
    var hundred_millions = 0; //digit 9
    var millions = 0;  //digit 8
    var hundred_thousands = 0; //digit 6
    var thousands = 0; //digit 5
    var hundreds = 0; //digit 3
    var tens = 0; //digit 2
    
    temp_number = num.dollars;// note: removes and fraction in conversion
    
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
    
    /*  The code below this point follows the rules outlined in table 2 of the algorithm */
    
    //handle case where value has only millions (e.g. 1,000,000 or 999,000,000)
    if( (millions>0 || hundred_millions>0) &&
    	(thousands == 0 && hundred_thousands == 0) &&
    	(hundreds == 0 && tens ==0)){
        
        //play millions as normal
        prompts = playMillionsOfDollars(prompts, hundred_millions, millions);
        
        
        //if it is the following languages, use exception
        if((LANGUAGE == CPR.ES_US) ||
            (LANGUAGE == CPR.FR_CA) ||
            (LANGUAGE == CPR.PT_BR))
            
            //play dollars exception
            prompts = playUnitsOfDollars_X(prompts, intonation);
        
        //if it is the following languages use normal playback
        else if(LANGUAGE == CPR.EN_US ||
                LANGUAGE == CPR.EN_UK ||
                LANGUAGE == CPR.EN_AU ||
                LANGUAGE == CPR.DE_DE)
            prompts = playUnitsOfDollars(prompts, hundreds, tens, intonation);
        //else it is an undefined language, use normal playback
        else
            prompts = playUnitsOfDollars(prompts, hundreds, tens, intonation);
    }//end case (e.g. 1,000,000)
    
    //follow subsequent playback rules
    else if(millions>0 || hundred_millions>0) {
        
        //play millions
        prompts = playMillionsOfDollars(prompts, hundred_millions, millions);

        //only play thousands if there is a thousands unit (not 000)
        if(thousands>0 || hundred_thousands>0){
            prompts = playThousandsOfDollars(prompts, hundred_thousands, thousands);                
        }
        //play units as normal
        prompts = playUnitsOfDollars(prompts,hundreds, tens, intonation);
    }

    //if there is no millions but there is thousands
    else if(thousands>0 || hundred_thousands>0){
        //play thousands
        prompts = playThousandsOfDollars(prompts, hundred_thousands, thousands);
        
        //play units
        prompts = playUnitsOfDollars(prompts,hundreds, tens, intonation);
    }
    else if(tens == 1 && hundreds == 0)
    {
        //play units
        playOneDollar(prompts, intonation);
    }
           
    //only units, just play them
    else if(hundreds>0 || tens>0){
        //play units
        prompts = playUnitsOfDollars(prompts,hundreds, tens, intonation);
    }
    //dollar is zero
    else {
        if(bPlayZeroDollars) {
            prompts = playZeroDollars(prompts, intonation);
        }
        //else don't play any prompts
    }
    return prompts;
}

function playMillionsOfDollars(prompts, hundred_millions, millions) {
    prompts = playHundredsOfDollars(prompts,hundred_millions,millions);
    prompts = playTensOfDollars(prompts,millions,CURRENCY_CONSTANTS.MILLIONS,MEDIAL);
    return prompts;
}

function playThousandsOfDollars(prompts, hundred_thousands, thousands)  {
    prompts = playHundredsOfDollars(prompts,hundred_thousands,thousands);
    if ((hundred_thousands == 0) && (thousands == 1))
    {
        prompts = playCurrencyException(prompts, CURRENCY_CONSTANTS.THOUSANDS_X, MEDIAL);
    }
    else
    {
        prompts = playTensOfDollars(prompts,thousands,CURRENCY_CONSTANTS.THOUSANDS,MEDIAL);
    }
    return prompts;  
}

function playUnitsOfDollars(prompts, hundreds, tens, intonation)    {
    prompts = playHundredsOfDollars(prompts, hundreds, tens);
    prompts = playTensOfDollars(prompts,tens, CURRENCY_CONSTANTS.DOLLARS,intonation);
    return prompts;
}

function playOneDollar(prompts, intonation) {
    prompts = playCurrencyException(prompts, CURRENCY_CONSTANTS.DOLLARS_X, intonation);
    return prompts;
}

function playZeroDollars(prompts, intonation)    {
    prompts = playCurrencyException(prompts, CURRENCY_CONSTANTS.ZERODOLLARS, intonation);
    return prompts;
}

function playUnitsOfDollars_X(prompts, intonation) {
    prompts = playCurrencyException(prompts, CURRENCY_CONSTANTS.DEDOLARES, intonation);
    return prompts;
}

function playHundredsOfDollars(prompts, hundreds, tens) {

    //if it one of hte below languages, follow default playback
    if(LANGUAGE == CPR.EN_US ||
    LANGUAGE == CPR.FR_CA) {
    	prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + CURRENCY_CONSTANTS.HUNDREDS + hundreds + fileExtension);
    	prompts.tts.push ("");
    }
    
    //if it is one of the below langauges, follow rules for hundreds AND or hundreds
    else if(LANGUAGE==CPR.EN_UK ||
    LANGUAGE == CPR.EN_AU ||
    LANGUAGE == CPR.DE_DE ) {
        //if there is a tens unit (e.g. 293)
        if(tens!=0){
          prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + CURRENCY_CONSTANTS.HUNDREDSAND + hundreds + fileExtension);
    			prompts.tts.push ("");
        //if there is no tens unit (e.g. 200)
        }else{
        	prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + CURRENCY_CONSTANTS.HUNDREDS + hundreds + fileExtension);
    			prompts.tts.push ("");
				}
    }
        
    else if(LANGUAGE == CPR.PT_BR) {
        //if there is a tens unit (e.g. 293)
        if(tens!=0){
        	prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + CURRENCY_CONSTANTS.HUNDREDSAND + hundreds + fileExtension);
    			prompts.tts.push ("");
        }else if(hundreds==1){
		    	prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + CURRENCY_CONSTANTS.HUNDREDS_X + fileExtension);
		    	prompts.tts.push ("");
        }else{
        	prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + CURRENCY_CONSTANTS.HUNDREDS + hundreds + fileExtension);
    			prompts.tts.push ("");
    		}
    }
    
    else if(LANGUAGE == CPR.ES_US) {
        //if the input is 100
        if((tens==0) && (hundreds==1)) {
        	prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + CURRENCY_CONSTANTS.HUNDREDS_X + fileExtension);
		    	prompts.tts.push ("");
        }
        //input is not one hundred
        else {
        	prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + CURRENCY_CONSTANTS.HUNDREDS + hundreds + fileExtension);
    			prompts.tts.push ("");
        }
    }
    //undefined language uses default playback
    else{
    		prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + CURRENCY_CONSTANTS.HUNDREDS + hundreds + fileExtension);
    		prompts.tts.push ("");
    }
    return prompts;

}

function playTensOfDollars(prompts, tens, prefix, intonation) {   
    
    //if it is one digits (e.g. 103 --> tens=3) pad with zero (3-->03)
    if(tens.toString().length<2){
        tens = "0" + tens;
    }
    
    //clone the object
    var inton = intonation;
    if(CURRENCY_CONSTANTS.HASCENTS) inton = MEDIAL;
            
    if(LANGUAGE == CPR.DE_DE && CASE == DATIVE && tens == "01") {
        //units case for german 01
        if(prefix == CURRENCY_CONSTANTS.DOLLARS) {
            prompts = playDativeTensUnitsOfDollars(prompts, inton);
        }
        //millions case for german 01
        else if(prefix == CURRENCY_CONSTANTS.MILLIONS) {
            prompts = playDativeTensMillionsOfDollars(prompts, MEDIAL);
        }
        //thousands case for german 01
        else {
        	prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + prefix + tens + fileExtension);
    			prompts.tts.push ("");
        }
    }
    
    //all other languages, playing units part (need to pass intonation here because
    //units might be last prompt
    else if( prefix == CURRENCY_CONSTANTS.DOLLARS){
    	prompts.audio.push(cprPromptPath + INTONATION[inton] + prefix + tens + fileExtension);
    	prompts.tts.push ("");
        //not units part, will always be medial (millions & thousands never final)
    }else{
    	prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + prefix + tens + fileExtension);
    	prompts.tts.push ("");
   	}
    return prompts;
}

function playDativeTensUnitsOfDollars(prompts, intonation)  {
	prompts.audio.push(cprPromptPath + INTONATION[intonation] + CURRENCY_CONSTANTS.DATIVEUNITS + fileExtension);
	prompts.tts.push ("");
	return prompts;
}

function playDativeTensMillionsOfDollars(prompts, intonation)    {
	prompts.audio.push(cprPromptPath + INTONATION[intonation] + CURRENCY_CONSTANTS.DATIVEMILLIONS + fileExtension);
	prompts.tts.push ("");
	return prompts;
}

function playCurrencyException(prompts, exception, intonation)   {
	//if cents promt will be played (exception not final prompt in phrase)
	
	var inton = intonation;
	if(CURRENCY_CONSTANTS.HASCENTS)  inton = MEDIAL;
	prompts.audio.push(cprPromptPath + INTONATION[inton] + exception + fileExtension);
	prompts.tts.push ("");
	return prompts;
}

function playCents(prompts, num, bPlayZeroDollars, bPlayZeroCents, intonation)   {
  
    //if the cents is one digit (123.04 --> cents=4) we need to pad it with a 0 (4-->04);
    if(num.cents.toString().length<2)
        num.cents = "0" + num.cents;

	//  If dollars = 0
    if(num.dollars==0) 
    {
        // and cents = 0
        if (num.cents==0)
        {
            // If  playZeroDollars is true and bPlayZeroCents is true, then play the 'and' cents
            if (bPlayZeroDollars && bPlayZeroCents)
            {
                prompts.audio.push(cprPromptPath + CURRENCY_CONSTANTS.PAUSE + fileExtension);
                prompts.tts.push ("");        
                prompts = playAndCents(prompts, num.cents, intonation);
            }
        }
        else // (cents > 0)
        {
            // If  playZeroDollars is true then play the 'and' cents
            if (bPlayZeroDollars)
            {
                prompts.audio.push(cprPromptPath + CURRENCY_CONSTANTS.PAUSE + fileExtension);
                prompts.tts.push ("");        
                prompts = playAndCents(prompts, num.cents, intonation);
            }
            // If playZeroDollars is false, then play the 'just' cents
            else
            {
                playJustCents(prompts, num.cents, intonation);              
            }
        }
    }
    else // dollars > 0
    {
        // If cents = 0 
        if (num.cents==0)
        {
            // If playZeroCents then play 'and' cents
            if (bPlayZeroCents)
            {
                prompts.audio.push(cprPromptPath + CURRENCY_CONSTANTS.PAUSE + fileExtension);
                prompts.tts.push ("");        
                prompts = playAndCents(prompts, num.cents, intonation);
            }
        }    
        else // if cents > 0 then play 'and' cents
        {
            prompts.audio.push(cprPromptPath + CURRENCY_CONSTANTS.PAUSE + fileExtension);
            prompts.tts.push ("");        
            prompts = playAndCents(prompts, num.cents, intonation);
        }                
    }
            
    return prompts;
}

function playAndCents(prompts, cents, intonation)  {
    if(LANGUAGE == CPR.DE_DE && CASE == DATIVE && cents == "01"){
			prompts.audio.push(cprPromptPath + INTONATION[intonation] + CURRENCY_CONSTANTS.DATIVEANDCENTS + fileExtension);
			prompts.tts.push ("");        
    }else{
			prompts.audio.push(cprPromptPath + INTONATION[intonation] + CURRENCY_CONSTANTS.LABEL_AND_CENTS + cents + fileExtension);
			prompts.tts.push ("");
    }
    return prompts;
}

function playJustCents(prompts, cents, intonation)    {
    if(LANGUAGE == CPR.DE_DE && CASE == DATIVE && cents =="01"){
			prompts.audio.push(cprPromptPath + INTONATION[intonation] + CURRENCY_CONSTANTS.DATIVEJUSTCENTS + fileExtension);
			prompts.tts.push ("");
    }else{
			prompts.audio.push(cprPromptPath + INTONATION[intonation] + CURRENCY_CONSTANTS.LABEL_JUST_CENTS + cents + fileExtension);
			prompts.tts.push ("");
    }
    return prompts;
}


function formatCurrencyAudioServiceConfiguration(args) {
    args = buildCurrencyPromptUrl(args);
    
    return args;
}


function buildCurrencyPromptUrl(args) {
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

