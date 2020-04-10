import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { AddDialog } from './Components';
import { Navbar } from '../components';

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handlerOnClick = () => {
    this.setState({
      open: true,
    });
  }

  handlerOnClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Navbar />
        <br />
        <Button color="primary" variant="outlined" onClick={this.handlerOnClick}>
          Add Trainee
        </Button>
        <AddDialog open={open} onClose={this.handlerOnClose} />
      </div>

    );
  }
}

export default Trainee;
