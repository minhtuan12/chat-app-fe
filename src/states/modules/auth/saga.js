import { all, fork, put, takeLatest } from 'redux-saga/effects'
import { startRequestLoginFail, startRequestLoginSuccess } from './index.js'
import { setAuthToken } from '../../../utils/localStorage'
import { getNotification } from '../../../utils/helper.js'
import { goToPage } from '../app/index.js'

function* loadRouteData() {
    //
}

function* handleActions() {
    yield takeLatest(startRequestLoginSuccess, function* (action) {
        let token = action.payload.token
        setAuthToken(token)
        yield put(goToPage({
            path: '/'
        }))
    })

    yield takeLatest(startRequestLoginFail, function (action) {
        getNotification('error', action.payload.data.message)
    })
}

export default function* loadAuthSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ])
}
