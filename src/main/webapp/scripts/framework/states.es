/**
 * @class
 */
function ApplicationState() {
	/**
	 * An array of recognition results, filled by the functions
	 * <tt>addRecognitionResult(result)</tt> and
	 * <tt>addNbestResult(result, nbest)</tt>
	 */
	this.recognitions = new Array();

	/**
	 * This boolean indicates whether the state is an anchor state or not.
	 */
	this.anchor = false;
	
	/**
	 * Type string for state objects
	 */
	this._type = 'ApplicationState';
}

/**
 * Can be used to check if the prototype chain of an object is available.
 * For INTERNAL use only.
 */
ApplicationState.prototype._prototypeFlag = true;

ApplicationState.prototype._transientProperties = ['_transientProperties'];

/**
 * Retrieves the value of the entry with the passed key. This entry can be the
 * undefined value.
 * 
 * @param {String}
 *            key The key to look for
 * @returns The object stored in the application state or undefined if not found
 *          or explicitly contains the undefined value
 */
ApplicationState.prototype.get = function(key) {
	return this[key];
}

/**
 * Sets/updates an entry in the application state.
 * 
 * @param key
 *            The key to set/update the value for. This key needs to be a valid
 *            identifier, i.e. consist of letters, numbers, and the underscore
 *            where only the underscore and a letter may start the key.
 * @param value
 *            The value to store, the undefined value is allowed
 * @throws An
 *             Error if the key is not a valid identifier
 */
ApplicationState.prototype.put = function(key, value) {
	if (/^[a-z$_][\w$]*$/i.test(key)) {
		this[key] = value;
	} else {
		throw new Error("The key " + key + " is not a valid identifier!");
	}
}

/**
 * Returns the state's name.
 * 
 * @returns The name of the state. It may be <tt>undefined</tt>.
 */
ApplicationState.prototype.getName = function() {

	//NSRD00086542---Reference error in Interactive Intelligence browser
	if (this.name == undefined) { 
        return null; 
    }  else {
	return this.name;
}
    }

/**
 * Sets the name of the state
 * 
 * @param {String}
 *            name The name to set.
 */
ApplicationState.prototype.setName = function(name) {
	if (typeof (name) == 'string') {
		this.name = name;
	}
}

/**
 * Adds all counter values from property values of the provided counters object
 * to the current state. This methods supports the counters: <tt>nomatches</tt>,
 * <tt>noinputs</tt>, <tt>notoconfirms</tt>, <tt>helps</tt>,
 * <tt>turns</tt>, <tt>repeats</tt>, and <tt>invalidanswers</tt>. For
 * each X in this list this methods calls the corresponding setter method, e.g.
 * for nomatch the function setNomatchCount(value.nomatches) is invoked.
 * 
 * @param counters
 *            An ECMAScript object containing zero or more properties
 */
ApplicationState.prototype.addCounters = function(counters) {
	if (counters != undefined) {
		this.setNomatchCount(counters.nomatches);
		this.setNoinputCount(counters.noinputs);
		this.setNotoconfirmCount(counters.notoconfirms);
		this.setHelpCount(counters.helps);
		this.setTurnCount(counters.turns);
		this.setRepeatCount(counters.repeats);
		this.setInvalidanswerCount(counters.invalidanswers);
	}
}

/**
 * Returns the counter values in an object. This methods supports the counters:
 * <tt>nomatches</tt>, <tt>noinputs</tt>, <tt>notoconfirms</tt>,
 * <tt>helps</tt>, <tt>turns</tt>, <tt>repeats</tt>, and
 * <tt>invalidanswers</tt>.
 */
ApplicationState.prototype.getCounters = function() {
	var counters = new Object();

	//NSRD00085286---strict browser fails on undefined variables
	if (this.getNomatchCount() != undefined) {
	counters.nomatches = this.getNomatchCount();
	}
	if (this.getNoinputCount() != undefined) {
	counters.noinputs = this.getNoinputCount();
	}
	if (this.getNotoconfirmCount() != undefined) {
	counters.notoconfirms = this.getNotoconfirmCount();
	}
	if (this.getHelpCount() != undefined){
	counters.helps = this.getHelpCount();
	}
	if (this.getTurnCount() != undefined){
	counters.turns = this.getTurnCount();
	}
	if (this.getRepeatCount() != undefined) {
	counters.repeats = this.getRepeatCount();
	}
	if (this.getInvalidanswerCount() != undefined) {
	counters.invalidanswers = this.getInvalidanswerCount();
	}

	return counters;
}

/**
 * Sets the <tt>nomatch</tt> counter value by invoking
 * <tt>put(&apos;nomatches&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ApplicationState.prototype.setNomatchCount = function(value) {
	if (!isNaN(value) && value >= 0) {
		this.put("nomatches", value);
	}
}

/**
 * Sets the <tt>noinput</tt> counter value by invoking
 * <tt>put(&apos;noinputs&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ApplicationState.prototype.setNoinputCount = function(value) {
	if (!isNaN(value) && value >= 0) {
		this.put("noinputs", value);
	}
}

/**
 * Sets the <tt>notoconfirm</tt> counter value by invoking
 * <tt>put(&apos;notoconfirms&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ApplicationState.prototype.setNotoconfirmCount = function(value) {
	if (!isNaN(value) && value >= 0) {
		this.put("notoconfirms", value);
	}
}

/**
 * Sets the <tt>help</tt> counter value by invoking
 * <tt>put(&apos;helps&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ApplicationState.prototype.setHelpCount = function(value) {
	if (!isNaN(value) && value >= 0) {
		this.put("helps", value);
	}
}

/**
 * Sets the <tt>turn</tt> counter value by invoking
 * <tt>put(&apos;turns&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ApplicationState.prototype.setTurnCount = function(value) {
	if (!isNaN(value) && value >= 0) {
		this.put("turns", value);
	}
}

/**
 * Sets the <tt>repeats</tt> counter value by invoking
 * <tt>put(&apos;repeats&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ApplicationState.prototype.setRepeatCount = function(value) {
	if (!isNaN(value) && value >= 0) {
		this.put("repeats", value);
	}
}

/**
 * Sets the <tt>invalidanswers</tt> counter value by invoking
 * <tt>put(&apos;invalidanswers&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ApplicationState.prototype.setInvalidanswerCount = function(value) {
	if (!isNaN(value) && value >= 0) {
		this.put("invalidanswers", value);
	}
}

/**
 * Gets the <tt>nomatch</tt> counter from the application history by invoking
 * <tt>get(&apos;nomatches&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
ApplicationState.prototype.getNomatchCount = function() {

//NSRD00085286---strict browser fails on undefined variables
	if (this.nomatches == undefined) {
		return 0;
	} else {
	return this.nomatches;
	}
}

/**
 * Gets the <tt>noinput</tt> counter from the application history by invoking
 * <tt>get(&apos;noinputs&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
ApplicationState.prototype.getNoinputCount = function() {

//NSRD00085286---strict browser fails on undefined variables
	if (this.noinputs == undefined) {
		return 0;
	} else {
	return this.noinputs;
	}
}

/**
 * Gets the <tt>notoconfirm</tt> counter from the application history by
 * invoking <tt>get(&apos;confirms&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
ApplicationState.prototype.getNotoconfirmCount = function() {

//NSRD00085286---strict browser fails on undefined variables
	if (this.notoconfirms == undefined) {
		return 0;
	} else {
	return this.notoconfirms;
	}
}

/**
 * Gets the <tt>help</tt> counter from the application history by invoking
 * <tt>get(&apos;helps&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
ApplicationState.prototype.getHelpCount = function() {

//NSRD00085286---strict browser fails on undefined variables
	if (this.helps == undefined) {
		return 0;
	} else {
	return this.helps;
	}
}

/**
 * Gets the <tt>turn</tt> counter from the application history by invoking
 * <tt>get(&apos;turns&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
ApplicationState.prototype.getTurnCount = function() {

//NSRD00085286---strict browser fails on undefined variables
	if (this.turns == undefined) {
		return 0;
	} else {
	return this.turns;
	}
}

/**
 * Gets the <tt>repeat</tt> counter from the application history by invoking
 * <tt>get(&apos;repeats&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
ApplicationState.prototype.getRepeatCount = function() {

//NSRD00085286---strict browser fails on undefined variables
	if (this.repeats == undefined) {
		return 0;
	} else {
	return this.repeats;
	}
}

/**
 * Gets the <tt>invalidanswers</tt> counter from the application history by
 * invoking <tt>get(&apos;invalidanswers&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
ApplicationState.prototype.getInvalidanswerCount = function() {

//NSRD00085286---strict browser fails on undefined variables
	if (this.invalidanswers == undefined) {
		return 0;
	} else {
	return this.invalidanswers;
	}
}

/**
 * Adds the provided recognition result by calling
 * <tt>addNbestResult(result, result.length)</tt>
 * 
 * @param result
 *            The application.lastresult$ array maintained by the VoiceXML
 *            interpreter
 */
ApplicationState.prototype.addRecognitionResult = function(result) {
	if (result === undefined) {
		throw new Error('The result parameter has to be present');
	}
	this.addNbestResult(result, result.length);
}

/**
 * Adds the result to the current application state.
 * 
 * @param result
 *            The application.lastresult$ array maintained by the VoiceXML
 *            interpreter
 * @param nbest
 *            The n-th index into the application.lastresult array up to which
 *            the alternatives are added to the application history
 */
ApplicationState.prototype.addNbestResult = function(result, nbest) {
	if (result == undefined) {
		throw new Error('Result parameter must not be null');
	}
	if (result.length == undefined) {
		throw new Error(
				'The length property of the result must not be ' + 'undefined');
	}
	if (nbest < 0) {
		throw new Error('Nbest has to be positive');
	}
	var nbestArray = new Array();
	if (nbest === undefined) {
		nbest = result.length;
	}
	for ( var i = 0; i < nbest; i++) {
		if (result[i] == undefined) {
			break;
		}
		nbestArray[i] = result[i];
	}
	if (nbestArray.length > 0) {
		this.recognitions.push(nbestArray);
	}
}

/**
 * Returns the recognitions from this state
 * 
 * @returns The recognitions from this state as an array.
 */
ApplicationState.prototype.getRecognitions = function() {

//NSRD00085286---strict browser fails on undefined variables
	if (this.recognitions == undefined) {
	return null;
	} else {
	return this.recognitions;
}
}

/**
 * Returns the last return value for the given key
 * 
 * @returns The return value found for the key or the undefined value
 */
ApplicationState.prototype.getLastReturnValue = function(key) {
	if (key === undefined) {
		throw new Error('The key may not be empty');
	}
	var result = undefined;
	var recognitionArray = '';
	// will fit for CAS this way, too

	//NSRD00085286---strict browser fails on undefined variables
	if (this.getRecognitions() != undefined){
	recognitionArray = this.getRecognitions();
	}

	for ( var i = recognitionArray.length - 1; i >= 0; i--) {
		var recognitionsItem = recognitionArray[i];
		if (recognitionsItem.length > 0) {
			// only first best
			var interpretation = recognitionsItem[0].interpretation;
			if (interpretation[key] != undefined) {
				result = interpretation[key];
				break;
			}
		}
	}
	return result;
}

/**
 * @class Represents a complex application state
 * @augments ApplicationState
 */
function ComplexApplicationState() {
	/**
	 * The child states as an array.
	 */
	this.children = new Array();

	/**
	 * The current state.
	 */
	this.currentstate = undefined;

	/**
	 * The previous state.
	 */
	this.previousstate = undefined;

	/**
	 * Delete recognitions array
	 */
	delete this.recognitions;
	
	/**
	 * Type string for state objects
	 */
	this._type = 'ComplexApplicationState';

}

ComplexApplicationState.prototype = new ApplicationState();
ComplexApplicationState.prototype.constructor = ComplexApplicationState;

ComplexApplicationState.prototype._transientProperties = ['currentstate', 
    'previousstate', '_transientProperties'];
/**
 * Helper method to retrieve the currentstate and also instantiate it in case 
 * it is undefined. Should be used by all methods that want to write to the
 * currentstate.
 * 
 * @returns the currentstate
 */
ComplexApplicationState.prototype.getOrCreateCurrentState = function() {
	if (this.currentstate == undefined) {
		this.currentstate = new ApplicationState();
		this.children.push(this.currentstate);
	}
	return this.currentstate;
}

/**
 * Retrieves one entry from the application state. This function starts looking
 * at the complex application state itself and proceeds with the children
 * starting with the last added child until it finds the first entry. This 
 * entry can be the undefined value.
 * 
 * @param key
 *            The key to look for
 * @returns The object stored in the complex application state or one of its
 *          children or undefined if not found
 */
ComplexApplicationState.prototype.get = function(key) {
	var ret = undefined;
	for ( var i = this.getChildren().length - 1; i >= 0; i--) {
		var res = this.getChildren()[i].get(key);
		if (res != undefined) {
			ret = res;
			break;
		}
	}
	return ret;
}

/**
 * Sets/updates an entry in the current application state.
 * 
 * @param key
 *            The key to set/update the value for. This key needs to be a valid
 *            identifier, i.e. consist of letters, numbers, and the underscore
 *            where only the underscore and a letter may start the key.
 * @param value
 *            The value to store, the undefined value is allowed
 * @throws An
 *             Error if the key is not a valid identifier
 */
ComplexApplicationState.prototype.put = function(key, value) {
	if (/^[a-z$_][\w$]*$/i.test(key)) {
		this.getOrCreateCurrentState()[key] = value;
	} else {
		throw new Error("The key " + key + " is not a valid identifier!");
	}
}

/**
 * Adds all counter values from property values of the provided counters object
 * to the current state. This methods supports the counters: <tt>nomatches</tt>,
 * <tt>noinputs</tt>, <tt>notoconfirms</tt>, <tt>helps</tt>,
 * <tt>turns</tt>, <tt>repeats</tt>, and <tt>invalidanswers</tt>. For
 * each X in this list this methods calls the corresponding setter method, e.g.
 * for nomatch the function setNomatchCount(value.nomatches) is invoked.
 * 
 * @param counters
 *            An ECMAScript object containing zero or more properties
 */
ComplexApplicationState.prototype.addCounters = function(counters) {
	if (counters != undefined) {
    	this.getOrCreateCurrentState().setNomatchCount(counters.nomatches);
    	this.getOrCreateCurrentState().setNoinputCount(counters.noinputs);
    	this.getOrCreateCurrentState().setNotoconfirmCount(counters.notoconfirms);
    	this.getOrCreateCurrentState().setHelpCount(counters.helps);
    	this.getOrCreateCurrentState().setTurnCount(counters.turns);
    	this.getOrCreateCurrentState().setRepeatCount(counters.repeats);
    	this.getOrCreateCurrentState().setInvalidanswerCount(counters.invalidanswers);
    }
}

/**
 * Retrieves the children array of this complex application state.
 * 
 * @returns An Array with the children of this complex application state. This
 *          Array can be empty.
 */
ComplexApplicationState.prototype.getChildren = function() {
	return this.children;
}

/**
 * Adds the passed child state to the children of this complex application
 * state.
 * 
 * @param {ApplicationState}
 *            childState An {@link ApplicationState} to be added as new child.
 */
ComplexApplicationState.prototype.addChild = function(childState) {
	if (childState === undefined) {
		throw new Error('The new child state may not be null');
	}
	if(/^\w*applicationstate|dmresult\w*$/i.test(childState._type)){ 
		assertPrototypes(childState);
		this.children.push(childState);
		if (this.currentstate != null) {
			this.previousstate = this.currentstate;
		}
		this.currentstate = childState;
	}
	else {
		throw new Error('Only instances of the type ApplicationState can be ' +
				'added as children.');
	}
}

/**
 * Removes the last child from the children's array, if the children count is
 * greater than 0, otherwise this method won't have an effect
 */
ComplexApplicationState.prototype.removeChild = function() {
	this.getChildren().pop();
	this.currentstate = undefined;
	this.previousstate = (this.getChildren().length > 0
			? this.getChildren()[this.getChildren().length - 1]
			: undefined);
}

/**
 * Returns the last return value for the given key
 * 
 * @returns The return value found for the key or the undefined value
 */
ComplexApplicationState.prototype.getLastReturnValue = function(key) {
	var result = undefined;
	for ( var i = this.getChildren().length - 1; i >= 0; i--) {
		var lastRes = this.getChildren()[i].getLastReturnValue(key);
		if (lastRes != undefined) {
			result = lastRes;
			break;
		}
	}
	return lastRes;
}

/**
 * Gets the <tt>turn</tt> counter <tt>get(&apos;turns&apos;)</tt> sum of all
 * contained application states.
 * 
 * @returns The summed up counter value
 */
ComplexApplicationState.prototype.getTurnCount = function() {
	var ret = 0;
	for ( var i = 0; i < this.children.length; ++i) {
		ret += this.children[i].getTurnCount();
	}
	return ret;
}

/**
 * Gets the <tt>repeat</tt> counter <tt>get(&apos;repeats&apos;)</tt> sum of
 * all contained application states.
 * 
 * @returns The summed up counter value
 */
ComplexApplicationState.prototype.getRepeatCount = function() {
	var ret = 0;
	for ( var i = 0; i < this.children.length; ++i) {
		ret += this.children[i].getRepeatCount();
	}
	return ret;
}

/**
 * Gets the <tt>nomatch</tt> counter <tt>get(&apos;nomatches&apos;)</tt> sum
 * of all contained application states.
 * 
 * @returns The summed up counter value
 */
ComplexApplicationState.prototype.getNomatchCount = function() {
	var ret = 0;
	for ( var i = 0; i < this.children.length; ++i) {
		ret += this.children[i].getNomatchCount();
	}
	return ret;
}

/**
 * Gets the <tt>noinput</tt> counter <tt>get(&apos;noinputs&apos;)</tt> sum
 * of all contained application states.
 * 
 * @returns The summed up counter value
 */
ComplexApplicationState.prototype.getNoinputCount = function() {
	var ret = 0;
	for ( var i = 0; i < this.children.length; ++i) {
		ret += this.children[i].getNoinputCount();
	}
	return ret;
}

/**
 * Gets the <tt>invalidanswer</tt> counter
 * <tt>get(&apos;invalidanswers&apos;)</tt> sum of all contained application
 * states.
 * 
 * @returns The summed up counter value
 */
ComplexApplicationState.prototype.getInvalidanswerCount = function() {
	var ret = 0;
	for ( var i = 0; i < this.children.length; ++i) {
		ret += this.children[i].getInvalidanswerCount();
	}
	return ret;
}

/**
 * Gets the <tt>help</tt> counter <tt>get(&apos;helps&apos;)</tt> sum of all
 * contained application states.
 * 
 * @returns The summed up counter value
 */
ComplexApplicationState.prototype.getHelpCount = function() {
	var ret = 0;
	for ( var i = 0; i < this.children.length; ++i) {
		ret += this.children[i].getHelpCount();
	}
	return ret;
}

/**
 * Gets the <tt>notoconfirm</tt> counter
 * <tt>get(&apos;notoconfirms&apos;)</tt> sum of all contained application
 * states.
 * 
 * @returns The summed up counter value
 */
ComplexApplicationState.prototype.getNotoconfirmCount = function() {
	var ret = 0;
	for ( var i = 0; i < this.children.length; ++i) {
		ret += this.children[i].getNotoconfirmCount();
	}
	return ret;
}

/**
 * Sets the <tt>nomatch</tt> counter value by invoking
 * <tt>put(&apos;nomatches&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ComplexApplicationState.prototype.setNomatchCount = function(value) {

//NSRD00085286---strict browser fails on undefined variables
	if (this.getOrCreateCurrentState() != undefined){
    this.getOrCreateCurrentState().setNomatchCount(value);
}
}

/**
 * Sets the <tt>noinput</tt> counter value by invoking
 * <tt>put(&apos;noinputs&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ComplexApplicationState.prototype.setNoinputCount = function(value) {

//NSRD00085286---strict browser fails on undefined variables
	if (this.getOrCreateCurrentState() != undefined) {
    this.getOrCreateCurrentState().setNoinputCount(value);
}
}

/**
 * Sets the <tt>notoconfirm</tt> counter value by invoking
 * <tt>put(&apos;notoconfirms&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ComplexApplicationState.prototype.setNotoconfirmCount = function(value) {

//NSRD00085286---strict browser fails on undefined variables
	if (this.getOrCreateCurrentState() != undefined) {
    this.getOrCreateCurrentState().setNotoconfirmCount(value);
}
}

/**
 * Sets the <tt>help</tt> counter value by invoking
 * <tt>put(&apos;helps&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ComplexApplicationState.prototype.setHelpCount = function(value) {

//NSRD00085286---strict browser fails on undefined variables
	if (this.getOrCreateCurrentState() != undefined) {
    this.getOrCreateCurrentState().setHelpCount(value);
}
}

/**
 * Sets the <tt>turn</tt> counter value by invoking
 * <tt>put(&apos;turns&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ComplexApplicationState.prototype.setTurnCount = function(value) {

//NSRD00085286---strict browser fails on undefined variables
	if (this.getOrCreateCurrentState() != undefined) {
    this.getOrCreateCurrentState().setTurnCount(value);
}
}

/**
 * Sets the <tt>repeats</tt> counter value by invoking
 * <tt>put(&apos;repeats&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ComplexApplicationState.prototype.setRepeatCount = function(value) {

//NSRD00085286---strict browser fails on undefined variables
	if (this.getOrCreateCurrentState() != undefined) {
    this.getOrCreateCurrentState().setRepeatCount(value);
}
}

/**
 * Sets the <tt>invalidanswers</tt> counter value by invoking
 * <tt>put(&apos;invalidanswers&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
ComplexApplicationState.prototype.setInvalidanswerCount = function(value) {

//NSRD00085286---strict browser fails on undefined variables
	if (this.getOrCreateCurrentState() != undefined) {
    this.getOrCreateCurrentState().setInvalidanswerCount(value);
}
}

/**
 * Adds the provided recognition result by calling
 * <tt>addNbestResult(result, result.length)</tt>
 * 
 * @param result
 *            The application.lastresult$ array maintained by the VoiceXML
 *            interpreter
 */
ComplexApplicationState.prototype.addRecognitionResult = function(result) {
	if(result != undefined){
		this.addNbestResult(result, result.length);
	}
	else {
		throw new Error("The passed result must not be undefined!");
	}
}

/**
 * Adds the result to the current application state.
 * 
 * @param result
 *            The application.lastresult$ array maintained by the VoiceXML
 *            interpreter
 * @param nbest
 *            The n-th index into the application.lastresult array up to which
 *            the alternatives are added to the application history
 */
ComplexApplicationState.prototype.addNbestResult = function(result, nbest) {
    this.getOrCreateCurrentState().addNbestResult(result, nbest);
}

/**
 * Returns the recognitions stored in the children of this state.
 * 
 * @returns An array of all recognitions done so far with the oldest recognition
 *          first and the latest last.
 */
ComplexApplicationState.prototype.getRecognitions = function() {
	var res = new Array();
	for ( var i = 0; i < this.getChildren().length; i++) {
		var childRecognitions = this.getChildren()[i].getRecognitions();
		// res.concat(childRecognitions); (did not work out for some reason)
		for ( var j = 0; j < childRecognitions.length; j++) {
			res.push(childRecognitions[j]);
		}
	}
	return res;
}

ComplexApplicationState.prototype.getCurrentState = function() {

//NSRD00085286---strict browser fails on undefined variables
	if (this.currentstate != undefined) {
		return this.currentstate;
	} 
	return null;
}

ComplexApplicationState.prototype.getPreviousState = function() {

//NSRD00085286---strict browser fails on undefined variables
	if (this.previousstate != undefined) {
		return this.previousstate;
	} 
	return null;
}

ComplexApplicationState.prototype.changedState = function(name) {
	//will create a new currentstate if not available
	this.getOrCreateCurrentState();

	//NSRD00085286---strict browser fails on undefined variables
	if (this.currentstate != undefined) {
		this.previousstate = this.currentstate;
		this.currentstate.setName(name);
	} 
	this.currentstate = undefined;
}
