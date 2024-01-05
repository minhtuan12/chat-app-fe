import callApi from '../callApi.js'
import {
    getListFriendsFail,
    getListFriendsSuccessfully,
    getOldMessagesFail,
    getOldMessagesSuccessfully,
    startGetListFriends,
    startGetOldMessages
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