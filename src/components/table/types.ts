export type TableType = {
  padding?: string
  width?: string
  headCell?: HeadCellType[]
  bodyCell?: BodyCellType[]
  variant?: string
}

export type HeadCellType = {
  id: string
  headCellName?: string
  svgSizes?: HeadCellSvgType
  width?: string
}
export type BodyCellType = {
  id: string
  bodyCellName?: string
  bodyCellImage?: string
  bodyCellImageAlt?: string
  svgs?: HeadCellSvgType[]
  width?: string
  checkBox?: boolean
  stars?: Array<string>
  
}

export type HeadCellSvgType = {
  height?: string
  width?: string
  viewBox?: string
  id: string
  uniqId: string
}
