import React from 'react';
import propTypes from 'prop-types';
import { style } from './style';

export default function RadioGroup(props) {
  const {
    error, value, onChange, options, onblur,
  } = props;

  const radioGroup = options.map(({ label, role }) => (
    <div>
      <input
        key={label}
        type="radio"
        value={role}
        name={value}
        onChange={onChange}
        onBlur={onblur}
      />
      {label}
    </div>
  ));

  return (
    <div>
      {radioGroup}
      {error ? <p style={style}>{error}</p> : ''}
    </div>
  );
}

RadioGroup.propTypes = {
  error: propTypes.string,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  options: propTypes.arrayOf(propTypes.object),
  onblur: propTypes.func.isRequired,
};

RadioGroup.defaultProps = {
  error: '',
  options: [],
};
