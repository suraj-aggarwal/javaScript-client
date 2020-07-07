import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

function PrivateLayout({ children }) {
  return (
    localStorage.token
      ? (
        <div>
          <Navbar />
          <div>{children}</div>
        </div>
      )
      : <Redirect to="login" />
  );
}

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateLayout;
