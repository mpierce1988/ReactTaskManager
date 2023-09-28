import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { createTask } from "../functions/apiFunctions";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function CreateTask() {
    // set loading, error and success states
    const [ loading, setLoading ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState('');

    // get user id and token from user context
    const {userId, token} = useUser();
    

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
        setNameError('');
        setDescriptionError('');
        setError('');
    };

    // get navigate from useNavigate
    const navigate = useNavigate();

    const redirectToTasks= () => {
        navigate('/tasks');
    }

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
            const data = await createTask(userId, name, description, token);

            // check data for success or error status
            if(data.status === 'Success') {
                setSuccess(true);
                redirectToTasks();
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
            <h1 className='display-1'>Create Task</h1>
            {loading && <p>Loading...</p>}
            {error && <Alert variant="warning">Error creating task</Alert>}
            {success && <Alert variant="success">Task created successfully!</Alert>}
            {!userId && <Alert variant="info">User not logged in</Alert>}
            {userId && 
                <Form onSubmit={submit}>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
                        {nameError && <Alert variant='danger'>{nameError}</Alert>}
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor="description">Description</Form.Label>
                        <Form.Control id="description" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                        {descriptionError && <Alert variant='danger'>{descriptionError}</Alert>}
                    </Form.Group>
                    <Button variant="primary" type="submit">Create</Button>
                    <Button variant="secondary" type="button" role='button' onClick={reset}>Reset</Button>
                </Form>
            }
        </>
    );
}