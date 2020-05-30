import React, { Component } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import {
  selectOptions, sportsRoles, cricket, football,
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
    });
  };

  handleRoleChange = (e) => {
    const { sport } = this.state;
    if (sport === cricket) {
      this.setState({
        cricket: e.target.value,
      });
    } else {
      this.setState({
        football: e.target.value,
      });
    }
  };

  render() {
    const { name, sport } = this.state;
    return (
      <div>
        <label htmlFor="name">Name</label>
        <br />
        <TextField name="name" value={name} onChange={this.handleNameChange} />
        <br />
        <label htmlFor="">Select the game you play?</label>
        <br />
        <SelectField
          value={sport}
          onChange={this.handleSportChange}
          options={selectOptions}
        />
        <br />
        <br />
        <RadioGroup
          value={sport === cricket || sport === football ? 'what you do?' : ''}
          onChange={this.handleRoleChange}
          options={sportsRoles.get(sport)}
        />
        {console.log(this.state)}
      </div>
    );
  }
}

export default InputDemo;
