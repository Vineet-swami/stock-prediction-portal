import { useState } from 'react'
import './assets/css/style.css'
import Headers from './components/Headers.jsx'
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx' 
import Register from './components/Register'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import AuthProvider from './AuthProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Headers />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />  
      </BrowserRouter>
    </AuthProvider>
      
      {/* <Main /> */}
    </>
  )
}

export default App
