import React from 'react';
import PropType from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, CardMedia, Typography, Button,
} from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import * as moment from 'moment';
import { NotFound } from '../NoMatch';
import trainees from './data/Trainee';
import { styles } from './traineeDetailsStyle';

function TraineeDetail(props) {
  const { id: traineeId } = useParams();
  const trainee = trainees.find(({ id }) => id === traineeId);
  const { classes } = props;
  const getDateFormat = (value) => (
    moment(value).format('dddd,MMMM Do YYYY, h:mm:ss a')
  );

  if (!trainee) {
    return <NotFound />;
  }
  return (
    <>
      <Card className={classes.root}>
        <CardMedia className={classes.cover}>
          <div className={classes.Text}>Thumbnail</div>
        </CardMedia>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {trainee.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {getDateFormat(trainee.createdAt)}
            </Typography>
            <Typography component="h6" variant="h6">
              {trainee.email}
            </Typography>
          &nbsp;
          </CardContent>
        </div>
      </Card>
      <Button color="inherit" className={classes.container} component={Link} to="/trainee">
  Back
      </Button>
    </>
  );
}
TraineeDetail.propTypes = {
  classes: PropType.objectOf(PropType.string).isRequired,
};
export default withStyles(styles)(TraineeDetail);
