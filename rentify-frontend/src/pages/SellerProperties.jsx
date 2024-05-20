import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Button, Grid, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

const SellerProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/properties/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
          params: {
            page: page,
          },
        });
        const count = Math.ceil(response.data.count / 5);
        setProperties(response.data.results);
        setTotalPages(count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Seller Properties
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/seller/properties/create"
        style={{ marginBottom: '1rem' }}
      >
        Create Property
      </Button>
      <Grid container spacing={2}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard property={property} userType="seller" />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default SellerProperties;
