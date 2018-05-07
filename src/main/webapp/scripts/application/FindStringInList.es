function findTextInList(strList, strToFind) {
	if(strList != null)
    {   	
    	var strFound = false;	    
    	var strListLen = strList.length;
        if(strListLen > 0)
        {
          	for(var i=0; strListLen > i; i++)
           	{
               	if(strList[i] == strToFind)
               	{
               		strFound = true;
               	}
           	}                       
       	}
      	return strFound;
     }	  
}