import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthSuccess: false,
        authUser: {},
        isLoadingBtnLogin: false,
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
            ...state,
        }),
        startRequestGetMeSuccess: (state, action) => ({
            ...state,
            isAuthSuccess: true,
            authUser: action.payload.data
        }),
        startRequestGetMeFail: (state) => ({
            ...state,
            isAuthSuccess: false,
            authUser: {}
        }),
        setAuthSuccess: (state, action) => ({
            ...state,
            isAuthSuccess: action.payload
        }),
    }
})

export const {
    setErrorLogin, setErrorForgotPassword, setErrorResetPassword, setAuthSuccess,
    startRequestLogin, startRequestLoginSuccess, startRequestLoginFail,
    startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail,
    startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail,
    startRequestResetPassword, startRequestResetPasswordSuccess, startRequestResetPasswordFail,
} = authSlice.actions

export default authSlice.reducer;
