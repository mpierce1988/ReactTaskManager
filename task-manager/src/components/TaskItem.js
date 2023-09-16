

export function TaskItem({id, name, description}) {
    return (
        <>
            <h2>{name}</h2>
            <p>{description}</p>
            <button role='button' aria-label='edit' name='edit'>Edit</button>
            <button role='button' aria-label='delete' name='delete'>Delete</button>
        </>
    );
}