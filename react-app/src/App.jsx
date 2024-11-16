/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { useState, useEffect } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from './api/tasks';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [formKey, setFormKey] = useState(0); // Key to reset the form

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await fetchTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleAddTask = async (task) => {
        try {
            const response = await addTask(task);
            setTasks([...tasks, response.data]);
            setEditingTask(null); // Clear the editing state
            setFormKey(formKey + 1); // Reset the form
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            const response = await updateTask(updatedTask.id, updatedTask);
            setTasks(tasks.map((task) => (task.id === updatedTask.id ? response.data : task)));
            setEditingTask(null); // Clear the editing state
            setFormKey(formKey + 1); // Reset the form
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="App">
            <h1>Task Manager</h1>
            <TaskList tasks={tasks} onEdit={(task) => { setEditingTask(task); setFormKey(formKey + 1); }} onDelete={handleDeleteTask} />
            <TaskForm
                key={formKey} // Reset the form whenever the key changes
                task={editingTask}
                onSave={editingTask ? handleUpdateTask : handleAddTask}
                onCancel={() => { setEditingTask(null); setFormKey(formKey + 1); }}
            />
        </div>
    );
};

export default App;
