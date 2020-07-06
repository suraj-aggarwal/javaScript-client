import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { snackBarContext } from '../../../../contexts';

export default function EditDialog(props) {
  const {
    openEditDialog, handleEditClose, handleEdit, name, email, handleOnChangeEmail,
    handleOnChangeName, loading,
  } = props;
  return (
    <Dialog open={openEditDialog} aria-labelledby="form-dialog-title">
      <DialogContent>
        <DialogContentText>
            Edit Trainee
        </DialogContentText>
        <TextField
          onChange={(event) => handleChange(event)}
          autoFocus
          name="name"
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
          onChange={(event) => handleChange(event)}
          autoFocus
          name="email"
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
        <snackBarContext.Consumer>
          {({ oprnSnackBar }) => (
            <Button onClick={() => { handleEdit(oprnSnackBar); }} color="primary" variant="contained" disabled={loading}>
                        Submit
              {loading && <CircularProgress size={24} />}
            </Button>
          )}
        </snackBarContext.Consumer>
      </DialogActions>
    </Dialog>
  );
}

EditDialog.propTypes = {
  openEditDialog: PropTypes.bool.isRequired,
  handleEditClose: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
