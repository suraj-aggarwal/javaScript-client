import React, { Component } from 'react';
import { Button, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AddDialog, EditDialog, RemoveDialog } from './Components';
import { Table } from './Components/Table';
import { getDateFormat } from '../../libs/utils/helper';
import { callApi } from '../../libs/utils/api';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      openRemoveDialog: false,
      openEditDialog: false,
      page: 0,
      rowsPerPage: 5,
      email: '',
      name: '',
      order: 'asc',
      data: {},
      trainees: [],
      loading: true,
      dataLength: 0,
      waiting: false,
    };
  }


  componentDidMount() {
    const { page, rowsPerPage } = this.state;
    const params = { skip: page, limit: rowsPerPage };
    this.fetchTrainees(params);
  }

  fetchTrainees = async (params) => {
    const reqType = 'get';
    const url = '/api/trainee';
    const res = await callApi({ reqType, url, params });
    if (res.data) {
      const { data: { data: { records, count } = {} } = {} } = res;
      this.setState({
        trainees: records,
        count,
        dataLength: records.length,
      });
    }
    this.setState({
      loading: false,
    });
  }

  handleCreate = async (query, openSnackBar) => {
    const { page, rowsPerPage } = this.state;
    this.setState({
      waiting: true,
    });
    const reqType = 'post';
    const url = '/api/trainee';
    const res = await callApi({ reqType, url, query });
    const params = { skip: page, limit: rowsPerPage };
    if (res.data) {
      openSnackBar('Trainee added', 'success');
      this.fetchTrainees(params);
    } else {
      openSnackBar(res.message, res.status);
    }
    this.setState({
      waiting: false,
    });
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

  handleRemove = async (openSnackBar) => {
    const {
      data, page, rowsPerPage, dataLength, count,
    } = this.state;
    const reqType = 'delete';
    const url = `/api/trainee/${data.originalId}`;
    this.setState({
      waiting: true,
    });
    const lastPage = Math.ceil(count / rowsPerPage) - 1;
    const currentPage = (page === lastPage && dataLength === 1)
      ? page - 1 : page;
    const res = await callApi({ reqType, url, params: data.originalId });
    if (!res.data) {
      openSnackBar(res.message, res.status);
      this.setState({
        openRemoveDialog: false,
        waiting: false,
      });
      return;
    }
    openSnackBar('Trainee Deleted Successfully', 'success');
    const params = { skip: currentPage * rowsPerPage, limit: rowsPerPage };
    this.fetchTrainees(params);
    this.setState({
      openRemoveDialog: false,
      waiting: false,
      page: currentPage,
    });
  }

  toggleEditDialog = () => {
    const { openEditDialog } = this.state;
    this.setState({
      openEditDialog: !openEditDialog,
    });
  }

  handleEditClose = () => {
    this.setState({
      openEditDialog: false,
    });
  }

  handleEdit = async (openSnackBar) => {
    const {
      email, name, data, trainees,
    } = this.state;
    const reqType = 'put';
    const url = '/api/trainee';
    const query = { id: data.originalId, email, name };
    this.setState({
      waiting: true,
    });
    const res = await callApi({ reqType, url, query });
    if (!res.data) {
      openSnackBar(res.message, res.status);
      this.setState({
        openEditDialog: false,
        waiting: false,
      });
      return;
    }
    openSnackBar('This is success message', 'success');
    // updates the current trainee in ui at particular index.
    const updatedList = Object.values(trainees).map(({ _id, ...rest }) => {
      if (_id === data._id) {
        return {
          _id, ...rest, name, email,
        };
      }
      return { _id, ...rest };
    });
    this.setState({
      openEditDialog: false,
      waiting: false,
      trainees: updatedList,
    });
  }

  handleChangePage = async (event, newPage) => {
    const { rowsPerPage } = this.state;
    const params = { skip: newPage * rowsPerPage, limit: rowsPerPage };
    this.setState({
      page: newPage,
      loading: true,
    });
    this.fetchTrainees(params);
  };

  handleChangeRowsPerPage = async (event) => {
    const { page } = this.state;
    const params = { skip: page * event.target.value, limit: event.target.value };
    this.setState({
      rowsPerPage: event.target.value,
      loading: true,
    });
    this.fetchTrainees(params);
  };

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      open, orderBy, order, openRemoveDialog, page, rowsPerPage, openEditDialog,
      email, name, trainees, loading, count, dataLength, waiting,
    } = this.state;
    return (
      <div>
        <Box justifyContent="row" lineHeight={4} margin="2%">
          <Button color="primary" variant="outlined" onClick={this.toggleOpenState}>
            Add Trainee
          </Button>
          <AddDialog
            open={open}
            toggleDialogBox={this.toggleOpenState}
            loading={waiting}
            handleCreate={this.handleCreate}
          />
          <EditDialog
            openEditDialog={openEditDialog}
            handleEditClose={this.toggleEditDialog}
            handleEdit={this.handleEdit}
            email={email}
            name={name}
            handleChange={this.handleFieldChange}
            loading={waiting}
          />
          <RemoveDialog
            openRemoveDialog={openRemoveDialog}
            handleRemoveClose={this.toggleRemoveDialog}
            handleRemove={this.handleRemove}
            loading={waiting}
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
            count={count}
            page={page}
            onChangePage={this.handleChangePage}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            loader={loading}
            dataLength={dataLength}
          />
        </Box>
      </div>
    );
  }
}
export default TraineeList;
