<script setup>
import { useRoute, RouterLink } from 'vue-router'

const props = defineProps({
  item: { type: Object, required: true },
})
const route = useRoute()
</script>

<template>
  <li class="relative">
    <!-- Mega menu dropdown with horizontal grouping and wrapping -->
    <template v-if="item.groups">
      <div class="dropdown dropdown-hover hover:bg-base-300 rounded">
        <label tabindex="0" class="cursor-pointer flex items-center rounded">
          {{ item.name }}
          <svg
            class="ml-1 w-3 h-3 opacity-60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </label>
        <div
          tabindex="0"
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
    <!-- Regular root nav link -->
    <template v-else>
      <RouterLink
        :to="item.href"
        class="hover:bg-base-300 px-4 py-2 rounded"
        :class="route.path === item.href ? 'font-semibold' : ''"
        >{{ item.name }}</RouterLink
      >
    </template>
  </li>
</template>
