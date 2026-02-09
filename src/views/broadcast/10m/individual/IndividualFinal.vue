<script setup>
import { computed, watch, ref } from 'vue'
import { useLiveData } from '@/composables/useLiveData.js'
import ShooterDisplay from '@/components/ShooterDisplay.vue'

const { fetchedData } = useLiveData('fp')

// Track the last "active" stage before presentation
const lastActiveStage = ref('first-single-shot-series')

// Filtering functions
function removeShootersWithFlags(shooters, flagKey, flagValues) {
  const values = Array.isArray(flagValues) ? flagValues : [flagValues]
  return shooters.filter((shooter) => !values.includes(shooter[flagKey]))
}

function getShooterWidthClass(stage) {
  const widthClasses = {
    series: 'w-[9.25vw] min-w-[9.25vw] max-w-[9.25vw]', // 8 shooters
    'first-single-shot-series': 'w-[9.25vw] min-w-[9.25vw] max-w-[9.25vw]', // 8 shooters
    'second-single-shot-series': 'w-[10vw] min-w-[10vw] max-w-[10vw]', // 7 shooters
    'third-single-shot-series': 'w-[12vw] min-w-[12vw] max-w-[12vw]', // 6 shooters
    'fourth-single-shot-series': 'w-[12vw] min-w-[12vw] max-w-[12vw]', // 5 shooters
    'fifth-single-shot-series': 'w-[12vw] min-w-[12vw] max-w-[12vw]', // 4 shooters
    'sixth-single-shot-series': 'w-[12vw] min-w-[12vw] max-w-[12vw]', // 3 shooters
    'seventh-single-shot-series': 'w-[12vw] min-w-[12vw] max-w-[12vw]', // 2 shooters (final!)
    'series-shootoff': 'w-[12vw] min-w-[12vw] max-w-[12vw]', // shootoff
  }
  return widthClasses[stage] || 'w-[10vw] min-w-[10vw] max-w-[10vw]'
}

// Computed values
const activeShooters = computed(() =>
  removeShootersWithFlags(fetchedData.value, 'flags', ['E', 'ES']),
)

const stageInfo = computed(() => {
  const shooters = fetchedData.value
  const active = activeShooters.value.length
  const hasShootOff = shooters.some((s) => s.flags === 'T')
  const hasPendingElimination = shooters.some((s) => ['P', 'SP'].includes(s.flags))
  const isShootoffPending = shooters.some((s) => s.flags === 'SP')
  const isRegularPending = shooters.some((s) => s.flags === 'P')
  const seriesTypeShootoff = shooters.some((s) => s.seriesType === 'shootoff')

  // Defensive: empty array fallback for Math.max
  const matchShotCounts = shooters.map((p) => p.matchShotCount || 0)
  const fiveShotsSeries = matchShotCounts.length && Math.max(...matchShotCounts) <= 10

  // Determine base stage from active shooter count (independent of pending elimination)
  const firstSingleShotSeries = active === 8 && !fiveShotsSeries
  const secondSingleShotSeries = active === 7 && !seriesTypeShootoff
  const thirdSingleShotSeries = active === 6 && !seriesTypeShootoff
  const fourthSingleShotSeries = active === 5 && !seriesTypeShootoff
  const fifthSingleShotSeries = active === 4 && !seriesTypeShootoff
  const sixthSingleShotSeries = active === 3 && !seriesTypeShootoff
  const seventhSingleShotSeries = active === 2 && !seriesTypeShootoff
  const shootOffSeries = seriesTypeShootoff || hasShootOff || isShootoffPending

  // Map active shooter count directly to a stage for width calculation
  function getStageFromActiveCount(count, isShootoff) {
    if (isShootoff) return 'series-shootoff'
    if (fiveShotsSeries) return 'series'

    const stageMap = {
      8: 'first-single-shot-series',
      7: 'second-single-shot-series',
      6: 'third-single-shot-series',
      5: 'fourth-single-shot-series',
      4: 'fifth-single-shot-series',
      3: 'sixth-single-shot-series',
      2: 'seventh-single-shot-series',
    }
    return stageMap[count] || 'first-single-shot-series'
  }

  // Determine the base stage (based on active shooter count)
  const baseStage = fiveShotsSeries
    ? 'series'
    : shootOffSeries
      ? 'series-shootoff'
      : firstSingleShotSeries
        ? 'first-single-shot-series'
        : secondSingleShotSeries
          ? 'second-single-shot-series'
          : thirdSingleShotSeries
            ? 'third-single-shot-series'
            : fourthSingleShotSeries
              ? 'fourth-single-shot-series'
              : fifthSingleShotSeries
                ? 'fifth-single-shot-series'
                : sixthSingleShotSeries
                  ? 'sixth-single-shot-series'
                  : seventhSingleShotSeries
                    ? 'seventh-single-shot-series'
                    : 'unknown'

  // Determine final stage and width stage
  let stage = baseStage
  let widthStage =
    baseStage !== 'unknown' ? baseStage : getStageFromActiveCount(active, shootOffSeries)

  if (hasPendingElimination) {
    stage = 'presentation'
    // Use shootoff width if we're in a shootoff scenario
    widthStage = getStageFromActiveCount(active, shootOffSeries)
  }

  // Update lastActiveStage when not in presentation and we have a valid stage
  if (!hasPendingElimination && baseStage !== 'unknown') {
    lastActiveStage.value = baseStage
  }

  return {
    fiveShotsSeries,
    firstSingleShotSeries,
    secondSingleShotSeries,
    thirdSingleShotSeries,
    fourthSingleShotSeries,
    fifthSingleShotSeries,
    sixthSingleShotSeries,
    seventhSingleShotSeries,
    shootOffSeries,
    hasPendingElimination,
    isShootoffPending,
    isRegularPending,
    stage,
    widthStage,
  }
})

watch(
  () => stageInfo.value,
  (newInfo, oldInfo) => {
    console.log('[IndividualFinal] Stage changed:', {
      stage: newInfo.stage,
      widthStage: newInfo.widthStage,
      previousStage: oldInfo?.stage,
      activeShooters: activeShooters.value.length,
      hasPendingElimination: newInfo.hasPendingElimination,
      isShootoffPending: newInfo.isShootoffPending,
      isRegularPending: newInfo.isRegularPending,
      shootOffSeries: newInfo.shootOffSeries,
    })
  },
  { immediate: false },
)
</script>

<template>
  <!-- Bottom graphic container - anchored to bottom -->
  <div class="h-full flex justify-center items-end pb-[7.5vh]">
    <!-- Bottom graphic content area within TV safe area -->
    <div class="w-[90vw]">
      <!-- Shooters row -->
      <div v-if="stageInfo.stage != 'unknown'" class="flex justify-around">
        <ShooterDisplay
          v-for="(data, index) in activeShooters"
          :key="index"
          :shooter="data"
          :widthClass="getShooterWidthClass(stageInfo.widthStage)"
        />
      </div>
    </div>
  </div>
</template>
