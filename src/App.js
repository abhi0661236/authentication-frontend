import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
// import Edit from './components/Edit/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          {/* <Route path='edit/:id' element={<Edit />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
