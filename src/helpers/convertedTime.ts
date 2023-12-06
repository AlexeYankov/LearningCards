/**
 * Преобразует время в формат даты и времени.
 * @param time - Время для преобразования.
 * @returns Преобразованное время в формате "дд.мм.гггг чч:мм".
 */
export const convertedTime = (time: string) => {
  const currentData = new Date(time || 0)
  const currentDay = currentData.getDate().toString().padStart(2, '0')
  const currentMonth = (currentData.getMonth() + 1).toString().padStart(2, '0')
  const currentYear = currentData.getFullYear().toString()
  const formattedHours = currentData.getHours().toString().padStart(2, '0')
  const formattedMinutes = currentData.getMinutes().toString().padStart(2, '0')

  const convertTimeTo = `${formattedHours}:${formattedMinutes}`
  const convertDateTo = `${currentDay}.${currentMonth}.${currentYear}`

  return [convertDateTo, ' ', convertTimeTo].join('')
}
