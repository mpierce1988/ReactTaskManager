import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export function Header() {
    const navigate  = useNavigate();
    const { userId, setUserId } = useUser();

    const handleLogout = () => {
        setUserId(null);
        navigate('/login');
    }

    return (
        <>
            <nav>
                <Link to="/">Home</Link> | 
                { userId === null ? (
                    <>
                        | <Link to="/register">Register</Link> | 
                        | <Link to="/login">Login</Link>  
                    </>
                ) : (
                    <>
                        | <Link to="/tasks">Tasks</Link> | 
                        | <Link to="/about">About</Link> |
                        | <button onClick={handleLogout}>Logout</button>
                    </>
                ) }                
                
            </nav>
        </>
    );
}