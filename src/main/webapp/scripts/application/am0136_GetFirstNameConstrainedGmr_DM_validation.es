function validateReturnValue(collection, args) {
 var confidence = collection.confidence;
 if (confidence >= 0.400) {
  return true;
 } else {
  return false;
 }
}