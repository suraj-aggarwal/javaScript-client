import React, { Component } from "react";
import { TextField, SelectField, RadioGroup, Button } from "../../components";
import {
  selectOptions,
  sportsRoles,
  cricket,
  football,
  validateForm
} from "../../config/constants";
import * as yup from "yup";

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      sport: "",
      cricket: "",
      football: "",
      textField: {isTouched: false, error:''},
      selectField: {isTouched: false, error:''}
    };
  }

  getErrors = async (field) => {
      const{name, sport, textField, selectField} = this.state;
      try{
        await validateForm.validate(name,sport);
      }
      catch(err) {
          if(textField.isTouched) {
              this.setState(textField.error = err.message);
          }
          if(selectField.isTouched) {
            this.setState(textField.error = err.message);
        }
      }
  };
  isTouched = async() => {
      return true;
  };

  handleNameChange = e => {
    const { textField } = this.state;
    this.setState((state) => {
        
    });
    this.setState({
      name: e.target.value
    });
    this.getErrors(textField);
  };

  handleSportChange = e => {
    const { selectField } = this.state;
    this.setState(selectField.isTouched = this.isTouched());
    this.setState({
      sport: e.target.value
    });
    this.getErrors(selectField);
  };

  handleRoleChange = e => {
    const { sport } = this.state;
    this.isTouched();
    if (sport === cricket) {
      this.setState({
        cricket: e.target.value
      });
    } else {
      this.setState({
        football: e.target.value
      });
    }
  };

  render() {
    const { name, sport, error, textField, selectField } = this.state;
    return (
      <form>
        <label htmlFor="">Name</label>
        <br />
        <TextField
          value={name}
          onChange={this.handleNameChange}
          error={textField.error}
        />
        <br />
        <label htmlFor="">Select the game you play?</label>
        <br />
        <SelectField
          value={sport}
          onChange={this.handleSportChange}
          options={selectOptions}
          error={selectField.error}
        />
        <br />
        <br />
        <RadioGroup
          value={sport}
          onChange={this.handleRoleChange}
          options={sportsRoles.get(sport)}
          label={sport === cricket || sport === football ? "what you do?" : ""}
          error={error}
        />
        <Button value={"cancel"}></Button>
        <Button value={"submit"}></Button>
        {console.log()}
      </form>
    );
  }
}

export { InputDemo };
