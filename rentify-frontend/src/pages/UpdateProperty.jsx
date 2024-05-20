import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Alert, CircularProgress } from '@mui/material';

const UpdateProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({
    place: '',
    area: '',
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    hospitals_nearby: '',
    colleges_nearby: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://rentifyapp.onrender.com/properties/${id}/`);
        setProperty(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (event) => {
    setProperty({
      ...property,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://rentifyapp.onrender.com/properties/${id}/`,
        property,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/properties');
    } catch (error) {
      setError(error.response ? error.response.data : "An error occurred");
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Update Property
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Place"
          name="place"
          value={property.place}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Area"
          name="area"
          value={property.area}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bedrooms"
          name="bedrooms"
          type="number"
          value={property.bedrooms}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bathrooms"
          name="bathrooms"
          type="number"
          value={property.bathrooms}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={property.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Hospitals Nearby"
          name="hospitals_nearby"
          value={property.hospitals_nearby}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Colleges Nearby"
          name="colleges_nearby"
          value={property.colleges_nearby}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Update Property
        </Button>
      </form>
    </Container>
  );
};

export default UpdateProperty;
