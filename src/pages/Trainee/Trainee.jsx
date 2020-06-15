import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { AddDialog } from './Components';

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
        <div>
          <Button color="primary" variant="outlined" onClick={this.toggleOpenState}>
                    Add Trainee
          </Button>
          <AddDialog open={open} toggleOpenState={this.toggleOpenState} />
        </div>
      );
    }
}

export default Trainee;
