
//   Street Constants
var STREET_PAUSE_PRE_CPR = "silence.natnum.precpr";
var STREET_PAUSE_POST_CPR = "silence.natnum.postcpr";
    
var LABEL_ZERO = "natnum.zerounits";
var LABEL_NATNUM = "natnum.units";
var LABEL_OH = "natnum.unitsoh";
var LABEL_HUNDREDS = "natnum.hundred";
    
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

function loadStreetnum (args) {

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
*   args.streetnumString                   REQUIRED
*
***********************************************************************************/

function CPRStreetnumDynamicPrompt(args)
{
    return CPRStreetnum(args);
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

function CPRStreetnumAudioServiceConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.streetnumString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.streetnumString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.streetnumString = args.value.MEANING;
        else
            args.streetnumString = args.value ;
    }
    
    // Make sure we have a street number String
    if (typeof args.streetnumString == 'undefined' || args.streetnumString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.streetnumString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.streetnumString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.streetnumString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.streetnumString = args.value ;
        }
    }
    
    return CPRStreetnum(formatStreetnumAudioServiceConfiguration(args));
    
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

function CPRStreetnumConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.streetnumString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.streetnumString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.streetnumString = args.value.MEANING;
        else
            args.streetnumString = args.value ;
    }
    
    // Make sure we have a street number String
    if (typeof args.streetnumString == 'undefined' || args.streetnumString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.streetnumString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.streetnumString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.streetnumString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.streetnumString = args.value ;
        }
    }
    
    return CPRStreetnum(args);
    
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
*   args.streetnumString                   REQUIRED
*
***********************************************************************************/ 

function CPRStreetnumAudioService(args) 
{
    return CPRStreetnum(formatStreetnumAudioServiceConfiguration(args));
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
*   args.streetnumString                   REQUIRED
*
***********************************************************************************/ 

function CPRStreetnum (args) 
{

    // Result object
    var prompts = new Object();
    
    // Initialize the prompts array 
    prompts.audio = new Array();
    prompts.tts = new Array();
    
    var directory = args.applicationpromptsdirectory;
    var confValue = args.streetnumString ;
    cprPromptPath = args.cprPromptPath ;
    fileExtension = args.fileExtension ;
    var tone = args.intonation ;
    
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
          
    prompts.audio.push(cprPromptPath + STREET_PAUSE_PRE_CPR + fileExtension);
    
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
    
    var sNum = confValue.substring(index);
    var length = sNum.length;
    
    if (length == 1)
    {
        if (sNum == "0")
        {
            prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_ZERO + fileExtension);
            prompts.tts.push("");
        }
        else
        {
            prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_NATNUM + "0" + sNum + fileExtension);
            prompts.tts.push("");
        }
    }
    else if (length == 2)
    {
        prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_NATNUM + sNum + fileExtension);
        prompts.tts.push("");
    }
    else if (length == 3)
    {
        if (sNum.substring(1,3) == "00")
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_NATNUM + "0" + sNum.substring(0,1) + fileExtension);
            prompts.tts.push("");
			prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_HUNDREDS + fileExtension);
            prompts.tts.push("");
        }
        else if (sNum.substring(1,2) == "0")
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_NATNUM + "0" + sNum.substring(0,1) + fileExtension);
            prompts.tts.push("");
			prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_OH + sNum.substring(1,3) + fileExtension);
            prompts.tts.push("");
        }
        else
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_NATNUM + "0" + sNum.substring(0,1) + fileExtension);
            prompts.tts.push("");                     
            prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_NATNUM + sNum.substring(1,3) + fileExtension);
            prompts.tts.push("");
        }
    }
    else if (length == 4)
    {
        if (sNum.substring(2,4) == "00")
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_NATNUM + sNum.substring(0,2) + fileExtension);
            prompts.tts.push("");
			prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_HUNDREDS + fileExtension);
            prompts.tts.push("");
        }
		else if (sNum.substring(2,3) == "0")
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_NATNUM + sNum.substring(0,2) + fileExtension);
            prompts.tts.push("");
			prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_OH + sNum.substring(2,4) + fileExtension);
            prompts.tts.push("");
        }
        else
        {
            prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_NATNUM + sNum.substring(0,2) + fileExtension);
            prompts.tts.push("");                     
            prompts.audio.push(cprPromptPath + INTONATION[tone] + LABEL_NATNUM + sNum.substring(2,4) + fileExtension);
            prompts.tts.push("");
        }
    }
    else
	{
		for (var i =0; i < length; i++)
		{
			prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_NATNUM + "0" + sNum.substring(i,i+1) + fileExtension);
			prompts.tts.push("");
		}
	}
	
    
    prompts.audio.push(cprPromptPath + STREET_PAUSE_POST_CPR + fileExtension);
    prompts.tts.push("");
          
    return prompts;
  
}  // end of CPRStreetnum


function formatStreetnumAudioServiceConfiguration(args) {
    args = buildStreetnumPromptUrl(args);
    
    return args;
}

function buildStreetnumPromptUrl(args) {
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