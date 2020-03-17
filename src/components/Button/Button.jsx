import React from "react";
import propTypes from "prop-types";

function Button(props) {
  const { color, disabled, style, value, onClick } = props;
  return (
    <button
      color={color}
      disabled={disabled}
      style={style}
      value={value}
      onClick={onClick}
  >{value}</button>
  );
}

Button.propTypes = {
  color: propTypes.string,
  disabled: propTypes.bool,
  style: propTypes.object,
  value: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired
};

Button.defaultProps = {
  color: "default",
  disabled: false,
  style: {}
};

export { Button };
