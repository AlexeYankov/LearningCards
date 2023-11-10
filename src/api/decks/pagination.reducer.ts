import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  itemsPerPage: 10,
  minCardsCount: 0,
  maxCardsCount: 61,
  authorId: '',
  name: '',
  orderBy: 'name-asc' as 'name-asc' | 'name-desc',
}

const paginationSlice = createSlice({
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
    changeOrderBy: (state, action: PayloadAction<{ orderBy: 'asc' | 'desc' }>) => {
      state.orderBy = `name-${action.payload.orderBy}`
    },
  },
})

export default paginationSlice.reducer

export const {
  changeCurrentPage,
  changeItemsPerPage,
  changeMinCardsCount,
  changeMaxCardsCount,
  changeShowAuthorTabDecks,
  searchDeckByName,
  changeOrderBy,
} = paginationSlice.actions
