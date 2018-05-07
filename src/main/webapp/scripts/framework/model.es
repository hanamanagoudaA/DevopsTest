/**
 * @class Model type implementation.
 */
function Model() {

	/**
	 * This is the application history which contains changes done to the
	 * contents throughout the client side execution.
	 */
	this.history = new ComplexApplicationState();

	/**
	 * Contains the call trace data. This is a newline (&apos;\n&apos;)
	 * separated string.
	 */
	this.calllog = '';
	/**
	 * Contains the call trace data that was already packed. 
	 * This is a newline (&apos;\n&apos;) separated string as the
	 * calllog.
	 */
	this._calllog = '';

	/**
	 * Contains application specific data that will not be put on the history
	 * and will be synchronized between client and server.
	 */
	this.appdata = new Object();

	/**
	 * Contains application specific data that will not be put on the history
	 * and not be synchronized between client and server.
	 */
	this.appdataUnsynchronized = new Object();
	
	/**
	 * type information
	 */
	this._type = 'Model';
}

/**
 * Can be used to check if the prototype chain of an object is available.
 * For INTERNAL use only.
 */
Model.prototype._prototypeFlag = true;

/**
 * Signals the model to put another application state on the applicaton history
 * based on the list of variables to be included. The provided name is the name
 * of the current state that added data to the model.
 * 
 * @param {String}
 *            name The name of the current state
 */
Model.prototype.changedState = function(name) {
	this.history.changedState(name);
}

/**
 * Adds a state to the application history.This can be an ApplicationState or a
 * ComplexApplicationState or an NDMState. Each state has a property _type that
 * uniquely identifies the state type in ECMAScript since ECMAScript misses
 * inheritance. This method closes the current state in the application history
 * without setting a state name. To add a proper state name it is required
 * calling <tt>changedState(name)</tt> before calling <tt>addState(state)</tt>.
 * 
 * @param {ApplicationState}
 *            state The state to add to the application history
 */
Model.prototype.addState = function(state) {
	this.history.addChild(state);
}

/**
 * Removes the last state from the application history.
 */
Model.prototype.removeState = function() {
	this.history.removeChild();
}

/**
 * Retrieves one entry from the model. This function starts looking at the
 * current application state and continues down (to older elements) the
 * application history until it finds the first entry. This entry can be the
 * undefined value.
 * 
 * @param {String}
 *            key The key to look for
 * @returns The object stored in the application history or undefined if not
 *          found or explicitly contains the undefined value
 */
Model.prototype.get = function(key) {
	for ( var i = this.history.getChildren().length - 1; i >= 0; i--) {
		var res = this.history.getChildren()[i].get(key);
		if (res != undefined) {
			return res;
		}
	}
	return undefined;
}

/**
 * Sets/updates an entry into the latest application state to keep track of the
 * changes. The entry is made in the newest application state only.
 * 
 * @param key
 *            The key to set/update the value for
 * @param value
 *            The value to store, the undefined value is allowed
 * @throws An
 *             error if the key is not a valid identifier.
 */
Model.prototype.put = function(key, value) {
	this.history.put(key, value);
}

/**
 * Returns the history of this model instance.
 */
Model.prototype.getHistory = function() {

 //NSRD00085286---strict browser fails on undefined variables
 if (this.history != undefined){
	return this.history;
	} 
	return null;
}

/**
 * Returns the current application state.
 * 
 * @returns {ApplicationState} The current application state.
 */
Model.prototype.getCurrentState = function() {

//NSRD00085286---strict browser fails on undefined variables
 if (this.history != undefined){
	return this.history.getCurrentState();
	} 
	return null;
}

/**
 * Returns the previous filled application state, i.e the one closed with the
 * last invocation of <tt>changedState(String)</tt>.
 * 
 * @returns {ApplicationState} The previous application state, may be undefined.
 */
Model.prototype.getPreviousState = function() {

//NSRD00085286---strict browser fails on undefined variables
 if (this.history != undefined){
	return this.history.getPreviousState();
	}
	return null;
 }

/**
 * Returns the previous filled application state, i.e the one closed with the
 * last invocation of <tt>changedState(String)</tt>.
 * 
 * @param key
 *            The key to return the value for
 * @returns The slot value from the last recognition result or undefined if
 *          there is no such value
 */
Model.prototype.getLastReturnValue = function(key) {

//NSRD00085286---strict browser fails on undefined variables
 if (this.history != undefined){
	return this.history.getLastReturnValue(key);
	}
	return null;
}

/**
 * Adds all counter values from property values of the provided counters object
 * to the current state. This methods supports the counters: <tt>nomatches</tt>,
 * <tt>noinputs</tt>, <tt>confirms</tt>, <tt>helps</tt>, <tt>turns</tt>,
 * <tt>repeats</tt>, and <tt>invalidanswers</tt>. For each X in this list
 * this methods calls the corresponding setter method, e.g. for nomatch the
 * function setNomatchCount(value.nomatches) is invoked.
 * 
 * @param counters
 *            An ECMAScript object containing zero or more properties
 */
Model.prototype.addCounters = function(counters) {
	this.history.addCounters(counters);
}

/**
 * Returns an object with the counter values. This methods supports the
 * counters: <tt>nomatches</tt>, <tt>noinputs</tt>, <tt>notoconfirms</tt>,
 * <tt>helps</tt>, <tt>turns</tt>, <tt>repeats</tt>, and
 * <tt>invalidanswers</tt>.
 */
Model.prototype.getCounters = function() {

//NSRD00085286---strict browser fails on undefined variables
if (this.history != undefined){
	return this.history.getCounters();
	} 
	return null;
}

/**
 * Sets the <tt>help</tt> counter value by invoking
 * <tt>put(&apos;helps&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
Model.prototype.setHelpCount = function(value) {
	this.history.setHelpCount(value);
}

/**
 * Sets the <tt>nomatch</tt> counter value by invoking
 * <tt>put(&apos;nomatches&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
Model.prototype.setNomatchCount = function(value) {
	this.history.setNomatchCount(value);
}

/**
 * Sets the <tt>noinput</tt> counter value by invoking
 * <tt>put(&apos;noinputs&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
Model.prototype.setNoinputCount = function(value) {
	this.history.setNoinputCount(value);
}

/**
 * Sets the <tt>helps</tt> counter value by invoking
 * <tt>put(&apos;helps&apos;, value)</tt>
 * 
 * @param value
 *            A number value Model.prototype.setHelpCount = function(value) {
 *            this.history.setHelpCount(value); }
 * 
 * /** Sets the <tt>turn</tt> counter value by invoking
 * <tt>put(&apos;turns&apos;, value)</tt>
 * @param value
 *            A number value
 */
Model.prototype.setTurnCount = function(value) {
	this.history.setTurnCount(value);
}

/**
 * Sets the <tt>repeats</tt> counter value by invoking
 * <tt>put(&apos;repeats&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
Model.prototype.setRepeatCount = function(value) {
	this.history.setRepeatCount(value);
}

/**
 * Sets the <tt>notoconfirm</tt> counter value by invoking
 * <tt>put(&apos;notoconfirms&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
Model.prototype.setNotoconfirmCount = function(value) {
	this.history.setNotoconfirmCount(value);
}

/**
 * Sets the <tt>invalidanswers</tt> counter value by invoking
 * <tt>put(&apos;invalidanswers&apos;, value)</tt>
 * 
 * @param value
 *            A number value
 */
Model.prototype.setInvalidanswerCount = function(value) {
	this.history.setInvalidanswerCount(value);
}

/**
 * Gets the <tt>nomatch</tt> counter from the application history by invoking
 * <tt>get(&apos;nomatches&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
Model.prototype.getNomatchCount = function() {

//NSRD00085286---strict browser fails on undefined variables
if (this.history != undefined){
	return this.history.getNomatchCount();
	}
	return null;
}

/**
 * Gets the <tt>noinput</tt> counter from the application history by invoking
 * <tt>get(&apos;noinputs&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
Model.prototype.getNoinputCount = function() {

//NSRD00085286---strict browser fails on undefined variables
if (this.history != undefined){
	return this.history.getNoinputCount();
	}
	return null;
}

/**
 * Gets the <tt>help</tt> counter from the application history by invoking
 * <tt>get(&apos;helps&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
Model.prototype.getHelpCount = function() {

//NSRD00085286---strict browser fails on undefined variables
if (this.history != undefined){
	return this.history.getHelpCount();
	}
	return null;
}

/**
 * Gets the <tt>turn</tt> counter from the application history by invoking
 * <tt>get(&apos;turns&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
Model.prototype.getTurnCount = function() {

//NSRD00085286---strict browser fails on undefined variables
if (this.history != undefined){
	return this.history.getTurnCount();
	}
	return null;
}

/**
 * Gets the <tt>repeat</tt> counter from the application history by invoking
 * <tt>get(&apos;repeats&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
Model.prototype.getRepeatCount = function() {

//NSRD00085286---strict browser fails on undefined variables
if (this.history != undefined){
	return this.history.getRepeatCount();
	}
	return null;
}

/**
 * Gets the <tt>notoconfirm</tt> counter from the application history by
 * invoking <tt>get(&apos;notoconfirms&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
Model.prototype.getNotoconfirmCount = function() {

//NSRD00085286---strict browser fails on undefined variables
if (this.history != undefined){
	return this.history.getNotoconfirmCount();
	}
	return null;
}

/**
 * Gets the <tt>invalidanswers</tt> counter from the application history by
 * invoking <tt>get(&apos;invalidanswers&apos;)</tt>
 * 
 * @returns The counter as stored in the model
 */
Model.prototype.getInvalidanswerCount = function() {

//NSRD00085286---strict browser fails on undefined variables
if (this.history != undefined){
	return this.history.getInvalidanswerCount();
	}
	return null;
}

/**
 * Returns the sum of nomatches and noinputs which are both considered to be
 * errors.
 * 
 * @returns {Number} The sum of the counters that are considered to signal
 *          errors.
 */
Model.prototype.getErrorCount = function() {
	return this.getNomatchCount() + this.getNoinputCount();
}

/**
 * Returns the recognitions done so far.
 * 
 * @returns An array of all recognitions done so far with the oldest recognition
 *          first and the latest last.
 */
Model.prototype.getRecognitions = function() {

//NSRD00085286---strict browser fails on undefined variables
if (this.history != undefined){
	return this.history.getRecognitions();
	}
	return null;
}

/**
 * Adds the provided recognition result by calling
 * <tt>addNbestResult(result, result.length)</tt>
 * 
 * @param result
 *            The application.lastresult$ array maintained by the VoiceXML
 *            interpreter
 */
Model.prototype.addRecognitionResult = function(result) {
	this.history.addRecognitionResult(result);
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
Model.prototype.addNbestResult = function(result, nbest) {
	this.history.addNbestResult(result, nbest);

}

/**
 * Appends the provided data to the calllog property.
 * 
 * @param {String}
 *            data The string to append to the calllog container
 */
Model.prototype.appendCalllog = function(data) {
	if (data != undefined && data != '') {
		this.calllog += data;
		this.calllog += (/\n$/.test(data) ? '' : '\n');
	}
}

/**
 * Returns the calllog container
 * 
 * @returns The call log data object. This is a string containing log events
 *          separated by newline characters &apos;\n&apos;.
 */
Model.prototype.getCalllog = function() {
	return this._calllog + this.calllog;
}

/**
 * Packs the model changes (since the last call to one of the pack methods) into
 * an XML string. This method cares about the properties whose names are in the
 * items array and adds all other properties from the model in addition. Some
 * ECMAScript examples:<br>
 * <b>Call: </b><tt>model.pack([&apos;calllog&apos;]);</tt><br/> <b>Result:
 * </b> <tt>&lt;model&gt;&lt;calllog&gt...&lt;/calllog&gt;&lt;/model&gt;</tt><br/>
 * <b>Call: </b><tt>model.pack([&apos;calllog&apos;, &apos;history&apos;]);</tt>
 * <br/> <b>Result:</b> <tt>&lt;model&gt;&lt;calllog&gt;...&lt;/callog&gt;
 * &lt;history&gt;...&lt;/history&gt;&lt;/model&gt;</tt><br/>
 * <b>Call: </b><tt>model.pack();</tt><br/> <b>Result:</b>
 * <tt>&lt;model&gt;&lt;calllog&gt;...&lt;/callog&gt;
 * &lt;callheader&gt;...&lt;/callheader&gt; &lt;history&gt;...&lt;/history&gt;
 * &lt;appdata&gt;...&lt;/appdata&gt;&lt;/model&gt;</tt>
 * 
 * @param items
 *            An array containing names of the properties to pack. I.e this
 *            array can contain the strings &apos;calllog&apos;,
 *            &apos;callheader&apos;, &apos;appdata&apos;, and
 *            &apos;history&apos;.
 * @returns {String} The model update data as XML string.
 */
Model.prototype.pack = function(items) {
	var containsValue = function(array, value) {
		if (array != undefined) {
			for ( var i = 0; i < array.length; i++) {
				if (array[i] === value) {
					return true;
				}
			}
		}
		return false;
	}
	var getArrayLengthString = function(obj) {
		return (obj instanceof Array
				? ' arrayLength=\"' + obj.length + '\"'
				: '')
	}
	// confidence, inputmode, interpretation and utterance are not
	// available as properties of application.lastresult$[i] for each
	// platform. Additionally not each application.lastresult$ object
	// is a real ECMAScript array. Although we add single results and
	// not the whole object this implementation will remain for now.
	var recognitions2XML = function(obj) {
		var propertyList = ['inputmode', 'utterance', 'confidence',
				'interpretation'];
		var xml = '';
		xml += '<recognitions arrayLength=\"' + 
			obj.recognitions.length + '\">';
		for ( var i = 0; i < obj.recognitions.length; i++) {
			xml += '<_' + i + ' arrayLength=\"' + obj.recognitions[i].length
					+ '\">';
			for ( var j = 0; j < obj.recognitions[i].length; j++) {
				xml += '<_' + j + '>';
				var recognition = obj.recognitions[i][j];
				xml += '<inputmode>' 
					+ recognition.inputmode 
					+ '</inputmode>';
				xml += '<utterance>' 
					+ recognition.utterance 
					+ '</utterance>';
				xml += '<confidence>' 
					+ recognition.confidence 
					+ '</confidence>';
				xml += object2XML(recognition.interpretation, 
						'interpretation');
				for ( var prop in recognition) {
					if (!containsValue(propertyList, prop) && isNaN(prop)
							&& !/\$$/.test(prop)) {
						xml += object2XML(recognition[prop], prop);
					}
				}
				xml += '</_' + j + '>';
			}
			xml += '</_' + i + '>';
		}
		xml += '</recognitions>';
		return xml;
	}
	var object2XML = function(obj, name) {
		var checkedname = isNaN(name) ? name : '_' + name;
		if(! /^[a-z_][\w]*$/i.test(checkedname)){
			return '';
		}
		var xml = '<' + checkedname;
		xml += getArrayLengthString(obj);
		xml += '>';

		if (obj instanceof Array || typeof(obj) == 'array') {
			for ( var i = 0; i < obj.length; i++) {
				xml += object2XML(obj[i], i);
			}
			for ( var prop in obj) {
				if (isNaN(prop)) {
					xml += object2XML(obj[prop], prop);
				}
			}
		} else if (obj instanceof Object || typeof(obj) == 'object') {
			if (obj._type == 'ApplicationState' || obj._type == 'DMResultComponent') {
				xml += recognitions2XML(obj);
			}
			for ( var prop in obj) {
				if (obj[prop] != undefined 
						&& prop != 'prototype'
						// are handled separately
						&& !(obj._type == 'ApplicationState' && prop == 'recognitions')
						&& !(obj._type == 'DMResultComponent' && prop == 'recognitions')
						// transient properties are available so use them
						&& !(obj._transientProperties != undefined && containsValue(
								obj._transientProperties, prop))
						&& !(obj[prop] instanceof Function || typeof(obj[prop]) == 'function')) {
					xml += object2XML(obj[prop], prop);
				}
			}
		} else {
			var added = false;
			if(typeof(obj)=='string'){
				if(obj.indexOf('<')> -1){
					xml += '<![CDATA[' + encodeURIComponent(obj) + ']]>';
					added = true;
				}
			}
			if(!added){
				xml += encodeURIComponent(String(obj)); // may be 'undefined'
			}
		}
		xml += '</' + checkedname + '>';
		return xml;
	}
	var result = '<model>';
	if (items == undefined || containsValue(items, 'calllog')) {
		result += '<calllog><![CDATA[' + this.calllog + ']]></calllog>';
		this._calllog += this.calllog;
		this.calllog = '';
	}
	if (items == undefined || containsValue(items, 'history')) {
		result += object2XML(this.getHistory(), 'history');
	}
	if (items == undefined || containsValue(items, 'appdata')) {
		result += object2XML(this.getAppdata(), 'appdata');
	}
	result += '</model>';
	return result;
}

/**
 * Retrieves the set application data storage map for this model instance. The
 * data is transported from client to server. Keys used to store data in this
 * map need to be valid identifiers, i.e. consist of letters, numbers, and the
 * underscore where only the underscore or a letter may start the key.
 * 
 * @returns The (synchronized) appdata map storing the application data.
 * @throws An
 *             ECMAScript Error when the key os not a valid identifier
 */
Model.prototype.getAppdata = function() {

//NSRD00085286---strict browser fails on undefined variables
if (this.appdata != undefined){
	return this.appdata;
	} else {
	return null;
	}
	
	
}

/**
 * Retrieves the set application data storage map for this model instance. The
 * data stored in this map is visible in the current call only but it is not
 * transported from client to server.
 * 
 * @returns The unsynchronized appdata map storing the application data.
 */
Model.prototype.getAppdataUnsynchronized = function() {

//NSRD00085286---strict browser fails on undefined variables
if (this.appdataUnsynchronized != undefined){
	return this.appdataUnsynchronized;
	} 
	return null;
}

/**
 * Updates the model from the provided model update string (mud).
 * 
 * @param mud
 *            The model update data. This is a string containing the data and
 *            structure of the model contents from the client side
 * @throws An
 *             ECMAScript Error if parsing the model update data fails
 */
Model.prototype.update = function(mud) {
	var mudObject = eval(mud);

	if (mudObject.calllog) {
		this.appendCalllog(mudObject.calllog);
	}
	if (mudObject.appdata) {
		this.appdata = mudObject.appdata;
	}
}

/**
 * @class The ModelFactory exists to create instance of the Model interface thus
 *        hiding implementation from the creation process.
 */
function ModelFactory() {

}

/**
 * Creates a new model instance
 * 
 * @returns An instance of the {@link Model} type
 */
ModelFactory.prototype.createModel = function() {
	var model = new Model();
	return model;
}

/**
 * Sets the Boolean value that indicates whether this state is an anchor or not
 * 
 * @param value
 *            {Boolean} A Boolean anchor flag
 */
Model.prototype.setAnchor = function(value) {

}

/**
 * Checks recursively if there is a child of the application history that is an
 * anchor state. First findAnchor() is called on this state and if the result is
 * negative it is called on children that are complex application states.
 * 
 * @returns {Boolean} A Boolean value that indicates if there is a child
 *          application state within this one that is an anchor or not.
 */
Model.prototype.containsAnchor = function() {

}

/**
 * This function asserts that the model and state prototype properties are 
 * available when the corresponding _type property is set. They are added 
 * in case that they have been stripped when being transported among pages 
 * what is done on some platforms. 
 * The initial check is only performed on the top level element assuming 
 * that the prototype properties could also be preserved for the contained 
 * objects if they are available for the top level object.
 * @param obj The object to be checked.
 */
function assertPrototypes(obj) {
	var mixin = function(target, source) {
		for (var p in source) {
			if(!target[p]){
				target[p] = source[p];
			}
		}
	}
	var process = function (obj) {
		try {
			//model
			if(obj._type == 'Model'){
				mixin(obj, Model.prototype);
				process(obj.history);
			}
			//simple states
			else if (obj._type == 'ApplicationState') {
				mixin(obj, ApplicationState.prototype);
			} 
			else if (obj._type == 'DMResultComponent') {
				mixin(obj, DMResultComponent.prototype);
			}
			//complex states
			else if (obj._type == 'ComplexApplicationState') {
				mixin(obj, ComplexApplicationState.prototype);
			} 
			else if (obj._type == 'DMResult') {
				mixin(obj, DMResult.prototype);
			}
			//true for CAS & DMResult
			if (obj.children != undefined) {
				for (var i = 0; i < obj.children.length; i++) {
					process(obj.children[i]);
				}
			}
		} catch (ex) {
			throw new Error('Tried to mixin properties and functions for the type ' 
					+ obj._type 
					+ ' but could not find the corresponding prototype. '
					+ 'Please assert that the defining ECMAScript file is in the scope.');
		}
	}
	if (!(obj instanceof ApplicationState || 
			obj instanceof Model || obj._prototypeFlag)) {
		if (/^\w*applicationstate|dmresult\w*|model$/i
				.test(obj._type)) {
			process(obj);
		}
	} 
}
