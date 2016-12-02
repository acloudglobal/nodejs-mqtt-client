
exports.measurement = function(endpointId) {
  var timeInMs = Date.now();

  var measureData = {
    "type": "EndpointMeasurements",
    "endpointId": endpointId,
    "request": {
      "eventDate": timeInMs,
      "updateState": false,
      "metaData": {
        "k1": "v1",
        "k2": "v2"
      },
      "measurements": {
        "jvmMemory": {
          "total": 128974848,
          "max": 1908932608,
          "name": "myJVM",
          "count": 88,
          "free": 112448128,
          "booleanFlag": true
        }
      }
    }
  };

  return JSON.stringify(measureData);
};

exports.alert = function(endpointId) {
  var timeInMs = Date.now();

  var alertData = {
    "type": "EndpointAlert",
    "endpointId": endpointId,
    "request": {
      "eventDate": timeInMs,
      "updateState": false,
      "source": "Endpoint",
      "level": "Info",
      "type": "alert type",
      "message": "my alert"
    }
  }

  return JSON.stringify(alertData);
};

exports.location = function(endpointId) {
  var timeInMs = Date.now();

  var locationData = {
    "type": "EndpointLocation",
    "endpointId": endpointId,
    "request": {
      "eventDate": timeInMs,
      "updateState": false,
      "metaData": {
        "k1": "v1",
        "k2": "v2"
      },
      "latitude": 0.1,
      "longitude": 0.2,
      "elevation": 8.8
    }
  };

  return JSON.stringify(locationData);
};