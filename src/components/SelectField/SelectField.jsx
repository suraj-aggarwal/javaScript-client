import React from 'react';
import PropTypes from 'prop-types';
import { Select, style } from './style';

export default function SelectField(props) {
  const {
    error, value, onChange, options, defaultText,
  } = props;

  const selectOptions = options.map(({ label, sport }) => (
    <option key={label} value={sport}>
      {label}
    </option>
  ));

  return (
    <div>
      <Select name={value} id={defaultText} onChange={onChange}>
        {selectOptions}
      </Select>
      {error ? <p style={style}>{error}</p> : ''}
    </div>
  );
}

SelectField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  defaultText: PropTypes.string,
};

SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'select',
};
