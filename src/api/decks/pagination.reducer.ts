import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  itemsPerPage: 10,
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage
    },
    changeItemsPerPage: (state, action: PayloadAction<{ itemsPerPage: number }>) => {
      state.itemsPerPage = action.payload.itemsPerPage
    },
  },
})

export default paginationSlice.reducer

export const { changeItemsPerPage, changeCurrentPage } = paginationSlice.actions
