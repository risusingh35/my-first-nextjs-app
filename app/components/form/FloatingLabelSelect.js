import React from 'react';
import './FloatingLabelSelect.css'; 
const FloatingLabelSelect = ({ label, name, value, onChange, options }) => {
    return (
        <div className="form-group">
            <select
                name={name}
                className="form-control"
                value={value}
                onChange={onChange}
                required
            >
                <option value="" disabled hidden>Select...</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label className={`form-label ${value ? 'filled' : ''}`}>
                {label}
            </label>
        </div>
    );
};

export default FloatingLabelSelect;
