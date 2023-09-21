import { UpdateTask } from './UpdateTask';
import { render, fireEvent, screen, act } from '@testing-library/react';
import * as apiFunctions from '../functions/apiFunctions';
import { useUser } from '../contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';

// mock the getTask and updateTask function
apiFunctions.updateTask = jest.fn();
apiFunctions.getTask = jest.fn();

// mock the useUser context hook
jest.mock('../contexts/UserContext.js', () => ({
    useUser: jest.fn()
}));

// set useUser mock before each test
beforeEach(() => {
    useUser.mockReturnValue({userId: 1, setUserId: jest.fn()});
    apiFunctions.getTask.mockResolvedValue({status: "Success", task: {id: 1, userId: 1, name: "Task 1", description: "Description 1"}});
});

describe('UpdateTask Component', () => {
    // test that name textbox is rendered
    test('name textbox is rendered', async () => {
        await act(async () => {
            render(<BrowserRouter><UpdateTask /></BrowserRouter>);
        });

        const nameTextBox = screen.getByLabelText(/name/i);
        expect(nameTextBox).toBeInTheDocument();
    });

    // test that description textbox is rendered
    test('description textbox is rendered', async () => {
        await act(async () => {
            render(<BrowserRouter><UpdateTask /></BrowserRouter>);
        });

        const descriptionTextBox = screen.getByLabelText(/description/i);
        expect(descriptionTextBox).toBeInTheDocument();
    });

    // test that update task button is rendered
    test('update task button is rendered', () => {
        render(<BrowserRouter><UpdateTask /></BrowserRouter>);

        const updateTaskButton = screen.getByRole('button', {name : /update/i});
        expect(updateTaskButton).toBeInTheDocument();
    });

    // test that initial name value from getTask is displayed in the name textbox
    test('initial name from getTask is displayed in textbox', async () => {
        await act(async () => {
            render(<BrowserRouter><UpdateTask /></BrowserRouter>);
        });

        const nameTextBox = screen.getByLabelText(/name/i);
        expect(nameTextBox.value).toBe('Task 1');
    });

    // test that initial description value from getTask is displayed in description textbox
    test('initial description from getTask is displayed in textbox', async () => {
        await act(async () => {
            render(<BrowserRouter><UpdateTask /></BrowserRouter>);
        });

        const descriptionTextBox = screen.getByLabelText(/description/i);
        expect(descriptionTextBox.value).toBe('Description 1');
    });

    // test that name is required
    test('name is required displays error message', async () => {
        await act(async () => {
            render(<BrowserRouter><UpdateTask /></BrowserRouter>);
        });

        const updateTaskButton = screen.getByRole('button', {name : /update/i});
        const nameTextBox = screen.getByLabelText(/name/i);

        await act(async () => {
            fireEvent.change(nameTextBox, {target: {value: ''}});
            fireEvent.click(updateTaskButton);
        });

        const nameRequired = await screen.queryByText(/name is required/i);
        expect(nameRequired).toBeInTheDocument();
    });

    // test that description is required
    test('description is required displays error message', async () => {
        await act(async () => {
            render(<BrowserRouter><UpdateTask /></BrowserRouter>);
        });

        const updateTaskButton = screen.getByRole('button', { name: /update/i});
        const descriptionTextBox = screen.getByLabelText(/description/i);

        await act(async () => {
            fireEvent.change(descriptionTextBox, {target: {value: ''}});
            fireEvent.click(updateTaskButton);
        });

        const descriptionRequired = await screen.queryByText(/description is required/i);
        expect(descriptionRequired).toBeInTheDocument();
    });

    // test that valid task update displays success message
    test('valid update displays success message', async () => {
        // mock a successful updateTask function
        apiFunctions.updateTask.mockResolvedValueOnce({status: "Success", task: {id: 1, userId: 1, name: "Updated Task 1", description: "Updated Description 1"}});

        await act(async () => {
            render(<BrowserRouter><UpdateTask /></BrowserRouter>);
        });

        const updateTaskButton = screen.getByRole('button', { name: /update/i});
        const nameTextBox = screen.getByLabelText(/name/i);
        const descriptionTextBox = screen.getByLabelText(/description/i);

        await act(async () => {
            fireEvent.change(nameTextBox, {target: { value: 'Updated Task 1'}});
            fireEvent.change(descriptionTextBox, { target: { value: 'Updated Description 1'}});
            fireEvent.click(updateTaskButton);
        });

        const successMessage = await screen.queryByText(/success/i);
        expect(successMessage).toBeInTheDocument();
    });

    // test that unsuccessful save displays an error message
    test('unsuccessful update displays error message', async () => {
        // mock an unsuccessful updateTask function
        apiFunctions.updateTask.mockResolvedValueOnce({status: "Error", message: "Error updating task"});

        await act(async () => {
            render(<BrowserRouter><UpdateTask /></BrowserRouter>);
        });

        const updateTaskButton = screen.getByRole('button', { name: /update/i});
        const nameTextBox = screen.getByLabelText(/name/i);
        const descriptionTextBox = screen.getByLabelText(/description/i);

        await act(async () => {
            fireEvent.change(nameTextBox, {target: { value: 'Updated Task 1'}});
            fireEvent.change(descriptionTextBox, { target: { value: 'Updated Description 1'}});
            fireEvent.click(updateTaskButton);
        });

        const errorMessage = await screen.queryByText(/error updating task/i);
        expect(errorMessage).toBeInTheDocument();
    });

    // test that unsuccessful retrieval of task displays an error message
    test('unsuccessful retrieval of task displays error message', async () => {
        // mock an unsuccessful getTask function
        apiFunctions.getTask.mockResolvedValueOnce({status: "Error", message: "Error retrieving task"});

        await act(async () => {
            render(<BrowserRouter><UpdateTask /></BrowserRouter>);
        });

        const errorMessage = await screen.queryByText(/error retrieving task/i);
        expect(errorMessage).toBeInTheDocument();
    });

});