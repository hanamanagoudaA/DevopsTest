
function Model(){this.history=new ComplexApplicationState();this.calllog='';this._calllog='';this.appdata=new Object();this.appdataUnsynchronized=new Object();this._type='Model';}
Model.prototype.changedState=function(name){this.history.changedState(name);}
Model.prototype.addState=function(state){this.history.addChild(state);}
Model.prototype.removeState=function(){this.history.removeChild();}
Model.prototype.get=function(key){for(var i=this.history.getChildren().length-1;i>=0;i--){var res=this.history.getChildren()[i].get(key);if(res!=undefined){return res;}}
return undefined;}
Model.prototype.put=function(key,value){this.history.put(key,value);}

Model.prototype.getHistory=function(){

//NSRD00085286---strict browser fails on undefined variables
 if (this.history != undefined){
	return this.history;
 }
	return null;
 }

Model.prototype.getCurrentState=function(){ 

//NSRD00085286---strict browser fails on undefined variables
 if (this.history != undefined){
	return this.history.getCurrentState();
 }
 return null;
 }

Model.prototype.getPreviousState=function() {

//NSRD00085286---strict browser fails on undefined variables
 if (this.history != undefined){
	return this.history.getPreviousState();
 } 
 return null;
 }

Model.prototype.getRecognitions=function(){

//NSRD00085286---strict browser fails on undefined variables
 if (this.history != undefined){
	return this.history.getRecognitions();
 } 
 return null;
}

Model.prototype.addRecognitionResult=function(result){this.history.addRecognitionResult(result);}
Model.prototype.appendCalllog=function(data){if(data!=undefined&&data!=''){this.calllog+=data;this.calllog+=(/\n$/.test(data)?'':'\n');}}
Model.prototype.getCalllog=function(){return this._calllog+this.calllog;}
Model.prototype.pack=function(items){var containsValue=function(array,value){if(array!=undefined){for(var i=0;i<array.length;i++){if(array[i]===value){return true;}}}
return false;}
var result='<model>';if(items==undefined||containsValue(items,'calllog')){result+='<calllog><![CDATA['+this.calllog+']]></calllog>';this.calllog='';}
result+='</model>';return result;}

Model.prototype.getAppdata=function(){

//NSRD00085286---strict browser fails on undefined variables
 if (this.appdata != undefined){
	return this.appdata;
 }
 return null;
 }

Model.prototype.getAppdataUnsynchronized=function(){

//NSRD00085286---strict browser fails on undefined variables
 if (this.appdataUnsynchronized != undefined){
	return this.appdataUnsynchronized;
 }
 return null;
}

Model.prototype.update=function(mud){var mudObject=eval(mud);if(mudObject.calllog){this.appendCalllog(mudObject.calllog);}
if(mudObject.appdata){this.appdata=mudObject.appdata;}}
function ModelFactory(){}
ModelFactory.prototype.createModel=function(){var model=new Model();return model;}