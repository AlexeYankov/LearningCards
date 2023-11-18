import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  answer: '',
  question: '',
  orderBy: '',
  currentPage: 1,
  itemsPerPage: 10,
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    changeCardsCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage
    },
    changeCardsItemsPerPage: (state, action: PayloadAction<{ itemsPerPage: number }>) => {
      state.itemsPerPage = action.payload.itemsPerPage
    },
    resetCardsFilter: state => {
      state.itemsPerPage = 10
      state.currentPage = 1
    },
  },
})

export default cardsSlice.reducer

export const { changeCardsCurrentPage, changeCardsItemsPerPage, resetCardsFilter } =
  cardsSlice.actions