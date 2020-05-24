import React from 'react';
import './Field.scss';

const Field = ({ children, isColumn, className }) => {

    const getModifiers = () => {
        return isColumn ? ' field--column' : ''
    };

    const combineClassNames = (className) => {
        return ['field', className].join(' ');
    }

    return (
        <div className={combineClassNames(className) + getModifiers()}>
            {children}
        </div>
    )
}

export default Field;