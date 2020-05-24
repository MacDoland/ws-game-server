import React from 'react';
import './RadioInput.scss';

const RadioInput = ({label, id, name}) => {
    return (
        <div className="radio-input">
            <label className="radio-input__label" htmlFor={id}>{label}</label>
            <input className="radio-input__input" id={id} name={name} type="radio" />
        </div>
    )
}

export default RadioInput;