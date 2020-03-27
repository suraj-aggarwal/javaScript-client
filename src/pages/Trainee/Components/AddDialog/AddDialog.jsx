import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      touched: [],
    };
  }

  handlerOnChangeUserName = (e) => {
    this.setState({
      userName: e.target.value
    });
  }

  handlerOnChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }


  handlerOnChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  isTouched = () => {
    
  }


  render() {
    const { open, onClose, onSubmit } = this.props;
    return (
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter Trainee Details
            </DialogContentText>
            <TextField
              onChange={this.handlerOnChangeUserName}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="Text"
              fullWidth
              variant="outlined"
            />
            <TextField
              onChange={this.handlerOnChangeEmail}
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
            />
            <TextField
              onChange={this.handlerOnChangePassword}
              autoFocus
              margin="dense"
              id="name"
              label="password"
              type="password"
              fullWidth
              variant="outlined"
            />
            <TextField
              onChange={this.handlerOnChangePassword}
              autoFocus
              margin="dense"
              id="name"
              label="confirm password"
              type="password"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onSubmit} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={onSubmit} color="primary" variant="outlined">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
