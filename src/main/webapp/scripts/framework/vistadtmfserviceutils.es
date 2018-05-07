
/*------------------Start Dialog Call Tracking Functions------------------*/

    /* Builds data for call tracking at the start of the generation for a dynamic DTMF menu state.
    */  
    function startDynamicDtmfState(dialogID)
    {
        var trackingData = 'DS(' + dialogID + ')';
        appendCallTrackingData(dialogID, trackingData);
        return true;
    }
  
    /* Builds data for call tracking upon entry into a DTMF state.
    */  
    function startDtmfState(dialogID, grammarList)
    {
        var trackingData;
        if (grammarList == undefined) {
            trackingData = 'S';
        }
        else { 
            trackingData = 'S(' + grammarList.join(',') + ')'; 
        }
        appendCallTrackingData(dialogID, trackingData);
        return true;
    }
  
    /* Builds data for call tracking for when a dialog state recognizes a user utterance.
    */
    function startDtmfReco(dialogID, confidence, utterance, inputMode, interpretation)
    {
        var trackingData = 'R(' + confidence + ':' + utterance + ':' + inputMode + ':' + interpretation + ')';
        if(interpretation != '') {
            modelData.lastRecognition = interpretation;
        } else {
            modelData.lastRecognition = utterance;
        }
        
        appendCallTrackingData(dialogID, trackingData);
        
        // if the interpretation is banker, throw operator event
        if (interpretation=='banker') { 
            appendCallTrackingData(dialogID, 'MO');
        }
        
        return true;
    }

    /* Builds data for call tracking for a nomatch event.
    */  
    function startDtmfNomatch(dialogID)
    {
        appendCallTrackingData(dialogID, 'N');
        return true;
    }
  
    /* Builds data for call tracking for a noinput event.
    */  
    function startDtmfNoinput(dialogID)
    {
        appendCallTrackingData(dialogID, 'T');
        return true;
    }
  
    /* Builds data for call tracking for a max nomatch event.
    */  
    function endDtmfStateMaxNomatch(dialogID)
    {
        appendCallTrackingData(dialogID, 'ME');
        return true;
    }
  
    /* Builds data for call tracking for a max noinput event.
    */  
    function endDtmfStateMaxNoinput(dialogID)
    {
        appendCallTrackingData(dialogID, 'MT');
        return true;
    }
  
    /* Builds data for call tracking for a max retry event.
    */  
    function endDtmfStateMaxRetries(dialogID)
    {
        appendCallTrackingData(dialogID, 'MN');
        return true;
    }
    
    /* 
    */
    function endDynamicDtmfState(stateID, modelData) {
        appendPremadeCallTrackingString(modelData);
        return(true);
    }


/******************End Dialog Call Tracking Functions******************/
