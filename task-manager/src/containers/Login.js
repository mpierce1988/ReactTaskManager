import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../functions/apiFunctions';
import { Form, Button, Alert } from 'react-bootstrap';

export function Login(){
    const { setUserId, setToken } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');    

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const reset = () => {
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
        setLoading(false);
        setError(false);
        setSuccess(false);
    }

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(false);
        setSuccess(false);

        setEmailError('');
       
        setPasswordError('');

        try {
            let errorCount = 0;

            // validate email was entered
            if (!email || email === '') {
                setEmailError('Email is required'); 
                errorCount++;               
            }

            // validate password was entered
            if (!password || password === '') {
                setPasswordError('Password is required');   
                errorCount++;             
            }
            
            if(errorCount > 0) {
                throw new Error('Invalid email or password');
            }            
                      
            const data = await login(email, password);

            if (data.status === 'Success') {               
                setUserId(data.user.id);
                setToken(data.token);
                setSuccess(true);
                setError(false);
                navigate('/');
            } else {
                setError(true);
                setSuccess(false);
            }
        } catch (error) {
            setError(true);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    }

    return(
        <>
        <h1 className='display-1'>Login</h1>
        {loading && <p>Loading...</p>}
        {error && <Alert variant="warning">There was an error logging in</Alert>}
        {success && <Alert variant="success">Login successful!</Alert>}
        <Form onSubmit={submit}>            
            <Form.Group className='mb-3'>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                {emailError && <Alert variant='danger'>{emailError}</Alert>}
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                {passwordError && <Alert variant='danger'>{passwordError}</Alert>}
            </Form.Group>
            <Button variant="primary" type="submit" name="login" role="button">Login</Button>
            <Button variant="secondary" type="button" name="reset" role="button" onClick={reset}>Reset</Button>
        </Form>
        </>
    );
}