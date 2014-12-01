var mqtt = require('mqtt');
var client = mqtt.connect(process.argv[2]);
client.publish('/my-room', process.argv[3] || ('Hello mqtt, ' + new Date))
      .end();

