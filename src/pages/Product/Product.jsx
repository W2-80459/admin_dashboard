import "./product.css"
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { format } from 'date-fns';

const Product = ({ busId, onUpdate }) => {
    const [busData, setBusData] = useState({
        fromm: "",
        date: "",
        //arrivalDate: null,
        destination: "",
        departureTime: "",
        availableSeats: "",
    });

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4500/getbusdetails/${busId}`);
                const data = await response.json();
                console.log(data.data);
                if (data.status === "success") {
                    setBusData((prevData) => ({
                        ...prevData,
                        origin: data.data.fromm,
                        date: data.data.date,
                        destination: data.data.destination,
                        departureTime: data.data.departure_time,
                        availableSeats: data.data.available_seats,
                    }));


                } else {
                    console.error('Error fetching bus details:', data.message);
                }
            } catch (error) {
                console.error('Error fetching bus details:', error);
            }
        };

        fetchBusDetails();
    }, [busId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTimeChange = (name, value) => {
        setBusData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (name, value) => {
        setBusData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4500/updatebus/${busId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(busData),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Bus data updated successfully');
                onUpdate(); // Update the list of found buses in the parent component
            } else {
                console.error('Error updating bus data:', data.message);
            }
        } catch (error) {
            console.error('Error updating bus data:', error);
        }
    };

    return (
        <div className="product">
            <Container maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '40px' }}>
                    Update Bus Information
                </Typography>
                <div className="productTopLeft">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={5} justifyContent="flex-start">
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Origin"
                                    variant="outlined"
                                    fullWidth
                                    name="origin"
                                    value={busData.fromm}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Destination"
                                    variant="outlined"
                                    fullWidth
                                    name="destination"
                                    value={busData.destination}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid item xs={12} sm={4.3}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>

                                        <DatePicker
                                            name="departureDate"
                                            label="Departure Date"
                                            inputFormat="MM/dd/yyyy"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={busData.date || null}
                                            onChange={(value) => handleDateChange("date", value)}
                                        />

                                    </DemoContainer>
                                </LocalizationProvider>


                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>

                                        {/* <DatePicker
                                            name="arrivalDate"
                                            label="Arrival Date"
                                            inputFormat="MM/dd/yyyy"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={busData.arrivalDate}
                                            onChange={(value) => handleDateChange("arrivalDate", value)}

                                        /> */}
                                    </DemoContainer>
                                </LocalizationProvider>


                            </Grid>
                            <Grid item xs={14} sm={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker name="arrivalTime"
                                            label="Arrival Time"
                                            ampm={false}
                                            inputFormat="HH:mm"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            value={busData.arrivalTime}
                                            onChange={(value) => handleTimeChange("arrivalTime", value)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={10} sm={5}>
                                <TextField
                                    label="Available Seats"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    name="availableSeats"
                                    value={busData.availableSeats}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Update Bus
                                </Button>
                            </Grid>

                        </Grid>

                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Product;
