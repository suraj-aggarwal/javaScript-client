import React from 'react';
import { TextField } from '../../components';

function TextFieldDemo() {
  return (
    <div>
      <p> The disabled input</p>
      <TextField value="Disabled Input" disabled />
      <p> A valid Input</p>
      <TextField value="Accessiable" disabled={false} />
      <p> An input with Error</p>
      <TextField
        value="101"
        error="Could not be greater than"
        disabled={false}
      />
    </div>
  );
}
export default TextFieldDemo;
