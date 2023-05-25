import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './component/Navbar';
import Home from './component/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './component/Register';
import Edit from './component/Edit';
import Details from './component/Details';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exaxt path="/" element={<Home/>}></Route>
          <Route exaxt path="/register" element={<Register/>}></Route>
          <Route exaxt path="/edit/:id" element={<Edit/>}></Route>
          <Route exaxt path="/view/:id" element={<Details/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
