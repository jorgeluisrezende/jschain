const chain = require('../chain');
const MessageType = require('./types');

module.exports.queryChainLengthMsg = () => ({
  type: MessageType.QUERY_LATEST
});

module.exports.queryAllMsg = () => ({
  type: MessageType.QUERY_ALL
});

module.exports.responseChainMsg = () => ({
  type: MessageType.RESPONSE_BLOCKCHAIN,
  data: JSON.stringify(chain.get())
});

module.exports.responseLatestMsg = () => ({
  type: MessageType.RESPONSE_BLOCKCHAIN,
  data: JSON.stringify([chain.last()])
});