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
import PropTypes from 'prop-types';


export default class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  }

  handleOnChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  render() {
    const {
      name, email,
    } = this.state;
    const {
      openEditDialog, handleEditClose, handleEdit, data
    } = this.props;
    return (
      <Dialog open={openEditDialog} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
            Edit Trainee
          </DialogContentText>
          <TextField
            onChange={this.handleOnChangeName}
            autoFocus
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
            onChange={this.handleOnChangeEmail}
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
        <DialogActions>
          <Button onClick={handleEditClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => { handleEdit(name, email); }} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  openEditDialog: PropTypes.bool.isRequired,
};
