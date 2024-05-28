import React from 'react';
import './FloatingLabelInput.css';

const FloatingLabelTextarea = ({ label, name, value, onChange }) => {
    return (
        <div className="form-group">
            <textarea
                name={name}
                className="form-control"
                value={value}
                onChange={onChange}
                required
            />
            <label className={`form-label ${value ? 'filled' : ''}`}>
                {label}
            </label>
        </div>
    );
};

export default FloatingLabelTextarea;
