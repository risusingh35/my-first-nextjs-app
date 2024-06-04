import React from 'react';
import './FloatingLabelInput.css'; 

const FloatingLabelInput = ({ label, type, name, value, onChange }) => {
    return (
        <div className="form-group">
            <input
                type={type}
                name={name}
                className="form-control"
                value={value}
                onChange={onChange}
                required
                placeholder={label}
            />
            <label className={`form-label ${value ? 'filled' : ''}`}>
                {label}
            </label>
        </div>
    );
};

export default FloatingLabelInput;
