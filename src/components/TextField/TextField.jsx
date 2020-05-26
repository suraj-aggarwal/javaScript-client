import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './style';

function TextField(props) {
  const { value, disabled, error } = props;
  return (
    <div>
      <Input type="text" value={value} disabled={disabled} />
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
}

TextField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

TextField.defaultProps = {
  value: '',
  disabled: false,
  error: '',
};

export { TextField };
