/*------------------Start Dialog Call Tracking Functions------------------*/

  /* Builds data for call tracking at the start of the generation for a dynamic menu.
   */  
  function startDynamicDtmfState(dialogID)
  {
    
    return true;
  }
  
  /* Builds data for call tracking upon entry into a dtmf dialog state.
   */  
  function startDtmfState(dialogID, grammarList)
  {
    
    return true;
  }
  
  /* Builds data for call tracking for when a dialog state recognizes a user utterance.
   */
  function startDtmfReco(dialogID, confidence, utterance, inputMode, interpretation)
  {
    
    return true;
  }

  /* Builds data for call tracking for a nomatch event.
   */  
  function startDtmfNomatch(dialogID)
  {
    
    return true;
  }
  
  /* Builds data for call tracking for a noinput event.
   */  
  function startDtmfNoinput(dialogID)
  {
    
    return true;
  }
  
  /* Builds data for call tracking for a max nomatch event.
   */  
  function endDtmfStateMaxNomatch(dialogID)
  {
    
    return true;
  }
  
  /* Builds data for call tracking for a max noinput event.
   */  
  function endDtmfStateMaxNoinput(dialogID)
  {
    
    return true;
  }
  
  /* Builds data for call tracking for a max retry event.
   */  
  function endDtmfStateMaxRetries(dialogID)
  {
    
    return true;
  }

  function endDynamicDtmfState(stateID, modelData) {
    
    return(true);
  }

/******************End Dialog Call Tracking Functions******************/
