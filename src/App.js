import './App.css';
import Header from './Component/Header';
import Form from './page/Form';
import About from './page/About';
import NoMatch from "./page/NoMatch";
import Player from './page/Player';
import {Routes,Route} from 'react-router-dom'

// import { type } from '@testing-library/user-event/dist/type';
function App() {
  
  return (
    <div>
      <Header/>
      
      <div className='bg-blue-200 h-screen'>
        <div  className='bg-blue-50 w-4/5 items-center mx-auto px-8 py-6 h-screen'>
        <Routes>
            <Route path="/" element={<Form />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/player" element={<Player/>}/>
            <Route path="*" element={<NoMatch />}/>
        </Routes>  
        </div>
        
      </div>
        
      
      

      
    </div>
  );
}

export default App;
