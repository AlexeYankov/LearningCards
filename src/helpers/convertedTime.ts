export const convertedTime = (time: string) => {
  const currentData = new Date(time || 0)
  const currentDay =
    currentData.getDate() < 10 ? '0' + currentData.getDate() : currentData.getDate()
  let currentMonth = currentData.getMonth() + 1
  let formattedMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth.toString()

  const convertTimeTo = [currentDay, formattedMonth, currentData.getFullYear()].join('.')

  return convertTimeTo
}
