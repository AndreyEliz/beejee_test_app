import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux'
import Task from './Task';
import './tasks.css';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.get('tasks').toJS())
    return (
        <div className=''>
            {tasks.map((task) => <Task data={task} key={task.id}/>)}
        </div>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.array
}

export default TaskList