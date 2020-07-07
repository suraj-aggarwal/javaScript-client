import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts/PrivateLayout';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        localStorage.getItem('token') ? (
          <PrivateLayout>
            <Component {...matchProps} />
          </PrivateLayout>
        )
          : <Redirect to="/login" />
      )}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default PrivateRoute;
