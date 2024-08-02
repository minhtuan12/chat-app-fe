import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'profile',
    initialState: {
        errorInformation: '',
        isLoadingBtnInformation: ''
    },
    reducers: {}
})

// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions

export default authSlice.reducer
