import { DeleteTask } from "./DeleteTask";
import { render, screen, act } from "@testing-library/react";
import * as apiFunctions from "../functions/apiFunctions";
import { useUser } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import { BrowserRouter} from "react-router-dom";

// mock the deleteTask function
apiFunctions.deleteTask = jest.fn();
apiFunctions.getTask = jest.fn();

// mock useUser user context hook
jest.mock("../contexts/UserContext", () => ({
    useUser: jest.fn(),
}));

// mock useParams hook
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

// Set mock parameters before each test
beforeEach(() => {
    useUser.mockReturnValue({userId: 1, setUserId: jest.fn()});
    useParams.mockReturnValue({id: 1});
    apiFunctions.getTask.mockResolvedValue({status: "Success", task: {id: 1, userId: 1, name: "Task 1", description: "Description 1"}});
});

const renderWithRouter = (ui) => {
    return render(
        <BrowserRouter>
            {ui}
        </BrowserRouter>
    );
}

describe('DeleteTask Component', () => {
    // test that the task name is rendered
    test('task name is rendered', async () => {
        renderWithRouter(<DeleteTask />);

        const taskName = await screen.findByText(/task 1/i);
        expect(taskName).toBeInTheDocument();
    });

    // test that description is rendered
    test('task description is rendered', async () => {
        renderWithRouter(<DeleteTask />);

        const taskDescription = await screen.findByText(/description 1/i);
        expect(taskDescription).toBeInTheDocument();
    });

    // test that delete task button is rendered
    test('delete task button is rendered', async () => {
        renderWithRouter(<DeleteTask />);

        const deleteTaskButton = await screen.findByRole('button', {name: /delete/i});
        expect(deleteTaskButton).toBeInTheDocument();
    });

    // test that cancel button is rendered
    test('cancel button is rendered', async () => {
        renderWithRouter(<DeleteTask />);

        const cancelButton = await screen.findByRole('button', {name: /cancel/i});
        expect(cancelButton).toBeInTheDocument();
    });

    // test that delete task button calls deleteTask function
    test('delete task button calls deleteTask function', async () => {
        renderWithRouter(<DeleteTask />);

        const deleteTaskButton = await screen.findByRole('button', {name: /delete/i});

        await act(async () => {
            fireEvent.click(deleteTaskButton);
        });

        expect(apiFunctions.deleteTask).toHaveBeenCalledTimes(1);
    });

    // test that successful delete displays success message
    test('successful delete displays success message', async () => {
        apiFunctions.deleteTask.mockResolvedValueOnce({status: "Success", task: {id: 1, userId: 1, name: "Task 1", description: "Description 1"}});
        renderWithRouter(<DeleteTask />);

        const deleteTaskButton = await screen.findByRole('button', {name: /delete/i});

        await act(async () => {
            fireEvent.click(deleteTaskButton);
        });

        const successMessage = await screen.findByText(/task deleted successfully/i);
        expect(successMessage).toBeInTheDocument();
    });

    // test that unable to delete displays error message
    test('unable to delete displays error message', async () => {
        apiFunctions.deleteTask.mockResolvedValueOnce({status: "Error", message: "Unable to delete task"});
        renderWithRouter(<DeleteTask />);

        const deleteTaskButton = await screen.findByRole('button', {name: /delete/i});

        await act(async () => {
            fireEvent.click(deleteTaskButton);
        });

        const errorMessage = await screen.findByText(/unable to delete task/i);
        expect(errorMessage).toBeInTheDocument();
    });
});