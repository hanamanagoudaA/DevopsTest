
// Alphanum Constants
var ALPHANUM_PAUSE_PRE_CPR = "silence.alpha.precpr" ;
var ALPHANUM_PAUSE_POST_CPR = "silence.alpha.postcpr" ;

var ALPHANUM_CHARPAUSE_SHORT = "silence.alpha.char.short" ;
var ALPHANUM_CHARPAUSE_MEDIUM = "silence.alpha.char.medium" ;
var ALPHANUM_CHARPAUSE_LONG = "silence.alpha.char.long" ;

var ALPHANUM_GROUPPAUSE_SHORT = "silence.alpha.group.short" ;
var ALPHANUM_GROUPPAUSE_MEDIUM = "silence.alpha.group.medium" ;
var ALPHANUM_GROUPPAUSE_LONG = "silence.alpha.group.long" ;

var LABEL_ALPHA = "alpha";

var PROMPT_ULAW = ".ulaw";
var PROMPT_WAV = ".wav";

var MEDIAL = "MEDIAL";
var RISING = "RISING";
var FINAL = "FINAL";
var COMMA = "COMMA";

var SHORT = "SHORT";
var MEDIUM = "MEDIUM";
var LONG = "LONG";

var INTONATION = new Array();
INTONATION[MEDIAL] = "m.";
INTONATION[RISING] = "r.";
INTONATION[FINAL]  = "f.";
INTONATION[COMMA] = "c.";

var fileExtension = PROMPT_WAV;
var cprPromptPath = "";

function test (args) 
{

    // Result object
    var prompts = new Object();
    
    // Initialize the prompts array 
    prompts.audio = new Array();
    prompts.tts = new Array();
    
    prompts.audio.push("audio1") ;
    prompts.tts.push ("tts1") ;
    
    return prompts ;
}

function loadAlpha (args) 
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
*   args.intonation (for final char)    MEDIAL
*   args.groupPause (SHORT/MEDIUM/LONG) MEDIUM
*   args.charPause (SHORT/MEDIUM/LONG)  SHORT
*
*   args.alphanumString           REQUIRED
*
***********************************************************************************/  

function CPRAlphanumDynamicPrompt(args)
{
    return CPRAlphaNum(args);
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
*   args.intonation (for final char)    MEDIAL
*   args.groupPause (SHORT/MEDIUM/LONG) MEDIUM
*   args.charPause (SHORT/MEDIUM/LONG)  SHORT
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

function CPRAlphanumAudioServiceConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.alphanumString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.alphanumString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.alphanumString = args.value.MEANING;
        else
            args.alphanumString = args.value ;
    }
    
    // Make sure we have a alphanumString
    if (typeof args.alphanumString == 'undefined' || args.alphanumString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.alphanumString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.alphanumString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.alphanumString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.alphanumString = args.value ;
        }
    }
    
    return CPRAlphaNum(formatAlphanumAudioServiceConfiguration(args));
    
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
*   args.intonation (for final char)    MEDIAL
*   args.groupPause (SHORT/MEDIUM/LONG) MEDIUM
*   args.charPause (SHORT/MEDIUM/LONG)  SHORT
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

function CPRAlphanumConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.alphanumString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.alphanumString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.alphanumString = args.value.MEANING;
        else
            args.alphanumString = args.value ;
    }
    
    // Make sure we have a alphanumString
    if (typeof args.alphanumString == 'undefined' || args.alphanumString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.alphanumString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.alphanumString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.alphanumString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.alphanumString = args.value ;
        }
    }
    
    return CPRAlphaNum(args);
    
}

/***********************************************************************************
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation (for final char)    MEDIAL
*   args.groupPause (SHORT/MEDIUM/LONG) MEDIUM
*   args.charPause (SHORT/MEDIUM/LONG)  SHORT
*
*   args.alphanumString           REQUIRED
*
***********************************************************************************/  
                
function CPRAlphaNumAudioService (args) 
{
    return CPRAlphaNum(formatAlphanumAudioServiceConfiguration(args));
}

/***********************************************************************************
*
*   Input Parameters                    Default (if not required)
*   ----------------                    -------------------------
*
*   args.applicationpromptsdirectory    REQUIRED
*   args.cprPromptPath                  args.applicationpromptsdirectory + "/cpr/" 
*   args.fileExtension                  .wav
*   args.intonation (for final char)    MEDIAL
*   args.groupPause (SHORT/MEDIUM/LONG) MEDIUM
*   args.charPause (SHORT/MEDIUM/LONG)  SHORT
*
*   args.alphanumString           REQUIRED
*
***********************************************************************************/  
                
function CPRAlphaNum (args) 
{

    // Result object
    var prompts = new Object();
    
    // Initialize the prompts array 
    prompts.audio = new Array();
    prompts.tts = new Array();
    
    var directory = args.applicationpromptsdirectory;
    var confValue = args.alphanumString ;
    var cprPromptPath = args.cprPromptPath ;
    var fileExtension = args.fileExtension ;
    var intonation = args.intonation ;
    var groupPause = args.groupPause ;
    var charPause = args.charPause;
    
    confValue = confValue.toLowerCase() ;
    
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
    
    if ( groupPause == null ) 
    {
        groupPause = MEDIUM ; // default
    }
    
    if ( charPause == null ) 
    {
        charPause = SHORT ; // default
    }

    var group_pause_prompt;
    if (groupPause == SHORT)
    {
        group_pause_prompt = cprPromptPath + ALPHANUM_GROUPPAUSE_SHORT + fileExtension ;
    }
    else if (groupPause == MEDIUM)
    {
        group_pause_prompt = cprPromptPath + ALPHANUM_GROUPPAUSE_MEDIUM + fileExtension ;
    }
    else
    {
        group_pause_prompt = cprPromptPath + ALPHANUM_GROUPPAUSE_LONG + fileExtension ;   
    }    
   
    var char_pause_prompt;
    if (charPause == SHORT)
    {
        char_pause_prompt = cprPromptPath + ALPHANUM_CHARPAUSE_SHORT + fileExtension ;
    }
    else if (charPause == MEDIUM)
    {
        char_pause_prompt = cprPromptPath + ALPHANUM_CHARPAUSE_MEDIUM + fileExtension ;
    }
    else
    {
        char_pause_prompt = cprPromptPath + ALPHANUM_CHARPAUSE_LONG + fileExtension ;   
    }

    var groups = confValue.split(' '); 	
    
    prompts.audio.push(cprPromptPath + ALPHANUM_PAUSE_PRE_CPR + fileExtension);
    
    //******** MODIFY THE CODE HERE TO CHANGE WHAT TTS IS RETURNED *******************
    prompts.tts.push(confValue);
    
    var groups_index = 0;
    var cur_index;   
   
    while(groups_index < groups.length)
    {
    
        var input = groups[groups_index++].toLowerCase();
        cur_index = 0;

        // scroll through input
        while(cur_index < input.length) 
        {
            // convert accented characters to appropriate platform dependent label as shown in
            // "Translation Table from $char to $alpha"
            var CheckedChar = CheckCharacter(input.charAt(cur_index));
            
            //character is converted at this point, add appropriate prompt to vector
            // This piece of code implements the rules in table "Rule for PLAYalpha"
            
            //handles case where character is first character of a multi-character input
            if(cur_index == 0 && input.length !=1 ) 
            {
                prompts.audio.push(cprPromptPath + INTONATION[RISING] + LABEL_ALPHA + CheckedChar + fileExtension) ;
                prompts.tts.push("") ;
                prompts.audio.push (char_pause_prompt) ;
                prompts.tts.push("") ;
            }
            //handles case where character is last character in input - may also be the last and only char
            else if(cur_index == input.length -1) 
            {
                if (groups_index == groups.length)
                {
                    prompts.audio.push(cprPromptPath + INTONATION[intonation] + LABEL_ALPHA + CheckedChar + fileExtension) ;
                    prompts.tts.push("") ;              
                }
                else
                {
                    prompts.audio.push(cprPromptPath + INTONATION[COMMA] + LABEL_ALPHA + CheckedChar + fileExtension) ;
                    prompts.tts.push("") ; 
                }             
            }
            //handles case where character is middle character of multi-character input
            else 
            {
                prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_ALPHA + CheckedChar + fileExtension) ;
                prompts.tts.push("") ;            
                prompts.audio.push (char_pause_prompt) ;
                prompts.tts.push("") ;
            }
            cur_index++;
        }
            
        if (groups_index != groups.length)
        {
            prompts.audio.push(group_pause_prompt) ;
            prompts.tts.push("") ;            
        }
    }

	prompts.audio.push(cprPromptPath + ALPHANUM_PAUSE_POST_CPR + fileExtension);
	prompts.tts.push("");
	return prompts ;
   
}   // end of CPRAlphaNum

function CheckCharacter(input)
{

    var c = input.charAt(0);

    if(c == "\u0129")
        return("i.t"); // i tilde
    if(c == "\u00F5")
        return("o.t"); // o tilde
    if(c == "\u0169")
        return("u.t"); // u tilde
    if(c == "\u1EBD")
        return("e.t");
    if(c == "\u00E1")
        return ("a.a");
    if(c == "\u00E0")
        return ("a.g");
    if(c == "\u00E2")
        return ("a.c");
    if(c == "\u00E4")
        return ("a.d");
    if(c == "\u00E3")
        return ("a.t");
    if(c == "\u00E9")
        return ("e.a");
    if(c == "\u00E8")
        return ("e.g");
    if(c == "\u00EA")
        return ("e.c");
    if(c == "\u00EB")
        return ("e.d");
    if(c == "\u00ED")
        return ("i.a");
    if(c == "\u00EC")
        return ("i.g");
    if(c == "\u00EE")
        return ("i.c");
    if(c == "\u00EF")
        return ("i.d");
    if(c == "\u00F3")
        return ("o.a");
    if(c == "\u00F2")
        return ("o.g");
    if(c == "\u00F4")
        return ("o.c");
    if(c == "\u00F6")
        return ("o.d");
    if(c == "\u00FA")
        return ("u.a");
    if(c == "\u00F9")
        return ("u.g");
    if(c == "\u00FB")
        return ("u.c");
    if(c == "\u00FC")
        return ("u.d");
    if(c == "\u00E7")
        return ("c.c");
    if(c == "\u00F1")
        return ("n.t");
    if(c == "\u00DF")
        return ("s.z");
    if(c == "\u00E5")
        return ("a.o");
    if(c == "\u00F8")
        return ("o.slash");
    if(c == "\u00E6")
        return ("ae.together");
    if(c == "\u00FE")
        return ("thorn");
    if(c == "\u00F0")
        return ("eth"); 
        
    /*
    This switch is the place that would need to be modified
    to extend the coverage of characters
    */

    //Check for special character, convert as necessary
    switch(c){
        case '-': return ("dash");
        case '_': return ("underscore");
        case '.': return ("period");
        case '@': return ("at");
        case '\'':return ("apostrophe"); // \' is needed to represent '

        default: return (c);

    }//switch
        
}

function formatAlphanumAudioServiceConfiguration(args) {

    args = buildAlphanumPromptUrl(args);
    
    return args;
}


function buildAlphanumPromptUrl(args) {
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


