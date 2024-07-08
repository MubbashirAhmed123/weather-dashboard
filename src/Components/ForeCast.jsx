import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import { toast } from 'react-toastify';
import ForecastChart from './ForecastChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const Forecast = () => {
  const { city } = useParams();
  const [forecastData, setForecastData] = useState(null);



  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&cnt=7&appid=${process.env.REACT_APP_MY_API_KEY}`);
        const data = await response.json();
        if (response.ok) {
          setForecastData(data);
        } else {
          if (data.message) {
            toast.error(`Error: ${data.message}`);
          } else {
            toast.error('An unknown error occurred while fetching data.');
          }
        }
      } catch (error) {
        console.error('An unknown error occurred while fetching dat:', error);
      }
    };

    fetchForecast();
  }, [city]);




  return (
    <div style={{ padding: '20px' }}>
      {forecastData && (
        <>
          <Typography variant="h4" gutterBottom color='GrayText'>{forecastData.city.name + ' - ' + forecastData.city.country}  <span className='mx-4'>- 7 Day Forecast</span></Typography>
          <Grid container spacing={3}>
            {forecastData.list.map((day, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card >
                  <CardContent className='bg-blue-400  '>
                    <Typography variant="h6">{new Date(day.dt * 1000).toLocaleDateString()}</Typography>
                    <Typography variant="body1">
                      <WbSunnyIcon /> Temp: {day.main.temp_max}K
                    </Typography>
                    <Typography variant="body1">
                      <OpacityIcon /> Precipitation: {day.rain ? day.rain['3h'] : 0}mm
                    </Typography>
                    <Typography variant="body1">
                      <CloudQueueIcon /> {day.weather[0].description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <ForecastChart forecastData={forecastData} />


        </>
      )}
    </div>
  );
};

export default Forecast;
