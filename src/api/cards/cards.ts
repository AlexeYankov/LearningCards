import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Sort} from '@/components/ui/table/types.ts'

const initialState = {
  answer: '',
  question: '',
  currentPage: 1,
  itemsPerPage: 10,
  valueSelect: '',
  sort: null as Sort,
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    changeCardsCurrentPage: (
      state,
      action: PayloadAction<{
        currentPage: number
      }>
    ) => {
      state.currentPage = action.payload.currentPage
    },
    changeCardsItemsPerPage: (
      state,
      action: PayloadAction<{
        itemsPerPage: number
      }>
    ) => {
      state.itemsPerPage = action.payload.itemsPerPage
    },
    resetCardsFilter: state => {
      state.itemsPerPage = 10
      state.currentPage = 1
    },
    selectedOptionSlice: (state, action: PayloadAction<{ valueSelect: string }>) => {
      state.valueSelect = action.payload.valueSelect
    },
    changeCardOrderBy: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload
    },
  },
})

export default cardsSlice.reducer

export const {
  changeCardsCurrentPage,
  changeCardsItemsPerPage,
  selectedOptionSlice,
  changeCardOrderBy,
} = cardsSlice.actions
