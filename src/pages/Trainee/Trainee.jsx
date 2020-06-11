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
          <Button color="primary" variant="outlined" onClick={this.handlerOnClick}>
                    Add Trainee
          </Button>
          <AddDialog open={open} onClose={this.handlerOnClose} />
        </div>

      );
    }
}

export default Trainee;
