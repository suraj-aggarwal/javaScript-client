import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { graphql } from '@apollo/react-hoc';
import { Mutation } from '@apollo/react-components';
import { AddDialog, EditDialog, RemoveDialog } from './Components';
import { Table } from './Components/Table';
import { getDateFormat } from '../../libs/utils/formatDate';
import { alert } from '../../contexts';
import GET_ALL_TRAINEE from './query';
import { DELETE_TRAINEE, EDIT_TRAINEE, CREATE_TRAINEE } from './mutation';
import { UPDATE_TRAINEE_SUB, DELETE_TRAINEE_SUB } from './subscription';

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
      rowsPerPage: 5,
      email: '',
      name: '',
      load: false,
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
        const updateRecords = [...records].map((record) => {
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

  handleCreate = (createTrainee, value) => {
    this.setState({ load: true });
    createTrainee().then(() => {
      value('Trainee created successfully', 'success');
    }).catch((err) => {
      value(err.message, 'error');
    }).finally(
      () => {
        this.setState(
          { load: false },
        );
      },
    );
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

  handleRemove = async (deleteTrainee, value) => {
    const { data, page } = this.state;
    const { data: { getAllTrainee: { records } } } = this.props;
    this.setState({
      load: true,
    });
    deleteTrainee({ variables: { id: data.originalId } }).then(() => {
      value('Trainee Deleted Successfully', 'success');
      if (records.length === 1) {
        this.setState({
          page: page - 1,
        });
      }
    })
      .catch((err) => {
        value(err.message, 'error');
      })
      .finally(() => {
        this.setState({
          openRemoveDialog: false,
          load: false,
        });
      });
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

  handleEdit = (editTrainee, value) => {
    const {
      email, name, data,
    } = this.state;
    this.setState({
      load: true,
    });
    editTrainee({ variables: { id: data.originalId, name, email } })
      .then(() => {
        value('This is success message', 'success');
      })
      .catch((err) => {
        value(err.message, 'error');
      }).finally(() => {
        this.setState({
          openEditDialog: false,
          load: false,
        });
      });
  }

  handleChangePage = (refetch) => (_, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({ page: newPage }, () => {
      refetch({ skip: rowsPerPage * newPage, limit: rowsPerPage });
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
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
      email, name, load,
    } = this.state;
    const {
      match: { url }, classes,
      data: {
        getAllTrainee: { records = [], count = 0 } = {},
        refetch,
        loading,
      },
    } = this.props;
    const variables = { skip: rowsPerPage * page, limit: rowsPerPage };
    return (
      <div>
        <br />
        <Button color="primary" variant="outlined" onClick={this.handlerOnClick}>
          Add Trainee
        </Button>
        <Mutation mutation={CREATE_TRAINEE} refetchQueries={[{ query: GET_ALL_TRAINEE, variables }]}>
          {(createTrainee) => (
            <AddDialog
              open={open}
              onClose={this.handlerOnClose}
              createTrainee={createTrainee}
            />
          )}
        </Mutation>
        <Mutation mutation={EDIT_TRAINEE}>
          { (editTrainee) => (
            <EditDialog
              openEditDialog={openEditDialog}
              handleEditClose={this.handleEditClose}
              handleEdit={this.handleEdit}
              email={email}
              name={name}
              handleOnChangeEmail={this.handleOnChangeEmail}
              handleOnChangeName={this.handleOnChangeName}
              loading={load}
              editTrainee={editTrainee}
            />
          )}
        </Mutation>
        <Mutation mutation={DELETE_TRAINEE}>
          {(deleteTrainee) => (
            <RemoveDialog
              openRemoveDialog={openRemoveDialog}
              handleRemoveClose={this.handleRemoveClose}
              handleRemove={this.handleRemove}
              deleteTrainee={deleteTrainee}
              loading={load}
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
            handler: this.handleEditOpen,
          }, {
            Icon: <DeleteIcon />,
            handler: this.handleRemoveOpen,
          }]}
          count={count}
          page={page}
          onChangePage={this.handleChangePage(refetch)}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          loader={loading}
          dataLength={records.length}
        />
      </div>
    );
  }
}

export default graphql(
  GET_ALL_TRAINEE, {
    options: { variables: { skip: 0, limit: 10 } },
  },
)(TraineeList);

TraineeList.contextType = alert;
