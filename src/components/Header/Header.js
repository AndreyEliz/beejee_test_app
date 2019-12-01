import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../actions/authentication.actions';
import {useLocation} from '../../hooks/router.hooks';
import './header.css';

const Header = () => {
    const isLoggedIn = useSelector((state) => state.authentication.get('authorized'));
    const dispatch = useDispatch()
    const {navigate} = useLocation()

    const onLogout = () => dispatch(logout());
    const onLogin = () => navigate('/login')

    return (
    <div className='header'>
        {!isLoggedIn ? 
        <button onClick={onLogin}>Log in</button>
        :
        <button onClick={onLogout}>Log out</button>}
    </div>)
}

export default Header;