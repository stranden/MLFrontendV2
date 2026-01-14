<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useLiveData } from '@/composables/useLiveData.js';

const { fetchedData } = useLiveData('fp');
const route = useRoute(); // <-- This is now your source of truth

// These are computed and reactive, and will always match the URL query
const logos = computed(() =>
  route.query.logos
    ? (typeof route.query.logos === 'string' ? route.query.logos.split(',') : [])
    : []
);
const title = computed(() => route.query.title || 'TITLE');
const discipline = computed(() => route.query.discipline || 'DISCIPLINE');
</script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <div class="w-[60vw] h-[60vh] flex justify-center">
      <div class="bg-white/50 rounded-lg h-full w-full flex flex-col px-[2vw] py-[2vh]">
        <!-- Header section at top -->
        <div class="grid grid-cols-[auto_1fr] w-full">
          <div v-if="logos && logos.length" class="flex">
            <img
              class="h-[15vh] mr-[1vw]"
              v-for="(logo, index) in logos"
              :key="index"
              :src="`/src/assets/img/logos/${logo}`"
              :alt="`${logo.split('.')[0]}-Logo`"
            />
          </div>
          <div class="flex flex-col text-left">
            <span class="text-[2.5rem] font-bold">{{ title }}</span>
            <span class="text-[2.0rem] font-medium">{{ discipline }}</span>
            <span class="text-[1.25rem] font-normal">{{ status }}Status</span>
          </div>
        </div>
        <!-- Scoreboard content (rest of graphic) -->
        <div class="flex-1 flex justify-center">
          TEST
        </div>
      </div>
    </div>
  </div>
</template>