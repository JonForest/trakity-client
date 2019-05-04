/**
 * Takes a date, defaulting to today, and returns the midnight (00:00:00 start of day) version of that date
 * @param {Date|number|null} date
 * @returns {Date}
 */
function getStartOfDay (date = new Date()) {
  if (typeof date === 'number') date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return new Date(year, month, day, 0, 0, 0)
}

/**
 * Returns an ISO format date string, but local to your timezone (i.e. does not convert back to UTC)
 * @param {Date} date
 * @returns {string}
 */
function getISOFormatLocalDateString (date = new Date()) {
  if (typeof date === 'number') date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return `${year}-${month + 1}-${day}`
}

/**
 * Takes a localised ISO format date string, and turns it into a local midnight date
 * @param localISODateString
 * @returns {Date}
 */
function getLocalDateFromString (localISODateString) {
  const dateParts = localISODateString.split('-')
  if (dateParts.length !== 3) return getStartOfDay()
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
}

export { getStartOfDay, getISOFormatLocalDateString, getLocalDateFromString }
