import React from 'react';
import PropTypes from 'prop-types';

function RadioGroup(props) {
    const {error, value, onChange, options} = this.props;
    return(
        <div>
            <select name="" id="" value={value}>
                {options.map(({label, value})=> {
                    return <> <input type="radio" value={value} /> {label} </>
                })}
            </select>
        </div>
    )
}

RadioGroup.propTypes = {
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array,
}

RadioGroup.defaultProps = {
    error: '',
    options: []
}

export {RadioGroup};