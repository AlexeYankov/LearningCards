export type TableType = {
  bodyCell?: BodyCellType[]
  headCell?: HeadCellType[]
  padding?: string
  variant?: string
  width?: string
}

export type HeadCellType = {
  headCellName?: string
  id: string
  svgSizes?: HeadCellSvgType
  width?: string
}
export type BodyCellType = {
  bodyCellImage?: string
  bodyCellImageAlt?: string
  bodyCellName?: string
  checkBox?: boolean
  id: string
  stars?: Array<string>
  svgs?: HeadCellSvgType[]
  width?: string
}

export type HeadCellSvgType = {
  height?: string
  id: string
  uniqId: string
  viewBox?: string
  width?: string
}
