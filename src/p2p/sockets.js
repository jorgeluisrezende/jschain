const Sockets = (() => {
  let instance;
  const sockets = [];
  
  function get() {
    return sockets;
  }

  function update(ws) {
    return sockets.push(ws);  
  }

  function remove(ws) {
    return sockets.splice(sockets.indexOf(ws), 1);
  }

  function create() {
    return {get, update, remove};
  }
  return {
    init() {
      if (!instance) {
        instance = create();
      }
      return instance;
    }
  };
})();

module.exports = Sockets.init();