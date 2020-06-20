import React, { Component } from 'react';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';
import {
  selectOptions, sportsRoles, defaultSelect, validateForm,
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
      touched: {},
      disabled: true,
    };
  }

  hasError = () => {
    const {
      name, role, sport,
    } = this.state;
    const error = {};
    validateForm.validate({ name, sport, role }, { abortEarly: false }).then(() => {
      this.setState({ disabled: false });
    })
      .catch((err) => {
        const values = Object.values(err.inner);
        values.forEach((val) => {
          error[val.path] = val.message;
        });
      })
      .finally(() => {
        this.setState({
          allErrors: error,
        });
      });
  }

  getError = (field) => {
    const { touched, allErrors } = this.state;
    if (touched[field]) {
      return allErrors[field];
    }
    return '';
  }

  isTouched = (field) => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState({
      touched,
    });
    this.hasError();
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
    this.hasError();
  };

  handleSportChange = (e) => {
    this.setState({
      sport: e.target.value,
      cricket: '',
      football: '',
      role: '',
    });
    this.hasError();
  };

  handleRoleChange = (e) => {
    const { sport } = this.state;
    this.setState({
      [sport]: e.target.value,
      role: e.target.value,
    });
    this.hasError();
  }

  render() {
    const {
      name, sport, cricket, football, disabled,
    } = this.state;
    return (
      <div>
        <p> Name </p>
        <TextField
          name="name"
          value={name}
          onChange={this.handleNameChange}
          error={this.getError('name')}
          onblur={() => { this.isTouched('name'); }}
        />
        <p>Select the game you play?</p>
        <SelectField
          value={sport}
          onChange={this.handleSportChange}
          options={selectOptions}
          error={this.getError('sport')}
          onblur={() => { this.isTouched('sport'); }}
        />
        {sport && sport !== defaultSelect ? <p> What you want to play? </p> : ''}
        <RadioGroup
          value={sport === 'cricket' ? cricket : football}
          onChange={this.handleRoleChange}
          options={sportsRoles[sport]}
          error={this.getError('role')}
          onblur={() => { this.isTouched('role'); }}
        />
        <Button style={disabled ? {} : { 'background-color': 'green' }} disabled={disabled} value="submit"> </Button>
        <Button disabled={disabled} value="cancel"> </Button>
      </div>
    );
  }
}

export default InputDemo;
