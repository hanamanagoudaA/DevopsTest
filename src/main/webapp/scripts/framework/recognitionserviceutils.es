var recoOutput = {'name':'','jsonString':''};
function startRecognitionService(appId,recoOutput,calltracking){
	//NSRD00085286---strict browser fails on undefined variables
	if (appId != undefined) {
	recoOutput.name = appId;
	}
	appstepID++;
	if(calltracking==true){
	    logApps(appsessionID, appstepID);
	}
	return '';
}
function getJsonOutput(recoOutput,result){
	
	//NSRD00085286---strict browser fails on undefined variables
	if (result != undefined) {	
	recoOutput.jsonString = getJSON(result);
	}
		
	return '';
}
function getJSON(_obj){

	if(typeof _obj == 'undefined') return '\'\'';
	var _json = '';	var itr = 1; 
	if(_obj instanceof Array){	
		_json = '[';
		for(var keys in _obj){
			//NSRD00088549
			if(typeof _obj[keys] != 'function') {
				if(itr++>1) _json += ',';
				_json += getJSON(_obj[keys]);
			}
		}
		_json += ']';
	}else if(typeof _obj == 'object'){
		_json = '{';
		for (var keys in _obj){
			//NSRD00088549
			if(typeof _obj[keys] != 'function') {
				if(itr++>1) _json += ',';
				_json += '\'' + keys + '\':' + getJSON(_obj[keys]);
			}
		}
		_json += '}';
	}else{
		if(typeof _obj == 'string') _obj = _obj.replace(/'/g,'\\\'');
		
		_json += '\'' + _obj + '\'';
	}
	return _json;
}
