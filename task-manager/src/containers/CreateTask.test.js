import { CreateTask } from "./CreateTask";
import { render, screen } from "@testing-library/react";
import * as apiFunctions from "../functions/apiFunctions";
import { useUser } from "../contexts/UserContext";

// mock the createTask function
apiFunctions.createTask = jest.fn();

// mock useUser user context hook
jest.mock("../contexts/UserContext", () => ({
    useUser: jest.fn(),
}));

// Set a default mock userUser with userId 1
useUser.mockReturnValue({userId: 1, setUserId: jest.fn()});

describe('CreateTask Component', () => {
    // test that name textbox is rendered
    test('name textbox is rendered', async () => {
        const { getByLabelText } = render(<CreateTask />);
        const nameTextBox = getByLabelText(/name/i);
        expect(nameTextBox).toBeInTheDocument();
    });

    // test that description textbox is rendered
    test('description textbox is rendered', async () => {
        const { getByLabelText } = render(<CreateTask />);
        const descriptionTextBox = getByLabelText(/description/i);
        expect(descriptionTextBox).toBeInTheDocument();
    });

    // test that create task button is rendered
    test('create task button is rendered', () => {
        const { getByRole } = render(<CreateTask />);
        const createTaskButton = getByRole('button', { name: /create/i });
        expect(createTaskButton).toBeInTheDocument();
    });

    // test that clear button is rendered
    test('clear button is rendered', () => {
        const { getByRole } = render(<CreateTask />);
        const clearTaskButton = getByRole('button', { name: /clear/i });
        expect(clearTaskButton).toBeInTheDocument();
    });

    // test that name is required
    test('name is required displays error message', async () => {
        const { getByRole, getByLabelText, findByText } = render(<CreateTask />);
        const createTaskButton = getByRole('button', { name: /create/i });
        const descriptionTextBox = getByLabelText(/description/i);

        fireEvent.change(descriptionTextBox, { target: { value: 'Description 1' } });
        fireEvent.click(createTaskButton);

        const nameRequired = await findByText(/name is required/i);

        expect(nameRequired).toBeInTheDocument();
    });

    // test that description is required
    test('description is required displays error message', async () => {
        const { getByRole, getByLabelText, findByText } = render(<CreateTask />);
        const createTaskButton = getByRole('button', { name: /create/i });
        const nameTextBox = getByLabelText(/name/i);

        fireEvent.change(nameTextBox, { target: { value: 'Task 1' } });
        fireEvent.click(createTaskButton);

        const descriptionRequired = await findByText(/description is required/i);

        expect(descriptionRequired).toBeInTheDocument();
    });

    // test that a valid task is successfully created, shows success message
    test('valid task is successfully created, shows success message', async () => {
        // mock the createTask function
        apiFunctions.createTask.mockResolvedValueOnce({status: "Success", task: {id: 2, userId: 1, name: "Task 1", description: "Description 1"}});
        // mock the user with user id 1
        useUser.mockReturnValue({userId: 1, setUserId: jest.fn()});


        const { getByRole, getByLabelText, findByText } = render(<CreateTask />);
        const createTaskButton = getByRole('button', { name: /create/i });
        const nameTextBox = getByLabelText(/name/i);
        const descriptionTextBox = getByLabelText(/description/i);

        fireEvent.change(nameTextBox, { target: { value: 'Task 1' } });
        fireEvent.change(descriptionTextBox, { target: { value: 'Description 1' } });
        fireEvent.click(createTaskButton);

        const taskCreated = await findByText(/task created/i);

        expect(taskCreated).toBeInTheDocument();
    });

    // test that a valid task creation clears the form
    test('valid task creation clears form', async () => {
        // mock the createTask function
        apiFunctions.createTask.mockResolvedValueOnce({status: "Success", task: {id: 2, userId: 1, name: "Task 1", description: "Description 1"}});
        // mock the user with user id 1
        useUser.mockReturnValue({userId: 1, setUserId: jest.fn()});

        const { getByRole, getByLabelText, findByText } = render(<CreateTask />);
        const createTaskButton = getByRole('button', { name: /create/i });
        const nameTextBox = getByLabelText(/name/i);
        const descriptionTextBox = getByLabelText(/description/i);

        fireEvent.change(nameTextBox, { target: { value: 'Task 1' } });
        fireEvent.change(descriptionTextBox, { target: { value: 'Description 1' } });
        fireEvent.click(createTaskButton); 
        
        expect(nameTextBox.value).toBe('');
        expect(descriptionTextBox.value).toBe('');
    });

    // test that unsuccessful save displays error message
    test('unsuccessful save displays error message', async () => {
        // mock an error from the server
        apiFunctions.createTask.mockResolvedValueOnce({status: "Error", message: "Error creating task"});
        // mock the user with user id 1
        useUser.mockReturnValue({ userId: 1, setUserId: jest.fn() });

        const { getByRole, getByLabelText, findByText } = render(<CreateTask />);
        const createTaskButton = getByRole('button', { name: /create/i });
        const nameTextBox = getByLabelText(/name/i);
        const descriptionTextBox = getByLabelText(/description/i);

        fireEvent.change(nameTextBox, { target: { value: 'Task 1' } });
        fireEvent.change(descriptionTextBox, { target: { value: 'Description 1' } });
        fireEvent.click(createTaskButton); 
        
        const errorMessage = await findByText(/error creating task/i);
        expect(errorMessage).toBeInTheDocument();
    });

    // test that non-logged in user receives error message
    test('non-logged in user displays error message', async () => {
        // mock a non-logged in user
        useUser.mockReturnValue({ userId: null, setUserId: jest.fn() });

        const { findByText } = render(<CreateTask />);
        const errorMessage = await findByText(/not logged in/i);
        expect(errorMessage).toBeInTheDocument();
    });
});