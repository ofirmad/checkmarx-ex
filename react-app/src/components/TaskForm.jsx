import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TaskForm = ({ task, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ title: '', description: '', status: 'TODO' });

    useEffect(() => {
        if (task) setFormData(task);
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
                <option value="TODO">TODO</option>
                <option value="in-progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit">Save</button>
            {onCancel && (
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            )}
        </form>
    );
};

TaskForm.propTypes = {
    task: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default TaskForm;