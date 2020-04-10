import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  root: {
    marginLeft: 'auto',
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <Box justifyItems="center">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
                    Trainee
          </Typography>
          <div className={classes.root}>
            <Button color="inherit">Trainee</Button>
            <Button color="inherit">TEXTFieldDemo</Button>
            <Button color="inherit">INPUT DEMO</Button>
            <Button color="inherit">CHILDERN DEMO</Button>
            <Button color="inherit">Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
