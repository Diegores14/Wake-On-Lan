// const os = require('os')
// const net = require('net')
const dgram = require('dgram')
const socket = dgram.createSocket('udp4')
socket.unref()

function createWOLPacket (mac) {
  mac = mac.replace(/:/g, '')
  mac = mac.replace(/-/g, '')
  if (mac.length !== 12 || mac.match(/[^a-fA-F0-9]/)) throw new Error(`Invalid Mac Address: ${mac}`)
  return Buffer.from('ff'.repeat(6) + mac.repeat(16), 'hex')
}

function sendPacket (data, numPackets, callback) {
  if (numPackets !== 0) {
    const mac = createWOLPacket(data.mac)
    const port = data.port || 9
    const address = data.address
    socket.send(mac, port, address, (err) => {
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
  }
}

function wol(data, callback) {
  data.forEach(element => {
    const numPackets = element.numPackets || 3
    sendPacket(element, numPackets)
  })
}

exports.wol = wol
exports.createWOLPacket = createWOLPacket
