import React from "react";
import propTypes from "prop-types";

function RadioGroup(props) {
  const { error, value, onChange, options,label } = props;
  return (
    <>
    <label htmlFor="">{label}</label>
    <br/>
      {options.map(({ label, value }) => {
        return (
          <>
            <input
              type="radio"
              value={value}
              name="group"
              onChange={onChange}
            />
            {label} <br />
          </>
        );
      })}
      <p style={{ color: 'red' }}>{error}</p>
    </>
  );
}

RadioGroup.propTypes = {
  error: propTypes.string,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  options: propTypes.array
};

RadioGroup.defaultProps = {
  error: "",
  options: []
};

export { RadioGroup };
