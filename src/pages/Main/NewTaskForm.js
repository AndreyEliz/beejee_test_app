import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {createTask, getTasks} from '../../actions/tasks.actions';
import './form.css';

const defaultNewTaskData = {
    email:'',
    username: '',
    text: '',
};

const NewTaskForm = () => {
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState(defaultNewTaskData);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createTask({
            text: encodeURIComponent(newTask.text),
            username: encodeURIComponent(newTask.username),
            email: newTask.email
        }))
        .then(() => setNewTask(defaultNewTaskData))
        .then(() => dispatch(getTasks({
            developer: 'AndreyE',
            sort_field: 'id',
            sort_direction: 'asc',
            page: 1
        })));
    }

    const handleChange = (e) => {
        setNewTask({...newTask, [e.target.name]: e.target.value})
    }

    return (
    <form onSubmit={onSubmit} className='form'>
        <div className='formHeader'>Create new Task:</div>
        <input
            required
            name="username"
            placeholder="username"
            value={newTask.username}
            onChange={handleChange}
            autoFocus />
        <input
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            name="email"
            type="email"
            value={newTask.email}
            placeholder="email"
            onChange={handleChange}/>
        <textarea value={newTask.text} name='text' onChange={handleChange} placeholder={'text'}/>
        <button type="submit">
            Submit
        </button>
    </form>);
}

export default NewTaskForm;