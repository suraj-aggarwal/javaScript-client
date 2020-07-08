import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { snackBarContext } from '../../../../contexts';

export default function RemoveDialog(props) {
  const {
    openRemoveDialog, handleRemoveClose, handleRemove,
  } = props;
  return (
    <div>
      <Dialog
        open={openRemoveDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Do you Really want to remove Trainee ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveClose} color="primary">
            Cancel
          </Button>
          <snackBarContext.Consumer>
            {({ openSnackBar }) => (
              <Button
                onClick={() => { handleRemove(openSnackBar); }}
                color="primary"
                variant="contained"
              >
                       Delete
              </Button>
            )}
          </snackBarContext.Consumer>
        </DialogActions>
      </Dialog>
    </div>
  );
}

RemoveDialog.propTypes = {
  openRemoveDialog: PropTypes.bool.isRequired,
  handleRemoveClose: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};
