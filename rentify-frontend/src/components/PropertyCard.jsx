import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Typography, Button, Alert, Snackbar, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, userType }) => {
  const [liked, setLiked] = useState(property.liked_users.some((user) => user.user === JSON.parse(localStorage.getItem('user')).id));
  const [showAlert, setShowAlert] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      const response = await axios.post('https://rentifyapp.onrender.com/likes/', { id: property.id }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      });
      setLiked(true);
      setShowAlert(true);
    } catch (error) {
      setShowAlert(false);
    }
  };

  const handleInterested = async () => {
    try {
      const response = await axios.post('https://rentifyapp.onrender.com/interested/', { property: property.id }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      });
      setEmailAlert(true);
    } catch (error) {
      setEmailAlert(true);
    }
  };

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  const handleDetailsNavigate = () => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {property.place}, {property.area}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.bedrooms} bedrooms, {property.bathrooms} bathrooms
          </Typography>
          <Typography variant="body1">Price: ₹{property.price}</Typography>
          {property.hospitals_nearby && (
            <Typography variant="body2">Hospitals nearby: {property.hospitals_nearby}</Typography>
          )}
          {property.colleges_nearby && (
            <Typography variant="body2">Colleges nearby: {property.colleges_nearby}</Typography>
          )}
          <Typography variant="body2">Likes: {property.likes}</Typography>
          <Collapse in={showDetails}>
            <Typography variant="body2">Seller: {property.seller.first_name} {property.seller.last_name}</Typography>
            <Typography variant="body2">Email: {property.seller.email}</Typography>
            <Typography variant="body2">Phone: {property.seller.phone_number}</Typography>
          </Collapse>
        </CardContent>
        <CardActions>
          {userType === 'buyer' && (
            <>
              <Button size="small" onClick={handleLike} disabled={liked}>
                {liked ? 'Liked' : 'Like'}
              </Button>
              <Button size="small" onClick={handleInterested}>
                Interested
              </Button>
              <Button size="small" onClick={handleDetailsClick}>
                {showDetails ? 'Hide Details' : 'Show Details'}
              </Button>
            </>
          )}
          {userType === 'seller' && (
            <Button size="small" onClick={handleDetailsNavigate}>
              View Details
            </Button>
          )}
        </CardActions>
      </Card>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowAlert(false)} severity="success">
          Property Liked!
        </Alert>
      </Snackbar>
      <Snackbar
        open={emailAlert}
        autoHideDuration={3000}
        onClose={() => setEmailAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setEmailAlert(false)} severity="success">
          Email Sent!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PropertyCard;
