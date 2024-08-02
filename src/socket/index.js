import io from 'socket.io-client'

class SocketService {
    constructor() {
        this.socket = null
    }

    initSocket() {
        this.socket = io(import.meta.env.VITE_SOCKET_DOMAIN)
    }

    getSocket() {
        if (!this.socket) {
            this.initSocket()
        }
        return this.socket
    }

    disconnectSocket() {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
    }

    createNewSocket() {
        this.disconnectSocket()
        this.initSocket()
    }
}

const socketService = new SocketService()

export default socketService
