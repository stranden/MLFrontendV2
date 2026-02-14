// src/utils/name.js
export function formatName(name) {
  if (!name || typeof name !== 'string') {
    console.warn('[name] Invalid name provided to formatName:', name)
    return ''
  }

  const nameParts = name.split(' ')
  const lastName = nameParts[0] || ''
  const firstName = nameParts[1] || ''
  const middleNames = nameParts.slice(2)

  const truncateMiddleName = (middleName) => {
    if (middleName.startsWith('Aa') || middleName.startsWith('Ae') || middleName.startsWith('Oe')) {
      return middleName.substring(0, 2) + '.'
    } else if (middleName.length > 0) {
      return middleName[0] + '.'
    } else {
      return ''
    }
  }

  const truncatedFirstName = firstName.length > 1 ? `${firstName[0]}.` : firstName
  const truncatedMiddleNames = middleNames.map(truncateMiddleName).join(' ')
  const truncatedFullName = `${lastName} ${truncatedFirstName} ${truncatedMiddleNames}`.trim()
  const fullNameWithTruncatedMiddleNames = `${lastName} ${firstName} ${truncatedMiddleNames}`.trim()
  const fullName = `${lastName} ${firstName} ${middleNames.join(' ')}`.trim()

  if (lastName.length >= 17) {
    return lastName
  }

  if (fullName.length >= 18 && fullNameWithTruncatedMiddleNames.length <= 18) {
    return fullNameWithTruncatedMiddleNames
  }

  if (fullNameWithTruncatedMiddleNames.length >= 18) {
    return truncatedFullName
  }

  return fullName
}
