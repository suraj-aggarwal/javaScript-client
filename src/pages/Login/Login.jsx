import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailIcon from '@material-ui/icons/Mail';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { validateLogin } from '../../config/constants';

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: {},
      error: {},
    };
  }

  handleOnChange = (field) => ({ target: { value } }) => {
    this.setState({
      [field]: value,
    });
    this.getError(field);
  }

  isTouched = (field) => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState({
      touched,
    });
  }

  getError = (field) => {
    const { touched, error } = this.state;
    if (touched[field]) {
      validateLogin.validateAt(field, this.state)
        .then(() => {
          delete error[field];
          this.setState({
            error,
          });
        })
        .catch((err) => {
          error[field] = err.message;
          this.setState({
            error,
          });
        });
    }
  }

  hasError = () => {
    const { error } = this.state;
    return (Object.keys(error).length !== 0);
  }

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;
    return (
      <Container component="main" maxWidth="xs" justify="column">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form classes={classes.form}>
            <TextField
              onChange={this.handleOnChange('email')}
              onBlur={() => this.isTouched('email')}
              error={error.email}
              helperText={error.email}
              autoFocus
              margin="normal"
              id="name"
              label="Email Address"
              type="email"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
              value={email}
              fullWidth
            />
            <TextField
              onChange={this.handleOnChange('password')}
              onBlur={() => this.isTouched('password')}
              autoFocus
              error={error.password}
              helperText={error.password}
              margin="normal"
              id="name"
              label="Confirm Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityOffIcon />
                  </InputAdornment>
                ),
              }}
              type="Password"
              value={password}
              variant="outlined"
              fullWidth
            />
            <Button
              classes={classes.submit}
              color="primary"
              variant="contained"
              disabled={this.hasError()}
              fullWidth
            >
              LOGIN
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(useStyles)(Login);
