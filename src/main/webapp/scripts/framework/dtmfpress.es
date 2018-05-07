var dtmfPressCounter = 1;

function getPressPrompt(pressArgs){
	pressArgs.digitsString = dtmfPressCounter + '';
	dtmfPressCounter++;
	return CPRDigitsAudioService(pressArgs);
}