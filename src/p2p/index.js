const config = require('../boot/config');
const webSocket = require('ws');
const sockets = require('./sockets');
const handlers = require('./handlers');
const actions = require('./actions');

const p2p = new webSocket.Server({
  port : config.p2p.port
});

const startConnection = (ws) => {
  sockets.update(ws);
  handlers.onMessage(ws);
  handlers.onError(ws);
  handlers.write(ws, actions.queryChainLengthMsg());
}

module.exports.connectToPeers = function(Peers) {
  Peers.forEach(peer => {
    const ws = new webSocket(peer);
    ws.on('open', () => {
      console.log(`A new peer are connecting: ${peer}`);
      startConnection(ws);
    });
    ws.on('error', () => {
      console.log(`A new peer filed to connect: ${peer}`);

    });
    
  });
}

module.exports.startConnection = startConnection;
module.exports.p2p = p2p;