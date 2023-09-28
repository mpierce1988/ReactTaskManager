const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
    // make an API request
    const response = await fetch(API_URL + '/user/login', {
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
    const response = await fetch(API_URL + '/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, password})
    });

    const data = await response.json();
    
    return data;
}

export const getTask = async (userId, taskId, token) => {
    // Make API request
    const response = await fetch(API_URL + '/tasks/' + userId + '/' + taskId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });

    const data = await response.json();

    return data;
}

export const getTasks = async (userId, token) => {
    // Make API request
    const response = await fetch(API_URL + '/tasks/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });

    const data = await response.json();

    return data;
}

export const createTask = async (userId, name, description, token) => {
    // Make API request
    const response = await fetch(API_URL + '/tasks/' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ name, description })
    });

    const data = await response.json();

    return data;
}

export const updateTask = async (userId, taskId, name, description, token) => {
    // Make API request
    const response = await fetch(API_URL + '/tasks/' + userId + '/' + taskId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ name, description })
    });

    const data = await response.json();

    return data;
}

export const deleteTask = async (userId, taskId, token) => {
    // Make API request
    const response = await fetch(API_URL + '/tasks/' + userId + '/' + taskId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });

    const data = await response.json();

    return data;
}