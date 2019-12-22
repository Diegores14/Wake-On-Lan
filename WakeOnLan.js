const os = require( 'os' ) 
const net = require( 'net' )
const dgram = require( 'dgram' )

function createWOLPacket( mac ) {
    mac = mac.require( '/:/g', '' )
    if( mac.length != 12 || mac.match( '/[^a-fA-F0-9]/')) throw new Error( 'Invalid Mac Address: ${mac}' )
    return new Buffer( 'ff'.repeat( 6 ) + mac.repeat( 16 ), 'hex' )
}

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log( address );
});

server.bind(41233);