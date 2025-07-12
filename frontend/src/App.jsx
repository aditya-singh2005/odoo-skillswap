import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Skills from './components/Skills'
import Request from './components/Request'
import Profile from './components/Profile'
import MakeRequest from './components/MakeRequest'
import LoginSignUp from './components/LoginSignUp'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-signup" element={<LoginSignUp />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/request" element={<Request />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/make-request" element={<MakeRequest />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App