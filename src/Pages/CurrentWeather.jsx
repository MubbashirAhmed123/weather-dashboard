import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import Forecast from '../Components/ForeCast';
import { toast } from 'react-toastify';

const CurrentWeather = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_MY_API_KEY}`);
        const data = await response.json();
        if (!data.message) {
          setWeather(data);
        }

      } catch (error) {
        toast.error('Error fetching weather data');
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div style={{ padding: '20px' }}>
      {weather ? (
        <Card>
          <CardContent className='bg-blue-300 '>
            <Typography variant='h4' paddingY={3} color='gray'> Current Weather</Typography>
            <Typography variant="h5">{weather.name} - {weather.sys.country}</Typography>
            <Typography variant="body1">Temperature: {weather.main.temp}K</Typography>
            <Typography variant="body1">Humidity: {weather.main.humidity}%</Typography>
            <Typography variant="body1">Wind Speed: {weather.wind.speed}m/s</Typography>
            <Typography variant="body1">Weather: {weather.weather[0].description}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>Loading...</Typography>
      )}

      <Forecast />
    </div>
  );
};

export default CurrentWeather;
