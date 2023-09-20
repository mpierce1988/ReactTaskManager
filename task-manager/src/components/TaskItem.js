import { useNavigate } from "react-router-dom";

export function TaskItem({ taskId, name, description}) {
    const navigate = useNavigate();

    const goToUpdateTask = () => {
        navigate('/tasks/' + taskId);
    }

    return (
        <>
            <h2>{name}</h2>
            <p>{description}</p>
            <button role='button' aria-label='edit' name='edit' onClick={goToUpdateTask}>Edit</button>
            <button role='button' aria-label='delete' name='delete'>Delete</button>
        </>
    );
}