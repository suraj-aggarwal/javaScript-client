import React from 'react';
import { Typography } from '@material-ui/core';
import { Math } from '../../components';

function ChildernDemo() {
  return (
    <div className="math">
      <Typography variant="h6">
        <Math first={10} second={20} operator="/">
          {
            ({
              first, second, operator,
            }) => {
              switch (operator) {
              case '+':
                return (
                  <div>
                    {` sum of ${first}  ${operator} ${second} is ${first + second}`}
                  </div>
                );
              case '*':
                return (
                  <div>
                    {` multiplication of ${first}  ${operator} ${second} is ${first * second}`}
                  </div>
                );
              default:
                return (
                  <div>
                    {` division of ${first}  ${operator} ${second} is ${first / second}`}
                  </div>
                );
              }
            }
          }
        </Math>
      </Typography>
    </div>
  );
}

export default ChildernDemo;
