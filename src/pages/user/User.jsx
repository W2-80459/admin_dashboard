import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Typography, Container } from '@mui/material';
import "./user.css";

const User = () => {
  const [driverInfo, setDriverInfo] = useState({
    name: '',
    email: '',
    licenseNumber: '',
    phone: ''
    // Add other necessary fields
  });

  const handleChange = (e) => {
    setDriverInfo({
      ...driverInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    try {
      // Fetch driver details based on the phone number
      const response = await fetch(`http://localhost:4500/getdriverbyphone?phone=${driverInfo.phone}`);
      const data = await response.json();

      // Check if the API response status is success and the data array is not empty
      if (data.status === 'success' && data.data && data.data.length > 0) {
        const driverData = data.data[0];

        // Update the state with the fetched driver details
        setDriverInfo({
          name: driverData.name || '',
          email: driverData.email || '',
          licenseNumber: driverData.license || '',
          phone: driverData.phone || '',
          // Add other necessary fields
        });
      } else {
        // If no data is found, set an empty object to clear the previous values
        setDriverInfo({
          name: '',
          email: '',
          licenseNumber: '',
          phone: driverInfo.phone, // Preserve the entered phone number
          // Add other necessary fields
        });
      }
    } catch (error) {
      console.error('Error fetching driver details:', error);
    }
  };

  const handleBlur = () => {
    if (driverInfo.phone.length === 10) {
      // Trigger API call only if the phone number is 10 digits
      handleSearch();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (driverInfo.phone) {
        // If phone number is present, make an update request
        const response = await fetch('http://localhost:4500/updatedriver', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(driverInfo),
        });

        if (response.ok) {
          console.log('Driver updated successfully!');
          // Optionally, you can reset the form or perform any other actions
        } else {
          const data = await response.json();
          console.error(`Error updating driver: ${data.error || 'Unknown error'}`);
        }
      } else {
        // If phone number is not present, handle registration logic
        console.log('Registering Driver Info:', driverInfo);
        // Add logic to send registration request to the server
      }
    } catch (error) {
      console.error('Error updating or registering driver:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="user">
      <Container className="user-container" maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="user">
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h5" align='center' gutterBottom>
                {driverInfo.phone ? 'Update Driver Details' : 'Search Driver by Phone Number'}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  name="phone"
                  value={driverInfo.phone || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  name="name"
                  value={driverInfo.name || ''}
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  type="email"
                  name="email"
                  value={driverInfo.email || ''}
                  onChange={handleChange}
                />
                <TextField
                  label="License Number"
                  fullWidth
                  margin="normal"
                  name="licenseNumber"
                  value={driverInfo.licenseNumber || ''}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  {driverInfo.phone ? 'Update' : 'Search'}
                </Button>
              </form>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default User;
