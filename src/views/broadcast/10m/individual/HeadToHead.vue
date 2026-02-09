<script setup>
import { computed } from 'vue'
import { useLiveData, getConfigValue } from '@/composables/useLiveData.js'
import ShooterDisplay from '@/components/ShooterDisplay.vue'

// Get left/right lanes from URL params (with fallbacks)
const leftLane = getConfigValue('lane-left', null, 'A')
const rightLane = getConfigValue('lane-right', null, 'B')

// Now useLiveData will read lanes from URL
const { fetchedData } = useLiveData('fp')

// --- Computed: get left and right shooters by lane ---
const leftShooter = computed(() => {
  return fetchedData.value.find((s) => s.fp === leftLane) || null
})

const rightShooter = computed(() => {
  return fetchedData.value.find((s) => s.fp === rightLane) || null
})
</script>

<template>
  <!-- Full screen head-to-head layout -->
  <div class="h-full flex justify-center items-end pb-[7.5vh]">
    <div class="w-[90vw]">
      <!-- Two shooter split screen -->
      <div class="flex justify-between">
        <!-- LEFT SHOOTER -->
        <div class="flex justify-center w-[45%]">
          <ShooterDisplay
            v-if="leftShooter"
            :shooter="leftShooter"
            widthClass="w-[12vw] min-w-[12vw] max-w-[12vw]"
          />
        </div>

        <!-- RIGHT SHOOTER -->
        <div class="flex justify-center w-[45%]">
          <ShooterDisplay
            v-if="rightShooter"
            :shooter="rightShooter"
            widthClass="w-[12vw] min-w-[12vw] max-w-[12vw]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
