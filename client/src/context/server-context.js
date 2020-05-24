import React, { useReducer, createContext } from 'react';
import reducer from '../reducers/server-reducer';
import initialState from '../state/default-state';

export const ServerContext = createContext();

export const ServerContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ServerContext.Provider value={[state, dispatch]}>
            {children}
        </ServerContext.Provider>
    )
} 
