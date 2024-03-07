import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';
import { Button } from '@material-ui/core';
const UserList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:4500/getalldrivers');
        const data = await response.json();
        console.log(data);
        setDrivers(data.data); // Set the drivers state with the "data" array
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);
  const handleDelete = async (driverId) => {
    try {
      const response = await fetch(`http://localhost:4500/deleteDriver/${driverId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the deletion was successful, update the drivers state without the deleted driver
        setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver.id !== driverId));
      } else {
        console.error('Error deleting driver:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center' },
    { field: 'name', headerName: 'Name', width: 150, headerAlign: 'center' },
    { field: 'phone', headerName: 'Phone', width: 200, headerAlign: 'center' },
    { field: 'email', headerName: 'Email', width: 250, headerAlign: 'center' },
    { field: 'license', headerName: 'License', width: 150, headerAlign: 'center' },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      headerAlign: 'center',
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.row.id)}
        >Delete</Button>
      ),
    },
  ];

  return (
    <div className="product">
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '20px' }}>
          Driver's List
        </Typography>
        <div style={{ height: 400, width: '100%', left: '10px' }}>
          <DataGrid
            rows={drivers}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Container>
    </div>
  );
};

export default UserList;
