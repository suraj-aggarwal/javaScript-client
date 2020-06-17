import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import {
  InputDemo, ChildernDemo, Trainee, Login, NotFound, TextFieldDemo,
} from './pages';
import { PrivateRoute, AuthRoute } from './routes';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/account" component={Trainee} />
        <PrivateRoute exact path="/TextFieldDemo" component={TextFieldDemo} />
        <PrivateRoute exact path="/TextFiled" component={InputDemo} />
        <PrivateRoute exact path="/ChildernDemo" component={ChildernDemo} />
        <PrivateRoute exact path="/Trainee" component={Trainee} />
        <AuthRoute exact path="/login" component={Login} />
        <Route path="/">
          <Redirect to="/login" />
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
