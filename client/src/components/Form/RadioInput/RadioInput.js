import React from 'react';
import './RadioInput.scss';

const RadioInput = ({label, id, name, value, checked, onChange}) => {
    return (
        <div className="radio-input">
            <input className="radio-input__input" id={id} name={name} type="radio" value={value} checked={checked} onChange={onChange} />
            <label className="radio-input__label" htmlFor={id}>{label}</label>
        </div>
    )
}

export default RadioInput;