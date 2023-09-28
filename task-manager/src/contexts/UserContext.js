import {createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    // load initial userId from localStorage if available
    useEffect(() => {
        const storageUserId = localStorage.getItem('userId');
        const storageToken = localStorage.getItem('token');
        if(storageUserId) {
            setUserId(storageUserId);
        }

        if(storageToken){
            setToken(storageToken)
        }
    }, []);

    const setAndStoreUserId = (newUserId) => {
        setUserId(newUserId);

        // if userId is not null, save to local storage. otherwise, remove userId from local storage
        if(newUserId) {
            localStorage.setItem('userId', newUserId);
        } else {
            localStorage.removeItem('userId');
        }
    }

    const setAndStoreToken = (token) => {
        setToken(token);

        // if token is not null, save to local storage. otherwise, remove userId from local storage
        if(token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    const value = {
        userId,
        setUserId: setAndStoreUserId,
        token,
        setToken: setAndStoreToken
    };

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    );
};