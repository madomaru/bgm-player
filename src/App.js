import './App.css';
import Form from './page/Form';
import About from './page/About';
import NoMatch from "./page/NoMatch";
import Player from './page/Player';
import {Routes,Route} from 'react-router-dom'

import { type } from '@testing-library/user-event/dist/type';
function App() {
  
  return (
    <div>
      <h1>BGM Player</h1>
      <Routes>
        <Route path="/" element={<Form />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/player" element={<Player/>}/>
        {/* <Route path="*" element={<NoMatch />}/> */}
      </Routes>
      

      
    </div>
  );
}

export default App;
