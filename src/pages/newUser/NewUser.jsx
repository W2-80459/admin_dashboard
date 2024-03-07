import "./newUser.css";
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';

const NewUser = () => {
  const initialDriverInfo = {
    name: '',
    email: '',
    licenseNumber: '',
    phone: ''
    // Add other necessary fields
  };
  const [driverInfo, setDriverInfo] = useState(initialDriverInfo);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    // Add validation rules for each field
    if (!driverInfo.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!driverInfo.phone.trim()) {
      errors.phone = 'Phone Number is required';
    } else if (!/^\d+$/.test(driverInfo.phone.trim()) || driverInfo.phone.trim().length !== 10) {
      errors.phone = 'Invalid phone number (only 10 numeric characters are allowed)';
    }
    if (!driverInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(driverInfo.email.trim())) {
      errors.email = 'Invalid email format';
    }
    if (!driverInfo.licenseNumber.trim()) {
      errors.licenseNumber = 'License Number is required';
    }
    // Add other necessary validations

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setDriverInfo({
      ...driverInfo,
      [e.target.name]: e.target.value,
    });
    // Clear validation error when the user starts typing in a field
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:4500/registerdriver', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(driverInfo),
        });

        if (response.ok) {
          // Reset the form after successful registration
          setDriverInfo(initialDriverInfo);
          alert('Driver registered successfully!');
        } else {
          const data = await response.json();
          alert(`Error registering driver: ${data.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error registering driver:', error);
        alert('An error occurred while registering the driver.');
      }
    }
  };

  const handleCancel = () => {
    // Reset the state to initial values
    setDriverInfo(initialDriverInfo);
    setErrors({});
  };

  return (
    <div className="newUser" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65vh' }}>
      <Container maxWidth="sm">
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="h5" align="center" gutterBottom>
              Driver Registration
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8.6}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                name="name"
                value={driverInfo.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              <TextField
                label="Phone Number"
                fullWidth
                margin="normal"
                name="phone"
                value={driverInfo.phone}
                onChange={handleChange}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                type="email"
                name="email"
                value={driverInfo.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                label="License Number"
                fullWidth
                margin="normal"
                name="licenseNumber"
                value={driverInfo.licenseNumber}
                onChange={handleChange}
                error={Boolean(errors.licenseNumber)}
                helperText={errors.licenseNumber}
              />
              {/* Add other necessary fields */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                  Register
                </Button>
                <Button type="button" variant="outlined" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default NewUser;
