import React from 'react';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import {
  InputDemo, ChildernDemo, Trainee, Login, NotFound, TextFieldDemo,
} from './pages';
import { PrivateRoute, AuthRoute } from './routes';

function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute exact path="/" component={Login} />
        <AuthRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/account" component={Trainee} />
        <PrivateRoute exact path="/TextFieldDemo" component={TextFieldDemo} />
        <PrivateRoute exact path="/TextFiled" component={InputDemo} />
        <PrivateRoute exact path="/ChildernDemo" component={ChildernDemo} />
        <PrivateRoute exact path="/Trainee" component={Trainee} />
        <PrivateRoute path="/" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
