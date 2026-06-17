<script setup>
import { computed } from 'vue'
import { useLiveData } from '@/composables/useLiveData.js'
import * as utils from '@/utils'

const { fetchedData } = useLiveData('fp')

function getSearchParams() {
  return new URLSearchParams(window.location.search)
}

const selectedRank = computed(() => {
  const rankParam = getSearchParams().get('rank')
  const rank = Number(rankParam)
  return Number.isFinite(rank) && rank > 0 ? rank : null
})

const selectedLane = computed(() => {
  const laneParam = getSearchParams().get('lane')
  return laneParam ? laneParam.toUpperCase() : null
})

const qualificationScore = computed(() => {
  const scoreParam = getSearchParams().get('score')
  return scoreParam ? scoreParam : null
})

const customNote = computed(() => {
  const noteParam = getSearchParams().get('note')
  return noteParam ? noteParam : null
})

const isEliminationMode = computed(() => selectedRank.value !== null)
const isPresentationMode = computed(() => !isEliminationMode.value && selectedLane.value !== null)

const selectedShooter = computed(() => {
  if (!fetchedData.value || fetchedData.value.length === 0) return null

  if (isEliminationMode.value) {
    return fetchedData.value.find((shooter) => Number(shooter.rank) === selectedRank.value) || null
  }

  if (isPresentationMode.value) {
    return (
      fetchedData.value.find(
        (shooter) => String(shooter.fp).toUpperCase() === selectedLane.value,
      ) || null
    )
  }

  return null
})

const displayData = computed(() => {
  const shooter = selectedShooter.value
  if (!shooter) return null

  const rank = Number(shooter.rank)
  const flags = shooter.flags || ''
  const hasShootOff = flags.includes('SP') || flags.includes('ES')

  let leftLabel = `${rank}`
  let leftLabelClass = 'text-gray-200'

  if (rank === 1) {
    leftLabelClass = 'text-[#FFD700]'
  } else if (rank === 2) {
    leftLabelClass = 'text-[#C0C0C0]'
  } else if (rank === 3) {
    leftLabelClass = 'text-[#CD7F32]'
  }

  if (isPresentationMode.value) {
    leftLabel = selectedLane.value
    leftLabelClass = 'text-gray-200'
  }

  let note = ''
  if (customNote.value) {
    note = customNote.value
  } else if (isEliminationMode.value && hasShootOff) {
    note = 'SO'
  }

  const nation = utils.parseClubData(shooter.club).nation
  const alpha2 = utils.convertIocToAlpha2(nation)

  return {
    ...shooter,
    rank,
    nation,
    leftLabel,
    leftLabelClass,
    note,
    flagUrl: utils.countryFlag(alpha2, '4x3'),
    //formattedName: utils.formatName(shooter.name),
    formattedName: shooter.name,
    displayScore: isPresentationMode.value ? qualificationScore.value : shooter.totalScore,
  }
})
</script>

<template>
  <div class="h-full w-full flex justify-center items-end pb-[7.5vh]">
    <div class="w-[90vw] flex justify-center items-end">
      <div v-if="displayData" class="flex items-stretch shadow-lg max-w-[48vw] min-w-[30vw]">
        <!-- RANK / LANE -->
        <div
          class="bg-blue-900/75 flex items-center justify-center rounded-l-[1.2vmin] min-w-[4vw]"
          :class="displayData.leftLabelClass"
        >
          <span class="font-bold text-[2.7vmin] leading-none whitespace-nowrap">
            {{ displayData.leftLabel }}
          </span>
        </div>

        <!-- MAIN CONTENT -->
        <div class="flex flex-col min-w-0 flex-1">
          <!-- TOP ROW -->
          <div
            class="bg-blue-900/80 text-gray-200 flex items-center justify-between gap-[1vw] pr-[1vw] py-[0.7vh] rounded-tr-[1.2vmin] min-w-0"
          >
            <span class="font-bold text-[1.85vmin] leading-none truncate min-w-0 flex-1">
              {{ displayData.formattedName }}
            </span>
            <span class="font-bold text-[1.75vmin] leading-none whitespace-nowrap shrink-0">
              {{ displayData.displayScore }}
            </span>
          </div>

          <!-- BOTTOM ROW -->
          <div
            class="bg-gray-200/80 text-gray-900 flex items-center justify-between gap-[0.5vw] pr-[1vw] rounded-br-[1.2vmin] min-w-0"
          >
            <img
              :src="displayData.flagUrl"
              :alt="`${displayData.nation} flag`"
              class="h-[2.25vmin] shrink-0"
            />
            <div class="flex items-center min-w-0 flex-1">
              <span class="font-bold text-[1.35vmin] leading-none">
                {{ displayData.nation }}
              </span>
            </div>

            <span
              v-if="displayData.note"
              class="font-bold text-[1.35vmin] leading-none whitespace-nowrap shrink-0 text-gray-900"
            >
              {{ displayData.note }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
