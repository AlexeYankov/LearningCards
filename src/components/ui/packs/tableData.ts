import { Column, HeadCellType } from '@/components/ui/table/types.ts'

const columns: Column[] = [
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
    title: 'Author',
    sortable: true,
  },
  {
    key: 'actions',
    title: '',
  },
]

export const tableHeadData: HeadCellType = {
  columns,
}
