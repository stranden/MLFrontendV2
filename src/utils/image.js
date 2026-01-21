// src/utils/image. js

const flagModules = import.meta.glob('../assets/img/flags/**/*.svg', {
  eager: true,
  as: 'url',
})

export function countryFlag(country, aspect) {
  if (!country) {
    console.warn('[image] No country provided to countryFlag')
    return null
  }

  const key = `../assets/img/flags/${aspect || '4x3'}/${country.toLowerCase()}.svg`

  return flagModules[key] || null
}
