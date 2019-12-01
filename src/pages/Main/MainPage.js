import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {getTasks} from '../../actions/tasks.actions';
import TaskList from '../../components/TaskList/TaskList';
import Paginator from '../../components/TaskList/Paginator';
import NewTaskForm from './NewTaskForm';
import Header from '../../components/Header/Header';
import SortingControls from '../../components/TaskList/SortingControls';

const MainPage = () => {
    const dispatch = useDispatch()
    const [requestOption, setRequestOptions] = useState({
        developer: 'AndreyE',
        sort_field: 'id',
        sort_direction: 'asc',
        page: 1
    });

    dispatch(getTasks(requestOption))

    const handleSortFieldChange = (event) => {
        const newOptions = {...requestOption, sort_field: event.target.value};
        setRequestOptions(newOptions);
        dispatch(getTasks(newOptions));
    }

    const handleSortDirectionChange = (event) => {
        const newOptions = {...requestOption, sort_direction: event.target.value};
        setRequestOptions(newOptions);
        dispatch(getTasks(newOptions));
    }

    const handlePageChange = (data) => {
        const newOptions = {...requestOption, page: data.selected + 1};
        setRequestOptions(newOptions);
        dispatch(getTasks(newOptions));
    }

    return (
            <div className='mainPage'>
                <Header/>
                <SortingControls sortOptions={requestOption}
                                onDirectionChange={handleSortDirectionChange}
                                onFieldChange={handleSortFieldChange} />
                <TaskList/>
                <Paginator onChange={handlePageChange}/>
                <NewTaskForm/>
            </div>
    );
}

export default MainPage