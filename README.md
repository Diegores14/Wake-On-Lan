# wake-on-lan
This is a project to do Wake On Lan to several computers, example do wake on in computer's room. Or only computer.

## Installation
````bash
In build
````
## Synopsis
### wol(arrayObject[, callback])
This function receive arrayObject and callback:
* Example to arrayObject: [ address: '192.168.0.3', mac: 'AA:F5:F2:EA:E7:99', port: 9, numPackects: 3 ]
* Cada Object have:

| Property | Description | Type | Example |
| --- | --- | --- | --- |
| `address` | The destination address | String | 192.168.0.3 |
| `numPackets` | The number of packets to send | Number | 3 |
| `mac` | Mac address destination | String | AA:F5:F2:EA:E7:99 |
| `port` | The destination port to send to | Number | 9 |

To wake a machine with a given mac address do:
````js
const wakeOnLan = require('wakeOnLan')

let arrayObjects = [ address: '192.168.0.3', mac: 'AA:F5:F2:EA:E7:99', port: 9, numPackects: 3 ]
wakeOnLan.wol(arrayObjects)

wakeOnLan.wol(arrayObjects, error => {
  if (error) {
    // handle error
  } else {
    // done sending packets
  }
});

var magic_packet = wakeOnLan.createWOLPacket('AA:F5:F2:EA:E7:99');
````

You can write the mac in the next forms:

````js
'AA:F5:F2:EA:E7:99'
'AA-F5-F2-EA-E7-99'
'AAF5F2EAE799'
````

## Run command
````bash
In build
````