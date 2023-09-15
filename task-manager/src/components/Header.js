import { Link } from 'react-router-dom';

export function Header() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link> | 
                | <Link to="/register">Register</Link> | 
                | <Link to="/login">Login</Link> | 
                | <Link to="/tasks">Tasks</Link> | 
                | <Link to="/about">About</Link>
            </nav>
        </>
    );
}