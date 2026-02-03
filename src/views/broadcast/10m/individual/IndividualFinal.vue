<script setup>
import { computed, watch, ref } from 'vue'
import { useLiveData } from '@/composables/useLiveData.js'
import Target from '@/components/Target.vue'

import * as utils from '@/utils'

const { fetchedData } = useLiveData('fp')

// Track the last "active" stage before presentation
const lastActiveStage = ref('first-single-shot-series')

// Utility functions
function extractShotsForShooter(shooter) {
  return shooter?.shots?.map(({ x, y }) => ({ x, y })) || []
}

function getShooterClass(flags) {
  return [
    flags === 'E' &&
      'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-20 after:rounded-lg after:bg-gray-500/75',
    flags === 'ES' &&
      'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-20 after:rounded-lg after:bg-gray-500/75',
    flags === 'T' &&
      'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-20 after:rounded-lg after:bg-green-700/50',
    (flags === 'P' || flags === 'SP') &&
      'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-20 after:rounded-lg after:bg-red-700/50',
  ]
    .filter(Boolean)
    .join(' ')
}

function getShooterWidthClass(stage) {
  const widthClasses = {
    series: 'w-[10vw] min-w-[10vw] max-w-[10vw]', // 8 shooters
    'first-single-shot-series': 'w-[10vw] min-w-[10vw] max-w-[10vw]', // 8 shooters
    'second-single-shot-series': 'w-[11vw] min-w-[11vw] max-w-[11vw]', // 7 shooters
    'third-single-shot-series': 'w-[12vw] min-w-[12vw] max-w-[12vw]', // 6 shooters
    'fourth-single-shot-series': 'w-[14vw] min-w-[14vw] max-w-[14vw]', // 5 shooters
    'fifth-single-shot-series': 'w-[16vw] min-w-[16vw] max-w-[16vw]', // 4 shooters
    'sixth-single-shot-series': 'w-[18vw] min-w-[18vw] max-w-[18vw]', // 3 shooters
    'seventh-single-shot-series': 'w-[15vw] min-w-[15vw] max-w-[15vw]', // 2 shooters (final!)
    'series-shootoff': 'w-[15vw] min-w-[15vw] max-w-[15vw]', // shootoff
  }
  return widthClasses[stage] || 'w-[10vw] min-w-[10vw] max-w-[10vw]'
}

// Filtering functions
function includeAllShooters(shooters) {
  return shooters
}
function removeShootersWithFlags(shooters, flagKey, flagValues) {
  const values = Array.isArray(flagValues) ? flagValues : [flagValues]
  return shooters.filter((shooter) => !values.includes(shooter[flagKey]))
}
function includeShootersWithFlags(shooters, flagKey, flagValues) {
  const values = Array.isArray(flagValues) ? flagValues : [flagValues]
  return shooters.filter((shooter) => values.includes(shooter[flagKey]))
}

// Computed values
const allShooters = computed(() => includeAllShooters(fetchedData.value))
const activeShooters = computed(() =>
  removeShootersWithFlags(fetchedData.value, 'flags', ['E', 'ES']),
)
const eliminatedShooters = computed(() =>
  includeShootersWithFlags(fetchedData.value, 'flags', ['P', 'SP']),
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
  <div class="h-full flex justify-center items-end pb-[5vh]">
    <!-- Bottom graphic content area within TV safe area -->
    <div class="w-[90vw]">
      <!-- Shooters row -->
      <div v-if="stageInfo.stage != 'unknown'" class="flex gap-[1vw] justify-around">
        <div
          v-for="(data, index) in activeShooters"
          :key="index"
          class="relative bg-white/10 rounded-lg transition-all duration-300 ease-in-out m-[0.5vw]"
          :class="[getShooterClass(data.flags), getShooterWidthClass(stageInfo.widthStage)]"
        >
          <!-- TARGET COMPONENT -->
          <Target
            :targetName="data.targetId"
            :shotData="extractShotsForShooter(data)"
            :flags="data.flags"
          />

          <!-- SCORE TOP RIGHT -->
          <div class="relative bg-gray-200/50 text-gray-350 rounded-tr-lg">
            <div
              class="relative left-[4vw] w-[calc(100%-4vw)] h-[1.5vh] flex justify-center items-center text-[0.7rem] font-semibold italic"
            >
              SCORE
            </div>
          </div>

          <!-- SHOT VALUE -->
          <div class="relative bg-blue-900/80 text-gray-250">
            <div
              class="relative left-[4vw] w-[calc(100%-4vw)] h-[2.5vh] flex justify-center items-center text-[1.25rem] font-bold"
            >
              {{ data.shots.length > 0 ? data.shots[data.shots.length - 1].vd : '0.0' }}
            </div>
          </div>

          <!-- TOTAL SCORE -->
          <div class="relative bg-blue-900 text-gray-100">
            <div
              class="relative left-[4vw] w-[calc(100%-4vw)] h-[2.5vh] flex justify-center items-center text-[1.25rem] font-bold"
            >
              {{ data.totalScore }}
            </div>
          </div>

          <div class="relative bg-gray-200/75 text-gray-900">
            <div
              class="relative left-[4vw] w-[calc(100%-4vw)] h-[2vh] flex justify-center items-center text-[0.8rem] font-semibold italic"
            >
              Total
            </div>
          </div>

          <!-- NAME -->
          <div class="bg-blue-950 text-gray-100">
            <div class="flex items-center pl-[0.25vw] font-bold h-[2.5vh]">
              {{ utils.formatName(data.name) }}
            </div>
          </div>

          <!-- CLUB / NATION -->
          <div class="bg-gray-200 rounded-b-lg h-[2vh] flex">
            <img
              :src="
                utils.countryFlag(
                  utils.convertIocToAlpha2(utils.parseClubData(data.club).nation),
                  '4x3',
                )
              "
              alt="nation"
              class="h-[full] rounded-bl-lg"
            /><span class="flex items-center pl-[0.25vw] font-semibold text-[1rem] text-gray-900">{{
              utils.parseClubData(data.club).club
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
