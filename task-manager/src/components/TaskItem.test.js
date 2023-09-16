import { TaskItem } from './TaskItem';
import { render, screen } from '@testing-library/react';
import * as apiFunctions from '../functions/apiFunctions';

// Mock the getTask function
apiFunctions.getTask = jest.fn();

describe('TaskItem Component', () => {
    // Test that the task name is rendered
    test('task name is rendered', async () => {
        const taskName = 'Task 1';
        // Mock the response
        apiFunctions.getTask.mockResolvedValueOnce({status: "Success", task: { id: 1, userId: 1, name: taskName, description: 'Description 1'}});

        const { findByText } = render(<TaskItem taskId={1} />);

        const taskNameElement = await findByText(taskName);
        expect(taskNameElement).toBeInTheDocument();
    });

    // Test that task description is rendered
    test('task description is rendered', async () => {
        const taskDescription = 'Description 1';
        // Mock the response
        apiFunctions.getTask.mockResolvedValueOnce({status: "Success", task: { id: 1, userId: 1, name: 'Task 1', description: taskDescription}});

        const { findByText } = render(<TaskItem taskId={1} />);

        const taskDescriptionElement = await findByText(taskDescription);

        expect(taskDescriptionElement).toBeInTheDocument();
    });

    // Test that edit task button is rendered
    test('edit task button is rendered', async () => {
        const taskName = 'Task 1';
        const taskDescription = 'Description 1';
        // Mock the response
        apiFunctions.getTask.mockResolvedValueOnce({status: "Success", task: { id: 1, userId: 1, name: taskName, description: taskDescription}});

        const { findByRole } = render(<TaskItem taskId={1} />);

        const editTaskButton = findByRole('button', { name: /edit/i});

        expect(editTaskButton).toBeInTheDocument();
    });

    // test that the delete task button is rendered
    test('delete task button is rendered', async () => {
        const taskName = 'Task 1';
        const taskDescription = 'Description 1';
        // Mock the response
        apiFunctions.getTask.mockResolvedValueOnce({status: "Success", task: { id: 1, userId: 1, name: taskName, description: taskDescription}});

        const { findByRole } = render(<TaskItem taskId={1} />);

        const deleteTaskButton = findByRole('button', { name: /delete/i});

        expect(deleteTaskButton).toBeInTheDocument();
    });
});