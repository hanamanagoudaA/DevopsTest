//Confirmation prompts

function confirmDigitPrompt(args)
	{
  var directory     = args.applicationpromptsdirectory;
  var cprdirectory  = args.applicationdynamicpromptsdirectory;
  var confirmstring = args.dm_confirm_string.toLowerCase();
  var value		    = args.value;
  var rxNum;
  
  var extension = ".wav";
  
  // Getting the MEANING key if it is an object
  if (typeof value == 'object')
   {
   if (typeof(value.MEANING) != 'undefined' && value.MEANING != null)
      	rxNum = value.MEANING;
   else
        rxNum = value.dm_root;
   }
	 
  var prompts   = new Object();
  prompts.audio = new Array();
  prompts.tts   = new Array();
  	
	for(var d=0; d < rxNum.length;d++)
	{
		prompts.audio.push(cprdirectory + "1f.digits"+ rxNum.charAt(d)+ extension);
		prompts.tts.push(rxNum.charAt(d));
	}
	    
  return prompts;
 }
 

function confirmDatePrompt(args)
	{  
	
	var monthTTS = new Array("empty", "january", "february", "march", "april", "may", "june",
                         "july", "august", "september", "october", "november", "december");

	var ordinalTTS = new Array("empty", "first", "second", "third", "fourth", "fifth", "sixth",
                           "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
                           "thirteenth", "fourteenth", "fifteeth", "sixteenth", "seventeenth",
                           "eighteenth", "nineteenth", "twentieth", "twenty first", "twenty second",
                           "twenty third", "twenty fourth", "twenty fifth", "twenty sixth",
                           "twenty seventh", "twenty eighth", "twenty ninth", "thirtieth", "thirty first");
						   
  // Prompts Directory
  var directory = args.applicationpromptsdirectory;
  var cprdirectory  = args.applicationdynamicpromptsdirectory;
  var extension = ".wav";
   
  // Choose meaning for a builtin
  var value = args.value;

  // Getting the MEANING key if it is an object
  	if (typeof value == 'object')
 	{
   	if (typeof(value.MEANING) != 'undefined' && value.MEANING != null)
      	    value = value.MEANING;
    	else
            value = value.dm_root;
  	}
	
  var year4 = value.substr(0,4);
  var month = value.substr(4,2);
  var day 	= value.substr(6,2);
  
  var prompts   = new Object();
  prompts.audio = new Array();
  prompts.tts   = new Array();
  
  // Month
  prompts.audio.push(cprdirectory + "f.month" + month + extension);
  prompts.tts.push(monthTTS[Math.round(month)]);
  // Day
  prompts.audio.push(cprdirectory + "f.day" + day + extension);
  prompts.tts.push(ordinalTTS[Math.round(day)]);
  // Year
  prompts.audio.push(cprdirectory + "f.year" + year4 + extension);
  prompts.tts.push(year4);
    
  return prompts;
}

