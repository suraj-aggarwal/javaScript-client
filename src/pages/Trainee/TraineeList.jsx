import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { graphql } from '@apollo/react-hoc';
import { Mutation } from '@apollo/react-components';
import { AddDialog, EditDialog, RemoveDialog } from './Components';
import { Table } from './Components/Table';
import { getDateFormat } from '../../libs/utils/formatDate';
import { callApi } from '../../libs/utils/api';
import { alert } from '../../contexts';
import GET_ALL_TRAINEE from './query';
import DELETE_TRAINEE from './mutation';


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

  // componentDidMount() {
  //   const value = this.context;
  //   const params = { skip: 0, limit: 5 };
  //   callApi('get', '/api/trainee', {}, params)
  //     .then((res) => {
  //       console.log(res);
  //       const { records, count } = res;
  //       this.setState({
  //         trainees: records,
  //         dataLength: records.length,
  //         count,
  //       });
  //     })
  //     .catch((err) => {
  //       value(err.message, 'error');
  //     })
  //     .finally(() => {
  //       this.setState({
  //         loading: false,
  //       });
  //     });
  // }

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

  handleRemove = (deleteTrainee, value) => {
    const { data, trainees } = this.state;
    this.setState({
      load: true,
    });
    console.log('original id', data);
    deleteTrainee({ variables: { id: data.originalId } })
      .then(() => {
        value('Trainee Deleted Successfully', 'success');
      })
      .catch((err) => {
        console.log(err);
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

  handleEdit = (value) => {
    const {
      email, name, data, trainees,
    } = this.state;
    this.setState({
      load: true,
    });
    callApi('put', '/api/trainee', { id: data.originalId, email, name })
      .then(
        (res) => {
          console.log(res);
          value('This is success message', 'success');
          const updatedList = Object.values(trainees).map(({ _id, ...rest }) => {
            if (_id === data._id) {
              return {
                _id, ...rest, name, email,
              };
            }
            return { _id, ...rest };
          });
          this.setState({
            trainees: updatedList,
          });
        },
      )
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
    return (
      <div>
        {console.log('--------------get all trainee -----------', this.props)}
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
          loading={load}
        />
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
    options: { variables: { skip: 0, limit: 5 } },
  },
)(TraineeList);

TraineeList.contextType = alert;
