import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  editMode: false,
  title: '',
}

const profileSlice = createSlice({
  initialState,
  name: 'profile',
  reducers: {
    changeTitleProfile: (state, action: PayloadAction<{ title: string }>) => {
      state.title = action.payload.title
    },
    changeEditModeProfile: (state, action: PayloadAction<{ editMode: boolean }>) => {
      state.editMode = action.payload.editMode
    },
  },
})

export default profileSlice.reducer

export const { changeTitleProfile, changeEditModeProfile } = profileSlice.actions
