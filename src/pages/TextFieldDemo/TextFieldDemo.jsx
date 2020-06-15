import React from 'react';
import { TextField, Slider } from '../../components';
import { imagePath } from '../../config/constants';

function TextFieldDemo() {
  return (
    <>
      <Slider random={false} banners={imagePath} />
      <p> The disabled input</p>
      <br />
      <TextField value="Disabled Input" disabled />
      <br />
      <p> A valid Input</p>
      <TextField value="Accessiable" disabled={false} />
      <p> An input with Error</p>
      <br />
      <TextField value="101" error="Could not be greater than" />
    </>
  );
}
export default TextFieldDemo;
