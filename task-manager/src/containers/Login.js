import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../functions/apiFunctions';

export function Login(){
    const { setUserId } = useUser();
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
            // validate email was entered
            if (!email || email === '') {
                setEmailError('Email is required');                
            }

            // validate password was entered
            if (!password || password === '') {
                setPasswordError('Password is required');                
            }
            
            if(emailError || passwordError) {
                throw new Error('Invalid email or password');
            }            
                      
            const data = await login(email, password);

            if (data.status === 'Success') {               
                setUserId(data.user.id);
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
        <h1>Login</h1>
        {loading && <p>Loading...</p>}
        {error && <p>There was an error logging in</p>}
        {success && <p>Login successful!</p>}
        <form onSubmit={submit}>            
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            {emailError && <p>{emailError}</p>}
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            {passwordError && <p>{passwordError}</p>}
            <button type="submit" name="login" role="button">Login</button>
            <button type="button" name="reset" role="button" onClick={reset}>Reset</button>
        </form>
        </>
    );
}