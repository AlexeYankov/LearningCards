export type TableType = {
  bodyCell?: BodyCellType[]
  headCell?: HeadCellType[]
  variant?: string
  className?: string
  tableName?: string
}

export type HeadCellType = {
  headCellName?: string
  svgSizes?: HeadCellSvgType
}
export type BodyCellType = {
  author?: {
    id?: string
    name?: string
  }
  cover?: string
  bodyCellImageAlt?: string
  name?: string
  isPrivate?: boolean
  stars?: Array<string>
  svgs?: HeadCellSvgType[]
  cardsCount?: number
  grade?: number
  updated?: string
}

export type HeadCellSvgType = {
  id: string
}
