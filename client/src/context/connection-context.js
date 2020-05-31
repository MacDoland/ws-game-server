import React, {createContext, useRef } from 'react';
import { connect } from '../scripts/network-service';
import config from '../config/app-config';
import { v1 as uuidv1 } from 'uuid';

export const ConnectionContext = createContext();

export const ConnectionContextProvider = ({ children }) => {

    let userId = sessionStorage.getItem(config.gameServerUserIdKey);

    if (!userId) {
      //Generate an ID for current user
      userId = uuidv1();
      sessionStorage.setItem(config.gameServerUserIdKey, userId);
    }

    const connectionUrl = `${config.serverUrl}?userId=${userId}`;
    let connection = useRef(connect(connectionUrl));

    return (
        <ConnectionContext.Provider value={connection}>
            {children}
        </ConnectionContext.Provider>
    )
} 
