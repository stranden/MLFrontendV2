<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLiveData } from '@/composables/useLiveData.js'

const { fetchedData } = useLiveData('fp')
const route = useRoute() // <-- This is now your source of truth

// Sorted participants computed property
const sortedParticipants = computed(() => {
  if (!fetchedData.value) return []

  // Step 1: Sort participants by totalScore descending, SP shooters last on ties
  const participants = [...fetchedData.value].sort((a, b) => {
    const scoreDiff = parseFloat(b.totalScore) - parseFloat(a.totalScore)
    if (scoreDiff !== 0) return scoreDiff

    // SP prioritization: non-SP first
    if (a.flags.includes('SP') && !b.flags.includes('SP')) return 1
    if (!a.flags.includes('SP') && b.flags.includes('SP')) return -1
    return 0
  })

  // Step 2: Assign ranks, handling gold/silver tiebreaker
  let rank = 1
  for (let i = 0; i < participants.length; i++) {
    if (i > 0 && participants[i].totalScore === participants[i - 1].totalScore) {
      participants[i].rank = participants[i - 1].rank

      // Gold/Silver tiebreaker: Assign rank 2 to SP shooter if tied for 1st
      if (participants[i - 1].rank === 1 && participants[i].flags.includes('SP')) {
        participants[i].rank = 2
      }
    } else {
      participants[i].rank = rank
    }

    // Update next rank
    rank = participants[i].rank + 1
  }

  console.log('[Scoreboard] Logging output from sortedParticipants: ', participants)
  return participants
})

// Status computed property
const status = computed(() => {
  if (!fetchedData.value || fetchedData.value.length === 0) return ''

  const highestMatchShotCount = Math.max(...fetchedData.value.map((p) => p.matchShotCount))
  const maxMatchSize = Math.max(...fetchedData.value.map((p) => p.matchSize))

  if (highestMatchShotCount === maxMatchSize) {
    return `Final standings after ${highestMatchShotCount} shots`
  }

  return `Standing${highestMatchShotCount > 1 ? 's' : ''} after ${highestMatchShotCount} shot${highestMatchShotCount > 1 ? 's' : ''}`
})

// These are computed and reactive, and will always match the URL query
const logos = computed(() =>
  route.query.logos
    ? typeof route.query.logos === 'string'
      ? route.query.logos.split(',')
      : []
    : [],
)
const title = computed(() => route.query.title || 'TITLE')
const discipline = computed(() => route.query.discipline || 'DISCIPLINE')
</script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <div class="w-[60vw] h-[60vh] flex justify-center">
      <div class="bg-white/50 rounded-lg h-full w-full flex flex-col px-[2vw] py-[2vh]">
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
          </div>

          <!-- CENTER: Title block -->
          <div class="flex-1 flex justify-between">
            <div class="flex flex-col text-left">
              <span class="text-[3.0vmin] font-bold truncate">
                {{ title }}
              </span>
              <span class="text-[2.5vmin] font-medium truncate">
                {{ discipline }}
              </span>
              <span class="text-[2.0vmin] font-normal">
                {{ status }}
              </span>
            </div>
          </div>
        </div>
        <!-- Scoreboard content (rest of graphic) -->
        <div class="w-full">
          <!-- Example scoreboard layout -->
          <div
            v-for="(participant, index) in sortedParticipants"
            :key="participant.name"
            class="grid grid-cols-[1fr_3fr_1fr_1fr] items-center gap-[2vmin] p-[1vmin] my-[0.3vmin] border-b border-gray-300 last:border-b-0"
          >
            <!-- Rank -->
            <div
              class="flex items-center justify-center rounded-[1.5vmin] bg-[#00004b] text-[#e6e6e6] font-bold text-[2vmin] w-[3vmin] h-[3vmin]"
            >
              {{ participant.rank }}
            </div>

            <!-- Name + Nation -->
            <div
              class="flex items-center rounded-[1.5vmin] bg-[#00004b] text-[#888] h-[3vmin] gap-[1.5vmin]"
            >
              <img
                src="`@/assets/img/flags/4x3/dk.svg`"
                alt="nation"
                class="rounded-l-[1.5vmin] h-[3vmin]"
              />

              <!--<span class="h-[3vmin] w-[3vmin] rounded-[25%]">{{ participant.club }}</span>-->
              <span class="font-bold text-[2vmin] flex">{{ participant.name }}</span>
            </div>

            <!-- Total Score -->
            <div class="flex items-center justify-center text-[2vmin] font-bold text-[#e6e6e6]">
              <div
                class="flex items-center justify-center bg-[#00004b] w-[10vmin] h-[3vmin] rounded-[1.5vmin]"
              >
                {{ participant.totalScore }}
              </div>
            </div>

            <!-- Notes -->
            <div
              class="inline-flex items-center bg-[rgba(0,0,75,0.825)] h-[3vmin] rounded-[1.5vmin] w-full"
            >
              <div class="w-full text-center font-bold text-[#888] text-[2vmin]">
                <span class="font-bold text-[#888] text-[2vmin]"> SCORE </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
