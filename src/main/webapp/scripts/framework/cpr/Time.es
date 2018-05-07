var CPR = new Object();
CPR.EN_US = "en.us";
CPR.ES_US = "es.us";
CPR.EN_UK = "en.uk";
CPR.EN_AU = "en.au";
CPR.FR_CA = "fr.ca";
CPR.PT_BR = "pt.br";
CPR.DE_DE = "de.de";

var LANGUAGE;
var HASDECIMAL = true;

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

var HR12_JUST_HOUR = "12hr.hour";
var HR12_MINUTES = "12hr.minute";
var HR12_MERIDIAN = "12hr.time";
var HR12_AT_HOUR = "12hr.athour";

var HR24_JUST_HOUR = "24hr.hour";
var HR24_AT_HOUR = "24hr.athour";
var HR24_MINUTES = "24hr.minute";
var HR24_MERIDIAN = "24hr.time";

var TIME_PAUSE_PRE_CPR = "silence.time.precpr";
var TIME_PAUSE_POST_CPR = "silence.time.postcpr";
var TIME_PAUSE_PRE_HOUR = "silence.time.prehour";
var TIME_PAUSE_PRE_MINUTE = "silence.time.preminute";
var TIME_PAUSE_PRE_MERIDIAN = "silence.time.premeridian";

//global variables
var HAVE_AT_TIME = true;

function loadTime (args) {

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
*   args.clock24                        "false"	// Passed as a string (not boolean value) from jsp pages
*   args.play24HourMeridian             "false"	// Passed as a string (not boolean value) from jsp pages
*	args.play12HourMeridian				"true"	// Passed as a string (not boolean value) from jsp pages
*   args.usePrefix                      "false"	// Passed as a string (not boolean value) from jsp pages
*
*   args.timeString                     REQUIRED
*
***********************************************************************************/ 

function CPRTimeDynamicPrompt(args)
{
    return CPRTime(args);
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
*   args.clock24                        "false" // Passed as a string (not boolean value) from jsp pages
*   args.play24HourMeridian             "false" // Passed as a string (not boolean value) from jsp pages
*   args.play12HourMeridian             "true"  // Passed as a string (not boolean value) from jsp pages
*   args.usePrefix                      "false" // Passed as a string (not boolean value) from jsp pages
*   args.timeFormat                     REQUIRED (Only supports formats HHmm and HH:mm) 
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

function CPRTimeAudioServiceConfirmation(args) {
    
    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.timeString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.timeString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.timeString = args.value.MEANING;
        else
            args.timeString = args.value ;
    }
    
    // Make sure we have a digitsString
    if (typeof args.timeString == 'undefined' || args.timeString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.timeString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.timeString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.timeString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.timeString = args.value ;
        }
    }
    
    return CPRTime(formatTimeAudioServiceConfiguration(args));
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
*   args.clock24                        "false"	// Passed as a string (not boolean value) from jsp pages
*   args.play24HourMeridian             "false"	// Passed as a string (not boolean value) from jsp pages
*	args.play12HourMeridian				"true"	// Passed as a string (not boolean value) from jsp pages
*   args.usePrefix                      "false"	// Passed as a string (not boolean value) from jsp pages
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

function CPRTimeConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.timeString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.timeString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.timeString = args.value.MEANING;
        else
            args.timeString = args.value ;
    }
    
    // Make sure we have a digitsString
    if (typeof args.timeString == 'undefined' || args.timeString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.timeString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.timeString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.timeString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.timeString = args.value ;
        }
    }
    
    return CPRTime(args);
    
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
*   args.clock24                        "false" // Passed as a string (not boolean value) from jsp pages
*   args.play24HourMeridian             "false" // Passed as a string (not boolean value) from jsp pages
*   args.play12HourMeridian             "true"  // Passed as a string (not boolean value) from jsp pages
*   args.usePrefix                      "false" // Passed as a string (not boolean value) from jsp pages
*   args.timeFormat                     REQUIRED (Only supports formats HHmm and HH:mm) 
*
*   args.timeString                     REQUIRED
*
***********************************************************************************/ 

function CPRTimeAudioService(args) {
    
    return CPRTime(formatTimeAudioServiceConfiguration(args));
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
*   args.clock24                        "false"	// Passed as a string (not boolean value) from jsp pages
*   args.play24HourMeridian             "false"	// Passed as a string (not boolean value) from jsp pages
*	args.play12HourMeridian				"true"	// Passed as a string (not boolean value) from jsp pages
*   args.usePrefix                      "false"	// Passed as a string (not boolean value) from jsp pages
*
*   args.timeString                     REQUIRED
*
***********************************************************************************/ 

function CPRTime(args) {
    var intonation = args.intonation;
    var directory = args.applicationpromptsdirectory;
    var confValue = args.timeString ;
    var language = args.language ;
    cprPromptPath = args.cprPromptPath ;
    fileExtension = args.fileExtension ;
    var intonation = args.intonation ;
    var clock24 = args.clock24;
    var Play24HourMeridian = args.play24HourMeridian;
    var Play12HourMeridian = args.play12HourMeridian;
    var bUsePrefix = args.usePrefix;  
    var prompts   = new Object();
    prompts.audio = new Array();
    prompts.tts   = new Array();

    // Fill in defaults for unsupplied vars
        
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
    
    if (clock24 == null)
    {
        clock24 = false;
    }
     if (clock24 == "true")
    {
    	clock24 = true;	
    }
    if (clock24 == "false")
    {
    	clock24 = false;
    }
       
    if (Play24HourMeridian == null)
    {
        Play24HourMeridian = false;
    }
    if (Play24HourMeridian == "true")
    {
    	Play24HourMeridian = true;	
    }
    if (Play24HourMeridian == "false")
    {
    	Play24HourMeridian = false;
    }
    
    if (Play12HourMeridian == null)
    {
        Play12HourMeridian = true;
    }
    if (Play12HourMeridian == "true")
    {
    	Play12HourMeridian = true;	
    }
    if (Play12HourMeridian == "false")
    {
    	Play12HourMeridian = false;
    }
            
    if (bUsePrefix == null)
    {
        bUsePrefix = false;
    }
    if (bUsePrefix == "true")
    {
    	bUsePrefix = true;	
    }
    if (bUsePrefix == "false")
    {
    	bUsePrefix = false;
    }	
    
    var hours = confValue.substr(0, 2);
    var minutes = confValue.substr(2);
    var time = confValue;
    
    prompts.audio.push(cprPromptPath + TIME_PAUSE_PRE_CPR + fileExtension);
    
    //******** MODIFY THE CODE HERE TO CHANGE WHAT TTS IS RETURNED *******************
    prompts.tts.push (confValue);        

    if(clock24) 
    {
        //if you are saying the meridian in 24hour clock
        if(Play24HourMeridian) 
        {
           
            //play hours
            prompts = Play24Hours(prompts, bUsePrefix, hours);
               
            //play minutes (medial because not end of phrase)
               
            prompts.audio.push(cprPromptPath + TIME_PAUSE_PRE_MINUTE + fileExtension);
            prompts.tts.push ("");        
            prompts = Play24Minutes(prompts, MEDIAL, minutes);
               
            //play meridian
            prompts.audio.push(cprPromptPath + TIME_PAUSE_PRE_MERIDIAN + fileExtension);
            prompts.tts.push ("");        
            
            prompts = Play24Meridian(prompts, language, intonation, time);
        }
	    //not saying meridian with 24 hour clock
        else 
        {
            //play hours
            prompts = Play24Hours(prompts, bUsePrefix, hours);
               
            //play minutes
            prompts.audio.push(cprPromptPath + TIME_PAUSE_PRE_MINUTE + fileExtension);
            prompts.tts.push ("");        
            
            prompts = Play24Minutes(prompts, intonation, minutes);
        }
    } 
    else 
    {
       	if(Play12HourMeridian) 
        {
	        //handle spanish case where minutes not equal to 30
	        if(language == CPR.ES_US && minutes != "30") 
	        {
	            //playback is Hours, Meridian, Minutes
	            prompts = PlayHours(prompts, bUsePrefix, hours);
	            
	            //note MEDIAL is past for end of sentence because
	            //meridian is not the final prompt in phrase
	            prompts.audio.push(cprPromptPath + TIME_PAUSE_PRE_MERIDIAN + fileExtension);
	            prompts.tts.push ("");        
	            prompts = PlayMeridian(prompts, language, MEDIAL, time);
	            
	            //Minutes get tone because Minutes is last
	            //prompt to be played in phrase
	            prompts.audio.push(cprPromptPath + TIME_PAUSE_PRE_MINUTE + fileExtension);
	            prompts.tts.push ("");
	            prompts = PlayMinutes(prompts,  intonation, minutes);
	        
	        }
	        //all other languages follow this rule (Hour,Minute,Meridian)
	        else 
	        {
	        
	            prompts = PlayHours(prompts, bUsePrefix, hours);
	            
	            //note MEDIAL is past for end of sentence because minuts is
	            //not the final prompt in phrase
	            prompts.audio.push(cprPromptPath + TIME_PAUSE_PRE_MINUTE + fileExtension);
	            prompts.tts.push ("");
	            prompts = PlayMinutes(prompts, MEDIAL, minutes);
	            
	            //Meridian get tone because Meridian is last
	            //prompt to be played in phrase
	            prompts.audio.push(cprPromptPath + TIME_PAUSE_PRE_MERIDIAN + fileExtension);
	            prompts.tts.push ("");        
	            prompts = PlayMeridian(prompts, language, intonation, time);
	        }
		}
		else
		{
	        //handle spanish case where minutes not equal to 30
	        if(language == CPR.ES_US && minutes != "30") 
	        {
	            //playback is Hours, Meridian, Minutes
	            prompts = PlayHours(prompts, bUsePrefix, hours);

	            //Minutes get tone because Minutes is last
	            //prompt to be played in phrase
	            prompts.audio.push(cprPromptPath + TIME_PAUSE_PRE_MINUTE + fileExtension);
	            prompts.tts.push ("");
	            prompts = PlayMinutes(prompts,  intonation, minutes);
	        
	        }
	        //all other languages follow this rule (Hour,Minute,Meridian)
	        else 
	        {
	        
	            prompts = PlayHours(prompts, bUsePrefix, hours);
	            
	            //note MEDIAL is past for end of sentence because minuts is
	            //not the final prompt in phrase
	            prompts.audio.push(cprPromptPath + TIME_PAUSE_PRE_MINUTE + fileExtension);
	            prompts.tts.push ("");
	            prompts = PlayMinutes(prompts, intonation, minutes);
	            
	        }		
		}
    }
    prompts.audio.push(cprPromptPath + TIME_PAUSE_POST_CPR + fileExtension);
    prompts.tts.push ("");
    return prompts;
}

function PlayHours(prompts, bUsePrefix, hours) {
	prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + ((bUsePrefix)?HR12_AT_HOUR:HR12_JUST_HOUR) + hours + fileExtension);
	prompts.tts.push ("");
	return prompts;
}

function Play24Hours(prompts, bUsePrefix, hours)   {
	prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + ((bUsePrefix)?HR24_AT_HOUR:HR24_JUST_HOUR) + hours + fileExtension);
	prompts.tts.push ("");
	return prompts;
}

function PlayMinutes(prompts, intonation, minutes)  {
	prompts.audio.push(cprPromptPath + INTONATION[intonation] + HR12_MINUTES + minutes + fileExtension);
	prompts.tts.push ("");
	return prompts;
}

function Play24Minutes(prompts, intonation, minutes)    {
	prompts.audio.push(cprPromptPath + INTONATION[intonation] + HR24_MINUTES + minutes + fileExtension);
	prompts.tts.push ("");
	return prompts;
}

function PlayMeridian(prompts, language, intonation, time)   
{
        
    //create string to hold which AMPM will be played
    var ampm= "-1";
    
    //get correct Meridian
    ampm=getMeridian(time);
    
    //add prompt to vector
    prompts.audio.push(cprPromptPath + INTONATION[intonation] + HR12_MERIDIAN + ampm + fileExtension);
    prompts.tts.push ("");
    
    return prompts;

}

function Play24Meridian(prompts, language, intonation, time) 
{
  
    //create string to hold which AMPM will be played
    var ampm= "-1";
    
    //get correct Meridian
    ampm=getMeridian(time);
    
    //add prompt to vector
    prompts.audio.push(cprPromptPath + INTONATION[intonation] + HR24_MERIDIAN + ampm + fileExtension);
    prompts.tts.push ("");
    
    return prompts;
}

function getMeridian(itime) {
    
    if(itime==0)
        return("01");
    else if(itime>=1 && itime<=59)
        return("02");
    else if(itime>=100 && itime<=159)
        return("03");
    else if(itime>=200 && itime<=259)
        return("04");
    else if(itime>=300 && itime<=359)
        return("05");
    else if(itime>=400 && itime<=459)
        return("06");
    else if(itime>=500 && itime<=559)
        return("07");
    else if(itime>=600 && itime<=659)
        return("08");
    else if(itime>=700 && itime<=759)
        return("09");
    else if(itime>=800 && itime<=859)
        return("10");
    else if(itime>=900 && itime<=959)
        return("11");
    else if(itime>=1000 && itime<=1059)
        return("12");
    else if(itime>=1100 && itime<=1159)
        return("13");
    else if(itime==1200)
        return("14");
    else if(itime>=1201 && itime<=1259)
        return("15");
    else if(itime>=1300 && itime<=1359)
        return("16");
    else if(itime>=1400 && itime<=1459)
        return("17");
    else if(itime>=1500 && itime<=1559)
        return("18");
    else if(itime>=1600 && itime<=1659)
        return("19");
    else if(itime>=1700 && itime<=1759)
        return("20");
    else if(itime>=1800 && itime<=1859)
        return("21");
    else if(itime>=1900 && itime<=1959)
        return("22");
    else if(itime>=2000 && itime<=2059)
        return("23");
    else if(itime>=2100 && itime<=2159)
        return("24");
    else if(itime>=2200 && itime<=2259)
        return("25");
    else if(itime>=2300 && itime<=2359)
        return("26");
    else if(itime==2400)
        return("27");
    else {
        //improper input
        return "ERROR";
    }
}

function formatTimeAudioServiceConfiguration(args) {
    var confValue = args.timeString;
    var timeFormat = args.timeFormat;
    
    args = buildTimePromptUrl(args);
    
    if(timeFormat=="HH:mm") {
        var hour = confValue.substr(0, 2);
        var minute = confValue.substr(3, 2);
        args.timeString = hour+minute;
    } 

    return args;
}


function buildTimePromptUrl(args) {
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

