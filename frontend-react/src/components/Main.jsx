import React from 'react'
import Button from './Button'


const Main = () => {
  return (
    <>
      <div className='container'>
        <div className='p-5 text-center bg-light-dark rounded'>
          <h1 className='text-light'>Stock Prediction Portal</h1>
          <p className='text-light'>
            Many websites and platforms offer tools for stock analysis and forecasting, ranging from simple charts for beginners to complex AI-powered predictions for active traders. No service can guarantee 100% accuracy, but these portals provide valuable data, insights, and research to inform investment decisions.
          </p>
                <Button text="Explore Now" class="btn-outline-warning" url="/dashboard" />
            </div>
        </div>
    </>
  )
}

export default Main