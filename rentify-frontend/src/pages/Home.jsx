
import React, { useEffect } from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    if (token && userType) {
      if (userType === 'seller') {
        navigate('/seller/properties');
      } else if (userType === 'buyer') {
        navigate('/properties');
      }
    }
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Typography variant="h2" align="center" gutterBottom>
        Welcome to Rentify
      </Typography>
      <Typography variant="h5" align="center" paragraph>
        Discover the perfect rental property with ease.
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/register"
          style={{ marginRight: '1rem' }}
        >
          Register as Seller
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/register">
          Register as Buyer
        </Button>
      </div>
    </Container>
  );
};

export default Home;
