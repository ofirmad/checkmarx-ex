/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { describe, test, beforeEach, jest, expect } from '@jest/globals';

describe('TaskForm', () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();

    beforeEach(() => {
        onSave.mockClear();
        onCancel.mockClear();
    });

    test('renders form inputs correctly', () => {
        render(<TaskForm onSave={onSave} onCancel={onCancel} />);

        expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
        expect(screen.getByDisplayValue('TODO')).toBeInTheDocument();
    });

    test('should populate form when task is provided', () => {
        const task = { title: 'Test Task', description: 'Test Description', status: 'TODO' };
        render(<TaskForm task={task} onSave={onSave} onCancel={onCancel} />);

        expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    });

    test('should call onSave with form data on submit', () => {
        const task = { title: 'Test Task Updated', description: 'Test Description Updated', status: 'in-progress' };
        render(<TaskForm task={task} onSave={onSave} onCancel={onCancel} />);

        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Task' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Updated Description' } });

        fireEvent.submit(screen.getByRole('button', { name: /save/i }));

        expect(onSave).toHaveBeenCalledWith({
            title: 'Updated Task',
            description: 'Updated Description',
            status: 'in-progress',
        });
    });

    test('should call onCancel when cancel button is clicked', () => {
        render(<TaskForm onSave={onSave} onCancel={onCancel} />);

        fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

        expect(onCancel).toHaveBeenCalled();
    });
});