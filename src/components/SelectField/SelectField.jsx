import React from 'react';
import PropTypes from 'prop-types';

export function SelectField(props) {
    const {error, value, onChange, options, defaultText} = props
    return(
        <div>
            <select name={value} id="root" onChange={onChange}>
                {options.map( ({label, value}) => {
                    return <option value={value}>{label}</option>
                })}
            </select>
        </div>
    );
}

SelectField.propTypes = {
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array,
    defaultText: PropTypes.string
}

SelectField.defaultProps = {
    error: '',
    value: '',
    options: [],
    defaultText: 'select'
}

