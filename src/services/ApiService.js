import axios from 'axios'

/**
 * ApiService
 * Handles HTTP requests to the MLRange system's API (fetching results or other live data).
 * - Receives parameters directly from composables/views (no internal fallback/default logic).
 * - Always expects `lanes` as an array (e.g., ['A','B','C']).
 * - Assumes `method` comes directly from the view component.
 */
const ApiService = {
    /**
     * Fetch MLRange data using the provided IP, method, and lanes.
     * @param {string} mlrangeIP - The IP or hostname of the MLRange system (e.g. '192.168.1.10' or 'localhost')
     * @param {string} method - The method to use for the API call ('fp', 'timer', etc.)
     * @param {Array<string>} lanes - Array of lane letters to filter (e.g. ['A','B','C'])
     * @returns {Promise<Object>} - Response object containing .result property
     */
    async fetchData(mlrangeIP, method = '', lanes = []) {
        // Base URL for MLRange API
        const baseURL = `http://${mlrangeIP}:8088/tv`

        // Method query
        const methodParam = `method=${method}`

        // Lanes as param: always an array
        const lanesParam = `params=${JSON.stringify(lanes)}`

        // Construct the full request URL
        const url = `${baseURL}/get?${methodParam}&${lanesParam}&id=1`
        console.log('[ApiService] Fetching data from URL:', url)

        // Use axios to perform the GET request
        try {
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            console.error('[ApiService] Error fetching data:', error)
            throw error
        }
    }
}

export default ApiService