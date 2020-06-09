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
              first, second, operator, result,
            }) => {
              switch (operator) {
              case '+':
                result = first + second;
                return (
                  <div>
                    {' '}
sum of
                    {first}
                    {' '}
                    {operator}
                    {' '}
                    {second}
                    {' '}
is
                    {' '}
                    {result}
                  </div>
                );
              case '*':
                result = first * second;
                return (
                  <div>
                    {' '}
mutliplication of
                    {first}
                    {' '}
                    {operator}
                    {' '}
                    {second}
                    {' '}
is
                    {' '}
                    {result}
                  </div>
                );
              default:
                result = first / second;
                return (
                  <div>
                    {' '}
division of
                    {first}
                    {' '}
                    {operator}
                    {' '}
                    {second}
                    {' '}
is
                    {' '}
                    {result}
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
