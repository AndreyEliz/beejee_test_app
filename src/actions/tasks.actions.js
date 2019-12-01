import {get, post} from '../api/api';
import {
    GET_TASKS,
    CREATE_TASK,
    EDIT_TASK
} from './action-types';
import {API_URL} from '../config';
import {toast} from 'react-toastify';
import {handleError} from './api.actions';
import { logout } from './authentication.actions';

export const getTasks = (data) => (dispatch) => get(API_URL, data)
    .then((response) => dispatch({type: GET_TASKS, data: response.message}))
    .catch((e) => dispatch(handleError(e)))

export const createTask = (data) => (dispatch) => post(`${API_URL}/create?developer=AndreyE`, data)
    .then((response) => {
        toast('New task created', {type: 'success'})
        return dispatch({type: CREATE_TASK, data: response.message})
    })
    .catch((e) => dispatch(handleError(e)))

export const saveTaskData = (id, data) => (dispatch) =>
    post(`${API_URL}/edit/${id}/?developer=AndreyE`,{
        ...data,
        token: localStorage.getItem('accessToken')
    })
    .then((response) => {
        toast('Task is edited', {type: 'success'})
        return dispatch({type: EDIT_TASK, data: response.message})
    })
    .catch((e) => dispatch(handleError(e, {
        'BeeJeeError': () => {
            dispatch(logout());
            toast('Авторизуйтесь для выполнения этого действия', {type: 'error'})
        }
    })))