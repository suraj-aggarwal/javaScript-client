import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components/Footer';

const AuthLayout = ({ children }) => (

  <div>
    <div>
      {children}
    </div>
    <div>
      <Footer />
    </div>
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
