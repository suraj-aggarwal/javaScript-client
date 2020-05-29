import React from 'react';
import propTypes from 'prop-types';

export default function RadioGroup(props) {
  const {
    error, value, onChange, options, label,
  } = props;
  return (
    <>
      <label htmlFor="">{label}</label>
      <br />
      {options.map(({ label, value }) => (
        <>
          <input
            type="radio"
            value={value}
            name="group"
            onChange={onChange}
          />
          {label}
          <br />
        </>
      ))}
    </>
  );
}

RadioGroup.propTypes = {
  error: propTypes.string,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  options: propTypes.arrayOf,
};

RadioGroup.defaultProps = {
  error: '',
  options: [],
};
