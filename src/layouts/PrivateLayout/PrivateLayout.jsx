import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components/Navbar';

function PrivateLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateLayout;
