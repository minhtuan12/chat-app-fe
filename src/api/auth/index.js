import callApi from "../callApi";
import {
    startRequestGetMe,
    startRequestGetMeFail,
    startRequestGetMeSuccess,
    startRequestLogin,
    startRequestLoginFail,
    startRequestLoginSuccess,
} from "../../states/modules/auth";

export const login = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `auth/login`,
        actionTypes: [startRequestLogin, startRequestLoginSuccess, startRequestLoginFail],
        variables: {
            username: data.username,
            password: data.password,
        },
        dispatch,
        getState
    })
}

export const getMe = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `me`,
        actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
        variables: {},
        dispatch,
        getState
    })
}
