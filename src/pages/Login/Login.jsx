import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';


class Login extends Component {
  constructor(props) {
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <Grid container>
        <Grid item>
          <TextField />
        </Grid>
        <Grid item>
          <TextField />
        </Grid>
        <Grid item>
          <Button />
        </Grid>
      </Grid>
    );
  }
}

export default Login;
