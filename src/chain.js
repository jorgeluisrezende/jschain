const block = require('./block');

const Chain = (function() {
  let instance;

  const firstBlock = {
    index : 0,
    prevHash : 0,
    timestamp : 0,
    data : 'Blockchain is Borning',
    hash : block.generateHash({index : 0, prevHash : 0, timestamp : 0,  data : 'Blockchain is Borning'}),
  };
  const chain = [firstBlock];
})();
