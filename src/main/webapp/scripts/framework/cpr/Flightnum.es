
//   Flight Constants
var FLIGHT_PAUSE_PRE_CPR = "silence.flight.precpr";
var FLIGHT_PAUSE_POST_CPR = "silence.flight.postcpr";
    
var LABEL_ZERO = "flight.zero";
var LABEL_DIGITS = "flight.digits";
var LABEL_NATNUM = "flight.natnum";
var LABEL_HUNDREDS = "flight.hundreds";
var LABEL_THOUSANDS = "flight.thousands";
    
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

function loadFlightnum (args) {

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
*   args.intonation (for final digit)   MEDIAL
*   args.playNatnumPairs                "true"	// Passed as a string (not boolean value) from jsp pages
*   args.playHundreds                   "true"	// Passed as a string (not boolean value) from jsp pages
*   args.playThousands                  "true"	// Passed as a string (not boolean value) from jsp pages
*
*   args.flightnumString                   REQUIRED
*
***********************************************************************************/

function CPRFlightnumDynamicPrompt(args)
{
    return CPRFlightnum(args);
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
*   args.intonation (for final digit)   MEDIAL
*   args.playNatnumPairs                "true"  // Passed as a string (not boolean value) from jsp pages
*   args.playHundreds                   "true"  // Passed as a string (not boolean value) from jsp pages
*   args.playThousands                  "true"  // Passed as a string (not boolean value) from jsp pages
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

function CPRFlightnumAudioServiceConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.flightnumString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.flightnumString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.flightnumString = args.value.MEANING;
        else
            args.flightnumString = args.value ;
    }
    
    // Make sure we have a flight number String
    if (typeof args.flightnumString == 'undefined' || args.flightnumString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.flightnumString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.flightnumString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.flightnumString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.flightnumString = args.value ;
        }
    }
    
    return CPRFlightnum(formatFlightnumAudioServiceConfiguration(args));
    
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
*   args.intonation (for final digit)   MEDIAL
*   args.playNatnumPairs                "true"	// Passed as a string (not boolean value) from jsp pages
*   args.playHundreds                   "true"	// Passed as a string (not boolean value) from jsp pages
*   args.playThousands                  "true"	// Passed as a string (not boolean value) from jsp pages
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

function CPRFlightnumConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.flightnumString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.flightnumString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.flightnumString = args.value.MEANING;
        else
            args.flightnumString = args.value ;
    }
    
    // Make sure we have a flight number String
    if (typeof args.flightnumString == 'undefined' || args.flightnumString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.flightnumString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.flightnumString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.flightnumString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.flightnumString = args.value ;
        }
    }
    
    return CPRFlightnum(args);
    
}

/***********************************************************************************
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation (for final digit)   MEDIAL
*   args.playNatnumPairs                "true"  // Passed as a string (not boolean value) from jsp pages
*   args.playHundreds                   "true"  // Passed as a string (not boolean value) from jsp pages
*   args.playThousands                  "true"  // Passed as a string (not boolean value) from jsp pages
*
*   args.flightnumString                   REQUIRED
*
***********************************************************************************/ 

function CPRFlightnumAudioService(args) 
{
    return CPRFlightnum(formatFlightnumAudioServiceConfiguration(args));
}

/***********************************************************************************
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation (for final digit)   MEDIAL
*   args.playNatnumPairs                "true"	// Passed as a string (not boolean value) from jsp pages
*   args.playHundreds                   "true"	// Passed as a string (not boolean value) from jsp pages
*   args.playThousands                  "true"	// Passed as a string (not boolean value) from jsp pages
*
*   args.flightnumString                   REQUIRED
*
***********************************************************************************/ 

function CPRFlightnum (args) 
{

    // Result object
    var prompts = new Object();
    
    // Initialize the prompts array 
    prompts.audio = new Array();
    prompts.tts = new Array();
    
    var directory = args.applicationpromptsdirectory;
    var confValue = args.flightnumString ;
    cprPromptPath = args.cprPromptPath ;
    fileExtension = args.fileExtension ;
    var tone = args.intonation ;
    var playNatnumPairs = args.playNatnumPairs;
    var playHundreds = args.playHundreds;
    var playThousands = args.playThousands;
    
    // Fill in defaults for unsupplied vars
            
    if ( cprPromptPath == null  || cprPromptPath == '')  
    {
        cprPromptPath = directory + "/cpr/" ; // default
    }
    
    if (fileExtension == null) 
    {
        fileExtension = PROMPT_WAV ;  // default
    }
    
    if (tone == null) 
    {
        tone = MEDIAL ;  // default
    }
    
    if (playNatnumPairs == null)
    {
        playNatnumPairs = true;
    }
    if (playNatnumPairs == "true")
    {
    	playNatnumPairs = true;	
    }
    if (playNatnumPairs == "false")
    {
    	playNatnumPairs = false;
    }
        
    if (playHundreds == null)
    {
        playHundreds = true;
    }
    if (playHundreds == "true")
    {
    	playHundreds = true;	
    }
    if (playHundreds == "false")
    {
    	playHundreds = false;
    }
        
    if (playThousands == null)
    {
        playThousands = true;
    }
    if (playThousands == "true")
    {
    	playThousands = true;	
    }
    if (playThousands == "false")
    {
    	playThousands = false;
    }
        
    prompts.audio.push(cprPromptPath + FLIGHT_PAUSE_PRE_CPR + fileExtension);
    
    //******** MODIFY THE CODE HERE TO CHANGE WHAT TTS IS RETURNED *******************
    prompts.tts.push(confValue);
    

    var index = 0;
    
    if (confValue.length > 1)
    {
     for (index = 0; index < confValue.length; index++)
     {
        if (confValue.charAt(index) != '0')
        {
            break;
        }
     }
    }
    
    var fNum = confValue.substring(index);
    var length = fNum.length;
    
    if (length == 1)
    {
        if (fNum == "0")
        {
            prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_ZERO + fileExtension);
            prompts.tts.push("");
        }
        else
        {
            prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_DIGITS + fNum + fileExtension);
            prompts.tts.push("");
        }
    }
    else if (length == 2)
    {
        if (playNatnumPairs)
        {
            prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_NATNUM + fNum + fileExtension);
            prompts.tts.push("");                
        }
        else
        {
            prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_DIGITS + fNum + fileExtension);
            prompts.tts.push("");
        }
    }
    else if (length == 3)
    {
        var e = fNum.substring(1,3);
        if ((e == "00") && playHundreds)
        {
            prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_HUNDREDS + fNum + fileExtension);
            prompts.tts.push("");                
        }
        else
        {
            if (playNatnumPairs)
            {
                prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_DIGITS + fNum.substring(0,1) + fileExtension);
                prompts.tts.push("");                     
                prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_NATNUM + fNum.substring(1,3) + fileExtension);
                prompts.tts.push("");                     
            }
            else
            {
                prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_DIGITS + fNum.substring(0,1) + fileExtension);
                prompts.tts.push("");                     
                prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_DIGITS + fNum.substring(1,3) + fileExtension);
                prompts.tts.push("");  
            }
        }
    }
    else // length is 4
    {
        var e = fNum.substring(1,4);
        if ((e == "000") && playThousands)
        {
            prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_THOUSANDS + fNum + fileExtension);
            prompts.tts.push("");                 
        }
        else
        {
            if (playNatnumPairs)
            {
                prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_NATNUM + fNum.substring(0,2) + fileExtension);
                prompts.tts.push("");                     
                prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_NATNUM + fNum.substring(2,4) + fileExtension);
                prompts.tts.push("");                     
            }
            else
            {  
                prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_DIGITS + fNum.substring(0,2) + fileExtension);
                prompts.tts.push("");                     
                prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_DIGITS + fNum.substring(2,4) + fileExtension);
                prompts.tts.push("");                                    
            }
        }
    }
    
    prompts.audio.push(cprPromptPath + FLIGHT_PAUSE_POST_CPR + fileExtension);
    prompts.tts.push("");
          
    return prompts;
  
}  // end of CPRFlightnum



function formatFlightnumAudioServiceConfiguration(args) {
    args = buildFlightnumPromptUrl(args);
    
    return args;
}


function buildFlightnumPromptUrl(args) {
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

