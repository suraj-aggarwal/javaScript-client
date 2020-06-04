import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AddDialog, EditDialog, RemoveDialog } from './Components';
import { Table } from './Components/Table';
import { getDateFormat } from '../../libs/utils/formatDate';
import { callApi } from '../../libs/utils/api';
import { alert } from '../../contexts';

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
      trainees: [],
      loading: true,
      dataLength: 0,
      load: false,
    };
  }

  componentDidMount() {
    const value = this.context;
    callApi('get', '/api/trainee')
      .then((res) => {
        const response = res.records;
        this.setState({
          trainees: response,
          dataLength: response.length,
        });
      })
      .catch((err) => {
        value(err.message, 'error');
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
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

  handleRemove = (value) => {
    const { data, trainees } = this.state;
    this.setState({
      load: true,
    });
    callApi('delete', `/api/trainee/${data.originalId}`)
      .then(() => {
        value('Trainee Deleted Successfully', 'success');
        const removeIndex = trainees.map((item) => item._id).indexOf(data.originalId);
        trainees.splice(removeIndex, 1);
        this.setState({
          trainees,
        });
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

  handleEdit = (value) => {
    const {
      email, name, data, trainees,
    } = this.state;
    this.setState({
      load: true,
    });
    callApi('put', '/api/trainee', { id: data.originalId, email, name })
      .then(
        () => {
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


  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
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
      email, name, trainees, loading, dataLength, load,
    } = this.state;
    const { match: { url }, classes } = this.props;
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
          loading={load}
        />
        <RemoveDialog
          openRemoveDialog={openRemoveDialog}
          handleRemoveClose={this.handleRemoveClose}
          handleRemove={this.handleRemove}
          loading={load}
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
          loader={loading}
          dataLength={dataLength}
        />
      </div>
    );
  }
}

export default TraineeList;

TraineeList.contextType = alert;
