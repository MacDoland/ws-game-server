import React from 'react';
import './Button.scss';

const Button = ({ children,  onClick, disabled }) => {
    return (
        <button className="button" onClick={onClick} disabled={disabled}>{ children }</button>
    )
}

export default Button;