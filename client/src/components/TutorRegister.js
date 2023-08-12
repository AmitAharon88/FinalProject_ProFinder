import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CategoryInputField from "./CategoryInputField"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


const BASE_URL = process.env.REACT_APP_BASE_URL;

const TutorRegister = () => {
    const [location, setLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [categoryInputFields, setCategoryInputFields] = useState([]);
 
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

    const addCategoryInputField = () => {
        setCategoryInputFields(prevFields => [...prevFields, <CategoryInputField />]);
    };

    const handelSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const tutorData = {};

        formData.forEach((value, key) => {
            tutorData[key] = value;
        });

        tutorData.location = selectedLocation;
        tutorData.categories = categoryInputFields;

        try {
            const res = await fetch(`${BASE_URL}/api/tutors/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tutorData),
            });
            if (Response.ok) {
                console.log('Tutor register handle Success');
            } else {
                console.log('Tutor register handle error')
            }
        } catch (e) {
            console.log(e);
        };
    };

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
                Register as a Tutor!
            </Typography>
            {/* <form onSubmit={handelSubmit}> */}
                {/* <ThemeProvider theme={defaultTheme}> */}
                    <Container component="main" maxWidth="xs">
                        <Box
                        sx={{
                            marginTop: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                            <Box component="form" onSubmit={handelSubmit} noValidate sx={{ mt: 1 }}>
                                <Typography 
                                    component="h5"
                                    variant="h5"
                                    color="#71797E"
                                    fontWeight="bold"
                                    sx={{ 
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    Profile Info
                                </Typography>
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
                                <Typography 
                                    component="h5"
                                    variant="h5"
                                    color="#71797E"
                                    fontWeight="bold"
                                    sx={{ 
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mt: 7
                                    }}
                                >
                                    Tutoring Info
                                </Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="education"
                                    label="Education"
                                    name="education"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="about"
                                    label="About"
                                    name="about"
                                    multiline
                                    rows={4}
                                    placeholder="Tell us about yourself"
                                />
                                <Typography
                                    component="body1"
                                    variant="p"
                                    color="#71797E"
                                    sx={{ 
                                        display: 'flex',
                                        // justifyContent: 'center',
                                        mt: 2
                                    }}
                                >
                                    Add the subjects you would like to provide tutoring in
                                </Typography>
                                {categoryInputFields.map((field, index) => (
                                    <Box key={index}>{field}</Box>
                                ))}

                                <IconButton
                                    variant="contained"
                                    onClick={addCategoryInputField}
                                >
                                    <AddCircleIcon />
                                </IconButton>
                                <Typography 
                                    component="h5"
                                    variant="h5"
                                    color="#71797E"
                                    fontWeight="bold"
                                    sx={{ 
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mt: 7
                                    }}
                                >
                                    Security
                                </Typography>
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

export default TutorRegister;
