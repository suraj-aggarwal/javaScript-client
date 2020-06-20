import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
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

  toggleOpenState = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }

  render() {
    const { open } = this.state;
    const { match: { url } } = this.props;
    return (
      <div>
        <br />
        <Box justifyContent="row" lineHeight={4}>
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

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export { TraineeList };
