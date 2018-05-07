function trackError(stateID, errorID) {
    var trackingData = "E(" + errorID + ")";
    appendCallTrackingData(stateID, trackingData);
}

function trackErrorAndMessage(stateID, errorID, message) {
    var trackingData = "E(" + errorID + ":" + message + ")";
    appendCallTrackingData(stateID, trackingData);
}

function trackErrorNoStateID(errorID) {
    var trackingData = "E(" + errorID + ")";
    appendCallTrackingData(modelData.callTrackingStateID, trackingData);
}

function trackErrorAndMessageNoStateID(errorID, message) {
    var trackingData = "E(" + errorID + ":" + message + ")";
    appendCallTrackingData(modelData.callTrackingStateID, trackingData);
}