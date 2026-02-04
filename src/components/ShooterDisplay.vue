<script setup>
import Target from '@/components/Target.vue'
import * as utils from '@/utils'

const props = defineProps({
  shooter: {
    type: Object,
    required: true,
  },
  widthClass: {
    type: String,
    default: 'w-[20vw] min-w-[20vw] max-w-[20vw]',
  },
  targetClass: {
    type: String,
    default: '',
  },
})

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

function getClubNationClass(flags) {
  return [
    flags === 'T' && 'z-20 rounded-b-lg bg-green-400',
    (flags === 'P' || flags === 'SP') && 'z-20 rounded-br-lg bg-red-400',
  ]
}
</script>

<template>
  <div
    class="relative bg-white/10 rounded-lg transition-all duration-300 ease-in-out"
    :class="[widthClass]"
  >
    <!-- TARGET COMPONENT -->
    <Target
      :targetName="shooter.targetId"
      :shotData="extractShotsForShooter(shooter)"
      :flags="shooter.flags"
      :class="targetClass"
    />

    <!-- SCORE TOP RIGHT -->
    <div class="relative bg-gray-200/50 text-gray-400 rounded-tr-lg">
      <div
        class="relative left-[4vw] w-[calc(100%-4vw)] h-[1.5vh] flex justify-center items-center text-[0.7rem] font-semibold italic"
      >
        SCORE
      </div>
    </div>

    <!-- SHOT VALUE -->
    <div class="relative bg-blue-900/80 text-gray-300">
      <div
        class="relative left-[4vw] w-[calc(100%-4vw)] h-[2.5vh] flex justify-center items-center text-[1.25rem] font-bold"
      >
        {{ shooter.shots?.length > 0 ? shooter.shots[shooter.shots.length - 1].vd : '0.0' }}
      </div>
    </div>

    <!-- TOTAL SCORE -->
    <div class="relative bg-blue-900 text-gray-100">
      <div
        class="relative left-[4vw] w-[calc(100%-4vw)] h-[2.5vh] flex justify-center items-center text-[1.25rem] font-bold"
      >
        {{ shooter.totalScore }}
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
        {{ utils.formatName(shooter.name) }}
      </div>
    </div>

    <!-- CLUB / NATION -->
    <div
      class="bg-gray-200 rounded-b-lg h-[2vh] flex"
      :class="getClubNationClass(shooter.flags)"
    >
      <img
        :src="
          utils.countryFlag(
            utils.convertIocToAlpha2(utils.parseClubData(shooter.club).nation),
            '4x3',
          )
        "
        alt="nation"
        class="h-[full] rounded-bl-lg"
      /><span class="flex items-center pl-[0.25vw] font-semibold text-[1rem] text-gray-900">{{
        utils.parseClubData(shooter.club).club
      }}</span>
    </div>
  </div>
</template>
