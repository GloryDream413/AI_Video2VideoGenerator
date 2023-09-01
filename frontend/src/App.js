import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer, Dashboard, Dream } from './components'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <div>
          <div className="gradient__bg">
            <Header />
            <Router>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dream" element={<Dream />} />
              </Routes>
            </Router>
          </div>
          <Footer/>
      </div>
      <ToastContainer autoClose={3000} draggableDirection='x' />
    </div>
  );
}
export default App