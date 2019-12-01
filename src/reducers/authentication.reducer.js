import {fromJS} from 'immutable';
import {
    AUTHENTICATION_FAILED,
    AUTHENTICATION_SUCCEED,
    LOGOUT
} from '../actions/action-types';

const initialState = fromJS({
    authorized: !!localStorage.getItem('accessToken'),
    username: '',
    fullname: ''
});


const authentication = (state=initialState, action) => {
    const reducers = {
        [AUTHENTICATION_FAILED]: () => state.merge({authorized: false}),
        [AUTHENTICATION_SUCCEED]: () => state.merge({authorized: true, username: action.data.username}),
        [LOGOUT]: () => state.merge({authorized: false})
    }

    return (reducers[action.type]  && reducers[action.type]()) || state
};

export default authentication;
