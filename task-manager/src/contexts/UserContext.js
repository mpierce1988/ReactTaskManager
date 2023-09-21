import {createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    // load initial userId from localStorage if available
    useEffect(() => {
        const storageUserId = localStorage.getItem('userId');
        if(storageUserId) {
            setUserId(storageUserId);
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

    const value = {
        userId,
        setUserId: setAndStoreUserId
    };

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    );
};