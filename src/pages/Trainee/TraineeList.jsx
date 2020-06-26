import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddDialog } from './Components';
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
    this.setState({
      data: element,
    });
  }

  render() {
    const {
      open, orderBy, order,
    } = this.state;
    return (
      <div>
        <Box justifyContent="row" lineHeight={4} margin="2%">
          <Button color="primary" variant="outlined" onClick={this.toggleOpenState}>
            Add Trainee
          </Button>
          <AddDialog open={open} toggleDialogBox={this.toggleOpenState} />
        </Box>
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
        />
        {trainees && this.traineeLinks()}
      </div>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export { TraineeList };
