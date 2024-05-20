import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (error || validationError) {
      const timer = setTimeout(() => {
        setError(null);
        setValidationError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, validationError]);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (!firstName || !email || !phoneNumber || !password) {
      setValidationError('All fields are required.');
      return;
    }

    if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
      setValidationError('Phone number must be exactly 10 digits.');
      return;
    }

    if (isSeller && isBuyer) {
      setValidationError('You can register either as a seller or a buyer, not both.');
      return;
    }

    if (!isSeller && !isBuyer) {
      setValidationError('Please select either Seller or Buyer.');
      return;
    }

    setValidationError(null);

    try {
      const response = await axios.post('https://rentifyapp.onrender.com/register/', {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        password,
        is_seller: isSeller,
        is_buyer: isBuyer,
      });

      console.log(response.data);
      localStorage.setItem('userType', isSeller ? 'seller' : 'buyer');
      navigate(isSeller ? '/seller/login' : '/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ general: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      {validationError && <Alert severity="error">{validationError}</Alert>}
      {error && error.email && <Alert severity="error">{error.email[0]}</Alert>}
      {error && error.general && <Alert severity="error">{error.general}</Alert>}
      <form onSubmit={handleRegister}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isSeller}
              onChange={(e) => {
                setIsSeller(e.target.checked);
                if (e.target.checked) setIsBuyer(false);
              }}
            />
          }
          label="Register as Seller"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isBuyer}
              onChange={(e) => {
                setIsBuyer(e.target.checked);
                if (e.target.checked) setIsSeller(false);
              }}
            />
          }
          label="Register as Buyer"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
