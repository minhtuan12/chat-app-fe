import { all, fork, put, takeLatest } from 'redux-saga/effects'
import { getListFriends } from '../../../api/chat/index.js'
import { getListFriendsSuccessfully } from './index.js'
import socketService from '../../../socket/index.js'
import { createRoomNotifyName } from '../../../utils/helper.js'

function* loadRouteData() {
    yield put(getListFriends())
}

function* handleActions() {
    yield takeLatest(getListFriendsSuccessfully, function (action) {
        if (action.payload.length > 0) {
            const socket = socketService.getSocket()
            const roomNames = action.payload.map(item => createRoomNotifyName(item._id))
            socket.emit('send-status-list-friend', roomNames)
        }
    })
}

export default function* loadChatSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ])
}
