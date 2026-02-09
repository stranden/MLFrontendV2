<script setup>
import { useLiveData } from '@/composables/useLiveData.js'
import { ref, watch, onUnmounted, computed } from 'vue'

const { fetchedData } = useLiveData('timer')

const timerData = ref([])
let intervalId = null
let serverTimeReference = 0

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const formatTimeDisplay = (timer) => {
  if (timer.mode === 'STOP') return '00:00'
  return formatTime(timer.currentTime)
}

const unifiedTimer = computed(() => {
  return timerData.value[0] || {}
})

const calculateCurrentTime = (shooter) => {
  if (shooter.mode === 'STOP') return 0
  if (shooter.mode === 'DOWN') {
    return Math.max(0, shooter.shootTimer - shooter.sinceStart)
  } else {
    return Math.min(shooter.shootTimer, shooter.sinceStart)
  }
}

const initializeTimers = (data) => {
  serverTimeReference = Date.now()
  return data.map(shooter => ({
    ...shooter,
    serverSinceStart: shooter.sinceStart,
    currentTime: calculateCurrentTime(shooter),
  }))
}

const updateTimers = () => {
  const now = Date.now()
  const elapsedSinceUpdate = (now - serverTimeReference) / 1000

  timerData.value = timerData.value.map(shooter => {
    if (shooter.mode === 'STOP') {
      return {
        ...shooter,
        currentTime: 0,
      }
    }

    const effectiveTime = shooter.serverSinceStart + elapsedSinceUpdate
    let currentTime

    if (shooter.mode === 'DOWN') {
      currentTime = Math.max(0, shooter.shootTimer - effectiveTime)
    } else {
      currentTime = Math.min(shooter.shootTimer, effectiveTime)
    }

    return {
      ...shooter,
      currentTime,
    }
  })
}

watch(fetchedData, (newData) => {
  if (newData?.length) {
    timerData.value = initializeTimers(newData)

    if (intervalId) clearInterval(intervalId)
    intervalId = setInterval(updateTimers, 100)
  }
}, { immediate: true })

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="fixed bottom-[2.5vh] left-1/2 -translate-x-1/2 z-10 flex items-center bg-[#00004b] px-[0.5vw] py-[0.25vh] rounded-[1vw] text-white text-[1.25vw] w-fit mx-auto gap-[0.25vw] shadow-[0_0.5vh_2vh_rgba(0,0,0,0.2)]">
    <span class="flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-[1em] h-[1em]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15 1H9v2h6V1zM12 7a1 1 0 0 0-1 1v4.59l3.3 3.3 1.4-1.42-2.7-2.7V8a1 1 0 0 0-1-1zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
    </span>
    <span class="font-mono">
      {{ formatTimeDisplay(unifiedTimer) }}
    </span>
  </div>
</template>