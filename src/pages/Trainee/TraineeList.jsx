import React, { Component } from 'react';
import { Button, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { graphql } from '@apollo/react-hoc';
import { Mutation } from '@apollo/react-components';
import PropTypes from 'prop-types';
import { AddDialog, EditDialog, RemoveDialog } from './Components';
import { Table } from './Components/Table';
import { getDateFormat } from '../../libs/utils/helper';
import GET_ALL_TRAINEE from './query';
import { DELETE_TRAINEE, EDIT_TRAINEE, CREATE_TRAINEE } from './mutation';
import { UPDATE_TRAINEE_SUB, DELETE_TRAINEE_SUB } from './subscription';

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

  componentDidMount() {
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: UPDATE_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainee: { records } } = prev;
        const { data: { updateTrainee } } = subscriptionData;
        const updateRecords = records.map((record) => {
          if (record.originalId === updateTrainee.originalId) {
            return {
              ...record,
              ...updateTrainee,
            };
          }
          return record;
        });
        return {
          getAllTrainee: {
            ...prev.getAllTrainee,
            count: prev.getAllTrainee.count,
            records: updateRecords,
          },
        };
      },
    });

    subscribeToMore({
      document: DELETE_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainee: { records, count } } = prev;
        const { data: { deleteTrainee } } = subscriptionData;
        const updateRecords = [...records].filter((record) => deleteTrainee !== record.originalId);
        return {
          getAllTrainee: {
            ...prev.getAllTrainee,
            count: count - 1,
            records: updateRecords,
          },
        };
      },
    });
  }

  handleCreate = async (query, createTrainee, openSnackBar) => {
    this.setState({
      onSubmitLoading: true,
    });
    const payload = { variables: query };
    const res = await createTrainee(payload);
    if (res.data) {
      openSnackBar('Trainee added', 'success');
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

  handleRemove = async (deleteTrainee ,openSnackBar) => {
    const {
      data,
    } = this.state;    
    this.setState({
      onSubmitLoading: true,
    });
    const query = { variables: { id: data.originalId } };
    const res = await deleteTrainee(query);
    this.setState({
      openRemoveDialog: false,
      onSubmitLoading: false,
    });
    if (!res.data) {
      openSnackBar(res.message, res.status);
      return;
    }
    openSnackBar('Trainee Deleted Successfully', 'success');
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

  handleEdit = async (editTrainee, openSnackBar) => {
    const {
      email, name, data,
    } = this.state;
    const payload = { variables: { id: data.originalId, name, email } };
    this.setState({
      onSubmitLoading: true,
    });
    const res = await editTrainee(payload);
    if (!res.data) {
      openSnackBar(res.message, res.status);
      this.setState({
        openEditDialog: false,
        onSubmitLoading: false,
      });
      return;
    }
    openSnackBar('Trainee Updated Successfully', 'success');
    this.setState({
      openEditDialog: false,
      onSubmitLoading: false,
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
    const variables = { skip: rowsPerPage * page, limit: rowsPerPage };
    return (
      <div>
        <Box justifyContent="row" lineHeight={4} margin="2%">
          <Button color="primary" variant="outlined" onClick={this.toggleOpenState}>
            Add Trainee
          </Button>
          <Mutation mutation={CREATE_TRAINEE} refetchQueries={[{ query: GET_ALL_TRAINEE, variables }]}>
            { (createTrainee) => (
              <AddDialog
              open={open}
              toggleDialogBox={this.toggleOpenState}
              loading={onSubmitLoading}
              handleCreate={this.handleCreate}
              createTrainee={createTrainee}
              />
            )}
          </Mutation>
          <Mutation mutation={EDIT_TRAINEE}>
            {(editTrainee) => (
              <EditDialog
                openEditDialog={openEditDialog}
                handleEditClose={this.toggleEditDialog}
                handleEdit={this.handleEdit}
                email={email}
                name={name}
                handleChange={this.handleFieldChange}
                loading={onSubmitLoading}
                editTrainee={editTrainee}
              />            
            )}
          </Mutation>
          <Mutation mutation={DELETE_TRAINEE}>
            {(deleteTrainee)=>(
              <RemoveDialog
                openRemoveDialog={openRemoveDialog}
                handleRemoveClose={this.toggleRemoveDialog}
                handleRemove={this.handleRemove}
                loading={onSubmitLoading}
                deleteTrainee={deleteTrainee}
              />
            )}
          </Mutation>

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
