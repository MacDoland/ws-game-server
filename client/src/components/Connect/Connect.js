import React, { useEffect, useContext, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { ServerContext } from '../../context/server-context';
import { connectToServerEffect } from '../../effects';
import './Connect.scss';

const Connect = () => {
    const [state, dispatch] = useContext(ServerContext);
    const history = useHistory();
    let timeoutRef = useRef({});

    const attemptConnection = () => {
        //connect
        console.log("Attempting connection...");
        connectToServerEffect(dispatch, history);
    }

    useEffect(() => {
        if (!state.webSocketConnectionAlive || state.webSocketConnection.readyState === 3 ) {
            clearTimeout(timeoutRef.current);
          //  timeoutRef.current = setTimeout(attemptConnection, 10000)
        }
        else {
            clearTimeout(timeoutRef.current);
        }
    }, [state.webSocketConnection, state.webSocketConnectionAlive])


    return (
        <div className="connect">
            <p>Connecting to server...</p>
        </div>
    )
}

export default Connect;