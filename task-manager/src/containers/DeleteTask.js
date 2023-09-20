import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTask, deleteTask } from "../functions/apiFunctions";
import { useUser } from "../contexts/UserContext";

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


    return (
        <>
            <h1>Delete Task</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {success && <p>Task deleted successfully</p>}
            <form onSubmit={submit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={name} readOnly={true} data-testid="task-name"/>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" value={description} readOnly={true} data-testid="task-description"/>
                <button type="submit">Delete</button>
                <button role='button' type='button'>Cancel</button>
            </form>
        </>
    );
}