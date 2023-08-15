import { useState, createContext, useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const defaultTheme = createTheme();

const SignIn = () => {
  const [role, setRole] = useState('');
  const [msg, setMsg] = useState('');

  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const { userFN, setUserFN } = useContext(AppContext);
  const { studentId, setStudentId } = useContext(AppContext);
  const { userRole, setUserRole } = useContext(AppContext);


  const navigate = useNavigate();

  const handleChange = (event) => {
    setRole(event.target.value);
    // console.log(event.target.value)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = {};

    formData.forEach((value, key) => {
        userData[key] = value;
    });

    console.log(userData)
    setUserRole(role)

    if (userData.role === "students") { 
      try {
        const res = await fetch(`${BASE_URL}/api/students/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (res.status === 200) {
          const response = await res.json();
          setIsAuthenticated(true);
          setUserFN(response.first_name);
          setStudentId(response.student_id);
          console.log(response);
          setMsg('');
          navigate("/");
        } else {
            const errorResponse = await res.json();
            console.log('Error:', errorResponse.msg);
            setMsg(errorResponse.msg)
        }
      } catch (e) {
          console.log(e);
      };
    } else { 
      try {
        const res = await fetch(`${BASE_URL}/api/tutors/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (res.status === 200) {
          const response = await res.json();
          setIsAuthenticated(true);
          setUserFN(response.first_name);
          setMsg('');
          navigate("/");
        } else {
            const errorResponse = await res.json();
            console.log('Error:', errorResponse.msg);
            setMsg(errorResponse.msg)
        }
      } catch (e) {
          console.log(e);
      };
    };
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#009688" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
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
            <FormControl fullWidth margin="normal">
              <InputLabel required id="roleLabel">Role</InputLabel>
              <Select
                labelId="roleLabel"
                id="role"
                name="role"
                value={role}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="students">Student</MenuItem>
                <MenuItem value="tutors">Tutor</MenuItem>
              </Select>
            </FormControl>
            {msg && (
              <Typography component="body1" variant="p" color="red">
                * {msg}
              </Typography>
            )}
            {/* <FormControlLabel
              control={<Checkbox value="remember" sx={{
                '&.Mui-checked': {
                  color: "#009688", // color when checkbox is checked
                },
              }} />}
              label="Remember me"
            /> */}
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
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;