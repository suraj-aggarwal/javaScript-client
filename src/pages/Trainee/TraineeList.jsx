import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
      data: null,
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

  render() {
    const { open, orderBy, order, data } = this.state;
    const { match: { url } } = this.props;
    console.log(data);
    return (
      <div>
        <br />
        <Button color="primary" variant="outlined" onClick={this.handlerOnClick}>
          Add Trainee
        </Button>
        <AddDialog open={open} onClose={this.handlerOnClose} />
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
        {/* {
          trainees.map((elements) => (
            <React.Fragment key={elements.id}>
              <li>
                <Link to={`${url}/${elements.id}`}>{elements.name}</Link>
              </li>
            </React.Fragment>
          ))
        } */}
      </div>
    );
  }
}

export { TraineeList };
