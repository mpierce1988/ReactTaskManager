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