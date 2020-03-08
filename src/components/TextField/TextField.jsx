import React from "react";
import {Input} from './style';

class TextField extends React.Component {
  constructor(props) {
    console.log("--------Inside TextField Constructor---------");
    super(props);
  }

  render() {
    console.log("--------Inside TextField Constructor---------", this.props);
    const { value, disabled, error } = this.props;
    return (
      <div>
        <Input
          type="text"
          value={value}
          disabled = {disabled}
        />
        {error}
      </div>
    );
  }
}

export { TextField };
