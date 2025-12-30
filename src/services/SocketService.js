/**
 * SocketService
 * Handles a single WebSocket connection to the MLRange system to listen for live events/updates.
 * Only one socket allowed at a time.
 */
const SocketService = {
    socket: null, // WebSocket instance

    /**
     * Connects to the MLRange WebSocket API at the given IP.
     * @param {string} mlrangeIP - IP or hostname of the MLRange system
     */
    connect(mlrangeIP) {
        const baseURL = `ws://${mlrangeIP}:8088/tv/ws`
        this.socket = new WebSocket(baseURL)

        this.socket.addEventListener('open', () => {
            console.log('[SocketService] WebSocket connection established')
        })

        this.socket.addEventListener('error', (error) => {
            console.error('[SocketService] WebSocket error:', error)
        })

        this.socket.addEventListener('close', () => {
            console.log('[SocketService] WebSocket connection closed')
        })
    },

    /**
     * Listen for incoming 'message' events from the WebSocket, and
     * call the given callback with the parsed data object.
     * @param {string} eventName - Ignored, for API compatibility
     * @param {function} callback - Function to call with received data
     */
    listen(eventName, callback) {
        if (!this.socket) {
            console.error('[SocketService] WebSocket is not connected')
            return
        }

        this.socket.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data)
                console.log('[SocketService] Notify from range:', data)
                if (typeof callback === 'function') {
                    callback(data)
                }
            } catch (err) {
                console.error('[SocketService] Failed to parse WebSocket message:', event.data)
            }
        })
    },

    /**
     * Unregister a previously registered message event listener (if needed).
     * @param {string} eventName - Ignored, for API compatibility
     * @param {function} callback - The function to remove from listeners
     */
    off(eventName, callback) {
        if (!this.socket) {
            console.error('[SocketService] WebSocket is not connected')
            return
        }

        this.socket.removeEventListener('message', callback)
    },

    /**
     * Cleanly disconnect from the WebSocket and free resources.
     */
    disconnect() {
        if (this.socket) {
            this.socket.close()
            this.socket = null
        }
    }
}

export default SocketService