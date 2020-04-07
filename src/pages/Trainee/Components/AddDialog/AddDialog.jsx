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


export default class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      touched: [],
    };
  }

  handlerOnChangeUserName = (e) => {
    this.setState({
      userName: e.target.value,
    });
  }

  handlerOnChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  }


  handlerOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  isTouched = () => {

  }


  render() {
    const { userName, password, email } = this.state;
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
            Add Trainee
          </DialogContentText>
          <TextField
            onChange={this.handlerOnChangeUserName}
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
            value={userName}
            fullWidth
          />
          <TextField
            onChange={this.handlerOnChangeEmail}
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
            onChange={this.handlerOnChangePassword}
            autoFocus
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
            onChange={this.handlerOnChangePassword}
            autoFocus
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
            value={password}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handlerOnChangeEmail} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={this.handlerOnChangePassword} color="primary" variant="outlined">
            Submit
          </Button>
        </DialogActions>

      </Dialog>
    );
  }
}
