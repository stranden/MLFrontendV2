<script setup>
import { computed } from 'vue'
import { useLiveData } from '@/composables/useLiveData.js'
import * as utils from '@/utils'

const { fetchedData } = useLiveData('fp')

function getSelectedRank() {
  const params = new URLSearchParams(window.location.search)
  const rankParam = params.get('rank')
  const rank = Number(rankParam)
  return Number.isFinite(rank) && rank > 0 ? rank : null
}

const selectedRank = computed(() => getSelectedRank())

const selectedShooter = computed(() => {
  if (!fetchedData.value || fetchedData.value.length === 0 || !selectedRank.value) return null

  return fetchedData.value.find((shooter) => Number(shooter.rank) === selectedRank.value) || null
})

const displayData = computed(() => {
  const shooter = selectedShooter.value
  if (!shooter) return null

  const rank = Number(shooter.rank)
  const flags = shooter.flags || ''
  const hasShootOff = flags.includes('SP') || flags.includes('ES')

  let medalText = null
  let medalClass = 'text-gray-500'

  if (rank === 1) {
    medalText = 'GOLD'
    medalClass = 'text-[#FFD700]'
  } else if (rank === 2) {
    medalText = 'SILVER'
    medalClass = 'text-[#C0C0C0]'
  } else if (rank === 3) {
    medalText = 'BRONZE'
    medalClass = 'text-[#CD7F32]'
  }

  const nation = utils.parseClubData(shooter.club).nation
  const alpha2 = utils.convertIocToAlpha2(nation)

  return {
    ...shooter,
    rank,
    medalText,
    medalClass,
    nation,
    hasShootOff,
    flagUrl: utils.countryFlag(alpha2, '4x3'),
    formattedName: utils.formatName(shooter.name),
  }
})
</script>

<template>
  <div class="h-full w-full flex justify-center items-end pb-[7.5vh]">
    <div class="w-[90vw] flex justify-center items-end">
      <div
        v-if="displayData"
        class="flex items-stretch rounded-[1.5vmin] overflow-hidden shadow-lg"
      >
        <div class="bg-blue-950 text-gray-200 px-[2vw] py-[1.5vh] min-w-[26vw] flex items-center">
          <span class="font-bold text-[3.2vmin] leading-none truncate">
            {{ displayData.formattedName }}
          </span>
        </div>

        <div class="bg-gray-500/80 px-[1.2vw] py-[1.2vh] flex items-center gap-[1vw] min-w-[16vw]">
          <img
            :src="displayData.flagUrl"
            :alt="`${displayData.nation} flag`"
            class="h-[4.5vmin] rounded-[0.4vmin]"
          />
          <span class="text-gray-200 font-semibold text-[2.4vmin] leading-none truncate">
            {{ displayData.nation }}
          </span>
        </div>

        <div
          class="bg-blue-950 text-gray-200 px-[1.5vw] py-[1.2vh] flex items-center justify-center min-w-[10vw]"
        >
          <span class="font-bold text-[2.8vmin] leading-none">
            {{ displayData.totalScore }}
          </span>
        </div>

        <div
          class="bg-blue-950 px-[1.5vw] py-[1.2vh] flex items-center justify-center min-w-[12vw]"
          :class="displayData.medalText ? displayData.medalClass : 'text-gray-200'"
        >
          <span class="font-bold text-[2.8vmin] leading-none">
            {{ displayData.medalText || `RANK ${displayData.rank}` }}
          </span>
        </div>

        <div
          v-if="displayData.hasShootOff"
          class="bg-gray-500/80 text-gray-200 px-[1.5vw] py-[1.2vh] flex items-center justify-center min-w-[10vw]"
        >
          <span class="font-bold text-[2.4vmin] leading-none uppercase">SO</span>
        </div>
      </div>
    </div>
  </div>
</template>
