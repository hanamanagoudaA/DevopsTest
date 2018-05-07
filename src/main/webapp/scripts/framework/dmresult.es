	/** >>>>>>>>>>>>>>>>>>>>>>>>> DMResultComponent Class Defintion (Start) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>**/
	/**
	 * DMResultComponent default constructor.
	 */
	function DMResultComponent()
	{		
		  /**
	       * Type string for state objects
	       */
	      this._type = 'DMResultComponent';
	}
	
	DMResultComponent.prototype = new ApplicationState();
	DMResultComponent.prototype.constructor = DMResultComponent;
	
		/**
	 * Sets the Confidence score.
	 * 
	 * @param confidenceScore a string
	 */		
	DMResultComponent.prototype.setConfidenceScore = function(confidenceScore) {
		this.confidenceScore = confidenceScore;		
	}

	/**
	 * Sets the input mode.
	 * 
	 * @param inputMode a string
	 */			
	DMResultComponent.prototype.setInputMode = function(inputMode) {
		this.inputMode = inputMode;	
	}

	/**
	 * Sets the raw answer.
	 * 
	 * @param rawAnswer a string
	 */				
	DMResultComponent.prototype.setRawAnswer = function(rawAnswer) {
		this.rawAnswer = rawAnswer;	
	}
	
	/**
	 * Returns the confidence score.
	 * 
	 * @returns The confidence score string  
	 */		
	DMResultComponent.prototype.getConfidenceScore = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.confidenceScore != undefined) {
		return this.confidenceScore;
		} 
		return null;
	}

	/**
	 * Returns the input mode.
	 * 
	 * @returns The input mode string  
	 */			
	DMResultComponent.prototype.getInputMode = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.inputMode != undefined) {
		return this.inputMode;
		} 
		return null;
	}
	
	/**
	 * Returns the raw answer.
	 * 
	 * @returns The raw answer string  
	 */			
	DMResultComponent.prototype.getRawAnswer = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.rawAnswer != undefined) {
		return this.rawAnswer;
		}
		return null;
	}
	
	
	/** <<<<<<<<<<<<<<<<<<<<<<<< DMResultComponent Class Defintion (End) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<**/
	
	
	/** >>>>>>>>>>>>>>>>>>>>>>>>> DMResult Class Defintion (Start) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>**/
	/**
	 * DMResult default constructor.
	 */
	function DMResult()
	{		
		//setup the collection
		var collectionResult = new DMResultComponent();
		collectionResult.setName('collection');
		this.addChild(collectionResult);
		this.setCollectionResult(collectionResult);
		
		//setup the confirmation
		var confirmationResult = new DMResultComponent();
		confirmationResult.setName('confirmation');
		this.addChild(confirmationResult);
		this.setConfirmationResult(confirmationResult);
		
		  /**
	       * Type string for state objects
	       */
	      this._type = 'DMResult';
		
	}

	
	DMResult.prototype = new ComplexApplicationState();
	DMResult.prototype.constructor = DMResult;
	
	//TODO type checks for setters throughout
	/**
	 * Sets the Collection result.
	 * 
	 * @param collectionResult an ApplicationState object
	 */	
	DMResult.prototype.setCollectionResult = function(collectionResult) {
		this.collectionResult = collectionResult;
	}

	/**
	 * Sets the Confirmation result.
	 * 
	 * @param confirmationResult an ApplicationState object
	 */	
	DMResult.prototype.setConfirmationResult = function(confirmationResult) {
		this.confirmationResult = confirmationResult;	
	}
	
	/**
	 * Sets the Confidence score.
	 * 
	 * @param confidenceScore a string
	 */		
	DMResult.prototype.setConfidenceScore = function(confidenceScore) {
		this.confidenceScore = confidenceScore;		
	}

	/**
	 * Sets the input mode.
	 * 
	 * @param inputMode a string
	 */			
	DMResult.prototype.setInputMode = function(inputMode) {
		this.inputMode = inputMode;	
	}

	/**
	 * Sets the raw answer.
	 * 
	 * @param rawAnswer a string
	 */				
	DMResult.prototype.setRawAnswer = function(rawAnswer) {
		this.rawAnswer = rawAnswer;	
	}
	
	/**
	 * Sets the return code.
	 * 
	 * @param returnCode a string
	 */					
	DMResult.prototype.setReturnCode = function(returnCode) {
		this.returnCode = returnCode;		
	}
	/**
	 * Sets the return value.
	 * 
	 * @param returnValue a string
	 */						
	DMResult.prototype.setReturnValue = function(returnValue) {
		this.returnValue = returnValue;	
	}
	
	/**
	 * Sets the return keys.
	 * 
	 * @param returnKeys a string
	 */							
	DMResult.prototype.setReturnKeys = function(returnKeys) {
		this.returnKeys = returnKeys;		
	}
	
	/**
	 * Sets the wave form.
	 * 
	 * @param waveForm a string
	 */								
	DMResult.prototype.setWaveForm = function(waveForm) {
		this.waveForm = waveForm;		
	}

	/**
	 * Sets the failure reason.
	 * 
	 * @param failureReason a string
	 */									
	DMResult.prototype.setFailureReason = function(failureReason) {
		this.failureReason = failureReason;		
	}

	/**
	 * Sets the dmRootStatus key.
	 * 
	 * @param dmRootStatus a string
	 */									
	DMResult.prototype.setDMRootStatus = function(dmRootStatus) {
		this.dmRootStatus = dmRootStatus;		
	}
	
	/**
	 * Sets the dmSlot1Status key.
	 * 
	 * @param dmSlot1Status a string
	 */									
	DMResult.prototype.setDMSlot1Status = function(dmSlot1Status) {
		this.dmSlot1Status = dmSlot1Status;		
	}
	
	/**
	 * Sets the dmSlot2Status key.
	 * 
	 * @param dmSlot2Status a string
	 */									
	DMResult.prototype.setDMSlot2Status = function(dmSlot2Status) {
		this.dmSlot2Status = dmSlot2Status;		
	}
	
	/**
	 * Sets the events.
	 * 
	 * @param events an array
	 */									
	DMResult.prototype.setEvents = function(events) {
		this.events = events;	
	}
	
	/**
	 * Sets the event logs.
	 * 
	 * @param eventLogs a string
	 */									
	DMResult.prototype.setEventLogs = function(eventLogs) {
		this.eventLogs = eventLogs;	
	}

	

	/**
	 * Returns the collection result.
	 * 
	 * @returns The ApplicationState object 
	 */
	DMResult.prototype.getCollectionResult = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.collectionResult != undefined) {
		return this.collectionResult;
		}
		return null;
	}

	/**
	 * Returns the confirmation result.
	 * 
	 * @returns The ApplicationState object 
	 */	
	DMResult.prototype.getConfirmationResult = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.confirmationResult != undefined) {
		return this.confirmationResult;
		}
		return null;
	}

	/**
	 * Returns the confidence score.
	 * 
	 * @returns The confidence score string  
	 */		
	DMResult.prototype.getConfidenceScore = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.confidenceScore != undefined) {
		return this.confidenceScore;
		}
		return null;
	}

	/**
	 * Returns the input mode.
	 * 
	 * @returns The input mode string  
	 */			
	DMResult.prototype.getInputMode = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.inputMode != undefined) {
		return this.inputMode;
		}
		return null;
	}
	
	/**
	 * Returns the raw answer.
	 * 
	 * @returns The raw answer string  
	 */			
	DMResult.prototype.getRawAnswer = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.rawAnswer != undefined) {
		return this.rawAnswer;
		}
		return null;
	}

	/**
	 * Returns the return code.
	 * 
	 * @returns The return code
	 */			
	DMResult.prototype.getReturnCode = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.returnCode != undefined) {
		return this.returnCode;
		}
		return null;
	}
	
	/**
	 * Returns the return value.
	 * 
	 * @returns The return value string  
	 */			
	DMResult.prototype.getReturnValue = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.returnValue != undefined) {
		return this.returnValue;
		} 
		return null;
	}
	
	/**
	 * Returns the return keys.
	 * 
	 * @returns The return keys string  
	 */			
	DMResult.prototype.getReturnKeys = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.returnKeys != undefined) {
		return this.returnKeys;
		}
		return null;
	}
	
	/**
	 * Returns the wave form.
	 * 
	 * @returns The wave form string  
	 */			
	DMResult.prototype.getWaveForm = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.waveForm != undefined) {
		return this.waveForm;
		}
		return null;
	}
	
	/**
	 * Returns the failure reason.
	 * 
	 * @returns The failure reason string  
	 */				
	DMResult.prototype.getFailureReason = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.failureReason != undefined) {
		return this.failureReason;
		}
		return null;
	}
	
	/**
	 * Returns the dmRootStatus key.
	 * 
	 * @returns The dmRootStatus key string  
	 */			
	DMResult.prototype.getDMRootStatus = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.dmRootStatus != undefined) {
		return this.dmRootStatus;
		}
		return null;
	}	
	
	/**
	 * Returns the dmSlot1Status key.
	 * 
	 * @returns The dmSlot1Status key string  
	 */			
	DMResult.prototype.getDMSlot1Status = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.dmSlot1Status != undefined) {
		return this.dmSlot1Status;
		}
		return null;
	}
	
	/**
	 * Returns the dmSlot2Status key.
	 * 
	 * @returns The dmSlot2Status key string  
	 */			
	DMResult.prototype.getDMSlot2Status = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.dmSlot2Status != undefined) {
		return this.dmSlot2Status;
		}
		return null;
	}
	
	/**
	 * Returns the events.
	 * 
	 * @returns The events array
	 */			
	DMResult.prototype.getEvents = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.events != undefined) {
		return this.events;
		} 
		return null;
	}


	/**
	 * Returns the event logs.
	 * 
	 * @returns The events logs string.
	 */			
	DMResult.prototype.getEventLogs = function() {

	//NSRD00085286---strict browser fails on undefined variables
		if (this.eventLogs != undefined) {
		return this.eventLogs;
		} 
		return null;
	}

	
/** <<<<<<<<<<<<<<<<<<<<<<<< DMResult Class Definition (End) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<**/	

	/**
	 * Sets the Collection Application state.
	 * 
	 * @param collectionApplicationState the ApplicationState to be set
	 * @param collection the collection object retrieved from the DM 
	 */									
	function setCollectionApplicationState(collectionApplicationState, collection) {
		if (collection != undefined) {
			collectionApplicationState.setConfidenceScore(collection.confidencescore);
			collectionApplicationState.setInputMode(collection.inputmode);
			collectionApplicationState.setRawAnswer(collection.rawanswer);
		
			//set counts
			collectionApplicationState.setNomatchCount(collection.nomatches);
			collectionApplicationState.setNoinputCount(collection.noinputs);
			collectionApplicationState.setHelpCount(collection.helpcount);
			collectionApplicationState.setTurnCount(collection.turncount);
			collectionApplicationState.setRepeatCount(collection.repeatcount);
        }
	}

	/**
	 * Sets the Confirmation Application state.
	 * 
	 * @param confirmationApplicationState the ApplicationState to be set
	 * @param confirmation the confirmation object retrieved from the DM
	 */									
	function setConfirmationApplicationState(confirmationApplicationState, confirmation) {
	   if (confirmation != undefined) {
			confirmationApplicationState.setConfidenceScore(confirmation.confidencescore);
			confirmationApplicationState.setInputMode(confirmation.inputmode);
			confirmationApplicationState.setRawAnswer(confirmation.rawanswer);
			
			//set counts
			confirmationApplicationState.setNomatchCount(confirmation.nomatches);
			confirmationApplicationState.setNoinputCount(confirmation.noinputs);
			confirmationApplicationState.setHelpCount(confirmation.helpcount);
			confirmationApplicationState.setTurnCount(confirmation.turncount);
			confirmationApplicationState.setRepeatCount(confirmation.repeatcount);	
		}
	}

	/**
	 * creates the DMResult object
	 * 
	 * @param dmSubdialog the dm subdialog name 
	 */									
	function createDMResult(dmSubdialog) {
		var dmResult = new DMResult();
		
		//set collection and confirmation results
		//NSRD00085286---strict browser fails on undefined variables
		if(dmSubdialog.collection != undefined) {
		setCollectionApplicationState(dmResult.getCollectionResult(), dmSubdialog.collection) ;
		}
		//NSRD00085286---strict browser fails on undefined variables
		if(dmSubdialog.confirmation != undefined) {
		setConfirmationApplicationState(dmResult.getConfirmationResult(), dmSubdialog.confirmation);
		}

		//set DMResult attributes
		if(dmSubdialog.nbestresults != undefined){
			dmResult.addRecognitionResult(dmSubdialog.nbestresults);
		}
		if(dmSubdialog.confidencescore != undefined){
			dmResult.setConfidenceScore(dmSubdialog.confidencescore);
		}
		if(dmSubdialog.inputmode != undefined){
			dmResult.setInputMode(dmSubdialog.inputmode);
		}
		if(dmSubdialog.rawanswer != undefined){
			dmResult.setRawAnswer(dmSubdialog.rawanswer);
		}
		if(dmSubdialog.invalidanswers != undefined){
			dmResult.setInvalidanswerCount(dmSubdialog.invalidanswers);
		}
		if(dmSubdialog.notoconfirm != undefined){
			dmResult.setNotoconfirmCount(dmSubdialog.notoconfirm);
		}
		if(dmSubdialog.returncode != undefined){
			dmResult.setReturnCode(dmSubdialog.returncode);
		}
		if(dmSubdialog.returnvalue != undefined){
			dmResult.setReturnValue(dmSubdialog.returnvalue);
		}
		if(dmSubdialog.returnkeys != undefined){
			dmResult.setReturnKeys(dmSubdialog.returnkeys);
		}
		if(dmSubdialog.waveform != undefined){
			dmResult.setWaveForm(dmSubdialog.waveform);
		}
		if(dmSubdialog.failurereason != undefined){
			dmResult.setFailureReason(dmSubdialog.failurereason);
		}
		if(dmSubdialog.rawanswer != undefined){
			dmResult.setRawAnswer(dmSubdialog.rawanswer);
		}
		if(dmSubdialog.dm_root_status != undefined){
			dmResult.setDMRootStatus(dmSubdialog.dm_root_status);
		}
		if(dmSubdialog.dm_slot1_status != undefined){
			dmResult.setDMSlot1Status(dmSubdialog.dm_slot1_status);
		}
		if(dmSubdialog.dm_slot2_status != undefined){
			dmResult.setDMSlot2Status(dmSubdialog.dm_slot2_status);
		}
		if(dmSubdialog.event_list != undefined){
			dmResult.setEvents(dmSubdialog.event_list);
		}
		if(dmSubdialog.eventLogs != undefined){
			dmResult.setEventLogs(dmSubdialog.eventLogs);
		}

		return dmResult;
	}	
	
	
