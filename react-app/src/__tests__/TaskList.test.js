/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';
import { describe, test, beforeEach, jest, expect } from '@jest/globals';

describe('TaskList', () => {
    const tasks = [
        { id: 1, title: 'First Task', description: 'First Description', status: 'TODO' },
        { id: 2, title: 'Second Task', description: 'Second Description', status: 'Completed' },
    ];

    const onEdit = jest.fn();
    const onDelete = jest.fn();

    beforeEach(() => {
        onEdit.mockClear();
        onDelete.mockClear();
    });

    test('renders tasks correctly', () => {
        render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);

        tasks.forEach((task) => {
            expect(screen.getByText(task.title)).toBeInTheDocument()
            expect(screen.getByText(`ID: ${task.id}`)).toBeInTheDocument();
            expect(screen.getByText(`Description: ${task.description}`)).toBeInTheDocument();
            expect(screen.getByText(`Status: ${task.status}`)).toBeInTheDocument();
        });
    });

    test('should call onEdit with selected task data', () => {
        render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);

        fireEvent.click(screen.getAllByText('Edit')[0]);

        expect(onEdit).toHaveBeenCalledWith(tasks[0]);
    });

    test('should call onDelete with selected task id', () => {
        render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);

        fireEvent.click(screen.getAllByText('Delete')[0]);

        expect(onDelete).toHaveBeenCalledWith(1);
    });
});