import { useState } from 'react';
import { register } from '../functions/apiFunctions';

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

        const errors = [];


        // validate required fields
        if (!email || email === '') {
            setEmailError('Email is required');
            errors.push('Email is required');
        }

        if (!name || name === '') {
            setNameError('Name is required');
            errors.push('Name is required');
        }

        if(!password || password === ''){
            setPasswordError('Password is required');
            errors.push('Password is required');
        }

        // validate password and confirmPassword match
        if(password !== confirmPassword){
            setConfirmPasswordError('Passwords do not match');
            errors.push('Passwords do not match');
        }

        // Validate all fields are valid. If not, show general error message
        if (errors.length > 0) {
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
            <h1>Register</h1>
            {error && <p>The following error has occured: {error}</p>}
            {success && <p>Registration successful</p>}
            <form onSubmit={submit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                {emailError && <p>{emailError}</p>}
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)}/>
                {nameError && <p>{nameError}</p>}
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                {passwordError && <p>{passwordError}</p>}
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/> 
                {confirmPasswordError && <p>{confirmPasswordError}</p>}
                <button type="submit" role='button'>Register</button>    
                <button type="button" role='button' onClick={reset}>Reset</button>          
            </form>
        </>
    );
}