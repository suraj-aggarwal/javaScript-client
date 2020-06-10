import React from 'react';
import propTypes from 'prop-types';

function Math(props) {
  const {
    first, second, operator, children,
  } = props;
  let result;
  return (
    <div>
      {children({
        first, second, operator, result,
      })}
    </div>
  );
}

Math.propTypes = {
  first: propTypes.number.isRequired,
  second: propTypes.number.isRequired,
  operator: propTypes.number.isRequired,
  children: propTypes.objectOf(propTypes.object),
};

Math.defaultProps = {
  children: () => (
    <div>
      <p> 7 + 4 = 11 </p>
      <p> 7 - 3  = 4 </p>
      <p> 7 / 4 = infinity </p>
      <p> 7 ^ 8 = invalid operation </p>
    </div>
  ),
};

export default Math;
