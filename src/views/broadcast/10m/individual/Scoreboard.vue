<script setup>
import { computed } from 'vue'
import { useLiveData } from '@/composables/useLiveData.js'

import * as utils from '@/utils'

const { fetchedData, title, discipline, logos } = useLiveData('fp')

const participantsWithNotes = computed(() => {
  if (!fetchedData.value) return []

  // Step 1: Sort participants by totalScore descending.
  // On equal scores, place SP shooters after non-SP shooters so shoot-off losers come second.
  const participants = [...fetchedData.value].sort((a, b) => {
    const scoreDiff = parseFloat(b.totalScore) - parseFloat(a.totalScore)
    if (scoreDiff !== 0) return scoreDiff

    const aFlags = a.flags || ''
    const bFlags = b.flags || ''

    const aHasSP = aFlags.includes('SP')
    const bHasSP = bFlags.includes('SP')

    if (aHasSP && !bHasSP) return 1
    if (!aHasSP && bHasSP) return -1
    return 0
  })

  // Step 2: Assign ranks.
  // Normal ties use competition ranking: 1,2,3,4,4,6...
  // If the lower shooter in a same-score pair has SP, the tie is resolved against them:
  // 1,2 or 4,5 etc.
  for (let i = 0; i < participants.length; i++) {
    if (i === 0) {
      participants[i].rank = 1
      continue
    }

    const current = participants[i]
    const previous = participants[i - 1]

    const currentScore = parseFloat(current.totalScore)
    const previousScore = parseFloat(previous.totalScore)
    const sameScoreAsPrevious = currentScore === previousScore

    const currentFlags = current.flags || ''
    const currentHasSP = currentFlags.includes('SP')

    const isResolvedShootOffLoser = sameScoreAsPrevious && currentHasSP

    if (isResolvedShootOffLoser) {
      current.rank = previous.rank + 1
    } else if (sameScoreAsPrevious) {
      current.rank = previous.rank
    } else {
      current.rank = i + 1
    }
  }

  // Step 3: Calculate remaining shooters (for gold determination)
  const remainingShooters = participants.filter((p) => {
    const flags = p.flags || ''
    return !flags.includes('E') && !flags.includes('ES') && !flags.includes('P')
  })

  // Step 4: Assign notes to each participant
  const result = participants.map((participant, index) => {
    const flags = participant.flags || ''
    const hasT = flags.includes('T')
    const isEliminated = flags.includes('E') || flags.includes('ES') || flags.includes('P')

    let notes = { type: 'none' }

    if (remainingShooters.length === 1 && remainingShooters[0] === participant) {
      notes = { type: 'medal', medal: 'gold', rank: 1, text: 'GOLD' }
    } else if (isEliminated) {
      if (participant.rank === 2) {
        notes = { type: 'medal', medal: 'silver', rank: 2, text: 'SILVER' }
      } else if (participant.rank === 3) {
        notes = { type: 'medal', medal: 'bronze', rank: 3, text: 'BRONZE' }
      } else {
        notes = { type: 'medal', medal: 'place', rank: participant.rank, text: 'PLACE' }
      }
    } else if (hasT) {
      notes = { type: 'shootoff', text: 'SHOOT OFF' }
    } else if (index > 0) {
      const currentScore = parseFloat(participant.totalScore)
      const aboveScore = parseFloat(participants[index - 1].totalScore)
      if (currentScore !== aboveScore) {
        notes = { type: 'difference', text: (aboveScore - currentScore).toFixed(1) }
      }
    }

    return { ...participant, notes }
  })

  console.log('[Scoreboard] participantsWithNotes:', result)

  return result
})

// Status computed property
const status = computed(() => {
  if (!fetchedData.value || fetchedData.value.length === 0) return ''

  const highestMatchShotCount = Math.max(...fetchedData.value.map((p) => p.matchShotCount))
  const maxMatchSize = Math.max(...fetchedData.value.map((p) => p.matchSize))

  if (highestMatchShotCount === maxMatchSize) {
    return `Final standings after ${highestMatchShotCount} shots`
  }

  //return `Standing${highestMatchShotCount > 1 ? 's' : ''} after ${highestMatchShotCount} shot${highestMatchShotCount > 1 ? 's' : ''}`
  return `Stillingen efter ${highestMatchShotCount} skud`
})
</script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <div class="w-[60vw] h-[60vh] flex justify-center">
      <div class="bg-gray-500/80 rounded-lg h-full w-full flex flex-col px-[2vw] py-[2vh]">
        <!-- Header section -->
        <div class="flex items-center w-full">
          <!-- LEFT: Logos -->
          <div class="flex items-center shrink-0">
            <img
              v-for="(logo, index) in logos"
              :key="index"
              class="h-[12vmin] mr-[1vw] shrink-0"
              :src="`/src/assets/img/logos/${logo}`"
              :alt="`${logo.split('.')[0]}-Logo`"
            />
            <!-- Spacer for consistent width when only one logo -->
            <div v-if="logos.length === 1" class="w-[7vmin] shrink-0"></div>
          </div>

          <!-- CENTER: Title block -->
          <div class="flex-1 flex justify-between">
            <div class="flex flex-col text-left">
              <span class="text-[3.0vmin] text-gray-300 font-bold truncate">
                {{ title }}
              </span>
              <span class="text-[2.5vmin] text-gray-200 font-medium truncate">
                {{ discipline }}
              </span>
              <span class="text-[2.0vmin] text-gray-200 font-normal">
                {{ status }}
              </span>
            </div>
          </div>
        </div>
        <!-- Scoreboard content -->
        <div class="w-full">
          <div
            v-for="participant in participantsWithNotes"
            :key="participant.name"
            class="grid grid-cols-[0.5fr_3fr_1fr_1fr] items-center gap-[2vmin] p-[1vmin] my-[0.3vmin] border-b border-gray-300 last:border-b-0"
          >
            <!-- Rank -->
            <div
              class="flex items-center justify-center rounded-[1.5vmin] bg-blue-950 text-gray-200 font-bold text-[2vmin] w-[3vmin] h-[3vmin]"
            >
              {{ participant.rank }}
            </div>

            <!-- Name + Nation -->
            <div
              class="flex items-center rounded-[1.5vmin] bg-blue-950 text-gray-200 h-[3vmin] gap-[1.5vmin]"
            >
              <img
                :src="`${utils.countryFlag(
                  utils.convertIocToAlpha2(utils.parseClubData(participant.club).nation),
                  '4x3',
                )}`"
                alt="nation"
                class="rounded-l-[1.5vmin] h-[3vmin]"
              />
              <span class="font-bold text-[2vmin] flex">
                <!--{{ utils.formatName(participant.name) }}-->
                {{ participant.name }}
              </span>
            </div>

            <!-- Total Score -->
            <div class="flex items-center justify-center text-[2vmin] font-bold text-gray-200">
              <div
                class="flex items-center justify-center bg-blue-950 w-[10vmin] h-[3vmin] rounded-[1.5vmin]"
              >
                {{ participant.totalScore }}
              </div>
            </div>

            <!-- Notes -->
            <div class="h-[3vmin] w-full">
              <!-- Medal (Gold/Silver/Bronze/Place) -->
              <template v-if="participant.notes.type === 'medal'">
                <div class="inline-flex items-center bg-blue-950 h-full rounded-[1.5vmin] w-full">
                  <div
                    class="flex items-center justify-center font-bold text-[2vmin] w-[3vmin] h-full rounded-l-[1.5vmin]"
                    :class="{
                      'text-[#FFD700]': participant.notes.rank === 1,
                      'text-[#C0C0C0]': participant.notes.rank === 2,
                      'text-[#CD7F32]': participant.notes.rank === 3,
                      'text-gray-500': participant.notes.rank >= 4,
                    }"
                  >
                    {{ participant.notes.rank }}
                  </div>
                  <div
                    class="flex-1 text-center font-bold text-[2vmin] -ml-[1.5vmin]"
                    :class="{
                      'text-[#FFD700]': participant.notes.medal === 'gold',
                      'text-[#C0C0C0]': participant.notes.medal === 'silver',
                      'text-[#CD7F32]': participant.notes.medal === 'bronze',
                      'text-gray-500': participant.notes.medal === 'place',
                    }"
                  >
                    {{ participant.notes.text }}
                  </div>
                </div>
              </template>

              <!-- Shoot Off or Difference -->
              <template
                v-else-if="
                  participant.notes.type === 'shootoff' || participant.notes.type === 'difference'
                "
              >
                <div class="inline-flex items-center bg-blue-950 h-full rounded-[1.5vmin] w-full">
                  <div class="w-full text-center font-bold text-gray-500 text-[2vmin]">
                    {{ participant.notes.text }}
                  </div>
                </div>
              </template>

              <!-- Hidden (first place with no info, or tied scores) -->
              <template v-else>
                <div class="h-full w-full"></div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
