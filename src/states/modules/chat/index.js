import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        activeFriend: null,
        listFriends: [],
        loadingGetListFriends: false,
        oldMessages: [],
        loadingGetOldMessages: false
    },
    reducers: {
        setActiveFriend: (state, action) => ({
            ...state,
            activeFriend: action.payload
        }),
        startGetListFriends: (state) => ({
            ...state,
            loadingGetListFriends: true,
            listFriends: []
        }),
        getListFriendsSuccessfully: (state, action) => ({
            ...state,
            loadingGetListFriends: false,
            listFriends: action.payload
        }),
        getListFriendsFail: (state) => ({
            ...state,
            loadingGetListFriends: false,
            listFriends: []
        }),
        startGetOldMessages: (state) => ({
            ...state,
            loadingGetOldMessages: true,
            oldMessages: []
        }),
        getOldMessagesSuccessfully: (state, action) => ({
            ...state,
            loadingGetOldMessages: false,
            oldMessages: action.payload
        }),
        getOldMessagesFail: (state) => ({
            ...state,
            loadingGetOldMessages: false,
            oldMessages: []
        })
    }
})

// eslint-disable-next-line no-empty-pattern
export const {
    setActiveFriend,
    startGetListFriends, getListFriendsSuccessfully, getListFriendsFail,
    startGetOldMessages, getOldMessagesSuccessfully, getOldMessagesFail
} = chatSlice.actions

export default chatSlice.reducer
