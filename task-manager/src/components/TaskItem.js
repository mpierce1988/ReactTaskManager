import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


export function TaskItem({ taskId, name, description}) {
    const navigate = useNavigate();

    const goToUpdateTask = () => {
        navigate('/tasks/' + taskId);
    }

    const goToDeleteTask = () => {
        navigate('/tasks/' + taskId + '/delete');
    }

    return (
        <>
            <td>{name}</td>
            <td>{description}</td>
            <td>
                <Button variant='info' role='button' aria-label='edit' name='edit' onClick={goToUpdateTask}>Edit</Button>
                <Button variant='danger' role='button' aria-label='delete' name='delete' onClick={goToDeleteTask}>Delete</Button>
            </td>            
        </>
    );
}