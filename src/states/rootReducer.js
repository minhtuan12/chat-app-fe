import appReducer from './modules/app/index.js'
import authReducer from './modules/auth/index.js'
import profileReducer from './modules/profile/index.js'
import chatReducer from './modules/chat/index.js'

const rootReducer = {
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    chat: chatReducer
}

export default rootReducer
