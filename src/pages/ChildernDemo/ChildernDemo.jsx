import React from 'react';
import { Typography } from '@material-ui/core';
import { Math } from '../../components';

function ChildernDemo() {
  return (
    <div className="math">
      <Typography variant="h6">
        <Math first={10} second={0} operator="*">
          {
            ({
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
              default: return `${result}`;
              }
            }
          }
        </Math>
        <Math first={10} second={20} operator="+" />
        <Math first={10} second={0} operator="/">
          {
            ({
              first, second, operator, result,
            }) => {
              switch (operator) {
              case '+':
                return (
                  <div>
                    {` when we add ${first} with ${second} then we will get result ${result}`}
                  </div>
                );
              case '*':
                return (
                  <div>
                    {` when we multiple ${first} with ${second} then we will get result ${result}`}
                  </div>
                );
              case '/':
                return (
                  <div>
                    {` when we divide ${first}  and ${second} then we will get result ${result}` }
                  </div>
                );
              default: return ('Invalid Operation');
              }
            }
          }
        </Math>
      </Typography>
    </div>
  );
}

export default ChildernDemo;
