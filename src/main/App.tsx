import './App.css';
import Header from './Components/Header/Header.tsx';
import Analytics from '../modules/Analytics/Analytics.tsx';
import Generator from '../modules/Generator/Generator.tsx';
import History from '../modules/History/History.tsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Analytics />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/generator' element={<Generator />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </div>
  );
};

export default App;
