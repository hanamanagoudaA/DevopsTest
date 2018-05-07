
function ApplicationState(){this.recognitions=new Array();this._type='ApplicationState';}
ApplicationState.prototype._prototypeFlag=true;ApplicationState.prototype._transientProperties=['_transientProperties'];ApplicationState.prototype.get=function(key){return this[key];}
ApplicationState.prototype.put=function(key,value){if(/^[a-z$_][\w$]*$/i.test(key)){this[key]=value;}else{throw new Error("The key "+key+" is not a valid identifier!");}}
ApplicationState.prototype.getName=function(){ 
//NSRD00086542---Reference error in Interactive Intelligence browser
	if (this.name == undefined) { 
        return null; 
    	}  
	return this.name;
}
ApplicationState.prototype.setName=function(name){if(typeof(name)=='string'){this.name=name;}}
ApplicationState.prototype.addRecognitionResult=function(result){if(result!=undefined){this.recognitions.push(result);}}

ApplicationState.prototype.getRecognitions=function(){

//NSRD00086542---Reference error in Interactive Intelligence browser
	if (this.recognitions == undefined) { 
        return null; 
   	} 
	return this.recognitions;
}

function ComplexApplicationState(){this.children=new Array();this.currentstate=undefined;this.previousstate=undefined;delete this.recognitions;this._type='ComplexApplicationState';}
ComplexApplicationState.prototype=new ApplicationState();

ComplexApplicationState.prototype.constructor=ComplexApplicationState;

ComplexApplicationState.prototype.getOrCreateCurrentState=function(){

	if (this.currentstate == undefined) {
		this.currentstate = new ApplicationState();
		this.children.push(this.currentstate);		
	}
	return this.currentstate;
	
}

ComplexApplicationState.prototype.get=function(key){var ret=undefined;for(var i=this.getChildren().length-1;i>=0;i--){var res=this.getChildren()[i].get(key);if(res!=undefined){ret=res;break;}}
return ret;}
ComplexApplicationState.prototype.getRecognitions=function(){var res=new Array();for(var i=0;i<this.getChildren().length;i++){var childRecognitions=this.getChildren()[i].getRecognitions();for(var j=0;j<childRecognitions.length;j++){res.push(childRecognitions[j]);}}
return res;}
ComplexApplicationState.prototype.addRecognitionResult=function(result){this.getOrCreateCurrentState().addRecognitionResult(result);}
ComplexApplicationState.prototype.put=function(key,value){if(/^[a-z$_][\w$]*$/i.test(key)){this.getOrCreateCurrentState()[key]=value;}else{throw new Error("The key "+key+" is not a valid identifier!");}}
ComplexApplicationState.prototype.getChildren=function(){return this.children;}
ComplexApplicationState.prototype.addChild=function(childState){if(childState===undefined){throw new Error('The new child state may not be null');}
if(/^\w*applicationstate|dmresult\w*$/i.test(childState._type)){this.children.push(childState);if(this.currentstate!=null){this.previousstate=this.currentstate;}
this.currentstate=childState;}
else{throw new Error('Only instances of the type ApplicationState can be '+'added as children.');}}
ComplexApplicationState.prototype.removeChild=function(){this.getChildren().pop();this.currentstate=undefined;this.previousstate=(this.getChildren().length>0?this.getChildren()[this.getChildren().length-1]:undefined);}
ComplexApplicationState.prototype.getCurrentState=function(){

//NSRD00085286---strict browser fails on undefined variables
	if (this.currentstate != undefined) {
		return this.currentstate;
	} 
	return null;

}
ComplexApplicationState.prototype.getPreviousState=function(){

//NSRD00085286---strict browser fails on undefined variables
	if (this.previousstate != undefined) {
	return this.previousstate;
	}
	return null;
}
ComplexApplicationState.prototype.changedState=function(name){this.getOrCreateCurrentState();this.previousstate=this.currentstate;this.currentstate.setName(name);this.currentstate=undefined;}