// src/utils/image. js

// Pre-import all flag SVGs at build time using Vite's glob import
// The ** pattern includes all subfolders (flags/4x3/, flags/1x1/, etc.)
const flagModules = import.meta.glob('@/assets/img/flags/**/*. svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function countryFlag(country, aspect) {
  if (!country) {
    console.warn('[image] No country provided to countryFlag')
    return null
  }

  let key
  if (aspect) {
    key = `/src/assets/img/flags/${aspect}/${country.toLowerCase()}.svg`
  } else {
    console.warn('[image] No aspect ratio provided, defaulting to 4x3')
    key = `/src/assets/img/flags/4x3/${country.toLowerCase()}.svg`
  }

  return flagModules[key] || null
}
