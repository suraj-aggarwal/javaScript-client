import React from 'react';

function AuthLayout({ component: children, ...rest }) {
  return (
    <div>
      {children}
    </div>
  );
}

export default AuthLayout;
