import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: 'auto',
  },
}));

function Navbar() {
  const classes = useStyles();

  const handleOnClick = () => {
    localStorage.removeItem('token');
  };

  return (
    <Box justifyItems="center">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Trainee
          </Typography>
          <div className={classes.root}>
            <Button color="inherit" component={Link} to="Trainee">Trainee</Button>
            <Button color="inherit" component={Link} to="TextFieldDemo">TEXT Field Demo</Button>
            <Button color="inherit" component={Link} to="TextFiled">INPUT DEMO</Button>
            <Button color="inherit" component={Link} to="ChildernDemo">CHILDERN DEMO</Button>
            <Button color="inherit" component={Link} to="login" onClick={handleOnClick}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
