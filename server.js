var mqtt = require('mqtt')
  , redis = require('redis');

var app = mqtt.createServer(function(client, err) {
  if (err) {
    console.log(err);
    throw err;
  }

  client.p = redis.createClient(6379, "redismaster", {no_ready_check: true});
  client.s = redis.createClient(6379, "redisslave", {detect_buffers: true, no_ready_check: true});

  client.on('connect', function(packet) {
    client.connack({returnCode: 0});
  });

  client.on('subscribe', function(packet) {
    var granted = [];
    for (var i = 0; i < packet.subscriptions.length; i++) {
      var sub = packet.subscriptions[i]
      granted.push(sub.qos);

      var topic = sub.topic
          .replace(/\+/g, '[^/]')
          .replace(/\#/g, '*')

      console.log(topic);
      client.s.psubscribe(topic);
    }

    client.suback({messageId: packet.messageId, granted: granted});
  });
  client.on('publish', function(packet) {
    client.p.publish(packet.topic, packet.payload);
    if (packet.qos > 0) {
      client.puback({topic: packet.topic, messageId:1});
    }
  });
  client.on('pingreq', function(packet) {
    client.pingresp();
  });
  client.on('close', function() {
    client.p.end();
    client.s.end();
  });
  client.s.on('pmessage', function(pattern, channel, message) {
    client.publish({topic: channel, payload: message});
  });
  client.on('disconnect', function(packet) {
    client.stream.end();
  });
  client.on('error', function(e) {
    client.stream.end();
    console.log(e);
  });
}).listen(process.argv[2] || 1883);

console.log("started");
