import React from 'react';
import './RadioInput.scss';

const RadioInput = ({label, id, name, value, checked, onChange}) => {
    return (
        <div className="radio-input">
            <label className="radio-input__label" htmlFor={id}>{label}</label>
            <input className="radio-input__input" id={id} name={name} type="radio" value={value} checked={checked} onChange={onChange} />
        </div>
    )
}

export default RadioInput;