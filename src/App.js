import React, {useState} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {useCheckIfLoggedIn} from './hooks/authentication.hooks';
import './App.css';
import {API_URL} from './config';
import {get, BeeJeeError} from './api/api';
import LoginPage from './pages/Login/LoginPage';
import MainPage from './pages/Main/MainPage';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    const [isBackendAvailable, setBackendAvailability] = useState(true)

    get(API_URL).catch((error) => {
        if (error instanceof BeeJeeError) setBackendAvailability(false);
    });

    useCheckIfLoggedIn();

    return (
        !isBackendAvailable ?
        <div>
            <div>
                <h1>Backend is not available</h1>
                <p>
                    This might happen because backend service is stopped, or you are offline.
                </p>
            </div>
        </div>
            :
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/" component={MainPage} />
                </Switch>
            </Router>
            <ToastContainer autoClose={3000}
                            hideProgressBar />
        </React.Fragment>
    );
}

export default App;
