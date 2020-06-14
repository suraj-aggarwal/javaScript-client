import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Trainee } from './pages/index';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Trainee />
    </ThemeProvider>
  );
}

export default App;
