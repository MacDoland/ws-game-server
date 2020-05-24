import React from 'react';
import './Field.scss';

const Field = ({ children, isColumn }) => {

    const getModifiers = () => {
        return isColumn ? ' field--column' : ''
    };

    return (
        <div className={"field" + getModifiers()}>
            {children}
        </div>
    )
}

export default Field;