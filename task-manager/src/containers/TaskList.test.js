import { render, screen } from '@testing-library/react';
import { TaskList } from './TaskList';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import * as apiFunctions from '../functions/apiFunctions';

apiFunctions.getTasks = jest.fn();

const renderWithUserContext = (userId, ui) => {
    return render(
        <BrowserRouter>
            <UserProvider value={{ userId, setUserId: () => {} }}>
                {ui}
            </UserProvider>
        </BrowserRouter>
    );
}

describe('TaskList Component', () => {
    // Test that all tasks are rendered
    test('all tasks are rendered', async () => {
        const tasks = [
            { id: 1, name: 'Task A', description: 'Description 1' },
            { id: 2, name: 'Task 2', description: 'Description 2' },
            { id: 3, name: 'Task 3', description: 'Description 3' }
        ];

        apiFunctions.getTasks.mockResolvedValueOnce({status: "Success", tasks: tasks});

        renderWithUserContext(1, <TaskList />);

        for(let task of tasks) {
            const taskNameElement = await screen.findByText(task.name);
            expect(taskNameElement).toBeInTheDocument();
        }
    });

    // Test that appropriate message is displayed if no tasks are returned
    test('no tasks message is displayed', async () => {
        const tasks = [];

        apiFunctions.getTasks.mockResolvedValueOnce({status: "Success", tasks: tasks});

        renderWithUserContext(1, <TaskList />);

        const noTasksMessage = await screen.getByText(/no tasks found/i);

        expect(noTasksMessage).toBeInTheDocument();
    });

    // Test that Create Task button is rendered
    test('create task button is rendered', async () => {
        const tasks = [];

        apiFunctions.getTasks.mockResolvedValueOnce({status: "Success", tasks: tasks});

        renderWithUserContext(1, <TaskList />);

        const createTaskButton = await screen.getByRole('button', { name: /create/i });

        expect(createTaskButton).toBeInTheDocument();
    });

    // Test that error message is displayed if user is not logged in
    test('error message is displayed if user is not logged in', async () => {
        apiFunctions.getTasks.mockResolvedValueOnce({status: "Error", message: "User not logged in"});

        renderWithUserContext(null, <TaskList />);

        const errorMessage = await screen.getByText(/not logged in/i);

        expect(errorMessage).toBeInTheDocument();
    });
});