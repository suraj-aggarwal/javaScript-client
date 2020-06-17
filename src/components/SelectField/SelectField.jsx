import React from 'react';
import PropTypes from 'prop-types';
import { Select } from './style';

export function SelectField(props) {
  const {
    error, value, onChange, options, defaultText,
  } = props;
  return (
    <div>
      <Select name={value} id={defaultText} onChange={onChange}>
        {options.map(({ label, value }) => <option value={value}>{label}</option>)}
      </Select>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
}

SelectField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf,
  defaultText: PropTypes.string,
};

SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'select',
};
