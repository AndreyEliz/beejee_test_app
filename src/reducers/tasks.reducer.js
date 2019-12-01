import {fromJS, List} from 'immutable';
import {
    GET_TASKS,
    CREATE_TASK
} from '../actions/action-types';

const initialState = fromJS({
    tasks: List(),
    total: 0
});


const authentication = (state=initialState, action) => {
    const reducers = {
        [GET_TASKS]: () => state.merge({
            tasks: fromJS(action.data.tasks || []),
            total: action.data.total_task_count
        }),
        [CREATE_TASK]: () => state
    }

    return (reducers[action.type]  && reducers[action.type]()) || state
};

export default authentication;
