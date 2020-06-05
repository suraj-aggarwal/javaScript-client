import React, { Component } from 'react';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';
import {
  selectOptions, sportsRoles, defaultSelect, validateForm, nameField, sportField, cricketField, footballField,
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
      disabled: true,
    };
  }

  hasError = () => {
    const { name, role, sport } = this.state;
    validateForm.validate({ name, sport, role }, { abortEarly: false }).then(() => {
      this.setState({
        disabled: false,
      });
    })
      .catch(() => {
        this.setState({
          disabled: true,
        });
      });
  }

  isTouched = (field, func) => {
    const { allErrors } = this.state;
    const fieldValue = this.state[field];
    func.validate({ [field]: fieldValue }).then(() => {
      allErrors[field] = '';
      this.setState({
        allErrors,
      });
    }).catch(
      (err) => {
        allErrors[field] = err.errors;
        this.setState({
          allErrors,
        });
      },
    );
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
    this.isTouched('name', nameField);
    this.hasError();
  };

  handleSportChange = (e) => {
    this.setState({
      sport: e.target.value,
      cricket: '',
      football: '',
      role: '',
    });
    this.isTouched('sport', sportField);
    this.hasError();
  };

  handleRoleChange = (e) => {
    const { sport } = this.state;
    this.setState({
      [sport]: e.target.value,
      role: e.target.value,
    });
    if (sport === 'cricket') { this.isTouched('cricket', cricketField); } else { this.isTouched('football', footballField); }
    this.hasError();
  }

  render() {
    const {
      name, sport, cricket, football, allErrors, disabled,
    } = this.state;
    return (
      <div>
        <p> Name </p>
        <TextField name="name" value={name} onChange={this.handleNameChange} error={allErrors.name} />
        <p>Select the game you play?</p>
        <SelectField
          value={sport}
          onChange={this.handleSportChange}
          options={selectOptions}
          error={allErrors.sport}
        />
        {sport && sport !== defaultSelect ? <p> What you want to play? </p> : ''}
        <RadioGroup
          value={sport === 'cricket' ? cricket : football}
          onChange={this.handleRoleChange}
          options={sportsRoles[sport]}
          error={sport === 'cricket' ? allErrors.cricket : allErrors.football}
        />
        {console.log(this.state)}
        <Button style={disabled ? {} : { 'background-color': 'green' }} disabled={disabled} value="submit"> </Button>
        <Button disabled={disabled} value="cancel"> </Button>
      </div>
    );
  }
}

export default InputDemo;
