// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons'; // Import the humidity icon

import { toast } from 'react-toastify';

const cities = ['Delhi', 'Mumbai', 'Tokyo', 'Sydney'];

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const fetchedData = await Promise.all(
          cities.map(async (city) => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_MY_API_KEY}`);
            return await response.json();
            
          })
        );
        setWeatherData(fetchedData);
      } catch (error) {
        toast.error('Some error occurred.')
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
    <Typography variant='h3' marginTop={5}  textAlign='center' color='darkgrey' >Weather Dashboard</Typography>

    {weatherData.length > 0 ? (
      <Grid container spacing={3} className="p-5">
        {weatherData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className="h-full w-full">
              <CardMedia
                component="img"
                height="140"
                image={`https://media.istockphoto.com/id/1434661909/photo/cyclone-tauktae-2021-cloud-map-arabian-sea-3d-render-neutral.jpg?s=612x612&w=0&k=20&c=l2OUIMMVehj9294_CwgjmKEbgcBPxJx10thZHNmfgsc=`}
                alt="Weather image"
                className='opacity-80 '
              />
              <CardContent className="space-y-3">
                <Typography variant="h5" className="text-blue-800">
                  {data.name} - {data.sys.country}
                </Typography>
                <Typography variant="body1" className="flex items-center text-gray-700">
                  <WbSunnyIcon className="mr-1" /> Temperature: {data.main.temp}K
                </Typography>
                <Typography variant="body1" marginLeft={1} className="flex items-center text-gray-700">
                  <FontAwesomeIcon icon={faTint} className="mr-1" /> Humidity: {data.main.humidity}%
                </Typography>
                <Typography variant="body1" className="flex items-center text-gray-700">
                  <CloudQueueIcon className="mr-1" /> Weather: {data.weather[0].description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography>Loading...</Typography>
    )}
  </div>
  );
};

export default Home;
