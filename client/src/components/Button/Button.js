import React from 'react';
import './Button.scss';

const Button = ({ children,  onClick, disabled, className }) => {
    const combineClassNames = (className) => {
        return ['button', className].join(' ');
    }

    return (
        <button className={combineClassNames(className)} onClick={onClick} disabled={disabled}>{ children }</button>
    )
}

export default Button;