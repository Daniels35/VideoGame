import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Form from './pages/Form/From';
import MyParticles from './components/MyParticles/MyParticles';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className='app-container'>
      <MyParticles />
      <Router>
        <Routes>
          <Route path="/VideoGame" element={<Landing />} />
          <Route path="/VideoGame/home" element={<Home />} />
          <Route path="/VideoGame/game/:id" element={<Detail />} />
          <Route path="/VideoGame/new" element={<Form />} />
          {/* <Route path="*" element={<div>404 NOT FOUND</div>} /> */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
