import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Login, Trainee } from './pages';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Trainee />
    </ThemeProvider>
  );
}

export default App;
