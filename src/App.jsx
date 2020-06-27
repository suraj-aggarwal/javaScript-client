import React from 'react';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  InputDemo, ChildernDemo, Login, NotFound, TextFieldDemo, TraineeDetails, TraineeList,
} from './pages';
import { PrivateRoute, AuthRoute } from './routes';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <AuthRoute exact path="/" component={Login} />
          <AuthRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/TextFieldDemo" component={TextFieldDemo} />
          <PrivateRoute exact path="/InputDemo" component={InputDemo} />
          <PrivateRoute exact path="/ChildernDemo" component={ChildernDemo} />
          <PrivateRoute exact path="/Trainee" component={TraineeList} />
          <PrivateRoute exact path="/Trainee/:id" component={TraineeDetails} />
          <PrivateRoute path="/" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
