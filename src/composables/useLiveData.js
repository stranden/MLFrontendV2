import { ref, onMounted } from 'vue'
import ApiService from '@/services/ApiService'
import SocketService from '@/services/SocketService'

// --- Utility functions ---

// Get a single query param from the current URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

/**
 * Get a config value by precedence:
 *  1. URL param
 *  2. localStorage
 *  3. ENV variable (from Vite)
 *  4. Final fallback value
 * @param {string} key The config key (e.g. 'mlrange', 'lanes')
 * @param {string} envVar The ENV variable name (e.g. 'VITE_MLRANGE_IP')
 * @param {any} fallback Default fallback value
 * @returns {string}
 */
function getConfigValue(key, envVar, fallback) {
  // 1: Try query param
  let v = getQueryParam(key)
  if (v) return v

  // 2: Try from localStorage
  v = localStorage.getItem(key)
  if (v) return v

  // 3: Try from env (Vite only exposes import.meta.env.VITE_*)
  v = (import.meta.env && import.meta.env[envVar]) || undefined
  if (v) return v

  // 4: Fallback hardcoded
  return fallback
}

/**
 * useLiveData composable for fetching live or test data for TV graphics.
 * - Gets config from URL param, then localStorage, then env, then fallback.
 * - Always uses method as passed in (no runtime changes, no URL for method).
 * - Test mode enabled by ?testData=... in URL.
 * - Handles WebSocket auto-refresh, auto-skipped in test mode.
 *
 * @param {Object} opts Options object: { method: string }
 */
export function useLiveData({ method = 'fp' } = {}) {
  // Lanes: prefer URL/localStorage/ENV/fallback, always as array
  const lanesRaw = getConfigValue('lanes', 'VITE_MLRANGE_LANES','A,B,C,D,E,F,G,H')
  const lanes = lanesRaw.split(',').map((l) => l.trim()).filter(Boolean)

  // MLRange IP: same precedence logic, fallback to localhost
  const mlrangeIP = getConfigValue('mlrange', 'VITE_MLRANGE_IP', 'localhost')

  // Test data: enabled if ?testData=filename in URL (filename = no extension)
  const testDataFile = getQueryParam('testData') || null
  const isTestMode = !!testDataFile

  // Reactive reference for data
  const fetchedData = ref([])

  // --- Internal data loader for test mode ---
  async function loadTestData() {
    if (!testDataFile) return
    try {
      // Try to dynamically import the test data (expects .json in /src/testdata/)
      const data = await import(`@/testdata/${testDataFile}.json`)
      // If data format is { result: Array }, filter based on available lanes and fp property
      fetchedData.value = Array.isArray(data.result)
        ? data.result.filter(participant => lanes.includes(participant.fp))
        : data.result || []
      console.log('[useLiveData] Loaded test data:', fetchedData.value)
    } catch (err) {
      console.error('[useLiveData] Error loading test data:', err)
      fetchedData.value = []
    }
  }

  // --- Data fetcher for live/real mode ---
  async function fetchData() {
    if (isTestMode) {
      await loadTestData()
    } else {
      try {
        // Pass IP, method, and lanes array into ApiService
        const resp = await ApiService.fetchData(
          mlrangeIP,
          method,
          lanes
        )
        fetchedData.value = resp.result
        // Uncomment below to debug live responses
        // console.log('[useLiveData] Live API data:', fetchedData.value)
      } catch (err) {
        console.error('[useLiveData] Failed to fetch data:', err)
        fetchedData.value = []
      }
    }
  }

  // --- WebSocket: fetch again on server push (live only) ---
  function handleUpdate() {
    fetchData()
  }

  /**
   * Connect to WebSocket for live updates (skipped in test mode).
   * Listens for the 'update' event from the MLRange system.
   */
  function connectWebSocket() {
    if (isTestMode) return
    SocketService.connect(mlrangeIP)
    SocketService.listen('update', handleUpdate)
  }

  // --- Lifecycle: fetch data on mount, then connect WebSocket ---
  onMounted(() => {
    fetchData()
    connectWebSocket()
  })

  // --- Return the main data, fetch function, and current config (for debugging/UI) ---
  return {
    fetchedData,    // reactive live or test data array
    fetchData,      // manual refetch if needed (e.g., refresh button)
    mlrangeIP,      // current MLRange IP resolved by precedence
    lanes,          // Array of lane letters in use
    isTestMode,     // true if using test data
    testDataFile,   // currently loaded testData file (or null)
  }
}