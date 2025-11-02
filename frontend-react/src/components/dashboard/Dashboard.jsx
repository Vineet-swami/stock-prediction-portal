import React,{useEffect} from 'react'
import axios from 'axios'
import axiosInstance from '../../axiosinstance'

const Dashboard = () => {
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/protected-view/')
                console.log('Protected data:', response.data);
            }catch (error) {
                console.error('Error fetching protected data:', error);
            }
        }
        fetchProtectedData();
    }, []);
  return (
    <div>
      <h1 className="text-light">Dashboard</h1>
    </div>
  )
}

export default Dashboard