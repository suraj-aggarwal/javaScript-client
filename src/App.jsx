import React from 'react';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-components';
import {
  InputDemo, ChildernDemo, Trainee, Login, NotFound, TextFieldDemo,
} from './pages';
import { PrivateRoute, AuthRoute } from './routes';
import { SnackBarProvider } from './contexts';
import client from './libs/apllo-client';

function App() {
  return (
    <ApolloProvider client={client}>
      <SnackBarProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/TextFieldDemo" component={TextFieldDemo} />
            <PrivateRoute exact path="/TextFiled" component={InputDemo} />
            <PrivateRoute exact path="/ChildernDemo" component={ChildernDemo} />
            <PrivateRoute path="/Trainee" component={Trainee} />
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </Router>
      </SnackBarProvider>
    </ApolloProvider>
  );
}

export default App;
