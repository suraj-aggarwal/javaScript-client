import React from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { style } from './style';

function Footer() {
  return (
    <div style={{ 'margin-top': '10%' }}>
      <span style={style}>
        <CopyrightIcon />
      SUCCESSIVE TECHNOLOGIES
      </span>
    </div>
  );
}

export default Footer;
