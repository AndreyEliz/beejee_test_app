import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../../actions/authentication.actions';
import {useLocation} from '../../hooks/router.hooks';
import {toast} from 'react-toastify';

const LoginPage = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { navigate } = useLocation()

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }))
        .then(() => navigate('/'))
        .catch((e) => toast(JSON.parse(e.message).password), {type: 'error'});
    }

    const onUserNameChange = (e) => {
        setUsername(e.currentTarget.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.currentTarget.value);
    }

    return (
            <div className=''>
                <h4>
                    Sign in
                </h4>
                <form className={''} noValidate onSubmit={onSubmit}>
                    <input
                        required
                        id="name"
                        name="name"
                        placeholder="username"
                        value={username}
                        onChange={onUserNameChange}
                        autoFocus />
                    <input
                        required
                        name="password"
                        type="password"
                        id="password"
                        value={password}
                        placeholder="password"
                        onChange={onPasswordChange}/>
                    <button
                        type="submit"
                        className={''}>
                        Sign In
                    </button>
                </form>
            </div>
    );
}

export default LoginPage