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

export const getTask = async (userId, taskId) => {
    // Make API request
    const response = await fetch('http://localhost:4000/api/tasks/' + userId + '/' + taskId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    return data;
}

export const getTasks = async (userId) => {
    // Make API request
    const response = await fetch('http://localhost:4000/api/tasks/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    return data;
}

export const createTask = async (userId, name, description) => {
    // Make API request
    const response = await fetch('http://localhost:4000/api/tasks/' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    });

    const data = await response.json();

    return data;
}

export const updateTask = async (userId, taskId, name, description) => {
    // Make API request
    const response = await fetch('http://localhost:4000/api/tasks/' + userId + '/' + taskId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    });

    const data = await response.json();

    return data;
}

export const deleteTask = async (userId, taskId) => {
    // Make API request
    const response = await fetch('http://localhost:4000/api/tasks/' + userId + '/' + taskId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    return data;
}