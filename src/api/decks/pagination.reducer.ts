import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  itemsPerPage: 10,
  minCardsCount: 0,
  maxCardsCount: 61,
  showMyTabDecks: false,
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
    changeShowTabDecks: (state, action: PayloadAction<{ showMyTabDecks: boolean }>) => {
      state.showMyTabDecks = action.payload.showMyTabDecks
    },
  },
})

export default paginationSlice.reducer

export const {
  changeCurrentPage,
  changeItemsPerPage,
  changeMinCardsCount,
  changeMaxCardsCount,
  changeShowTabDecks,
} = paginationSlice.actions
