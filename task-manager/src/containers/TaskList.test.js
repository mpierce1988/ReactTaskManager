import { render, screen, act } from '@testing-library/react';
import { TaskList } from './TaskList';
import { BrowserRouter } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import * as apiFunctions from '../functions/apiFunctions';

// Mock the getTasks function
apiFunctions.getTasks = jest.fn();

jest.mock('../contexts/UserContext', () => ({
    useUser: jest.fn()
}));

const renderWithUserContext = (ui) => {
    return render(
        <BrowserRouter>
            {ui}
        </BrowserRouter>
    );
}

describe('TaskList Component', () => {
    // reset all useUser mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test that all tasks are rendered
    test('all tasks are rendered', async () => {
        const tasks = [
            { id: 1, name: 'Task A', description: 'Description 1' },
            { id: 2, name: 'Task 2', description: 'Description 2' },
            { id: 3, name: 'Task 3', description: 'Description 3' }
        ];

        apiFunctions.getTasks.mockResolvedValueOnce({status: "Success", tasks: tasks});
        useUser.mockReturnValue({userId: 1, setUserId: jest.fn()});

        await act(async () => {
            renderWithUserContext(<TaskList />);
        });

        for(let task of tasks) {
            const taskNameElement = await screen.findByText(task.name);
            expect(taskNameElement).toBeInTheDocument();
        }
    });

    // Test that appropriate message is displayed if no tasks are returned
    test('no tasks message is displayed', async () => {
        const tasks = [];

        apiFunctions.getTasks.mockResolvedValueOnce({status: "Success", tasks: tasks});
        useUser.mockReturnValue({userId: 1, setUserId: jest.fn()});

        await act(async () => {
            renderWithUserContext(<TaskList />);
        });

        const noTasksMessage = await screen.getByText(/no tasks found/i);

        expect(noTasksMessage).toBeInTheDocument();
    });

    // Test that Create Task button is rendered
    test('create task button is rendered', async () => {
        const tasks = [];

        apiFunctions.getTasks.mockResolvedValueOnce({status: "Success", tasks: tasks});
        useUser.mockReturnValue({userId: 1, setUserId: jest.fn()});

        await act(async () => {
            renderWithUserContext(<TaskList />);
        });

        const createTaskButton = await screen.findByRole('button', { name: /create/i });

        expect(createTaskButton).toBeInTheDocument();
    });

    // Test that error message is displayed if user is not logged in
    test('error message is displayed if user is not logged in', async () => {
        apiFunctions.getTasks.mockResolvedValueOnce({status: "Error", message: "User not logged in"});
        useUser.mockReturnValue({userId: null, setUserId: jest.fn()});

        await act(async () => {
            renderWithUserContext(<TaskList />);
        });

        const errorMessage = await screen.getByText(/not logged in/i);

        expect(errorMessage).toBeInTheDocument();
    });
});