import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { createTask } from "../functions/apiFunctions";

export function CreateTask() {
    // set loading, error and success states
    const [ loading, setLoading ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState('');

    // get user id from user context
    const {userId} = useUser();
    

    // create state variables for form fields
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    // create error variables for name and description validation
    const [ nameError, setNameError ] = useState('');
    const [ descriptionError, setDescriptionError ] = useState('');   

    // reset form fields
    const reset = () => {
        setName('');
        setDescription('');
    };

    // submit form
    const submit = async (e) => {
        e.preventDefault();        

        // set loading, error and success states
        setLoading(true);
        setSuccess(false);
        setError('');

        // Validate required fields
        let errorCount = 0;

        // validate name was entered
        if(!name || name === ''){
            setNameError('Name is required');
            errorCount++;
        }

        // validate a description was entered
        if(!description || description === ''){
            setDescriptionError('Description is required');
            errorCount++;
        }

        // if there are errors, exit
        if(errorCount > 0) {
            setLoading(false);
            return;
        };

        // perform createTask apiFunction inside a try catch
        try {
            const data = await createTask(userId, name, description);

            // check data for success or error status
            if(data.status === 'Success') {
                setSuccess(true);
                reset();
            } else {
                setError('Error creating task');
            }
        } catch (error) {
            setError('Error creating task');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Create Task</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error creating task</p>}
            {success && <p>Task created successfully!</p>}
            {!userId && <p>User not logged in</p>}
            {userId && 
                <form onSubmit={submit}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={name} onChange={e => setName(e.target.value)}/>
                    {nameError && <p>{nameError}</p>}
                    <label htmlFor="description">Description</label>
                    <input id="description" type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                    {descriptionError && <p>{descriptionError}</p>}
                    <button type="submit">Create</button>
                    <button type="button" role='button' onClick={reset}>Reset</button>
                </form>
            }
        </>
    );
}