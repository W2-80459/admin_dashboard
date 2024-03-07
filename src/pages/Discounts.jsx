import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product/product.css"
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Paper,
  Grid,
} from '@mui/material';

const Discounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({ name: '', percentage: '' });

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get('http://localhost:4500/getdiscounts');
        setDiscounts(response.data.data);
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    };

    fetchDiscounts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount((prevDiscount) => ({
      ...prevDiscount,
      [name]: value,
    }));
  };

  const handleAddDiscount = async () => {
    try {
      // Call the adddiscount API
      await axios.post('http://localhost:4500/adddiscount', newDiscount);

      // After successfully adding the discount, fetch the updated discounts
      const response = await axios.get('http://localhost:4500/getdiscounts');
      setDiscounts(response.data.data);

      // Reset the form
      setNewDiscount({ name: '', percentage: '' });
    } catch (error) {
      console.error('Error adding discount:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="product" style={{ height: '70vh' }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '20px' }}>
          Manage Discounts
        </Typography>
        <div className="productTopLeft " style={{ marginTop: '10vh' }} >
          <form onSubmit={handleAddDiscount}>
            <Grid container spacing={5} justifyContent="flex-start">
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Dicount Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={newDiscount.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Percentage"
                  variant="outlined"
                  fullWidth
                  name="percentage"
                  value={newDiscount.percentage}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddDiscount}
                  style={{ marginBottom: '20px', width: '100%' }}
                >
                  Add Discount
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Discount Name</TableCell>
                <TableCell>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {discounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell>{discount.id}</TableCell>
                  <TableCell>{discount.discount_code}</TableCell>
                  <TableCell>{discount.discount_percentage} %</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Discounts;
