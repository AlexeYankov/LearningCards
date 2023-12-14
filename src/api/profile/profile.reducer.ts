import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
    value: '',
    editMode: false,
    title: ''

}

const profileSlice = createSlice({
    initialState,
    name: 'profile',
    reducers: {
        changeValueProfile: (state, action: PayloadAction<{ value: string }>) => {
            state.value = action.payload.value
        },
        changeTitleProfile: (state, action: PayloadAction<{ title: string }>) => {
            state.title = action.payload.title
        },
        changeEditModeProfile: (state, action: PayloadAction<{ editMode: boolean }>) => {
            state.editMode = action.payload.editMode
        },
    },
})

export default profileSlice.reducer

export const {
    changeValueProfile,
    changeTitleProfile,
    changeEditModeProfile
} = profileSlice.actions