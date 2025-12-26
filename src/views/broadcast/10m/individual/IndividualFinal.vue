<script setup>
// Sample data for 8 shooters
const shooters = [
  { rank: 1, name: 'HANSEN', country: 'DEN', score: 249.8, active: false },
  { rank: 2, name: 'SMITH', country: 'USA', score: 249.1, active: false },
  { rank: 3, name: 'MÜLLER', country: 'GER', score: 248.7, active: false },
  { rank: 4, name: 'LÓPEZ', country: 'ESP', score: 247.9, active: false },
  { rank: 5, name: 'CHEN', country: 'CHN', score: 247.3, active: false },
  { rank: 6, name: 'ROSSI', country: 'ITA', score: 246.8, active: false },
  { rank: 7, name: 'DUBOIS', country: 'FRA', score: 246.2, active: false },
  { rank: 8, name: 'YAMADA', country: 'JPN', score: 245.5, active: false },
]
</script>

<template>
  <!-- Bottom graphic container - anchored to bottom -->
  <div class="h-full flex justify-center items-end pb-[5vh]">
    <!-- Bottom graphic content area within TV safe area -->
    <div class="w-[90vw] flex flex-col gap-[1vh] items-center">
      <!-- 8 shooter boxes in a row -->
      <div class="w-full flex gap-[1vw] justify-around">
        <div
          v-for="shooter in shooters"
          :key="shooter.rank"
          :class="[
            'flex-1 flex flex-col text-white rounded-lg py-[1vh] px-[0.5vw] transition-all duration-300',
            shooter.active
              ? 'bg-yellow-600 bg-opacity-90 transform scale-105'
              : 'bg-black bg-opacity-80',
          ]"
        >
          <!-- Rank -->
          <div class="text-[1.2vw] font-bold text-gray-300">{{ shooter.rank }}</div>

          <!-- Name -->
          <div class="text-[1.5vw] font-bold text-center leading-tight">{{ shooter.name }}</div>

          <!-- Country -->
          <div class="text-[1vw] text-gray-300">{{ shooter.country }}</div>

          <!-- Score -->
          <div
            :class="[
              'text-[1.8vw] font-bold mt-[0.5vh]',
              shooter.active ? 'text-black' : 'text-yellow-400',
            ]"
          >
            {{ shooter.score }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
