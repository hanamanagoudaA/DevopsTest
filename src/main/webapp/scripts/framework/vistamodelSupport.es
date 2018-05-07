// appends modelData information (stateID and body) as updated by another
// part of the application (typically called when a SUBDIALOG returns)
function appendPremadeCallTrackingString(newModelDataObject)
{
    if(newModelDataObject != null) {
        if(newModelDataObject.callTrackingStateID != undefined && newModelDataObject.callTrackingStateID != '') {
                modelData.callTrackingStateID = newModelDataObject.callTrackingStateID;
            }
            if(newModelDataObject.callTrackingBody != undefined && newModelDataObject.callTrackingBody != '') {
            modelData.callTrackingBody += newModelDataObject.callTrackingBody;
        }
        if(newModelDataObject.lastRecognition != undefined && newModelDataObject.lastRecognition != '') {
            modelData.lastRecognition = newModelDataObject.lastRecognition;
        }
    }
}

// Generates the current time in the form: yyyyMMdd.kk:mm:ss.SSS
function getTimeStamp() {

    var d = new Date();
    var yearString = d.getFullYear();
    // Milliseconds can be derived from the getTime function
    var milliString = padNumber(d.getTime() % 1000, '0', 3);
    var dateString;

    dateString = yearString + padNumber(d.getMonth() + 1, '0', 2) + padNumber(d.getDate(), '0', 2);
    dateString = dateString + '.' + padNumber(d.getHours(), '0', 2) + ':' + padNumber(d.getMinutes(), '0', 2);
    dateString = dateString + ':' + padNumber(d.getSeconds(), '0', 2) + '.' + milliString;
    return dateString;
}

// format a date object and return in the form: yyyyMMdd.kk:mm:ss.SSS
function formatTimeStamp(d) {

    var yearString = d.getFullYear();
    // Milliseconds can be derived from the getTime function
    var milliString = padNumber(d.getTime() % 1000, '0', 3);
    var dateString;

    dateString = yearString + padNumber(d.getMonth() + 1, '0', 2) + padNumber(d.getDate(), '0', 2);
    dateString = dateString + '.' + padNumber(d.getHours(), '0', 2) + ':' + padNumber(d.getMinutes(), '0', 2);
    dateString = dateString + ':' + padNumber(d.getSeconds(), '0', 2) + '.' + milliString;
    return dateString;
}

// Used by getTimeStamp to pad strings out to a given length
function padNumber(oldString, padChar, fieldLength) {
    var newString = '' + oldString; // Force the new var to a string
    var strLength = newString.length;
    var i;

    for (i = strLength; i < fieldLength; i++) {
        newString = '' + padChar + newString;
    }
    return newString;
}

/*  This function accepts an object with various 'properties' and returns each of hte prpoerties as 
 *   a comma delimited list of "name=value" pairs.
*/
function assembleNameValueList(inOutObject)
{   
    var outputString="";
    var key="";
    for (key in inOutObject)
    {
        outputString += key + "=" + inOutObject[key] + ",";
    }
    
    // trim off the last comma when we are done.
    outputString = outputString.slice(0, -1);

    return outputString; 
}

/* Appends a log string to the call tracking string in the format 'id|trackingData|timestamp;' 
* to the global string modelData (formerly 'callTrackingBody').
*/
function appendCallTrackingData(id, trackingData)
{
    modelData.callTrackingPreviousStateID = modelData.callTrackingStateID;
    modelData.callTrackingStateID = id;
    var logString = '' + id + '|' + trackingData + '|' + getTimeStamp();

    //remove semi colons, newlines, and carriage return
    logString = logString.replace(/;/g, ':');
    logString = logString.replace(/\r/g, ' ');
    logString = logString.replace(/\n/g, ' ');

    modelData.callTrackingBody += logString + ';';
}

/*
*/
function removeSemicolons(message) {
    var cleanedMessage = message.replace(/;/g, "-semicolon-");
    return cleanedMessage;
}

/*
*   Replace '|' with a space character (to not break parsing)
*/
function removePipe(message) {
    var cleanedMessage = message.replace(/\|/g, " ");
    return cleanedMessage;
}

function addHeader(key, value) {    
    var trackingData = key + "=" + value + ";";
    modelData.callTrackingHeader.headerString += trackingData;
    return(true);
}

  
function endCall(startTime) {
    if(startTime==undefined || startTime==null) {
        startTime = new Date();
    }
    
    var endTime = new Date();
    var totalTime = endTime.getTime() - startTime.getTime();

    // compute minutes:seconds.milliseconds of total call time
    var hours = Math.floor(totalTime / (60 * 60 * 1000));
    totalTime -= hours * (60 * 60 * 1000);
    var minutes = Math.floor(totalTime / (60 * 1000));
    totalTime -= minutes * (60 * 1000);
    var seconds = Math.floor(totalTime / 1000);
    totalTime -= seconds * 1000;
    var milliseconds = totalTime;

    var totalTimeStamp = padNumber(minutes, '0', 2) + ':' + padNumber(seconds, '0', 2) + '.' + padNumber(milliseconds, '0', 3);
    return totalTimeStamp;
}

/*
*   Builds the header
*/
function buildHeader(modelData)
{
    modelData.callTrackingHeader.totalTime = endCall(modelData.callTrackingHeader.startTime);
        
    // add Header fields
    addHeader("CALLID", modelData.callTrackingHeader.callId || '');
    addHeader("DNIS", modelData.callTrackingHeader.dnis || '');
    addHeader("ANI", modelData.callTrackingHeader.ani || '');
    addHeader("MACHINEID", modelData.callTrackingHeader.machineId || '');
    addHeader("CHANNEL", modelData.callTrackingHeader.channel || '');
    addHeader("ACCTID", modelData.callTrackingHeader.accountId || '');
    addHeader("STARTTIME", formatTimeStamp(modelData.callTrackingHeader.startTime) || '');
    addHeader("TOTALTIME", modelData.callTrackingHeader.totalTime || '');
    addHeader("DESTINATION", modelData.callTrackingHeader.transferNumber || '');
    addHeader("SEGMENT", modelData.callTrackingHeader.segment || '');
    
    //return finalVistaString
    return modelData.callTrackingHeader.headerString+';';
}

/*
*   Builds the final version of the vista String
*/
function buildBody(modelData)
{
    //return finalVistaString
    return modelData.callTrackingBody + ';';
}

/*
*   Builds the final version of the vista String
*/
function buildVista()
{
    //append header to body
    var finalVistaString = buildHeader(modelData) + buildBody(modelData);
    
    //return finalVistaString
    return finalVistaString;
}

function trackCallEndCallerHangup() {
    appendCallTrackingData(modelData.callTrackingStateID, 'XH');
}

function trackCallEndApplicationHangup(stateId) {
    appendCallTrackingData(stateId, 'XA');
}

function trackCallEndTransfer(stateId) {    
    appendCallTrackingData(stateId, 'XC');
}

function trackRequestCSR(stateUrl) {    
    appendCallTrackingData(modelData.callTrackingStateID, 'MO');
    return stateUrl;
}

function appendVarState(stateId, name, value){
    var dataString = 'V('+name+'='+value+')';
    appendCallTrackingData(stateId,dataString);
}