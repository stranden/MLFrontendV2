<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

// Vue Router composables
const route = useRoute()

// Navigation items
const navItems = ref([
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
])

// Refs for sliding indicator
const navContainer = ref(null)
const indicator = ref(null)

// Computed: Check if item is active based on current route
const isActive = (href) => {
  return route.path === href
}

// Find active item index
const getActiveIndex = () => {
  return navItems.value.findIndex((item) => isActive(item.href))
}

// Update indicator position immediately without transition
const updateIndicatorImmediate = (index) => {
  if (!indicator.value || !navContainer.value) return

  const navLinks = navContainer.value.querySelectorAll('.nav-link')
  if (navLinks[index]) {
    const link = navLinks[index]
    const navbarRect = document.querySelector('nav > div').getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()

    const left = linkRect.left - navbarRect.left
    const width = linkRect.width

    // Temporarily disable transitions
    indicator.value.style.transition = 'none'
    indicator.value.style.transform = `translateX(${left}px)`
    indicator.value.style.width = `${width}px`
    indicator.value.style.opacity = '1'

    // Re-enable transitions after a brief delay
    setTimeout(() => {
      if (indicator.value) {
        indicator.value.style.transition = 'all 0.3s ease-out'
      }
    }, 50)
  }
}

// Update indicator position with transition
const updateIndicator = (index) => {
  if (!indicator.value || !navContainer.value) return

  const navLinks = navContainer.value.querySelectorAll('.nav-link')
  if (navLinks[index]) {
    const link = navLinks[index]
    const navbarRect = document.querySelector('nav > div').getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()

    const left = linkRect.left - navbarRect.left
    const width = linkRect.width

    indicator.value.style.transform = `translateX(${left}px)`
    indicator.value.style.width = `${width}px`
    indicator.value.style.opacity = '1'
  }
}

// Handle mouse enter on nav item
const handleMouseEnter = (index) => {
  updateIndicator(index)
}

// Handle mouse leave - return to active item
const handleMouseLeave = () => {
  const activeIndex = getActiveIndex()
  if (activeIndex !== -1) {
    updateIndicator(activeIndex)
  } else {
    // Hide indicator if no active item
    if (indicator.value) {
      indicator.value.style.opacity = '0'
    }
  }
}

// Watch for route changes and update indicator immediately
watch(
  () => route.path,
  async () => {
    await nextTick()
    const activeIndex = getActiveIndex()
    if (activeIndex !== -1) {
      updateIndicatorImmediate(activeIndex)
    }
  },
)

// Initialize indicator position
onMounted(async () => {
  await nextTick()
  const activeIndex = getActiveIndex()
  if (activeIndex !== -1) {
    updateIndicatorImmediate(activeIndex)
  }
})
</script>

<template>
  <nav>
    <div class="relative py-2.5 bg-gray-100 shadow-md">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <div
          class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold"
        >
          ML
        </div>
        <div ref="navContainer" class="space-x-6" @mouseleave="handleMouseLeave">
          <a
            v-for="(item, index) in navItems"
            :key="item.name"
            :href="item.href"
            class="nav-link text-gray-700 hover:text-blue-600 transition-colors duration-200"
            :class="{ 'text-blue-600': isActive(item.href) }"
            @mouseenter="handleMouseEnter(index)"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
      <!-- Sliding indicator positioned at bottom of navbar -->
      <div
        ref="indicator"
        class="absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out opacity-0"
        style="transform: translateX(0px); width: 0px"
      ></div>
    </div>
  </nav>
</template>
