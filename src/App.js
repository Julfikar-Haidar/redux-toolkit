import React from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import DashBoard from './pages/DashBoard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEditTour from './pages/AddEditTour';


function App() {


  return (
  
  <BrowserRouter>
      <div className="App">

        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddEditTour />} />
          <Route path="/edit/:id" element={<AddEditTour />} />
    
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
