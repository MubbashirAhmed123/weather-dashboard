import { Box, Container, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <div>
    <Box  py={3} mt={5} bgcolor="primary.main" color="white">
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} Weather Dashboard. All rights reserved.
        </Typography>
      </Container>
    </Box>
    </div>
  )
}

export default Footer