import React from 'react';
import { Typography } from '@material-ui/core';
import { Math } from '../../components';

function ChildernDemo() {
  const customMathTemplate = ({
    first, second, operator, result,
  }) => {
    switch (operator) {
    case '+':
      return (
        <div>
          {` sum of ${first}  and ${second} is ${result}`}
        </div>
      );
    case '*':
      return (
        <div>
          {` multiplication of ${first}  and ${second} is ${result}`}
        </div>
      );
    case '/':
      return (
        <div>
          {` division of ${first}  and ${second} is ${result}`}
        </div>
      );
    default: return result;
    }
  };

  return (
    <div className="math">
      <Typography variant="h6">
        <Math first={10} second={1000} operator="*">
          {customMathTemplate}
        </Math>
        <Math first={10} second={0} operator="^" />
        <Math first={10} second={10} operator="-" />
        <Math first={10} second={20} operator="*" />
        <Math first={10} second={40} operator="/" />
      </Typography>
    </div>
  );
}

export default ChildernDemo;
