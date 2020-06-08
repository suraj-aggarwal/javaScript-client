import React from 'react';
import PropTypes from 'prop-types';
import { Input, style } from './style';

function TextField(props) {
  const {
    value, disabled, error, onChange, onblur,
  } = props;
  return (
    <div>
      <Input type="text" value={value} disabled={disabled} onChange={onChange} onBlur={onblur} />
      {error ? <p style={style}>{error}</p> : ''}
    </div>
  );
}

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onblur: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  disabled: false,
  error: '',
};

export default TextField;
