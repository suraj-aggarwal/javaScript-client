import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AddDialog } from './Components';
import trainees from './data/Trainee';
import { Table } from './Components/Table';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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

  render() {
    const { open } = this.state;
    const { match: { url } } = this.props;
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
              align: 'center',
            },
            {
              field: 'email',
              label: 'Email Address',
            },
          ]}
        />
        {
          trainees.map((elements) => (
            <React.Fragment key={elements.id}>
              <li>
                <Link to={`${url}/${elements.id}`}>{elements.name}</Link>
              </li>
            </React.Fragment>
          ))
        }
      </div>
    );
  }
}

export { TraineeList };
