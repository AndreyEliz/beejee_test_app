import {post} from '../api/api';
import {
    AUTHENTICATION_FAILED,
    AUTHENTICATION_SUCCEED,
    LOGOUT
} from './action-types';
import {API_URL} from '../config';
import {setAuthData} from '../api/api';

const removeUserData = () =>{
    localStorage.clear();
};

export const logout = () => (dispatch) => {
    removeUserData();
    return dispatch({type: LOGOUT});
};

export const login = (data) => (dispatch) => {
    const {username, password, customErrorHandlers} = data;

    localStorage.clear();

    const params = {
        url: `${API_URL}/login?developer=AndreyE`,
        data: {
            password,
            username
        },
        customErrorHandlers
    };

    return post(params.url, params.data)
        .then((response) => {
            setAuthData(response);
            return dispatch({type: AUTHENTICATION_SUCCEED, data: {username, ...response}});
        })
        .catch((error) => {
            dispatch({type: AUTHENTICATION_FAILED});
            throw error;
        });
};
