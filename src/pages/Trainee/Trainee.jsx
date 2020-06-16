import React, { Component } from 'react';
import { Button, Box } from '@material-ui/core';
import { AddDialog } from './Components';
import { Navbar } from '../components';

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

    toggleOpenState = () => {
      const { open } = this.state;
      this.setState({
        open: !open,
      });
    }

    render() {
      const { open } = this.state;
      return (
        <Box justifyContent="row" lineHeight={4}>
          <Navbar />
          <Button color="primary" variant="outlined" onClick={this.toggleOpenState}>
            Add Trainee
          </Button>
          <AddDialog open={open} toggleDialogBox={this.toggleOpenState} />
        </Box>
      );
    }
}

export default Trainee;
