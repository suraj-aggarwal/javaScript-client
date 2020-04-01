import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { InputDemo, ChildernDemo , Trainee} from './pages/index';
import { theme } from './theme';

function App() {
  return (
    <>
      <div className="App">
        <Trainee />
      </div>
    </>
  );
}

export default App;
