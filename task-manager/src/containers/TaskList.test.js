import { render, screen } from '@testing-library/react';
import { TaskList } from './TaskList';
import * as apiFunctions from '../functions/apiFunctions';

apiFunctions.getTasks = jest.fn();

const renderWithUserContext = (userId, ui) => {
    return render(
        <BrowserRouter>
            <UserProvider value={{ userId: {userId}, setUserId: () => {} }}>
                {ui}
            </UserProvider>
        </BrowserRouter>
    );
}

describe('TaskList Component', () => {
    // Test that all tasks are rendered
    test('all tasks are rendered', () => {
        const tasks = [
            { id: 1, name: 'Task 1', description: 'Description 1' },
            { id: 2, name: 'Task 2', description: 'Description 2' },
            { id: 3, name: 'Task 3', description: 'Description 3' }
        ];

        apiFunctions.getTasks.mockResolvedValueOnce({status: "Success", tasks: tasks});

        renderWithUserContext(1, <TaskList />);

        tasks.forEach(task => {
            const taskNameElement = screen.getByText(task.name);
            expect(taskNameElement).toBeInTheDocument();
        });
    });

    // Test that appropriate message is displayed if no tasks are returned
    test('no tasks message is displayed', () => {
        const tasks = [];

        apiFunctions.getTasks.mockResolvedValueOnce({status: "Success", tasks: tasks});

        renderWithUserContext(1, <TaskList />);

        const noTasksMessage = screen.getByText(/no tasks found/i);

        expect(noTasksMessage).toBeInTheDocument();
    });

    // Test that Create Task button is rendered
    test('create task button is rendered', () => {
        const tasks = [];

        apiFunctions.getTasks.mockResolvedValueOnce({status: "Success", tasks: tasks});

        renderWithUserContext(1, <TaskList />);

        const createTaskButton = screen.getByRole('button', { name: /create/i });

        expect(createTaskButton).toBeInTheDocument();
    });

    // Test that error message is displayed if user is not logged in
    test('error message is displayed if user is not logged in', () => {
        apiFunctions.getTasks.mockResolvedValueOnce({status: "Error", message: "User not logged in"});

        renderWithUserContext(null, <TaskList />);

        const errorMessage = screen.getByText(/not logged in/i);

        expect(errorMessage).toBeInTheDocument();
    });
});