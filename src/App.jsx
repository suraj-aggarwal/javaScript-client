import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { ChildernDemo } from './pages';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChildernDemo />
    </ThemeProvider>
  );
}

export default App;
