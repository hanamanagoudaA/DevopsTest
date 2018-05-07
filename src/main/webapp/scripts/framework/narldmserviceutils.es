/*------------------Start LDM Call Tracking Functions------------------*/
  
  function startDynamicLDMState(stateID)
  {
    modelsupport.logDMStateStart(stateID);
    return true;
  }
  
  function endDynamicLDMState(stateID, output)
  { 
    modelsupport.logDMStateEnd(stateID,output.getCalllog()); 
    model.changedState(stateID);
    return true;
  }
  
  function updateModelDataPostConfirm(stateID, output)
  { 
    modelsupport.logDMStateEnd(stateID,output.getCalllog());
    return true;
  }
  
  function startInlineLDMState(stateID)
  {
	modelsupport.logDMStateStart(stateID);
    return true;
  }
  
  function endInlineLDMState(stateID)
  {  
	model.changedState(stateID);
    return true;
  }
  
  function startInlineSubLDMState(stateID)
  {
	modelsupport.logDMStateStart(stateID);
    return true;
  }
  
  function endInlineSubLDMState(stateID)
  { 
	model.changedState(stateID);
    return true;
  }
  
//NAR State used to hold some information on current log state
var narState = new Object();

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateStart(id, stateID, type, lang, grammars, lowConf, highConf, confType, turnCount, stepName) {
  
  //Set confidence (1=1000)
  lowConf = lowConf * 1000;
  highConf = highConf * 1000;
  
  if(narState.inDm != true) {
    narLoggingAppStep(0);
    narLoggingDmStart(id, stateID, type, lang, lowConf, highConf, confType);
  } else {
    narLoggingAppStep(0);
  }
  
  if(narState.inPhase != true) {
    narLoggingPhaseStart(type);
  }
  
  narLoggingTryStart('Collection', turnCount);
  narLoggingStepStart('Collection', stepName, grammars);
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateRecognition(id, stateID, result, conf, inputmode, utterance, slots, confReq, confType, mask) {

  //Set mode
  var mode = custGetMode(inputmode)
  
  //Set confidence (1=1000)
  conf = conf * 1000;
  
  if(confReq == true) {
    narLoggingStepEnd('Confirm', mode, conf, confType, 'True', slots, mask);
  } else {
    narLoggingStepEnd('Accept', mode, conf, confType, null, slots, mask);
    narLoggingTryEnd('Accepted', utterance, mask);
  }
  
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateRetry(id, stateID, turnCount, stepName, grammars) {
  
  narLoggingAppStep(1);
  narLoggingTryStart('Collection', turnCount);
  narLoggingStepStart('Collection', stepName, grammars);

}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateNomatch(id, stateID, inputmode, confType) {
  
  //Set mode
  var mode = custGetMode(inputmode)
  
  narLoggingStepEnd('Reject', mode, null, confType, null, null, false);
  narLoggingTryEnd('Failed', null, false);
  
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateMaxNomatch(id, stateID, inputmode, confType) {
  ldmLogCollectionStateNomatch(id, stateID, inputmode, confType);
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateNoinput(id, stateID, confType) {  
  
  narLoggingStepEnd('Fail', 'Timeout', null, confType, null, null, false);
  narLoggingTryEnd('Failed', null, false);
  
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateMaxNoinput(id, stateID, confType) {
  ldmLogCollectionStateNoinput(id, stateID, confType)
}

/**
 *  TODO - Document Me
 */
function ldmLogMaxTurn(id, stateID){
	//Not needed for NAR logging. Max turns will be logged in the ldmLogEnd() method
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateRepeat(id, stateID, result, conf, inputmode, utterance, slots, confType) {
  
  //Set mode
  var mode = custGetMode(inputmode)
  
  //Set confidence (1=1000)
  conf = conf * 1000;
  
  narLoggingStepEnd('Accept', mode, conf, confType, 'Command', slots, false);
  narLoggingTryEnd('Accepted', utterance, false);
 
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateMaxRepeat(id, stateID, result, conf, inputmode, utterance, slots, confType) {
  ldmLogCollectionStateRepeat(id, stateID, result, conf, inputmode, utterance, slots, confType);
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateHelp(id, stateID, result, conf, inputmode, utterance, slots, confType) {
  
  //Set mode
  var mode = custGetMode(inputmode)
  
  //Set confidence (1=1000)
  conf = conf * 1000;
  
  narLoggingStepEnd('Accept', mode, conf, confType, 'Command', slots, false);
  narLoggingTryEnd('Accepted', utterance, false);
 
}

/**
 * TODO - Document Me
 */
function ldmLogCollectionStateMaxHelp(id, stateID, result, conf, inputmode, utterance, slots, confType) {
  ldmLogCollectionStateHelp(id, stateID, result, conf, inputmode, utterance, slots, confType);
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateStart(id, stateID, grammars, stepName) {
  
  narLoggingAppStep(0);
  narLoggingStepStart('Confirmation', stepName, grammars);
  
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateConfirmed(id, stateID, result, conf, inputmode, utterance, collectionUtterance, slots, confType, mask) {
  
  //Set mode
  var mode = custGetMode(inputmode)
  
  //Set confidence (1=1000)
  conf = conf * 1000;
  
  narLoggingStepEnd('Accept', mode, conf, confType, 'True', slots, false);
  narLoggingTryEnd('Confirmed', collectionUtterance, mask);
  
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateNoToConfirm(id, stateID, result, conf, inputmode, utterance, collectionUtterance, slots, confType, mask) {
  
  //Set mode
  var mode = custGetMode(inputmode)
  
  //Set confidence (1=1000)
  conf = conf * 1000;
  
  narLoggingStepEnd('Accept', mode, conf, confType, 'False', slots, false);
  narLoggingTryEnd('Denied', collectionUtterance, mask);
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateMaxNoToConfirm(id, stateID, result, conf, inputmode, utterance, collectionUtterance, slots, confType, mask) {
  ldmLogConfirmationStateNoToConfirm(id, stateID, result, conf, inputmode, utterance, collectionUtterance, slots, confType, mask);
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateRecognition(id, stateID, result, conf, inputmode, utterance, slots, confType, mask) {
  
  //Set mode
  var mode = custGetMode(inputmode)
  
  //Set confidence (1=1000)
  conf = conf * 1000;
  
  narLoggingStepEnd('Accept', mode, conf, confType, 'Command', slots, false);
  narLoggingTryEnd('Accepted', utterance, false);
  
}


/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateRetry(id, stateID, grammars, stepName) {
  
  narLoggingAppStep(1);
  narLoggingStepStart('Confirmation', stepName, grammars);
  
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateNomatch(id, stateID, inputmode, confType) {
  
  //Set mode
  var mode = custGetMode(inputmode)
  
  narLoggingStepEnd('Reject', mode, null, confType, null, null, false);
  
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateMaxNomatch(id, stateID, inputmode, confType) {
  ldmLogConfirmationStateNomatch(id, stateID, inputmode, confType);
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateNoinput(id, stateID, confType) {  
  
  narLoggingStepEnd('Fail', 'Timeout', null, confType, null, null, false);
  
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateMaxNoinput(id, stateID, confType) {
  ldmLogConfirmationStateNoinput(id, stateID, confType)
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateRepeat(id, stateID, result, conf, inputmode, utterance, slots, confType) {
  
  //Set mode
  var mode = custGetMode(inputmode)
  
  //Set confidence (1=1000)
  conf = conf * 1000;
  
  narLoggingStepEnd('Accept', mode, conf, confType, 'Command', slots, false);
  
}

/**
 * TODO - Document Me
 */
function ldmLogConfirmationStateMaxRepeat(id, stateID, result, conf, inputmode, utterance, slots, confType) {
  ldmLogConfirmationStateRepeat(id, stateID, result, conf, inputmode, utterance, slots, confType);
}

/**
 * TODO - Document Me
 */
function ldmLogEnd(id, stateID, confType, result, event, maskData) {
  
  var mode = '';
  var status = 'Success';
  
  if(event != null && event != '') {
  
    //Set Event Specific Values
    if(event.indexOf('connection.disconnect.hangup') == 0) {
      mode = 'Disconnect';
      status = 'Hungup';
    }
    else if(event.indexOf('error') == 0) {
      mode = 'Unspecified Error';
      status = 'System Error';
    }
    else if(event.indexOf('event.nuance') == 0) {
      var indx = event.lastIndexOf('.');
      status = event.substring(indx+1);
    }
    
  }
  
  //End Step
  if(narState.inStep == true) {
    narLoggingStepEnd('Fail', mode, null, confType, null, null, false);
  }
  
  //End Try
  if(narState.inTry == true) {
    narLoggingTryEnd('Failed', null, false);
  } 
  
  //End Phase
  if(narState.inPhase == true) {
    narLoggingPhaseEnd(status, result, maskData);
  }
  
  //End DM
  if(narState.inDm == true) {
    narLoggingDmEnd(status, result, maskData);
  }
  
}

//*** Helper Functions - Start ***//

/**
 * TODO - Document Me
 */
function custGetMode(inputmode) {
  var mode = 'SPCH';
  if(inputmode == 'dtmf') {
    mode = 'DTMF';
  }
  return mode;
}

//*** Helper Functions - End ***//

//*** NAR Logging Functions - Start ***//

/**
 * TODO - Document me
 */
function narLoggingDmStart(id, stateID, type, lang, lowConf, highConf, confType) {
  narState.inDm = true;
  var data = 'EVNT=SWIdmst|';
  data += 'DMTP='+type+'|';
  data += 'DMNM='+stateID+'|';
  data += '1SC=false|'; //One step correction is NOT implemented in the LDMs
  data += 'CONFLEV='+lowConf+'|';
  data += 'HIGHCONFLEV='+highConf+'|';
  data += 'LANG='+lang+'|';
  data += 'DEFCONFTYPE=explicit|';
  data += 'DEFCONFCOND='+confType+'|';
  data += 'DMID='+id;
  modelsupport.logString(data);
  return true;
}

function narLoggingAppStep(offset) {
  var data = 'EVNT=SWIapps|';
  data += 'SESN='+dialogStates.appsessionID+'|';
  data += 'STEP='+(dialogStates.appstepID+offset);
  modelsupport.logString(data);
}

function narLoggingPhaseStart(type) {
  narState.inPhase = true;
  var data = 'EVNT=SWIphst|';
  data += 'PHNM='+type;
  modelsupport.logString(data);
}

function narLoggingTryStart(role, turnCount) {
  narState.inTry = true;
  var data = 'EVNT=SWItyst|';
  data += 'ROLE='+role+'|';
  data += 'INDX='+turnCount+'|';
  data += 'SLOT=dm_root';
  modelsupport.logString(data);
}

function narLoggingStepStart(role, stepName, grammars) {
  narState.inStep = true;
  var data = 'EVNT=SWIstst|';
  data += 'ROLE='+role+'|';
  data += 'LPNM='+stepName;
  if(grammars != null && grammars != '') {
    for(var i in grammars) {
      data += '|GRNM='+grammars[i];
    }
  }
  modelsupport.logString(data);
}

function narLoggingStepEnd(decision, mode, conf, confType, confDec, slots, maskData) {
  narState.inStep = false;
  var data = 'EVNT=SWIstnd|';
  data += 'RDEC='+decision+'|';
  data += 'MODE='+mode+'|';
  if(conf != null && conf != '') {
    data += 'CONF='+conf+'|';
  }  
  if(maskData == true) {
    data += 'RVAL=****|';
  } else {
    if(slots != null && slots != '') {
      if(typeof slots == 'string') {
        data += 'RVAL='+slots+'|';
      } else {
        var isFirst = true;
        data += 'RVAL={';
        for(var i in slots) {
          if(i == '$') continue;
          if(!isFirst) data += ' ';
          isFirst = false;
          data += i+':'+slots[i];
        }
        data += '}|';
      }
    } else {
      data += 'RVAL=|';
    }
  }
  if(confDec != null && confDec != '') {
    data += 'CDEC='+confDec+'|';
  }  
  data += 'CONFTYPE=explicit|';
  data += 'CONFCOND='+confType;
  modelsupport.logString(data);
}

function narLoggingTryEnd(decision, hypothesis, maskData) {
  narState.inTry = false;  
  if(hypothesis == null) { 
    hypothesis = '';
  }
  else if (maskData == true) {
    hypothesis = '****';
  }
  var data = 'EVNT=SWItynd|';
  data += 'DCSN='+decision+'|';
  data += 'HYPO='+hypothesis;
  modelsupport.logString(data);
}

function narLoggingPhaseEnd(status, result, maskData) {
  narState.inPhase = false;  
  var data = 'EVNT=SWIphnd|';
  data += 'TSTT='+status+'|';
  if(result == null || result == '') {
    data += 'TRTT=';
  } else if (maskData == true) {
    data += 'TRTT=****';
  } else {
    data += 'TRTT='+result;
  }
  modelsupport.logString(data);
}

function narLoggingDmEnd(status, result, maskData) {
  narState.inDm = false;  
  var data = 'EVNT=SWIdmnd|';
  data += 'TSTT='+status+'|';
  if(result == null || result == '') {
    data += 'TRTT=';
  } else if (maskData == true) {
    data += 'TRTT=****';
  } else {
    data += 'TRTT='+result;
  }
  modelsupport.logString(data);
}

//*** NAR Logging Functions - End ***//