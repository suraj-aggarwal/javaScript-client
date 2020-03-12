import React from 'react';
import { TextField } from '../../components/index';

function TextFieldDemo() {
  return (
    <>
      <p> The disabled input</p>
      <br />
      <TextField value="Disabled Input" disabled />
      <br />
      <p> A valid Input</p>
      <br />
      <TextField value="Accessiable" />
      <br />
      <p> An input with Error</p>
      <br />
      <TextField
        value="101"
        error="Could not be greater than"
      />
    </>
  );
}

export default TextFieldDemo;
