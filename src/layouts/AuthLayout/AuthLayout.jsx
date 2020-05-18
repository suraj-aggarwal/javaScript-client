import React from 'react';
import { Footer } from '../components/Footer';

function AuthLayout({ component: children, ...rest }) {
  return (
    <div>
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default AuthLayout;
