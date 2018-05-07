/*------------------Start NDM Call Tracking Functions------------------*/

  var appsessionID = '';
  var appstepID = '';
  var callLogStartTime = '';

  function startNDMState(stateID)
  {
    startState(stateID);
    modelsupport.logDMStateStart(stateID);
    return true;
  }
  
  function endNDMState(stateID, ndmID, output)
  {
    model.addState(createDMResult(output)); 
    modelsupport.logDMStateEnd(stateID,output.eventLogs); 
    model.changedState(stateID);
    appstepID = output.appstepID;
    
    //added Node logic 
    lastStateResult= output.returncode;    
    lastStateInfo = getNDMFailureOrSuccessInfo(stateID, output.returncode, output.returnvalue, output.failurereason);
    
    return true;
  }
 
  function endNDMStateError(stateID, ndmID, event, message)
  {
    model.changedState(stateID);
    
    //added Node logic
    lastStateResult= 'FAILURE';    
    lastStateInfo =(message == undefined) ? 'undefined' : message;
    
    return true;
  }

  function getNDMFailureOrSuccessInfo(stateID, returncode, returnvalue, failurereason) {
    if(stateID != undefined && returncode == 'SUCCESS'){
        return ""; // returnvalue              
    }
    if(stateID != undefined && returncode == 'FAILURE'){
        return failurereason;
    }
    if(stateID != undefined && returncode == 'COMMAND'){
        return returnvalue;
    }
    return "";
  }