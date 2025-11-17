import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosinstance';

const Dashboard = () => {
  const [stockTicker, setStockTicker] = useState('');
  const [error, setError] = useState(null);

  const [plot, setPlot] = useState(null);
  const [plot100, setPlot100] = useState(null);
  const [plot200, setPlot200] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [mse, setMse] = useState(null);
  const [rmse, setRmse] = useState(null);
  const [r2, setR2] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get('/protected-view/');
        console.log('Protected data:', response.data);
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    };
    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosInstance.post('/prediction/', {
        ticker: stockTicker
      });

      console.log('Stock Prediction Data:', response.data);

      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      const predictionUrl = `${backendRoot}${response.data.plot_prediction}`

      setPlot(backendRoot + response.data.plot_img);
      setPlot100(backendRoot + response.data.plot_100_dma);
      setPlot200(backendRoot + response.data.plot_200_dma);
      setPrediction(predictionUrl);
      setMse(response.data.mse);
      setRmse(response.data.rmse);
      setR2(response.data.r2);
 
      if (response.data.error) {
        setError(response.data.error);
      }

    } catch (err) {
      console.error('Error fetching stock prediction data:', err);
    }
  };

  return (
    <div className="container text-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Stock Ticker"
          onChange={(e) => setStockTicker(e.target.value)}
          required
        />
        {error && <div className="text-danger mt-1">{error}</div>}

        <button type="submit" className="btn btn-primary mt-2">
          Get Stock Info
        </button>
      </form>

      <h1 className="text-light mt-5">Dashboard</h1>

      <div className="mt-4">
        {plot && (
          <>
            <h4 className="text-light">Closing Price</h4>
            <img src={plot} className="img-fluid" />
          </>
        )}

        {plot100 && (
          <>
            <h4 className="text-light mt-4">100 Day Moving Average</h4>
            <img src={plot100} className="img-fluid" />
          </>
        )}

        {plot200 && (
          <>
            <h4 className="text-light mt-4">200 Day Moving Average</h4>
            <img src={plot200} className="img-fluid" />
          </>
        )}

        {prediction && (
          <div className="mt-4">
            <a
              href={prediction}
              className="btn btn-success"
              download
            >
              Download Prediction Report
            </a>
          </div>
        )}

        {(mse !== null && rmse !== null && r2 !== null) && (
          <div className="mt-4 text-light">
            <h5>Model Evaluation Metrics:</h5>
            <p>Mean Squared Error (MSE): {mse}</p>
            <p>Root Mean Squared Error (RMSE): {rmse}</p>
            <p>R-squared (R²): {r2}</p>
          </div>
        )}  
      </div>
    </div>
  );
};

export default Dashboard;
