import React from 'react';
import { Route } from 'react-router-dom';
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

export default AuthRoute;
