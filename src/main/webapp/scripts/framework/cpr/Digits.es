
//   Digit Constants
var DIGITS_PAUSE_PRE_CPR = "silence.digits.precpr" ;
var DIGITS_PAUSE_POST_CPR = "silence.digits.postcpr" ;
var DIGITS_PAUSE_DEFAULT = "silence.digits.short" ;
var DIGITS_PAUSE_SHORT = "silence.digits.long" ;
var DIGITS_PAUSE_MEDIUM = "silence.digits.long2" ;
var DIGITS_PAUSE_LONG = "silence.digits.long3" ;

var LABEL_DIGIT = "digits";

var PROMPT_ULAW = ".ulaw";
var PROMPT_WAV = ".wav";
var MEDIAL = "MEDIAL";
var RISING = "RISING";
var FINAL = "FINAL";

var INTONATION = new Array();
INTONATION[MEDIAL] = "m.";
INTONATION[RISING] = "r.";
INTONATION[FINAL]  = "f.";

var SHORT = "SHORT";
var MEDIUM = "MEDIUM";
var LONG = "LONG";

var fileExtension = PROMPT_WAV;
var cprPromptPath = "";

function test (args) {

    // Result object
    var prompts = new Object();
    
    // Initialize the prompts array 
    prompts.audio = new Array();
    prompts.tts = new Array();
    
    prompts.audio.push("audio1") ;
    prompts.tts.push ("tts1") ;
    
    return prompts ;

}

function loadDigits (args) {

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
*   args.intonation (for final digit)    MEDIAL
*
*   args.digitsString                   REQUIRED
*
***********************************************************************************/

function CPRDigitsDynamicPrompt(args)
{
    return CPRDigits(args);
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
*   args.intonation (for final digit)    MEDIAL
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

function CPRDigitsAudioServiceConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.digitsString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.digitsString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.digitsString = args.value.MEANING;
        else
            args.digitsString = args.value ;
    }
    
    // Make sure we have a digitsString
    if (typeof args.digitsString == 'undefined' || args.digitsString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.digitsString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.digitsString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.digitsString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.digitsString = args.value ;
        }
    }
    
    return CPRDigits(formatDigitsAudioServiceConfiguration(args));
    
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
*   args.intonation (for final digit)    MEDIAL
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

function CPRDigitsConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.digitsString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.digitsString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.digitsString = args.value.MEANING;
        else
            args.digitsString = args.value ;
    }
    
    // Make sure we have a digitsString
    if (typeof args.digitsString == 'undefined' || args.digitsString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.digitsString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.digitsString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.digitsString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.digitsString = args.value ;
        }
    }
    
    return CPRDigits(args);
    
}

/***********************************************************************************
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation (for final digit)    MEDIAL
*   args.pauseLength (SHORT/MEDIUM/LONG) SHORT                  
*
*   args.digitsString                   REQUIRED
*
***********************************************************************************/  

function CPRDigitsAudioService (args) 
{
    return CPRDigits(formatDigitsAudioServiceConfiguration(args));
}

/***********************************************************************************
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation (for final digit)    MEDIAL
*	args.pauseLength (SHORT/MEDIUM/LONG) SHORT					
*
*   args.digitsString                   REQUIRED
*
***********************************************************************************/  

function CPRDigits (args) 
{

    // Result object
    var prompts = new Object();
    
    // Initialize the prompts array 
    prompts.audio = new Array();
    prompts.tts = new Array();
    
    var directory = args.applicationpromptsdirectory;
    var confValue = args.digitsString ;
    cprPromptPath = args.cprPromptPath ;
    fileExtension = args.fileExtension ;
    var intonation = args.intonation ;
    var pauseLength = args.pauseLength;
    
    // Fill in defaults for unsupplied vars
            
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
        intonation = MEDIAL ;  // default
    }
    
    if (pauseLength == null)
    {
    	pauseLength = SHORT;
    }
    
    prompts.audio.push(cprPromptPath + DIGITS_PAUSE_PRE_CPR + fileExtension);
    
    //******** MODIFY THE CODE HERE TO CHANGE WHAT TTS IS RETURNED *******************
    prompts.tts.push(confValue);
    
    var digitGroups = confValue.split(/[- ]/) ; // split into groups by space or hyphen

   
    for (var i = 0 ; i < digitGroups.length ; i++) 
    {
        // play each group based on length
        
        var curGroup = digitGroups[i] ;
        var curIndex = 0 ;
        
        while (curIndex < curGroup.length) 
        {
	        var remaining = curGroup.length - curIndex ;
	        
	        var MorF = INTONATION[MEDIAL] + LABEL_DIGIT;
	        var nonterminalMorF = INTONATION[MEDIAL] + LABEL_DIGIT;
	        
	        if (i == (digitGroups.length-1)) 
	        { // last group
	            if ( intonation == FINAL) MorF = INTONATION[FINAL] + LABEL_DIGIT;
	            if ( intonation == RISING) MorF = INTONATION[RISING] + LABEL_DIGIT;
	        }
	    
	        if ( remaining == 1) 
	        {
	            prompts.audio.push(cprPromptPath + remaining + MorF + curGroup.substr(curIndex,1) + fileExtension) ;
	            prompts.tts.push("") ;
	            curIndex += 1 ;
	        }
	        else if ( remaining == 2) 
	        {
	            prompts.audio.push(cprPromptPath + remaining + MorF + curGroup.substr(curIndex,2) + fileExtension) ;
	            prompts.tts.push("") ;
	            curIndex += 2 ;
	        }
	        else if ( remaining == 3) 
	        {
	            // For a 3 digit group, if FINAL, play first two digits MEDIAL then last digit FINAL
	            if (MorF == (INTONATION[FINAL] + LABEL_DIGIT)) 
	            {
	                prompts.audio.push(cprPromptPath + "2" + nonterminalMorF + curGroup.substr(curIndex,2) + fileExtension) ;
	                prompts.tts.push("") ;
	                curIndex += 2 ;
	                prompts.audio.push(cprPromptPath + "1" + MorF + curGroup.substr(curIndex,1) + fileExtension) ;
	                prompts.tts.push("") ;
	                curIndex += 1 ;
	            }
	            else 
	            {
	                prompts.audio.push(cprPromptPath + remaining + MorF + curGroup.substr(curIndex,3) + fileExtension) ;
	                prompts.tts.push("") ;
	                curIndex += 3 ;
	            }
	        }
	        else if (remaining == 4) 
	        {
	            // For a 4 digit group, if MEDIAL, play FIRST digit with rising tone
	            // if FINAL, then play first TWO digits with a MEDIAL tone.
	            if (MorF == (INTONATION[FINAL] + LABEL_DIGIT)) 
	            {
	                nonterminalMorF = INTONATION[MEDIAL] + LABEL_DIGIT;
	                prompts.audio.push(cprPromptPath + "2" + nonterminalMorF + curGroup.substr(curIndex,2) + fileExtension) ;
	                prompts.tts.push("") ;
	                curIndex += 2 ;
	                prompts.audio.push(cprPromptPath + "2" + MorF + curGroup.substr(curIndex,2) + fileExtension) ;
	                prompts.tts.push("") ;
	                curIndex += 2 ;
	            }
	            else 
	            {
	                nonterminalMorF = INTONATION[RISING] + LABEL_DIGIT;
	                prompts.audio.push(cprPromptPath + "1" + nonterminalMorF + curGroup.substr(curIndex,1) + fileExtension) ;
	                prompts.tts.push("") ;
	                curIndex += 1 ;
	                prompts.audio.push(cprPromptPath + "3" + MorF + curGroup.substr(curIndex,3) + fileExtension) ;
	                prompts.tts.push("") ;
	                curIndex += 3 ;
	            }
	     	}
	       	else 
	      	{ // > 4 digits remaining
	       		prompts.audio.push(cprPromptPath + "3" + nonterminalMorF + curGroup.substr(curIndex,3) + fileExtension) ;
	          	prompts.tts.push("") ;
	          	// play a short silence between split up groups
	          	prompts.audio.push(cprPromptPath + DIGITS_PAUSE_DEFAULT + fileExtension);
	         	prompts.tts.push("");
	          	curIndex += 3 ;
	    	}
		} // end while
    
	  	// play silence after group if at least one remaining
	 	if ( i < (digitGroups.length - 1) ) 
	   	{
        	if (pauseLength == SHORT)
        	{
            	prompts.audio.push(cprPromptPath + DIGITS_PAUSE_SHORT + fileExtension);
            }
            else if (pauseLength == MEDIUM)	
            {
            	prompts.audio.push(cprPromptPath + DIGITS_PAUSE_MEDIUM + fileExtension);
            }
            else if (pauseLength == LONG)
            {
            	prompts.audio.push(cprPromptPath + DIGITS_PAUSE_LONG + fileExtension);
            }	
            prompts.tts.push("");
        }
        
    } // end for
    
    prompts.audio.push(cprPromptPath + DIGITS_PAUSE_POST_CPR + fileExtension);
    prompts.tts.push("");
    
    return prompts
   
}  // end of CPRDigits


function formatDigitsAudioServiceConfiguration(args) {
    args = buildDigitsPromptUrl(args);
    
    return args;
}

function buildDigitsPromptUrl(args) {
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



