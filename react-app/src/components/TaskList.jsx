/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';

const TaskList = ({ tasks, onEdit, onDelete }) => (
    <ul>
        {tasks.map((task) => (
            <li key={task.id}>
                <h3>{task.title}</h3>
                <p>ID: {task.id}</p>
                <p>Description: {task.description}</p>
                <p>Status: {task.status}</p>
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
            </li>
        ))}
    </ul>
);

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TaskList;
