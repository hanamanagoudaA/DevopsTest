/*
 * Utility functions for logging errors.
 *
 */

/*--------------------Start Error Functions -----------------------------*/

/**
 * This function should be called when an error occurs within the application
 * and the current state Id within the application is not known.  This function
 * will get either the current state Id if set or it will get the previous
 * state from the model object in order to give an idea of where the error 
 * occurred.  Once the state Id is found, this function will call the
 * logError function and create the correct error for the current Node if set.
 *
 * NOTE: Errors can be any unexpected VXML events or specific scenarios that happen 
 * within an application.  Not all events are considered errors.  For instance,
 * any events throw by the data access layer are not considered errors and will
 * be handled by the data access service.  However, a badfetch caught in the 
 * application root would be considered unexpected and in this case the state ID
 * is unknown.
 * @param errorId Typically the VXML event caught, but can be anything 
 * meaningful for the application.
 * @returns <tt>true</tt>
 */
function trackErrorNoStateID(errorId) {
 
    
    var state;    
    var stateID = 'unknown';
    
    //NSRD00085286---strict browser fails on undefined variables
    if (model != undefined && model.getCurrentState() != undefined) {
	state = model.getCurrentState();
	if (state.getName() != undefined){
		stateID = state.getName();
	}
    }
    
    else {

    //NSRD00085286---strict browser fails on undefined variables
    if (model != undefined && model.getPreviousState() != undefined) {
        state = model.getPreviousState();
	if (state.getName() != undefined){
	stateID = state.getName();
	}
	}
       
    }
    logError(stateID, errorId, '');
    updateNodeData(errorId,'');
    
    return(true);
}

/**
 * This function should be called when an error with a meaning associated 
 * message occurs within the application and the current state Id within 
 * the application is not known.  This function will get either the current 
 * state Id if set or it will get the previous
 * state from the model object in order to give an idea of where the error 
 * occurred.  Once the state Id is found, this function will call the
 * logError function and create the correct error for the current Node if set. 
 *
 * NOTE: Errors can be any unexpected VXML events or specific scenarios that happen 
 * within an application.  Not all events are considered errors.  For instance,
 * any events throw by the data access layer are not considered errors and will
 * be handled by the data access service.  However, a badfetch caught in the 
 * application root would be considered unexpected and in this case the state ID
 * is unknown.
 * @param errorId Typically the VXML event caught, but can be anything 
 * meaningful for the application.
 * @param message The error message. Please note that potential newlines will be
 * removed from the value string.
 * @returns <tt>true</tt>
 */
function trackErrorAndMessageNoStateID(errorId, message) {
    
    var state;     
    var stateID = 'unknown';
    
    //NSRD00085286---strict browser fails on undefined variables
    if (model != undefined && model.getCurrentState() != undefined) {
	state = model.getCurrentState();
	if (state.getName() != undefined){
	stateID = state.getName();
	}
    }

    else {

         //NSRD00085286---strict browser fails on undefined variables
         if (model != undefined && model.getPreviousState() != undefined) {
         state = model.getPreviousState();
	 if (state.getName() != undefined){
	stateID = state.getName();
	}
	 }        
        
    }
    
    trackErrorAndMessage(stateID, errorId, message);
    
    return(true);
}

/**
 * This function should be called when an error occurs within the application 
 * and the current state Id within the application is known.  This function 
 * will call the logError function and create the correct error for the 
 * current Node if set. 
 *
 * NOTE: Errors can be any unexpected VXML events or specific scenarios that happen 
 * within an application.  Not all events are considered errors.  For instance,
 * any events throw by the data access layer are not considered errors and will
 * be handled by the data access service.  However, a badfetch caught in the 
 * application root would be considered unexpected and in this case the state ID
 * is unknown.
 * @param errorId Typically the VXML event caught, but can be anything 
 * meaningful for the application.
 * @returns <tt>true</tt>
 */
function trackError(stateId, errorId) {
    logError(stateId, errorId, '');
    updateNodeData(errorId, '');
    
    return(true);
}

/**
 * This function should be called when an error with a meaning associated 
 * message occurs within the application and the current state Id within 
 * the application is known.  This function will call the logError function 
 * and create the correct error for the current Node if set. 
 *
 * NOTE: Errors can be any unexpected VXML events or specific scenarios that happen 
 * within an application.  Not all events are considered errors.  For instance,
 * any events throw by the data access layer are not considered errors and will
 * be handled by the data access service.  However, a badfetch caught in the 
 * application root would be considered unexpected and in this case the state ID
 * is unknown.
 * @param errorId Typically the VXML event caught, but can be anything 
 * meaningful for the application.
 * @param message The error message. Please note that potential newlines will be
 * removed from the value string.
 * @param stateId The state id.
 * @returns <tt>true</tt>
 */
function trackErrorAndMessage(stateId, errorId, message) {
    var checkedMessage = message;
    if(message != undefined){
    	checkedMessage = message.replace(/\n/g, ' ');
    }
    
    logError(stateId, errorId, checkedMessage);
    updateNodeData(errorId, checkedMessage);
    
    return(true);
}


