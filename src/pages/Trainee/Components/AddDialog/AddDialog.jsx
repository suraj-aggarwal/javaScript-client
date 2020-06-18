import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
import { alert } from '../../../../contexts';

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
      validateTrainee.validateAt(field, this.state)
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
    const { error, touched } = this.state;
    return (Object.keys(error).length !== 0) && (Object.keys(touched).length > 3);
  }

  handleOnSubmit = (value) => {
    const { email, name, password } = this.state;
    const { onClose, createTrainee } = this.props;
    this.setState({
      loading: true,
    });
    createTrainee({ variables: { email, name, password } })
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
    const {
      open, onClose, classes, handleCreate,
    } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
            Add Trainee
          </DialogContentText>
          <TextField
            onChange={this.handleOnChange('name')}
            onClick={() => this.isTouched('name')}
            autoFocus
            error={error.name}
            helperText={error.name}
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
            onChange={this.handleOnChange('email')}
            onBlur={() => this.isTouched('email')}
            error={error.email}
            helperText={error.email}
            autoFocus
            margin="dense"
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
        </DialogContent>
        <DialogContent spacing={2}>
          <TextField
            onChange={this.handleOnChange('password')}
            onBlur={() => this.isTouched('password')}
            autoFocus
            error={error.password}
            helperText={error.password}
            margin="dense"
            id="name"
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
          <TextField
            onChange={this.handleOnChange('confirmPassword')}
            onBlur={() => this.isTouched('confirmPassword')}
            autoFocus
            error={error.confirmPassword}
            helperText={error.confirmPassword}
            margin="dense"
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
            value={confirmPassword}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="outlined">
            Cancel
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          <alert.Consumer>
            {(value) => (
              <Button onClick={() => { this.handleOnSubmit(value); }} color="primary" variant="contained" disabled={this.hasError()}>
                        Submit
              </Button>
            )}
          </alert.Consumer>
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
