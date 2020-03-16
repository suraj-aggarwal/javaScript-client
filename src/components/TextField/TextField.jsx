import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './style';

function TextField(props) {
  const { value, disabled, error, onChange } = props;
  return (
    <div>
      <Input type='text' value={value} disabled={disabled} onChange={onChange}/>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
}

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  disabled: false,
  error: '',
};

export { TextField };
