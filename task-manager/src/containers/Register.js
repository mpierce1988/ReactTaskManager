import { useState } from 'react';
import { register } from '../functions/apiFunctions';
import { Form, Alert, Button } from 'react-bootstrap';

export function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const reset = () => {
        setLoading(false);
        setError('');
        setSuccess(false);
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setConfirmPasswordError('');

        setEmail('');
        setName('');
        setPassword('');
        setConfirmPassword('');
    }

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');
        setSuccess(false);
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setConfirmPasswordError('');

        let errorCount = 0;


        // validate required fields
        if (!email || email === '') {
            setEmailError('Email is required');
            errorCount++;
        }

        if (!name || name === '') {
            setNameError('Name is required');
            errorCount++;
        }

        if(!password || password === ''){
            setPasswordError('Password is required');
            errorCount++;
        }

        // validate password and confirmPassword match
        if(password !== confirmPassword){
            setConfirmPasswordError('Passwords do not match');
            errorCount++;
        }

        // Validate all fields are valid. If not, show general error message
        if (errorCount > 0) {
            setError('Some fields are missing or incomplete');
            setLoading(false);
            return;
        }

        try {  
            const data = await register(email, name, password);

            if (data.status === 'Success') {
                setSuccess(true);
                setError('');
                
            } else {
                setSuccess(false);
                setError('An error occurred while trying to register');
            }            
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1 className='display-1'>Register</h1>
            {loading && <p>Loading...</p>}
            {error && <Alert variant="warning">The following error has occured: {error}</Alert>}
            {success && <Alert variant="success">Registration successful. Please Login.</Alert>}
            <Form onSubmit={submit}>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    {emailError && <Alert variant="danger">{emailError}</Alert>}
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)}/>
                    {nameError && <Alert variant="danger">{nameError}</Alert>}
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    {passwordError && <Alert variant='danger'>{passwordError}</Alert>}
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                    <Form.Control type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/> 
                    {confirmPasswordError && <Alert variant="danger">{confirmPasswordError}</Alert>}
                </Form.Group>
                <Button variant="primary" type="submit" role='button'>Register</Button>    
                <Button variant="secondary" type="button" role='button' onClick={reset}>Reset</Button>          
            </Form>
        </>
    );
}