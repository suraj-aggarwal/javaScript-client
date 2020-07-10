import React from 'react';
import { Mutation } from '@apollo/react-components';
import loginUser from './mutation';
import Login from './Login';
import { snackBarContext } from '../../contexts';
import PropTypes from 'prop-types';

export default ({ history }) => (

  <snackBarContext.Consumer>
    {({ openSnackBar }) => (
      <Mutation mutation={loginUser} onError={() => openSnackBar('Login Failed', 'error')}>
        {
          (loginuser, { data }) => {
            if (data) {
              localStorage.setItem('token', data.loginUser);
              history.push('/Trainee');
            }
            return <Login loginuser={loginuser} history={history} />;
          }
        }
      </Mutation>
    )}
  </snackBarContext.Consumer>
);

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};
