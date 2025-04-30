import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//* IMPORT DE PAGINAS
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'

//* IMPORT DE COMPONENTES
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </Router>
  )
}
