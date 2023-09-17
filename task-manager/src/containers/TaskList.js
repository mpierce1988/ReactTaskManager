import { useState, useEffect } from "react";
import { TaskItem } from "../components/TaskItem";
import { getTasks } from "../functions/apiFunctions";
import { useUser } from "../contexts/UserContext";

export function TaskList() {
    const {userId} = useUser();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
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

        setLoading(false);
        }

        fetchData();

    }, []);

    return (
        <>
            <h1>Task List</h1>
            {!userId && <p>User not logged in</p>}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {tasks.length == 0 && <p>No tasks found</p>}
            {userId && <button role='button' name='create'>Create Task</button>}
            {tasks.length > 0 && 
                <ul>
                    {tasks.map(t => <li key={t.id}><TaskItem key={t.id} name={t.name} description={t.description} /></li>)}
                </ul> 
            }
        </>
    );
}