import { useState, useEffect } from "react";
import { TaskItem } from "../components/TaskItem";
import { getTasks } from "../functions/apiFunctions";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { Alert, Nav, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

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

    }, [userId]);

    return (
        <>
            <h1 className="display-1">Task List</h1>
            {!userId && <Alert variant="danger">User not logged in</Alert>}
            {loading && <p>Loading...</p>}
            {error && <Alert variant="warning">{error}</Alert>}
            {tasks && tasks.length == 0 && <Alert variant="warning">No tasks found</Alert>}
            {userId &&
                <LinkContainer to="/tasks/create" className="mt-3 mb-3"> 
                    <Button variant='success' role="button">Create Task</Button>
                </LinkContainer>
            }
            {tasks && tasks.length > 0 && 
                <div>
                    <p>Number of Tasks: {tasks.length}</p>
                    <Table>
                        <thead>
                            <th>Name</th>
                            <th>Description</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {tasks.map(t => <tr key={t.id}>
                                <TaskItem taskId={t.id} name={t.name} description={t.description} />
                            </tr>)}
                        </tbody>
                    
                    </Table>
                </div> 
            }
        </>
    );
}