import {createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    const value = {
        userId,
        setUserId
    };

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    );
};