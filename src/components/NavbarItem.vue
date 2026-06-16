<script setup>
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const props = defineProps({
  item: { type: Object, required: true },
})

const route = useRoute()
const isOpen = ref(false)
</script>

<template>
  <li class="relative">
    <template v-if="item.groups">
      <div
        class="dropdown dropdown-hover hover:bg-base-300 rounded"
        @mouseenter="isOpen = true"
        @mouseleave="isOpen = false"
      >
        <label class="cursor-pointer items-center rounded px-4 py-2">
          {{ item.name }}
        </label>

        <div
          v-show="isOpen"
          class="dropdown-content bg-base-100 rounded-box shadow mt-2 p-4 w-[400px] left-0 flex flex-wrap gap-4 z-30"
          role="menu"
        >
          <template v-for="group in item.groups" :key="group.heading || group.items[0].name">
            <div class="flex-1 min-w-[150px] max-w-[180px]">
              <div
                v-if="group.heading"
                class="uppercase text-xs font-bold text-base-content/60 mb-1 pl-1"
              >
                {{ group.heading }}
              </div>
              <ul class="flex flex-col gap-1">
                <li v-for="entry in group.items" :key="entry.name">
                  <RouterLink
                    :to="entry.href"
                    class="block px-3 py-1 rounded hover:bg-base-300"
                    :class="route.path === entry.href ? 'font-semibold' : ''"
                    role="menuitem"
                  >
                    {{ entry.name }}
                  </RouterLink>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </template>

    <template v-else>
      <RouterLink
        :to="item.href"
        class="hover:bg-base-300 px-4 py-2 rounded"
        :class="route.path === item.href ? 'font-semibold' : ''"
      >
        {{ item.name }}
      </RouterLink>
    </template>
  </li>
</template>
