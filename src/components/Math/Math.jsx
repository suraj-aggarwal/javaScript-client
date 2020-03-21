import React from 'react';
import propTypes from 'prop-types';

function Math(props) {
  const {
    first, second, operator, children,
  } = props;
  console.log(first, second, operator);
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
  children: propTypes.func,
};

Math.defaultProps = {
  children: ({
    first, second, operator, result,
  }) => {
    switch (operator) {
    case '+':
      result = first + second;
      return (
        <div>
          {first}
          {operator}
          {second}
          {' '}
=
          {result}
        </div>
      );
    case '*':
      result = first * second;
      return (
        <div>
          {first}
          {operator}
          {second}
          {' '}
=
          {result}
        </div>
      );
    default:
      result = first / second;
      return (
        <div>
          {first}
          {operator}
          {second}
          {' '}
=
          {result}
        </div>
      );
    }
  },
};

export { Math };
