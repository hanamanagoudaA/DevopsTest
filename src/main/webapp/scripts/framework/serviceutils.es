/*
 * Utility functions for services especially for call logging.
 *
 */

// global variables

var returnNodeName = undefined;
var lastNodeName = undefined;
var lastStateResult = undefined;
var lastStateInfo = undefined;

// functions

/**
 * Updates the variable currentStateName in the model.
 * @param stateID The name of the current state
 */
function startState(stateID) {
	model.put('currentStateName', stateID);
	return(true);
}

function updateState(stateID, modelData) {
    model.removeState();
    model.addState(modelData.history);
    modelsupport.logDMStateEnd(stateID, modelData.calllog);

    return(true);
}

/**
 * Finalizes the current state. New data added to the model will then
 * be added to a new state.
 * @param stateID The name of the current state
 */
function endState(stateID) {
    model.changedState(stateID);
    return(true);
}

/**
 * Performs the play state start logging.
 * @param stateID The name of the current state
 */
function startPlayState(stateId) {
    logPlayStateStart(stateId);
    return(true);
}

/**
 * Performs the prompt logging. 
 * To be invoked for each prompt being played.
 * @param stateID The name of the current state
 * @param promptID The prompt ID
 * @param promptSrc The prompt URL
 * @param promptText The prompt replacement TTS text
 */
function startPlayPrompt(stateId, promptID, promptSrc, promptText, secure_context, event_name) {
    logPlayPrompt(new Prompt(promptID, promptSrc, promptText), secure_context, event_name);
    return(true);
}

/**
 * Performs the play state end logging.
 * @param stateID The name of the current state
 */
function endPlayState(stateId) {
    logPlayStateEnd(stateId);
    model.changedState(stateId);
    return(true);
}

/**
 * Performs the data access state start logging.
 * @param stateID The name of the current state
 * @param dataAccessID The dataaccess ID
 * @param input The input object. Example construction:
 * <tt>var input = new Object():</tt><br/>
 * <tt>input.item1 = value1;</tt><br/>
 * <tt>input.item2 = value2;</tt><br/>
 * <tt>...</tt><br/>
 * <tt>input.itemN = valueN;</tt><br/>
 * @param secure_context The secure context value to log in the SECURE token
 */
function startDataAccessState(stateID, dataAccessID, input, secure_context) {
    startState(stateID);
	logDataAccessStateStart(stateID, input, secure_context);
	return(true);
}

/**
 * Performs the data access state end logging in case the data access
 * ended in an event.
 * @param stateID The name of the current state
 * @param dataAccessID The dataaccess ID
 * @param event The event being thrown
 * @param message The message of the event (optional)
 * @param secure_context The secure context value to log in the SECURE token
 */
function endDataAccessStateEvent(stateID, dataAccessID, event, message, secure_context) {
	var outputData = new Object();
	outputData.event = event;
	outputData.message = (message == undefined) ? 'undefined' : message;
	logDataAccessStateEnd(stateID, outputData, 'SUCC', secure_context);
	
	//added Node logic
	lastStateResult = 'SUCC';
    lastStateInfo = (message == undefined) ? undefined : message;
    
    // leaving state
    model.changedState(stateID);
    
	return(true);
}

/**
 * Performs the data access state end logging in case the data access
 * ended in an error.
 * @param stateID The name of the current state
 * @param dataAccessID The data access ID
 * @param event The event being thrown
 * @param message The message of the event (optional)
 */
 function endDataAccessStateError(stateID, dataAccessID, event, message) {
	var inputData = new Object();
	inputData.event = event;
	inputData.message = (message == undefined) ? 'undefined' : message;
	logDataAccessStateEnd(stateID, inputData, 'FAIL');
	
	//added Node logic
	lastStateResult = 'FAIL';
    lastStateInfo = (message == undefined) ? undefined : message;
    
    // leaving state
    model.changedState(stateID);
    
	return(true);
}

/**
 * Performs the data access state end logging.
 * @param stateID The name of the current state
 * @param dataAccessID The dataaccess ID
 * @param input The input object. Example construction:
 * <tt>var output = new Object():</tt><br/>
 * <tt>output.item1 = value1;</tt><br/>
 * <tt>output.item2 = value2;</tt><br/>
 * <tt>...</tt><br/>
 * <tt>output.itemN = valueN;</tt><br/>
 * @param message The outcome message, e.g. 'SUCC' or 'FAIL'
 */
function endDataAccessState(stateID, dataAccessID, output, message, secure_context) {
	logDataAccessStateEnd(stateID, output, message, secure_context);
	
    //added Node logic
    lastStateResult = 'SUCC';
        
    // leaving state
    model.changedState(stateID);

	return(true);
}

/**
 * Performs the decision state start logging. This function will be called by the
 * start Decision jsp tag. 
 * @param stateID The name of the current state
 */
function startDecisionState(stateID) {
    startState(stateID);
    modelsupport.logDecisionStateStart(stateID);
    return(true);
}

/**
 * Performs the decision state end logging. This function will be called by the
 * start Decision jsp tag. 
 * It will also update the Node logging result value.
 * @param stateID The name of the current state
 */
function endDecisionState(stateID, label) {
    modelsupport.logDecisionStateEnd(stateID, label);
    lastStateResult = 'SUCC';
        
    // leaving state
    model.changedState(stateID);
    
    return(true);
}

/**
 * Performs the Node start logging.  This function will be called by the
 * start Node jsp tag. 
 * In order to start a new Node:
 * - checks if a previouse Node needs to be ended (calls logNASNodeEndForNAR).
 * - checks if return node name needs to be logged. (call logNASNodeUIReturnNAR)
 * - sets returnNodeName to undefined.
 * - logs start of new Node. (calls logNASNodeStartForNAR)
 * - sets lastNodeName to nodename.
 * @param nodename The name of the current state
 */
function startNode(nodename){
    logNASNodeEndForNAR(lastNodeName,lastStateResult,lastStateInfo);
    logNASNodeUIReturnNAR(returnNodeName)
    returnNodeName = undefined;
    logNASNodeStartForNAR(nodename);                
    lastNodeName = new String(nodename);
    return(true);
}

/**
 * Performs the Node end logging. Should be called at the end of the call to 
 * ensure the last Node.
 * @param stateID The name of the current state
 */
function endNode() {
    logNASNodeEndForNAR(lastNodeName, lastStateResult, lastStateInfo);
    return(true);
}
    
/**
 * Sets the return node name.  This function will be called by the
 * return Node jsp tag.
 * @param nodename The name of the current state
 */
function setReturnNodeName(nodename) {
    returnNodeName = nodename;
}

/**
 * Sets the last state result and info.  This function is called within this
 * script file.  Not intended to be called by the application directly.
 * @param lastStateResult
 * @param lastStateInfo
 */
function updateNodeData(stateResult, stateInfo) {
    lastStateResult = stateResult;
    lastStateInfo = stateInfo;
}
   
/**
 * Logs the UIreturn event when the nodename is not empty or undefined. 
 * This function is called within this script file.  Not intended to be 
 * called by the application directly.
 * @param nodename The name of the current state
 */
function logNASNodeUIReturnNAR(nodename) {
    if(nodename != undefined && nodename.length > 0){
        var data = 'EVNT=UIreturn|';
        data += 'NAME='+nodename;                                           
        modelsupport.logString(data);                  
    }
}

/**
 * Logs the UIndnd event when the nodename is not empty or undefined. 
 * This function is called within this script file.  Not intended to be 
 * called by the application directly.
 * @param nodename The name of the current state
 * @param noderesult The result of the Node
 * @param nodeinfo The info related to the result
 */  
function logNASNodeEndForNAR(nodename,noderesult,nodeinfo) {
    if(nodename != undefined){                
	    var data = 'EVNT=UIndnd|';
        data += 'NAME='+nodename+'|';               
        data += 'RSLT='+noderesult+'|';
        data += 'INFO='+nodeinfo;
        modelsupport.logString(data);                  
    }
}
   
/**
 * Logs the UIndst event when the nodename is not empty or undefined. 
 * This function is called within this script file.  Not intended to be 
 * called by the application directly.
 * @param nodename The name of the current state
 */     
function logNASNodeStartForNAR(nodename) {
    lastNodeName = undefined;
    lastStateResult = undefined;
    lastStateInfo = undefined;
    
    if(nodename != undefined){
        var data = 'EVNT=UIndst|';
        data += 'NAME='+nodename;
        modelsupport.logString(data);               
    }
}

/**
 * Logs the UILog event when the nodename is not empty or undefined. 
 * This function is called within this script file.  Not intended to be 
 * called by the application directly.
 * @param nodename The name of the current state
 * @param logMessage The message
 */
function logNASLogActionStep(nodename, logMessage) {
    if(nodename != undefined){
        var data = 'EVNT=UILog|';
        data += 'NAME='+nodename+'|';                                           
        data += 'INFO='+logMessage;
        modelsupport.logString(data);                  
    }
}
   
/**
 * This is a variable needed for codegen flattening
 */
var stack = new Array();
 
/**
 * Will push the passed value onto the stack
 * @param newVal the value to push onto the stack
 */
function pushStack(newVal) {
	stack.push(newVal);
}

/**
 * Pops the top most value from the stack
 * @return the top most value or null if there is no element to pop
 */
function popStack() {
	var popVal = stack.pop();
	if (popVal == undefined)
		return null;
	else
		return popVal;
}
		     
/**
 * Gets the return link for codegen flattening
 * @return the return link for codegen flattening
 */
function getReturnLink() {
	var finalLink = '';
	var tempVar = popStack();
	//NSRD00085286---strict browser fails on undefined variables
	if(tempVar != null && tempVar != undefined){		     	
		var tempVarSplit  = tempVar.split('::');
		finalLink = tempVarSplit[1] +'#'+tempVarSplit[0];
		var subdialog_call_node = tempVarSplit[0].split('_return');
		returnNodeName = subdialog_call_node[0];
	}
	return finalLink;
}