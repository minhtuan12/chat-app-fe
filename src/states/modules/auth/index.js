import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthSuccess: false,
        authUser: {},
        isLoadingBtnLogin: false
    },
    reducers: {
        startRequestLogin: (state) => ({
            ...state,
            isLoadingBtnLogin: true
        }),
        startRequestLoginSuccess: (state) => ({
            ...state,
            isLoadingBtnLogin: false
        }),
        startRequestLoginFail: (state) => ({
            ...state,
            isLoadingBtnLogin: false
        }),
        startRequestGetMe: (state) => ({
            ...state
        }),
        startRequestGetMeSuccess: (state, action) => {
            return ({
                ...state,
                isAuthSuccess: true,
                authUser: action.payload
            })
        },
        startRequestGetMeFail: (state) => {
            return ({
                ...state,
                isAuthSuccess: false,
                authUser: {}
            })
        },
        setAuthSuccess: (state, action) => ({
            ...state,
            isAuthSuccess: action.payload
        })
    }
})

export const {
    setAuthSuccess,
    startRequestLogin, startRequestLoginSuccess, startRequestLoginFail,
    startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail
} = authSlice.actions

export default authSlice.reducer
