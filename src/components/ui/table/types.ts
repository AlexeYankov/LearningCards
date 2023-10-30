export type TableType = {
  bodyCell?: BodyCellType[]
  headCell?: HeadCellType[]
  variant?: string
}

export type HeadCellType = {
  headCellName?: string
  svgSizes?: HeadCellSvgType
}
export type BodyCellType = {
  bodyCellImage?: string
  bodyCellImageAlt?: string
  bodyCellName?: string
  checkBox?: boolean
  stars?: Array<string>
  svgs?: HeadCellSvgType[]
}

export type HeadCellSvgType = {
  id: string
}
