function startState(stateID) {
    modelData.callTrackingStateID = stateID;
    return(true);
}

function updateState(stateID, modelData) {
    appendPremadeCallTrackingString(modelData);
    return(true);
}

function endState(stateID) {
    return(true);
}

function startPlayState(stateId) {
    modelData.callTrackingStateID = stateId;
    return(true);
}

function startPlayPrompt(stateID, promptID, promptSrc, promptText)
{
    var trackingData = "";
    if ( (promptSrc == undefined || promptSrc == '') ) 
    {
        if ( promptText == undefined || promptText == '') {
            // Unknown Prompt
            trackingData = 'P(unknown)';
            appendCallTrackingData(stateID, trackingData);
        } else {
            // promptSrc null, but promptText defined (Dynamic Audio)
            trackingData = 'PV(' + promptText + ')';
            appendCallTrackingData(stateID, trackingData);
        }   
    }
    else 
    {
        // promptSrc is defined (Static Audio)
        trackingData = 'P(' + promptID + ')';
        appendCallTrackingData(stateID, trackingData);
    }
    
    return true;
}
    
function endPlayState(stateId) {
    return(true);
}

function startDataAccessState(stateID, dataAccessID, input)
{
	var trackingData;
	if (input == undefined) {
    	trackingData = 'B(' + dataAccessID + ')';
	}
	else { 
    	trackingData = 'B(' + dataAccessID + '[' + assembleNameValueList(input) + '])'; 
	} 
    appendCallTrackingData(stateID, trackingData);
	return true;
}
  
function endDataAccessStateEvent(stateID, dataAccessID, event, message)
{	
	var errorString = event;
	if (message != undefined && message != '') {
		errorString += ': ' + message;
	}

	var trackingData = 'B(' + errorString + ')'; 
	appendCallTrackingData(stateID, trackingData);

	return true;
}
  
function endDataAccessStateEvent(stateID, dataAccessID, event)
{   
    var errorString = event;
    
    var trackingData = 'B(' + errorString + ')'; 
    appendCallTrackingData(stateID, trackingData);

    return true;
}
  
function endDataAccessStateError(stateID, dataAccessID, event, message)
{
	var errorString = event;
	if (message != undefined && message != '') {
		errorString += ': ' + message;
	}

	var trackingData = 'BF(' + errorString + ')'; 
	appendCallTrackingData(stateID, trackingData);
	return true;
}

function endDataAccessStateError(stateID, dataAccessID, event)
{
    var errorString = event;
    
    var trackingData = 'BF(' + errorString + ')'; 
    appendCallTrackingData(stateID, trackingData);
    return true;
}

function endDataAccessState(stateID, dataAccessID, output, message)
{
    var trackingData;
    if (output == undefined) {
        trackingData = 'BS(' + dataAccessID + ')';
    }
    else { 
        trackingData = 'BS(' + dataAccessID + '[' + assembleNameValueList(output) + '])'; 
    }
    appendCallTrackingData(stateID, trackingData);
    return true;
}
