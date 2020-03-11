import React from "react";
import { TextField, Slider } from "../../components/index";

class TextFieldDemo extends React.Component {

  render() {
    
    return (
      <>
        <Slider/>
        <p> The disabled input</p>
        <br />
        <TextField
          value={"Disabled Input"}
          disabled={true}
        />
        <br />
        <p> A valid Input</p>
        <br />
        <TextField
          value={"Accessiable"}
        />
        <br />
        <p> An input with Error</p>
        <br />
        <TextField
          value={"101"}
          error = {(<p style={{color:'red'}}> Could not be greater than</p>)}
        />
      </>
    );
  }
}

export default TextFieldDemo;
