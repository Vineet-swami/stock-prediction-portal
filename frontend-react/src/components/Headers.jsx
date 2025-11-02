import React, {useContext} from 'react'
import Button from './Button'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Headers = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    console.log('✅ Logged out successfully')
    navigation('/login')

  }
  return (
    <>
        <nav className="navbar container pt-3 pd-3 align-items-start justify-content-between">
            <Link className="navbar-brand text-light" to="/">Stock Prediction Portal</Link>
            
            <div>
              {
                isLoggedIn ? (
                  <>
                  <Button text="Dashboard" class="btn-outline-info" url = "/dashboard"/>
                  <button className='btn btn-outline-danger ms-2' onClick={handleLogout}>Logout</button>
                  </>
                  // <span className='text-light'> Logout </span>
                  
                ):(
                  <>
                  <Button text="Login" class="btn-outline-info" url = "/login"/>
                  &nbsp;
                  <Button text="Register" class="btn-info" url="/register"/>
                  </>
                )
              }
                
            </div>
        </nav>
    </>
  )
}

export default Headers