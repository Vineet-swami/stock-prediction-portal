import { useState } from 'react'
import './assets/css/style.css'
import Headers from './components/Headers.jsx'
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Headers />
      <Main />
      <Footer />  
    </>
  )
}

export default App
