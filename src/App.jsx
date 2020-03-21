import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { InputDemo, ChildernDemo } from './pages/index';
import { theme } from './theme';

function App() {
  return (
    <>
      <div className="App">
        <ChildernDemo/>
      </div>
    </>
  );
}

export default App;
