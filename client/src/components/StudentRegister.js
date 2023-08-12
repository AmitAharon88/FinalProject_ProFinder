import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


const BASE_URL = process.env.REACT_APP_BASE_URL;

const StudentRegister = () => {
    const [location, setLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        getLocation();
   }, []);

   const getLocation = async () => {
       try {
           const res = await fetch(`${BASE_URL}/api/location`);
           const data = await res.json();
           console.log(data);
           setLocation(data);
       } catch (e) {
           console.log(e);
       };
   };

   const handleLocationChange = (event) => {
       setSelectedLocation(event.target.value);
   };

   const handelSubmit = async (event) => {
       event.preventDefault();
   }
    return (
        <>
            <Typography 
                component="h2"
                variant="h2"
                color="#71797E"
                fontWeight="bold"
                sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 8
                }}
            >
                Register as a Student!
            </Typography>
                    <Container component="main" maxWidth="xs">
                        <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                            <Box component="form" onSubmit={handelSubmit} noValidate sx={{ mt: 1 }}>
                                <Box sx={{ display: 'flex', gap: '16px' }}> {/* Flex container for first name and last name */}
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="first_name"
                                        label="First name"
                                        type="text"
                                        id="first_name"
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="last_name"
                                        label="Last name"
                                        type="text"
                                        id="last_name"
                                    />
                                </Box>
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                />
                                <Box sx={{ display: 'flex', gap: '16px'}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateField']} sx={{ mt:1 }} >
                                            <DatePicker
                                                name="dob"
                                                label="Date of birth"
                                                slotProps={{ textField: { variant: 'outlined' } }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <FormControl 
                                        sx={{ minWidth: 220 }} 
                                        margin="normal"
                                        required
                                        fullwidth
                                    >
                                        <InputLabel id="locationLabel">Location</InputLabel>
                                        <Select
                                            labelId="locationLabel"
                                            id="location"
                                            label="Location"
                                            name="location"
                                            value={selectedLocation}
                                            onChange={handleLocationChange}
                                        >
                                            {location.map(item => {
                                                return (
                                                    <MenuItem key= {item.location_id} value={item.location_name}>{item.location_name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt:2 }}>
                                    <Typography component="body1" variant="p" color="#71797E">
                                        Set a profile picture:
                                    </Typography>
                                    <Button variant="outlined" component="label">
                                        Upload
                                        <input hidden accept="image/*" multiple type="file" />
                                    </Button>
                                </Stack>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ 
                                        mt: 3, 
                                        mb: 2, 
                                        bgcolor: "#009688",
                                        '&:hover': {
                                          bgcolor: "#00695f",
                                        },
                                    }}
                                >
                                    Register
                                </Button>
                            </Box>
                        </Box>
                    </Container>







    
        </>
    )
};

export default StudentRegister;