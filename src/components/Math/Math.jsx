import React from 'react';
import propTypes from 'prop-types';


function Math(props) {
  const {
    first, second, operator, children,
  } = props;
  const getResult = () => {
    switch (operator) {
    case '+':
      return (`${first + second}`);
    case '*':
      return (`${first * second}`);
    case '-':
      return (`${first - second}`);
    case '/':
      return (`${first / second}`);
    default: return ('Invalid Operation');
    }
  };

  const result = getResult();

  const calculator = (
    <div>
      <div>
        {` ${first}  + ${second} = ${first + second} `}
      </div>
      <div>
        {` ${first} - ${second} = ${first - second} ` }
      </div>
      <div>
        {` ${first} * ${second} = ${first * second} ` }
      </div>
      <div>
        {` ${first} / ${second} = `}
        {second ? `${first / second}` : 'Infinity'}
      </div>
    </div>
  );


  return (
    <div>
      { children ? children({
        first, second, operator, result,
      }) : calculator }
    </div>
  );
}

Math.propTypes = {
  first: propTypes.number.isRequired,
  second: propTypes.number.isRequired,
  operator: propTypes.number.isRequired,
  children: propTypes.func,
};

export default Math;
