<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'

// Reactive data
const welcomeMessage = ref('Welcome to ML Frontend')
const welcomeSubMessage = ref('Your one-stop solution for broadcast graphics')
const features = ref([
  {
    id: 1,
    title: 'Fast Performance',
    description: 'Built with Vue 3 and optimized for speed',
    icon: '⚡',
  },
  {
    id: 2,
    title: 'Modern Design',
    description: 'Beautiful UI crafted with TailwindCSS',
    icon: '🎨',
  },
  {
    id: 3,
    title: 'Easy to Use',
    description: 'Intuitive interface and smooth user experience',
    icon: '✨',
  },
])

const isLoaded = ref(false)

// Methods
const handleGetStarted = () => {
  console.log('Getting started clicked!')
  // Add your navigation logic here
}

// Lifecycle
onMounted(() => {
  isLoaded.value = true
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Navigation -->
    <Navbar />

    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-12">
      <div class="text-center mb-16">
        <div
          class="transition-all duration-1000"
          :class="
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          "
        >
          <h1 class="text-3xl md:text-6xl font-bold text-gray-800 mb-6">
            {{ welcomeMessage }}
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {{ welcomeSubMessage }}
          </p>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(feature, index) in features"
          :key="feature.id"
          class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center transform hover:-translate-y-2"
          :style="{ animationDelay: `${index * 200}ms` }"
          :class="isLoaded ? 'animate-fade-in-up' : 'opacity-0'"
        >
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-16">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div class="space-y-2">
            <div class="text-3xl font-bold text-blue-600">100+</div>
            <div class="text-gray-600">Components</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-green-600">99.9%</div>
            <div class="text-gray-600">Uptime</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-purple-600">24/7</div>
            <div class="text-gray-600">Support</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-orange-600">1000+</div>
            <div class="text-gray-600">Users</div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 class="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p class="text-xl mb-6 opacity-90">
            Join thousands of developers building amazing applications.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Learn More
            </button>
            <button
              class="border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}
</style>
