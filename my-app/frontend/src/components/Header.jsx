// import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Stack } from '@mui/material';

export default function RihlaHeader() {
  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0} 
      sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #eaeaea' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '60px' }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              color: '#135d46', 
              letterSpacing: '-0.5px'
            }}
          >
            Rihla
          </Typography>

          {/* Navigation Links */}
          <Stack direction="row" spacing={4}>
            <Button 
              disableRipple
              sx={{ 
                textTransform: 'none', 
                fontSize: '1rem', 
                fontWeight: 500,
                color: '#1d2a23', // Darker text for the active/first item
                '&:hover': { bgcolor: 'transparent', color: '#135d46' }
              }}
            >
              Activities
            </Button>
            <Button 
              disableRipple
              sx={{ 
                textTransform: 'none', 
                fontSize: '1rem', 
                color: '#6c757d', // Grey text for inactive items
                '&:hover': { bgcolor: 'transparent', color: '#1d2a23' }
              }}
            >
              Reservations
            </Button>
            <Button 
              disableRipple
              sx={{ 
                textTransform: 'none', 
                fontSize: '1rem', 
                color: '#6c757d',
                '&:hover': { bgcolor: 'transparent', color: '#1d2a23' }
              }}
            >
              My bookings
            </Button>
            <Button 
              disableRipple
              sx={{ 
                textTransform: 'none', 
                fontSize: '1rem', 
                color: '#6c757d',
                '&:hover': { bgcolor: 'transparent', color: '#1d2a23' }
              }}
            >
              Profile
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}