import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Alert } from '@mui/material';

const PropertyForm = () => {
  const [place, setPlace] = useState('');
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [price, setPrice] = useState(0);
  const [hospitalsNearby, setHospitalsNearby] = useState('');
  const [collegesNearby, setCollegesNearby] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/properties/',
        {
          place,
          area,
          bedrooms,
          bathrooms,
          price,
          hospitals_nearby: hospitalsNearby,
          colleges_nearby: collegesNearby,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/seller/properties');
    } catch (error) {
      setError(error.response.data.errors);
    }
  };
  
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Create Property
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bedrooms"
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bathrooms"
          type="number"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Hospitals Nearby"
          value={hospitalsNearby}
          onChange={(e) => setHospitalsNearby(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Colleges Nearby"
          value={collegesNearby}
          onChange={(e) => setCollegesNearby(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Property
        </Button>
        <Button color="inherit" component={Link} to="/seller/properties">
          Cancel
        </Button>
      </form>
    </Container>
  );
  };
  
  export default PropertyForm;