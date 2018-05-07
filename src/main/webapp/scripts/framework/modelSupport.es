/*
        [TS:: Di -- 22.12.09 -- 15:45] NSRD: #59478
*/

/**
 * Modelsupport, provides logging functions.
 * Some parts in the documentation are based on the Application Level Event Logging Guide from NAR
 * @class 
 */
function ModelSupport(model){
    this.model = model;
}

/**
 * Logs the start of a play state, a timestamp is automatically added. Example 
 * ECMAScript code: 
 * <tt>modelsupport.logCallStart(&apos;s1&apos;)</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIclst|SESN=app-session-id|SVNM=appname|BROWSERIP=browserip|ANI=ani|DNIS=dnis</tt><br/>
 * <b>Used by: </b>Audio service.
 * @param appsessionId The application-session-id (required)
 * @param browserIP The browser-IP (required)
 * @param ani The ani (required)
 * @param dnis The dnis (required)
 * @param dnis The callLogStartTime (required in format 'yyyyMMddHHmmssSSS' or 'yyyy-MM-dd HH:mm:ss.SSS')
 * @param dnis The comboID (required, comboID is equal to 'platformVersion'-'ndf_version'-'application.version and created at 'CallLogStartTag.java' or callstart tag respectively)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logCallStart = function(appsessionid, applicationname, browserip, ani, dnis, callLogStartTime, comboID) {
    var data = 'TIME='+this.getCurrentTime();
    data += '|EVNT=SWIclst';
    data += '|SESN='+appsessionid;
    data += '|SVNM='+applicationname;
    data += '|BROWSERIP='+browserip;
    data += '|ANI='+ani;
    data += '|DNIS='+dnis;
    data += '|CMBO='+comboID;
    this.model.appendCalllog(data);
    return true;
};

/**
 * Logs the start of a play state, a timestamp is automatically added. Example 
 * ECMAScript code: 
 * <tt>modelsupport.logCallEnd(&apos;appsessionid&apos;)</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIclnd|SESN=app-session-id</tt><br/>
 * <b>Used by: </b>Audio service.
 * @param appsessionId The application-session-id (required)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logCallEnd = function(appsessionid) {
	var data = 'TIME='+this.getCurrentTime();
	data += '|EVNT=SWIclnd';
	data += '|SESN='+appsessionid;
	this.model.appendCalllog(data);
	return true;
};

/**
 * Logs the start of a play state, a timestamp is automatically added. Example 
 * ECMAScript code: 
 * <tt>modelsupport.logPlayStateStart(&apos;s1&apos;)</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIppst|PPNM=s1</tt><br/>
 * <b>Used by: </b>Audio service.
 * @param stateID The name of the current state (required)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logPlayStateStart = function(stateID) {
	var data = 'TIME='+this.getCurrentTime()+'|';
	data += 'EVNT=SWIppst|';
	data += 'PPNM='+stateID;
	this.model.appendCalllog(data);
	return true;
};

/**
 * Logs the prompt played, a timestamp is automatically added. Example 
 * ECMAScript code: 
 * <tt>modelsupport.logPlayPrompt(new Prompt(&apos;collection_initialprompt1&apos;, 
 * &apos;&lt;audio src=&quot;helloworld.wav&quot;/&gt;&apos;, 
 * &apos;hello world&apos;))</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIprst|PRNM=collection_initialprompt1|PTRX=&lt;audio src=
 * &quot;helloworld.wav&quot;/&gt;|PRTXT=hello world</tt><br/>
 * The output of that invocation with secure context set ti <tt>encrypt</tt>is:<br/>
 * <tt>TIME=...|EVNT=SWIprst|PRNM=collection_initialprompt1|PTRX=_ENCRYPTED|
   PRTXT=_ENCRYPTED</tt>|SECURE=encrypt<br/>
 * <b>Used by: </b>Audio service.
 * @param prompt The object containing the prompt information. 
 * It contains the following bean properties: <b>name</b>, <b>tts</b>, 
 * <b>text</b>. <b>name</b> is a name/an id identifying the prompt, <b>tts</b> 
 * is the string used in VoiceXML including SSML tags, <b>text</b> is the plain 
 * text of the prompt (without SSML tags).  (required)
 * @param secure_context The secure context information to use (optional - may 
 * be set to <tt>undefined</tt> if no value exist)
 * @param event_name The event name to use
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logPlayPrompt = function(prompt, secure_context, event_name) {
	var data =  'TIME='+this.getCurrentTime()+'|';
	if(event_name == null)
		event_name='SWIprst';
	data += 'EVNT=' + event_name;
	data += '|PRNM=';
	if(prompt.getName() != undefined){
		data += prompt.getName();
	}
	data += '|PRTX=';
	if(prompt.getTts() != undefined){
		data += prompt.getTts();
	}
	data += '|PRTXT=';
	if(prompt.getText() != undefined){
		data += prompt.getText();
	}
	if (secure_context!=undefined) {
	   data += '|SECURE=';
	   data += secure_context;
	}
	this.model.appendCalllog(data);
	return true;
};

/**
 * Logs the end of the play state. Example ECMAScript code<br/>
 * <tt>modelsupport.logPlayStateEnd('s1');</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIppnd|PPNM=s1</tt>
 * <b>Used by: </b>Audio service. 
 * @param stateID The name of the current state (required)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logPlayStateEnd = function(stateID){
	var data = 'TIME='+this.getCurrentTime()+'|';
	data += 'EVNT=SWIppnd|PPNM=' +  stateID;
	this.model.appendCalllog(data);
	return true;
};

/**
 * Logs the start of a decision state. Example ECMAScript code<br/>
 * <tt>modelsupport.logDecisionStateStart('s1');</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIdsst|DSNM=s1</tt>
 * <b>Used by: </b>Application code or services. 
 * @param stateID The name of the current state (required)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logDecisionStateStart = function(stateID){
	var data = 'TIME='+this.getCurrentTime()+'|';
	data += 'EVNT=SWIdsst|';
	data += 'DSNM='+stateID;
	this.model.appendCalllog(data);
	return true;
};

/**
 * Logs the end of a decision state. Example ECMAScript code<br/>
 * <tt>modelsupport.logDecisionStateEnd('s1', 'some condition');</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIdsnd|DSNM=s1|RSLT=some condition</tt>
 * <b>Used by: </b>Application code or services. 
 * @param stateID The name of the current state (required)
 * @param decision A textual representation of the decision (required)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logDecisionStateEnd = function(stateID, decision){
	var data = 'TIME='+this.getCurrentTime();
	data += '|EVNT=SWIdsnd';
	data += '|DSNM=' + stateID; 
	data += '|RSLT='+decision;
	this.model.appendCalllog(data);
	return true;
};

/**
 * Logs time and input data of a data access, a timestamp is automatically 
 * added. Example ECMAScript code:<br/>
 * <tt>var data = new Object():</tt><br/>
 * <tt>data.item1 = value1;</tt><br/>
 * <tt>data.item2 = value2;</tt><br/>
 * <tt>...</tt><br/>
 * <tt>data.itemN = valueN;</tt><br/>
 * <tt>modelsupport.logDataAccessStateStart(&apos;s2&apos;, data);</tt><br/>
 * <b>Used by: </b>Data access service before the data access is initialized.
 * @param stateID The name of the current state (required)
 * @param input The input to the data access state, the object contains custom 
 * properties. Each such property is logged as key-value pair. <b>The values are 
 * limited to String and Number values!</b> 
 * (required - may be set to <tt>undefined</tt> if not available)
 * @param secure_context the secure context to use (optional - may be set to 
 * <tt>undefined</tt> if not available)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logDataAccessStateStart = function(stateID, input, secure_context){
	var data = 'TIME='+this.getCurrentTime()+'|';
	data += 'EVNT=SWIdbtx|';
	data += 'NAME='+stateID+'|';
	data += 'INPUT=[';
	if(input != undefined){
		var counter = 0;
		for(var prop in input){
			if (typeof(input[prop]) != 'function') {
				data += counter != 0 ? ',' : ''; 
				data += prop + '=' + input[prop];
				counter ++;
			}
		}
	}
	data += ']';
    
    if (secure_context!=undefined) {
       data += '|SECURE=';
       data += secure_context;
    }
	this.model.appendCalllog(data);
	return true;    
};

/**
 * Logs time, status and ouput data of a data access, a timestamp is 
 * automatically added. Example ECMAScript code:<br/>
 * <tt>var data = new Object():</tt><br/>
 * <tt>data.address = new Object();</tt><br/>
 * <tt>data.address.street = &apos;Bond street&apos;;</tt><br/>
 * <tt>data.address.zipcode = &apos;12345&apos;;</tt><br/>
 * <tt>data.person = new Object();</tt><br/>
 * <tt>data.person.name = &apos;Bond&apos;;</tt><br/>
 * <tt>data.person.age = &apos;42&apos;;</tt><br/>
 * <tt>...</tt><br/>
 * <tt>modelsupport.logDataAccessStateEnd(&apos;s2&apos;, data, &apos;SUCC&apos;);</tt><br/>
 * The output of the invocation is: <br/>
 * <tt>TIME=...|EVNT=SWIdbrx|NAME=s2|RSLT=SUCC|OUTPUT=[address={street=&apos;Bond Street&apos;,
 * zipcode=12345},person={name=&apos;Bond&apos;,age=42}]</tt><br/>
 * The output of the invocation is with secure context set to <tt>encrypt</tt>: <br/>
 * <tt>TIME=...|EVNT=SWIdbrx|NAME=s2|RSLT=SUCC|OUTPUT=[address={street=&apos;Bond Street&apos;,
 * zipcode=12345},person={name=&apos;Bond&apos;,age=42}]|SECURE=encrypt</tt><br/>
 * <b>Used by: </b>Data access service before the data access is initialized.
 * @param stateID The name of the current state  (required)
 * @param output The ouput to the data access state, the object contains custom properties. 
 * Each such property is logged as key-value pair. <b>The values can be nested objects!</b> 
 * See log examples above on how to log the data. (required - may be set to <tt>undefined</tt> if not available)
 * @param {String} status The status of the data access  (required)
 * @param secure_context the secure context to use (optional - may be set to 
 * <tt>undefined</tt> if not available)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logDataAccessStateEnd = function(stateID, output, status, secure_context) {
	
	function createObjectString(object){
		var result = '{';
		var counter = 0;
		for(var p in object){
			if (typeof(object[p]) != 'function') {
				result += counter != 0 ? ',' : ''; 
				result += p + '=';
				if(typeof(object[p]) == 'object'){
					result += createObjectString(object[p]);
				}
				else {
					result += object[p];
				}
				counter ++;
			}
		}
		result += '}';
		return result;
	}
	
	var data = 'TIME='+this.getCurrentTime()+'|';
	data += 'EVNT=SWIdbrx|';
	data += 'NAME='+stateID+'|';
	data += 'RSLT='+status+'|';
	data += 'OUTPUT=[';
	if(output != undefined){
		var counter = 0;
		for(var prop in output){
			if (typeof(output[prop]) != 'function') {
				data += counter != 0 ? ',' : ''; 
				data += prop + '=';
				if(typeof(output[prop]) == 'object'){
					data += createObjectString(output[prop]);
				}
				else {
					data += output[prop];
				}			
				counter ++;
			}
		}
	}
	data = data.replace(/\n/g, ' ');
	data += ']';
	
	if (secure_context!=undefined) {
       data += '|SECURE=';
       data += secure_context;
    }
	this.model.appendCalllog(data);
	return true;    
};

/**
 * Logs the time when a DM state is started, a timestamp is automatically added. 
 * Example ECMAScript code: <br/>
 * <tt>modelsupport.logDMStateStart(&apos;s4&apos;);</tt><br/>
 * <b>Used by: </b>By invoker of NDM, ideally this is generated code. This marks 
 * the start point of the DM call. Needs to be triggered before the subdialog 
 * fetch occurs.
 * @param stateID The name of the current state (required)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logDMStateStart = function(stateID) {
	return true;
};

/**
 * Appends the DM logs to the existing call logs. This marks the end point of the DM call. 
 * Example VoiceXML code: <br/> 
 * <tt>&lt;subdialog name=&quot;ndm&quot; ...&gt;</tt><br/>
 * <tt>&nbsp;&nbsp;&lt;filled&gt;</tt><br/>
 * <tt>&nbsp;&nbsp;&nbsp;&nbsp;modelsupport.logDMStateEnd(&apos;s4&apos;, 
 * ndm.eventlogs);</tt><br/>
 * <tt>&nbsp;&nbsp;&lt;/filled&gt;</tt><br/>
 * <tt>&lt;/subdialog&gt;</tt><br/>
 * <b>Used by: </b>By invoker of NDM, ideally this is generated code. Needs to 
 * be triggered when the subdialog fetch has ended and a transition happens to 
 * the next form.
 * @param stateID The name of the current state (required)
 * @param data 	The event logs as returned by an NDM invocation. It is 
 * essentially a string delimiting NDM events by newline characters. (required)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logDMStateEnd = function(stateID, data) {
    this.model.appendCalllog(data);	
	return true;
};

/**
 * Logs the language in use. Example ECMAScript code:<br/>
 * <tt>modelsupport.logLanguage(&apos;jp-JP&apos;)</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIlang|LANG=jp-JP</tt><br/>
 * <b>Used by: </b>Application code. 
 * @param language The language in use. (required)
 * @returns <tt>true</tt> 
 */
ModelSupport.prototype.logLanguage = function(language){
	var data = 'TIME='+this.getCurrentTime()+'|';
	data += 'EVNT=SWIlang|';
	data += 'LANG='+language;
	this.model.appendCalllog(data);	
	return true;    
};

/**
 * Logs a custom string as event, a timestamp is automatically added. 
 * Example ECMAScript code (The example was taken from the Application Level 
 * Event Logging Guide from NAR):<br/> 
 * <tt>modelsupport.logString(&apos;s4&apos;, 
 * &apos;EVNT=SWIcllr|GRP1=female|GRP2=North&apos;);</tt><br/>
 * <b>Used by: </b>By the developer or anywhere where needed. 
 * @param str The custom log event to log (required)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logString = function(str) {
	var data = 'TIME='+this.getCurrentTime()+'|';
	data += str;
	this.model.appendCalllog(data);	
	return true;    
};

/**
 * Logs an error. Example ECMAScript code:<br/>
 * <tt>[1] modelsupport.logError(&apos;s1&apos;,&apos;error.badfetch&apos;,&apos;event message&apos;)<br/>
 *     [2] modelsupport.logError(&apos;s1&apos;,&apos;error.badfetch&apos;)</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>[1] TIME=...|EVNT=ERROR|NODE=s1|ERROR=error.badfetch|MESSAGE=event message<br/>
 *     [2] TIME=...|EVNT=ERROR|NODE=s1|ERROR=error.badfetch</tt><br/>
 * <b>Used by: </b>Application code. 
 * @param stateID The name of the state (required)
 * @param error The error (required)
 * @param message The error message (optional - may be left out or set to <tt>undefined</tt>)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logError = function(stateID, error, message) {
    var data = 'TIME='+this.getCurrentTime();
    data += '|EVNT=ERROR';
	data += '|NODE=' + stateID;
	data += '|ERROR=' + error;

	//NSRD00085286---strict browser fails on undefined variables
	if (message != undefined){
	if(message){
		data += '|MESSAGE=' + this.removeNewlines(message);
	}
	}
	this.model.appendCalllog(data);	
	return true;   	
};

/**
 * Associates the segments with the caller id. Takes as many groups as were passed 
 * (up to 4). Example ECMAScript code:  
 * (The example is based on the Application Level Event Logging Guide from NAR):<br/> 
 * <tt>[1] modelsupport.logCallerSegmentation (&apos;1019100100&apos;, &apos;female&apos;);<br/>
 *     [2] modelsupport.logCallerSegmentation (&apos;1019100100&apos;, &apos;male&apos;, &apos;member&apos;, &apos;gold&apos;, &apos;east&apos;);<br/>
 *     [3] modelsupport.logCallerSegmentation (&apos;1019100100&apos;, &apos;male&apos;, undefined, &apos;gold&apos;, &apos;east&apos;);<br/>
 *     [4] modelsupport.logCallerSegmentation (&apos;1019100100&apos;, &apos;male&apos;, '', &apos;gold&apos;, &apos;east&apos;);<br/>
 * The outputs of these invocations are:
 * <tt>[1] TIME=...|EVNT=SWIcllr|CLID=1019100100|GRP1=female <br/>
 *     [2] TIME=...|EVNT=SWIcllr|CLID=1019100100|GRP1=male|GRP2=member|GRP3=gold|GRP4=east</tt><br/>
 *     [3] TIME=...|EVNT=SWIcllr|CLID=1019100100|GRP1=male|GRP3=gold|GRP4=east</tt><br/>
 *     [4] TIME=...|EVNT=SWIcllr|CLID=1019100100|GRP1=male|GRP3=gold|GRP4=east</tt><br/>
 * <b>Used by: </b>Application code or services. 
 * @param callerId Unique Id for the caller (required)
 * @param grp1 Application-defined group name (optional - may be left out or set to <tt>undefined</tt>)
 * @param grp2 Application-defined group name (optional - may be left out or set to <tt>undefined</tt>)
 * @param grp3 Application-defined group name (optional - may be left out or set to <tt>undefined</tt>)
 * @param grp4 Application-defined group name (optional - may be left out or set to <tt>undefined</tt>)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logCallerSegmentation = function(callerId, grp1, grp2, grp3, grp4) {
	var data = 'TIME='+this.getCurrentTime();
	data += '|EVNT=SWIcllr';
	data += '|CLID='+callerId;
	if(grp1 != undefined && grp1 != ''){
		data += '|GRP1='+grp1;
	}
	if(grp2 != undefined && grp2 != ''){
		data += '|GRP2='+grp2;
	}
	if(grp3 != undefined && grp3 != ''){
		data += '|GRP3='+grp3;
	}
	if(grp4 != undefined && grp4 != ''){
		data += '|GRP4='+grp4;
	}
	this.model.appendCalllog(data);
	return true;
};

/**
 * Logs a unique id for the call. Example ECMAScript code: <br/>  
 * <tt>modelsupport.logUniqueId(&apos;12345&apos;);</tt><br/>
 * The output of the invocations is:
 * <tt>TIME=...|EVNT=SWIunid|UNID=12345</tt><br/>
 * <b>Used by: </b>Application code or services. 
 * @param callId The unique call id (required)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logUniqueId = function(uniqueId) {
	var data = 'TIME='+this.getCurrentTime()+'|';
	data += 'EVNT=SWIunid|';
	data += 'UNID='+uniqueId;
	this.model.appendCalllog(data);	
	return true;    
};

/**
 * Identifies the application name. Example ECMAScript code: 
 * (The example is based on the Application Level Event Logging Guide from NAR):<br/>   
 * <tt>modelsupport.logServiceStart(&apos;MyApplicationName&apos;, &apos;127.0.0.1&apos;);</tt><br/>
 * The output of the invocations is:
 * <tt>TIME=...|EVNT=SWIsvst|SVNM=MyApplicationName|APPSERV=127.0.0.1</tt><br/>
 * <b>Used by: </b>Application code or services. 
 * @param applicationName String that uniquely identifies the application (required)
 * @param appserverId Machine ID of the server (required)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logServiceStart = function(applicationName, appserverId){
	var data = 'TIME='+this.getCurrentTime()+'|';
	data += 'EVNT=SWIsvst';
	data += '|SVNM='+applicationName;
	data += '|APPSERV='+appserverId;
	this.model.appendCalllog(data);	
	return true;  	
};

/**
 * Is logged as soon as the application has determined that the caller is exiting the system. Example ECMAScript code 
 * (The example is based on the Application Level Event Logging Guide from NAR):<br/>   
 * <tt>[1]modelsupport.logEndCall(&apos;COMPLETE&apos;, &apos;Reservation&apos;, &apos;HANGUP&apos;, &apos;PlayConfirmation_DM&apos;)<br/>
 *     [2]modelsupport.logEndCall(&apos;COMPLETE&apos;)</tt><br/>
 * The outputs of the invocations are:
 * <tt>[1]TIME=...|EVNT=SWIendcall|OUTCOME=COMPLETE|EXITRESN=HANGUP|CALLTYPE=Reservation|LASTDM=PlayConfirmation_DM|LASTSTATE=welcome|INFO=info|SELFSERVED=true<br/>
 *     [2]TIME=...|EVNT=SWIendcall|OUTCOME=COMPLETE|EXITRESN=|CALLTYPE=UNKNOWN</tt><br/>
 * <b>Used by: </b>Application code or services. 
 * @param outcome Call outcome  (required)
 * @param callType Application-specific string describing the call type (optional, will be set to UNKNOWN if not passed)
 * @param exitReason Exit reason (optional)
 * @param lastImportantDM The last dialog module in the call that was not the one that handled the transfer or goodbye condition (optional)
 * @param laststate The last application state encountered (optional)
 * @param info Application-defined information field. Use this token to add information not otherwise captured, such as whether the caller heard a prompt before hanging up (optional).
 * @param selfserved Boolean: true or false. Whether or not the caller was serviced by the application. This is application-defined.
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logEndCall = function(outcome, callType, exitReason, lastImportantDM, laststate, info, selfserved){
	var data = 'TIME='+this.getCurrentTime()+'|';
	data += 'EVNT=SWIendcall';
	data += '|OUTCOME='+outcome;
	var callType2 = callType;
	if(callType2 == undefined){
		callType2 = 'UNKNOWN';
	}
	data += '|EXITRESN=';
	if(exitReason != undefined){
		data += exitReason;
	}
	data += '|CALLTYPE='+callType2;
	if(lastImportantDM != undefined){
		data += '|LASTDM='+lastImportantDM;
	}
	if(laststate != undefined){
		data += '|LASTSTATE=' + laststate;
	}	
	if(info != undefined){
		data += '|INFO=' + info;
	}
	if(selfserved != undefined){
		data += '|SELFSERVED=' + selfserved;
	}	

	this.model.appendCalllog(data);	
	return true;  	
};

/**
 * Call was transferred. Example ECMAScript code 
 * (The example is based on the Application Level Event Logging Guide from NAR):<br/>   
 * <tt>[1] modelsupport.logTransfer(&apos;MAXTIMEOUTS&apos;, &apos;call transfer destination&apos;, &apos;additional info&apos;)<br/> 
 *	   [2] modelsupport.logTransfer(&apos;MAXTIMEOUTS&apos;, &apos;call transfer destination&apos;) 
 * </tt><br/>
 * The outputs of these invocations are:
 * <tt>[1] TIME=...|EVNT=SWItrfr|RESN=MAXTIMEOUTS|INFO=additional info; DEST=call transfer destination <br/>
 *     [2] TIME=...|EVNT=SWItrfr|RESN=MAXTIMEOUTS|INFO= ;DEST=call transfer destination
 * </tt><br/>
 * <b>Used by: </b>Application code or services. 
 * @param reason Application-defined reason for the transfer (required)
 * @param destination Call transfer destination (optional - may be left out or set to <tt>undefined</tt>)
 * @param info Transfer destination (optional - may be left out or set to <tt>undefined</tt>)
 * @returns <tt>true</tt>
 */
ModelSupport.prototype.logTransfer = function(reason, destination, info){
	var data = 'TIME='+this.getCurrentTime();
	data += '|EVNT=SWItrfr';
	data += '|RESN='+reason;
	if(info != undefined || destination != undefined){
		data += '|INFO=';
		if(info != undefined){
			data += info;
		}
		if(destination != undefined){
			data += '; DEST=' + destination; 
		}
	}
	this.model.appendCalllog(data);	
	return true;  	
};

/**
 * <p>Logs the start of an application module. The according event logs the module name, the start time and 
 * other useful information</p>
 * <b>Example:</b><br/>
 * <tt>TIME=...|EVNT=modulest|NAME=prompter|URI=/MainApp/init</tt>
 * @param name the module name (required) 
 * @param uri the URI of the module. Must meet the uri syntax described in RFC2963 (required) 
 * @returns <tt>true</tt> 
 */
ModelSupport.prototype.logModuleStart = function(name, uri){
	var data = 'TIME='+this.getCurrentTime();
	data += '|EVNT=modulest';
	data += '|NAME='+name;
	data += '|URI='+uri;
	this.model.appendCalllog(data);	
	return true;
};

/**
 * Logs the end of an application module. All optional tokens won't get logged if they don't have
 * a value<br/>
 * <b>Example:</b><br/>
 * <tt>[1] TIME=...|EVNT=modulend|NAME=prompter|RESULT=transition</tt><br/>
 * <tt>[1] TIME=...|EVNT=modulend|NAME=prompter|RESULT=transition|TYPE=voice|INFO=my_info|LASTSTATE=sa1007_statename|SELFSERVED=false|NEXTMODULE=pickup|Additional Tokens</tt>
 * @param name the module name, needs to match the module name logged with the modulest event (required)
 * @param result <p>one of the following constants (uppercase string values) <tt>TRANSITION</tt> or <tt>CALLTERMINATE</tt>. (required)</p> 
 * <p>If the value is <tt>CALLTERMINATE</tt> then the tokens posted in the <tt>SWIendcall</tt>, <tt>OUTCOME</tt><tt>EXITRESN</tt> defines
 * further information. There are no specific requirements for these token values in this case.</p> 
 * @param type a free form text field, the content is application/project specific (optional) 
 * @param info a textual description (optional) 
 * @param laststate the name of the last state within the application module. The idea is to log the the signification state within the module and <b>not</b> within a call. (optional) 
 * @param selfserved <b>true</b> if this module is self-served and <b>false</b> if this module is not self-served. (optional) 
 * @param nextmodule the name of the module or the URI of the next module. If it is the URI, this has to meet the URI syntax described in RFC2396 (optional)  
 * @param additionaltokens additional tokens in the form TKN1=value1|TKN2=value2|... (optional) 
 * @returns <tt>true</tt> 
 */
ModelSupport.prototype.logModuleEnd = function(name, result, type, info, laststate, selfserved, nextmodule, additionaltokens){
	
	if(name == undefined || name == ''){
		throw new Error('ModelSupport#logModuleStart: the name parameter is mandatory, but actually is ['+name+']!');
	}
	if(result != 'CALLTERMINATE' && result != 'TRANSITION'){
		throw new Error('ModelSupport#logModuleStart: the value for result must be either CALLTERMINATE or TRANSITION, but it is ['+result+']');
	}
	
	var data = 'TIME='+this.getCurrentTime();
	data += '|EVNT=modulend';
	data += '|NAME='+name;
	data += '|RESULT='+result;
	if(type != undefined && type != ''){
		data += '|TYPE='+type;
	}
	if(info != undefined && info != ''){
		data += '|INFO='+info;
	}
	if(laststate != undefined && laststate != ''){
		data += '|LASTSTATE='+laststate;
	}
	if(selfserved != undefined && selfserved != ''){
		// accept both, string and the corresponding boolean value
		if(selfserved != undefined && selfserved != 'true' && selfserved != true 
				&& selfserved != 'false' && selfserved != false){
			throw new Error('ModelSupport#logModuleStart: the value for selfserved must be either true or false, but it is ['+selfserved+']');
		}
		else {
			data += '|SELFSERVED='+selfserved;
		}
	}
	if(nextmodule != undefined && nextmodule != ''){
		data += '|NEXTMODULE='+nextmodule;
	}
	if(additionaltokens != undefined && additionaltokens != ''){
		var checkedadditionaltokens = additionaltokens;
		if(additionaltokens.charAt(additionaltokens.length - 1) == '|'){
			checkedadditionaltokens = additionaltokens.substring(0, additionaltokens.length - 1);
		}
		data += additionaltokens.substring(0,1) == '|' ? '' : '|';
		data += checkedadditionaltokens;
	}
	this.model.appendCalllog(data);	
	return true;
};

/**
 * <p>Logs the app session id and the appstep id</p>
 * <b>Example:</b><br/>
 * <tt>TIME=...|EVNT=SWIapps|SESN=abc567|STEP=5</tt>
 * @param session the appsession ID 
 * @param step the appstep ID
 * @returns <tt>true</tt> 
 */
ModelSupport.prototype.logApps = function(session, step){
	var data = 'TIME='+this.getCurrentTime();
	data += '|EVNT=SWIapps';
	data += '|SESN='+session;
	data += '|STEP='+step;
	this.model.appendCalllog(data);	
	return true;
};

/**
 * Logs all tokens contained in the passed object resp. named map (see ndfapplicationutils for details)
 * <p>
 * <b>Example:</b><br/>
 * <tt>var map = new Object();<br/>
 * map.TKN1='1';<br/>
 * map.TKN2=2;<br/>
 * logCallInfo(map);<br/><br/></tt>
 * Will result in:<br/> 
 * <tt>TIME=...|EVNT=CALL_INFO|TKN1=1|TKN2=2</tt>
 * <p>If the passed map is empty, nothing will be rendered for this event.</p>
 * @param values the object resp. named map which contains the tokens  
 * @returns <tt>true</tt> 
 */
ModelSupport.prototype.logCallInfo = function(values){
	var data = 'TIME='+this.getCurrentTime();
	data += '|EVNT=CALL_INFO';
	var tknAdded = false;
	for(var tkn in values){
		if (typeof(values[tkn]) != 'function') {
			var vle = values[tkn];
			if(vle != undefined){
				if(!tknAdded) tknAdded = true;
				data += '|' + tkn + '=' + vle;
			}
		}
	}
	if(tknAdded) this.model.appendCalllog(data);	
	return true;
};

/**
 * Creates a time stamp used for <tt>logEvent</tt> and 
 * <tt>logEvent</tt> functions.<br/>
 * <b>Used by:</b>NDF
 * @returns The current time in the format <tt>yyyyMMddHHmmssSSS</tt>, example: 
 * <tt>20080709035540870</tt>
 */
ModelSupport.prototype.getCurrentTime = function() {

	var date = new Date();

    var month = date.getMonth() + 1;
    var day   = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var ms = date.getMilliseconds();

    var time = String(date.getFullYear());
    
    time += ((month < 10) ? "0" + month : month);
    time += ((day < 10) ? "0" + day : day);
    
    time += ((h < 10) ? "0" + h : h);
    time += ((m < 10) ? "0" + m : m);
    time += ((s < 10) ? "0" + s : s);

    time += ((ms < 100) ? '0' : '');
    time += ((ms < 10) ? '0' + ms : ms);
	return time;
};

/**
 * Creates a time stamp with a format corresponding to the result java.sql.Timestamp#toString used by NDF<br/>
 * <b>Used by:</b>NDF
 * @returns The current time in the format <tt>yyyy-MM-dd HH:mm:ss.SSS</tt>, example: 
 * <tt>2008-07-09 03:55:40.870</tt>
 */
ModelSupport.prototype.getSQLTimestamp = function() {

	var date = new Date();

    var month = date.getMonth() + 1;
    var day   = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var ms = date.getMilliseconds();

    var time = String(date.getFullYear()) + "-";
    
    time += ((month < 10) ? "0" + month : month) + "-";
    time += ((day < 10) ? "0" + day : day)+ " ";
    
    time += ((h < 10) ? "0" + h : h) + ":";
    time += ((m < 10) ? "0" + m : m) + ":";
    time += ((s < 10) ? "0" + s : s) + ".";

    time += ((ms < 100) ? '0' : '');
    time += ((ms < 10) ? '0' + ms : ms);
	return time;
};

/**
 * Converts the passed time stamp by removing all characters except the digits<br/>
 * <b>Used by:</b>NDF
 * @returns A time stamp in the format <tt>yyyyMMddHHmmssSSS</tt>, which is based on the passed timestamp. Example: 
 * <b>In: </b><tt>2008-07-09 03:55:40.870</tt><br/><b>Out: </b><tt>20080709035540870</tt>
 */
ModelSupport.prototype.convertTimestamp = function(sqltimestamp){
	return sqltimestamp.replace(/[^\d]/g, "");
};

//==============================================================================
//Global methods for modelsupport.es
//==============================================================================

/**
 * <b>Calls <tt>logCallStart(appsessionId, applicationname, browserIP, ani, dnis)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs the start of a call, a timestamp is automatically added. Example 
 * ECMAScript code: 
 * <tt>modelsupport.logCallStart(appsessionId, browserIP, ani, dnis)</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIclst|SESN=app-session-id|SVNM=appname|BROWSERIP=browserip|ANI=ani|DNIS=dnis</tt><br/>
 * @param appsessionId The application-session-id (required)
 * @param applicationname The application-name (required)
 * @param browserIP The browser-IP (required)
 * @param ani The ani (required)
 * @param dnis The dnis (required)
 * @returns <tt>true</tt>
 */
function logCallStart(appsessionId, appname, browserIP, ani, dnis) {
	return modelsupport.logCallStart(appsessionId, appname, browserIP, ani, dnis);
}

/**
 * <b>Calls <tt>logCallEnd(appsessionId)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs the start of a call, a timestamp is automatically added. Example 
 * ECMAScript code: 
 * <tt>modelsupport.logCallEnd(appsessionId)</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIclnd</tt><br/>
 * @param appsessionId The application-session-id (required)
 * @returns <tt>true</tt>
 */
function logCallEnd(appsessionId) {
	return modelsupport.logCallEnd(appsessionId);
}

/**
 * <b>Calls <tt>logPlayStateStart(stateID, prompt)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs the start of a play state, a timestamp is automatically added. Example 
 * ECMAScript code: 
 * <tt>modelsupport.logPlayStateStart(&apos;s1&apos;, 
 * new Prompt(&apos;collection_initialprompt1&apos;, 
 * &apos;&lt;audio src=&quot;helloworld.wav&quot;/&gt;&apos;, 
 * &apos;hello world&apos;))</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIppst|PPNM=s1</tt><br/>
 * @param stateID The name of the current state
 * @returns <tt>true</tt>
 */
function logPlayStateStart(stateID) {
	return modelsupport.logPlayStateStart(stateID);
}

/**
 * <b>Calls <tt>logPlayPrompt(stateID, prompt)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs the prompt played, a timestamp is automatically added. Example 
 * ECMAScript code: 
 * <tt>modelsupport.logPlayPrompt(new Prompt(&apos;collection_initialprompt1&apos;, 
 * &apos;&lt;audio src=&quot;helloworld.wav&quot;/&gt;&apos;, 
 * &apos;hello world&apos;))</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIprst|PRNM=collection_initialprompt1|PTRX=&lt;audio src=
 * &quot;helloworld.wav&quot;/&gt;|PRTXT=hello world</tt><br/>
 * <b>Used by: </b>Audio service.
 * @param prompt The object containing the prompt information. 
 * It contains the following bean properties: <b>name</b>, <b>tts</b>, 
 * <b>text</b>. <b>name</b> is a name/an id identifying the prompt, <b>tts</b> 
 * is the string used in VoiceXML including SSML tags, <b>text</b> is the plain 
 * text of the prompt (without SSML tags).
 * @param secure_context The secure context information to use
 * @param event_name The event name to use
 * @returns <tt>true</tt>
 */
function logPlayPrompt(prompt, secure_context, event_name) {
	return modelsupport.logPlayPrompt(prompt, secure_context, event_name);
}

/**
 * <b>Calls <tt>logPlayStateEnd()</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs the end of the play state. Example ECMAScript code<br/>
 * <tt>modelsupport.logPlayStateEnd('s1');</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIppnd|PPNM=s1</tt>
 * <b>Used by: </b>Audio service. 
 * @returns <tt>true</tt>
 */
function logPlayStateEnd(stateID){
	return modelsupport.logPlayStateEnd(stateID);
}

/**
 * <b>Calls <tt>logDecisionStateStart(stateID)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs the start of a decision state. Example ECMAScript code<br/>
 * <tt>modelsupport.logDecisionStateStart('s1');</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIdsst|DSNM=s1</tt>
 * <b>Used by: </b>Application code or services. 
 * @param stateID The name of the current state
 * @returns <tt>true</tt>
 */
function logDecisionStateStart(stateID){
	return modelsupport.logDecisionStateStart(stateID);
}

/**
 * <b>Calls <tt>logDecisionStateEnd(decision)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs the end of a decision state. Example ECMAScript code<br/>
 * <tt>modelsupport.logDecisionStateEnd('s1', 'some condition');</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIdsnd|DSNM=s1|RSLT=some condition</tt>
 * <b>Used by: </b>Application code or services. 
 * @param decision A textual representation of the decision
 * @returns <tt>true</tt>
 */
function logDecisionStateEnd(stateID, decision){
	return modelsupport.logDecisionStateEnd(stateID, decision);
}

/**
 * <b>Calls <tt>logDataAccessStateStart(stateID, input)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs time and input data of a data access, a timestamp is automatically 
 * added. Example ECMAScript code:<br/>
 * <tt>var data = new Object():</tt><br/>
 * <tt>data.item1 = value1;</tt><br/>
 * <tt>data.item2 = value2;</tt><br/>
 * <tt>...</tt><br/>
 * <tt>data.itemN = valueN;</tt><br/>
 * <tt>modelsupport.logDataAccessStateStart(&apos;s2&apos;, data);</tt><br/>
 * <b>Used by: </b>Data access service before the data access is initialized.
 * @param stateID The name of the current state
 * @param input The input to the data access state, the object contains custom 
 * properties. Each such property is logged as key-value pair. <b>The values are 
 * limited to String and Number values!</b>
 * @param secure_context The secure context value (optional - may be set to 
 * <tt>undefined</tt> when no value is available).
 * @returns <tt>true</tt>
 */
function logDataAccessStateStart(stateID, input, secure_context){
	return modelsupport.logDataAccessStateStart(stateID, input, secure_context);
}

/**
 * <b>Calls <tt>logDataAccessStateEnd(stateID, output, status)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs time, status and ouput data of a data access, a timestamp is 
 * automatically added. Example ECMAScript code:<br/>
 * <tt>var data = new Object():</tt><br/>
 * <tt>data.address = new Object();</tt><br/>
 * <tt>data.address.street = &apos;Bond street&apos;;</tt><br/>
 * <tt>data.address.zipcode = &apos;12345&apos;;</tt><br/>
 * <tt>data.person = new Object();</tt><br/>
 * <tt>data.person.name = &apos;Bond&apos;;</tt><br/>
 * <tt>data.person.age = &apos;42&apos;;</tt><br/>
 * <tt>...</tt><br/>
 * <tt>modelsupport.logDataAccessStateEnd(&apos;s2&apos;, data, &apos;SUCC&apos;);</tt><br/>
 * The output of the invocation is: <br/>
 * <tt>TIME=...|EVNT=SWIdbrx|NAME=s2|RSLT=SUCC|OUTPUT=[address={street=&apos;Bond Street&apos;,
 * zipcode=12345},person={name=&apos;Bond&apos;,age=42}]</tt><br/>
 * <b>Used by: </b>Data access service before the data access is initialized.
 * @param stateID The name of the current state
 * @param output The ouput to the data access state, the object contains custom properties. 
 * Each such property is logged as key-value pair. <b>The values can be nested objects!</b> 
 * See log examples above on how to log the data.
 * @param {String} status The status of the data access
 * @param secure_context The secure context value (optional - may be set to 
 * <tt>undefined</tt> when no value is available).
 * @returns <tt>true</tt>
 */
function logDataAccessStateEnd(stateID, output, status, secure_context) {
	return modelsupport.logDataAccessStateEnd(stateID, output, status, secure_context);
}

/**
 * <b>Calls <tt>logDMStateStart(stateID)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs the time when a DM state is started, a timestamp is automatically added. 
 * Example ECMAScript code: <br/>
 * <tt>modelsupport.logDMStateStart(&apos;s4&apos;);</tt><br/>
 * <b>Used by: </b>By invoker of NDM, ideally this is generated code. This marks 
 * the start point of the DM call. Needs to be triggered before the subdialog 
 * fetch occurs.
 * @param stateID The name of the current state
 * @returns <tt>true</tt>
 */
function logDMStateStart(stateID) {
	return modelsupport.logDMStateStart(stateID);
}

/**
 * <b>Calls <tt>logDMStateEnd(stateID, data)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Appends the DM logs to the existing call logs. This marks the end point of the DM call. 
 * Example VoiceXML code: <br/> 
 * <tt>&lt;subdialog name=&quot;ndm&quot; ...&gt;</tt><br/>
 * <tt>&nbsp;&nbsp;&lt;filled&gt;</tt><br/>
 * <tt>&nbsp;&nbsp;&nbsp;&nbsp;modelsupport.logDMStateEnd(&apos;s4&apos;, 
 * ndm.eventlogs);</tt><br/>
 * <tt>&nbsp;&nbsp;&lt;/filled&gt;</tt><br/>
 * <tt>&lt;/subdialog&gt;</tt><br/>
 * <b>Used by: </b>By invoker of NDM, ideally this is generated code. Needs to 
 * be triggered when the subdialog fetch has ended and a transition happens to 
 * the next form.
 * @param stateID The name of the current state
 * @param data 	The event logs as returned by an NDM invocation. It is 
 * essentially a string delimiting NDM events by newline characters.
 * @returns <tt>true</tt>
 */
function logDMStateEnd(stateID, data) {
    return modelsupport.logDMStateEnd(stateID, data);
}

/**
 * <b>Calls <tt>logLanguage(language)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs the language in use. Example ECMAScript code:<br/>
 * <tt>modelsupport.logLanguage(&apos;jp-JP&apos;)</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>TIME=...|EVNT=SWIlang|LANG=jp-JP</tt><br/>
 * <b>Used by: </b>Application code. 
 * @param language The language in use.
 * @returns <tt>true</tt> 
 */
function logLanguage(language){
	return modelsupport.logLanguage(language);
}

/**
 * <b>Calls <tt>logString(stateID, str)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs a custom string as event, a timestamp is automatically added. 
 * Example ECMAScript code (The example was taken from the Application Level 
 * Event Logging Guide from NAR):<br/> 
 * <tt>modelsupport.logString(&apos;s4&apos;, 
 * &apos;EVNT=SWIcllr|GRP1=female|GRP2=North&apos;);</tt><br/>
 * <b>Used by: </b>By the developer or anywhere where needed. 
 * @param stateID The name of the current state
 * @param str The custom log event to log
 * @returns <tt>true</tt>
 */
function logString(stateID, str) {
	return modelsupport.logString(stateID, str);
}

/**
 * <b>Calls <tt>logError(stateID, error, message)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Logs an error. Example ECMAScript code:<br/>
 * <tt>[1] modelsupport.logError(&apos;s1&apos;,&apos;error.badfetch&apos;,&apos;event message&apos;)<br/>
 *     [2] modelsupport.logError(&apos;s1&apos;,&apos;error.badfetch&apos;)</tt><br/>
 * The output of that invocation is:<br/>
 * <tt>[1] TIME=...|EVNT=ERROR|NODE=s1|ERROR=error.badfetch|MESSAGE=event message<br/>
 *     [2] TIME=...|EVNT=ERROR|NODE=s1|ERROR=error.badfetch</tt><br/>
 * <b>Used by: </b>Application code. 
 * @param stateID The name of the state
 * @param error The error
 * @param message The error message (optional - may be left out or set to <tt>undefined</tt>)
 * @returns <tt>true</tt>
 */
function logError(stateID, error, message) {
	return modelsupport.logError(stateID, error, message);
}

/**
 * <b>Calls <tt>logCallerSegmentation(callerId, grp1, grp2, grp3, grp4)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/> 
 * Associates the segments with the caller id. Takes as many groups as were passed 
 * (up to 4). Example ECMAScript code:  
 * (The example is based on the Application Level Event Logging Guide from NAR):<br/> 
 * <tt>[1] modelsupport.logCallerSegmentation (&apos;1019100100&apos;, &apos;female&apos;);<br/>
 *     [2] modelsupport.logCallerSegmentation (&apos;1019100100&apos;, &apos;male&apos;, &apos;member&apos;, &apos;gold&apos;, &apos;east&apos;);<br/>
 *     [3] modelsupport.logCallerSegmentation (&apos;1019100100&apos;, &apos;male&apos;, undefined, &apos;gold&apos;, &apos;east&apos;);<br/>
 *     [4] modelsupport.logCallerSegmentation (&apos;1019100100&apos;, &apos;male&apos;, '', &apos;gold&apos;, &apos;east&apos;);<br/>
 * The outputs of these invocations are:
 * <tt>[1] TIME=...|EVNT=SWIcllr|CLID=1019100100|GRP1=female <br/>
 *     [2] TIME=...|EVNT=SWIcllr|CLID=1019100100|GRP1=male|GRP2=member|GRP3=gold|GRP4=east</tt><br/>
 *     [3] TIME=...|EVNT=SWIcllr|CLID=1019100100|GRP1=male|GRP3=gold|GRP4=east</tt><br/>
 *     [4] TIME=...|EVNT=SWIcllr|CLID=1019100100|GRP1=male|GRP3=gold|GRP4=east</tt><br/>
 * <b>Used by: </b>Application code or services. 
 * @param callerId Unique Id for the caller
 * @param grp1 Application-defined group name (optional - may be left out or set to <tt>undefined</tt>)
 * @param grp2 Application-defined group name (optional - may be left out or set to <tt>undefined</tt>)
 * @param grp3 Application-defined group name (optional - may be left out or set to <tt>undefined</tt>)
 * @param grp4 Application-defined group name (optional - may be left out or set to <tt>undefined</tt>)
 * @returns <tt>true</tt>
 */
 function logCallerSegmentation(callerId, grp1, grp2, grp3, grp4) {
	 return modelsupport.logCallerSegmentation(callerId, grp1, grp2, grp3, grp4);
 }

/**
 * <b>Calls <tt>logUniqueId(uniqueId)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/> 
 * Logs a unique id for the call. Example ECMAScript code: <br/>  
 * <tt>modelsupport.logUniqueId(&apos;12345&apos;);</tt><br/>
 * The output of the invocations is:
 * <tt>TIME=...|EVNT=SWIunid|UNID=12345</tt><br/>
 * <b>Used by: </b>Application code or services. 
 * @param uniqueId The unique call id
 * @returns <tt>true</tt>
 */
 function logUniqueId(uniqueId){
	 return modelsupport.logUniqueId(uniqueId);
 }

/**
 * <b>Calls <tt>logServiceStart(applicationName, appserverId)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>
 * Identifies the application name. Example ECMAScript code: 
 * (The example is based on the Application Level Event Logging Guide from NAR):<br/>   
 * <tt>modelsupport.logServiceStart(&apos;MyApplicationName&apos;, &apos;127.0.0.1&apos;);</tt><br/>
 * The output of the invocations is:
 * <tt>TIME=...|EVNT=SWIsvst|SVNM=MyApplicationName|APPSERV=127.0.0.1</tt><br/>
 * <b>Used by: </b>Application code or services. 
 * @param applicationName String that uniquely identifies the application
 * @param appserverId Machine ID of the server
 * @returns <tt>true</tt>
 */
 function logServiceStart(applicationName, appserverId){
	 return modelsupport.logServiceStart(applicationName, appserverId);
 }

/**
 * <b>Calls <tt>logEndCall(outcome, callType, exitReason, lastImportantDM)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/> * 
 * Is logged as soon as the application has determined that the caller is exiting the system. Example ECMAScript code 
 * (The example is based on the Application Level Event Logging Guide from NAR):<br/>   
 * <tt>[1]modelsupport.logEndCall(&apos;COMPLETE&apos;, &apos;Reservation&apos;, &apos;HANGUP&apos;, &apos;PlayConfirmation_DM&apos;)<br/>
 *     [2]modelsupport.logEndCall(&apos;COMPLETE&apos;)</tt><br/>
 * The outputs of the invocations are:
 * <tt>[1]TIME=...|EVNT=SWIendcall|OUTCOME=COMPLETE|EXITRESN=HANGUP|CALLTYPE=Reservation|LASTDM=PlayConfirmation_DM|LASTSTATE=welcome|INFO=info|SELFSERVED=true<br/>
 *     [2]TIME=...|EVNT=SWIendcall|OUTCOME=COMPLETE|EXITRESN=|CALLTYPE=UNKNOWN</tt><br/>
 * <b>Used by: </b>Application code or services. 
 * @param outcome Call outcome  (required)
 * @param callType Application-specific string describing the call type (optional, will be set to UNKNOWN if not passed)
 * @param exitReason Exit reason (optional)
 * @param lastImportantDM The last dialog module in the call that was not the one that handled the transfer or goodbye condition (optional)
 * @param laststate The last application state encountered (optional)
 * @param info Application-defined information field. Use this token to add information not otherwise captured, such as whether the caller heard a prompt before hanging up (optional).
 * @param selfserved Boolean: true or false. Whether or not the caller was serviced by the application. This is application-defined.
 * @returns <tt>true</tt>
 */
 function logEndCall(outcome, callType, exitReason, lastImportantDM, laststate, info, selfserved){
	 return modelsupport.logEndCall(outcome, callType, exitReason, lastImportantDM, laststate, info, selfserved);
 }

/**
 * <b>Calls <tt>logTransfer(reason, destination, info)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>  
 * Call was transferred. Example ECMAScript code 
 * (The example is based on the Application Level Event Logging Guide from NAR):<br/>   
 * <tt>[1] modelsupport.logTransfer(&apos;MAXTIMEOUTS&apos;, &apos;call transfer destination&apos;, &apos;additional info&apos;)<br/> 
 *	   [2] modelsupport.logTransfer(&apos;MAXTIMEOUTS&apos;, &apos;call transfer destination&apos;) 
 * </tt><br/>
 * The outputs of these invocations are:
 * <tt>[1] TIME=...|EVNT=SWItrfr|RESN=MAXTIMEOUTS|INFO=additional info; DEST=call transfer destination <br/>
 *     [2] TIME=...|EVNT=SWItrfr|RESN=MAXTIMEOUTS|INFO= ;DEST=call transfer destination
 * </tt><br/>
 * <b>Used by: </b>Application code or services. 
 * @param reason Application-defined reason for the transfer
 * @param destination Call transfer destination
 * @param info Transfer destination (optional - may be left out or set to <tt>undefined</tt>)
 * @returns <tt>true</tt>
 */
 function logTransfer(reason, destination, info){
	 return modelsupport.logTransfer(reason, destination, info);
 }
 
/**
 * <b>Calls <tt>logModuleStart(name, uri)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/> 
 * <p>Logs the start of an application module. The according event logs the module name, the start time and 
 * other useful information</p>
 * <b>Example:</b><br/>
 * <tt>TIME=...|EVNT=modulest|NAME=prompter|URI=/MainApp/init</tt>
 * @param name the module name (required) 
 * @param uri the URI of the module. Must meet the uri syntax described in RFC2963 (required) 
 * @returns <tt>true</tt> 
 */

function logModuleStart(name, uri){
	return modelsupport.logModuleStart(name, uri);
}

/**
 * <b>Calls <tt>logModuleEnd(name, result, type, info, laststate, selfserved, nextmodule, additionaltokens)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/> 
 * Logs the end of an application module. All optional tokens won't get logged if they don't have
 * a value<br/>
 * <b>Example:</b><br/>
 * <tt>[1] TIME=...|EVNT=modulend|NAME=prompter|RESULT=transition</tt><br/>
 * <tt>[1] TIME=...|EVNT=modulend|NAME=prompter|RESULT=transition|TYPE=voice|INFO=my_info|LASTSTATE=sa1007_statename|SELFSERVED=false|NEXTMODULE=pickup|Additional Tokens</tt>
 * @param name the module name, needs to match the module name logged with the modulest event (required)
 * @param result <p>one of the following constants (uppercase string values) <tt>TRANSITION</tt> or <tt>CALLTERMINATE</tt>. (required)</p> 
 * <p>If the value is <tt>CALLTERMINATE</tt> then the tokens posted in the <tt>SWIendcall</tt>, <tt>OUTCOME</tt><tt>EXITRESN</tt> defines
 * further information. There are no specific requirements for these token values in this case.</p> 
 * @param type a free form text field, the content is application/project specific (optional) 
 * @param info a textual description (optional) 
 * @param laststate the name of the last state within the application module. The idea is to log the the signification state within the module and <b>not</b> within a call. (optional) 
 * @param selfserved <b>true</b> if this module is self-served and <b>false</b> if this module is not self-served. (optional) 
 * @param nextmodule the name of the module or the URI of the next module. If it is the URI, this has to meet the URI syntax described in RFC2396 (optional)  
 * @param additionaltokens additional tokens in the form TKN1=value1|TKN2=value2|... (optional) 
 * @returns <tt>true</tt> 
 */
function logModuleEnd(name, result, type, info, laststate, selfserved, nextmodule, additionaltokens){
	return modelsupport.logModuleEnd(name, result, type, info, laststate, selfserved, nextmodule, additionaltokens);
}

/**
 * <b>Calls <tt>logApps(session, step)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>  * <p>Logs the app session id and the appstep id</p>
 * <b>Example:</b><br/>
 * <tt>TIME=...|EVNT=SWIapps|SESN=abc567|STEP=5</tt>
 * @param session the appsession ID 
 * @param step the appstep ID
 * @returns <tt>true</tt> 
 */
function logApps(session, step){
	return modelsupport.logApps(session, step);
};

/**
 * <b>Calls <tt>logCallInfo(values)</tt> on <i>modelsupport</i> and 
 * therefore will fail if such a variable does not exist in the scope!</b><br/>  
 * <p>Logs the app session id and the appstep id</p>
 * <p>Logs all tokens contained in the passed object resp. named map</p>
 * <b>Example:</b><br/>
 * <tt>var map = new Object();<br/>
 * map.TKN1='1';<br/>
 * map.TKN2=2;<br/>
 * logCallInfo(map);<br></tt>
 * Will result in:<br/> 
 * <tt>TIME=...|EVNT=CALL_INFO|TKN1=1|TKN2=2</tt>
 * @param the object resp. named map which contains the tokens  
 * @returns <tt>true</tt> 
 */
function logCallInfo(values){
    return modelsupport.logCallInfo(values);
};

//==============================================================================
//PRIVATE API
//==============================================================================

/**
 * @private
 * Creates a time stamp from the passed sqltime string
 * @param sqltimestring a time string in the format <tt>yyyy_mm_dd hh:mm:ss.fff</tt>
 * @returns The current time in the format <tt>yyyyMMddHHmmssSSS</tt>, example: 
 * <tt>20080709035540870</tt>
 */
ModelSupport.prototype.getTimestamp = function(sqltimestring) {
	var time = sqltimestring;
	time = time.replace(/[^\d]/g, "");
	return time;
};

/**
 * @private
 * Removes the newlines from the given string
 */
ModelSupport.prototype.removeNewlines = function(str) {
	return str.replace(/\n/g, '');
};

/**
 * Creates a new Prompt object. Example ECMAScript code:<br/>
 * <tt>var p = new Prompt(&apos;collection_initialprompt&apos;, &apos;&lt;audio 
 * src=&quot;helloworld.wav&quot;&gt;hello world&lt;/audio&gt;&apos;, 
 * &apos;hello world&apos;);<br/>
 * <b>Used by: </b>Used as input to function 
 * <tt>logPlayState(stateID, prompt)</tt>
 * @class Prompt type
 * @param {String} name The name of the prompt (a string).
 * @param {String} tts The TTS/SSML string as sent to the TTS engine
 * @param {String} text The text representation of the prompt 
 * @return An object instance.
 */
function Prompt(name, tts, text){
    this.name = name;
    this.tts  = tts;
    this.text = text;
}

/**
 * Returns the name stored in the prompt object.<br/>
 * <b>Used by: </b>The implementation of <tt>logPlayState(stateID, prompt)</tt> 
 * method.
 * @return A string object representing the name.
 */
Prompt.prototype.getName = function(){

//NSRD00085286---strict browser fails on undefined variables
if (this.name != undefined){
    return this.name;
    } 
    return null;
}

/**
 * Returns the tts text stored in the prompt object.<br/>
 * <b>Used by: </b>The implementation of <tt>logPlayState(stateID, prompt)</tt> 
 * method.
 * @return A string object representing the tts text.
 */
Prompt.prototype.getTts = function(){

//NSRD00085286---strict browser fails on undefined variables
if (this.tts != undefined){
    return this.tts;
    } 
    return null;
}

/**
 * Returns the text stored in the prompt object.<br/>
 * <b>Used by: </b>The implementation of <tt>logPlayState(stateID, prompt)</tt> 
 * method.
 * @return A string object representing the text.
 */
Prompt.prototype.getText = function(){

//NSRD00085286---strict browser fails on undefined variables
if (this.text != undefined){
    return this.text;
    }
    return null;
}

//Constants for the Call outcome and the Exit reason.
var AGENT_REQUEST = 'AGENT_REQUEST';
var ANSWERING_MACHINE_LEFT_MESSAGE = 'ANSWERING_MACHINE_LEFT_MESSAGE';
var ANSWERING_MACHINE_NO_MESSAGE = 'ANSWERING_MACHINE_NO_MESSAGE';
var APP_ERROR = 'APP_ERROR';
var APP_HUNG_UP = 'APP_HUNG_UP';
var BUSINESS_RULE = 'BUSINESS_RULE';
var BUSY = 'BUSY';
var CALLER_HUNG_UP = 'CALLER_HUNG_UP';
var COMPLETE = 'COMPLETE';
var DB_FAILURE = 'DB_FAILURE';
var MAX_ATTEMPTS = 'MAX_ATTEMPTS';
var NETWORK_ERROR = 'NETWORK_ERROR';
var NO_ANSWER = 'NO_ANSWER';
var SPECIAL_INFORMATION_TONE = 'SPECIAL_INFORMATION_TONE';
var TRANSFER = 'TRANSFER';
var TRANSFER_IVR = 'TRANSFER_IVR';
var UNKNOWN = 'UNKNOWN';
var UNSUPPORTED_DEVICE_FAX = 'UNSUPPORTED_DEVICE_FAX';
