import {logout} from '../actions/authentication.actions';
import {useDispatch} from 'react-redux';

export const useCheckIfLoggedIn = () => {
    const dispatch = useDispatch()
    if (!localStorage.getItem('accessToken')) {
        dispatch(logout());
    }
}
