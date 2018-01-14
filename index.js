const express = require('express');
const chain = require('./src/chain');
const bodyParser = require('body-parser');
const config = require('./src/boot/config');
const createBlock = require('./src/block').create;
const sockets = require('./src/p2p/sockets');
const connectPeers = require('./src/p2p/index').p2p;
const connectToPeers = require('./src/p2p/index').connectToPeers;
const startConnection = require('./src/p2p/index').startConnection;
const handlers = require('./src/p2p/handlers');
const actions = require('./src/p2p/actions');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/health', (req, res) => res.send('OK'));

app.get('/chain', (req, res) => res.json(chain.get()));

app.post('/newBlock', (req, res) => {
  const block = createBlock(req.data);
  chain.update(block);
  handlers.broadcast(actions.responseLatestMsg());
  console.log('New block in chain has been added: ', block);
  res.send(block);
});

app.get('/peers', (req, res) => {
  res.send(sockets.get().map(s => `${s._socket.remoteAddress}:${s._socket.remotePort}`));
});

app.post('/connect', (req, res) => {
  const { peer } = req.body;
  connectToPeers([peer]);
  console.log('New peer in p2p websocket has been added: ', peer);
  res.send(peer);
});

app.listen(config.http.port, () =>{
  console.log(`Blockchain is listening at ${config.http.port}`);
});

connectPeers.on('connection', ws => startConnection(ws));
console.info(`P2P server has been started on port: ${config.p2p.port}`);

connectToPeers(config.p2p.peers);
