export const login = async (email, password) => {
    // make an API request
    const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password})
    });

    const data = await response.json();

    return data;
}

export const register = async (email, name, password ) => {
    // make an API request
    const response = await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, password})
    });

    const data = await response.json();
    
    return data;
}

export const getTask = async (taskId) => {
    // Make API request
    const response = await fetch('http://localhost:4000/api/task/' + taskId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    return data;
}