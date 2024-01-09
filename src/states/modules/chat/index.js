import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeFriend: null,
    listFriends: [],
    loadingGetListFriends: false,
    oldMessages: [],
    loadingGetOldMessages: false,
    hasUnseenMessages: false,
    loadingSendMessage: false,
    isKeepScroll: false
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        setIsKeepScroll: (state, action) => ({
            ...state,
            isKeepScroll: action.payload
        }),
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
        }),
        setOldMessages: (state, action) => ({
            ...state,
            oldMessages: action.payload
        }),
        appendMessages: (state, action) => ({
            ...state,
            oldMessages: [...state.oldMessages, action.payload]
        }),
        setListFriends: (state, action) => ({
            ...state,
            listFriends: action.payload
        }),
        startSendMessage: (state) => ({
            ...state,
            loadingSendMessage: true
        }),
        sendMessageSuccessfully: (state) => ({
            ...state,
            loadingSendMessage: false
        }),
        sendMessageFail: (state) => ({
            ...state,
            loadingSendMessage: false
        }),
        setHasUnseenMessages: (state, action) => ({
            ...state,
            hasUnseenMessages: action.payload
        }),
        startConfirmSeenMessage: (state) => ({
            ...state
        }),
        confirmSeenMessageSuccessfully: (state) => ({
            ...state,
            hasUnseenMessages: false
        }),
        confirmSeenMessageFail: (state) => ({
            ...state,
            hasUnseenMessages: false
        }),
        refreshState: () => ({
            ...initialState
        })
    }
})

// eslint-disable-next-line no-empty-pattern
export const {
    setIsKeepScroll,
    setActiveFriend,
    startGetListFriends, getListFriendsSuccessfully, getListFriendsFail,
    startGetOldMessages, getOldMessagesSuccessfully, getOldMessagesFail,
    setOldMessages, appendMessages,
    setListFriends,
    startSendMessage, sendMessageSuccessfully, sendMessageFail,
    setHasUnseenMessages, startConfirmSeenMessage, confirmSeenMessageSuccessfully, confirmSeenMessageFail,
    refreshState
} = chatSlice.actions

export default chatSlice.reducer
