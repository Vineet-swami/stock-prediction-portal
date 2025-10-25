import React from 'react'
import Button from './Button'

const Headers = () => {
  return (
    <>
        <nav className="navbar container pt-3 pd-3 align-items-start justify-content-between">
            <a className="navbar-brand text-light" href="#">Stock Prediction Portal</a>

            <div>
                <Button text="Login" class="btn-outline-info" />
                &nbsp;
                <Button text="Register" class="btn-info" />
            </div>
        </nav>
    </>
  )
}

export default Headers