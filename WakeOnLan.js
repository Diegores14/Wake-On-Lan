// const os = require('os')
// const net = require('net')
const dgram = require('dgram')

function createWOLPacket (mac) {
  mac = mac.replace(/:/g, '')
  mac = mac.replace(/-/g, '')
  if (mac.length !== 12 || mac.match(/[^a-fA-F0-9]/)) throw new Error(`Invalid Mac Address: ${mac}`)
  return Buffer.from('ff'.repeat(6) + mac.repeat(16), 'hex')
}

function sendPacket (data, numPackets, callback) {
  let socket = dgram.createSocket('udp4')
  if (numPackets !== 0) {
    const mac = createWOLPacket(data.mac)
    const port = data.port || 9
    const address = data.address || '255.255.255.255'
    const broadcast = data.broadcast || true

    socket.bind( 0, () => { 
      if ( broadcast ) 
        socket.setBroadcast(true)
    } )
    socket.send(mac, 0, mac.length, port, address, (err) => {
      socket.close()
      if (err) {
        if (callback) {
          callback(err)
        } else {
          return err
        }
      } else {
        setTimeout(sendPacket, 100, data, numPackets - 1, callback)
      }
    })
  } else {
    if( callback )
      callback( null )
  }
}

function wol(data, callback) {
  data.forEach(element => {
    const numPackets = element.numPackets || 3
    sendPacket(element, numPackets)
  })
}

// wol( [ { mac: '1C:A0:B8:7F:94:9B', address: '192.168.213.255' } ] )
wol( [ { mac: '1C:A0:B8:7F:94:9B' } ] )
exports.wol = wol
exports.createWOLPacket = createWOLPacket
