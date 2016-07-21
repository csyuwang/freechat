import io from 'socket.io-client';

let __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  }
}());

class SocketService {
  constructor() {
    if (__instance()) return __instance();
    this.socket = io();
    __instance(this);
  }

  getSocket() {
    return this.socket;
  }

  static emit(event, data) {
    let self = new SocketService();
    self.socket.emit(event, data);
  }

  static on(event, fn) {
    let self = new SocketService();
    self.socket.on(event, fn);
  }

  static removeAllListeners(event) {
    let self = new SocketService();
    self.socket.removeAllListeners(event);
  }
}

export default SocketService;
