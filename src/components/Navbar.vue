<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ThemeSwitcher from './ThemeSwitcher.vue'

// Vue Router composables
const route = useRoute()

// Navigation items
const navItems = ref([
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
])

// Computed: Check if item is active based on current route
const isActive = (href) => {
  return route.path === href
}
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <a class="btn btn-ghost text-xl">ML Frontend</a>
    <div class="flex-1"></div>
    <div class="menu menu-horizontal px-1">
      <a
        v-for="item in navItems"
        :key="item.name"
        :href="item.href"
        :class="['btn btn-ghost', isActive(item.href) ? 'btn-active' : '']"
      >
        {{ item.name }}
      </a>
      <!-- Theme switcher -->
      <ThemeSwitcher />
    </div>
  </div>
</template>
