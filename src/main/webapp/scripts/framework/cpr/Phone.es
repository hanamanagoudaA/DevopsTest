
//   Phone Constants
var PHONE_PAUSE_PRE_CPR = "silence.phone.precpr";
var PHONE_PAUSE_POST_CPR = "silence.phone.postcpr";   
var PHONE_PAUSE1 = "silence.phone.pause1";
var PHONE_PAUSE2 = "silence.phone.pause2";
var PHONE_PAUSE3 = "silence.phone.pause3";

var LABEL_DIGIT = "digits";
var EXCEPTION_A = "digits.tollfree1-";
var EXCEPTION_B = "digits.hundreds";
var EXCEPTION_C = "digits.thousands";
    
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

function loadPhone (args) {

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
*   args.playOne                        "true"	// Passed as a string (not boolean value) from jsp pages
*   args.playTollFree                   "true"	// Passed as a string (not boolean value) from jsp pages
*   args.playThousands                  "true"	// Passed as a string (not boolean value) from jsp pages
*
*   args.phoneString                   REQUIRED
*
***********************************************************************************/

function CPRPhoneDynamicPrompt(args)
{
    return CPRPhone(args);
}

/***********************************************************************************
*
*   For use by confirmation prompts in OSDMs
*
*   This method accepts phone numbers in the format returned by the OSDM.
*   Ie. 5556789999 or 8005551234.  It does not handle return values which
*   represent phone numbers with extensions (8005551234x789), nor does
*   it handle 411, 911, etc. 
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation (for final digit)   MEDIAL
*   args.playOne                        "true"  // Passed as a string (not boolean value) from jsp pages
*   args.playTollFree                   "true"  // Passed as a string (not boolean value) from jsp pages
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

function CPRPhoneConfirmationAudioService(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.phoneString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.phoneString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.phoneString = args.value.MEANING;
        else
            args.phoneString = args.value ;
    }
    
    // Make sure we have a digitsString
    if (typeof args.phoneString == 'undefined' || args.phoneString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.phoneString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.phoneString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.phoneString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.phoneString = args.value ;
        }
    }
    
    // Convert the string to the format expected for CPRPhone (X-XXX-XXX-XXXX)
    if (args.phoneString.length != 10)
    {
        // Not in the correct format, will be played as TTS
        var prompts = new Object();
        prompts.audio = new Array();
        prompts.tts = new Array();
        prompts.audio.push("invalid_format_" + args.phoneString);
        prompts.tts.push(args.phoneString);
        return prompts;
    }
    
    var groupA = args.phoneString.substr(0,3);
    var groupB = args.phoneString.substr(3,3);
    var groupC = args.phoneString.substr(6,4);
    args.phoneString = "1-" + groupA + "-" + groupB + "-" + groupC;
    return CPRPhone(formatPhoneAudioServiceConfiguration(args));
    
}

/***********************************************************************************
*
*   For use by confirmation prompts in OSDMs
*
*	This method accepts phone numbers in the format returned by the OSDM.
* 	Ie. 5556789999 or 8005551234.  It does not handle return values which
* 	represent phone numbers with extensions (8005551234x789), nor does
*	it handle 411, 911, etc. 
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation (for final digit)   MEDIAL
*   args.playOne                        "true"	// Passed as a string (not boolean value) from jsp pages
*   args.playTollFree                   "true"	// Passed as a string (not boolean value) from jsp pages
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

function CPRPhoneConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.phoneString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.phoneString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.phoneString = args.value.MEANING;
        else
            args.phoneString = args.value ;
    }
    
    // Make sure we have a digitsString
    if (typeof args.phoneString == 'undefined' || args.phoneString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.phoneString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.phoneString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.phoneString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.phoneString = args.value ;
        }
    }
    
    // Convert the string to the format expected for CPRPhone (X-XXX-XXX-XXXX)
    if (args.phoneString.length != 10)
    {
   		// Not in the correct format, will be played as TTS
    	var prompts = new Object();
	    prompts.audio = new Array();
	    prompts.tts = new Array();
	    prompts.audio.push("invalid_format_" + args.phoneString);
    	prompts.tts.push(args.phoneString);
    	return prompts;
    }
    
    var groupA = args.phoneString.substr(0,3);
    var groupB = args.phoneString.substr(3,3);
    var groupC = args.phoneString.substr(6,4);
    args.phoneString = "1-" + groupA + "-" + groupB + "-" + groupC;
    return CPRPhone(args);
    
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
*   args.playOne                        "true"  // Passed as a string (not boolean value) from jsp pages
*   args.playTollFree                   "true"  // Passed as a string (not boolean value) from jsp pages
*   args.playThousands                  "true"  // Passed as a string (not boolean value) from jsp pages
*
*   args.phoneString                   REQUIRED
*
***********************************************************************************/  

function CPRPhoneAudioService (args) 
{
    return CPRPhone(formatPhoneAudioServiceConfiguration(args));
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
*   args.playOne                        "true"	// Passed as a string (not boolean value) from jsp pages
*   args.playTollFree                   "true"	// Passed as a string (not boolean value) from jsp pages
*   args.playThousands                  "true"	// Passed as a string (not boolean value) from jsp pages
*
*   args.phoneString                   REQUIRED
*
***********************************************************************************/  

function CPRPhone (args) 
{

    // Result object
    var prompts = new Object();
    
    // Initialize the prompts array 
    prompts.audio = new Array();
    prompts.tts = new Array();
    
    var directory = args.applicationpromptsdirectory;
    var confValue = args.phoneString ;
    cprPromptPath = args.cprPromptPath ;
    fileExtension = args.fileExtension ;
    var intonation = args.intonation ;
    var playOne = args.playOne;
    var playTollFree = args.playTollFree;
    var playThousands = args.playThousands;
    
    // Fill in defaults for unsupplied vars
            
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
        intonation = MEDIAL ;  // default
    }
    
    if (playOne == null)
    {
        playOne = true;
    }
    if (playOne == "true")
    {
    	playOne = true;	
    }
    if (playOne == "false")
    {
    	playOne = false;
    }
    
    if (playTollFree == null)
    {
        playTollFree = true;
    }
    if (playTollFree == "true")
    {
    	playTollFree = true;	
    }
    if (playTollFree == "false")
    {
    	playTollFree = false;
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
       
    prompts.audio.push(cprPromptPath + PHONE_PAUSE_PRE_CPR + fileExtension);
    
    //******** MODIFY THE CODE HERE TO CHANGE WHAT TTS IS RETURNED *******************
    prompts.tts.push(confValue);
    
    var group1 = "";
    var group2 = "";
    var group3 = "";
    var group4 = "";
    
    var phoneGroups = confValue.split("-");
        
    group1 = phoneGroups[0]; 
    group2 = phoneGroups[1];
    group3 = phoneGroups[2];
    group4 = phoneGroups[3];
           

        
    var digitGroups = confValue.split(/[- ]/) ; // split into groups by space or hyphen

    playGroupsOneandTwo(prompts, group1, group2, playOne, playTollFree);
    prompts.audio.push(cprPromptPath + PHONE_PAUSE2 + fileExtension);
    prompts.tts.push("");
    prompts.audio.push(cprPromptPath + "3" + INTONATION[MEDIAL] + LABEL_DIGIT + group3 + fileExtension);
    prompts.tts.push("");
    prompts.audio.push(cprPromptPath + PHONE_PAUSE3 + fileExtension);
    prompts.tts.push("");
    playGroupsFour(prompts, group4, playThousands, intonation);
    
    prompts.audio.push(cprPromptPath + PHONE_PAUSE_POST_CPR + fileExtension);
    prompts.tts.push("");
    
    return prompts;
  
}  // end of CPRPhone


function playGroupsOneandTwo(prompts, group1, group2, playOne, playTollFree) 
{

    if (playOne)
    {
        if ((playTollFree) && ((group2 == "800") || (group2 == "900")))
        {
            playException(prompts, EXCEPTION_A, group2, RISING);
        }
        else
        {
            prompts.audio.push(cprPromptPath + "1" + INTONATION[RISING] + LABEL_DIGIT + group1 + fileExtension);
            prompts.tts.push("");
            prompts.audio.push(cprPromptPath + PHONE_PAUSE1 + fileExtension);
            prompts.tts.push("");
            prompts.audio.push(cprPromptPath + "3" + INTONATION[MEDIAL] + LABEL_DIGIT + group2 + fileExtension);
            prompts.tts.push("");
        }
    }
    else
    {    
        if ((playTollFree) && ((group2 == "800") || (group2 == "900")))
        {
            playException(prompts, EXCEPTION_B, group2, RISING);
        }
        else
        {
            prompts.audio.push(cprPromptPath + "3" + INTONATION[MEDIAL] + LABEL_DIGIT + group2 + fileExtension);
            prompts.tts.push("");
        }        
    }
}

function playGroupsFour(prompts, group4, playThousands, tone) 
{

    var group4a = group4.substr(0,2);
    var group4b = group4.substr(2,4);
    
    if (playThousands)
    {
        if ((group4 == "1000") || (group4 == "2000") || (group4 == "3000") || (group4 == "4000") || (group4 == "5000") || (group4 == "6000") || (group4 == "7000") || (group4 == "8000") || (group4 == "9000"))
        {
            playException(prompts, EXCEPTION_C, group4, tone);
        }
        else
        {
            prompts.audio.push(cprPromptPath + "2" + INTONATION[MEDIAL] + LABEL_DIGIT + group4a + fileExtension);
            prompts.tts.push("");
            prompts.audio.push(cprPromptPath + "2" + INTONATION[tone] + LABEL_DIGIT + group4b + fileExtension);
            prompts.tts.push("");            
        }
    }
    else
    {    
        prompts.audio.push(cprPromptPath + "2" + INTONATION[MEDIAL] + LABEL_DIGIT + group4a + fileExtension);
        prompts.tts.push("");
        prompts.audio.push(cprPromptPath + "2" + INTONATION[tone] + LABEL_DIGIT + group4b + fileExtension);
        prompts.tts.push(""); 
    }
}
    
function playException(prompts, exception, group, tone)
{
    prompts.audio.push(cprPromptPath + INTONATION[tone] + exception + group + fileExtension);
    prompts.tts.push("");
}


function formatPhoneAudioServiceConfiguration(args) {
    args = buildPhonePromptUrl(args);
    
    return args;
}


function buildPhonePromptUrl(args) {
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

