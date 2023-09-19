import { CreateTask } from "./CreateTask";
import { render, fireEvent, screen, act } from "@testing-library/react";
import * as apiFunctions from "../functions/apiFunctions";
import { useUser } from "../contexts/UserContext";

// mock the createTask function
apiFunctions.createTask = jest.fn();

// mock useUser user context hook
jest.mock("../contexts/UserContext", () => ({
    useUser: jest.fn(),
}));

beforeEach(() => {
    useUser.mockReturnValue({userId: 1, setUserId: jest.fn()});
});

describe('CreateTask Component', () => {
    // test that name textbox is rendered
    test('name textbox is rendered', async () => {
        render(<CreateTask />);

        const nameTextBox = screen.getByLabelText(/name/i);
        expect(nameTextBox).toBeInTheDocument();
    });

    // test that description textbox is rendered
    test('description textbox is rendered', async () => {
        render(<CreateTask />);

        const descriptionTextBox = screen.getByLabelText(/description/i);
        expect(descriptionTextBox).toBeInTheDocument();
    });

    // test that create task button is rendered
    test('create task button is rendered', async () => {
        render(<CreateTask />);

        const createTaskButton = screen.getByRole('button', { name: /create/i });
        expect(createTaskButton).toBeInTheDocument();
    });

    // test that clear button is rendered
    test('reset button is rendered', async () => {
        render(<CreateTask />);

        const clearTaskButton = screen.getByRole('button', { name: /reset/i });
        expect(clearTaskButton).toBeInTheDocument();
    });

    // test that name is required
    test('name is required displays error message', async () => {
        render(<CreateTask />);

        const createTaskButton = screen.getByRole('button', { name: /create/i });
        const descriptionTextBox = screen.getByLabelText(/description/i);

        await act(async () => {
            fireEvent.change(descriptionTextBox, { target: { value: 'Description 1' } });
            fireEvent.click(createTaskButton);
        });

        const nameRequired = await screen.findByText(/name is required/i);

        expect(nameRequired).toBeInTheDocument();
    });

    // test that description is required
    test('description is required displays error message', async () => {
        render(<CreateTask />);

        const createTaskButton = screen.getByRole('button', { name: /create/i });
        const nameTextBox = screen.getByLabelText(/name/i);

        await act(async () => {
            fireEvent.change(nameTextBox, { target: { value: 'Task 1' } });
            fireEvent.click(createTaskButton);
        });

        const descriptionRequired = await screen.queryByText(/description is required/i);

        expect(descriptionRequired).toBeInTheDocument();
    });

    // test that a valid task is successfully created, shows success message
    test('valid task is successfully created, shows success message', async () => {
        // mock the createTask function
        apiFunctions.createTask.mockResolvedValueOnce({ status: "Success", task: { id: 2, userId: 1, name: "Task 1", description: "Description 1" } });
        // mock the user with user id 1
        useUser.mockReturnValue({ userId: 1, setUserId: jest.fn() });

        render(<CreateTask />);

        const createTaskButton = screen.getByRole('button', { name: /create/i });
        const nameTextBox = screen.getByLabelText(/name/i);
        const descriptionTextBox = screen.getByLabelText(/description/i);

        await act(async () => {
            fireEvent.change(nameTextBox, { target: { value: 'Task 1' } });
            fireEvent.change(descriptionTextBox, { target: { value: 'Description 1' } });
            fireEvent.click(createTaskButton);
        });

        const taskCreated = await screen.findByText(/task created/i);

        expect(taskCreated).toBeInTheDocument();
    });

    // test that a valid task creation clears the form
    test('valid task creation clears form', async () => {
        // mock the createTask function
        apiFunctions.createTask.mockResolvedValueOnce({ status: "Success", task: { id: 2, userId: 1, name: "Task 1", description: "Description 1" } });
        // mock the user with user id 1
        useUser.mockReturnValue({ userId: 1, setUserId: jest.fn() });

        render(<CreateTask />);

        const createTaskButton = screen.getByRole('button', { name: /create/i });
        const nameTextBox = screen.getByLabelText(/name/i);
        const descriptionTextBox = screen.getByLabelText(/description/i);

        await act(async () => {
            fireEvent.change(nameTextBox, { target: { value: 'Task 1' } });
            fireEvent.change(descriptionTextBox, { target: { value: 'Description 1' } });
            fireEvent.click(createTaskButton);
        });

        expect(nameTextBox.value).toBe('');
        expect(descriptionTextBox.value).toBe('');
    });

    // test that unsuccessful save displays error message
    test('unsuccessful save displays error message', async () => {
        // mock an error from the server
        apiFunctions.createTask.mockResolvedValueOnce({ status: "Error", message: "Error creating task" });
        // mock the user with user id 1
        useUser.mockReturnValue({ userId: 1, setUserId: jest.fn() });

        render(<CreateTask />);

        const createTaskButton = screen.getByRole('button', { name: /create/i });
        const nameTextBox = screen.getByLabelText(/name/i);
        const descriptionTextBox = screen.getByLabelText(/description/i);

        await act(async () => {
            fireEvent.change(nameTextBox, { target: { value: 'Task 1' } });
            fireEvent.change(descriptionTextBox, { target: { value: 'Description 1' } });
            fireEvent.click(createTaskButton);
        });

        const errorMessage = await screen.findByText(/error creating task/i);
        expect(errorMessage).toBeInTheDocument();
    });

    // test that non-logged in user receives error message
    test('non-logged in user displays error message', async () => {
        // mock a non-logged in user
        useUser.mockReturnValue({ userId: null, setUserId: jest.fn() });

        render(<CreateTask />);

        const errorMessage = await screen.findByText(/not logged in/i);
        expect(errorMessage).toBeInTheDocument();
    });
});