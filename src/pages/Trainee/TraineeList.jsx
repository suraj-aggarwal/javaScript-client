import React, { Component } from 'react';
import { Button, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { graphql } from '@apollo/react-hoc';
import PropTypes from 'prop-types';
import { AddDialog, EditDialog, RemoveDialog } from './Components';
import { Table } from './Components/Table';
import { getDateFormat } from '../../libs/utils/helper';
import { callApi } from '../../libs/utils/api';
import GET_ALL_TRAINEE from './query';

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
      dataLength: 0,
      onSubmitLoading: false,
    };
  }

  handleCreate = async (query, openSnackBar) => {
    const { page, rowsPerPage } = this.state;
    this.setState({
      onSubmitLoading: true,
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
      onSubmitLoading: false,
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
      data, page, rowsPerPage, dataLength,
    } = this.state;
    const reqType = 'delete';
    const url = `/api/trainee/${data.originalId}`;
    this.setState({
      onSubmitLoading: true,
    });
    const currentPage = (page !== 0 && dataLength === 1)
      ? page - 1 : page;
    const res = await callApi({ reqType, url, params: data.originalId });
    if (!res.data) {
      openSnackBar(res.message, res.status);
      this.setState({
        openRemoveDialog: false,
        onSubmitLoading: false,
      });
      return;
    }
    openSnackBar('Trainee Deleted Successfully', 'success');
    const params = { skip: currentPage * rowsPerPage, limit: rowsPerPage };
    this.fetchTrainees(params);
    this.setState({
      openRemoveDialog: false,
      onSubmitLoading: false,
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
      onSubmitLoading: true,
    });
    const res = await callApi({ reqType, url, query });
    if (!res.data) {
      openSnackBar(res.message, res.status);
      this.setState({
        openEditDialog: false,
        onSubmitLoading: false,
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
      onSubmitLoading: false,
      trainees: updatedList,
    });
  }

  handleChangePage = (refetch) => (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({ page: newPage }, () => {
      refetch({ skip: rowsPerPage * newPage, limit: rowsPerPage });
    });
  };

  handleChangeRowsPerPage = (refetch) => (event) => {
    const { page } = this.state;
    this.setState({ rowsPerPage: event.target.value }, () => {
      refetch({ skip: page * event.target.value, limit: event.target.value });
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
      email, name, onSubmitLoading,
    } = this.state;

    const {
      data: {
        getAllTrainee: { records = [], count = 0 } = {},
        refetch,
        loading = false,
      },

    } = this.props;
    return (
      <div>
        <Box justifyContent="row" lineHeight={4} margin="2%">
          <Button color="primary" variant="outlined" onClick={this.toggleOpenState}>
            Add Trainee
          </Button>
          <AddDialog
            open={open}
            toggleDialogBox={this.toggleOpenState}
            loading={onSubmitLoading}
            handleCreate={this.handleCreate}
          />
          <EditDialog
            openEditDialog={openEditDialog}
            handleEditClose={this.toggleEditDialog}
            handleEdit={this.handleEdit}
            email={email}
            name={name}
            handleChange={this.handleFieldChange}
            loading={onSubmitLoading}
          />
          <RemoveDialog
            openRemoveDialog={openRemoveDialog}
            handleRemoveClose={this.toggleRemoveDialog}
            handleRemove={this.handleRemove}
            loading={onSubmitLoading}
          />
          <Table
            id="id"
            data={records}
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
            onChangePage={this.handleChangePage(refetch)}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage(refetch)}
            loader={loading}
            dataLength={records.length}
          />
        </Box>
      </div>
    );
  }
}

TraineeList.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default graphql(
  GET_ALL_TRAINEE, {
    options: { variables: { skip: 0, limit: 5 } },
  },
)(TraineeList);
