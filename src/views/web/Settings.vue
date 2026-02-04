<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Navbar from '@/components/Navbar.vue'

// Dynamically import all test data JSON files from src/testdata/
const testDataModules = import.meta.glob('@/testdata/*.json', { eager: false })
const availableTestDataFiles = Object.keys(testDataModules).map((path) => {
  return path.split('/').pop().replace('.json', '')
})

// Dynamically import all logo images from src/assets/img/logos/
const logoModules = import.meta.glob('@/assets/img/logos/*.{png,jpg,jpeg,svg,webp}', {
  eager: false,
})
const availableLogos = Object.keys(logoModules).map((path) => {
  const filename = path.split('/').pop()
  const name = filename.replace(/\.[^/.]+$/, '')
  return {
    name: name,
    filename: filename,
  }
})

// Available lanes for Head-to-Head
const availableLanes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

// Define all configurable parameters
const settings = ref({
  testdata: '',
  mlrange: '',
  lanes: '',
  title: '',
  discipline: '',
  logos: [],
  'lane-left': 'A',
  'lane-right': 'B',
})

// Computed to check if we're in test mode
const isTestMode = computed(() => !!settings.value.testdata)

// Load current settings from localStorage on mount
onMounted(() => {
  settings.value.testdata = localStorage.getItem('testdata') || ''
  settings.value.mlrange = localStorage.getItem('mlrange') || ''
  settings.value.lanes = localStorage.getItem('lanes') || 'A,B,C,D,E,F,G,H'
  settings.value.title = localStorage.getItem('title') || ''
  settings.value.discipline = localStorage.getItem('discipline') || ''
  settings.value['lane-left'] = localStorage.getItem('lane-left') || 'A'
  settings.value['lane-right'] = localStorage.getItem('lane-right') || 'B'

  const logosStr = localStorage.getItem('logos') || ''
  settings.value.logos = logosStr ? logosStr.split(',').filter(Boolean) : []
})

// Clear mlrange when test mode is enabled
watch(isTestMode, (newVal) => {
  if (newVal) {
    settings.value.mlrange = ''
  }
})

// Save settings to localStorage
const showSaveToast = ref(false)
function saveSettings() {
  if (settings.value.testdata) {
    localStorage.setItem('testdata', settings.value.testdata)
  } else {
    localStorage.removeItem('testdata')
  }

  if (!isTestMode.value && settings.value.mlrange) {
    localStorage.setItem('mlrange', settings.value.mlrange)
  } else {
    localStorage.removeItem('mlrange')
  }

  if (settings.value.lanes) {
    localStorage.setItem('lanes', settings.value.lanes)
  } else {
    localStorage.removeItem('lanes')
  }

  if (settings.value.title) {
    localStorage.setItem('title', settings.value.title)
  } else {
    localStorage.removeItem('title')
  }

  if (settings.value.discipline) {
    localStorage.setItem('discipline', settings.value.discipline)
  } else {
    localStorage.removeItem('discipline')
  }

  if (settings.value.logos.length > 0) {
    localStorage.setItem('logos', settings.value.logos.join(','))
  } else {
    localStorage.removeItem('logos')
  }

  if (settings.value['lane-left']) {
    localStorage.setItem('lane-left', settings.value['lane-left'])
  } else {
    localStorage.removeItem('lane-left')
  }

  if (settings.value['lane-right']) {
    localStorage.setItem('lane-right', settings.value['lane-right'])
  } else {
    localStorage.removeItem('lane-right')
  }

  showSaveToast.value = true
  setTimeout(() => (showSaveToast.value = false), 3000)
}

// Helper to extract just filenames from logo paths (handles both full paths and filenames)
function getLogoFilenames(logos) {
  return logos.map((logo) => logo.split('/').pop())
}

// Generate URL with current settings as query params
function generateUrl(basePath, type) {
  const params = new URLSearchParams()

  // Timer only works with mlrange (no testdata support)
  if (type === 'timer') {
    if (settings.value.mlrange) {
      params.set('mlrange', settings.value.mlrange)
    }
    if (settings.value.lanes) {
      params.set('lanes', settings.value.lanes)
    }
  }
  // Individual: mlrange/testdata + lanes
  else if (type === 'individual') {
    if (isTestMode.value && settings.value.testdata) {
      params.set('testdata', settings.value.testdata)
    } else if (settings.value.mlrange) {
      params.set('mlrange', settings.value.mlrange)
    }
    if (settings.value.lanes) {
      params.set('lanes', settings.value.lanes)
    }
  }
  // Head-to-Head: mlrange/testdata + lane-left + lane-right
  else if (type === 'h2h') {
    if (isTestMode.value && settings.value.testdata) {
      params.set('testdata', settings.value.testdata)
    } else if (settings.value.mlrange) {
      params.set('mlrange', settings.value.mlrange)
    }
    params.set('lane-left', settings.value['lane-left'])
    params.set('lane-right', settings.value['lane-right'])
  }
  // Scoreboard: mlrange/testdata + lanes + title + discipline + logos
  else if (type === 'scoreboard') {
    if (isTestMode.value && settings.value.testdata) {
      params.set('testdata', settings.value.testdata)
    } else if (settings.value.mlrange) {
      params.set('mlrange', settings.value.mlrange)
    }
    if (settings.value.lanes) {
      params.set('lanes', settings.value.lanes)
    }
    if (settings.value.title) {
      params.set('title', settings.value.title)
    }
    if (settings.value.discipline) {
      params.set('discipline', settings.value.discipline)
    }
    if (settings.value.logos.length > 0) {
      params.set('logos', getLogoFilenames(settings.value.logos).join(','))
    }
  }

  // Convert to string and replace + with %20 for CasparCG compatibility
  const queryString = params.toString().replace(/\+/g, '%20')

  return queryString
}

// Broadcast URLs for the table with their types
const broadcastUrls = [
  { name: '10m Individual', path: '/broadcast/10m/individual/', type: 'individual' },
  { name: '10m Head-to-Head', path: '/broadcast/10m/individual/h2h/', type: 'h2h' },
  { name: '10m Scoreboard', path: '/broadcast/10m/individual/scoreboard/', type: 'scoreboard' },
  { name: '10m Mixed', path: '/broadcast/10m/mixed/', type: 'individual' },
  //{ name: '10m Team', path: '/broadcast/10m/team/', type: 'individual' },
  //{ name: '50m Individual', path: '/broadcast/50m/individual/', type: 'individual' },
  //{ name: '50m Scoreboard', path: '/broadcast/50m/individual/scoreboard/', type: 'scoreboard' },
  { name: 'Shooting Timer', path: '/broadcast/shootingtimer/', type: 'timer' },
]

// Build full URL for display and copying
function getFullUrl(basePath, type) {
  const queryString = generateUrl(basePath, type)
  if (queryString) {
    return `${window.location.origin}${basePath}?${queryString}`
  }
  return `${window.location.origin}${basePath}`
}

// Copy to clipboard with feedback
const copiedUrl = ref('')
async function copyToClipboard(text, path) {
  await navigator.clipboard.writeText(text)
  copiedUrl.value = path
  setTimeout(() => (copiedUrl.value = ''), 2000)
}
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <Navbar />

    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Broadcast settings</h1>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Data Source Card -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                />
              </svg>
              Data Source
              <span v-if="isTestMode" class="badge badge-warning">Test Mode</span>
            </h2>

            <!-- Test Mode Toggle -->
            <div class="form-control">
              <label class="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  :checked="isTestMode"
                  @change="
                    settings.testdata = $event.target.checked
                      ? availableTestDataFiles[0] || 'demo'
                      : ''
                  "
                  class="toggle toggle-primary"
                />
                <span class="label-text">Use Test Data</span>
              </label>
            </div>

            <!-- Test Data File Dropdown (shown when test mode is on) -->
            <div v-if="isTestMode" class="form-control w-full">
              <label class="label">
                <span class="label-text">Test Data File</span>
              </label>
              <select v-model="settings.testdata" class="select select-bordered w-full">
                <option disabled value="">Select a test data file</option>
                <option v-for="file in availableTestDataFiles" :key="file" :value="file">
                  {{ file }}
                </option>
              </select>
            </div>

            <!-- MLRange Settings (shown when test mode is off) -->
            <template v-else>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">MLRange IP Address</span>
                </label>
                <input
                  v-model="settings.mlrange"
                  type="text"
                  placeholder="e.g., 192.168.1.100"
                  class="input input-bordered w-full"
                />
              </div>
            </template>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Lanes</span>
              </label>
              <input
                v-model="settings.lanes"
                type="text"
                placeholder="A,B,C,D,E,F,G,H"
                class="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        <!-- Scoreboard Settings Card -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
              Scoreboard
            </h2>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Title</span>
              </label>
              <input
                v-model="settings.title"
                type="text"
                placeholder="e.g., World Championship 2026"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Discipline</span>
              </label>
              <input
                v-model="settings.discipline"
                type="text"
                placeholder="e.g., 10m Air Rifle Men"
                class="input input-bordered w-full"
              />
            </div>

            <!-- Logos Multi-Select -->
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Logos</span>
              </label>
              <select v-model="settings.logos" multiple class="select select-bordered w-full h-32">
                <option v-for="logo in availableLogos" :key="logo.filename" :value="logo.filename">
                  {{ logo.name }}
                </option>
              </select>
              <label class="label">
                <span class="label-text-alt">Hold Ctrl/Cmd to select multiple</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Head-to-Head Settings Card -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              Head-to-Head
            </h2>

            <div class="grid grid-cols-1 gap-4">
              <!-- Left Lane -->
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Left Lane</span>
                </label>
                <select v-model="settings['lane-left']" class="select select-bordered w-full">
                  <option v-for="lane in availableLanes" :key="lane" :value="lane">
                    Lane {{ lane }}
                  </option>
                </select>
              </div>

              <!-- Right Lane -->
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Right Lane</span>
                </label>
                <select v-model="settings['lane-right']" class="select select-bordered w-full">
                  <option v-for="lane in availableLanes" :key="lane" :value="lane">
                    Lane {{ lane }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Warning if same lane selected -->
            <div v-if="settings['lane-left'] === settings['lane-right']" class="alert alert-warning mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Left and right lanes are the same</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="mt-6">
        <button @click="saveSettings" class="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          Save Settings
        </button>
      </div>

      <!-- Generated URLs Card -->
      <div class="card bg-base-100 shadow-xl mt-8">
        <div class="card-body">
          <h2 class="card-title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            Generated URLs
            <span v-if="isTestMode" class="badge badge-warning">Test Mode</span>
          </h2>
          <p class="text-base-content/70">
            Copy these URLs for OBS Browser Source or other broadcast software.
          </p>

          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Graphic</th>
                  <th>URL</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in broadcastUrls" :key="item.path">
                  <td class="font-medium">
                    {{ item.name }}
                    <span
                      v-if="item.type === 'timer' && isTestMode"
                      class="badge badge-ghost badge-sm ml-2"
                      >No test data</span
                    >
                    <span
                      v-if="item.type === 'h2h'"
                      class="badge badge-info badge-sm ml-2"
                      >{{ settings['lane-left'] }} vs {{ settings['lane-right'] }}</span
                    >
                  </td>
                  <td>
                    <code class="text-xs bg-base-200 px-2 py-1 rounded break-all">
                      {{ getFullUrl(item.path, item.type) }}
                    </code>
                  </td>
                  <td>
                    <button
                      @click="copyToClipboard(getFullUrl(item.path, item.type), item.path)"
                      class="btn btn-sm"
                      :class="copiedUrl === item.path ? 'btn-success' : 'btn-ghost'"
                    >
                      {{ copiedUrl === item.path ? 'Copied!' : 'Copy' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast notification -->
    <div v-if="showSaveToast" class="toast toast-end">
      <div class="alert alert-success">
        <span>Settings saved successfully!</span>
      </div>
    </div>
  </div>
</template>
