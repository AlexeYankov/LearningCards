export type TableType = {
  bodyCell?: BodyCellType[]
  className?: string
  headCell?: HeadCellType
  tableName?: string
  isMyDeck?: boolean
}

export type Column = {
  title: string
  key: string
  sortable?: boolean
}

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export type HeadCellType = {
  columns: Column[]
  sort?: Sort
  onSort?: (sort: Sort) => void
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
  updated?: string
  packName?: string
  userId?: string
}
