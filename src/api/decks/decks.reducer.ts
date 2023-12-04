import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Sort } from '@/components/ui/table/types.ts'

const initialState = {
  currentPage: 1,
  itemsPerPage: 10,
  minCardsCount: 0,
  maxCardsCount: 61,
  authorId: '',
  name: '',
  sort: null as Sort,
}

const decksSlice = createSlice({
  initialState,
  name: 'pagination',
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage
    },
    changeItemsPerPage: (state, action: PayloadAction<{ itemsPerPage: number }>) => {
      state.itemsPerPage = action.payload.itemsPerPage
    },
    changeMinCardsCount: (state, action: PayloadAction<{ minCardsCount: number }>) => {
      state.minCardsCount = action.payload.minCardsCount
    },
    changeMaxCardsCount: (state, action: PayloadAction<{ maxCardsCount: number }>) => {
      state.maxCardsCount = action.payload.maxCardsCount
    },
    changeShowAuthorTabDecks: (state, action: PayloadAction<{ authorId: string }>) => {
      state.authorId = action.payload.authorId
    },
    searchDeckByName: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name
    },
    changeOrderBy: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload
    },
    resetFilter: state => {
      state.name = ''
      state.currentPage = 1
      state.maxCardsCount = 61
      state.sort = null
      state.minCardsCount = 0
      state.itemsPerPage = 10
      state.authorId = ''
    },
  },
})

export default decksSlice.reducer

export const {
  changeCurrentPage,
  changeItemsPerPage,
  changeMinCardsCount,
  changeMaxCardsCount,
  changeShowAuthorTabDecks,
  searchDeckByName,
  changeOrderBy,
  resetFilter,
} = decksSlice.actions
