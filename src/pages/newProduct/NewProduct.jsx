import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Snackbar,
  Container,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "axios";
import dayjs from 'dayjs'; 

const NewProduct = () => {
  const initialFormData = {
    fromm: "",
    destination: "",
    departure_time: null,
    total_seats: "",
    // date: null,
    servicename: "",
    bustype: "",
    price: "",
    duration: "",
    driverName: "",
    driverPhone: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (name, value) => {
    const formattedDate = value ? dayjs(value).format('YYYY-MM-DD') : null;
    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedDate,
    }));
  };
  
  const handleTimeChange = (name, value) => {
    const formattedTime = value ? dayjs(value).format('HH:mm:ss') : null;
    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedTime,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the phone number
    if (formData.driverPhone.length < 10) {
      alert("Phone number must be at least 10 digits");
      setOpenSnackbar(true);
      return;
    }

    try {
      // Make a POST request to your server API endpoint
      const response = await axios.post("http://localhost:4500/registerbus", formData);

      // Handle the response as needed
      console.log("Server response:", response.data);

      // Optionally, reset the form data after successful submission
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors, show error message, etc.
    }
  };

  const handleCancel = () => {
    // Reset the state to initial values
    setFormData(initialFormData);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="product">
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: "50px" }}>
          Add Bus Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <TextField
                name="fromm"
                label="From"
                variant="outlined"
                fullWidth
                required
                value={formData.fromm}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="destination"
                label="Destination"
                variant="outlined"
                fullWidth
                required
                value={formData.destination}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              {/* Include other form fields here */}
              <TextField
                name="servicename"
                label="Service Name"
                variant="outlined"
                fullWidth
                required
                value={formData.servicename}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel>Bus Type</InputLabel>
                <Select
                  name="bustype"
                  label="Bus Type"
                  value={formData.bustype}
                  onChange={handleChange}
                >
                  <MenuItem value="AC">AC</MenuItem>
                  <MenuItem value="Non-AC">Non-AC</MenuItem>
                  <MenuItem value="Sleeper">Sleeper</MenuItem>
                  <MenuItem value="AC-Sleeper">AC-Sleeper</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    name="departure_time"
                    label="Departure Time"
                    ampm={false}
                    inputFormat="HH:mm"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.departure_time}
                    onChange={(value) => handleTimeChange("departure_time", value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={10} sm={3}>
              <TextField
                name="total_seats"
                label="Total Seats"
                variant="outlined"
                fullWidth
                required
                type="number"
                value={formData.total_seats}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    name="date"
                    label="Date"
                    inputFormat="YYYY-MM-DD"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.date}
                    onChange={(value) => handleDateChange("date", value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={10} sm={3}>
              <TextField
                name="price"
                label="Price"
                variant="outlined"
                fullWidth
                required
                type="number"  // assuming it's a numeric value
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} sm={3}>
              <TextField
                name="duration"
                label="Duration"
                variant="outlined"
                fullWidth
                required
                value={formData.duration}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="driverName"
                label="Driver Name"
                variant="outlined"
                fullWidth
                required
                value={formData.driverName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={16} sm={7}>
              <TextField
                type="tel"
                name="driverPhone"
                label="Driver Phone Number"
                variant="outlined"
                fullWidth
                required
                value={formData.driverPhone}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <div style={{ display: "flex", gap: "15px", marginTop: "20px", margin: "50px", left: "800vh" }}>
            <Button type="submit" variant="contained" color="primary" style={{ width: "350px", left: "10vh" }} fullWidth>
              Register Bus
            </Button>
            <Button type="button" variant="outlined" color="secondary" style={{ width: "50%", left: "20vh" }} fullWidth onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message="Invalid phone number. Please enter at least 10 digits."
          />
        </form>
      </Container>
    </div>
  );
};

export default NewProduct;
