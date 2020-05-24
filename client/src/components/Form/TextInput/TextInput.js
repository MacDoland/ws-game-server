import React from 'react';
import './TextInput.scss';



const TextInput = ({label, id, name, value,  onChange, onKeyUp}) => {

    const renderLabel = () => {
        if(label) {
            return <label className="text-input__label" htmlFor={id}>{label}</label>
        }
    }

    return (
        <div className="text-input">
            {renderLabel()}
            <input className="text-input__input" id={id} name={name} type="text" value={value} onChange={onChange} onKeyUp={onKeyUp} />
        </div>
    )
}

export default TextInput;