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

export const columns: Column[] = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'cardsCount',
    title: 'Cards',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'author.name',
    title: 'Created by',
    sortable: true,
  },
  {
    key: 'actions',
    title: '',
    sortable: false,
  },
]
