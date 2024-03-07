import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import { Button } from '@material-ui/core';

const ProductList = () => {
  const [busList, setBusList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4500/getallbus');
        // Inside the useEffect block where you set the busList state
        setBusList(response.data.data.map((bus, index) => ({ id: index + 1, ...bus })));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const handleDeleteBus = async (id) => {
    try {
      // Call the API to delete the bus with the specified id
      await axios.delete(`http://localhost:4500/deletebus/${id}`);
      console.log(id);

      // Fetch the updated bus list after deletion
      const response = await axios.get('http://localhost:4500/getallbus');
      setBusList(response.data.data.map((bus, index) => ({ id: index + 1, ...bus })));
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  const columns = [
    { field: 'bus_id', headerName: 'Bus ID', width: 90, headerAlign: 'center' },
    { field: 'fromm', headerName: 'From', width: 150, headerAlign: 'center' },
    { field: 'destination', headerName: 'Destination', width: 200, headerAlign: 'center' },
    { field: 'departure_time', headerName: 'Departure Time', width: 150, headerAlign: 'center' },
    { field: 'total_seats', headerName: 'Total Seats', width: 120, headerAlign: 'center' },
    { field: 'available_seats', headerName: 'Available Seats', width: 150, headerAlign: 'center' },
    { field: 'booked_seats', headerName: 'Booked Seats', width: 120, headerAlign: 'center' },
    { field: 'date', headerName: 'Date', width: 120, headerAlign: 'center' },
    { field: 'servicename', headerName: 'Service Name', width: 200, headerAlign: 'center' },
    { field: 'bustype', headerName: 'Bus Type', width: 150, headerAlign: 'center' },
    { field: 'price', headerName: 'Price', width: 120, headerAlign: 'center' },
    { field: 'duration', headerName: 'Duration', width: 150, headerAlign: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteBus(params.row.bus_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="product">
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '20px' }}>
          Bus List
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={busList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            getRowId={(row) => row.bus_id}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductList;
