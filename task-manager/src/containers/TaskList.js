import { useState, useEffect } from "react";
import { TaskItem } from "../components/TaskItem";
import { getTasks } from "../functions/apiFunctions";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export function TaskList() {
    const {userId} = useUser();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(!userId) return;

                setLoading(true);
                setError('');

                const data = await getTasks(userId);

                // Check for errors
                if(data.status != 'Success') {
                    setError('Unable to retrieve tasks');
                    
                } else {
                    setTasks(data.tasks);
                    
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }            
        }

        fetchData();

    }, []);

    return (
        <>
            <h1>Task List</h1>
            {!userId && <p>User not logged in</p>}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {tasks && tasks.length == 0 && <p>No tasks found</p>}
            {userId && <Link to="/tasks/create" role="button">Create Task</Link>}
            {tasks && tasks.length > 0 && 
                <ul>
                    {tasks.map(t => <li key={t.id}><TaskItem key={t.id} name={t.name} description={t.description} /></li>)}
                </ul> 
            }
        </>
    );
}