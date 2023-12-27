export type Column = {
  title: string
  key: string
  sortable?: boolean
}

export type SortDescriptionType = `${string}-desc` | `${string}-asc` | null

export type Sort = {
  key: string
  direction: SortDescriptionType
} | null
