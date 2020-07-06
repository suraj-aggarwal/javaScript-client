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
import { withStyles } from '@material-ui/styles';
import { validateTrainee } from '../../../../config/constants';
import { snackBarContext } from '../../../../contexts';
import { callApi } from '../../../../libs/utils/api';

const useStyles = () => ({
  buttonProgress: {
    position: 'absolute',
    top: '70%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: {},
      error: {},
      disabled: true,
      loading: false,
    };
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

  handleOnSubmit = (value) => {
    const { email, name, password } = this.state;
    const { onClose } = this.props;
    this.setState({
      loading: true,
    });
    callApi('post', '/api/trainee', { email, name, password })
      .then((res) => {
        value('Trainee Added sucessfully', 'success');
        console.log(res);
      })
      .catch((err) => {
        value(err.message, 'error');
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
        onClose();
      });
  }


  render() {
    const {
      error, name, email, password, confirmPassword, loading,
    } = this.state;
    const { open, onClose, classes } = this.props;
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
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          <snackBarContext.Consumer>
            {({openSnackBar}) => (
              <Button onClick={() => { this.handleOnSubmit(openSnackBar); }} color="primary" variant="contained" disabled={this.hasError()}>
                        Submit
              </Button>
            )}
          </snackBarContext.Consumer>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(useStyles)(AddDialog);

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
