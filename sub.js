var mqtt = require('mqtt');
var client = mqtt.connect(process.argv[2]);

client.subscribe('/my-room')
      .on('message', function (topic, message) {
        console.log(topic, message);
      });

//client.end();
