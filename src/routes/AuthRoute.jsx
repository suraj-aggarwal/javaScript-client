import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts/AuthLayout';

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <AuthLayout>
          <Component {...matchProps} />
        </AuthLayout>
      )}
    />
  );
}

AuthRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default AuthRoute;
