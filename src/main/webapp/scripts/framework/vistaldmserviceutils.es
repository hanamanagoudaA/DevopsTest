/*------------------Start LDM Call Tracking Functions------------------*/

  function startDynamicLDMState(dialogID)
  {
    modelData.callTrackingStateID = dialogID;
    return true;
  }
  
  function endDynamicLDMState(dialogID, output)
  { 
    appendPremadeCallTrackingString(output);
    return true;
  }
  
  function updateModelDataPostConfirm(dialogID, output)
  {
	  appendPremadeCallTrackingString(output);
	  return true;
  }
  
  function startInlineLDMState(dialogID)
  {
    return true;
  }
  
  function endInlineLDMState(dialogID)
  {    
    return true;
  }
  
  function startInlineSubLDMState(dialogID)
  {
    return true;
  }
  
  function endInlineSubLDMState(dialogID)
  { 
    return true;
  }
  
  //VISTA State used to hold some information on current log state
var vistaState = new Object();

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateStart(id, stateID, type, lang, grammars, lowConf, highConf, confType, turnCount, stepName) {
  //Only log entry once
  if(vistaState.inCollection != true) {
    vistaState.inCollection = true;
    vistaLoggingStartCollectionDialog(stateID, grammars);
  }
  
  var trackingData = 'SID('+dialogStates.appstepID+')';
  vistaAppendCallTrackingData(stateID, trackingData);
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateRecognition(id, stateID, result, conf, inputmode, utterance, slots, confReq, confType, mask) {
  vistaLoggingCollectionRecoEvent(stateID, result, conf, utterance, inputmode, mask);
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateRetry(id, stateID, turnCount, stepName, grammars) {
  //Not implmented in VISTA
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateNomatch(id, stateID, inputmode, confType) {
  vistaLoggingEvent(stateID, 'N');
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateMaxNomatch(id, stateID, inputmode, confType) {
  vistaLoggingEvent(stateID, 'ME');
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateNoinput(id, stateID, confType) {  
  vistaLoggingEvent(stateID, 'T');
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateMaxNoinput(id, stateID, confType) {
  vistaLoggingEvent(stateID, 'MT');
}

/**
 *  
 */
function ldmLogMaxTurn(id, stateID){
  vistaLoggingEvent(stateID, 'MN');
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateRepeat(id, stateID, result, conf, inputmode, utterance, slots, confType) {
  vistaLoggingCollectionRecoEvent(stateID, result, conf, utterance, inputmode, false);
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateMaxRepeat(id, stateID, result, conf, inputmode, utterance, slots, confType) {
  vistaLoggingCollectionRecoEvent(stateID, result, conf, utterance, inputmode, false);
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateHelp(stateID, result, conf, inputmode, utterance, slots, confType) {
  vistaLoggingEvent(stateID, 'H');
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateMaxHelp(stateID, result, conf, inputmode, utterance, slots, confType) {
  vistaLoggingEvent(stateID, 'MH');
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateStart(id, stateID, grammars, stepName) {
  vistaLoggingStartConfirmationDialog(stateID, grammars);
  var trackingData = 'SID('+dialogStates.appstepID+')';
  vistaAppendCallTrackingData(stateID, trackingData);
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateConfirmed(id, stateID, result, conf, inputmode, utterance, collectionUtterance, slots, confType, mask) {
  vistaLoggingConfirmationRecoEvent(stateID, result, conf, utterance, inputmode, false);
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateNoToConfirm(id, stateID, result, conf, inputmode, utterance, collectionUtterance, slots, confType, mask) {
  vistaLoggingConfirmationRecoEvent(stateID, result, conf, utterance, inputmode, false);
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateMaxNoToConfirm(id, stateID, result, conf, inputmode, utterance, collectionUtterance, slots, confType, mask) {
  vistaLoggingConfirmationRecoEvent(stateID, result, conf, utterance, inputmode, false);
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateRecognition(id, stateID, result, conf, inputmode, utterance, slots, confType, mask) {
  vistaLoggingConfirmationRecoEvent(stateID, result, conf, utterance, inputmode, mask);
}


/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateRetry(id, stateID, grammars, stepName) {
  //Not implmented in VISTA
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateNomatch(id, stateID, inputmode, confType) {
  vistaLoggingEvent(stateID, 'CN');
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateMaxNomatch(id, stateID, inputmode, confType) {
  vistaLoggingEvent(stateID, 'CME');
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateNoinput(id, stateID, confType) {  
  vistaLoggingEvent(stateID, 'CT');
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateMaxNoinput(id, stateID, confType) {
  vistaLoggingEvent(stateID, 'CMT');
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateRepeat(id, stateID, result, conf, inputmode, utterance, slots, confType) {
  vistaLoggingConfirmationRecoEvent(stateID, result, conf, utterance, inputmode, false);
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateMaxRepeat(id, stateID, result, conf, inputmode, utterance, slots, confType) {
  vistaLoggingConfirmationRecoEvent(stateID, result, conf, utterance, inputmode, false);
}

/**
 * TODO - Document Me
 */
function ldmLogEnd(id, stateID, confType, result, event, maskData) {
  //Not implmented in VISTA
}

//*** VISTA Logging Functions - Start ***//

/**
 * TODO - Document me
 */
function vistaLoggingStartCollectionDialog(stateID, grammarList) {
  var trackingData = '';
  if (grammarList == undefined) {
    trackingData = 'S';
  }
  else { 
    trackingData = 'S(' + grammarList.join(',') + ')'; 
  }
  vistaAppendCallTrackingData(stateID, trackingData);
}

function vistaLoggingCollectionRecoEvent(stateID, result, conf, utterance, mode, mask) {
  var trackingData = '';
  
  if(mask == true) {
    result = '****';
    utterance = '****';
  }
  
  trackingData = 'R(' + conf + ':' + utterance + ':' + mode + ':' + result + ')';
  
  vistaAppendCallTrackingData(stateID, trackingData);
}

function vistaLoggingStartConfirmationDialog(stateID, grammarList) {
  var trackingData = '';
  if (grammarList == undefined) {
    trackingData = 'CS';
  }
  else { 
    trackingData = 'CS(' + grammarList.join(',') + ')'; 
  }
  vistaAppendCallTrackingData(stateID, trackingData);
}

function vistaLoggingConfirmationRecoEvent(stateID, result, conf, utterance, mode, mask) {
  var trackingData = '';
  
  if(mask == true) {
    result = '****';
    utterance = '****';
  }
  
  trackingData = 'CR(' + conf + ':' + utterance + ':' + mode + ':' + result + ')';
  
  vistaAppendCallTrackingData(stateID, trackingData);
}

/**
 * TODO - Document me
 */
function vistaLoggingEvent(stateID, eventCode) {
  vistaAppendCallTrackingData(stateID, eventCode);
}

/**
 * TODO - Document me
 */
function vistaAppendCallTrackingData(stateID, trackingData)
{
  modelData.callTrackingStateID = stateID;
  var logString = stateID + '|' + trackingData + '|' + vistaGetTimeStamp();

  //remove semi colons, newlines, and carriage return
  logString = logString.replace(/;/g, ':');
  logString = logString.replace(/\r/g, ' ');
  logString = logString.replace(/\n/g, ' ');

  modelData.callTrackingBody += logString + ';';
}

/**
 * TODO - Document me
 * Generates the current time in the form: yyyyMMdd.kk:mm:ss.SSS
 */
function vistaGetTimeStamp() {
  var d = new Date();
  var yearString = d.getFullYear();
  
  // Milliseconds can be derived from the getTime function
  var milliString = vistaPadNumber(d.getTime() % 1000, '0', 3);
  var dateString;

  dateString = yearString + vistaPadNumber(d.getMonth() + 1, '0', 2) + vistaPadNumber(d.getDate(), '0', 2);
  dateString = dateString + '.' + vistaPadNumber(d.getHours(), '0', 2) + ':' + vistaPadNumber(d.getMinutes(), '0', 2);
  dateString = dateString + ':' + vistaPadNumber(d.getSeconds(), '0', 2) + '.' + milliString;
  return dateString;
}

/**
 * TODO - Document me
 * Used by vistaGetTimeStamp() to pad strings out to a given length
 */
function vistaPadNumber(oldString, padChar, fieldLength) {
  var newString = '' + oldString; // Force the new var to a string
  var strLength = newString.length;
  var i;
  for (i = strLength; i < fieldLength; i++) {
    newString = '' + padChar + newString;
  }
  return newString;
}

//*** VISTA Logging Functions - End ***//