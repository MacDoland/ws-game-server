import React from 'react';
import './Panel.scss';

const Panel = ({ children, className }) => {

    const combineClassNames = (className) => {
        return ['panel', className].join(' ');
    }

    return (
        <div className={combineClassNames(className)}>
            {children}
        </div>
    )
}

export default Panel;