import React from 'react';
import { Mutation } from '@apollo/react-components';
import loginUser from './mutation';
import Login from './Login';

export default ({ history }) => (
  <Mutation mutation={loginUser}>
    {
      (loginuser) => (
        <Login loginuser={loginuser} history={history} />
      )
    }
  </Mutation>
);
