import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Pagination } from '@mui/material';
import PropertyCard from '../components/PropertyCard';

const BuyerProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    ordering: '',
    min_price: '',
    max_price: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://rentifyapp.onrender.com/properties/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
          params: {
            ...filters,
            page
          },
        });
        setProperties(response.data.results);
        setTotalPages(Math.ceil(response.data.count / response.data.page_size));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, page]);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      ordering: '',
      min_price: '',
      max_price: '',
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Buyer Properties
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="search"
            label="Search"
            value={filters.search}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="min_price"
            label="Min Price"
            type="number"
            value={filters.min_price}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="max_price"
            label="Max Price"
            type="number"
            value={filters.max_price}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Order By</InputLabel>
            <Select
              name="ordering"
              value={filters.ordering}
              onChange={handleFilterChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="bedrooms">Bedrooms</MenuItem>
              <MenuItem value="bathrooms">Bathrooms</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: '1rem' }}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard property={property} userType="buyer" />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default BuyerProperties;
