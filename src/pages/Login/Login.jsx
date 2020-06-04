import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailIcon from '@material-ui/icons/Mail';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { validateLogin } from '../../config/constants';
import { callApi } from '../../libs/utils/api';
import { alert } from '../../contexts';

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
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '70%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: {},
      error: {},
      loading: false,
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

  handleOnSubmit = (value) => {
    const { history } = this.props;
    const { email, password } = this.state;
    this.setState({
      loading: true,
    });
    callApi('post', '/api/user/login', { email, password }).then((token) => {
      localStorage.setItem('token', token);
      this.setState({
        redirect: true,
      });
      history.push('/Trainee');
    }).catch(() => {
      value('Login failed', 'error');
    }).finally(() => {
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { classes } = this.props;
    const {
      email, password, error, loading,
    } = this.state;
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
            <alert.Consumer>
              {(value) => (
                <Button
                  classes={classes.submit}
                  color="primary"
                  variant="contained"
                  disabled={this.hasError() || loading}
                  fullWidth
                  onClick={() => { this.handleOnSubmit(value); }}
                >
                LOGIN
                </Button>
              )}
            </alert.Consumer>
            {loading && <CircularProgress size={50} className={classes.buttonProgress} />}
          </form>
        </div>
      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  history: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(Login);
