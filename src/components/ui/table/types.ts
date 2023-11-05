import { CardsResponsType } from '@/api/common.api.ts'

export type TableType = {
  bodyCell?: BodyCellType[]
  className?: string
  decks?: CardsResponsType[]
  headCell?: HeadCellType[]
  tableName?: string
  totalItems?: number
}

export type HeadCellType = {
  headCellName?: string
  svgSizes?: HeadCellSvgType
}
export type BodyCellType = {
  answer?: string
  author?: {
    id?: string
    name?: string
  }
  bodyCellImageAlt?: string
  cardsCount?: string
  cover?: string
  grade?: number
  id?: string
  isPrivate?: boolean
  name?: string
  question?: string
  stars?: Array<string>
  svgs?: HeadCellSvgType[]
  updated?: string
}

export type HeadCellSvgType = {
  id: string
}
