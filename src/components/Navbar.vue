<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ThemeSwitcher from './ThemeSwitcher.vue'
import Logo from './Logo.vue'

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
    <div class="flex-1">
      <router-link to="/" class="btn btn-ghost normal-case text-xl">
        <Logo class="w-8 h-8 mr-1" />
        MLFrontend
      </router-link>
    </div>
    <div class="flex-none">
      <div class="menu menu-horizontal">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.href"
          :class="['btn btn-ghost', isActive(item.href) ? 'btn-active' : '']"
        >
          {{ item.name }}
        </router-link>
        <!-- Theme switcher -->
        <ThemeSwitcher />
      </div>
    </div>
  </div>
</template>
