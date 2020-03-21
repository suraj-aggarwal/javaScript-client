import React, { Component } from 'react';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';
import {
  selectOptions, sportsRoles, cricket, football,
  validateForm,
} from '../../config/constants';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      role: '',
      allErrors: {},
    };
  }

  getErrors = async () => {
    const {
      name, sport, role,
    } = this.state;
    try {
      const result = await validateForm.validate({ name, sport, role }, { abortEarly: false });
      this.setState({
        allErrors: {},
      });
    } catch (err) {
      const parsedErrors = {};
      err.inner.forEach((ValidationError) => {
        const { path, message } = ValidationError;
        parsedErrors[path] = message;
      });
      this.setState({
        allErrors: parsedErrors,
      });
    }
  }

  hasErros = () => {
    const { allErrors } = this.state;
    return Object.keys(allErrors).length !== 0;
  }


  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
    this.getErrors();
  };

  handleSportChange = (e) => {
    this.setState({
      sport: e.target.value,
    });
    this.getErrors();
  };

  handleRoleChange = (e) => {
    const { sport } = this.state;
    if (sport === cricket) {
      this.setState({
        cricket: e.target.value,
        role: e.target.value,
      });
    }
    this.setState({
      football: e.target.value,
      role: e.target.value,
    });
    this.getErrors();
  };

  render() {
    const {
      name, sport, allErrors,
    } = this.state;
    return (
      <form>
        <label htmlFor="textField">Name</label>
        <br />
        <TextField value={name} onChange={this.handleNameChange} error={allErrors.name} />
        <br />
        <label htmlFor="">Select the game you play?</label>
        <br />
        <SelectField
          value={sport}
          onChange={this.handleSportChange}
          options={selectOptions}
          error={allErrors.sport}
        />
        <br />
        <br />
        <RadioGroup
          value={sport}
          onChange={this.handleRoleChange}
          options={sportsRoles.get(sport)}
          label={sport === cricket || sport === football ? 'what you do?' : ''}
          error={allErrors.role}
        />
        <Button style={this.hasErros() ? {} : { 'background-color': 'green' }} disabled={!!this.hasErros()} value="submit"> </Button>
        <Button disabled={!this.hasErros()} value="cancel"> </Button>
      </form>
    );
  }
}

export { InputDemo };
