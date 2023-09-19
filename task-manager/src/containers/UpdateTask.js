import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTask, updateTask } from "../functions/apiFunctions";
import { useParams } from "react-router-dom";


export function UpdateTask() {
    // set loading, error and success states
    const [ loading, setLoading ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState('');

    // create state variables for name and description
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    // create error variables for name and description
    const [ nameError, setNameError ] = useState('');
    const [ descriptionError, setDescriptionError ] = useState('');

    // get userId from user context
    const { userId } = useUser();

    // get taskId from params
    const { taskId } = useParams();

    // Retrieve task from api
    useEffect(() => {
        // validate a userId is present
        if(!userId || userId == '') {
            setError('User not logged in');
            return;
        }

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
                setError("Error retrieving task");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        // Set loading, error and success states
        setLoading(true);
        setError('');
        setSuccess(false);

        // validate required fields
        let errorCount = 0;

        if(!name || name === '') {
            setNameError('Name is required');
            errorCount++;
        }

        if(!description || description === '') {
            setDescriptionError('Description is required');
            errorCount++;
        }

        // if there are errors, exit
        if(errorCount > 0){
            setLoading(false);
            return;
        }

        // perform updateTask apiFunction inside a try catch
        try {
            const data = await updateTask(userId, taskId, name, description);

            // check for success status
            if(data.status === 'Success'){
                setSuccess(true);
            } else {
                setError('Error updating task');
            }
        } catch (error) {
            setError('Error updating task');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Update Task</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {success && <p>Task Updated Successfully!</p>}
            {!userId && <p>User not logged in</p>}
            {userId && 
                <form onSubmit={submit}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={name} onChange={e => setName(e.target.value)}/>
                    {nameError && <p>{nameError}</p>}
                    <label htmlFor="description">Description</label>
                    <input id="description" type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                    {descriptionError && <p>{descriptionError}</p>}
                    <button type="submit">Update</button>                    
                </form>
            }
        </>
    );
}