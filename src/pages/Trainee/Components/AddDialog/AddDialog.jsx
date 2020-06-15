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
import propTypes from 'prop-types';
import { validateTrainee } from '../../../../config/constants';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  touched: {},
  allErrors: {},
  disabled: true,
};

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: {},
      allErrors: {},
      disabled: true,
    };
  }

  handleOnSubmit = () => {
    const { toggleOpenState } = this.props;
    this.setState(initialState);
    toggleOpenState();
  }

  handleOnCancel = () => {
    const { toggleOpenState } = this.props;
    this.setState(initialState);
    toggleOpenState();
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
      name, email, password, confirmPassword, disabled,
    } = this.state;
    const { open, toggleOpenState } = this.props;
    return (
      <Dialog open={open} onClose={toggleOpenState} aria-labelledby="form-dialog-title">
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
          <Button
            color="primary"
            variant="outlined"
            disabled={disabled}
            onClick={(event) => this.handleOnSubmit(event)}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddDialog.propTypes = {
  open: propTypes.bool.isRequired,
  toggleOpenState: propTypes.func.isRequired,
};

export default AddDialog;
