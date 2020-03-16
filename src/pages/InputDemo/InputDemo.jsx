import React, {Component} from 'react';
import {TextField, SelectField, RadioGroup} from '../../components';
import {selectOptions} from '../../config/constants';

class InputDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            sport : '',
            role : ''
        }
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleSportChange = (e) => {
        this.setState({
            sport: e.target.value
        })
    }

    handleRoleChange = (e) => {
        this.setState({
            role: e.target.value
        })
    }

    render() {
        const {name, sport, role} = this.state;
        return(
            <div>
                <TextField value={name} onChange={this.handleNameChange.bind(this)}/> 
                <SelectField value={sport} onChange={this.handleSportChange.bind(this)} options={selectOptions}/>
                <RadioGroup value={role} onChange={this.handleRoleChange.bind(this)} options={}/>
            </div>
        ) 
    }
}

export {InputDemo};