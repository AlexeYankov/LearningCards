import { BodyCellType } from '../types'

type BodyCellHOCType = {
  item: BodyCellType
  tableName: string
  isMyDeck?: boolean
}

export const BodyCellHOC = ({}: BodyCellHOCType) => {
  // const currentData = new Date(item.updated || 0)
  // const currentDay =
  //   currentData.getDate() < 10 ? '0' + currentData.getDate() : currentData.getDate()
  // let currentMonth = currentData.getMonth() + 1
  // let formattedMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth.toString()
  //
  // const convertTimeTo = [currentDay, formattedMonth, currentData.getFullYear()].join('.')

  return <></>
}
