import logo from './logo.svg';
import './App.css';
import Fetch from './components/Fetch';
import Button from '@mui/material/Button';

function App() {
  return (
    <>
      <h1>Welcome to Idris' Tacqueria</h1>
      <div>
        <Button variant="contained">On the Grill!</Button>
        <Button variant="contained">Menu</Button>
      </div>
    </>
    
  );
}

export default App;
