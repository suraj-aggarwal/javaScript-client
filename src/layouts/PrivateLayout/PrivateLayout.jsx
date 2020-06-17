import React from 'react';
import { Navbar } from '../components/Navbar';

function PrivateLayout({ children, ...rest }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}

export default PrivateLayout;
