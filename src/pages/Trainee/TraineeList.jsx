import React, { Component } from 'react';
import { Button, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { AddDialog, EditDialog, RemoveDialog } from './Components';
import trainees from './data/Trainee';
import { Table } from './Components/Table';
import { getDateFormat } from '../../libs/utils/helper';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      openRemoveDialog: false,
      openEditDialog: false,
      page: 0,
      rowsPerPage: 10,
      email: '',
      name: '',
      order: 'asc',
      data: {},
    };
  }

  traineeLinks = () => {
    const { match: { url } } = this.props;
    return trainees.map((elements) => (
      <ul key={elements.id}>
        <li>
          <Link to={`${url}/${elements.id}`}>{elements.name}</Link>
        </li>
      </ul>
    ));
  }

  toggleOpenState = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }

  handleSort = (field) => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }

  handleSelect = (element) => {
    const { name, email } = element;
    this.setState({
      data: element,
      email,
      name,
    });
  }

  toggleRemoveDialog = () => {
    const { openRemoveDialog } = this.state;
    this.setState({
      openRemoveDialog: !openRemoveDialog,
    });
  }

  handleRemove = (openSnackBar) => {
    const compareTo = '2019-02-14T18:15:11.778Z';
    const { data } = this.state;
    const { createdAt } = data;
    const isAfter = moment(createdAt).isAfter(compareTo);
    this.setState({
      openRemoveDialog: false,
    });
    const message = isAfter ? 'Trainee Deletion UnSuccessfull' : 'Trainee Deleted Successfully';
    const status = isAfter ? 'error' : 'success';
    openSnackBar(message, status);
    console.log('DELETE ITEM');
    console.log(data);
  }

  toggleEditDialog = () => {
    const { openEditDialog } = this.state;
    this.setState({
      openEditDialog: !openEditDialog,
    });
  }

  handleEdit = (openSnackBar) => {
    const { email, name } = this.state;
    this.setState({
      openEditDialog: false,
    });
    openSnackBar('Trainee Update Successfull', 'success');
    console.log('Edit Data');
    console.log({ email, name });
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,
    });
  };

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      open, orderBy, order, openRemoveDialog, page, rowsPerPage, openEditDialog,
      email, name,
    } = this.state;
    return (
      <div>
        <Box justifyContent="row" lineHeight={4} margin="2%">
          <Button color="primary" variant="outlined" onClick={this.toggleOpenState}>
            Add Trainee
          </Button>
          <AddDialog open={open} toggleDialogBox={this.toggleOpenState} />
          <EditDialog
            openEditDialog={openEditDialog}
            handleEditClose={this.toggleEditDialog}
            handleEdit={this.handleEdit}
            email={email}
            name={name}
            handleChange={this.handleFieldChange}
          />
          <RemoveDialog
            openRemoveDialog={openRemoveDialog}
            handleRemoveClose={this.toggleRemoveDialog}
            handleRemove={this.handleRemove}
          />
          <Table
            id="id"
            data={trainees}
            columns={[
              {
                field: 'name',
                label: 'Name',
              },
              {
                field: 'email',
                label: 'Email Address',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                label: 'Date',
                align: 'right',
                format: getDateFormat,
              },
            ]}
            onSort={this.handleSort}
            orderBy={orderBy}
            order={order}
            onSelect={this.handleSelect}
            actions={[{
              Icon: <EditIcon />,
              handler: () => this.toggleEditDialog,
            }, {
              Icon: <DeleteIcon />,
              handler: () => this.toggleRemoveDialog,
            }]}
            count={100}
            page={page}
            onChangePage={this.handleChangePage}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Box>
      </div>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export { TraineeList };
