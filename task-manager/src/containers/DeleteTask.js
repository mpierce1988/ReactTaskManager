import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTask, deleteTask } from "../functions/apiFunctions";
import { useUser } from "../contexts/UserContext";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function DeleteTask(){
    // set loading, error and success states
    const [ loading, setLoading ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState('');

    // create state variables for task fields
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    // get taskId from params
    const { taskId } = useParams();
    // get userId from user context
    const { userId } = useUser();

    // get navigate from react-router-dom
    const navigate = useNavigate();

    // Retrieve task from api
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const data = await getTask(userId, taskId);

                // check for success status
                if(data.status === 'Success') {
                    // set name and description variable
                    setName(data.task.name);
                    setDescription(data.task.description);
                } else {
                    setError('Error retrieving task');
                }
            } catch (error) {
                
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [userId]);

    // submit form
    const submit = async (e) => {
        e.preventDefault();

        // set loading, error and success states
        setLoading(true);
        setSuccess(false);
        setError('');

        // perform deleteTask apiFunction inside a try catch
        try {
            const data = await deleteTask(userId, taskId);

            // check for success status
            if(data.status === 'Success'){
                setSuccess(true);
            } else {
                setError('Unable to delete task');
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    // go back to tasks on cancel
    const cancel = () => {
        navigate('/tasks');
    }


    return (
        <>
            <h1 className="display-1">Delete Task</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {success && <p>Task deleted successfully</p>}
            <p>Are you sure you want to delete this task?</p>
            <p data-testid='task-name'>Name: {name}</p>
            <p data-testid='task-description'>Description: {description}</p>
            <form onSubmit={submit}>                
                <Button variant="danger" type="submit">Delete</Button>
                <Button variant="primary" role='button' type='button' onClick={cancel}>Cancel</Button>
            </form>
        </>
    );
}