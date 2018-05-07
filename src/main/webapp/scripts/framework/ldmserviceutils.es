var dialogStates = new Object();
dialogStates.appstepID = 0;

//TODO: Remove this
var ldmScriptDebugString = '';
var isFromConfirmation = false;

/**
 * TODO - Document me
 */
function initializeLDMObject(id, stateID, type, language, trackData, maskData) {
  
  //Create LDM object
  var ldmObject = new Object();
  ldmObject.collection = new Object();
  ldmObject.confirmation = new Object();
  
  //Set Flags
  ldmObject.id = id;
  ldmObject.stateID = stateID;
  ldmObject.type = type;
  ldmObject.language = language;
  ldmObject.trackData = trackData;
  ldmObject.maskData = maskData;
  
  //Init variables
  ldmObject.value = '';
  ldmObject.event = '';
  ldmObject.message = '';
  ldmObject.confirmed = null;
  ldmObject.menuOptions = new Array();
  ldmObject.disallowList = new Array();
  
  ldmObject.isDoingConf = false;
  
  return ldmObject;
}

/**
 * TODO - Document me
 */
function initializeLDMGlobals(ldmObject, maxTurns, maxNoToConfirm, confirmationType) {
  
  //Global LDM counters
  ldmObject.turnCount = 1;
  ldmObject.noToConfirmCount = 0;
  
  //Global LDM properties
  ldmObject.maxTurns = maxTurns;
  ldmObject.maxNoToConfirms = maxNoToConfirm;
  ldmObject.confirmationType = confirmationType;
  
}

/**
 * TODO - Document me
 */
function initializeLDMCollectionGlobals(ldmObject, highConf, lowConf, maxNomatch, maxNoinput, maxTries, maxHelps, maxRepeats) {
  
  //LDM collection counters
  ldmObject.collection.nomatchCount = 0;
  ldmObject.collection.noinputCount = 0;
  ldmObject.collection.tryCount = 0;
  ldmObject.collection.helpCount = 0;
  ldmObject.collection.repeatCount = 0;
  
  //LDM collection state variables
  ldmObject.collection.hasStarted = false;
  ldmObject.collection.playInitialPrompt = true;
  ldmObject.collection.grammars = '';
  ldmObject.collection.recoResult = null;
  
  //LDM collection properties
  ldmObject.collection.highConfidence = highConf;
  ldmObject.collection.lowConfidence = lowConf;
  ldmObject.collection.maxNomatches = maxNomatch;
  ldmObject.collection.maxNoinputs = maxNoinput;
  ldmObject.collection.maxTries = maxTries;
  ldmObject.collection.maxHelps = maxHelps;
  ldmObject.collection.maxRepeats = maxRepeats;
  
}

/**
 * TODO - Document me
 */
function initializeLDMConfirmationGlobals(ldmObject, lowConf, maxNomatch, maxNoinput, maxTries, maxRepeats) {
  
  //LDM confirmation counters
  ldmObject.confirmation.nomatchCount = 0;
  ldmObject.confirmation.noinputCount = 0;
  ldmObject.confirmation.tryCount = 0;
  ldmObject.confirmation.repeatCount = 0;

  //LDM confirmation state variables
  ldmObject.confirmation.hasStarted = false;
  ldmObject.confirmation.playInitialPrompt = true;
  ldmObject.confirmation.grammars = '';
  ldmObject.confirmation.recoResult = null;
  
  //LDM confirmation properties
  ldmObject.confirmation.lowConfidence = lowConf;
  ldmObject.confirmation.maxNomatches = maxNomatch;
  ldmObject.confirmation.maxNoinputs = maxNoinput;
  ldmObject.confirmation.maxTries = maxTries;
  ldmObject.confirmation.maxRepeats = maxRepeats;
  
}

/**
 * TODO - Document me
 */
function addMenuOption(dtmf, isEnabled, voice, isGlobal, menuOptions, isRepeat, ldmObject) {
  var obj = new Object();
  obj.enabled = isEnabled;
  obj.isRepeat = isRepeat;
  obj.voice = voice;
  obj.dtmf = dtmf;
  obj.isGlobal = isGlobal;
  menuOptions.push(obj);
  if(!isEnabled){
      addDisallowValue(ldmObject, voice);
  }
  return true;
}

/**
 * TODO - Document me
 */
function addDynamicMenuOption(voice, isEnabled, isGlobal, counter, menuOptions, isRepeat, ldmObject) {
  var obj = new Object();
  obj.enabled = isEnabled;
  obj.isRepeat = isRepeat;
  obj.voice = voice;
  obj.isGlobal = isGlobal;
  if(isEnabled) obj.dtmf = counter++;
  menuOptions.push(obj);
  if(!isEnabled){
      addDisallowValue(ldmObject, voice);
  }
  return counter;
}

//*** Initialization Functions - End ***//

//*** Collection Functions - Start ***//

/**
 * TODO - Document me
 */
function isStartLDMCollectionState(ldmObject) {
  var ret = true;
  if(ldmObject.collection.hasStarted == true) {
    ret = false;
  } 
  ldmObject.collection.hasStarted = true;
  return ret;
}

/**
 * TODO - Document me
 */
function trackStartLDMCollection(ldmObject, grammarList) {
  
  ldmObject.collection.grammars = grammarList;
  
  if(ldmObject.stepName == null || ldmObject.stepName == '') {
    ldmObject.stepName = 'Initial';
  }
  
  if(ldmObject.trackData) {  
    ldmLogCollectionStateStart(
      ldmObject.id,
      ldmObject.stateID,
      ldmObject.type,
      ldmObject.language,
      ldmObject.collection.grammars,
      ldmObject.collection.lowConfidence,
      ldmObject.collection.highConfidence,
      ldmObject.confirmationType,
      ldmObject.turnCount,
      ldmObject.stepName
    );  
  }
  
}

/**
 * TODO - Document me
 */
function playLDMCollectionIntialPrompt(ldmObject) {
  var ret = ldmObject.collection.playInitialPrompt;
  ldmObject.collection.playInitialPrompt = true;
  return ret;
}

/**
 * TODO - Document me
 */
function updateLDMCollectionPlayInitialPrompt(ldmObject, hasPlayed) {
  ldmObject.collection.playInitialPrompt = hasPlayed;
}

/**
 * TODO - Document me
 */
function validateLDMCollectionConfidenceLowLevel(result, ldmObject, menuOptions) {
  var ret = false;
  var menuOptionFound = false;
  
  //Assign the last result
  ldmObject.collection.recoResult = getRecoResult(result);
  
  if(ldmObject.collection.recoResult == null || ldmObject.collection.recoResult == '') {
    ret = false;
  }
  else if(ldmObject.collection.recoResult.result == null || ldmObject.collection.recoResult.result == '') {
    ret = false;
  }
  else if(ldmObject.collection.recoResult.confidence < ldmObject.collection.lowConfidence) {
    ret = false;
  }
  else {
    var dtmfOptionsExists = false;
    if(menuOptions != null){
      //Check if result was not a number (not dtmf key or not input data)
      if(isNaN(ldmObject.collection.recoResult.result)) {
        for(var i in menuOptions) {
          if(menuOptions[i].voice == ldmObject.collection.recoResult.result) {
            menuOptionFound = true;
            if(menuOptions[i].enabled == false) {
              ret = false;
            } else {
              ret = true;
              ldmObject.collection.recoResult.menuOption = menuOptions[i];
            }
            break;
          }
        }
      }
      
      if(ret == false){
          if (ldmObject.collection.recoResult.inputmode == 'dtmf') {
            for(var i in menuOptions) {
              if(menuOptions[i].dtmf == ldmObject.collection.recoResult.result) {
                menuOptionFound = true;
                if(menuOptions[i].enabled == false) {
                  ret = false;
                } else {
                  ret = true;
                  ldmObject.collection.recoResult.menuOption = menuOptions[i];
                  ldmObject.collection.recoResult.interpretation = menuOptions[i].voice;
                }
                break;
              }else if(dtmfOptionsExists == false && menuOptions[i].dtmf != null && menuOptions[i].dtmf != undefined && menuOptions[i].dtmf != ''){
                dtmfOptionsExists = true;
              }
            }
          }
      }
    }
    
    //Allow any voice input (that wasn't already disabled)
    //Also allow any dtmf entry greater than one in length
    if(ret == false && menuOptionFound == false){
      if(ldmObject.collection.recoResult.inputmode == 'voice') {
        ret = true;
      } else if(ldmObject.collection.recoResult.result.length > 1 || 
    		  ((ldmObject.collection.recoResult.result.length == 1) && isNaN(ldmObject.collection.recoResult.result))) {
        ret = true;
      } else if(dtmfOptionsExists == false){
        ret = true;
      }
    }
    
  }
  
  return ret;
}

/**
 * TODO - Document me
 */
function updateLDMCollectionState(ldmObject, response) {

  //Check if result was a menu option
  if(ldmObject.collection.recoResult.menuOption != null) {
    ldmObject.value = ldmObject.collection.recoResult.menuOption.voice;
  } else {
    ldmObject.value = ldmObject.collection.recoResult.result;
  }
    
  return true;
}

/**
 * TODO - Document me
 */
function updateLDMCollectionNomatch(ldmObject) {
  
  //Update Nomatch Count
  ldmObject.collection.nomatchCount++;
  if(ldmObject.collection.nomatchCount >= ldmObject.collection.maxNomatches && ldmObject.collection.maxNomatches > -1) {
    ldmObject.event = 'event.nuance.dialog.ldm.maxnomatches';
    ldmObject.message = ldmObject.stateID+': The maximum number of nomatches has been reached';
  }
  
  //Update Try Count
  updateLDMCollectionTryCount(ldmObject, 'maxnomatches');

  //Update Turn Count
  updateLDMTurnCount(ldmObject);
  
  if(ldmObject.trackData) { 
    
    //Try to get input mode
    var inputmode = '';
    if(ldmObject.collection.recoResult != null) {
      ldmObject.collection.recoResult.inputmode;
    }
    
    //If there is no event to throw, we continue to the next turn
    if(ldmObject.event == null || ldmObject.event == '') {
      
      ldmObject.stepName = 'Retry'+ldmObject.collection.nomatchCount;
      
      ldmLogCollectionStateNomatch(
        ldmObject.id,
        ldmObject.stateID,
        inputmode,
        ldmObject.confirmationType
      ); 
      
      ldmLogCollectionStateRetry(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.turnCount,
        ldmObject.stepName,
        ldmObject.collection.grammars
      );
      
    } else if(ldmObject.event == 'event.nuance.dialog.ldm.maxturns'){
    	ldmLogMaxTurn(
    	  ldmObject.id,
    	  ldmObject.stateID
    	);
    } else {
      
      ldmLogCollectionStateMaxNomatch(
        ldmObject.id,
        ldmObject.stateID,
        inputmode,
        ldmObject.confirmationType
      );  

    }
    
  }
  
  //Delete old reco object
  ldmObject.collection.recoResult = null;
  
  return true;
}

/**
 * TODO - Document me
 */
function updateLDMCollectionNoinput(ldmObject) {
  
  //Update Noinput Count
  ldmObject.collection.noinputCount++;
  if(ldmObject.collection.noinputCount >= ldmObject.collection.maxNoinputs && ldmObject.collection.maxNoinputs > -1) {
    ldmObject.event = 'event.nuance.dialog.ldm.maxnoinputs';
    ldmObject.message = ldmObject.stateID+': The maximum number of noinputs has been reached';
  }
  
  //Update Try Count
  updateLDMCollectionTryCount(ldmObject, 'maxnoinputs');

  //Update Turn Count
  updateLDMTurnCount(ldmObject);
  
  if(ldmObject.trackData) { 
    
    //If there is no event to throw, we continue to the next turn
    if(ldmObject.event == null || ldmObject.event == '') {
      
      ldmObject.stepName = 'Timeout'+ldmObject.collection.noinputCount;
      
      ldmLogCollectionStateNoinput(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.confirmationType
      );   
      
      ldmLogCollectionStateRetry(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.turnCount,
        ldmObject.stepName,
        ldmObject.collection.grammars
      );
      
    } else if(ldmObject.event == 'event.nuance.dialog.ldm.maxturns'){
    	ldmLogMaxTurn(
    	  ldmObject.id,
    	  ldmObject.stateID
    	);
    }  else {
      
      ldmLogCollectionStateMaxNoinput(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.confirmationType
      ); 
      
    }
    
  }
  
  return true;
}

/**
 * TODO - Document me
 */
function updateLDMCollectionRepeat(ldmObject) {
  var ret = true;
  
  var menuOption = ldmObject.collection.recoResult.menuOption;
  if(menuOption == null || menuOption.isRepeat == false) {
    ret = false;
  } else {
    
    //Update Repeat Count
    ldmObject.collection.repeatCount++;
    if(ldmObject.collection.repeatCount >= ldmObject.collection.maxRepeats && ldmObject.collection.maxRepeats > -1) {
      ldmObject.event = 'event.nuance.dialog.ldm.maxrepeats';
      ldmObject.message = ldmObject.stateID+': The maximum number of repeats has been reached';
    }

    if(ldmObject.trackData) { 
      
      //If there is no event to throw, we continue to the next turn
      if(ldmObject.event == null || ldmObject.event == '') {
        
        ldmObject.stepName = 'Repeat'+ldmObject.collection.repeatCount;
        
        ldmLogCollectionStateRepeat(
          ldmObject.id,
          ldmObject.stateID,
          ldmObject.value,
          ldmObject.collection.recoResult.confidence,
          ldmObject.collection.recoResult.inputmode,
          ldmObject.collection.recoResult.utterance,
          ldmObject.collection.recoResult.interpretation,
          ldmObject.confirmationType
        );   
        
        ldmLogCollectionStateRetry(
          ldmObject.id,
          ldmObject.stateID,
          ldmObject.turnCount,
          ldmObject.stepName,
          ldmObject.collection.grammars
        );
        
      } else {
        
        ldmLogCollectionStateMaxRepeat(
          ldmObject.id,
          ldmObject.stateID,
          ldmObject.value,
          ldmObject.collection.recoResult.confidence,
          ldmObject.collection.recoResult.inputmode,
          ldmObject.collection.recoResult.utterance,
          ldmObject.collection.recoResult.interpretation,
          ldmObject.confirmationType
        ); 
        
      }
      
    }
    
    //Delete old reco object & clear value
    ldmObject.collection.recoResult = null;
    ldmObject.value = '';
    
  }
  
  return ret;
}

/**
 * TODO - Document me
 */
function updateLDMCollectionHelp(ldmObject) {

  //Update Help Count
  ldmObject.collection.helpCount++;
  if(ldmObject.collection.helpCount >= ldmObject.collection.maxHelps && ldmObject.collection.maxHelps > -1) {
    ldmObject.event = 'event.nuance.dialog.ldm.maxhelps';
    ldmObject.message = ldmObject.stateID+': The maximum number of helps has been reached';
  }

  if(ldmObject.trackData) { 
    
    //If there is no event to throw, we continue to the next turn
    if(ldmObject.event == null || ldmObject.event == '') {
      
      ldmObject.stepName = 'Help'+ldmObject.collection.helpCount;
      
      ldmLogCollectionStateHelp(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.value,
        ldmObject.collection.recoResult.confidence,
        ldmObject.collection.recoResult.inputmode,
        ldmObject.collection.recoResult.utterance,
        ldmObject.collection.recoResult.interpretation,
        ldmObject.confirmationType
      );   
      
      ldmLogCollectionStateRetry(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.turnCount,
        ldmObject.stepName,
        ldmObject.collection.grammars
      );
      
    } else {
      
      ldmLogCollectionStateMaxHelp(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.value,
        ldmObject.collection.recoResult.confidence,
        ldmObject.collection.recoResult.inputmode,
        ldmObject.collection.recoResult.utterance,
        ldmObject.collection.recoResult.interpretation,
        ldmObject.confirmationType
      ); 
      
    }
    
  }
    
  //Delete old reco object & clear value
  ldmObject.collection.recoResult = null;
  ldmObject.value = '';

  return true;
}

/**
 * TODO - Document me
 */
function updateLDMCollectionTryCount(ldmObject, eventName) {
  
  //Update Try Count
  ldmObject.collection.tryCount++;
  if(ldmObject.event == null || ldmObject.event == '') {
    if(ldmObject.collection.tryCount >= ldmObject.collection.maxTries && ldmObject.collection.maxTries > -1) {
      ldmObject.event = 'event.nuance.dialog.ldm.' + eventName + '.collection';
      ldmObject.message = ldmObject.stateID+': The maximum number of tries has been reached';
    }
  }
  
}

/**
 * TODO - Document me
 */
function trackEndLDMCollection(ldmObject) {
  //Not needed yet
}

/**
 * TODO - Document me
 */
function validateLDMCollectionConfidenceHighLevel(ldmObject) {
  
  var confidenceNeeded = isConfirmationNeeded(ldmObject);
  
  if(ldmObject.trackData) {  
    ldmLogCollectionStateRecognition(
      ldmObject.id,
      ldmObject.stateID,
      ldmObject.value,
      ldmObject.collection.recoResult.confidence,
      ldmObject.collection.recoResult.inputmode,
      ldmObject.collection.recoResult.utterance,
      ldmObject.collection.recoResult.interpretation,
      confidenceNeeded,
      ldmObject.confirmationType,
      ldmObject.maskData
    );  
    
    if(confidenceNeeded == false) {
      ldmLogEnd(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.confirmationType,
        ldmObject.value,
        '',
        ldmObject.maskData
      );
    }
    
  }

  var ret = true;
  if(confidenceNeeded == true) {
    ldmObject.confirmPrompt = getConfirmPrompt(ldmObject);
    ret = false;
  }
  
  return ret;
}

/**
 * TODO - Document Me
 */
function getLDMCollectionRepeatCount(ldmObject) {
  return ldmObject.collection.repeatCount;
}

/**
 * TODO - Document Me
 */
function getLDMCollectionHelpCount(ldmObject) {
  return ldmObject.collection.helpCount;
}

/**
 * TODO - Document Me
 */
function getLDMCollectionNomatchCount(ldmObject) {
  return ldmObject.collection.nomatchCount;
}

/**
 * TODO - Document Me
 */
function getLDMCollectionNoinputCount(ldmObject) {
  return ldmObject.collection.noinputCount;
}

/**
 * TODO - Document Me
 */
function getCollectionLastResult(ldmObject) {
  return ldmObject.collection.recoResult;
}

//*** Collection Functions - End ***//

//*** Confirmation Functions - Start ***//

/**
 * TODO - Document me
 */
function isStartLDMConfirmationState(ldmObject) {
  var ret = true;
  if(ldmObject.confirmation.hasStarted == true) {
    ret = false;
  } 
  ldmObject.confirmation.hasStarted = true;
  return ret;
}

/**
 * TODO - Document me
 */
function trackStartLDMConfirmation(ldmObject, grammarList) {
  
  ldmObject.confirmed = null;
  ldmObject.confirmValue = '';
  ldmObject.stepName = 'Initial';
  ldmObject.confirmation.grammars = grammarList;
  
  if(ldmObject.trackData) {  
    ldmLogConfirmationStateStart(
      ldmObject.id,
      ldmObject.stateID,
      ldmObject.confirmation.grammars,
      ldmObject.stepName
    );  
  }
  
}

/**
 * TODO - Document me
 */
function playLDMConfirmationIntialPrompt(ldmObject) {
  var ret = ldmObject.confirmation.playInitialPrompt;
  ldmObject.confirmation.playInitialPrompt = true;
  return ret;
}

/**
 * TODO - Document me
 */
function updateLDMConfirmationPlayInitialPrompt(ldmObject, hasPlayed) {
  ldmObject.confirmation.playInitialPrompt = hasPlayed;
}

/**
 * TODO - Document me
 */
function validateLDMConfirmationConfidenceLowLevel(result, ldmObject, menuOptions) {
  var ret = false;
  var menuOption = null;
  
  //Assign the last result
  ldmObject.confirmation.recoResult = getRecoResult(result);
  
  if(ldmObject.confirmation.recoResult == null || ldmObject.confirmation.recoResult == '') {
    ret = false;
  }
  else if(ldmObject.confirmation.recoResult.result == null || ldmObject.confirmation.recoResult.result == '') {
    ret = false;
  }
  else if(ldmObject.confirmation.recoResult.confidence < ldmObject.confirmation.lowConfidence) {
    ret = false;
  }
  else {
    
    var confResult = getConfirmationResult(ldmObject.confirmation.recoResult.result);
    if(confResult == 'yes' || confResult == 'no') {
      ret = true;
    } else {
      ret = false;
      //Check menu options to see if a global was recognized
      if(menuOptions != null){
        //Check if result was not a number (not dtmf key or not input data)
        if(isNaN(ldmObject.confirmation.recoResult.result)) {
          for(var i in menuOptions) {
            if(menuOptions[i].voice == ldmObject.confirmation.recoResult.result) {
              if(menuOptions[i].enabled == false && menuOptions[i].isGlobal == true) {
                ret = false;
              } else {
                ret = true;
                ldmObject.confirmation.recoResult.menuOption = menuOptions[i];
              }
              break;
            }
          }
        }
        
        if(ret == false){
            if (ldmObject.confirmation.recoResult.inputmode == 'dtmf') {
              for(var i in menuOptions) {
                if(menuOptions[i].dtmf == ldmObject.confirmation.recoResult.result) {
                  if(menuOptions[i].enabled == false && menuOptions[i].isGlobal == true) {
                    ret = false;
                  } else {
                    ret = true;
                    ldmObject.confirmation.recoResult.menuOption = menuOptions[i];
                    ldmObject.confirmation.recoResult.interpretation = menuOptions[i].voice;
                  }
                  break;
                }
              }
            }
        }
      }
    }

  }
  
  return ret;
}

/**
 * TODO - Document me
 */
function updateLDMConfirmationState(ldmObject, response) {

  //Check if result was a global menu option
  if(ldmObject.confirmation.recoResult.menuOption != null) {
    if(ldmObject.confirmation.recoResult.menuOption.isRepeat == false) {
      ldmObject.value = ldmObject.confirmation.recoResult.menuOption.voice;
      ldmObject.confirmValue = ldmObject.value;
    } else {
      ldmObject.confirmValue = ldmObject.confirmation.recoResult.menuOption.voice;
    }
  } else {
    ldmObject.confirmValue = getConfirmationResult(ldmObject.confirmation.recoResult.result);
  }
    
  return true;
}

/**
 * TODO - Document me
 */
function updateLDMConfirmationYes(ldmObject) {
  ldmObject.confirmed = true;
  
  if(ldmObject.trackData) {
    ldmLogConfirmationStateConfirmed(
      ldmObject.id,
      ldmObject.stateID,
      ldmObject.confirmValue,
      ldmObject.confirmation.recoResult.confidence,
      ldmObject.confirmation.recoResult.inputmode,
      ldmObject.confirmation.recoResult.utterance,
      ldmObject.collection.recoResult.utterance,
      ldmObject.confirmation.recoResult.interpretation,
      ldmObject.confirmationType,
      ldmObject.maskData
    );   
    
    ldmLogEnd(
      ldmObject.id,
      ldmObject.stateID,
      ldmObject.confirmationType,
      ldmObject.value,
      '',
      ldmObject.maskData
    );
  }
  
  return true;
}

/**
 * TODO - Document me
 */
function updateLDMConfirmationNo(ldmObject) {
  
  //Add value to disallow list.
  addDisallowValue(ldmObject, ldmObject.value);
    
  ldmObject.confirmed = false;
  
  //Update NoToConfirm Count
  ldmObject.noToConfirmCount++;
  if(ldmObject.noToConfirmCount >= ldmObject.maxNoToConfirms && ldmObject.maxNoToConfirms > -1) {
    ldmObject.event = 'event.nuance.dialog.ldm.maxnotoconfirms';
    ldmObject.message = ldmObject.stateID+': The maximum number of no to confirmations has been reached';
  }
  
  //Update Turn Count
  updateLDMTurnCount(ldmObject);
  
  //If there is no event to throw, we continue to the next turn
  if(ldmObject.event == null || ldmObject.event == '') {
    
    ldmObject.stepName = 'NoToConfirm'+ldmObject.noToConfirmCount;
    
    if(ldmObject.trackData) {
      ldmLogConfirmationStateNoToConfirm(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.confirmValue,
        ldmObject.confirmation.recoResult.confidence,
        ldmObject.confirmation.recoResult.inputmode,
        ldmObject.confirmation.recoResult.utterance,
        ldmObject.collection.recoResult.utterance,
        ldmObject.confirmation.recoResult.interpretation,
        ldmObject.confirmationType,
        ldmObject.maskData
      );   
    }

    //Reset value
    ldmObject.value = '';
    ldmObject.confirmPrompt = '';
    
    //Reset collection variables
    ldmObject.collection.hasStarted = false;
    ldmObject.collection.playInitialPrompt = true;
    ldmObject.collection.recoResult = null;
    
    //Reset confirmation variables
    ldmObject.confirmation.hasStarted = false;
    ldmObject.confirmation.playInitialPrompt = true;
    ldmObject.confirmation.nomatchCount = 0;
    ldmObject.confirmation.noinputCount = 0;
    ldmObject.confirmation.tryCount = 0;
    ldmObject.confirmation.repeatCount = 0;
    ldmObject.confirmation.recoResult = null;
    
  } else if(ldmObject.event == 'event.nuance.dialog.ldm.maxturns'){
  	ldmLogMaxTurn(
      ldmObject.id,
      ldmObject.stateID
    );
  } else {
    
    if(ldmObject.trackData) {
      ldmLogConfirmationStateMaxNoToConfirm(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.confirmValue,
        ldmObject.confirmation.recoResult.confidence,
        ldmObject.confirmation.recoResult.inputmode,
        ldmObject.confirmation.recoResult.utterance,
        ldmObject.collection.recoResult.utterance,
        ldmObject.confirmation.recoResult.interpretation,
        ldmObject.confirmationType,
        ldmObject.maskData
      );   
    }
       
  }
  
  return true;
}

/**
 * TODO - Document me
 */
function updateLDMConfirmationNomatch(ldmObject) {
  
  //Update Nomatch Count
  ldmObject.confirmation.nomatchCount++;
  if(ldmObject.confirmation.nomatchCount >= ldmObject.confirmation.maxNomatches && ldmObject.confirmation.maxNomatches > -1) {
    ldmObject.event = 'event.nuance.dialog.ldm.maxnomatches';
    ldmObject.message = ldmObject.stateID+': The maximum number of nomatches has been reached';
  }
  
  //Update Try Count
  updateLDMConfirmationTryCount(ldmObject, 'maxnomatches');

  //Update Turn Count
  updateLDMTurnCount(ldmObject);
  
  if(ldmObject.trackData) { 
    
    //Try to get input mode
    var inputmode = '';
    if(ldmObject.confirmation.recoResult != null) {
      ldmObject.confirmation.recoResult.inputmode;
    }
    
    //If there is no event to throw, we continue to the next turn
    if(ldmObject.event == null || ldmObject.event == '') {
      
      ldmObject.stepName = 'Retry'+ldmObject.confirmation.nomatchCount;
      
      ldmLogConfirmationStateNomatch(
        ldmObject.id,
        ldmObject.stateID,
        inputmode,
        ldmObject.confirmationType
      ); 
      
      ldmLogConfirmationStateRetry(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.confirmation.grammars,
        ldmObject.stepName
      );
      
    } else if(ldmObject.event == 'event.nuance.dialog.ldm.maxturns'){
    	ldmLogMaxTurn(
    	  ldmObject.id,
    	  ldmObject.stateID
    	);
    } else {
      
      ldmLogConfirmationStateMaxNomatch(
        ldmObject.id,
        ldmObject.stateID,
        inputmode,
        ldmObject.confirmationType
      );  

    }
    
  }
  
  //Delete old reco object
  ldmObject.confirmation.recoResult = null;
  
  return true;
}

/**
 * TODO - Document me
 */
function updateLDMConfirmationNoinput(ldmObject) {
  
  //Update Nomatch Count
  ldmObject.confirmation.noinputCount++;
  if(ldmObject.confirmation.noinputCount >= ldmObject.confirmation.maxNoinputs && ldmObject.confirmation.maxNoinputs > -1) {
    ldmObject.event = 'event.nuance.dialog.ldm.maxnoinputs';
    ldmObject.message = ldmObject.stateID+': The maximum number of maxnoinputs has been reached';
  }
  
  //Update Try Count
  updateLDMConfirmationTryCount(ldmObject, 'maxnoinputs');

  //Update Turn Count
  updateLDMTurnCount(ldmObject);
  
  if(ldmObject.trackData) { 
    
    //If there is no event to throw, we continue to the next turn
    if(ldmObject.event == null || ldmObject.event == '') {
      
      ldmObject.stepName = 'Timeout'+ldmObject.confirmation.noinputCount;
      
      ldmLogConfirmationStateNoinput(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.confirmationType
      ); 
      
      ldmLogConfirmationStateRetry(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.confirmation.grammars,
        ldmObject.stepName
      );
      
    } else if(ldmObject.event == 'event.nuance.dialog.ldm.maxturns'){
      ldmLogMaxTurn(
    	ldmObject.id,
    	ldmObject.stateID
      );
    } else {
      
      ldmLogConfirmationStateMaxNoinput(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.confirmationType
      );  

    }
    
  }
  
  return true;
}

/**
 * TODO - Document me
 */
function updateLDMConfirmationRepeat(ldmObject) {
  var ret = true;
  
  var menuOption = ldmObject.confirmation.recoResult.menuOption;
  if(menuOption == null || menuOption.isRepeat == false) {
    ret = false;
  } else {
    
    //Update Repeat Count
    ldmObject.confirmation.repeatCount++;
    if(ldmObject.confirmation.repeatCount >= ldmObject.confirmation.maxRepeats && ldmObject.confirmation.maxRepeats > -1) {
      ldmObject.event = 'event.nuance.dialog.ldm.maxrepeats';
      ldmObject.message = ldmObject.stateID+': The maximum number of repeats has been reached';
    }

    if(ldmObject.trackData) { 
      
      //If there is no event to throw, we continue to the next turn
      if(ldmObject.event == null || ldmObject.event == '') {
        
        ldmObject.stepName = 'Repeat'+ldmObject.confirmation.repeatCount;
        
        ldmLogConfirmationStateRepeat(
          ldmObject.id,
          ldmObject.stateID,
          ldmObject.confirmValue,
          ldmObject.confirmation.recoResult.confidence,
          ldmObject.confirmation.recoResult.inputmode,
          ldmObject.confirmation.recoResult.utterance,
          ldmObject.confirmation.recoResult.interpretation,
          ldmObject.confirmationType
        );   
        
        ldmLogConfirmationStateRetry(
          ldmObject.id,
          ldmObject.stateID,
          ldmObject.turnCount,
          ldmObject.stepName,
          ldmObject.confirmation.grammars
        );
        
      } else {
        
        ldmLogConfirmationStateMaxRepeat(
          ldmObject.id,
          ldmObject.stateID,
          ldmObject.confirmValue,
          ldmObject.confirmation.recoResult.confidence,
          ldmObject.confirmation.recoResult.inputmode,
          ldmObject.confirmation.recoResult.utterance,
          ldmObject.confirmation.recoResult.interpretation,
          ldmObject.confirmationType
        ); 
        
      }
      
    }
    
    //Delete old reco object & clear value
    ldmObject.confirmation.recoResult = null;
    ldmObject.confirmValue = '';
    
  }
  
  return ret;
}

/**
 * TODO - Document me
 */
function updateLDMConfirmationTryCount(ldmObject, eventName) {
  
  //Update Try Count
  ldmObject.confirmation.tryCount++;
  if(ldmObject.event == null || ldmObject.event == '') {
    if(ldmObject.confirmation.tryCount >= ldmObject.confirmation.maxTries && ldmObject.confirmation.maxTries > -1) {
      ldmObject.event = 'event.nuance.dialog.ldm.' + eventName + '.confirmation';
      ldmObject.message = ldmObject.stateID+': The maximum number of tries has been reached';
    }
  }
  
}

/**
 * TODO - Document me
 */
function trackEndLDMConfirmation(ldmObject) {
   
  if(ldmObject.trackData) { 
  
    if(ldmObject.confirmed == null) {
      ldmLogConfirmationStateRecognition(         
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.confirmValue,
        ldmObject.confirmation.recoResult.confidence,
        ldmObject.confirmation.recoResult.inputmode,
        ldmObject.confirmation.recoResult.utterance,
        ldmObject.confirmation.recoResult.interpretation,
        ldmObject.confirmationType,
        ldmObject.maskData
      );
     
      ldmLogEnd(
        ldmObject.id,
        ldmObject.stateID,
        ldmObject.confirmationType,
        ldmObject.value,
        '',
        ldmObject.maskData
      );
    }
  
  }
  
}

/**
 * TODO - Document Me
 */
function getLDMConfirmationNomatchCount(ldmObject) {
  return ldmObject.confirmation.nomatchCount;
}

/**
 * TODO - Document Me
 */
function getLDMConfirmationNoinputCount(ldmObject) {
  return ldmObject.confirmation.noinputCount;
}

/**
 * TODO - Document Me
 */
function getConfirmationLastResult(ldmObject) {
  return ldmObject.confirmation.recoResult;
}

//*** Confirmation Functions - End ***//

/**
 * TODO - Document Me
 */
function updateLDMTurnCount(ldmObject) {
  
  //Update Turn Count (Starts at 1)
  if(ldmObject.event == null || ldmObject.event == '') {
    ldmObject.turnCount++;
    if((ldmObject.turnCount-1) >= ldmObject.maxTurns && ldmObject.maxTurns > -1) {
      ldmObject.event = 'event.nuance.dialog.ldm.maxturns';
      ldmObject.message = ldmObject.stateID+': The maximum number of turns has been reached';
    }
  }
  
}

/**
 * TODO - Document me
 */
function updateLDMEvent(ldmObject, event, message) {
  ldmObject.event = event;
  ldmObject.message = message
}

/**
 * TODO - Document Me
 */
function trackLDMEvent(ldmObject) {
  
  if(ldmObject.trackData) { 
    ldmLogEnd(
      ldmObject.id,
      ldmObject.stateID,
      ldmObject.confirmationType,
      ldmObject.value,
      ldmObject.event,
      ldmObject.maskData
    );
  }
}

/**
 * This method retrieves the ECMA object result from the platform
 * and returns an object which represents the return:
 * inputs:
 *  - lastresult: The application.lastresult$ from the VXML browser
 * output:
 *  - An object reprsenting the recognition. Fields are:
 *    inputmode - dtmf or voice
 *    confidence - Confidnece level
 *    utterance - The raw utterance
 *    interpretation - Object containing all of the grammar slots
 *    result - The result of the recognition
 */
function getRecoResult(lastresult) {
  var ret = new Object();
  ret.inputmode = lastresult[0].inputmode;
  ret.confidence = lastresult[0].confidence;
  ret.utterance = lastresult[0].utterance;
  ret.interpretation = lastresult[0].interpretation;
  ret.ambig_interpretation = lastresult[0].ambig_interpretation;
  if(ret.interpretation != null) {
    if(ret.interpretation.dm_root != null) {
      ret.result = ret.interpretation.dm_root;
    }
    else if (ret.interpretation.MEANING != null)
    {
      ret.result = ret.interpretation.MEANING;
    }
    else {
      ret.result = ret.interpretation;
    }
  } else {
    ret.result = ret.utterance;
  }
  ret.nbestresults = getNBestResults(lastresult);
  return ret;
}

/**
 * This method is used to determine if confirmation is
 * needed on the last collection recognition. If the
 * confirmation type is set in the grammar, it will be used,
 * otherwise the default confirmation type is used.
 * inputs:
 *  - ldmObject: The LDM state
 *  outputs:
 *  - true if confirmation is needed, false otherwise
 */
function isConfirmationNeeded(ldmObject) {
  var ret = false;
  
  var confirmationMode = ldmObject.confirmationType;
  
  var slots = ldmObject.collection.recoResult.interpretation;
  if(slots != null && slots.dm_confirmation_mode != null) {
    //Reset conf mode if not default in grammar
    if(slots.dm_confirmation_mode.toUpperCase() != 'DEFAULT') {
      confirmationMode = slots.dm_confirmation_mode;
    }
  }
  
  //NOTE: Random confirmation not implemented
  if(confirmationMode.toUpperCase() == 'ALWAYS') {
    ret = true;
  }
  else if (confirmationMode.toUpperCase() == 'NEVER') {
    ret = false;
  }
  else {
    if(ldmObject.collection.recoResult.confidence >= ldmObject.collection.highConfidence) {
      ret = false;
    } else {
      ret = true;
    }
  }
  
  return ret;
}

/**
 * TODO - Document me
 */
function getConfirmPrompt(ldmObject) {
  var ret = '';
  
  var slots = ldmObject.collection.recoResult.interpretation;
  if(slots != null && slots.dm_confirm_string != null) {
    ret = slots.dm_confirm_string;
  }
  
  return ret;
}

/**
 * TODO - Document me
 */
function getConfirmationResult(confResult) {
  var ret = '';
  if(confResult.toLowerCase() == 'true' || confResult.toLowerCase() == 'yes' || confResult == '1')  {
    ret = 'yes';
  }
  else if (confResult.toLowerCase() == 'false' || confResult.toLowerCase() == 'no' || confResult == '2') {
    ret = 'no';
  }
  else {
    ret = confResult;
  }
  return ret;
}

function getIsFromConfirmation(ldmObject){
    var ret = false;
    if(ldmObject.noToConfirmCount>0){
        ret = true;
    }
    return ret;
}

function addDisallowValue(ldmObject, value){
    ldmObject.disallowList.push(value);
}

function getDisallowString(ldmObject){
    var ret = '';
    for(var i in ldmObject.disallowList) {
        if(i==0){
            ret = ret + ldmObject.disallowList[i];
        }else{
            ret = ret + '^' + ldmObject.disallowList[i];
        }
    }
    return ret;
}

function getSuppressGrammarParams(ldmObject, dialogStatesObject){
    var ret = '';
    ret = ret + 'SWI.appsessionid=' + dialogStatesObject.appsessionID;
    ret = ret + ';SWI.appstepid=' + dialogStatesObject.appstepID;
    return ret;
}

function incrementAppStepID(dialogStatesObject){
    if(isNaN(dialogStatesObject.appstepID)){
        dialogStatesObject.appstepID = 1;
    }else{
        dialogStatesObject.appstepID = dialogStatesObject.appstepID + 1;
    }
}

function startInlineConf(ldmObject){
    ldmObject.isDoingConf = true;
    return true;
}

function checkIsDoingConf(ldmObject){
    return ldmObject.isDoingConf;
}

function endInlineConf(ldmObject){
    ldmObject.isDoingConf = false;
    return true;
}

function getNBestResults(lastresult){
    var ret = new Array();
    var i;
    for(i in lastresult){
        var tempObject = new Object();
        tempObject.inputmode = lastresult[i].inputmode;
        tempObject.confidence = lastresult[i].confidence;
        tempObject.utterance = lastresult[i].utterance;
        tempObject.interpretation = lastresult[i].interpretation;
        
        ret.push(tempObject);
    }
    return ret;
}

function initDialogStates(stateId){
	if(dialogStates[stateId] == undefined){
		dialogStates[stateId] = new Object();
	}
	dialogStates[stateId].previousHasPlayed = false;
	if(dialogStates[stateId].hasPlayed == true){
		dialogStates[stateId].previousHasPlayed = true;
	}
	return true;
}

function revertDialogStates(stateId){
	dialogStates[stateId].hasPlayed = dialogStates[stateId].previousHasPlayed;
}

function updateLDMObject(origObject, newObject){
	return newObject;
}