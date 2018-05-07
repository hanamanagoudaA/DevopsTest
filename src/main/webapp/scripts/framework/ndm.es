function hndlGLCatch(glDM,_event, _msg) {
	glDM.err = _event;
	if(_event.toLowerCase().indexOf('badfetch') == -1) glDM.msg = _msg; else glDM.msg = '';
	if(glDM.evt == 'error'){ glDM.hndl=false; return glDM.curDM + '_exitError';} return glDM.curDM + '_dataBlk';
}
var glDM = {'curDM':'','err':'','msg':'','hndl':true,'evt':'','dms':new Array()};
var dtmfAllowMap;			
function NDMVar(glDM, dmID, stFul) {
	glDM.curDM = dmID;
	glDM.hndl = true;
	dtmfAllowMap = new Array();
	var dm;
	if(stFul){ dm={'stVar':{'n':dmID,'e':'init','st':'','err':'','errM':'','lgTm':getLogTime(),'ambR':'','astid':'0','disL':''},
	 			'clReco':{},'cnfReco':{},'mstL':[],'svdl':[],'cvdl':[],'cddl':[],'sddl':[],'smc':0,'isEnableDisallow':false,
	 			'ddl':{'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'*':'*'},'rcrdaudio':{},
	 			'stFul':stFul,'calllog':'','prompt':'','nbestresults':'','confInitPrompt':'','output':{},'iprets':{}};
		return dm;
	}else{ dm={'stVar':{'n':dmID,'e':'init','st':'','err':'','errM':'','iAnsC':0,'n2cnfC':0,'asnid':'','astid':'0','clsT':'',
                  'cl':{'nI':0,'nM':0,'hC':0,'rC':0,'tC':1,'iM':'','r':'','cnfi':0.0,'cmd':'false'},
                  'cnf':{'nI':0,'nM':0,'hC':0,'rC':0,'tC':0,'iM':'','r':'','cnfi':0.0},
                  'rSt':'U','s1St':'U','s2St':'U','phn':'','mstL':[],'mslt':'false','lstEvt':'','dmInv':'false','cfEC':0,'lgTm':getLogTime(),'ambR':'','astid':'0','disL':''},
                  'clReco':{},'cnfReco':{},'rcrdaudio':{},
                  'stFul':stFul,'calllog':'','prompt':'','nbestresults':'','confInitPrompt':'','output':{},
                  'svdl':[],'cvdl':[],'cddl':[],'sddl':[],'smc':0,'isEnableDisallow':false,
	 			'ddl':{'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'*':'*'},'iprets':{}};
    for(var i = 0; i < glDM.dms.length; i++)
	{
		if(glDM.dms[i]== dmID)
		{
			dm.stVar.dmInv = 'true';
		}		
	}
	if(dm.stVar.dmInv == 'false')
	{
		glDM.dms.push(dmID);
	}	
	   return dm;
	}
}
function catchEvent(dm, cntx, evt, msg){
dm.stVar.e='e'; dm.stVar.st=cntx; dm.stVar.errM=msg; dm.stVar.err=evt;
if(typeof(lastresult$) != 'undefined' && lastresult$ != null)
{
         if(cntx == 'col'){
             dm.clReco=lastresult$;
         }else if(cntx == 'conf'){
	     dm.cnfReco = lastresult$;
	 }
}
}



function checkForError(dm, glDM){
		if(glDM.err != '' && glDM.curDM == dm.stVar.n){
			catchEvent(dm,'',glDM.err, glDM.msg);
			glDM.evt = 'error';	glDM.err = '';
		}
}
function exitError(dm, glDM){ dm.output = {'eventLogs':dm.calllog,'appstepID':dm.astid,'error':glDM.err,'errorMessage':glDM.msg};}
function addReco(dm, cntx, app, dmtype){
	dm.stVar.st = cntx;
	dm.stVar.e = 'reco';

	if(cntx == 'col'){
		if(dm.stFul) dm.clReco = getRecoFromList(dm,dm.samemistake,dm.mstL,app);
		else dm.clReco = getRecoFromList(dm,dm.samemistake,dm.stVar.mstL,app);
		
		if(dm.clReco == '') return false;
		dm.nbestresults = app.lastresult$;
		if(!dm.stFul){ dm.stVar.cl.cmd = 'false';}
		dm.confInitPrompt = '';
	}else if(cntx == 'conf'){
		dm.cnfReco = app.lastresult$[0];
	}
        if((dm.stVar.n=='spelling') ||(dm.stVar.n=='email') ||(dmtype=='SPEL') ||(dmtype=='EMAIL')){
		var iprets = new Object();
		iprets.interpretations=new Array();
		iprets.confidences=new Array();
		for(var j = 0; j < app.lastresult$.length; j++){
		    iprets.interpretations[j] = app.lastresult$[j].interpretation;
		    iprets.confidences[j]=app.lastresult$[j].confidence;
		}
		dm.iprets=iprets;
  	}
	return true;
}
function addRecord(dm, cntx, audio){
	dm.stVar.st = cntx;
	dm.stVar.e = 'record';
	dm.rcrdaudio =audio;
}
function getReco(dm){
	if(dm.stVar.e == 'reco'){if(dm.stVar.st == 'col'){return dm.clReco;}else if(dm.stVar.st == 'conf'){
			return dm.cnfReco;}} return '';
}
function getRecoJson(dm){
	
	
		
	var r = new Object();
		if(dm.stVar.st == 'col'){r = dm.clReco; }else if(dm.stVar.st == 'conf'){r = dm.cnfReco;}
		 var rec = {'inputmode':r.inputmode,'utterance':r.utterance,'confidence':r.confidence,'interpretation':r.interpretation};
		 return getJSON(rec);
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

 function addToDtmfMap(dm,value,dtmf)
{ 
 if ( dtmf == '?') {dm.smc++; dtmfAllowMap[dm.smc] = value ; delete dm.ddl[dm.smc];}
 else { dtmfAllowMap[dtmf] = value; delete dm.ddl[dtmf];} 
}
function getMappedDtmfValue (dmrv){
    var rv = dtmfAllowMap[dmrv];
    delete dtmfAllowMap; return rv;
}
function addDisallowValue(dm,type,val)
{
    if(type == 'svd'){dm.svdl.push(val);}
    if(type == 'cvd'){dm.cvdl.push(val);}
    if(type == 'sdd'){dm.sddl.push(val);}
    if(type == 'cdd'){dm.cddl.push(val);}   
}
function getDisallowString(dm,type){
    var ret = '';
    var disallowlist = new Array();
    if(type == 'ss'){disallowlist= dm.svdl;}
    if(type == 'cmd'){disallowlist=dm.cvdl;}
    if(type == 'ssd')
     {if (dm.isEnableDisallow){disallowlist = dm.ddl;}
      else{disallowlist = dm.sddl;}}    
    if(type == 'cmdd'){disallowlist = dm.cddl;}      
    for(var i in disallowlist)
    {
	if(i==0){	
		if(typeof disallowlist[i] != 'function') { 
			ret = ret + disallowlist[i];
		}
	}
        else {
		if(typeof disallowlist[i] != 'function') { 
			ret = ret + '^' + disallowlist[i];
		}
	}
    }
     
     dm.stVar.disL=ret;   
    return ret;
}
function getRecoFromList(dm, samemistake, mistakelist, app){
	var intIndex = 0;
	if(!(!samemistake || mistakelist.length == 0 || typeof(app.lastresult$[0].dm_command) != 'undefined')){
	    var val = "";
    	var valid = true;     
	for( var count = app.lastresult$.length - 1 ; count >= 0 ; count-- ){

	        var loopvalue = app.lastresult$[count].interpretation;
	        valid = true;
	        if ( typeof loopvalue == 'object' )     
	            if( typeof(loopvalue.MEANING) != 'undefined' && loopvalue.MEANING != null )
	                val = loopvalue.MEANING;
	            else if( typeof(loopvalue.dm_root) != 'undefined' && loopvalue.dm_root != null )
	                val = loopvalue.dm_root;
	            else
	                val = loopvalue.dm_command
	        else
	            val = loopvalue;
	
	        for( var i = 0 ; i < mistakelist.length; i++ ){ 
	            if( val == mistakelist[i] ){ 
	                valid = false;
	                break;
	            }
	        }
	        if(valid) 
	           intIndex = count;
	    }
	}
	if(!dm.returnambiguousresults || app.lastresult$[0].utterance.indexOf('#') != -1) return app.lastresult$[intIndex];
	else{
		if(intIndex == app.lastresult$.length -1) return app.lastresult$[intIndex];
		else{
			dm.stVar.ambR = {'dmR':'','dmC':'','dmM':''};		
			for (var nbestId = intIndex + 1; nbestId < app.lastresult$.length; nbestId++){ 
				if (typeof(app.lastresult$[nbestId]) == 'undefined') continue;
				else{
					if (app.lastresult$[intIndex].inputmode == app.lastresult$[nbestId].inputmode && 
						app.lastresult$[intIndex].confidence == app.lastresult$[nbestId].confidence && 
						app.lastresult$[intIndex].utterance == app.lastresult$[nbestId].utterance){
							if(typeof  app.lastresult$[nbestId].interpretation != 'object'){
								dm.stVar.ambR.dmR += '#' + app.lastresult$[nbestId].interpretation;					
								dm.stVar.ambR.dmC += '#';
								dm.stVar.ambR.dmM += '#';																
							}else{
								var valObj = app.lastresult$[nbestId].interpretation;
								if (typeof valObj.dm_command != 'undefined' && valObj.dm_command != null) 
									dm.stVar.ambR.dmC += '#' + valObj.dm_command;									
								else dm.stVar.ambR.dmC += '#';
								if (typeof valObj.dm_root != 'undefined' && valObj.dm_root != null) 
									dm.stVar.ambR.dmR += '#' + valObj.dm_root;									
								else dm.stVar.ambR.dmR += '#';
								if (typeof valObj.MEANING != 'undefined' && valObj.MEANING != null) 
									dm.stVar.ambR.dmM += '#' + valObj.MEANING;									
								else dm.stVar.ambR.dmM += '#';
							}
					}
				}
			}
		}
	}
    return app.lastresult$[intIndex];
}
function getLogTime(){
	var date = new Date();
    var month = date.getMonth() + 1;
    var day   = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var ms = date.getMilliseconds();
    var time = String(date.getFullYear());
    time += ((month < 10) ? "0" + month : month);
    time += ((day < 10) ? "0" + day : day);
    time += ((h < 10) ? "0" + h : h);
    time += ((m < 10) ? "0" + m : m);
    time += ((s < 10) ? "0" + s : s);
    time += ((ms < 100) ? '0' : '');
    time += ((ms < 10) ? '0' + ms : ms);
	return time;
}
function encodeGrammarValue(str, prsntEncTrn){
    if(typeof str == 'undefined' || typeof str != 'string' || str == '') return str;
	if(str.match(/[^a-zA-Z0-9\^\\'-_;,.?+`~!@#$*()={}|:<>%\/ \t\n]/g)){
		var encodedStr = "";
		var ch = '';
		for (var i=0; i<str.length; i++) {
			ch = "" + str.charAt(i);
			if(ch.match(/[^a-zA-Z0-9\^\\'-_;,.?+`~!@#$*()={}|:<>%\/ \t\n]/g)){
				ch = encodeURIComponent(ch);
				for (var index=0; index<prsntEncTrn; index++) {
					ch = ch.replace(/%/g,encodeURIComponent('%'));				
				}
			}
			encodedStr += ch;
		}
		return encodedStr;
	}else{
		return str;
	}  
}



function setEnableDisallowlist(dm)
{
	dm.isEnableDisallow = true;
}

function checkAppstepID(dmprops, appstepID)
{
	var dmpropsstring = "";
	dmpropsstring= dmprops.substring(0, dmprops.length-1) + ",\'appstepID\': \'" + appstepID +"\'}"; 
	return dmpropsstring;
}