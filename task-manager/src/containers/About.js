
export function About(){
    const currentYear = new Date().getFullYear();
    return (
        <>
            
            <h1>Task Manager &copy; {currentYear}</h1>
            <p>Task Manager is a simple task management application built using React and Node.js.</p>
            
        </>
    );
}