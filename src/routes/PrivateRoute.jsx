import { Route } from 'react-router-dom';
import React from 'react';
import { PrivateLayout } from '../layouts/PrivateLayout';


function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <PrivateLayout>
          <Component {...matchProps} />
        </PrivateLayout>
      )}
    />
  );
}

export default PrivateRoute;
