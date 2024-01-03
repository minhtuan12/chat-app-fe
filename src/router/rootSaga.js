import loadAuthSaga from '../states/modules/auth/saga.js'
import loadChatSaga from '../states/modules/chat/saga.js'

export const ROUTE_SAGAS = []
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga
ROUTE_SAGAS['LOAD_CHAT_PAGE'] = loadChatSaga
