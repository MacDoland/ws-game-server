import React, { useEffect, useContext, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { ConnectionContext } from '../../context/connection-context';
import { ServerContext } from '../../context/server-context';
import { connectToServerEffect } from '../../effects';
import './Connect.scss';

const Connect = () => {
    const connection = useContext(ConnectionContext);
    const [state, dispatch] = useContext(ServerContext);
    const history = useHistory();
    let timeoutRef = useRef({});

    const attemptConnection = () => {
        //connect
        console.log("Attempting connection...");
        connection.current = connectToServerEffect(dispatch, history);
    }

    useEffect(() => {
        if (!state.webSocketConnectionAlive || connection.readyState === 3 ) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(attemptConnection, 10000)
        }
        else {
            clearTimeout(timeoutRef.current);
        }
    }, [connection.current, state.webSocketConnectionAlive])


    return (
        <div className="connect">
            <p>Connecting to server...</p>
        </div>
    )
}

export default Connect;