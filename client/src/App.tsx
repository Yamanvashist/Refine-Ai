import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

import useAuthStore from './store/AuthStore';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import History from './pages/History';
import SingleAnalysis from './pages/SingleAnalysis';
import Resume from "./pages/Resume"
import About from './pages/About';

function App() {

  const { checkAuth } = useAuthStore()

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth()
    }
    authenticate()
  }, [checkAuth])

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path='/' element={<Home></Home>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/history' element={<History />} />
          <Route path='/about' element={<About />} />
          <Route path="/analysis/:id" element={<SingleAnalysis />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
