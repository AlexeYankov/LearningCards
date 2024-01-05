import { PaginationResponseType } from '@/api/cards'

export type DecksType = {
  items: ResponseDeckType[]
  maxCardsCount: number
  pagination: PaginationResponseType
}
export type ResponseDeckTypeItemsAuthor = {
  id: string
  name: string
}
export type ResponseDeckType = {
  author: ResponseDeckTypeItemsAuthor
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}
export type DeleteDeckResponseType = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}
export type UpdateDeckResponseType = {
  author: UpdateDeckResponseTypeAuthor
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}
export type UpdateDeckResponseTypeAuthor = {
  id: string
  name: string
}
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
export type GetDecksParamsType = {
  authorId: string
  currentPage: number
  itemsPerPage: number
  maxCardsCount: number
  minCardsCount: number
  name: string
  orderBy: Sort
}
export type CreateDeckArgType = {
  cover?: File
  name: string
  isPrivate?: boolean
}
export type LearnRandomPostArg = {
  id: string
  cardId: string
  grade: number
}
