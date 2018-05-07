/*--------------------Start NDF Application Functions -----------------------------*/

// ----- global variables

// application globals 
var modelfactory = new ModelFactory();
var model = modelfactory.createModel();
var modelsupport = new ModelSupport(model);
var enableNODSupport = false; // see application_config.xml for details
var enableVBSSupport = false; // see application_config.xml for details

// logging variables 
var applicationname = '';
var companyname = '';
var appsessionID = '';
var appstepID = '';
var callLogStartTime = ''; // 1972-03-03 11:12:13.517
var logging_base_path = '';
var browserip = '';
var browsertime = (new Date()).getTime();
var logURL = '';
var logDataSetterURL = '';
var logDataGetterURL = '';

// application variables
var dnis = '';
var ani = '';
var tfn = '';

// encryption variables
var security = '';
var encryption_key = '';
var encryption_key_tag = '';
var internal_encryption = '';

// DID information variables
var start_time = '';
var comboID = '';
var ndf_version = ''; // NDF Version got from
var platformVersion = ''; // request.getHeader("User-Agent"); // NVP Version got from voice browser


// ----- function definitions -----

/**

 * The function updateFromVBS reads all data from 
 * session.platformdata including the session.xml 
 * from VB if supported and if enableNODSupport 
 * is set to true!
 * 
 * enableVBSSupport is not used here!
 */
function updateFromVBS(enableNODSupport, enableVBSSupport) {
    try {
        if (enableVBSSupport) {
            // nothing todo
        }
        if (enableNODSupport) {
            if (typeof session != undefined && typeof session.platformdata != undefined) {
                start_time = session.platformdata.START_TIME;

                // US2763:
                // will NOT be overwritten by values from application-config.xml !!
                // check 'com.nuance.framework.controller.tag.CallLogInitTag.java'
                
                // NSRD00069242 - guard with != undefined
                if (session.platformdata.APPLICATION_ID != undefined) {
                    applicationname = session.platformdata.APPLICATION_ID;
                }
                
                // NSRD00069242 - guard with != undefined
                if (session.platformdata.ORGANIZATION_ID != undefined) {
                    companyname = session.platformdata.ORGANIZATION_ID;
                }

                platformVersion = session.platformdata.PLATFORM_VERSION;
                
                // now reading from session.xml
                var sessionXML = session.platformdata.sessionxml;
                var error_msg='';

                if (sessionXML != undefined) {
                    var root = sessionXML.documentElement;
                    
                    // read global settings
                    var globalNode = root.getElementsByTagName("global").item(0);
                    var paramList = globalNode.getElementsByTagName("param");
                    var n = paramList.length;  // No. of <param>-tags
                    var i = 0;
                    
                    for (i=0; i<n; i++) {
                        var attr_name = paramList.item(i).getAttribute("name");
                        var value = paramList.item(i).getElementsByTagName("value").item(0).firstChild.data
                        if (attr_name == 'company_name') {
                            companyname = value;
                        }
                        else if (attr_name == 'application_name') {
                            applicationname = value;
                        }
                    }
                    
                    // read encryption related settings
                    globalNode = root.getElementsByTagName("logging").item(0);
                    paramList = globalNode.getElementsByTagName("param");
                    n = paramList.length;  // No. of <param>-tags;
                    
                    for (i=0; i<n; i++) {
                        var attr_name = paramList.item(i).getAttribute("name");
                        var value = paramList.item(i).getElementsByTagName("value").item(0).firstChild.data
                        if (attr_name == 'encryption_key') {
                            encryption_key = value;
                        }
                        else if (attr_name == 'encryption_key_tag') {
                            encryption_key_tag = value;
                        }
                        else if (attr_name == 'internal_encryption') {
                            internal_encryption = value;
                        }
                    }
                }
                else {
                    error_msg = "Session-XML is not exposed as the DOM object.  Please check 'browser.sessionXml.uri' property is specified properly or not.";
                }
                
            }
        }
    } catch (x) {
        // nothing todo            
    }
};

// ----- internal variables

// call log data
model.appdata.ani = ani;
model.appdata.dnis = dnis;
model.appdata.tfn = tfn;
model.appdata.browserip = browserip;
model.appdata.callid = '';

var applicationServerHostname = '';

// call log helper variables
var applicationCallType = 'unknown';
var applicationLastImportantDM = '';

var callerSegmentationCallerId = '';
var callerSegmentationGroup1 = '';
var callerSegmentationGroup2 = '';
var callerSegmentationGroup3 = '';
var callerSegmentationGroup4 = '';

var applicationCallOutcome = 'unknown';
var applicationExitReason = 'unknown';

var applicationLaststate = undefined;
var applicationSelfserved = undefined;

var moduleName = 'NDF Application Module';
var moduleEndType = undefined;
var moduleEndResult = undefined;
var moduleLaststate = undefined;
var moduleEndInfo = undefined;
var moduleSelfserved = undefined;
var nextModule = undefined;
var moduleEndAdditionalTokens = undefined;
var endcallInfo = undefined;

var callInfoData = new Object();


function setANI(an) {
    model.appdata.ani = an;
    ani = an;
    return(true);
}

function setDNIS(dn) {
    model.appdata.dnis = dn;
    dnis = dn;
    return(true);
}

function setTFN(tn) {
    model.appdata.tfn = tn;
    tfn = tn;
    return(true);
}

function setBrowserIP(br) {
    model.appdata.browserip = br;
    browserip = br;
    return(true);
}

function updateCallLevelData(applicationName, applicationServerHostname, uniqueId, language) {
    logServiceStart(applicationName, applicationServerHostname);
    logUniqueId(uniqueId);
    updateLanguage(language);
    
    return(true);
}

function updateLanguage(language) {
    logLanguage(language);
    return(true);
}

function updateLastImportantDM(lastImportantDM) {
    
    if(lastImportantDM != undefined ) {
        applicationLastImportantDM = lastImportantDM;
    }
    
    return(true);
}

function updateCallType(callType) {
    
    if(callType != undefined ) {
        applicationCallType = callType;
    }
    
    return(true);
}

function updateCallerSegmentation(callerId, grp1, grp2, grp3, grp4) {

    if(callerId != undefined) {
        callerSegmentationCallerId = callerId;
    }
    
    if(grp1 != undefined) {
        callerSegmentationGroup1 = grp1;
    }
    
    if(grp2 != undefined) {
        callerSegmentationGroup2 = grp2;
    }
    
    if(grp3 != undefined) {
        callerSegmentationGroup3 = grp3;
    }
    
    if(grp4 != undefined) {
        callerSegmentationGroup4 = grp4;
    }
    
    return(true);
}

function updateCallOutcomeReason(outcome, exitReason) {
    
    if(outcome != undefined) {
        applicationCallOutcome = outcome;
    }
    
    if(exitReason != undefined) {
        applicationExitReason = exitReason;
    }
    
    return(true);
}

function updateTransferData(destination, info) {
    logTransfer(applicationExitReason, destination, info);
    
    return(true);
}

/**  
 * The function startCallEnd invokes the 
 * logCallInfo,
 * logCallerSegmentation and also the 
 * logEndCall method, which create then
 *  an 'CALL_INFO', 
 *  an 'SWIcllr' and an
 *  an 'SWIendcall' event as follows: (see modulSupport for details)<break>
 * <code>
 * <tt>TIME=...|EVNT=CALL_INFO|...</tt>
 * <tt>TIME=...|EVNT=SWIcllr|...</tt>
 * <tt>TIME=...|EVNT=SWIendcall|...</tt>
 * </code>
 * whereas the updateCallInfo adds data only if available:
 * <code>
 * [TS:: Di -- 24.08.10 -- 16:13] currently available are:
 *  INFO: session.platformdata.APPLICATION_ID =ndr test app
 *  INFO: session.platformdata.CALL_TYPE =INBOUND
 *  INFO: session.platformdata.NSS_HOST =ac-schenk-nod-server-2
 *  INFO: session.platformdata.START_TIME =20100805130521
 *  INFO: session.platformdata.PLATFORM_VERSION =NVP/5.0.0
 *  INFO: session.platformdata.ORGANIZATION_ID =Nuance
 *  
 *  WARN: session.platformdata.BASIC_WCR_ENABLED =undefined
 *  WARN: session.platformdata.END_TIME =undefined
 *  WARN: session.platformdata.EXTENDED_WCR_ENABLED =undefined
 *  WARN: session.platformdata.UTTERANCE_CAPTURE_ENABLED =undefined
 * </code>
 */
function startCallEnd() {
    updateCallInfo('APPVERSION', version);
    updateCallInfo('NDF_VERSION', ndf_version);
    updateCallInfo('ORGANIZATION_ID', companyname);
    updateCallInfo('APPLICATION_ID', applicationname);
    updateCallInfo('SESSION_ID', appsessionID);
    updateCallInfo('START_TIME', start_time);
    updateCallInfo('PLATFORM_VERSION', platformVersion);
    var tzo=(new Date().getTimezoneOffset()/60)*(-1);
    updateCallInfo('TIMEZONE', 'GMT'+(tzo<0?'':'+')+tzo);
    try {
        // this is independent of enableNODSupport
        if (typeof session != undefined && typeof session.platformdata != undefined) {
            updateCallInfo('CALL_TYPE', session.platformdata.CALL_TYPE);
            updateCallInfo('NSS_HOST', session.platformdata.NSS_HOST);
            updateCallInfo('BASIC_WCR_ENABLED', session.platformdata.BASIC_WCR_ENABLED);
            updateCallInfo('EXTENDED_WCR_ENABLED', session.platformdata.EXTENDED_WCR_ENABLED);
            updateCallInfo('UTTERANCE_CAPTURE_ENABLED', session.platformdata.UTTERANCE_CAPTURE_ENABLED);
        }
    } catch (x) {
        // nothing todo    
    }
    logCallInfo(callInfoData);
    logCallerSegmentation(callerSegmentationCallerId, callerSegmentationGroup1, callerSegmentationGroup2, callerSegmentationGroup3, callerSegmentationGroup4);
    
    var tempLaststate = applicationLaststate;
    tempLaststate = (tempLaststate == undefined ? moduleLaststate : tempLaststate);
    var tempSelfserved = applicationSelfserved;
    tempSelfserved = (tempSelfserved == undefined ? moduleSelfserved : tempSelfserved);
    logEndCall(applicationCallOutcome, applicationCallType, applicationExitReason, applicationLastImportantDM, tempLaststate, endcallInfo, tempSelfserved);
    return(true);
}

function startTransit() {
    if (   (callerSegmentationGroup1 != undefined && callerSegmentationGroup1 != '')
        || (callerSegmentationGroup2 != undefined && callerSegmentationGroup2 != '')
        || (callerSegmentationGroup3 != undefined && callerSegmentationGroup3 != '')
        || (callerSegmentationGroup4 != undefined && callerSegmentationGroup4 != '') )
    { 
        logCallerSegmentation(callerSegmentationCallerId, callerSegmentationGroup1, callerSegmentationGroup2, callerSegmentationGroup3, callerSegmentationGroup4);
    }
    return(true);
}

/**
 * Stores data that will be used when logModuleEnd will be called
 * @param name the module name, needs to match the module name logged with the modulest event (required)
 * @param result <p>one of the following constants (uppercase string values) <tt>TRANSITION</tt> or <tt>CALLTERMINATE</tt>. (optional)</p> 
 * <p>If the value is <tt>CALLTERMINATE</tt> then the tokens posted in the <tt>SWIendcall</tt>, <tt>OUTCOME</tt><tt>EXITRESN</tt> defines
 * further information. There are no specific requirements for these token values in this case.</p> 
 * @param type a free form text field, the content is application/project specific (optional) 
 * @param info a textual description (optional) 
 * @param laststate the name of the last state within the application module. The idea is to log the the signification state within the module and <b>not</b> within a call. (optional) 
 * @param selfserved <b>true</b> if this module is self-served and <b>false</b> if this module is not self-served. (optional) 
 * @param nextmodule the name of the module or the URI of the next module. If it is the URI, this has to meet the URI syntax described in RFC2396 (optional)  
 * @return <b>true</b>
 */
function updateModuleEnd(name, result, type, info, laststate, selfserved, nextmodule){
    if(name == undefined || name == ''){
        throw new Error('NDFApplicationUtils#updateModuleEnd: the name parameter is mandatory, but actually is ['+name+']!');
    }
    if(result != undefined && result != 'CALLTERMINATE' && result != 'TRANSITION'){
        throw new Error('NDFApplicationUtils#updateModuleEnd: the value for result must be either CALLTERMINATE or TRANSITION, but it is ['+result+']');
    }
    // accept both, string and the corresponding boolean value
    if(selfserved != undefined && selfserved != 'true' && selfserved != true 
            && selfserved != 'false' && selfserved != false){
        throw new Error('NDFApplicationUtils#updateModuleEnd: a value for selfserved is defined but invalid, it must be either \'true\' or \'false\' or the corresponding,'
                +' boolean value, but it is ['+selfserved+']');
    } 
    moduleName = name;
    moduleEndResult = result;
    moduleEndType = type;
    moduleLaststate = laststate;
    moduleEndInfo = info;
    moduleSelfserved = selfserved;
    // distinguish case because otherwise it won't get set 
    nextModule = nextmodule;    
    
    return true;
}



/**
 * Stores data that will be used when logModuleEnd will be called
 * @param name the module name, needs to match the module name logged with the modulest event (required)
 * @param result <p>one of the following constants (uppercase string values) <tt>TRANSITION</tt> or <tt>CALLTERMINATE</tt>. (required)</p> 
 * <p>If the value is <tt>CALLTERMINATE</tt> then the tokens posted in the <tt>SWIendcall</tt>, <tt>OUTCOME</tt><tt>EXITRESN</tt> defines
 * further information. There are no specific requirements for these token values in this case.</p> 
 * @return <b>true</b>
 */
function updateModuleNameAndResult(name, result){
    if(name == undefined || name == ''){
        throw new Error('NDFApplicationUtils#updateModuleEndNameAndResult: the name parameter is mandatory, but actually is ['+name+']!');
    }
    if(result == undefined && result != 'CALLTERMINATE' && result != 'TRANSITION'){
        throw new Error('NDFApplicationUtils#updateModuleNameAndResult: the value for result must be either CALLTERMINATE or TRANSITION, but it is ['+result+']');
    }
    moduleName = name;
    moduleEndResult = result;
    
    return true;
}

/**
 * Stores data that will be used when logModuleEnd will be called
 * @param name the module name, needs to match the module name logged with the modulest event (required)
 * @return <b>true</b>
 */
function updateModuleName(name, result){
    if(name == undefined || name == ''){
        throw new Error('NDFApplicationUtils#updateModuleName: the name parameter is mandatory, but actually is ['+name+']!');
    }
    moduleName = name;
    
    return true;
}


/**
 * Stores data that will be used when logModuleEnd will be called
 * @param type a free form text field, the content is application/project specific (optional) 
 * @return <b>true</b>
 */
function updateModuleEndType(type){
    moduleEndType = type;
    return true;
}

/**
 * Stores data that will be used when logEndCall will be called
 * @param info a textual description (optional) 
 * @return <b>true</b>
 */
function updateModuleEndInfo(info){
    moduleEndInfo = info;
    return true;
}

/**
 * Stores data that will be used when logModuleEnd will be called
 * @param laststate the name of the last state within the application module. The idea is to log the the signification state within the module and <b>not</b> within a call. (optional) 
 * @return <b>true</b>
 */
function updateModuleLaststate(laststate){
    moduleLaststate = laststate;
    return true;
}

/**
 * Stores data that will be used when logModuleEnd will be called
 * @param selfserved <b>true</b> if this module is self-served and <b>false</b> if this module is not self-served. (optional) 
 * @return <b>true</b>
 */
function updateModuleSelfserved(selfserved){
    if(selfserved != undefined){
        if(selfserved != 'true' && selfserved != true && selfserved != 'false' && selfserved != false){
            throw new Error('NDFApplicationUtils#updateModuleSelfserved: a value for selfserved is defined but invalid, it must be either \'true\' or \'false\' or the corresponding,'
                    +' boolean value, but it is ['+selfserved+']');

        }
    }
    moduleSelfserved = selfserved;
    return true;
}

/**
 * Stores data that will be used when logModuleEnd will be called
 * @param nextmodule the name of the module or the URI of the next module. If it is the URI, this has to meet the URI syntax described in RFC2396 (optional)  
 * @return <b>true</b>
 */
function updateNextmodule(nextmodule){
    nextModule = nextmodule;
    return true;
}

/**
 * Stores data that will be used when logModuleEnd will be called
 * @param additionaltokens additional tokens in the form TKN1=value1|TKN2=value2|... (optional) 
 * @returns <tt>true</tt> 
 */
function updateModuleEndAdditionalTokens(additionaltokens){
    moduleEndAdditionalTokens = additionaltokens;
    return true;
}

/**
 * Stores data that will be used when logModuleEnd will be called
 * @param info a textual description 
 * @return <b>true</b>
 */
function updateEndcallInfo(info){
    endcallInfo = info;
    return true;
}

/**
 * Stores data that will be used when logModuleEnd will be called
 * @param laststate the last application state 
 * @return <b>true</b>
 */
function updateLaststate(laststate){
    applicationLaststate = laststate;
    return true;
}

/**
 * Stores data that will be used when logModuleEnd will be called
 * @param selfserved a boolean (or corresponding string) value indicating 
 * whether the application is selfserved or not
 * @return <b>true</b>
 */
function updateSelfserved(selfserved){
    applicationSelfserved = selfserved;
    return true;
}

/**
 * <p>Sets the specified call info data. If an entry with this key already 
 * exists, it will get overwritten. In case <tt>undefined</tt> is passed as value
 * the corresponding entry will be removed.</p>
 * <p>Please note that this method will not process the given data. The caller
 * has to assert that valid logging data is passed, e.g. that neither the value 
 * nor the token contain newline characters. </p>
 * @param key the key of the call info data item to set
 * @param value the value 
 * @return true
 */
function updateCallInfo(key, value){
    if (typeof value != undefined && typeof key != undefined) {
        if (value != '')
            callInfoData[key] = value;
        return true;
    } else
    return false;
}

/**
 * <p>Clears the call info data stored before.</p>
 * @return true
 */
function clearCallInfo(){
    callInfoData = new Object();
    return true;
}