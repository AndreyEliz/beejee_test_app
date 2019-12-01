import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {saveTaskData} from '../../actions/tasks.actions';
import { toast } from 'react-toastify';
import { useLocation } from '../../hooks/router.hooks';

const Task = React.memo(({data}) => {
    const {navigate} = useLocation();
    const dispatch = useDispatch();
    const isLogedIn = useSelector((state) => state.authentication.get('authorized'));
    const [isEditMode, setIsEditMode] = useState(false);
    const [taskData, setTaskData] = useState({
        ...data,
        text: decodeURIComponent(data.text),
        username: decodeURIComponent(data.username)
    });

    const onEditBtnClick = () => setIsEditMode(true)
    const onSave = () => {
        dispatch(saveTaskData(taskData.id, {
            ...taskData,
            text: encodeURIComponent(taskData.text)
        }))
        .then(() => setIsEditMode(false))
        .catch((e) => {
            toast(e.message, {type: 'error'});
            navigate('/login')
        })
    }

    const handleStatusChange = (event) => {
        const newTaskData = {...taskData, status: event.target.checked ? 10 : 0};
        setTaskData(newTaskData);
        dispatch(saveTaskData(newTaskData.id, {status: newTaskData.status}))
    }

    const handleTextChange = (event) => setTaskData({...taskData, text: event.target.value});

    return (
    <div className='task'>
        <div className='taskHeader'>
            <div>
                <div className='taskHeader_field'>Name: </div>
                {taskData.username}
            </div>
            <div>
                <div className='taskHeader_field'>Email: </div>
                {taskData.email}
            </div>
            <div className='status'>
                <div className='taskHeader_field'>Status: </div>
                <input type='checkbox'
                        checked={taskData.status}
                        disabled={!isLogedIn}
                        onChange={handleStatusChange}/>
            </div>
            {isLogedIn && (isEditMode ? 
            <button className='btn_sm' onClick={onSave}>save</button>
            :
            <button className='btn_sm' onClick={onEditBtnClick}>edit</button>)}
        </div>
        {isEditMode ?
        <div className='taskContent'>
            <textarea autoFocus
                      value={taskData.text}
                      onChange={handleTextChange}/>
        </div>
        :
        <div className='taskContent'>
            <div>{taskData.text}</div>
        </div>}
    </div>
)});

Task.propTypes = {
    data: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        status: PropTypes.number,
        text: PropTypes.string,
        id: PropTypes.number
    })
}

export default Task;