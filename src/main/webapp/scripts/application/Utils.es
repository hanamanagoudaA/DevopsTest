/*
 * Utility functions used in the App
 *
 */

/*
 * This Function will be used to extract the drugName from the drugPrompt and drugTTS returned as part of Refill Prescription List
 * The reason why this function was needed is because the backend can retunr the drug name in drugPrompt if the prompt corresponding
 * to the drug exist in the prompt/drugNames folder
 * 
 *
 */
function extractDrugName(drugPrompt, drugTTS) {
	var drugName = '';
	if(drugPrompt != null && drugPrompt != '' ) {   
		drugName = drugPrompt;
      	return drugName;
    } else 	 {
    	var drugTTSSplit = drugTTS.split(/\s*[\s,]\s*/);
    	if(drugTTSSplit.length > 0)  {
    	  drugName = drugTTSSplit[0];
		  return drugName;
		}
    } 
    return drugName;
}