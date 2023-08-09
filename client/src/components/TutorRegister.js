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
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CategoryInputField from "./CategoryInputField"

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
    }

    return (
        <>
        <h2>Register as a Tutor!</h2>
        <form onSubmit={handelSubmit} method="POST">
            <h3>Profile Info</h3>
            <FormControl variant="standard" sx={{ mr: 2, mb: 2 }}>
                <InputLabel htmlFor="firstName">First name</InputLabel>
                <Input id="firstName" defaultValue="" name="tutorFirstName" />
            </FormControl>
            <FormControl variant="standard" sx={{ mb: 2 }}>
                <InputLabel htmlFor="lastName">Last name</InputLabel>
                <Input id="lastName" defaultValue="" name="tutorLastName" />
            </FormControl><br/>
            <FormControl variant="standard" sx={{ mb: 2 }}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" defaultValue="" name="tutorEmail" />
            </FormControl><br/>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ mb: 2 }}>
                <DemoContainer components={['DateField']}>
                    <DatePicker
                    name="dob"
                        label="Date of birth"
                        slotProps={{ textField: { variant: 'filled' } }}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <FormControl variant="standard" sx={{ mb: 2 , minWidth: 165 }}>
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
            </FormControl><br/>
            <FormControl variant="standard" sx={{ mb: 2 }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" defaultValue="" name="tutorPassword" />
            </FormControl><br/>
            <Stack direction="row" alignItems="center" spacing={2}>
                <p>Set a profile picture:</p>
                <Button variant="outlined" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
            </Stack>
            

            <h3>Tutoring Info</h3>
            <FormControl variant="standard" sx={{ mr: 2, mb: 2 }}>
                <InputLabel htmlFor="education">Education</InputLabel>
                <Input id="Education" defaultValue="" name="tutorEducation" />
            </FormControl>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="about"
                    label="About"
                    name="about"
                    multiline
                    rows={4}
                    placeholder="Tell us about yourself"
                    variant="standard"
                />
               
            </Box>
            <h4>Click on the + to add the subject you like to provide tutoring in:</h4>

            {categoryInputFields.map((field, index) => (
                <div key={index}>{field}</div>
            ))}

            <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton variant="contained" onClick={addCategoryInputField}>
                    <AddCircleIcon />
                </IconButton>
            </Stack>

            <br/>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" >
                    Register
                </Button>
            </Stack>
        </form>
        </>
    )
};

export default TutorRegister;
