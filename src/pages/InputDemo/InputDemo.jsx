import React, { Component } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import {
  selectOptions, sportsRoles, defaultSelect,
} from '../../config/constants';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleSportChange = (e) => {
    this.setState({
      sport: e.target.value,
      cricket: '',
      football: '',
    });
  };

  handleRoleChange = (e) => {
    const { sport } = this.state;
    this.setState({
      [sport]: e.target.value,
    });
  }

  render() {
    const {
      name, sport, cricket, football,
    } = this.state;
    return (
      <div>
        <p> Name </p>
        <TextField name="name" value={name} onChange={this.handleNameChange} />
        <p>Select the game you play?</p>
        <SelectField
          value={sport}
          onChange={this.handleSportChange}
          options={selectOptions}
        />
        {sport !== defaultSelect && sport ? <p> What you want to play? </p> : ''}
        <RadioGroup
          value={sport === 'cricket' ? cricket : football}
          onChange={this.handleRoleChange}
          options={sportsRoles[sport]}
        />
        {console.log(this.state)}
      </div>
    );
  }
}

export default InputDemo;
