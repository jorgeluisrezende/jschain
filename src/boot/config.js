module.exports = {
  http: {
    port: process.env.HTTP_PORT
  },
  p2p: {
    port: process.env.P2P_PORT,
    peers: process.env.P2P_PEERS ? process.env.P2P_PEERS.split(',') : []
  }
};