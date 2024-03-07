import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom";
import Home from '../pages/home/Home';
import Sidebar from './sidebar/Sidebar';

const Login = () => {
    const history = useHistory();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your authentication logic here
        if (credentials.username.trim() !== '' && credentials.password.trim() !== '') {
            // Set sessionStorage after successful login
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', credentials.username);

            // You can also redirect the user to another page if needed
            // For example, you can use react-router-dom for navigation
            // history.push('/dashboard');

            console.log('Login credentials:', credentials);
            console.log('User is now logged in.');


        } else {
            console.log('Invalid credentials. Please enter a username and password.');
        }
        setTimeout(() => {
            return Redirect('/');
        }, 2000); 
    };
   // Adjust the timeout value as needed (in milliseconds)


return (
    <div className='product'>
        <Grid container justifyContent="center" alignItems="center" style={{ height: '60vh' }}>
            <Grid item xs={10} sm={6} md={4} lg={3}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Password"
                            fullWidth
                            margin="normal"
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    </div>
);
};

export default Login;
