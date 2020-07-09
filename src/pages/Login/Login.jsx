import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailIcon from '@material-ui/icons/Mail';
import { Paper, Box } from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { validateLogin } from '../../config/constants';
// import { callApi } from '../../libs/utils/api';
import { snackBarContext } from '../../contexts';
import { useStyles } from './login.style';

const initialState = {
  email: '',
  password: '',
  touched: {},
  allErrors: {},
  disabled: true,
  loading: false,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  handleOnSubmit = async (openSnackBar) => {
    const { history, loginuser } = this.props;
    const { email, password } = this.state;
    this.setState({
      loading: true,
    });
    const data = await loginuser({ variables: { email, password } });
    this.setState({
      loading: false,
    });
    const { data: { loginUser } } = data;
    if (!loginUser) {
      openSnackBar('Login failed', 'error');
      return;
    }
    localStorage.setItem('token', loginUser);
    history.push('/Trainee');
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.hasError();
  }

  isTouched = (event) => {
    const { touched } = this.state;
    touched[event.target.name] = true;
    this.setState({
      touched,
    });
    this.hasError();
  }

  hasError = () => {
    const {
      email, password,
    } = this.state;
    const error = {};
    validateLogin.validate({
      email, password,
    }, { abortEarly: false }).then(() => {
      this.setState({ disabled: false });
    })
      .catch((err) => {
        const values = Object.values(err.inner);
        values.forEach((val) => {
          error[val.path] = val.message;
        });
        this.setState({ disabled: true });
      })
      .finally(() => {
        this.setState({
          allErrors: error,
        });
      });
  }

  getError = (field) => {
    const { allErrors, touched } = this.state;
    if (touched[field]) {
      return allErrors[field];
    }
    return '';
  }

  render() {
    const { classes } = this.props;
    const {
      email, password, disabled, loading,
    } = this.state;
    return (
      <Container component="main" maxWidth="xs" justify="column">
        <Paper elevation={3} className={classes.paper}>
          <Box display="flex" lineHeight={4} alignItems="center" marginRight="4%" marginLeft="4%" flexDirection="column">
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
              Login
            </Typography>
            <form classes={classes.form}>
              <TextField
                onChange={(event) => this.handleOnChange(event)}
                onBlur={(event) => this.isTouched(event)}
                error={this.getError('email')}
                helperText={this.getError('email')}
                size="small"
                name="email"
                margin="normal"
                id="email"
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
                onChange={(event) => this.handleOnChange(event)}
                onBlur={(event) => this.isTouched(event)}
                error={this.getError('password')}
                helperText={this.getError('password')}
                name="password"
                size="small"
                margin="normal"
                id="password"
                label="Password"
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
              <snackBarContext.Consumer>
                {({ openSnackBar }) => (
                  (
                    <Button
                      classes={classes.submit}
                      color="primary"
                      variant="contained"
                      disabled={disabled || loading}
                      size="small"
                      fullWidth
                      onClick={() => this.handleOnSubmit(openSnackBar)}
                    >
                      LOGIN
                      {loading && <CircularProgress size={30} className={classes.buttonProgress} />}
                    </Button>
                  )
                )}
              </snackBarContext.Consumer>
            </form>
          </Box>
        </Paper>
      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  history: PropTypes.func.isRequired,
  loginuser: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(Login);
