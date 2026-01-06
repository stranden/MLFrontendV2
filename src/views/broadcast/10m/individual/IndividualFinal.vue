<script setup>
import { computed } from 'vue'
import { useLiveData } from '@/composables/useLiveData.js'
//import { formatName, svgSource, parseClubData } from '@/assets/js/util.js'
import Target from '@/components/Target.vue'

const { fetchedData } = useLiveData('fp')

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
  const seriesTypeShootoff = shooters.some((s) => s.seriesType === 'shootoff')
  // Defensive: empty array fallback for Math.max
  const matchShotCounts = shooters.map((p) => p.matchShotCount || 0)
  const fiveShotsSeries = matchShotCounts.length && Math.max(...matchShotCounts) <= 10

  const firstSingleShotSeries = active === 8 && !fiveShotsSeries
  const secondSingleShotSeries = active === 7 && !seriesTypeShootoff
  const thirdSingleShotSeries = active === 6 && !seriesTypeShootoff
  const fourthSingleShotSeries = active === 5 && !seriesTypeShootoff
  const fifthSingleShotSeries = active === 4 && !seriesTypeShootoff
  const sixthSingleShotSeries = active === 3 && !seriesTypeShootoff
  const seventhSingleShotSeries = active === 2 && !seriesTypeShootoff
  const shootOffSeries = seriesTypeShootoff && hasShootOff

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
    stage: fiveShotsSeries
      ? 'series'
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
                    : shootOffSeries
                      ? 'series-shootoff'
                      : hasPendingElimination
                        ? 'presentation'
                        : 'unknown',
  }
})
</script>

<template>
  <!-- Bottom graphic container - anchored to bottom -->
  <div class="h-full flex justify-center items-end pb-[5vh]">
    <!-- Bottom graphic content area within TV safe area -->
    <div class="w-[90vw]">
      <!-- Shooters row -->
      <div v-if="stageInfo.stage != 'unknown'" class="flex gap-[1vw]">
        <div
          v-for="(data, index) in activeShooters"
          :key="index"
          class="relative flex-1 bg-white/10 rounded-lg transition-all duration-300 ease-in-out m-[0.5vmax]"
          :class="getShooterClass(data.flags)"
        >
          <!-- TARGET CORNER -->
          <div
            class="absolute -top-[1.5vh] -left-[1.5vmax] w-[3vmax] h-[3vmax] rounded-full bg-black/70 flex items-center justify-center text-white text-[1vmax] font-bold z-10 shadow-lg border-[0.15vmax] border-white/80"
          ></div>

          <!-- SCORE TOP RIGHT -->
          <div
            class="absolute top-0 right-0 bg-gray-200/50 rounded-tr-lg px-1 py-[0.25vh] text-[0.8rem] font-bold italic flex justify-center items-center"
          >
            SCORE
          </div>

          <!-- SHOT VALUE -->
          <div
            class="bg-blue-900/80 text-gray-300 text-[1.5rem] font-bold h-[2.5vh] flex items-center justify-center mt-[3vh]"
          >
            10.4
          </div>

          <!-- TOTAL SCORE -->
          <div
            class="bg-blue-900 text-gray-100 text-[1.5rem] font-bold h-[2.5vh] flex items-center justify-center mt-[0.5vh]"
          >
            104.9
          </div>

          <div
            class="bg-gray-200 text-[0.8rem] font-bold italic h-[2vh] flex items-center justify-center"
          >
            Total
          </div>

          <!-- NAME -->
          <div
            class="bg-blue-950 text-gray-100 text-[1.25rem] font-bold h-[2.5vh] flex items-center pl-[0.25vw]"
          >
            Henrik Strand
          </div>

          <!-- CLUB / NATION -->
          <div class="bg-gray-200 rounded-b-lg h-[2vh] flex items-center pl-[0.25vw]">
            <img
              src="`@/assets/img/flags/DEN.svg`"
              alt="nation"
              class="h-[1.25rem] rounded-full"
            /><span class="font-bold text-[1rem] pl-[0.25vw]">DEN</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
  <div
    v-if="stageInfo.stage !== 'unknown'"
    id="shootingDisplayContainer"
    :class="`stage-${stageInfo.stage}`"
    class="absolute left-[5vw] right-[5vw] bottom-[5vw] flex flex-wrap justify-center items-end transition-all duration-500 top-auto h-auto"
  >
    <div
      v-for="(data, index) in activeShooters"
      :key="index"
      class="relative flex-1 rounded-lg bg-white/10 transition-all duration-300 mb-0"
      :class="getShooterClass(data.flags)"
    >
      <Target
        :target-name="data.targetId"
        :shot-data="extractShotsForShooter(data)"
        :flags="data.flags"
      />

      <div class="relative top-0 left-0 bg-gray-200/50 rounded-tr-lg opacity-50">
        <div
          class="relative left-[4vw] w-[calc(100%-4vw)] flex justify-center items-center h-6 font-bold italic text-xs"
        >
          SCORE
        </div>
      </div>

      <div class="relative top-0 left-0 bg-blue-900/80 text-gray-400">
        <div
          class="relative left-[4vw] w-[calc(100%-4vw)] flex justify-center items-center h-10 font-bold text-xl"
        >
          {{ data.shots.length > 0 ? data.shots[data.shots.length - 1].vd : '0.0' }}
        </div>
      </div>

      <div class="w-full bg-blue-900">
        <div
          class="relative left-[4vw] w-[calc(100%-4vw)] flex justify-center items-center h-10 font-bold text-xl text-gray-100"
        >
          {{ data.totalScore }}
        </div>
      </div>

      <div class="w-full bg-gray-200">
        <div
          class="relative left-[4vw] w-[calc(100%-4vw)] flex justify-center items-center h-8 font-bold italic text-xs"
        >
          Total
        </div>
      </div>

      <div class="w-full bg-blue-900 opacity-100">
        <div class="flex items-center pl-2.5 h-10 font-bold text-lg text-gray-100">
          {{ formatName(data.name) }}
        </div>
      </div>

      <div class="w-full bg-gray-200 rounded-b-lg">
        <div class="flex items-center pl-2.5 h-8 font-bold text-base">
          <img
            :src="svgSource(parseClubData(data.club).nation)"
            alt="nation"
            class="h-4 rounded-full"
          />
          <span class="font-bold text-base pl-2">{{ parseClubData(data.club).club }}</span>
        </div>
      </div>
    </div>
  </div>
  -->
