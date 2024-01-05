import { all, fork, put } from 'redux-saga/effects'
import { getListFriends } from '../../../api/chat/index.js'

function* loadRouteData() {
    yield put(getListFriends())
}

function* handleActions() {
}

export default function* loadChatSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ])
}
