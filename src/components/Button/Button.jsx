import React from 'react';
import propTypes from 'prop-types';
import { Button } from './style';

export default function customButton(props) {
  const {
    color, disabled, value, onClick, style,
  } = props;
  return (
    <Button
      color={color}
      vlaue={value}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {value}
    </Button>
  );
}

customButton.propTypes = {
  color: propTypes.string,
  disabled: propTypes.bool,
  style: propTypes.objectOf,
  value: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

customButton.defaultProps = {
  color: 'green',
  disabled: false,
  style: {},
};
