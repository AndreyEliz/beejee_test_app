import {toast} from 'react-toastify';
import {logout} from '../actions/authentication.actions';

export const handleError = (error, customErrorHandlers={}) => (dispatch) => {
    const toastId = 'connectionError';

    const errorHandlers = {
        'AuthError': (data) => {
            toast('Authentication Error', {type: 'error', toastId: data.toastId});
            return dispatch(logout());
        },
        'BadRequestError': (data) => toast(data.error.message, {type: 'error', toastId: data.toastId}),
        'NotFoundError': (data) => toast('Not Found', {type: 'error', toastId: data.toastId}),
        'BeeJeeError': (data) => toast(data.error.message, {type: 'error', toastId: data.toastId}),
        'unknownError': (data) => toast('Unknown Error', {type: 'error', toastId: data.toastId}),
        ...customErrorHandlers
    };

    const errorHandler = errorHandlers[error.name] || errorHandlers.unknownError;
    errorHandler({dispatch, toastId, error});

    throw error;
};
