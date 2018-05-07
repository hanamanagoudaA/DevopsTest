var CPR = new Object();
CPR.EN_US = "en.us";
CPR.ES_US = "es.us";
CPR.EN_UK = "en.uk";
CPR.EN_AU = "en.au";
CPR.FR_CA = "fr.ca";
CPR.PT_BR = "pt.br";
CPR.DE_DE = "de.de";

var DAYS = new Array();
DAYS[0] = "monday";
DAYS[1] = "tuesday";
DAYS[2] = "wednesday";
DAYS[3] = "thursday";
DAYS[4] = "friday";
DAYS[5] = "saturday";
DAYS[6] = "sunday";

var DATIVE = 'd';
var NOMINATIVE = 'n';
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

var LABEL_DAY = "day";
var LABEL_MONTH = "month";
var LABEL_JUSTMONTH = "justmonth";
var LABEL_YEAR2000s = "year";
var LABEL_YEAR1900s = "year";
var LABEL_DATIVEDAY = "dativeday";
var LABEL_DAYOFWEEK = "dayofweek.";
    
var DATE_PAUSE_PRE_CPR = "silence.date.precpr";
var DATE_PAUSE_POST_CPR = "silence.date.postcpr";
var DATE_PAUSE_PRE_DAY = "silence.date.preday";
var DATE_PAUSE_PRE_MONTH = "silence.date.premonth";
var DATE_PAUSE_PRE_YEAR = "silence.date.preyear";
var DATE_PAUSE_POST_DAYOFWEEK = "silence.date.postdayofweek";

var germancase;

function loadDate (args) 
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
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*   args.dayOfWeek                      empty (it's optional)   
*
*   args.dateString                     REQUIRED (YYYYMMDD)
*
***********************************************************************************/ 

function CPRDateDynamicPrompt(args)
{
    return CPRDate(args);
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
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*   args.dateFormat                     REQUIRED (Only supports formats yyyyMMdd, yyyy/MM/dd, yyyy-MM-dd, MMddyyyy, MM-dd-yyyy, and MM/dd/yyyy) 
*   args.playDayOfTheWeek               default false
*   args.playDayOfMonth                 default true
*   args.playYear                       default true
*
*   args.value.dm_confirm_string ||     REQUIRED (YYYYMMDD)
*   args.value.dm_root || 
*   args.value.MEANING || 
*   args.value || 
*   args.dm_confirm_string || 
*   args.dm_root || 
*   args.MEANING 
*
***********************************************************************************/ 

function CPRDateAudioServiceConfirmation(args) 
{   
    
    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.dateString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.dateString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.dateString = args.value.MEANING;
        else
            args.dateString = args.value ;
    }
    
    // Make sure we have a dateString
    if (typeof args.dateString == 'undefined' || args.dateString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.dateString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.dateString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.dateString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.dateString = args.value ;
        }
    }
    
    return CPRDate(formatDateAudioServiceConfiguration(args));
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
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*   args.dayOfWeek                      empty (it's optional)   
*
*   args.value.dm_confirm_string ||     REQUIRED (YYYYMMDD)
*   args.value.dm_root || 
*   args.value.MEANING || 
*   args.value || 
*   args.dm_confirm_string || 
*   args.dm_root || 
*   args.MEANING 
*
***********************************************************************************/ 

function CPRDateConfirmation(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.dateString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.dateString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.dateString = args.value.MEANING;
        else
            args.dateString = args.value ;
    }
    
    // Make sure we have a dateString
    if (typeof args.dateString == 'undefined' || args.dateString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.dateString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.dateString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.dateString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.dateString = args.value ;
        }
    }
    
    return CPRDate(args);
    
}

function CPRDateConfirmationNoDay(args)
{

    //Getting the confirm_string key if it is an object
    if ( (args.value != null) && (typeof (args.value) == 'object') )
    {
        if( args.value.dm_confirm_string != null )
            args.dateString = args.value.dm_confirm_string ;
        else if( args.value.dm_root != null )
            args.dateString = args.value.dm_root;
        else if( args.value.MEANING != null )
            args.dateString = args.value.MEANING;
        else
            args.dateString = args.value ;
    }
    
    // Make sure we have a dateString
    if (typeof args.dateString == 'undefined' || args.dateString.length == 0) 
    {
        if (args.dm_confirm_string != null && args.dm_confirm_string.length > 0) 
        {
            args.dateString = args.dm_confirm_string  ;
        }
        else if (args.dm_root != null && args.dm_root.length > 0) 
        {
            args.dateString = args.dm_root ;
        }
        else if (args.MEANING != null && args.MEANING.length > 0) 
        {
            args.dateString = args.MEANING ;
        }
        else if (args.value != null)
        {
            args.dateString = args.value ;
        }
    }
    
    return CPRDateNoDay(args);
    
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
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*   args.dateFormat                     REQUIRED (Only supports formats yyyyMMdd, yyyy/MM/dd, yyyy-MM-dd, MMddyyyy, MM-dd-yyyy, and MM/dd/yyyy) 
*   args.playDayOfTheWeek               default false
*   args.playDayOfMonth                 default true
*   args.playYear                       default true
*
*   args.dateString                     REQUIRED
*
***********************************************************************************/ 

function CPRDateAudioService(args) 
{   
	return CPRDate(formatDateAudioServiceConfiguration(args));
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
*   args.germanCase  (d/n)              n   (for NOMINATIVE)
*   args.dayOfWeek                      empty (it's optional)    
*
*   args.dateString                     REQUIRED
*
***********************************************************************************/ 


function CPRDate(args) 
{

    var intonation = args.intonation;
    var directory = args.applicationpromptsdirectory;
    germancase = args.germanCase;
    var confValue = args.dateString;
    var language = args.language ;
    cprPromptPath = args.cprPromptPath ;
    fileExtension = args.fileExtension ;
    var intonation = args.intonation ;
    var dayOfWeek = args.dayOfWeek ; 
    var prompts   = new Object();
    prompts.audio = new Array();
    prompts.tts   = new Array();
   
    // Fill in defaults for unsupplied vars
        
    if ( language == null ) 
    {
        language = CPR.EN_US ; // default
    }
    
    if ( germancase == null) 
    {
        germancase = NOMINATIVE; // default
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
        
    //hardcoded substrings, date will always be same format
    var year = confValue.substr(0, 4);
    var month = confValue.substr(4, 2);
    var day = confValue.substr(6, 2);
    
    prompts.audio.push(cprPromptPath + DATE_PAUSE_PRE_CPR + fileExtension);
    
    //******** MODIFY THE CODE HERE TO CHANGE WHAT TTS IS RETURNED *******************
    prompts.tts.push (confValue);  

    var validDay = false;
    var d;
    if (dayOfWeek != null)
    {
        d = dayOfWeek.toLowerCase();
        for (var i = 0; i < DAYS.length; i++)
        {
            if (d == DAYS[i])
            {
                validDay = true;
            }   
        }
    }
    
    if (validDay)
    {
        getDayOfWeek(prompts, d);     
    }
      
    //play month only
    if(year == "0000" && day == "00" && month!="00")
        prompts = getJustMonth(prompts, month, intonation);
    
    //play month and day only
    else if(year == "0000" && day != "00" && month !="00")
        prompts = PlayMonthAndDay(prompts,language, month, day, intonation);
    
    //play month and year
    else if(year != "0000" && day == "00" && month != "00")
        prompts = PlayMonthAndYear(prompts, language,year, month, intonation);
    
    //play month day and year
    else if(year != "0000" && day != "00" && month != "00")
        prompts = PlayMonthAndDayAndYear(prompts,language, year, month, day, intonation);
  
    prompts.audio.push(cprPromptPath + DATE_PAUSE_POST_CPR + fileExtension);
    prompts.tts.push ("");
    
    return prompts;

}

function CPRDateNoDay(args) 
{

    var intonation = args.intonation;
    var directory = args.applicationpromptsdirectory;
    germancase = args.germanCase;
    var confValue = args.dateString;
    var language = args.language ;
    cprPromptPath = args.cprPromptPath ;
    fileExtension = args.fileExtension ;
    var intonation = args.intonation ;
    var dayOfWeek = args.dayOfWeek ; 
    var prompts   = new Object();
    prompts.audio = new Array();
    prompts.tts   = new Array();
   
    // Fill in defaults for unsupplied vars
        
    if ( language == null ) 
    {
        language = CPR.EN_US ; // default
    }
    
    if ( germancase == null) 
    {
        germancase = NOMINATIVE; // default
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
        
    //hardcoded substrings, date will always be same format
    var year = confValue.substr(0, 4);
    var month = confValue.substr(4, 2);
    var day = confValue.substr(6, 2);
	day = "00";
    
    prompts.audio.push(cprPromptPath + DATE_PAUSE_PRE_CPR + fileExtension);
    
    //******** MODIFY THE CODE HERE TO CHANGE WHAT TTS IS RETURNED *******************
    prompts.tts.push (confValue);  

    var validDay = false;
    var d;
    if (dayOfWeek != null)
    {
        d = dayOfWeek.toLowerCase();
        for (var i = 0; i < DAYS.length; i++)
        {
            if (d == DAYS[i])
            {
                validDay = true;
            }   
        }
    }
    
    if (validDay)
    {
        getDayOfWeek(prompts, d);     
    }
      
    //play month only
    if(year == "0000" && day == "00" && month!="00")
        prompts = getJustMonth(prompts, month, intonation);
    
    //play month and day only
    else if(year == "0000" && day != "00" && month !="00")
        prompts = PlayMonthAndDay(prompts,language, month, day, intonation);
    
    //play month and year
    else if(year != "0000" && day == "00" && month != "00")
        prompts = PlayMonthAndYear(prompts, language,year, month, intonation);
    
    //play month day and year
    else if(year != "0000" && day != "00" && month != "00")
        prompts = PlayMonthAndDayAndYear(prompts,language, year, month, day, intonation);
  
    prompts.audio.push(cprPromptPath + DATE_PAUSE_POST_CPR + fileExtension);
    prompts.tts.push ("");
    
    return prompts;

}
  
function PlayMonthAndDayAndYear(prompts, language, year, month, day, intonation) 
{
    //follow US convention of mm/dd/yyyy
    if(language== CPR.EN_US) {
        prompts = getMonth(prompts, month, MEDIAL);
        prompts.audio.push(cprPromptPath + DATE_PAUSE_PRE_DAY + fileExtension);
        prompts.tts.push ("");        
        prompts = getDay(prompts, day, MEDIAL, language);
        prompts.audio.push(cprPromptPath + DATE_PAUSE_PRE_YEAR + fileExtension);
        prompts.tts.push ("");        
        prompts = getYear(prompts, year, intonation);
    }
    //else follow dd/mm/yyyy method
    else {
        //German dative is handled by getDay
        prompts = getDay(prompts, day, MEDIAL, language);
        prompts.audio.push(cprPromptPath + DATE_PAUSE_PRE_MONTH + fileExtension);
        prompts.tts.push ("");        
        prompts = getMonth(prompts, month, MEDIAL);
        prompts.audio.push(cprPromptPath + DATE_PAUSE_PRE_YEAR + fileExtension);
        prompts.tts.push ("");                    
        prompts = getYear(prompts, year, intonation);
    }
    return prompts;
}
    
    
function PlayMonthAndYear(prompts, language, year, month, intonation)  
{        
    prompts = getJustMonth(prompts, month, MEDIAL);
    //play year
    prompts.audio.push(cprPromptPath + DATE_PAUSE_PRE_YEAR + fileExtension);
    prompts.tts.push ("");                    
    prompts = getYear(prompts, year, intonation);
    return prompts;
}
       
function PlayMonthAndDay( prompts, language, month, day, intonation) 
{
    //playback is split between american (mm/dd) and other (dd/mm)
    if(language == CPR.EN_US) 
    {
        //play month medial (MEDIAL is passed for end of sentence flag)
        prompts = getMonth(prompts, month, MEDIAL);
        //play day according according to endofsentence
        prompts.audio.push(cprPromptPath + DATE_PAUSE_PRE_DAY + fileExtension);
        prompts.tts.push ("");        
        prompts = getDay(prompts, day, intonation, language);
    }
    else 
    {
        //play day medail (MEDIAL is passed for end of sentence flag)
        //German dative is handled by getDay
        prompts = getDay(prompts,day,MEDIAL, language);
        //play month according to endofsentence
        prompts.audio.push(cprPromptPath + DATE_PAUSE_PRE_MONTH + fileExtension);
        prompts.tts.push ("");        
        prompts = getMonth(prompts,month,intonation);
    }
    return prompts;
}
    
function getDay(prompts, day, intonation, language)  
{
    //if it is German dative
    var label = (language == CPR.DE_DE && germancase==DATIVE) ? LABEL_DATIVEDAY : LABEL_DAY;
    prompts.audio.push(cprPromptPath + INTONATION[intonation] + label + day + fileExtension);
    prompts.tts.push ("");        
    
    return prompts;
}
    
function getMonth(prompts, month, intonation)   
{
    prompts.audio.push(cprPromptPath + INTONATION[intonation] + LABEL_MONTH + month + fileExtension);
    prompts.tts.push ("");        
    return prompts;
}
    
function getJustMonth(prompts, month, intonation)   
{
    prompts.audio.push(cprPromptPath + INTONATION[intonation] + LABEL_JUSTMONTH + month + fileExtension);
    prompts.tts.push ("");        
    return prompts;
}
    
   
function getYear(prompts, year, intonation)     
{    
    //determine which variable to use to get proper playback
    //does not affect java, but is needed for intervoice
    //if it begins with 1 (e.g. 1993)
    if(year.substr(0,1)=='1') 
    {
        prompts.audio.push(cprPromptPath + INTONATION[intonation] + LABEL_YEAR1900s + year + fileExtension);
        prompts.tts.push ("");        
    }
    //if it begins with 2 (e.g. 2004)
    else if(year.substr(0,1)=='2') 
    {
        prompts.audio.push(cprPromptPath + INTONATION[intonation] + LABEL_YEAR2000s + year + fileExtension);
        prompts.tts.push ("");        
    }
    //year not formated properly, conver use 2000 playback
    else 
    {
        prompts.audio.push(cprPromptPath + INTONATION[intonation] + LABEL_YEAR2000s + year + fileExtension);
        prompts.tts.push ("");    
    }
    return prompts;
}
	
function getDayOfWeek(prompts, dayOfWeek)     
{    
    prompts.audio.push(cprPromptPath + INTONATION[MEDIAL] + LABEL_DAYOFWEEK + dayOfWeek + fileExtension);
    prompts.tts.push (""); 
    prompts.audio.push(cprPromptPath + DATE_PAUSE_POST_DAYOFWEEK + fileExtension);
    prompts.tts.push ("");
}

function formatDateAudioServiceConfiguration(args) 
{
    var cprPromptPath = args.cprPromptPath;
    var confValue = args.dateString;
    var dateFormat = args.dateFormat;
    var year = '';
    var month = '';
    var day = '';
    var playDayOfTheWeek = args.playDayOfTheWeek;
    var playDayOfMonth = args.playDayOfMonth;
    var playYear = args.playYear;
    
    if(dateFormat=="yyyyMMdd") {
        year = confValue.substr(0, 4);
        month = confValue.substr(4, 2);
        day = confValue.substr(6, 2);
    } else if(dateFormat=="MMddyyyy") {
        month = confValue.substr(0, 2);
        day = confValue.substr(2, 2);
        year = confValue.substr(4, 4);
    } else if( (dateFormat=="MM-dd-yyyy") || (dateFormat=="MM/dd/yyyy") ) {
        month = confValue.substr(0, 2);
        day = confValue.substr(3, 2);
        year = confValue.substr(6, 4);
    } else if( (dateFormat=="yyyy-MM-dd") || (dateFormat=="yyyy/MM/dd") ) {
        year = confValue.substr(0, 4);
        month = confValue.substr(5, 2);
        day = confValue.substr(8, 2);
    } else {
        year = confValue.substr(0, 4);
        month = confValue.substr(4, 2);
        day = confValue.substr(6, 2);
    }
    
    if( (playDayOfTheWeek==true) || (playDayOfTheWeek=="true") ) {
        var d=new Date();
        d.setFullYear(Number(year),Number(month)-1,Number(day));
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        
        var weekday=new Array(7);
        weekday[0]="Sunday";
        weekday[1]="Monday";
        weekday[2]="Tuesday";
        weekday[3]="Wednesday";
        weekday[4]="Thursday";
        weekday[5]="Friday";
        weekday[6]="Saturday";
        
        args.dayOfWeek = weekday[d.getDay()];
    }
    
    if( (playDayOfMonth==false) || (playDayOfMonth=="false") ) {
        day = "00";
    }
    
    if( (playYear==false) || (playYear=="false") ) {
        year = "0000";
    }
    
    args.dateString = year+month+day;
    
    args = buildDatePromptUrl(args);
    
    return args;
}

function buildDatePromptUrl(args) {
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

