import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AddDialog, EditDialog, RemoveDialog } from './Components';
import trainees from './data/Trainee';
import { Table } from './Components/Table';
import { getDateFormat } from '../../libs/utils/formatDate';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      order: '',
      data: null,
      openRemoveDialog: false,
      openEditDialog: false,
      page: 0,
      rowsPerPage: 10,
      email: '',
      name: '',
    };
  }

  handlerOnClick = () => {
    this.setState({
      open: true,
    });
  }

  handlerOnClose = () => {
    this.setState({
      open: false,
    });
  }

  handleSort = (field) => (event) => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }

  handleSelect = (element) => (event) => {
    const { name, email } = element;
    this.setState({
      data: element,
    });
    this.setState({
      email,
      name,
    });
  }

  handleRemoveOpen = () => (event) => {
    this.setState({
      openRemoveDialog: true,
    });
  }

  handleRemoveClose = () => {
    this.setState({
      openRemoveDialog: false,
    });
  }

  handleRemove = () => {
    const { data } = this.state;
    this.setState({
      openRemoveDialog: false,
    });
    console.log('DELETE ITEM');
    console.log(data);
  }

  handleEditOpen = () => (event) => {
    this.setState({
      openEditDialog: true,
    });
  }

  handleEditClose = () => {
    this.setState({
      openEditDialog: false,
    });
  }

  handleEdit = () => {
    const { email, name } = this.state;
    this.setState({
      openEditDialog: false,
    });
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

  handleOnChangeEmail = () => (event) => {
    this.setState({
      email: event.target.value,
    });
  }

  handleOnChangeName = () => (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  render() {
    const {
      open, orderBy, order, openRemoveDialog, page, rowsPerPage, openEditDialog,
      email, name,
    } = this.state;
    const { match: { url } } = this.props;
    return (
      <div>
        <br />
        <Button color="primary" variant="outlined" onClick={this.handlerOnClick}>
          Add Trainee
        </Button>
        <AddDialog open={open} onClose={this.handlerOnClose} />
        <EditDialog
          openEditDialog={openEditDialog}
          handleEditClose={this.handleEditClose}
          handleEdit={this.handleEdit}
          email={email}
          name={name}
          handleOnChangeEmail={this.handleOnChangeEmail}
          handleOnChangeName={this.handleOnChangeName}
        />
        <RemoveDialog
          openRemoveDialog={openRemoveDialog}
          handleRemoveClose={this.handleRemoveClose}
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
            handler: this.handleEditOpen,
          }, {
            Icon: <DeleteIcon />,
            handler: this.handleRemoveOpen,
          }]}
          count={100}
          page={page}
          onChangePage={this.handleChangePage}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

export { TraineeList };
