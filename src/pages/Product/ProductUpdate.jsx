import React, { useState, useEffect } from 'react';
import {
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Container,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import Product from './Product';

const ProductUpdate = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [foundBuses, setFoundBuses] = useState([]);
    const [selectedBusId, setSelectedBusId] = useState('');
    const [busData, setBusData] = useState([]);

    useEffect(() => {
        const fetchBusData = async () => {
            try {
                const response = await fetch('http://localhost:4500/getallbus');
                const data = await response.json();

                if (Array.isArray(data.data)) {
                    setBusData(data.data);
                } else {
                    console.error('Invalid bus data format:', data);
                }
            } catch (error) {
                console.error('Error fetching bus data:', error);
            }
        };

        fetchBusData();
    }, []);

    const handleSourceChange = (event) => {
        setSource(event.target.value);
    };

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    const handleFindBus = () => {
        if (Array.isArray(busData)) {
            const filteredBuses = busData.filter(
                (bus) => bus.fromm === source && bus.destination === destination
            );
            setFoundBuses(filteredBuses);
        }
    };


    const onRowClick = (id) => {
        setSelectedBusId(id);
    };

    return (
        <>
            <div className="product">
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '100px' }}>
                        Find Bus Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="source-label">Source</InputLabel>
                                <Select
                                    labelId="source-label"
                                    id="source"
                                    value={source}
                                    label="Source"
                                    onChange={handleSourceChange}
                                >
                                    {Array.isArray(busData) &&
                                        busData.map((bus) => (
                                            <MenuItem key={bus.bus_id} value={bus.fromm}>
                                                {bus.fromm}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="destination-label">Destination</InputLabel>
                                <Select
                                    labelId="destination-label"
                                    id="destination"
                                    value={destination}
                                    label="Destination"
                                    onChange={handleDestinationChange}
                                >
                                    {Array.isArray(busData) &&
                                        busData.map((bus) => (
                                            <MenuItem key={bus.bus_id} value={bus.destination}>
                                                {bus.destination}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleFindBus}>
                                Find Bus
                            </Button>
                        </Grid>

                        {Array.isArray(foundBuses) && foundBuses.length > 0 && (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Bus Number</TableCell>
                                            <TableCell>Source</TableCell>
                                            <TableCell>Destination</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {foundBuses.map((bus) => (
                                            <TableRow key={bus.bus_id} onClick={() => onRowClick(bus.bus_id)}>
                                                <TableCell>{bus.bus_id}</TableCell>
                                                <TableCell>{bus.fromm}</TableCell>
                                                <TableCell>{bus.destination}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {selectedBusId && <Product busId={selectedBusId} onUpdate={handleFindBus} />}
                    </Grid>
                </Container>
            </div>

        </>
    );
};

export default ProductUpdate;
