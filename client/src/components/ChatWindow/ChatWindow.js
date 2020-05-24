import React from 'react';
import './ChatWindow.scss';

const ChatWindow = ({ messages = [] }) => {
    return (
       <div className="chat-window">

            {
                messages.map((message, index) => <div key={'message-'+index} className="chat-window__message"><span className="chat-window__message__author">{message.author}</span>: {message.content}</div>)
            }

       </div>
    )
}

export default ChatWindow;