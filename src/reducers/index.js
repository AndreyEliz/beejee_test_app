import {combineReducers} from 'redux';
import authentication from './authentication.reducer';
import tasks from './tasks.reducer';

const rootReducer = combineReducers({
    authentication,
    tasks
});

export default rootReducer;