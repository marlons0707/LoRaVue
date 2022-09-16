import { io } from 'socket.io-client'

class SocketioService {
    socket;

    connectSocket() {
      this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT)
      this.socket.emit('prueba', 'Hello LoraVue')
    }

    disconnectSocket() {
      if (this.socket) {
        this.socket.disconnect()
      }
    }
}

export default new SocketioService()
