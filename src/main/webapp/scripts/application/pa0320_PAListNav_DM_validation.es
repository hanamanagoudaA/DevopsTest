function validateReturnValue(collection, args)   {

    // Getting needed input parameters values to validate returnvalue
    var value       = "";
    var onFirstPA = args.onFirstPA;
    var onLastPA  = args.onLastPA;
	   
    // Getting the MEANING key if it is an object
    if (typeof collection.value == 'object')
    {
      if (typeof(collection.value.MEANING) != 'undefined' && collection.value.MEANING != null)
      {
        value = collection.value.MEANING;
      }
      else
      {
        value = collection.value.dm_root;
      }
    }
    else
    {
      value = collection.value;
    }
	
	if(value == 'next'){
		if(onLastPA == 'true') {
			return false; 
	    }
		else {
			return true;
		} 
	  }
	else if(value == 'previous'){
	  if(onFirstPA == 'true') {
			return false; 
	  }
	  else {
			return true;
	  } 
	}
	else{
		return true;
	 }	
}