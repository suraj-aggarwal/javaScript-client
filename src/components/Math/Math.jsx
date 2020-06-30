import React from 'react';
import propTypes from 'prop-types';

function Math(props) {
  const {
    first, second, operator, children,
  } = props;
  const getResult = () => {
    switch (operator) {
    case '+':
      return first + second;
    case '*':
      return first * second;
    case '-':
      return first - second;
    case '/':
      return first / second;
    default: return 'Invalid Operation';
    }
  };
  const result = getResult();
  return (
    <div>
      { children({
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
  }) => `${first} ${operator} ${second} = ${result}`,
};

export default Math;
