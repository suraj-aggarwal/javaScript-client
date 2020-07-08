import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { validateTrainee } from '../../../../config/constants';
import { snackBarContext } from '../../../../contexts';
import { callApi } from '../../../../libs/utils/api';


const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  touched: {},
  allErrors: {},
  disabled: true,
  loading: false,
};

export default class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  handleOnSubmit = async (openSnackBar) => {
    const { name, email, password } = this.state;
    const { toggleDialogBox } = this.props;
    const reqType = 'post';
    const url = '/api/trainee';
    const query = { name, email, password };
    const res = await callApi({ reqType, url, query });
    if (res.data) {
      openSnackBar('Trainee added', 'success');
    } else {
      openSnackBar(res.message, res.status);
    }
    this.setState({
      loading: false,
    });
    toggleDialogBox();
    this.setState(initialState);
  }

  handleOnCancel = () => {
    const { toggleDialogBox } = this.props;
    this.setState(initialState);
    toggleDialogBox();
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
      name, email, password, confirmPassword,
    } = this.state;
    const error = {};
    validateTrainee.validate({
      name, email, password, confirmPassword,
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
    const {
      name, email, password, confirmPassword, disabled, loading,
    } = this.state;
    const { open, toggleDialogBox } = this.props;
    return (
      <Dialog open={open} onClose={toggleDialogBox} aria-labelledby="form-dialog-title">
        <DialogContent spacing={2}>
          <DialogContentText>
            Add Trainee
          </DialogContentText>
          <TextField
            onChange={(event) => this.handleOnChange(event)}
            onBlur={(event) => this.isTouched(event)}
            helperText={this.getError('name')}
            error={this.getError('name')}
            name="name"
            placeholder="name"
            margin="dense"
            id="name"
            label="Name"
            type="text"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            value={name}
            fullWidth
          />
          <TextField
            onChange={(event) => this.handleOnChange(event)}
            onBlur={(event) => this.isTouched(event)}
            helperText={this.getError('email')}
            error={this.getError('email')}
            name="email"
            placeholder="email"
            margin="dense"
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
        </DialogContent>
        <DialogContent spacing={2}>
          <Box display="flex" spacing={2} flexDirection="row" justifyContent="space-between">
            <Box width="47%">
              <TextField
                onChange={(event) => this.handleOnChange(event)}
                onBlur={(event) => this.isTouched(event)}
                helperText={this.getError('password')}
                error={this.getError('password')}
                name="password"
                placeholder="password"
                margin="dense"
                id="password"
                label="Password"
                type="Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <VisibilityOffIcon />
                    </InputAdornment>
                  ),
                }}
                value={password}
                variant="outlined"
              />
            </Box>
            <Box width="47%">
              <TextField
                onChange={(event) => this.handleOnChange(event)}
                onBlur={(event) => this.isTouched(event)}
                helperText={this.getError('confirmPassword')}
                error={this.getError('confirmPassword')}
                name="confirmPassword"
                placeholder="confirmPassword"
                margin="dense"
                id="confirmPassword"
                label="confirm password"
                type="Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <VisibilityOffIcon />
                    </InputAdornment>
                  ),
                }}
                value={confirmPassword}
                variant="outlined"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(event) => this.handleOnCancel(event)}
            color="primary"
            variant="outlined"
            disabled={disabled}
          >
            Cancel
          </Button>
          <snackBarContext.Consumer>
            {({ openSnackBar }) => (
              <Button
                onClick={() => this.handleOnSubmit(openSnackBar)}
                color="primary"
                variant="contained"
                disabled={disabled}
              >
                        Submit
                {loading && <CircularProgress size={24} />}
              </Button>
            )}
          </snackBarContext.Consumer>
        </DialogActions>
      </Dialog>
    );
  }
}

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDialogBox: PropTypes.func.isRequired,
};
