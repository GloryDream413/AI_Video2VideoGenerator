import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Dream, Footer, Dashboard } from './components'
import { useState, createContext } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const UserContext = createContext(null)
const App = () => {
  const [nftRoute, setNftRoute] = useState('')
  return (
    <UserContext.Provider value={{ nftRoute, setNftRoute }}>
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
    </UserContext.Provider>
  );
}
export default App