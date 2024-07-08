import { Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import { Line } from 'react-chartjs-2';

function ForecastChart({forecastData}) {
    const getChartData = () => {
        if (!forecastData) return null;
    
        const temps = forecastData.list.map(entry => entry.main.temp_max);
        const dates = forecastData.list.map(entry => new Date(entry.dt * 1000).toLocaleDateString());
    
        return {
          labels: dates,
          datasets: [
            {
              label: 'Temperature (K)',
              data: temps,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',        
              tension: 0.1,
            },
          ],
    
        };
      };
  return (
    <div>
        <Card style={{ marginTop: '20px', maxWidth: '100%' }}>
      <CardContent>
        <Typography variant="h6" style={{ marginBottom: '20px' }}>Temperature Trend</Typography>
        <div style={{ width: '100%', height: '400px' }}>
          <Line data={getChartData(forecastData)} options={{
            plugins: {
              title: {
               
                font: {
                  size: 20,
                  weight: 'bold'
                }
              },
              legend: {
                labels: {
                  font: {
                    size: 18,
                    weight: 'bold'
                  }
                }
              }
            }
          }} />
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default ForecastChart