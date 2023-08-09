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
            <h2>Register as a Student!</h2>
            <form onSubmit={handelSubmit} method="POST">
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
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <p>Set a profile picture:</p>
                    <Button variant="outlined" component="label">
                        Upload
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>
                </Stack>
                <FormControl variant="standard" sx={{ mb: 2 }}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" defaultValue="" name="tutorPassword" />
                </FormControl><br/>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant="contained" >
                        Register
                    </Button>
                </Stack>
            </form>
        </>
    )
};

export default StudentRegister;