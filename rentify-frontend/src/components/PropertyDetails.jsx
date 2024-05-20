import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Button, TextField } from '@mui/material';

const PropertyDetail = ({ userType }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    hospitals_nearby: '',
    colleges_nearby: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://rentifyapp.onrender.com/properties/${id}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });
        setProperty(response.data);
        setFormData(response.data); // Set initial form data with property details
      } catch (error) {
        console.error('Error fetching property details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://rentifyapp.onrender.com/properties/${id}/`, formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      // Optionally, you can redirect the user to the property list page or show a success message
      alert('Property updated successfully');
      navigate('/seller/properties');
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://rentifyapp.onrender.com/properties/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      navigate('/seller/properties');
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (!property) {
    return (
      <Container>
        <Typography variant="h6">Property not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Property Details
      </Typography>
      <form>
        <TextField
          name="place"
          label="Place"
          value={formData.place}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="area"
          label="Area"
          value={formData.area}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="bedrooms"
          label="Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="bathrooms"
          label="Bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="price"
          label="Price"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="hospitals_nearby"
          label="Hospitals Nearby"
          value={formData.hospitals_nearby}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="colleges_nearby"
          label="Colleges Nearby"
          value={formData.colleges_nearby}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="outlined" color="primary" onClick={() => navigate('/seller/properties')}>
          Back to Properties
        </Button>
      </form>
    </Container>
  );
};

export default PropertyDetail;
