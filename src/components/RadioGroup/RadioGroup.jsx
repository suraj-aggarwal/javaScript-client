import React from 'react';
import propTypes from 'prop-types';

export default function RadioGroup(props) {
  const {
    error, value, onChange, options,
  } = props;
  return (
    <>
      <label for="selectField">{value}</label>
      <br />
      {options.map(({ tag, role }) => (
        <>
          <input
            type="radio"
            value={role}
            name="group"
            onChange={onChange}
          />
          {tag}
          <br />
        </>
      ))}
      {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
    </>
  );
}

RadioGroup.propTypes = {
  error: propTypes.string,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  options: propTypes.arrayOf(propTypes.object),
};

RadioGroup.defaultProps = {
  error: '',
  options: [],
};
