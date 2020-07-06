import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

export const snackBarContext = React.createContext();

function SimpleSnackbar(props) {
  const {
    open, alertMessage, alertStatus, handleClose,
  } = props;
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose()}>
        <Alert onClose={handleClose()} severity={alertStatus}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default class SnackBarProvider extends Component {
  constructor() {
    super();
    this.state = {
      alertMessage: '',
      alertStatus: '',
      open: false,
    };
  }

  openSnackBar = (message, status) => {
    this.setState({
      alertMessage: message,
      alertStatus: status,
      open: true,
    });
  };

  closeSnackBar = () => () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { alertMessage, alertStatus, open } = this.state;
    const { children } = this.props;
    return (
      <div>
        <snackBarContext.Provider value={{ openSnackBar: this.openSnackBar }}>
          {children}
          <SimpleSnackbar
            open={open}
            alertMessage={alertMessage}
            alertStatus={alertStatus}
            handleClose={this.closeSnackBar}
          />
        </snackBarContext.Provider>
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  alertStatus: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

SnackBarProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
