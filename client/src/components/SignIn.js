import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

  const navigate = useNavigate();

  const handleChange = (event) => {
    setRole(event.target.value);
    console.log(event.target.value)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = {};

    formData.forEach((value, key) => {
        userData[key] = value;
    });

    console.log(userData)

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
          console.log(res.data);
          setMsg("");
          navigate("/");
        } else {
            console.log('Student sign in handle error');
        }
      } catch (e) {
          console.log(e);
          setMsg(e.response.data.msg)
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
            console.log(res.data);
            setMsg("")
            navigate("/");
        } else {
            console.log('Tutor sign in handle error');
        }
      } catch (e) {
          console.log(e);
          setMsg(e.response.data.msg)
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
            <FormControlLabel
              control={<Checkbox value="remember" sx={{
                '&.Mui-checked': {
                  color: "#009688", // color when checkbox is checked
                },
              }} />}
              label="Remember me"
            />
            <Typography component="h1" variant="h5">
            {msg}
          </Typography>
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
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;