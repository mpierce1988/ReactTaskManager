import { TaskItem } from './TaskItem';
import { render, screen } from '@testing-library/react';

describe('TaskItem Component', () => {
    // Test that the task name is rendered
    test('task name is rendered', async () => {
        const taskName = 'Task 1';
        const taskDescription = "Description 1";        

        const { findByText } = render(<TaskItem name={taskName} description={taskDescription} id={1}/>);

        const taskNameElement = await findByText(taskName);
        expect(taskNameElement).toBeInTheDocument();
    });

    // Test that task description is rendered
    test('task description is rendered', async () => {
        const taskName = 'Task 1';
        const taskDescription = 'Description 1';

        const { findByText } = render(<TaskItem name={taskName} description={taskDescription} id={1} />);

        const taskDescriptionElement = await findByText(taskDescription);

        expect(taskDescriptionElement).toBeInTheDocument();
    });

    // Test that edit task button is rendered
    test('edit task button is rendered', async () => {
        const taskName = 'Task 1';
        const taskDescription = 'Description 1';
        

        const { findByRole } = render(<TaskItem name={taskName} description={taskDescription} id={1} />);

        const editTaskButton = await findByRole('button', { name: /edit/i});

        expect(editTaskButton).toBeInTheDocument();
    });

    // test that the delete task button is rendered
    test('delete task button is rendered', async () => {
        const taskName = 'Task 1';
        const taskDescription = 'Description 1';        

        const { findByRole } = render(<TaskItem name={taskName} description={taskDescription} id={1} />);

        const deleteTaskButton = await findByRole('button', { name: /delete/i});

        expect(deleteTaskButton).toBeInTheDocument();
    });
   
});