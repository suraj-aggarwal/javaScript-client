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
    this.setState({
      data: element,
    });
  }

  handleRemoveOpen = (element) => (event) => {
    console.log('-----------Remove------------');
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

  handleEditOpen = (element) => (event) => {
    console.log('-----------Remove------------');
    this.setState({
      openEditDialog: true,
    });
  }

  handleEditClose = () => {
    this.setState({
      openEditDialog: false,
    });
  }

  handleEdit = (name, email) => {
    this.setState({
      openEditDialog: false,
    });
    console.log('Edit Data');
    console.log({ name, email });
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

  render() {
    const {
      open, orderBy, order, data, openRemoveDialog, page, rowsPerPage, openEditDialog,
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
          data={data}
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
