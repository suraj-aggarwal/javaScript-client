import React, { Component } from 'react';
import { Button, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as moment from 'moment';
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
      loading: false,
      dataLength: 0,
    };
  }

  async componentDidMount() {
    const value = this.context;
    const params = { skip: 0, limit: 5 };
    const reqType = 'get';
    const url = '/api/trainee';
    this.setState({
      loading: true,
    });
    const res = await callApi({ reqType, url, params });
    if (res) {
      const { data: { data: { records, count } } } = res;
      this.setState({
        trainees: records,
        count,
        dataLength: records.length,
      });
    } else {
      value(res.message, res.status);
    }
    this.setState({
      loading: false,
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

  handleRemove = (openSnackBar) => {
    const compareTo = '2019-02-14T18:15:11.778Z';
    const { data } = this.state;
    const { createdAt } = data;
    const isAfter = moment(createdAt).isAfter(compareTo);
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
    openSnackBar('Trainee Update Successfull', 'success');
    console.log('Edit Data');
    console.log({ email, name });
  }

  handleChangePage = async (event, newPage) => {
    const { rowsPerPage, page } = this.state;
    this.setState({
      page: newPage,
    });
    const value = this.context;
    const params = { skip: page * rowsPerPage, limit: rowsPerPage };
    const reqType = 'get';
    const url = '/api/trainee';
    this.setState({
      loading: true,
    });
    const res = await callApi({ reqType, url, params });
    if (res) {
      const { data: { data: { records, count } } } = res;
      this.setState({
        trainees: records,
        count,
        dataLength: records.length,
      });
    } else {
      value(res.message, res.status);
    }
    this.setState({
      loading: false,
    });
  };

  handleChangeRowsPerPage = async (event) => {
    const { page } = this.state;
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
    });
    const value = this.context;
    const params = { skip: page * event.target.value, limit: event.target.value };
    const reqType = 'get';
    const url = '/api/trainee';
    this.setState({
      loading: true,
    });
    const res = await callApi({ reqType, url, params });
    if (res) {
      const { data: { data: { records, count } } } = res;
      this.setState({
        trainees: records,
        count,
        dataLength: records.length,
      });
    } else {
      value(res.message, res.status);
    }
    this.setState({
      loading: false,
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
      email, name, trainees, loading, count, dataLength,
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
export { TraineeList };
