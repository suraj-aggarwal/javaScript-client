import React from 'react';
import propTypes from 'prop-types';
import {buttonStyle} from './style';

function Button(props) {
  const {
    color, disabled, value, onClick, style,
  } = props;
  return (
    <>
      <button
        color={color}
        vlaue={value}
        disabled={disabled}
        onClick={onClick}
        style={style}
      >
        {value}
      </button>
    </>
  );
}

Button.propTypes = {
  color: propTypes.string,
  disabled: propTypes.bool,
  style: propTypes.objectOf,
  value: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

Button.defaultProps = {
  color: 'green',
  disabled: false,
  style: {},
};

export { Button };
