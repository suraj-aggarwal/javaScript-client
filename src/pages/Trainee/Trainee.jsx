import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import { TraineeList } from './TraineeList';
import TraineeDetail from './TraineeDetails';

const Trainee = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={TraineeList} />
      <Route exact path={`${path}/:id`} component={TraineeDetail} />
    </Switch>
  );
};

export { Trainee };
