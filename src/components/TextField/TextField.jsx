import React from 'react';
import PropTypes from 'prop-types';
import { Input, style } from './style';

function TextField(props) {
  const { value, disabled, error } = props;
  return (
    <div>
      <Input type="text" value={value} disabled={disabled} />
      {error ? <p style={style}>{error}</p> : ''}
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
  disabled: true,
  error: '',
};

export default TextField;
