import callApi from '../callApi.js'
import {
    confirmSeenMessageFail,
    confirmSeenMessageSuccessfully,
    getListFriendsFail,
    getListFriendsSuccessfully,
    getOldMessagesFail,
    getOldMessagesSuccessfully,
    sendMessageFail,
    sendMessageSuccessfully,
    startConfirmSeenMessage,
    startGetListFriends,
    startGetOldMessages,
    startSendMessage
} from '../../states/modules/chat/index.js'

export const getListFriends = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'users',
        actionTypes: [startGetListFriends, getListFriendsSuccessfully, getListFriendsFail],
        variables: {},
        dispatch,
        getState
    })
}

export const getOldMessages = (roomId) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `chat/${roomId}`,
        actionTypes: [startGetOldMessages, getOldMessagesSuccessfully, getOldMessagesFail],
        variables: {},
        dispatch,
        getState
    })
}

export const requestSendMessage = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: 'chat/send-message',
        actionTypes: [startSendMessage, sendMessageSuccessfully, sendMessageFail],
        variables: { ...data },
        dispatch,
        getState
    })
}

export const requestConfirmSeenMessage = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: 'chat/confirm-seen-message',
        actionTypes: [startConfirmSeenMessage, confirmSeenMessageSuccessfully, confirmSeenMessageFail],
        variables: { ...data },
        dispatch,
        getState
    })
}
