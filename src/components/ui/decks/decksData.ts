import { Column } from '@/components/ui/table/types.ts'

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
