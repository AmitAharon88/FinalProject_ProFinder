import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
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
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const StudentRegister = () => {
    const [location, setLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");
    const [selectedPassword, setSelectedPassword] = useState("");
    const [requiredFields, setRequiredFields] = useState(false);
    // for uploading files
    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState(null);

    const { successRegisterMsg, setSuccessRegisterMsg } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        getLocation();
   }, []);

   const getLocation = async () => {
       try {
           const res = await fetch(`/api/location`);
           const data = await res.json();
        //    console.log(data);
           setLocation(data);
       } catch (e) {
           console.log(e);
       };
   };

   const handleLocationChange = (event) => {
       setSelectedLocation(event.target.value);
   };

    function formatDateString(inputDateStr) {
        const inputDate = new Date(inputDateStr);
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const day = String(inputDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;
        return formattedDate;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const studentData = {};

        formData.forEach((value, key) => {
            studentData[key] = value;
        });

        studentData.location = selectedLocation;
        studentData.birth_day = formatDateString(selectedDate);
        studentData.email= selectedEmail.trim().toLocaleLowerCase();
        studentData.password= selectedPassword.trim();

        console.log(studentData);

        try {
            const res = await fetch(`/api/students/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });
            if (res.ok) {
                const response = await res.json();
                console.log(response.msg);
                setSuccessRegisterMsg(response.msg)
                navigate('/signin');
            } else {
                const errorResponse = await res.json();
                console.log('Error:', errorResponse.msg); 
                setRequiredFields(true);
            }
        } catch (e) {
            console.log(e);
        };
    };

    return (
        <>
            <Typography 
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
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <Box sx={{ display: 'flex', gap: '16px' }}> {/* Flex container for first name and last name */}
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth={true}
                                        name="first_name"
                                        label="First name"
                                        type="text"
                                        id="first_name"
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth={true}
                                        name="last_name"
                                        label="Last name"
                                        type="text"
                                        id="last_name"
                                    />
                                </Box>
                                <TextField
                                margin="normal"
                                required
                                fullWidth={true}
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={(e) => {setSelectedEmail(e.target.value)}}
                                />
                                <Box sx={{ display: 'flex', gap: '16px'}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateField']} sx={{ mt:1 }} >
                                            <DatePicker
                                                name="birth_day"
                                                label="Date of birth"
                                                onChange={(newValue) => setSelectedDate(newValue.$d)}
                                                slotProps={{ textField: { variant: 'outlined' } }}
                                                disableFuture
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <FormControl 
                                        sx={{ minWidth: 220 }} 
                                        margin="normal"
                                        required
                                        // fullWidth={true}
                                    >
                                        <InputLabel required id="locationLabel">Location</InputLabel>
                                        <Select
                                            labelId="locationLabel"
                                            id="location"
                                            label="Location"
                                            name="location_id"
                                            value={selectedLocation}
                                            onChange={handleLocationChange}
                                        >
                                            {location.map(item => {
                                                return (
                                                    <MenuItem key= {item.location_id} value={item.location_id}>{item.location_name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt:2 }}>
                                    <Typography variant="body1" color="#71797E">
                                        Set a profile picture:
                                    </Typography>
                                    <label htmlFor="contained-button-file">
                                        <input
                                            type="file"
                                            name="file"
                                            id="contained-button-file"
                                            accept="*/*"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            // hidden
                                        />
                                        {/* <Button variant="contained" component="span">
                                        Choose File
                                        </Button> */}
                                    </label>
                                </Stack>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth={true}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(e) => {setSelectedPassword(e.target.value)}}
                                    autoComplete="current-password"
                                />
                                {requiredFields ? (
                                <Typography variant="body1" color="red">
                                        * Fill in all required field
                                </Typography> ) : null}
                                <Button
                                    type="submit"
                                    fullWidth={true}
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