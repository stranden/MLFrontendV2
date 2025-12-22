import { ref, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  // Initialize theme based on system preference or saved preference
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = systemPrefersDark
    }

    updateTheme()
  }

  // Update the actual theme
  const updateTheme = () => {
    const theme = isDark.value ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

  // Initialize theme on composable use
  onMounted(() => {
    initializeTheme()

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches
        updateTheme()
      }
    })
  })

  return {
    isDark,
    toggleTheme,
    initializeTheme,
  }
}
