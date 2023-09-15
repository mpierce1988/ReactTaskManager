import { useState, useEffect } from 'react';

export function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');    

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

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

            // make an API request
            const response = await fetch('http://localhost:4000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password})
            });

            const data = await response.json();
            console.log("Data: " + JSON.stringify(data));

            if (data.status === 'Success') {
                console.log("Data returned Success");
                setSuccess(true);
                setError(false);
            } else {
                console.log("Data returned Error");
                setError(true);
                setSuccess(false);
            }
        } catch (error) {
            console.log("TryCatch Error: " + error);
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