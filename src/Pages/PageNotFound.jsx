import { Container, Typography,Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate=useNavigate()
    const handleGoHome = () => {
        navigate
        ('/');
      };
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
     
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go to Homepage
      </Button>
    </Container>
  )
}

export default PageNotFound