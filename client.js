var mqtt = require('mqtt'),
    config = require('./config.json'),
    event = require('./event.js'),
    cmd = require('./cmd.js');

// init
var host = "tcp://" + config.mqtt.hostname + ":" + config.mqtt.port;
console.log(host);
var connecOpt = {
  keepalive: 10,
  clientId: "G:" + config.endpoint.tenant.id + ":" + config.endpoint.id,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  username: config.mqtt.username,
  password: config.mqtt.password
};
console.log(connecOpt);

var measurementFlag = config.event.measuerement;
var alertFlag = config.event.alert;
var locationFlag = config.event.location;
var interval = config.event.interval;
console.log(measurementFlag);
console.log(alertFlag);
console.log(locationFlag);
console.log(interval);

// define topic
var respTopic = config.endpoint.tenant.id + "/" + "resp/aconn/" + config.endpoint.id + "/json";
var reqTopic = config.endpoint.tenant.id + "/" + "req/aconn/" + config.endpoint.id + "/json";

// connect
var client = mqtt.connect(host, connecOpt);

// 连接事件回调函数，处理发送事件
client.on('connect', function() {
  client.subscribe(reqTopic);

  // 测量数据定时发送
  if (measurementFlag) {
    setInterval(function() {
      client.publish(respTopic, event.measurement(config.endpoint.id));
      var date = new Date(Date.now());
      console.log(date.toLocaleString() + ", send measurement event.");
    }, interval);
  }

  // 警告数据定时发送
  if (alertFlag) {
    setInterval(function() {
      client.publish(respTopic, event.alert(config.endpoint.id));
      var date = new Date(Date.now());
      console.log(date.toLocaleString() + ", send alert event.");
    }, interval);
  }

  // 位置数据定时发送
  if (locationFlag) {
    setInterval(function() {
      client.publish(respTopic, event.location(config.endpoint.id));
      var date = new Date(Date.now());
      console.log(date.toLocaleString() + ", send location event.");
    }, interval);
  }

});

// message callback
client.on('message', function(topic, message) {
  console.log(message.toString());
  client.publish(respTopic, cmd.processCmd(message));

  var date = new Date(Date.now());
  console.log(date.toLocaleString() + ", send Command response.");
});