
exports.processCmd = function(message) {
  var timeInMs = Date.now();
  var resp = "";
  var messageObj = JSON.parse(message);
  console.log(messageObj);
  console.log(messageObj.endpointId);
  console.log(messageObj.request.id);

  if (messageObj) {
    resp = {
      "type": "Acknowledge",
      "endpointId": messageObj.endpointId,
      "request": {
        "eventDate": timeInMs,
        "updateState": false,
        "response": "response from NodeJS",
        "originatingEventId": messageObj.request.id
      }
    }
  }

  return JSON.stringify(resp);
};