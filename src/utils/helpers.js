// src/utils/helpers.js

/**
 * Splits a club string into nation and club name
 * Example: "DEN, DSB/ASF" → { nation: "DEN", club: "DSB/ASF" }
 */
export function parseClubData(clubString) {
  if (!clubString) {
    return { nation: '', club: '' }
  }

  const parts = clubString.split(',').map((part) => part.trim())

  if (parts.length >= 2) {
    const nation = parts[0]
    const club = parts.slice(1).join(', ').substring(0, 23).trim()
    return {
      nation: nation.toUpperCase(),
      club: club.toUpperCase(),
    }
  } else {
    const firstWord = clubString.split(' ')[0]
    return {
      nation: clubString.toUpperCase(),
      club: firstWord.toUpperCase(),
    }
  }
}
