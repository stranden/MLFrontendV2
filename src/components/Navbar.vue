<script setup>
import { ref } from 'vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import Logo from './Logo.vue'
import NavbarItem from './NavbarItem.vue'

const navItems = ref([
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'TV Graphics',
    groups: [
      {
        heading: '10m',
        items: [
          { name: 'Individual', href: '/broadcast/10m/individual' },
          { name: 'Scoreboard', href: '/broadcast/10m/individual/scoreboard' },
          { name: 'Mixed', href: '/broadcast/10m/mixed' },
          { name: 'Team', href: '/broadcast/10m/team' },
        ],
      },
      {
        heading: '50m',
        items: [
          { name: 'Individual', href: '/broadcast/50m/individual' },
          { name: 'Scoreboard', href: '/broadcast/50m/individual/scoreboard' },
        ],
      },
      {
        heading: 'System',
        items: [{ name: 'Settings', href: '/broadcast/settings' }],
      },
    ],
  },
])
</script>

<template>
  <nav class="navbar bg-base-100 shadow-sm px-4 flex items-center justify-between z-20">
    <!-- Left side: logo + nav links -->
    <div class="flex items-center">
      <router-link to="/" class="btn btn-ghost normal-case text-xl flex items-center">
        <Logo class="w-8 h-8" />
        MLFrontend
      </router-link>
      <ul class="menu menu-horizontal flex items-center">
        <NavbarItem v-for="item in navItems" :key="item.name" :item="item" />
      </ul>
    </div>
    <!-- Right side: ThemeSwitcher -->
    <div>
      <ThemeSwitcher />
    </div>
  </nav>
</template>
